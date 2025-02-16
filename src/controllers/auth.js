import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Session from "../models/session.js";

// Контроллер для регистрации пользователя
export const createUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createHttpError(409, "Email in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: 201,
      message: "User successfully registered!",
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw createHttpError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw createHttpError(401, "Invalid email or password");
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    const accessTokenValidUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 минут
    const refreshTokenValidUntil = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    ); // 30 дней

    await Session.create({
      userId: user._id,
      accessToken,
      refreshToken,
      accessTokenValidUntil,
      refreshTokenValidUntil,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: 200,
      message: "User successfully logged in!",
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
};


// Контроллер для логаута пользователя
export const logoutUserController = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw createHttpError(401, "Refresh token required");
    }

    const session = await Session.findOneAndDelete({ refreshToken });
    if (!session) {
      throw createHttpError(404, "Session not found");
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Контроллер для сброса пароля
export const resetPasswordController = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw createHttpError(404, "User not found");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    await Session.deleteMany({ userId: user._id });

    res.status(200).json({
      status: 200,
      message: "Password has been successfully reset.",
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUserController = async (req, res, next) => {
  try {
    const { userId } = req.query; // Предположим, что пользователь передает userId в запросе
    const user = await User.findById(userId);
    if (!user) {
      throw createHttpError(404, "User not found");
    }
    res.status(200).json({
      status: 200,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
