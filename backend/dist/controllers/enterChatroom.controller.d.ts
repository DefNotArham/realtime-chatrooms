import type { Request, Response } from "express";
type EnterChatroomType = {
    clientId: string;
    username: string;
    roomId: string;
};
declare const enterChatroomController: (req: Request<{}, {}, EnterChatroomType>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export default enterChatroomController;
//# sourceMappingURL=enterChatroom.controller.d.ts.map