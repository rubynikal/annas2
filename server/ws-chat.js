import {upgradeWebSocket} from "@hono/hono/deno";

export function registerWSRoute(app) {

    const sockets = new Set();
    app.get("/api/pings/ws", upgradeWebSocket((c) => {
        return {
            onOpen: (event, ws) => {
                ws.send(JSON.stringify({message:"Hello from server"}));
                sockets.add(ws);
            },
            onMessage(event, ws){
                const message = JSON.parse(event.data);
                message.date = Date.now();

                for (const socket of sockets){
                    socket.send(JSON.stringify(message));
                }
            },
            onClose: (event, ws) => {
                sockets.delete(ws);
                ws.close();
            },
            onError: (event, ws) => {
                sockets.delete(ws);
                ws.close();
            },
        }
    }))
}