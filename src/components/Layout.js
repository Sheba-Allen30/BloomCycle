import { Outlet } from "react-router-dom";
import "./Layout.css";
import Navbar from "./Navbar";

function Layout() {
  return (
    <>
      <Navbar />

      {/* Main Content Rendered Here */}
      <div className="app-content">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;