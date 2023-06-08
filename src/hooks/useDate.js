import {useState} from 'react';

export default () => {
  const [time, setTime] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const getDate = () => {
    return new Date(`${time.year}/${time.month}/1`);
  };

  const getDateOfDifferentMonth = (currentDate, monthOffset) => {
    const tempDate = new Date(currentDate);
    return new Date(tempDate.setMonth(tempDate.getMonth() + monthOffset));
  };

  const addMonth = numberOfMonths => {
    const newDate = getDateOfDifferentMonth(getDate(), numberOfMonths);
    setTime({
      month: newDate.getMonth() + 1,
      year: newDate.getFullYear(),
    });
  };

  return {getDate, addMonth};
};
