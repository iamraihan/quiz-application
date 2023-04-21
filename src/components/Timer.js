import { useEffect, useState } from "react";

const Timer = ({ showResult }) => {
  const initialMinute = 10;
  const initialSeconds = 0;

  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [totalSecond, setTotalSecond] = useState(1);

  useEffect(() => {
    if (showResult) {
      return;
    }
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);

        setTotalSecond(totalSecond + 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div className="text-center mb-4">
      {showResult ? (
        <div className="text-lg font-bold">
          {" "}
          {Math.floor((totalSecond % 3600) / 60)} :{" "}
          {Math.floor(totalSecond % 60)}
        </div>
      ) : (
        <div>
          {minutes === 0 && seconds === 0 ? null : (
            <h1 className="text-lg font-bold">
              {" "}
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Timer;
