import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import {
  CreateUserSchema,
  LoginUserSchema,
  UpdateUserSchema,
} from "../zodSchema";
import {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserById,
} from "../services/user.service";
import { compare } from "bcryptjs";

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
      email: userBody.data.email,
      password: userBody.data.password,
      role: userBody.data?.role || "USER",
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
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        profile: user.profile,
      },
    });
  } catch (error) {
    return response.status(500).json({
      status: 500,
      message: `An Error occured while create user: ${error}`,
    });
  }
};

export const signin = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const userBody = LoginUserSchema.safeParse(request.body);
    if (!userBody.success) {
      const statusCode = 403;
      return response.status(statusCode).json({
        status: statusCode,
        message: userBody.error?.errors.map((item) => item.message),
      });
    }
    const user = await findUserByEmail(userBody.data.email);
    if (!user) {
      const statusCode = 404;
      return response.status(statusCode).json({
        status: statusCode,
        message: "User with the given email not found.",
      });
    }
    const auth = await compare(userBody.data.password, user.password);
    if (!auth) {
      const statusCode = 400;
      return response.status(statusCode).json({
        status: statusCode,
        message: "Password is incorrect.",
      });
    }

    const token = createToken(userBody.data.email, user.id);

    // response.cookie("jwt_token", token, {
    //   maxAge,
    //   secure: true,
    //   sameSite: "None",
    // });
    const statusCode = 200;
    return response.status(statusCode).json({
      status: statusCode,
      message: "user login successfully",
      token,
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        profile: user.profile,
      },
    });
  } catch (error) {
    return response.status(500).json({
      status: 500,
      message: `An Error occured while login user: ${error}`,
    });
  }
};

export const getUserInfo = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const userId = request.userId;
    const token = request.token;
    const user = await findUserById(userId);
    if (!user) {
      const statusCode = 404;
      return response.status(statusCode).json({
        status: statusCode,
        message: "User with the given id not found",
      });
    }
    const statusCode = 200;
    return response.status(statusCode).json({
      status: statusCode,
      message: "get user info successfully",
      token,
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        profile: user.profile,
      },
    });
  } catch (error) {
    return response.status(500).json({
      status: 500,
      message: `An Error occured while get user info: ${error}`,
    });
  }
};

export const updateUserInfo = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const userId = request.userId;
    const token = request.token;
    const userBody = UpdateUserSchema.safeParse(request.body);
    if (!userBody.success) {
      const statusCode = 403;
      return response.status(statusCode).json({
        status: statusCode,
        message: userBody.error?.errors.map((item) => item.message),
      });
    }
    const user = await updateUserById({
      userId,
      firstname: userBody.data.firstname,
      lastname: userBody.data.lastname,
      role: userBody.data.role,
    });
    if (!user) {
      const statusCode = 404;
      return response.status(statusCode).json({
        status: statusCode,
        message: "User with the given id not found",
      });
    }
    const statusCode = 200;
    return response.status(statusCode).json({
      status: statusCode,
      message: "updated user info successfully",
      token,
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        profile: user.profile,
      },
    });
  } catch (error) {
    return response.status(500).json({
      status: 500,
      message: `An Error occured while update user info: ${error}`,
    });
  }
};
