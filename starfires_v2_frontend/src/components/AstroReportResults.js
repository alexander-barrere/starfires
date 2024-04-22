import React from 'react';

const AstroReportResults = ({ report }) => {
  if (!report) {
    console.error("No report data provided.");
    return null;
  }

  return (
    <>
      <h2>Natal Chart</h2>
      {report.natal_chart ? (
        <div dangerouslySetInnerHTML={{ __html: report.natal_chart }} />
      ) : (
        <p>No natal chart data available.</p>
      )}

      <h2>Transit Forecast</h2>
      {report.transit_forecast ? (
        <p>{report.transit_forecast}</p>
      ) : (
        <p>No transit forecast data available.</p>
      )}

      <h2>Compatibility Report</h2>
      {report.compatibility_report ? (
        <p>{report.compatibility_report}</p>
      ) : (
        <p>No compatibility report data available.</p>
      )}
    </>
  );
};

export default AstroReportResults;