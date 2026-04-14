import { Hono } from '@hono/hono';
import { cors } from '@hono/hono/cors';
import { logger } from '@hono/hono/logger';
import postgres from "postgres";
import { Redis } from "ioredis";
import { redisCacheMiddleware } from './cache-middleware.js';
import { redisProducer } from './redis-queue.js';
import { ssrHandler } from './ssr-example.js';
import { serveStatic } from '@hono/hono/deno';
import { registerHybridRoute } from './hybrid-rendering.js';
import { registerApiRoutes } from './api.js';
import { registerSSERoute } from './sse-example.js';
import { registerSSEChat } from './sse-chat.js';
import { registerWSRoute } from './ws-chat.js';

const app = new Hono();
registerWSRoute(app);
app.use("/*", cors()); 
registerSSERoute(app);
registerHybridRoute(app);
registerApiRoutes(app);
registerSSEChat(app);
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

app.post("/users/:param", async (c) => {
  const param = c.req.param("param");
  console.log("IELIEK RINdaa");
  await redisProducer.lpush('users', JSON.stringify({param})); //left push from redis
  c.status(202); //accepted
  return c.body('Accepted');
  },
);

app.get('/ssr', ssrHandler);

app.use('/public/*', serveStatic({ root: '.'}));

app.get('/items', async (c) => {
  const items = [
    { name: 'apple'},
    { name : 'pear'},
    { name: 'hmmmmmmm'}
  ];
  return c.json(items);
})

export default app;
export {redis};