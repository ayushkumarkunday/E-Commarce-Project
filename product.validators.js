import { body, param } from "express-validator";
import mongoose from "mongoose";

const validId = (value) => mongoose.Types.ObjectId.isValid(value);

export const productValidator = [
  body("name").trim().notEmpty().withMessage("Product name is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("price").isFloat({ min: 0 }).withMessage("Price must be a non-negative number"),
  body("stock").isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
  body("category").trim().notEmpty().withMessage("Category is required")
];

export const productIdValidator = [
  param("id").custom(validId).withMessage("Invalid product id")
];
