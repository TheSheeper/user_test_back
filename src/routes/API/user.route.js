import { Router } from "express";
import { Users } from "../../models/models.js";

const userAPI = Router();

// Get Users
userAPI.get("/", async (req, res) => {
  try {
    const { userid } = req.query;
    if (!userid) return res.status(401).json({ message: "Unauthorized" });
    const auth = await Users.findOne({ where: { id: userid } });
    if (!auth || auth.status == 0)
      return res.status(401).json({ message: "User not found" });

    const users = await Users.findAll({
      attributes: ["id", "fullname", "email", "last_login", "status"],
    });
    return res.status(200).json({ users });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  }
});

userAPI.post("/block", async (req, res) => {
  try {
    const { userid } = req.query;
    console.log(userid);
    if (!userid) return res.status(401).json({ message: "Unauthorized" });
    const auth = await Users.findOne({ where: { id: userid } });
    if (!auth || auth.status == 0)
      return res.status(401).json({ message: "User not found" });

    const { usersId } = req.body;

    if (usersId == "all") await Users.update({ status: false }, { where: {}, truncate: true });
    else Users.update({ status: false }, { where: { id: usersId } });

    return res.status(200).json({ message: "Users blocked" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  }
});

userAPI.post("/unblock", async (req, res) => {
  try {
    const { userid } = req.query;
    if (!userid) return res.status(401).json({ message: "Unauthorized" });
    const auth = await Users.findOne({ where: { id: userid } });
    if (!auth || auth.status == 0)
      return res.status(401).json({ message: "User not found" });

    const { usersId } = req.body;

    if (usersId == "all") await Users.update({ status: true }, { where: {}, truncate: true });
    else Users.update({ status: true }, { where: { id: usersId } });

    return res.status(200).json({ message: "Users unblocked" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  }
});

userAPI.post("/delete", async (req, res) => {
  try {
    const { userid } = req.query;
    if (!userid) return res.status(401).json({ message: "Unauthorized" });
    const auth = await Users.findOne({ where: { id: userid } });
    if (!auth || auth.status == 0)
      return res.status(401).json({ message: "User not found" });

    const { usersId } = req.body;
    if (usersId == "all") await Users.destroy({ where: {}, truncate: true });
    else await Users.destroy({ where: { id: usersId } });

    return res.status(200).json({ message: "Users deleted" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  }
});

export { userAPI };
