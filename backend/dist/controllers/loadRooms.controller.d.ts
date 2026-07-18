import type { Request, Response } from "express";
type RoomQuery = {
    clientId: string;
};
declare const loadRoomsController: (req: Request<{}, {}, {}, RoomQuery>, res: Response) => Promise<Response<any, Record<string, any>>>;
export default loadRoomsController;
//# sourceMappingURL=loadRooms.controller.d.ts.map