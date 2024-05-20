import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddingEntity() {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const [entityName, setEntityName] = useState("");
  const [attributes, setAttributes] = useState([{ name: "", type: "string" }]);
  const navigate = useNavigate();
  
  const addAttribute = () => {
    setAttributes([...attributes, { name: "", type: "string" }]);
  };

  const handleAttributeChange = (index, field, value) => {
    const newAttributes = attributes.map((attr, i) => {
      if (i === index) {
        return { ...attr, [field]: value };
      }
      return attr;
    });
    setAttributes(newAttributes);
  };

  const createEntity = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/v1/entity/new`, {
        name: entityName,
        attributes: attributes,
      });
      console.log(response.data);
      toast.success("Entity created successfully.");
      navigate(`/entity/${entityName}`);
    } catch (error) {
      console.error("Error creating entity:", error);
      toast.error("Error creating entity");
    }
  };

  return (
    <div className="container p-8" style={{ minHeight: `calc(100vh - 60px)` }}>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Create Entity</h2>
        <div className="mb-4">
          <label className="block mb-1">Entity Name</label>
          <input
            type="text"
            className="border rounded p-2 w-full"
            value={entityName}
            onChange={(e) => setEntityName(e.target.value)}
            placeholder="Entity Name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Attributes</label>
          {attributes.map((attr, index) => (
            <div key={index} className="flex items-center mb-2 gap-2">
              <input
                type="text"
                placeholder="Attribute Name"
                className="border rounded p-2 flex-1"
                value={attr.name}
                onChange={(e) =>
                  handleAttributeChange(index, "name", e.target.value)
                }
              />
              <select
                className="border rounded p-2"
                value={attr.type}
                onChange={(e) =>
                  handleAttributeChange(index, "type", e.target.value)
                }
              >
                <option value="string">String</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
                <option value="boolean">Boolean</option>
                <option value="float">Float</option>
                <option value="text">Text</option>
              </select>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() =>
                  setAttributes(attributes.filter((_, i) => i !== index))
                }
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={addAttribute}
          >
            Add Attribute
          </button>
        </div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={createEntity}
        >
          Create Entity
        </button>
      </div>
    </div>
  );
}
