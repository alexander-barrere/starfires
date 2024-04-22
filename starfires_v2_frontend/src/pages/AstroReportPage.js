import React, { useState } from 'react';
import axios from '../utils/axiosDefaults';
import AstroReportForm from '../components/AstroReportForm';
import AstroReportResults from '../components/AstroReportResults';

const AstroReportPage = () => {
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  const fetchAstroReport = async (formData) => {
    try {
      console.log('Sending request to generate astrological report...');
      const response = await axios.post('/astrology/generate-report', formData);
      console.log('Astrological report generated successfully.');
      setReport(response.data);
      setError('');
    } catch (error) {
      console.error('Failed to generate astrological report:', error);
      setError('Failed to generate astrological report. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Astrology Report</h1>
      <AstroReportForm onSubmit={fetchAstroReport} />
      {error && <p className="text-red-500">{error}</p>}
      {report && <AstroReportResults report={report} />}
    </div>
  );
};

export default AstroReportPage;