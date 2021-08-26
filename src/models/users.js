require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
        trim: true,
        minLength : 2,
        maxLength : 30
    },
    username :{
        type : String,
        lowercase : true,
        unique : true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    gender:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true,
        unique: true
        
    },
    password:{
        type: String,
        required: true
    },
    tokens:[{
        token: {
            type : String,
            required : true       
        }
    }]
});
userSchema.methods.generateToken = async function (){
    try {

        
        const token = jwt.sign({_id: this._id.toString()}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token});
        await this.save();
        
        return token;
        

    } catch (error) {

       console.log(error);
        return error
    }
}
userSchema.methods.generateUsername = async function (){

    try {
            const number = Math.round( Math.random() * 100);
            const name = this.firstname.split([" "]);
            
            this.username =  name[name.length-1] + "_" + name[0] + number;

            await this.save();
    } catch (error) {

        
       console.log(error);
    }
}

userSchema.pre("save", async function(next) {
    if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10);
    
    
}

next();
});
const UserData = new mongoose.model("UserData",userSchema)

module.exports = UserData;