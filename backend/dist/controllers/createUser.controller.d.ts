import type { Request, Response } from "express";
type UserType = {
    clientId: string;
};
declare const createUserController: (req: Request<{}, {}, UserType>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export default createUserController;
//# sourceMappingURL=createUser.controller.d.ts.map