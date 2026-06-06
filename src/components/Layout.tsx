import { Link, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import type { LayoutProps } from "../types";

const Layout: React.FC<LayoutProps> = ({ withSidebar = false }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col antialiased text-gray-950">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            Global products
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link
              to="/"
              className="text-gray-600 hover:text-emerald-600 transition-colors"
            >
              Products
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              to="/products/add"
              className="text-gray-600 hover:text-emerald-600 transition-colors"
            >
              Add new product
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 flex gap-8">
        {withSidebar && (
          <aside className="w-64 shrink-0">
            <Sidebar />
          </aside>
        )}

        <section
          className={`flex-1 bg-white p-6 rounded-xl border border-gray-200 shadow-xs ${!withSidebar ? "max-w-4xl mx-auto w-full" : ""}`}
        >
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Layout;
