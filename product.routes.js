import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import expressValidator from "../middleware/expressValidator.js";
import {
  productValidator,
  productIdValidator
} from "../validators/product.validators.js";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js";

const router = Router();

router.post("/", authenticate, productValidator, expressValidator, createProduct);
router.get("/", getProducts);
router.get("/:id", productIdValidator, expressValidator, getProduct);
router.put("/:id", authenticate, productIdValidator, productValidator, expressValidator, updateProduct);
router.delete("/:id", authenticate, productIdValidator, expressValidator, deleteProduct);

export default router;
