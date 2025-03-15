import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { CreateUserSchema } from "../zodSchema";
import { createUser, findUserByEmail } from "../services/user.service";

//expired token after 3 days
const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (emailAddress: string, userId: number) => {
  const secret = process.env.JWT_KEY;
  if (secret) {
    return jwt.sign({ emailAddress, userId }, secret, {
      expiresIn: maxAge,
    });
  } else {
    console.log("error when sign jwt token");
  }
};

export const signup = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const userBody = CreateUserSchema.safeParse(request.body);
    if (!userBody.success) {
      const statusCode = 403;
      return response.status(statusCode).json({
        status: statusCode,
        message: userBody.error?.errors.map((item) => item.message),
      });
    }
    const userExist = await findUserByEmail(userBody.data.email);
    if (userExist) {
      const statusCode = 422;
      return response.status(statusCode).json({
        status: statusCode,
        message: "This Email is already taken.",
      });
    }
    const user = await createUser({
      ...userBody.data,
      role: userBody.data.role || "USER",
    });

    const token = createToken(user.email, user.id);
    // response.cookie("jwt_token", token, {
    //   maxAge,
    //   secure: true,
    //   sameSite: "None",
    // });
    const statusCode = 201;
    return response.status(statusCode).json({
      status: statusCode,
      message: "created user successfully",
      token,
      data: user,
    });
  } catch (error) {
    return response.status(500).json({
      status: 500,
      message: `An Error occured while create user: ${error}`,
    });
  }
};
