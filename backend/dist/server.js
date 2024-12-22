import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 });
wss.on("connection", (ws) => {
    console.log("new connection formed.");
});
wss.on("message", (message) => {
    console.log("new message received");
    console.log(message);
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
});
wss.on("close", () => {
    console.log("Client Disconnected");
});
//# sourceMappingURL=server.js.map