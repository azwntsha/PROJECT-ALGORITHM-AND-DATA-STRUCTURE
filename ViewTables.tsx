import { useNavigate } from "react-router-dom";
import { useTables } from "../context/TableContext";
import { UtensilsCrossed } from "lucide-react";
import "./ViewTables.css";

function ViewTables() {
  const navigate = useNavigate();
  const { tables } = useTables();

  const totalTables = tables.length;

  const availableTables = tables.filter(
    (table) => table.status === "Available"
  ).length;

  const occupiedTables = tables.filter(
    (table) => table.status === "Occupied"
  ).length;

  return (
    <div className="view-container">

      {/* Back Button */}

      <button
        className="back-btn"
        onClick={() =>
  navigate("/", {
    state: { showMenu: true },
  })
}
      >
        ← Back to Home
      </button>

      {/* Header */}

      <div className="page-header">

        <div className="page-icon">
          <UtensilsCrossed size={50} />
        </div>

        <h1 className="page-title">
          Food Court Tables
        </h1>

        <div className="summary-container">

          <div className="summary-card">
            <h3>Total Tables</h3>
            <p>{totalTables}</p>
          </div>

          <div className="summary-card">
            <h3>Available</h3>
            <p>{availableTables}</p>
          </div>

          <div className="summary-card">
            <h3>Occupied</h3>
            <p>{occupiedTables}</p>
          </div>

        </div>

      </div>

      {/* Table */}

      <div className="table-wrapper">

        <table className="table-list">

          <thead>

            <tr>
              <th>Table ID</th>
              <th>Capacity</th>
              <th>Status</th>
              <th>Customer</th>
            </tr>

          </thead>

          <tbody>

            {tables.map((table) => (

              <tr key={table.id}>

                <td>{table.id}</td>

                <td>{table.capacity}</td>

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

                <td>
                  {table.customer || "-"}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ViewTables;