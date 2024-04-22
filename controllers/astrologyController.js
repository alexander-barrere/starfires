const { spawn } = require('child_process');
const path = require('path');

exports.generateAstrologicalReport = (req, res) => {
  const { firstName, birthDate, birthTime, latitude, longitude, city, chartType } = req.body;
  const scriptPath = path.join(__dirname, '../python-scripts/astro_report.py');

  const process = spawn('python', [scriptPath, firstName, birthDate, birthTime, latitude, longitude, city, chartType]);
  let dataToSend = "";

  process.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    dataToSend += data.toString();
  });

  process.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  process.on('error', (error) => {
    console.error('Error spawning Python script:', error);
    res.status(500).send('Server Error');
  });
  
  process.on('close', (code) => {
    console.log(`Python script exited with code: ${code}`);
    if (code !== 0) {
      return res.status(500).send('Error generating chart');
    } else {
      res.send({ chartPath: dataToSend.trim() });
    }
  });
};