import type { Request, Response } from "express";
type MessageType = {
    roomId: string;
    clientId: string;
    message: string;
};
declare const sendMessageController: (req: Request<{}, {}, MessageType>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export default sendMessageController;
//# sourceMappingURL=sendMessage.controller.d.ts.map