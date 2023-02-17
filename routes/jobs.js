
const router = require('express').Router()
const authMiddleware = require('../middleware/authentication')
const {getAllJob,getSingleJob,createJob,updateJob,deleteJob,getMyJob} = require('../controllers/jobs')


router.route('/').get(getAllJob).post(authMiddleware,createJob)
router.route('/getmyjobs').get(authMiddleware,getMyJob)
router.route('/:id').get(authMiddleware,getSingleJob).patch(authMiddleware,updateJob).delete(authMiddleware,deleteJob)

module.exports = router