import { streamSSE } from "@hono/hono/streaming"

export function registerSSEChat(app){
    const sse_chat_streams = new Set();

    app.post("/api/sse/messages", async(c) => {
        const message = await c.req.json();
        for (const stream of sse_chat_streams) {
            await stream.writeSSE({
                data: JSON.stringify(message),
            })
        }
        return c.json({ ok: true });
    })

    app.get("/api/sse/messages", (c) => {
        return streamSSE(c, async (stream) => {
            sse_chat_streams.add(stream);

            while(!stream.aborted && !stream.closed){
                await stream.sleep(1000);
            }
            sse_chat_streams.delete(stream);
        })
    })

    
}


