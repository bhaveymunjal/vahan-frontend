import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function ExistingEntities({ entities }) {
  return (
    <ul className="space-y-2">
      {entities.map((entity, index) => (
        <li
          key={index}
          className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
        >
          <span className="text-lg font-medium">{entity}</span>
          <Link to={`/entity/${entity}`}>
            <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-700">
              View
            </button>
          </Link>
        </li>
      ))}
    </ul>
  );
}

ExistingEntities.propTypes = {
  entities: PropTypes.array.isRequired
};
