import { Router } from "express";
import { userAPI } from "./API/user.route.js";
import { authAPI } from "./API/auth.route.js";

export function API(app) {
  const router = Router();

  router.use("/auth", authAPI);
  router.use("/users", userAPI);

  app.use("/api", router);
}
