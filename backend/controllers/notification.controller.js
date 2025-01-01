import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await Notification.find({ to: userId })
    .populate({
      path: "from",
      select: "username profileImg"
    })

    await Notification.updateMany({ to:userId }, { read: true });// อ่านทั้งหมดที่ส่งมา

    res.status(200).json(notifications)

  } catch (error) {
    console.log("Eror in getNotifications controller", error.message);
    res.status(400).json({ message: error.message });
  }
}

export const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    await Notification.deleteMany({ to:userId });

    res.status(200).json({ message: "Notfications delete successfully" });
  } catch (error) {
    console.log("Eror in getNotifications controller", error.message);
    res.status(400).json({ message: error.message });
  }
}