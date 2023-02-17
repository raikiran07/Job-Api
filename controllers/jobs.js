
const Job = require('../models/Job')
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')


const getMyJob = async (req,res) => {
    const {userId} = req.user
    try {

        const jobs = await Job.find({createdBy:userId})
        res.status(StatusCodes.OK).json({jobs,count:jobs.length})
        
    } catch (error) {
        throw new BadRequestError(error.message)
    }
   

}

const getAllJob = async (req,res) => {
        const jobs = await Job.find({})
        if(!jobs){
            return res.status(StatusCodes.OK).json({msg:`No job available`})
        }

        res.status(StatusCodes.OK).json({jobs})
}

const getSingleJob = async (req,res) => {
    const {id} = req.params 
   
    const {userId} = req.user
  
    const job = await Job.findOne({_id:id,createdBy:userId})
   
    if(!job){
        throw new BadRequestError(`No job with this id ${id}`)
    }
    res.status(StatusCodes.OK).json({job})
}

const createJob = async (req,res) => {
    // console.log(req.user)
    req.body.createdBy = req.user.userId
   
    const user = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({user})


}

const updateJob = async (req,res) => {
const {Company,Position} = req.body
    if(!Company || !Position){
        throw new BadRequestError("Enter Company and position name")
    }
    const {userId} = req.user
    const {id} = req.params
    const job = await Job.findOneAndUpdate({_id:id,createdBy:userId},req.body,{ new: true, runValidators: true })

    if(!job){
        throw new BadRequestError(`No job with this id ${id}`)
    }
    res.status(StatusCodes.OK).json({job})
}

const deleteJob = async (req,res) => {
    const {id} = req.params
    const {userId} = req.user

    const job = await Job.findOneAndDelete({_id:id,createdBy:userId})
    if(!job){
        throw new BadRequestError(`No job with id ${id}`)
    }
    
    res.status(StatusCodes.OK).json({job})
}

module.exports = {getAllJob,getSingleJob,createJob,updateJob,deleteJob,getMyJob}