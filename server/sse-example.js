import { streamSSE } from "@hono/hono/streaming"

export function registerSSERoute(app){
    const streams = new Set();

    setInterval(() => {
        let message = String(Math.random())
        for (const stream of streams) {
            stream.writeSSE({data: message})
        }
    }, 1000)

    app.get("/api/pings/stream", (c) => {
        return streamSSE(c, async (stream) => {
            streams.add(stream);
            while (!stream.aborted && !stream.closed){
                await stream.sleep(1000);
            }

            streams.delete(stream);
        })
    })
}