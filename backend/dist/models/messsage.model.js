import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chatroom",
        required: true,
        index: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: { type: String, required: true },
}, { timestamps: true });
const Message = mongoose.model("Message", messageSchema);
export default Message;
//# sourceMappingURL=messsage.model.js.map