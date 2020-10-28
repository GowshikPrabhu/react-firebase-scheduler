import React from 'react';
import HourBox from '../HourBox/HourBox';
import './DayContainer.css';

const DayContainer = ({ day, onSelect, selectedHours }) => {
  let hours = [...Array(25).keys()];

  return (
    <div className='day-container'>
      <p className='day-name'>{day}</p>
      <div className='day-hours'>
        {hours.map((hour, index) => (
          <HourBox
            value={hour}
            key={index}
            onSelect={(value) => onSelect(value, day)}
            selected={selectedHours.includes(hour) ? 'selected' : ''}
          />
        ))}
      </div>
    </div>
  );
};

export default DayContainer;
