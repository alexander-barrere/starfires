import React from 'react';

const AstroReportResults = ({ report }) => {
  return (
    <>
      <h2>Natal Chart</h2>
      {/* Render natal chart details */}
      <div dangerouslySetInnerHTML={{ __html: report.natal_chart }} />

      <h2>Transit Forecast</h2>
      {/* Render transit forecast details */}
      <p>{report.transit_forecast}</p>

      <h2>Compatibility Report</h2>
      {/* Render compatibility report details */}
      <p>{report.compatibility_report}</p>
    </>
  );
};

export default AstroReportResults;
