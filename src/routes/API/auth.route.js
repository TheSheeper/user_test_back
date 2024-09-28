import { Router } from "express";
import { Users } from "../../models/models.js";
import argon from "argon2";

const authAPI = Router();

// Insert user
authAPI.post("/register", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const hashedPassword = await argon.hash(password);

    const user = await Users.create({
      fullname,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({ user });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  }
});

authAPI.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email: email } });

    if (!user)
      return res.status(401).json({ message: "Wrong email" });
    const isValidPassword = await argon.verify(user.password, password);
    
    if(user.status == 0)
        return res.status(401).json({ message: "User blocked" });
        

    if (isValidPassword) {
      const { id, fullname, email } = user;
      user.last_login = new Date().toJSON().slice(0, 10)
      user.save()
      return res.status(200).json({ id, fullname, email});
    }

    return res.status(401).json({ message: "Wrong password" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  }
});

export { authAPI };
