import React from 'react';
import './HourBox.css';

const HourBox = ({ value, onSelect, selected }) => {
  return (
    <div className={`day-box ${selected}`} onClick={() => onSelect(value)}>
      <p className='number'>{value}</p>
    </div>
  );
};

export default HourBox;
