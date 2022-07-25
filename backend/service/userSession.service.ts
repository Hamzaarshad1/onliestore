import { LeanDocument, FilterQuery, UpdateQuery } from "mongoose";
import config from "config";
import { Omit,get } from "lodash";
import { UserDocument } from "../model/user.model";
import Session, { SessionDocument } from "../model/userSession.model";
import { sign, decode } from "../utils/jwt.utils";
import { findUser } from "./user.service";

export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({ user: userId, userAgent });

  return session.toJSON();
}

export function createAccessToken({
  user
}: {
  user:
     | Omit<UserDocument, "password">
     | LeanDocument<Omit<UserDocument, "password">>;
  
}) {
  // Build and return the new access token

  const accessToken = sign(
    user._id,user.email
   
  );

  return accessToken;
}

