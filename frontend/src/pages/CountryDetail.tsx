import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCountryByCode } from "../services/api";
import Loader from "../components/Loader";

interface Country {
  name: string;
  flag: string;
  region: string;
  population: number;
  currencies: string[];
  languages: string[];
}

const CountryDetail: React.FC = () => {
  const { code } = useParams();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (code) {
      fetchCountryByCode(code)
        .then(res => {
          setCountry(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [code]);

  if (loading) return <Loader />;

  if (!country) {
    return <div className="p-4 text-center">Country not found</div>;
  }

  return (
    <div className="p-4">
      <Link to="/" className="text-blue-500 underline">&larr; Back</Link>
      <div className="flex flex-col items-center mt-4">
        <img src={country.flag} alt={country.name} className="w-64 h-40 object-cover mb-4" />
        <h1 className="text-3xl font-bold mb-2">{country.name}</h1>
        <p className="text-lg">Region: {country.region}</p>
        <p className="text-lg">Population: {country.population.toLocaleString()}</p>
        <p className="text-lg">Currencies: {country.currencies.join(", ")}</p>
        <p className="text-lg">Languages: {country.languages.join(", ")}</p>
      </div>
    </div>
  );
};

export default CountryDetail;
