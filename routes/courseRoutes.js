// All the imports required for the routers
const express = require('express');
const courseController = require('../controllers/courseController');
const { check } = require('express-validator');

const router = express.Router();

// Define the course routes here
router.get('/', courseController.getCourses);
router.get('/progress/:userId/:courseId', courseController.getUserProgress);
router.post('/progress/update', [
  check('userId', 'userId is required').not().isEmpty(),
  check('courseId', 'courseId is required').not().isEmpty(),
], courseController.updateUserProgress);
router.get('/assessments/:courseId', courseController.getAssessmentForCourse);
router.post('/astrology-chart', courseController.getAstrologyChart);

module.exports = router;
