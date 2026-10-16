import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTables } from "../context/TableContext";
import { Users, ArrowLeft } from "lucide-react";
import "./Capacity.css";

function Capacity() {
  const navigate = useNavigate();
  const { tables } = useTables();

  const [capacity, setCapacity] = useState("");
  const [filteredTables, setFilteredTables] = useState(tables);

  useEffect(() => {
    if (capacity === "") {
      setFilteredTables(tables);
    } else {
      setFilteredTables(
        tables.filter((table) => table.capacity === Number(capacity))
      );
    }
  }, [tables, capacity]);

  return (
    <div className="capacity-container">

      {/* Back Button */}

      <button
        className="back-btn"
        onClick={() =>
  navigate("/", {
    state: { showMenu: true },
  })
}
      >
        <ArrowLeft size={18} />
        Back to Home
      </button>

      {/* Header */}

      <div className="page-header">

        <div className="title-row">

          <div className="title-icon">
            <Users size={42} />
          </div>

          <h1 className="page-title">
            Search by Capacity
          </h1>

        </div>

        <div className="capacity-box">

          <label>Select Capacity</label>

          <select
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          >
            <option value="">All Tables</option>
            <option value="2">2 Seats</option>
            <option value="4">4 Seats</option>
            <option value="6">6 Seats</option>
            <option value="8">8 Seats</option>
          </select>

        </div>

      </div>

      {/* Table */}

      <div className="table-wrapper">

        <table className="capacity-table">

          <thead>

            <tr>
              <th>Table ID</th>
              <th>Capacity</th>
              <th>Status</th>
              <th>Customer</th>
            </tr>

          </thead>

          <tbody>

            {filteredTables.length > 0 ? (

              filteredTables.map((table) => (

                <tr key={table.id}>

                  <td>{table.id}</td>

                  <td>{table.capacity} Seats</td>

                  <td>

                    <span
                      className={
                        table.status === "Available"
                          ? "available"
                          : "occupied"
                      }
                    >
                      {table.status}
                    </span>

                  </td>

                  <td>{table.customer ?? "-"}</td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan={4}
                  className="no-result"
                >
                  No tables found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Capacity;