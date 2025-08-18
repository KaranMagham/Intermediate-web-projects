import React, { useEffect } from 'react';

const DigitalClock = ({ zone }) => {
  const updateClock = async () => {
    try {
      const response = await fetch(`https://worldtimeapi.org/api/timezone/${zone}`);
      const data = await response.json();

      const now = new Date(data.datetime);
      let hour = now.getHours();
      let min = now.getMinutes();
      let sec = now.getSeconds();
      let period = hour >= 12 ? "PM" : "AM";

      hour = hour % 12 || 12;
      hour = hour < 10 ? "0" + hour : hour;
      min = min < 10 ? "0" + min : min;
      sec = sec < 10 ? "0" + sec : sec;

      const timesetter = `${hour}:${min}:${sec} ${period}`;
      document.getElementById('Digital').textContent = timesetter;

    } catch (error) {
      console.error('Error fetching time:', error);
    }
  };

  useEffect(() => {
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [zone]);

  return (
    <div className="text-[#f1faee] text-5xl sm:text-6xl md:text-7xl font-bold border-4 border-red-600 rounded-2xl px-6 py-4 shadow-lg bg-gradient-to-br from-[#171717] to-[#3e3e3e] animate-fadeIn" id="Digital"></div>
  );
};

export default DigitalClock;
