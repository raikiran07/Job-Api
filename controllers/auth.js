
const User = require('../models/User.js')
const {BadRequestError, UnauthenticatedError} = require('../errors')
const {StatusCodes} = require('http-status-codes')

const login = async (req,res) => {
    const {email,password} = req.body 
    
    if(!email || !password){
        throw new BadRequestError("Enter a valid email and password")
    }
  
    const user = await User.findOne({email})
  
    if(!user){
        throw new BadRequestError('No user with this email')
    }
    
    const isCorrect = await user.comparePassword(password)
   
    if(!isCorrect){
        throw new UnauthenticatedError("Password donot match")
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user,token})
}

const register = async (req, res) => {
    // const {email} = req.body
    // if(User.findOne({email})){
    //     throw new BadRequestError("Email already exist")
    // }
    const user = await User.create({ ...req.body })
    
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
  }

module.exports = {login,register}