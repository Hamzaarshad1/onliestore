import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { decode } from "../utils/jwt.utils";


const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization") as string

  if (!accessToken) return next();

  const { decoded } = decode(accessToken); 

  return next();
};

export default deserializeUser;