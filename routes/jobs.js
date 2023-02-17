
const router = require('express').Router()
const authMiddleware = require('../middleware/authentication')
const {getAllJob,getSingleJob,createJob,updateJob,deleteJob} = require('../controllers/jobs')


router.route('/').get(getAllJob).post(authMiddleware,createJob)
router.route('/:id').get(authMiddleware,getSingleJob).patch(authMiddleware,updateJob).delete(authMiddleware,deleteJob)

module.exports = router