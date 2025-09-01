import React, { useState } from 'react';
import { testConnection } from '../services/api';

const TestConnection = () => {
  const [status, setStatus] = useState('');
  const [response, setResponse] = useState('');

  const testBackendConnection = async () => {
    try {
      setStatus('Testing connection to backend...');
      const result = await testConnection();
      setStatus('Connection successful!');
      setResponse(JSON.stringify(result, null, 2));
    } catch (error) {
      setStatus('Connection failed!');
      setResponse(error.message || 'Unknown error');
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>Backend Connection Test</h3>
      <button onClick={testBackendConnection}>Test Backend Connection</button>
      <p>Status: {status}</p>
      <pre>{response}</pre>
    </div>
  );
};

export default TestConnection;