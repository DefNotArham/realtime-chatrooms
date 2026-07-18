import mongoose from "mongoose";
declare const User: mongoose.Model<{
    clientId: string;
    rooms: mongoose.Types.ObjectId[];
    username?: string | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    clientId: string;
    rooms: mongoose.Types.ObjectId[];
    username?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    clientId: string;
    rooms: mongoose.Types.ObjectId[];
    username?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    clientId: string;
    rooms: mongoose.Types.ObjectId[];
    username?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    clientId: string;
    rooms: mongoose.Types.ObjectId[];
    username?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    clientId: string;
    rooms: mongoose.Types.ObjectId[];
    username?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    clientId: string;
    rooms: mongoose.Types.ObjectId[];
    username?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    clientId: string;
    rooms: mongoose.Types.ObjectId[];
    username?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default User;
//# sourceMappingURL=user.model.d.ts.map