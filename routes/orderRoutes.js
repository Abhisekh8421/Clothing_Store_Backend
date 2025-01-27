import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";
import {
  allOrders,
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  upadateStatus,
  userOrders,
  verifyRazorpay,
  verifyStripe,
} from "../controllers/orderController.js";
import { authUser } from "../middleware/auth.js";

const router = express.Router();

//admin features
router.post("/list", adminAuth, allOrders);
router.post("/status", adminAuth, upadateStatus);

//payment features
router.post("/place", authUser, placeOrder); //for COD
router.post("/stripe", authUser, placeOrderStripe);
router.post("/razorpay", authUser, placeOrderRazorpay);

//User features
router.post("/userorders", authUser, userOrders);

//verify payment

router.post("/verifyStripe", authUser, verifyStripe);
router.post("/verifyRazorpay", authUser, verifyRazorpay);

export default router;
