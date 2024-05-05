import React from 'react';
import { useForm } from 'react-hook-form';

const AstroReportForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onFormSubmit = (formData) => {
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="form-control">
        <label htmlFor="birthDateTime" className="label">Birth Date and Time</label>
        <input id="birthDateTime" type="datetime-local" {...register('birthDateTime', { required: true })} className="input input-bordered" />
        {errors.birthDateTime && <span className="label text-error">Birth date and time is required</span>}
      </div>
      <div className="form-control">
        <label htmlFor="latitude" className="label">Latitude</label>
        <input id="latitude" type="number" step="any" {...register('latitude', { required: true })} className="input input-bordered" />
        {errors.latitude && <span className="label text-error">Latitude is required</span>}
      </div>
      <div className="form-control">
        <label htmlFor="longitude" className="label">Longitude</label>
        <input id="longitude" type="number" step="any" {...register('longitude', { required: true })} className="input input-bordered" />
        {errors.longitude && <span className="label text-error">Longitude is required</span>}
      </div>
      <input type="submit" className="btn btn-primary" value="Generate Report" />
    </form>
  );
};

export default AstroReportForm;