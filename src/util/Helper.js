export const createADateForCalendar = (day, month, year) => {
  day = String(day).padStart(2, '0');
  month = String(month).padStart(2, '0');
  return year + '-' + month + '-' + day;
}

export const convertDateToHHMMSS = (date) => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return hours + '.' + minutes + '.' + seconds;
}

export const getLocalizedMonthName = (month) => {
  const months = [
    'tammikuu',
    'helmikuu',
    'maaliskuu',
    'huhtikuu',
    'toukokuu',
    'kesäkuu',
    'heinäkuu',
    'elokuu',
    'syyskuu',
    'lokakuu',
    'marraskuu',
    'joulukuu'
  ]
  return months[month];
}

export const getLastDayOfMonth = (month) => {
  switch (month) {
    case 0:
      return 31;
    case 1:
      const year = parseInt(new Date().getFullYear());
      if ((year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0)) { 
        return 29;
      } else {
        return 28;
      }
    case 2:
      return 31;
    case 3:
      return 30; 
    case 4:
      return 31; 
    case 5:
      return 30
    case 6:
      return 31;
    case 7: 
      return 31;  
    case 8:
      return 30;  
    case 9:
      return 31;     
    case 10:
      return 30;
    case 11:
      return 31;
      break;
  }
}