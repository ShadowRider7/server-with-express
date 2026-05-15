import type { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  //   console.log(req.body);
  //   const { name, email, password, age } = req.body;

  try {
    const result = await userService.createUserIntoDB(req.body);

    res.status(201).json({
      success: true,
      message: " user created Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(202).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUserFromDB();
    return res.status(200).json({
      success: true,
      message: "users retried Successfully",
      data: result.rows,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.getSingleUserFromDB(id as string);
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "user not found!",
        data: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: "user retried Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};
const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await userService.updateUserFromDB(req.body, id as string);
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "user not found!",
        data: {},
      });
    }
    return res.status(200).json({
      success: true,
      message: "user updated Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.deleteUserFromDB(id as string);
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "user not found!",
        data: {},
      });
    }
    return res.status(200).json({
      success: true,
      message: "user deleted Successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};
export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
