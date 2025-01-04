import { orderModel } from "../models/orderModel.js";
import { userModel } from "../models/userModel.js";

//place the order using COD Method
export const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderdata = {
      userId,
      items,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
      address,
    };
    await orderModel.create(orderdata);
    await userModel.findByIdAndUpdate(userId, { cartData: {} }); //once placed the order then we have to clear the cart
    res.json({
      success: true,
      message: "Order Placed",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//place order using Stripe Method
export const placeOrderStripe = async (req, res) => {};

//place order using razorpay Method
export const placeOrderRazorpay = async (req, res) => {};

//All order data for Admin Panel
export const allOrders = async (req, res) => {};

//User order data for frontend
export const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//upadate order status from admin panel

export const upadateStatus = async (req, res) => {};
