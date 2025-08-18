import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import DigitalClock from '../components/Clock';

const Time = () => {
  const [zone, setZone] = useState("Asia/Kolkata");
  const [time, setTime] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setZone(data.zone);  // update zone for the <DigitalClock />

      const res = await fetch(`https://worldtimeapi.org/api/timezone/${data.zone}`);
      const result = await res.json();

      setTime(result.datetime);  // ✅ Now this is a real date-time string
    } catch (error) {
      console.error("Error fetching time:", error);
    }
  };


  return (
    <div className='min-h-screen w-full bg-gradient-to-b from-black via-zinc-900 to-zinc-800 px-4 py-6 text-white'>

      {/* Top Navbar */}
      <div className="sticky top-0 z-10 bg-black py-2 mb-6 shadow-lg">
        <Link to="/" className='text-3xl font-bold text-red-500 px-3 hover:text-red-400 transition-all duration-300'>
          Time Zone.
        </Link>
        <div className='w-full h-0.5 bg-red-500 mt-2'></div>
      </div>

      {/* Section: Current Clock */}
      <section className='mb-8'>
        <h2 className='text-2xl font-semibold mb-2 text-red-400'>Your Local Time:</h2>
        <div className='p-4 rounded-lg shadow-lg w-fit'>
          <DigitalClock zone={zone} />
        </div>
      </section>

      {/* Section: Select Country */}
      <section className='mb-10'>
        <h2 className='text-2xl font-semibold text-red-400 mb-4'>Check Time in Another Country</h2>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          {/* Optional Input */}
          <div>
            <input
              type="text"
              placeholder='Enter Country Label (Optional)'
              {...register("title")}
              className="bg-zinc-800 border border-red-500 focus:ring-red-500 w-full p-3 rounded text-white placeholder:text-red-300"
              autoComplete="off"
            />
            {errors.title && (
              <p className="text-red-300 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Dropdown */}
          <div>
            <select {...register("zone")} defaultValue={zone}
              className="bg-zinc-800 border border-red-500 text-red-100 w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500">
              <option disabled>-- Select Timezone --</option>
              <option value="Asia/Kolkata">Asia/Kolkata (India)</option>
              <option value="Asia/Dubai">Asia/Dubai (UAE)</option>
              <option value="Asia/Tokyo">Asia/Tokyo (Japan)</option>
              <option value="America/New_York">America/New_York (USA)</option><option value="Africa/Cairo">Africa/Cairo</option>
              <option value="Africa/Johannesburg">Africa/Johannesburg</option>
              <option value="Africa/Lagos">Africa/Lagos</option>
              <option value="America/Argentina/Buenos_Aires">America/Argentina/Buenos_Aires</option>
              <option value="America/Chicago">America/Chicago</option>
              <option value="America/Denver">America/Denver</option>
              <option value="America/Los_Angeles">America/Los_Angeles</option>
              <option value="America/Mexico_City">America/Mexico_City</option>
              <option value="America/New_York">America/New_York</option>
              <option value="America/Phoenix">America/Phoenix</option>
              <option value="America/Sao_Paulo">America/Sao_Paulo</option>
              <option value="Asia/Bangkok">Asia/Bangkok</option>
              <option value="Asia/Colombo">Asia/Colombo</option>
              <option value="Asia/Hong_Kong">Asia/Hong_Kong</option>
              <option value="Asia/Jakarta">Asia/Jakarta</option>
              <option value="Asia/Karachi">Asia/Karachi</option>
              <option value="Asia/Kathmandu">Asia/Kathmandu</option>
              <option value="Asia/Kuala_Lumpur">Asia/Kuala_Lumpur</option>
              <option value="Asia/Muscat">Asia/Muscat</option>
              <option value="Asia/Seoul">Asia/Seoul</option>
              <option value="Asia/Shanghai">Asia/Shanghai</option>
              <option value="Asia/Singapore">Asia/Singapore</option>
              <option value="Asia/Yangon">Asia/Yangon</option>
              <option value="Australia/Adelaide">Australia/Adelaide</option>
              <option value="Australia/Brisbane">Australia/Brisbane</option>
              <option value="Australia/Darwin">Australia/Darwin</option>
              <option value="Australia/Melbourne">Australia/Melbourne</option>
              <option value="Australia/Perth">Australia/Perth</option>
              <option value="Australia/Sydney">Australia/Sydney</option>
              <option value="Europe/Amsterdam">Europe/Amsterdam</option>
              <option value="Europe/Athens">Europe/Athens</option>
              <option value="Europe/Berlin">Europe/Berlin</option>
              <option value="Europe/Brussels">Europe/Brussels</option>
              <option value="Europe/Bucharest">Europe/Bucharest</option>
              <option value="Europe/Helsinki">Europe/Helsinki</option>
              <option value="Europe/Istanbul">Europe/Istanbul</option>
              <option value="Europe/Lisbon">Europe/Lisbon</option>
              <option value="Europe/London">Europe/London</option>
              <option value="Europe/Madrid">Europe/Madrid</option>
              <option value="Europe/Moscow">Europe/Moscow</option>
              <option value="Europe/Oslo">Europe/Oslo</option>
              <option value="Europe/Paris">Europe/Paris</option>
              <option value="Europe/Prague">Europe/Prague</option>
              <option value="Europe/Rome">Europe/Rome</option>
              <option value="Europe/Stockholm">Europe/Stockholm</option>
              <option value="Pacific/Auckland">Pacific/Auckland</option>
              <option value="Pacific/Fiji">Pacific/Fiji</option>
            </select>

          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-400 text-black font-semibold py-2 px-6 rounded shadow"
            >
              Get Time
            </button>
          </div>
        </form>
      </section>

      {/* Display Fetched Time */}
      {time && (
        <section className='mt-6 bg-zinc-800 p-4 rounded shadow w-fit'>
          <h3 className='text-lg text-green-400'>Time in {zone}:</h3>
          <p className='text-white mt-1'>{new Date(time).toLocaleString('en-US', { timeZone: zone })}</p>
        </section>
      )}

    </div>
  );
};

export default Time;
