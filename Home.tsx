import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTables } from "../context/TableContext";
import {
  TableProperties,
  Search,
  Users,
  LogIn,
  LogOut,
  BarChart3,
  History,
  UtensilsCrossed,
  CircleCheckBig,
  CircleX,
} from "lucide-react";

import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const { tables } = useTables();

  const [showMenu, setShowMenu] = useState(
    location.state?.showMenu || false
  );

  const available = tables.filter(
    (table) => table.status === "Available"
  ).length;

  const occupied = tables.filter(
    (table) => table.status === "Occupied"
  ).length;

  /* ========================= */
  /* Landing Page */
  /* ========================= */

  if (!showMenu) {
    return (
      <div className="home">
        <div className="background-circle circle1"></div>
        <div className="background-circle circle2"></div>
        <div className="background-circle circle3"></div>

        <div className="landing-card">
          <div className="logo">
            <UtensilsCrossed size={70} />
          </div>

          <h1>
            <span>Food Court</span>
            <br />
            <span>Table Tracker</span>
          </h1>

          <p>Find your seat instantly.</p>

          <button
            className="start-btn"
            onClick={() => setShowMenu(true)}
          >
            Get Started →
          </button>
        </div>
      </div>
    );
  }

  /* ========================= */
  /* Dashboard */
  /* ========================= */

  return (
    <div className="home">
      <div className="background-circle circle1"></div>
      <div className="background-circle circle2"></div>
      <div className="background-circle circle3"></div>

      <div className="dashboard">
        <h1>
          <UtensilsCrossed
            size={32}
            style={{
              marginRight: "10px",
              verticalAlign: "middle",
            }}
          />
          Food Court Tracker
        </h1>

        <p className="subtitle">Welcome!</p>

        <div className="stats">
          <div className="stat-card available-card">
            <CircleCheckBig size={22} />
            <h2>{available}</h2>
            <span>Available</span>
          </div>

          <div className="stat-card occupied-card">
            <CircleX size={22} />
            <h2>{occupied}</h2>
            <span>Occupied</span>
          </div>
        </div>

        {/* View Tables */}
        <div
          className="menu-card"
          onClick={() => navigate("/viewtables")}
        >
          <div className="menu-icon">
            <TableProperties size={28} />
          </div>

          <div className="menu-text">
            <h3>View Tables</h3>
          </div>
        </div>

        {/* Search Table */}
        <div
          className="menu-card"
          onClick={() => navigate("/search")}
        >
          <div className="menu-icon">
            <Search size={28} />
          </div>

          <div className="menu-text">
            <h3>Search Table</h3>
          </div>
        </div>

        {/* Search by Capacity */}
        <div
          className="menu-card"
          onClick={() => navigate("/capacity")}
        >
          <div className="menu-icon">
            <Users size={28} />
          </div>

          <div className="menu-text">
            <h3>Search by Capacity</h3>
          </div>
        </div>

        {/* Check In */}
        <div
          className="menu-card"
          onClick={() => navigate("/checkin")}
        >
          <div className="menu-icon">
            <LogIn size={28} />
          </div>

          <div className="menu-text">
            <h3>Check In</h3>
          </div>
        </div>

        {/* Check Out */}
        <div
          className="menu-card"
          onClick={() => navigate("/checkout")}
        >
          <div className="menu-icon">
            <LogOut size={28} />
          </div>

          <div className="menu-text">
            <h3>Check Out</h3>
          </div>
        </div>

        {/* Statistics */}
        <div
          className="menu-card"
          onClick={() => navigate("/statistics")}
        >
          <div className="menu-icon">
            <BarChart3 size={28} />
          </div>

          <div className="menu-text">
            <h3>Statistics</h3>
          </div>
        </div>

        {/* History */}
        <div
          className="menu-card"
          onClick={() => navigate("/history")}
        >
          <div className="menu-icon">
            <History size={28} />
          </div>

          <div className="menu-text">
            <h3>History</h3>
          </div>
        </div>

        {/* Back to Landing Page */}
        <button
          className="landing-btn"
          onClick={() => setShowMenu(false)}
        >
          ← Back to Landing Page
        </button>
      </div>
    </div>
  );
}

export default Home;