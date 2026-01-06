import { Hono } from '@hono/hono';
import { cors } from '@hono/hono/cors';
import { logger } from '@hono/hono/logger';
import postgres from "postgres";
import { Redis } from "ioredis";
import { redisCacheMiddleware } from './cache-middleware.js';

const app = new Hono();
const sql = postgres();
const redis = new Redis(6379, "redis");
const REPLICA_ID = crypto.randomUUID();

app.get("/redis-test", async (c) =>{
    let count = await redis.get("test");
    if (!count){
        count = 0;
    } else {
        count = Number(count);
    }

    count++;
    await redis.set("test", count);
    return c.json({count});
})

//cors un logger added to all (*)
app.use("/*", cors()); 
app.use("/*", logger());

app.use("/*", async (c, next) =>{
  c.res.headers.set("X-Replica-Id", REPLICA_ID);
  await next();
});

//define path
app.get("/", (c) => c.json({message: "Hello world!" }));
app.get("/todos", async (c) => {
    const todos = await sql`SELECT * FROM todos`;
    return c.json(todos);
})

// app.get(
//   "/hello/*",
//   redisCacheMiddleware,
// );

app.get(
  "/hello/:name",
  async (c) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return c.json({ message: `Hello ${c.req.param("name")}!` });
  },
);

export default app;
export {redis};