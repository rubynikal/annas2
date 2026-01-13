import { Redis } from 'ioredis';

//new redis connctions
const redisConsumer = new Redis(6378, 'redis');
const redisProducer = new Redis(6378, 'redis');

const QUEUE_NAME = 'users';

const consume = async () => {
    while (true){
        const result = await redisConsumer.brpop(QUEUE_NAME, 0);
        if (result){
            const [queue, user] = result;
            const {name} = JSON.parse(user);
            //ievietot db
            
        }
    }
}