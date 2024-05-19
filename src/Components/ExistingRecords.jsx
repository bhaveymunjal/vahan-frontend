import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
export default function ExistingRecords({ columns, records, fetchRecords }) {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const { entity } = useParams();
  const [editingRecordId, setEditingRecordId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/v1/entity/${entity}/${id}`);
      fetchRecords();
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const handleEdit = async (id) => {
    setEditingRecordId(id);
    const recordToEdit = records.find((record) => record.id === id);
    setEditFormData(recordToEdit);
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const cancelEdit = () => {
    setEditingRecordId(null);
    setEditFormData({});
  };

  const submitEdit = async () => {
    try {
      await axios.put(`${apiUrl}/api/v1/entity/${entity}/${editingRecordId}`, {
        data: editFormData,
      });
      fetchRecords();
      setEditingRecordId(null);
      setEditFormData({});
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {columns
              .filter(
                (column) =>
                  !["id", "createdAt", "updatedAt"].includes(column.name)
              )
              .map((column, i) => (
                <th key={i} className="border px-4 py-2 uppercase">
                  {column.name}
                </th>
              ))}
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              {Object.entries(record)
                .filter(
                  ([key]) => !["id", "createdAt", "updatedAt"].includes(key)
                )
                .map(([key, value], index) => (
                  <td key={index} className="border px-4 py-2">
                    {editingRecordId === record.id ? (
                      <input
                        type={columns.find((col) => col.name === key).dataType}
                        name={key}
                        value={editFormData[key] || ""}
                        onChange={handleEditChange}
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      <p className="text-center">{value}</p>
                    )}
                  </td>
                ))}
              <td className="border px-4 py-2">
                {editingRecordId === record.id ? (
                  <div className="whitespace-nowrap">
                    <button
                      onClick={submitEdit}
                      className="mr-2 text-green-500 hover:text-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <button
                      onClick={() => handleDelete(record.id)}
                      className="mr-2 text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={() => handleEdit(record.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
ExistingRecords.propTypes = {
  columns: PropTypes.array,
  records: PropTypes.array,
  fetchRecords: PropTypes.func,
};
