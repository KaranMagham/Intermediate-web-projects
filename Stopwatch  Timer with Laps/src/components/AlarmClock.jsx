import { useEffect, useState } from "react";

export default function AlarmClock() {
    const [currentTime, setCurrentTime] = useState("Loading...");
    const [alarmTime, setAlarmTime] = useState(null);
    const [alarmActive, setAlarmActive] = useState(false);

    // ⏰ Update current time every second
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const hour = String(now.getHours()).padStart(2, "0");
            const min = String(now.getMinutes()).padStart(2, "0");
            const sec = String(now.getSeconds()).padStart(2, "0");
            setCurrentTime(`${hour}:${min}:${sec}`);

            // 🔔 Alarm checking
            const formattedTime = `${hour}:${min}`;
            if (alarmTime === formattedTime && !alarmActive) {
                setAlarmActive(true);
                alert("⏰ Time's up! Alarm triggered.");
                setAlarmTime(null);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [alarmTime, alarmActive]);

    // 🔘 Set alarm
    const handleSetAlarm = () => {
        const input = document.getElementById("alarm-time").value;
        if (!input) {
            alert("⚠️ Please set a valid alarm time.");
            return;
        }
        setAlarmTime(input);
        setAlarmActive(false);
        alert(`✅ Alarm set for ${input}`);
    };

    // ❌ Stop alarm
    const handleStopAlarm = () => {
        setAlarmTime(null);
        setAlarmActive(false);
        alert("🛑 Alarm stopped.");
    };

    return (
        <div className="h-screen flex items-center justify-center  text-white font-sans">
            <div className="bg-gradient-to-br from-black via-[#1f1f1f] to-[#383838] border-3 border-gray-700 rounded-2xl shadow-xl p-8 w-[90vw] sm:w-[35vw] flex flex-col justify-center items-center space-y-6">
                <h1 className="text-2xl font-semibold text-gray-100">Set Your Time</h1>

                <div
                    id="current-time"
                    className={`text-lg font-mono tracking-wide ${alarmActive ? "text-red-500 font-bold" : "text-gray-300"
                        }`}
                >
                    {currentTime}
                </div>

                <div className="text-center">
                    <label htmlFor="alarm-time" className="text-base text-gray-400 mr-2">
                        Set-Time:
                    </label>
                    <input
                        type="time"
                        id="alarm-time"
                        className="p-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                    />
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={handleSetAlarm}
                        className="bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-full px-6 py-2 hover:scale-105 hover:shadow-xl transition duration-300 font-medium"
                    >
                        Set Alarm
                    </button>
                    <button
                        onClick={handleStopAlarm}
                        className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-full px-6 py-2 hover:scale-105 hover:shadow-xl transition duration-300 font-medium"
                    >
                        Stop Alarm
                    </button>
                </div>
            </div>
        </div>
    );
}
