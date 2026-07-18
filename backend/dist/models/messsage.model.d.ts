import mongoose from "mongoose";
declare const Message: mongoose.Model<{
    roomId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    content: string;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    roomId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    content: string;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    roomId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    content: string;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    roomId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    content: string;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    roomId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    content: string;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    roomId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    content: string;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    roomId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    content: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    roomId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    content: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default Message;
//# sourceMappingURL=messsage.model.d.ts.map