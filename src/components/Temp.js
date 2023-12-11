import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Temp = () => {
  const [sensorValue, setSensorValue] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:3001');

    socket.on('sensorData', (data) => {
      setSensorValue(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Temperatura local</h2>
      {sensorValue !== null && <p>Valor do Sensor: {sensorValue}</p>}
    </div>
  );
};

export default Temp;