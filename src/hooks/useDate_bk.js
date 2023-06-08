import {useEffect, useState} from 'react';
import {getMonthYearOfDate} from '../utils/date';
import useSheet from './useSheet';

export default () => {
  const {getTransactions} = useSheet();
  const [transactions, setTransactions] = useState(null);
  const [time, setTime] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    const getTransactionList = async () => {
      setTransactions(await getTransactions());
    };
    getTransactionList();
  }, []);

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

  const get3MonthsData = () => {
    const currentDate = getDate();
    const prevMonthDate = getDateOfDifferentMonth(currentDate, -1);
    const nextMonthDate = getDateOfDifferentMonth(currentDate, 1);
    return transactions
      ? [
          transactions[getMonthYearOfDate(prevMonthDate)],
          transactions[getMonthYearOfDate(currentDate)],
          transactions[getMonthYearOfDate(nextMonthDate)],
        ]
      : null;
  };

  return {getDate, addMonth, get3MonthsData};
};
