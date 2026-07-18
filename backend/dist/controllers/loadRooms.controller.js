import User from "../models/user.model.js";
const loadRoomsController = async (req, res) => {
    const { clientId } = req.query;
    try {
        if (!clientId || typeof clientId !== "string")
            return res
                .status(404)
                .json({ success: false, message: "Client Id not found" });
        const user = await User.findOne({ clientId }).populate("rooms");
        if (!user)
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        return res.status(200).json({ success: true, rooms: user.rooms });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
export default loadRoomsController;
//# sourceMappingURL=loadRooms.controller.js.map