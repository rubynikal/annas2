import { Hono } from '@hono/hono';
import { cors } from '@hono/hono/cors';
import { logger } from '@hono/hono/logger';

const app = new Hono();

//cors un logger added to all (*)
app.use("/*", cors()); 
app.use("/*", logger());

//define path
app.get("/", (c) => c.json({message: "Hello world!"}));

export default app;