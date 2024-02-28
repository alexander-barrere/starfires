// All the imports required for the controller
const Course = require('../models/Course');
const UserProgress = require('../models/UserProgress');
const Assessment = require('../models/Assessment');

// Function to retrieve all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Function to get user progress for a specific course
exports.getUserProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const courseId = req.params.courseId;
    const progress = await UserProgress.findOne({ user: userId, course: courseId });
    if (!progress) {
      return res.status(404).json({ msg: 'Progress not found' });
    }
    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Function to get assessment for a specific course
exports.getAssessmentForCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const assessment = await Assessment.findOne({ course: courseId });
    if (!assessment) {
      return res.status(404).json({ msg: 'Assessment not found' });
    }
    res.json(assessment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
