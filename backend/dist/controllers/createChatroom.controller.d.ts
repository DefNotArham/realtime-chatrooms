import type { Request, Response } from "express";
type RoomType = {
    username: string;
    clientId: string;
    roomName: string;
};
declare const createChatroomController: (req: Request<{}, {}, RoomType>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export default createChatroomController;
//# sourceMappingURL=createChatroom.controller.d.ts.map