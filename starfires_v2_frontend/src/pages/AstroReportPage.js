import React, { useState } from 'react';
import axios from '../utils/axiosDefaults';
import AstroReportForm from '../components/AstroReportForm';
import AstroReportResults from '../components/AstroReportResults';

const AstroReportPage = () => {
  const [report, setReport] = useState(null);

  const fetchAstroReport = async (formData) => {
    try {
      const response = await axios.post('/astrology/generate-report', formData);
      setReport(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Astrology Report</h1>
      <AstroReportForm onSubmit={fetchAstroReport} />
      {report && <AstroReportResults report={report} />}
    </div>
  );
};

export default AstroReportPage;
