import { Server } from "socket.io";
import type { Server as HttpServer } from "http";
export declare const initSocket: (httpServer: HttpServer, corsOrigin: string) => Server<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>;
export declare const getIO: () => Server<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>;
//# sourceMappingURL=socket.io.d.ts.map