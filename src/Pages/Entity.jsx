import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ExistingRecords from "../Components/ExistingRecords";

const Entity = () => {
  const { entity } = useParams(); 
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [newRecordFormData, setNewRecordFormData] = useState({});
  const [columns, setColumns] = useState([]);

  const handleNewRecordChange = (e) => {
    setNewRecordFormData({
      ...newRecordFormData,
      [e.target.name]: e.target.value,
    });
  };

  const submitNewRecord = async () => {
    try {
      await axios.post(`${apiUrl}/api/v1/entity/${entity}`, newRecordFormData);
      fetchRecords();
      setShowPopup(false);
      setNewRecordFormData({});
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const fetchRecords = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/entity/${entity}`);
      setRecords(response.data);
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  const fetchColumns = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/entity/columns/${entity}`);
      setColumns(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching column metadata.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
    fetchColumns();
  }, [apiUrl, entity]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100" style={{ minHeight: `calc(100vh - 60px)` }}>
      <h1 className="text-4xl font-bold mb-8">
        <span className="uppercase">{entity}</span> Management
      </h1>
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          Records in <span className="uppercase">{entity}</span>
        </h2>
        {records.length > 0 ? (
          <ExistingRecords
            columns={columns}
            records={records}
            fetchRecords={fetchRecords}
          />
        ) : (
          <p className="text-gray-500">No records found.</p>
        )}
      </div>
      <button
        onClick={() => setShowPopup(true)}
        className="px-4 my-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
      >
        Create New Record
      </button>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              New Record in <span className="uppercase">{entity}</span>
            </h2>

            {columns.map((column) =>
              column.name !== "id" &&
              column.name !== "createdAt" &&
              column.name !== "updatedAt" ? (
                <div key={column.name} className="mb-4">
                  <label className="block mb-2" htmlFor={column.name}>
                    <span className="uppercase">{column.name}</span>
                  </label>
                  <input
                    type={column.dataType}
                    id={column.name}
                    name={column.name}
                    value={newRecordFormData[column.name] || ""}
                    onChange={handleNewRecordChange}
                    className="border rounded px-2 py-1 w-full"
                    placeholder={column.name}
                  />
                </div>
              ) : null
            )}
            <div className="flex justify-end">
              <button
                onClick={submitNewRecord}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 mr-2"
              >
                Create
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Entity;
