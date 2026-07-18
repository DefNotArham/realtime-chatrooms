import mongoose from "mongoose";
declare const Chatroom: mongoose.Model<{
    name: string;
    members: mongoose.Types.ObjectId[];
    joinCode: string;
    isOnline: mongoose.Types.ObjectId[];
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    name: string;
    members: mongoose.Types.ObjectId[];
    joinCode: string;
    isOnline: mongoose.Types.ObjectId[];
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    members: mongoose.Types.ObjectId[];
    joinCode: string;
    isOnline: mongoose.Types.ObjectId[];
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    name: string;
    members: mongoose.Types.ObjectId[];
    joinCode: string;
    isOnline: mongoose.Types.ObjectId[];
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    name: string;
    members: mongoose.Types.ObjectId[];
    joinCode: string;
    isOnline: mongoose.Types.ObjectId[];
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    name: string;
    members: mongoose.Types.ObjectId[];
    joinCode: string;
    isOnline: mongoose.Types.ObjectId[];
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    name: string;
    members: mongoose.Types.ObjectId[];
    joinCode: string;
    isOnline: mongoose.Types.ObjectId[];
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    members: mongoose.Types.ObjectId[];
    joinCode: string;
    isOnline: mongoose.Types.ObjectId[];
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default Chatroom;
//# sourceMappingURL=chatroom.model.d.ts.map