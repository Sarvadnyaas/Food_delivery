/*import userModel from "../models/userModel.js"*/
/*import userModel from "../models/userModel.js"

// add item to cart
const addToCart = async(req,res) => {
  try {
    let userData = userModel.findById(req.body.userId);
    let cartData = userData.cartData;
    if(!cartData[req.body.itemId])
    {
      cartData[req.body.itemId] = 1;
    }
    else{
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,message:"Added to cart"});
  } catch (error) {
    console.log(error);
    res.json({success:false,meassage:error})
  }
}

//remove from cart
const removeFromCart = async(req,res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
        cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,meassage:"removed from cart"})
  } catch (error) {
    console.log(error);
    res.json({success:false,meassage:"error"})
  }

}

//fetch user cart data 
const getCart = async(req,res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({success:true,cartData})
  } catch (error) {
    console.log(error);
    res.json({success:false,meassage:"error"})
  }
}

// Export functions
module.exports = { addToCart, removeFromCart, getCart };*/

/*import userModel from "../models/userModel.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData;
    
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};

// Remove from cart
export const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData;

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Fetch user cart data
export const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};*/

import userModel from "../models/userModel.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Check if user exists
    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {}; // Ensure cartData is initialized if undefined

    // Add item to cart (or increment if already exists)
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    // Update user cart in database
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to cart", cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding to cart" });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Check if user exists
    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {}; // Ensure cartData exists

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1; // Decrease item quantity
    }

    // Update user cart in database
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Removed from cart", cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error removing from cart" });
  }
};

// Fetch user cart data
export const getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    // Check if user exists
    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {}; // Ensure cartData is initialized

    if (Object.keys(cartData).length === 0) {
      return res.status(400).json({ success: false, message: "Your cart is empty. Add items to the cart." });
    }

    res.json({ success: true, cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching cart data" });
  }
};



