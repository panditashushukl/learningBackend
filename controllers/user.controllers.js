import {asyncHandler} from './../utils/asyncHandler.js'

const registerUser = asyncHandler(async (req,res)=>{
  
  const {fullName, email, username, password} = req.body
  console.log(fullName,email);
  
})

export {
  registerUser,
}

// Get User details from front-end
// Validation - not Empty
// Check if user already exists : username , email
// Check for Images, Check for Avtars
// Upload them to cloudnary,avtar
// Create user object - Create Entry in DB
// Remove Passwords and refresh token feild from response
// Check for user creation
// Return Respose