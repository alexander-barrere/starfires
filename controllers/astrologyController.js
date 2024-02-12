const User = require('../models/User');
const AstroChart = require('node-astro-chart'); // Hypothetical library - replace with real one if available

exports.getAstrologyChart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    const chartData = AstroChart.calculate({
      date: user.birthDate,
      time: user.birthTime,
      latitude: user.birthLatitude,
      longitude: user.birthLongitude
    });
    const svgChart = AstroChart.generateSVG(chartData);
    res.set('Content-Type', 'image/svg+xml');
    res.send(svgChart);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
