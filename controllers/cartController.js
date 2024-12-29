import { userModel } from "../models/userModel.js";

//add to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    let cartData = await userData.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({
      success: true,
      Message: "Added To Cart",
    });
  } catch (error) {
    console.error("Error adding to cart:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//upadate user cart
export const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    let cartData = await userData.cartData;

    cartData[itemId][size] = quantity;
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({
      success: true,
      Message: "Cart Updated",
    });
  } catch (error) {
    console.error("Error updating the  cart:", error.message);

    return res.status(500).json({
      success: false,
      message: error.Message,
    });
  }
};
//get user cart data
export const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    let cartData = await userData.cartData;
    res.json({
      success: true,
      cartData,
    });
  } catch (error) {
    console.error("Error getting the user cart:", error.message);

    return res.status(500).json({
      success: false,
      message: error.Message,
    });
  }
};
