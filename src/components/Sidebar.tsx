import { NavLink } from "react-router-dom";
import { CATEGORIES } from "../constants";

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-1 sticky top-24">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
        Categories
      </h2>

      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            isActive
              ? "bg-emerald-50 text-emerald-700"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-950"
          }`
        }
      >
        All
      </NavLink>

      {CATEGORIES.map((category) => (
        <NavLink
          key={category.id}
          to={`/products/category/${category.id}`}
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? "bg-emerald-50 text-emerald-700"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-950"
            }`
          }
        >
          {category.title}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
