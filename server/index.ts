import * as http from "http";
import { WebSocketServer } from "ws";

const port = 2333;
export const startServer = async () => {
  const httpServer = http.createServer((__, res) => {
    res.on("close", () => {
      console.log("success!");
    });
  });

  const wsServer = new WebSocketServer({ server: httpServer });
  const socketSet = new Set();

  wsServer.on("connection", (ws) => {
    socketSet.add(ws);
    ws.on("message", (msg) => {
      socketSet.forEach((ws) => {
        console.log(ws);
        // if (ws.connected) ws.send(msg);
        // else socketSet.delete(Ws);
      });
      if (msg) {
        ws.send(JSON.stringify("服务器收到了消息 "));
      }
    });

    ws.on("close", (e) => {
      console.log("失败了", e);
    });
  });

  httpServer.listen(port, () => {
    console.log(`服务器已经在${port}上开启`);
  });
};

startServer();
