import type { Request, Response } from "express";
declare const loadMessagesController: (req: Request<{}, {}, {
    roomId: string;
}>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export default loadMessagesController;
//# sourceMappingURL=loadMessages.controller.d.ts.map