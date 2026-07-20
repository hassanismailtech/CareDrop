import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  try {
    const { user, token } = await authService.registerUser(req.body);
    const { password, ...userWithoutPassword } = user;
    
    res.status(201).json({
      status: 'success',
      data: {
        user: userWithoutPassword,
        token,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { user, token } = await authService.loginUser(req.body);
    
    const { password, ...userWithoutPassword } = user;
    
    res.status(200).json({
      status: 'success',
      data: {
        user: userWithoutPassword,
        token,
      },
    });
  } catch (error: any) {
    res.status(401).json({
      status: 'error',
      message: error.message,
    });
  }
};