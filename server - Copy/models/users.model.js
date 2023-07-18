import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true,
        unique: true
    }, 
    jwt: {
        type: String,
    }
},
{
    timestamps: true,
 }
)

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.matchPassword = async function (pass) {
    return bcrypt.compare(pass, this.password);
}


export const User = mongoose.model('User', UserSchema);



