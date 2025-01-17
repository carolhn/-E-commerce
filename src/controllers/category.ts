import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Category from '../model/category';

export const createCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name } = req.body;

    try {
      const categoryFound = await Category.findOne({ name });

      if (categoryFound) {
        throw new Error('Category already exists');
      }

      const newCategory = await Category.create({
        name,
      });

      res.status(201).json({
        status: 'success',
        message: 'Category created successfully',
        newCategory,
      });
    } catch (error) {
      next(error);
    }
  },
);
