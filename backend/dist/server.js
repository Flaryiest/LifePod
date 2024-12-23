import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 });
wss.on("connection", (ws) => {
    console.log("New connection formed.");
    ws.on("message", (message) => {
        console.log(message);
        console.log("New message received:", message.toString());
        wss.clients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
                client.send(message);
            }
        });
    });
    ws.on("close", () => {
        console.log("Client Disconnected");
    });
});
//# sourceMappingURL=server.js.map