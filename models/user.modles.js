import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
  {
    username : {
      type : String,
      required : true,
      unique : true,
      lowercase : true,
      trim : true,
      index : true
    },
    email : {
      type : String,
      required : true,
      unique : true,
      lowercase : true,
      trim : true,
    },
    fullName : {
      type : String,
      required : true,
      trim : true,
      index : true
    },
    avatar : {
      type : String, //Cloudinari URL
      require : true
    },
    coverImage : {
      type : String, //Cloudinari URL
    },
    watchHistory : [
      {
        type : Schema.Types.ObjectId,
        ref : "Video"
      }
    ],
    password:{
      type : String,
      required : [true,'Password is required']
    },
    refreshToken : {
      type : String
    }
  }
,{timestamps})

userSchema.pre("save",async function (next){
  if(this.isModified("password"))
    this.password = bcrypt.hash(this.password,18)
  next()
})

// Creating custom method.
userSchema.methods.isPasswordCorrect = async function (password) {
 return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAcessToken = function () {
  return jwt.sign({
    _id:this._id,
    email:this.email,
    username : this.username,
    fullName : this.fullName
  },
  process.env.ACESS_TOKEN_SECRET,
  {
    expiresIn:ACESS_TOKEN_EXPIRY
  }
)
}
userSchema.methods.RefreshAcessToken = function () {
  return jwt.sign({
    _id:this._id,
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn:REFRESH_TOKEN_EXPIRY
  }
)
}
//JWT is a bearer token


export const User = mongoose.model("User",userSchema)