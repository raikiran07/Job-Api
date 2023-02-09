
const router = require('express').Router()
const {getAllJob,getSingleJob,createJob,updateJob,deleteJob} = require('../controllers/jobs')


router.route('/').get(getAllJob).post(createJob)
router.route('/:id').get(getSingleJob).patch(updateJob).delete(deleteJob)

module.exports = router