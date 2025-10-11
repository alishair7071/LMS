require("dotenv").config();
import { Response } from "express";
import { IUser } from "../models/user.model";
import { redis } from "./redis";

interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}


  //option for cookies
 export const accessTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
    maxAge: 5 * 60 * 1000, // 5 minutes
    httpOnly: true,
    sameSite: "lax",
  };

  
  export const refreshTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
    maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
    httpOnly: true,
    sameSite: "lax",
  };

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  //upload session to redis
  redis.set(user._id as string, JSON.stringify(user) as any);



  //set secure true in production
  if (process.env.NODE_ENV === "production") {
    accessTokenOptions.secure = true;
  }

  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  res.status(statusCode).json({
    success: true,
    accessToken,
    user,
  });
};
