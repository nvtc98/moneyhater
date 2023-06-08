import {formatTenDigit} from './string';

export const getDateOfMonth = dateString => {
  return dateString.split('/')[0];
};

export const getMonthYear = dateString => {
  const frags = dateString.split('/');
  return frags[1] + '/' + frags[2];
};

export const getMonthYearOfDate = date => {
  return `${formatTenDigit(date.getMonth() + 1)}/${date.getFullYear()}`;
};
