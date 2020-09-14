import React, { useState } from 'react';
import axios from 'axios';
import './SMSForm.css';

const SMSForm = () => {
  const [formData, setformData] = useState({
    to: '',
    body: '',
    submitting: false,
    error: false,
  });

  const { to, body } = formData;

  const onChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setformData({ ...formData, submitting: true });
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        to,
        body,
      };
      console.log('speaking to the server...');
      const response = await axios.post('/api/messages', config);
      setformData({ ...formData, submitting: false });
      console.log('response from server ', response);
      response.json();
    } catch (err) {
      console.log(err);
      setformData({ ...formData, submitting: false, error: true });
    }
  };

  console.log(formData);
  return (
    <form className='sms-form' onSubmit={(e) => onSubmit(e)}>
      <div>
        <label htmlFor='to'>To:</label>
        <input
          type='tel'
          name='to'
          value={to}
          onChange={(e) => onChange(e)}
          id='to'
        />
      </div>
      <div>
        <label htmlFor='body'>Body:</label>
        <textarea
          name='body'
          value={body}
          onChange={(e) => onChange(e)}
          id='body'
        />
      </div>
      <button type='submit'>Send message</button>
    </form>
  );
};

export default SMSForm;
