import React, { useEffect, useState } from 'react';
import './Spinner.css';

const Spinner = ({ visible }) => {
  const [visibility, setVisibility] = useState('hidden');

  useEffect(() => {
    if (visible) {
      setVisibility('visible');
    } else {
      setVisibility('hidden');
    }
  }, [visible]);

  return (
    <div className={`spinner-background ${visibility}`}>
      <div className={`spinner ${visibility}`}></div>
    </div>
  );
};

export default Spinner;
