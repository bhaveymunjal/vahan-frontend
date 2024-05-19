import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ExistingEntities from "../Components/ExistingEntities";

export default function Home() {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  
  const [entities, setEntities] = useState([]);

  const fetchEntities = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/entity/all`);
      setEntities(response.data);
    } catch (error) {
      console.error("Error fetching entities:", error);
    }
  };

  useEffect(() => {
    fetchEntities();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100" style={{ minHeight: `calc(100vh - 60px)` }} >
      <h1 className="text-4xl font-bold mb-8">Entity Management System</h1>
      <div className="space-x-4 mb-8">
        <Link to="/adding-entity">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
            Create New Entity
          </button>
        </Link>
      </div>
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Existing Entities</h2>
        {entities.length > 0 ? (
          <ExistingEntities entities={entities} />
        ) : (
          <p className="text-gray-500">No entities found.</p>
        )}
      </div>
    </div>
  );
}
