/*import usermodel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import userModel from "../models/userModel.js";


//login user 
const loginUser = async (req,res) => {
    const {email,password} =req.body;
    try {
        const user = await userModel.findOne({email})

        if (!user) {
          return res.json({success:false,massage:"user doest't exists"})    
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if (!isMatch) {
            return res.json ({success:false,massage:"Invalid credentials"})
        }

        const token = createToken(user._id);
        res.json({success:true,token})


    } catch (error) {  
        console.log(error);
        res.json({success:false,massage:"error"}) 
    }
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}
//register user
const registerUser = async (req,res) => {
    console.log("Request body:", req.body)
    const {name,password,email} = req.body;
    
    try {
          //checking is user already login or not
         const exists = await userModel.findOne({email});
         if (exists) {
            return res.json({success:false,message:"user already exists"})
        }

        //validaing email format and sstrong passwaord
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"please enter valid email"})
        }

        if (password.length<8) {
            return res.json({success:false,message:"please enter strong password"})
        }

        //hashing user pass
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new usermodel({
            /*name:name,*/
            /*name:name.trim(),
            email:email,
            password:hashedPassword  
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token});
    } catch (error) {
       console.log(error);
       res.json({success:false,message:"Error"})
    }
}

export {loginUser,registerUser}*/

















import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  console.log("Request body:", req.body);
  console.log("Hit register route:", req.body);


  // Validate name before any DB operation
  if (!name || name.trim() === '') {
    return res.json({ success: false, message: "Name is required" });
  }

  try {
    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password (min 8 characters)" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({
      name: name.trim(),
      email,
      password: hashedPassword
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { loginUser, registerUser };
