const {UnauthenticatedError,
    NotFoundError,
    BadRequestError} = require('../errors') 

const jwt = require('jsonwebtoken')


const authMiddleware = async (req,res,next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new BadRequestError("Not authorised access")
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        
        req.user = {userId:payload.userId,name:payload.name}
       
        next()
        
    } catch (error) {
        console.log(error.message)
    }
    

    
}

module.exports = authMiddleware