import type { Request, Response } from "express";
type RoomType = {
    roomId: string;
    clientId: string;
};
declare const loadCurrentRoomController: (req: Request<{}, {}, RoomType>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export default loadCurrentRoomController;
//# sourceMappingURL=loadCurrentRoom.Controller.d.ts.map