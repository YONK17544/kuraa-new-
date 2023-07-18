import { User } from "../models/users.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req, res) => {
    const {username, password} = req.body;

    const existsUser = await User.findOne({username: username});

    if(!existsUser){
        const newUser = await new User({username: username, password: password});
        
        newUser.save();

        res.status(200).json({
            status: true,
            data: newUser,
            message: "User registered successfully"
        })
    }else{
        res.status(400).json({
            status: false,
            message: "User already registered"
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(401).json({
                status: false,
                message: 'Invalid user or password',
            })
        } else {
            const matchPass = await user.matchPassword(password);

            if (matchPass) {
                const secretKey = process.env.JWT_SECRET_KEY ?? "SecretKey@123#";
                const token = jwt.sign({ username: user.username }, secretKey, {
                    expiresIn: '3d'
                })

                const updatedUser = await User.findOneAndUpdate({
                    _id: user._id
                },
                    {
                        $set: {
                            jwt: token
                        }
                    },
                    {
                        new: true
                    })

                return res.status(200).json({
                    status: true,
                    message: 'User logged in successfully',
                    jwt: updatedUser.jwt  
                })
            } else {
                return res.status(401).json({
                    status: false,
                    message: 'Invalid user or password',
                })
            }
        }

    } catch (error) {
        console.log(error)
    }
}