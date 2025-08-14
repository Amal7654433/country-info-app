import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
  flag: string;
  region: string;
  population: number;
  timezone: string;
  code: string;
}

const CountryCard: React.FC<Props> = ({ name, flag, region, population, timezone, code }) => {
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone: timezone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true
        };
        setTime(new Intl.DateTimeFormat("en-US", options).format(now));
      } catch {
        setTime("N/A");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div
      onClick={() => navigate(`/country/${code}`)}
      className="border rounded shadow hover:shadow-lg p-4 flex flex-col items-center transition cursor-pointer"
    >
      <img src={flag} alt={name} className="w-32 h-20 object-cover mb-4" />
      <h3 className="font-bold">{name}</h3>
      <p className="text-sm text-gray-600">Region: {region}</p>
      <p className="text-sm text-gray-600">Population: {population.toLocaleString()}</p>
      <p className="text-sm text-gray-800 font-medium mt-2">Local Time: {time}</p>
    </div>
  );
};

export default CountryCard;
