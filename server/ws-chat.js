import {upgradeWebSocket} from "@hono/hono/deno";

export function registerWSRoute(app) {
    app.get("/api/pings/ws", upgradeWebSocket((c) => {
        return {
            onMessage(event, ws){
                ws.send(`Thanks for ${event.data}`)
            }
        }
    }))
}