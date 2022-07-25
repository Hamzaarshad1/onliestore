import config from "config";
import { get } from "lodash";
import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import {
  createSession,
  createAccessToken,
} from "../service/userSession.service";
import { sign } from "../utils/jwt.utils";
import { UserDocument } from "../model/user.model";
import {SessionDocument} from '../model/userSession.model';

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate the email and password
  const user = await validatePassword(req.body) as UserDocument;

  if (!user) {
    return res.status(401).send("Invalid username or password") ;
  }

  // Create a session
  const session = await createSession(user._id, req.get("user-agent") || "") as SessionDocument;

  // create access token
  const accessToken = createAccessToken({
    user
  });

  // send refresh & access token back
  return res.send({ 'id':user._id,'email':user.email,'name':user.name ,accessToken });
}


