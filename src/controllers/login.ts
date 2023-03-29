import { Request, Response } from "express";
import { ILogin } from "../interfaces/login";
import { loginService } from "../services/login/login.service";

const createLoginController = async (req: Request, res: Response) => {
  const loginData: ILogin = req.body;
  const [status, data] = await loginService(loginData);
  return res.status(status as number).json(data);
};

export default createLoginController;
