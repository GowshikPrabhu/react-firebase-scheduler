import React, { useEffect, useState } from 'react';
import DayContainer from './components/DayContainer/DayContainer';
import './Home.css';
import { db } from '../firebase/firebase';
import Spinner from '../components/Spinner/Spinner';

const BoxContainer = () => {
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];
  const [selectedHours, setSelectedHours] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  });
  const [isLoading, setLoading] = useState(false);

  const handleSelection = (value, day) => {
    let d = day.toLowerCase();
    let s = selectedHours;
    let idx = s[d].findIndex((val) => val === value);
    if (idx !== -1) {
      s[d].splice(idx, 1);
      setSelectedHours({ ...s });
    } else {
      s[d].push(value);
      setSelectedHours({ ...s });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    db.collection('schedules')
      .doc('user1')
      .set(selectedHours)
      .then(() => {
        console.log('Created');
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const getSchedules = () => {
      setLoading(true);
      db.collection('schedules')
        .doc('user1')
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log(doc.data());
            setSelectedHours({ ...doc.data() });
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setLoading(false));
    };

    getSchedules();
  }, []);

  return (
    <div>
      <Spinner visible={isLoading} />
      <header>
        <h2 className='header'>React scheduler</h2>
      </header>
      <div>
        <h3 className='head-info'>
          Select the time you are available for a week
        </h3>
        <div className='home-container'>
          <div className='week-days-container'>
            {days.map((day, index) => (
              <DayContainer
                day={day}
                key={index}
                onSelect={handleSelection}
                selectedHours={selectedHours[day.toLowerCase()]}
              />
            ))}
          </div>
          <button className='submit' onClick={handleSubmit}>
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoxContainer;
