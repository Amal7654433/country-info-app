import React, { useEffect, useState } from "react";
import { fetchAllCountries } from "../services/api";
import CountryCard from "../components/CountryCard";
import Loader from "../components/Loader";

interface Country {
  name: string;
  flag: string;
  region: string;
  population: number;
  timezones: string[];
  code: string;
}

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [timezone, setTimezone] = useState("");
  const [loading, setLoading] = useState(true);
  const [timezonesList, setTimezonesList] = useState<string[]>([]);

  useEffect(() => {
    fetchAllCountries()
      .then(res => {
        setCountries(res.data);
        setFilteredCountries(res.data);
        setTimezonesList(
          Array.from(new Set(res.data.flatMap((c: Country) => c.timezones))).sort()
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = countries;

    if (search) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (region) {
      filtered = filtered.filter(c => c.region === region);
    }

    if (timezone) {
      filtered = filtered.filter(c => c.timezones.includes(timezone));
    }

    setFilteredCountries(filtered);
  }, [search, region, timezone, countries]);

  if (loading) return <Loader />;

  return (
    <div className="p-4">
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by country name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        <select
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Timezones</option>
          {timezonesList.map((tz, idx) => (
            <option key={idx} value={tz}>
              {tz}
            </option>
          ))}
        </select>
      </div>

      {/* Countries Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredCountries.map((country, idx) => (
          <CountryCard
            key={idx}
            name={country.name}
            flag={country.flag}
            region={country.region}
            population={country.population}
            timezone={country.timezones?.[0] || "UTC"}
            code={country.code}
          />
        ))}
      </div>
    </div>
  );
};

export default CountryList;
