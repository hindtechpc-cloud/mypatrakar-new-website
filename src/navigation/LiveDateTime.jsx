import React, { useEffect, useState } from "react";

const LiveDateTime = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // cleanup
  }, []);

  const formattedDate = dateTime.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = dateTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  
    hour12: true,
  });

  return (
    <div className="">
      <span className="text-sm">
        {formattedDate}, {formattedTime}
      </span>
    </div>
  );
};

export default LiveDateTime;
