import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AstroReportForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    birthDate: '',
    birthTime: '',
    latitude: '',
    longitude: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Birth Date</Form.Label>
        <Form.Control type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Birth Time</Form.Label>
        <Form.Control type="time" name="birthTime" value={formData.birthTime} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Latitude</Form.Label>
        <Form.Control type="number" name="latitude" value={formData.latitude} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Longitude</Form.Label>
        <Form.Control type="number" name="longitude" value={formData.longitude} onChange={handleChange} required />
      </Form.Group>
      <Button type="submit">Generate Report</Button>
    </Form>
  );
};

export default AstroReportForm;
