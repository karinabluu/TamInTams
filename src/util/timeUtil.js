export const getTime = () => {
    return new Date().getTime();
  };


// timeUtil.js
export const TimeCalc = (date) => {
    // Implement the TimeCalc function here
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };