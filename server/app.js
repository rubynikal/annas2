import { Hono } from '@hono/hono';
import { cors } from '@hono/hono/cors';
import { logger } from '@hono/hono/logger';
import postgres from "postgres";

const app = new Hono();
const sql = postgres();

//cors un logger added to all (*)
app.use("/*", cors()); 
app.use("/*", logger());

//define path
app.get("/", (c) => c.json({message: "Hello world!" }));
app.get("/todos", async (c) => {
    const todos = await sql`SELECT * FROM todos`;
    return c.json(todos);
})

export default app;