import { Redis } from 'ioredis';
import postgres from "postgres";

//new redis connctions
const redisConsumer = new Redis(6379, 'redis');
const redisProducer = new Redis(6379, 'redis');
const sql = postgres();

const QUEUE_NAME = 'users';

const consume = async () => {
    while (true){
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const result = await redisConsumer.brpop(QUEUE_NAME, 0);
        if (result){
            const [queue, user] = result;
            const {param} = JSON.parse(user);
            console.log('iznemts no rindas');
            //insert into db
            await sql`INSERT INTO users (name) VALUES (${param})`;
            console.log('ielikts db');
            
        }
    }
}

consume();

export {redisProducer};