import Message from "../models/messsage.model.js";
const loadMessagesController = async (req, res) => {
    const { roomId } = req.body;
    try {
        if (!roomId) {
            return res.status(400).json({
                success: false,
                message: "Room Id required",
            });
        }
        const messages = await Message.find({ roomId })
            .populate("userId", "username")
            .sort({ createdAt: 1 });
        const formattedMessages = messages.map((msg) => ({
            _id: msg._id.toString(),
            message: msg.content,
            username: msg.userId.username,
            userId: msg.userId._id.toString(),
        }));
        return res.status(200).json({
            success: true,
            messages: formattedMessages,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
export default loadMessagesController;
//# sourceMappingURL=loadMessages.controller.js.map