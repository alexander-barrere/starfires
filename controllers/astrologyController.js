const { spawn } = require('child_process');
const path = require('path');

exports.generateAstrologicalReport = (req, res) => {
  const { firstName, birthDate, birthTime, city, chartType } = req.body;
  const scriptPath = path.join(__dirname, '../python-scripts/astro_report.py');

  const process = spawn('python', [scriptPath, firstName, birthDate, birthTime, city, chartType]);
  let dataToSend;

  process.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    dataToSend += data.toString();
  });
  
  process.on('close', (code) => {
    if (code !== 0) {
      return res.status(500).send('Error generating chart');
    } else {
      res.send({ chartPath: dataToSend.trim() });
    }
  });
};
