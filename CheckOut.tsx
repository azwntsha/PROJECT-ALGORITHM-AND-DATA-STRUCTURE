import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTables } from "../context/TableContext";
import { ArrowLeft, LogOut } from "lucide-react";
import "./CheckOut.css";

function CheckOut() {
  const navigate = useNavigate();

  const {
    tables,
    tableMap,
    checkOut,
    history,
    setHistory,
  } = useTables();

  const [selectedTable, setSelectedTable] = useState("");
  const [message, setMessage] = useState("");

  const occupiedTables = tables.filter(
    (table) => table.status === "Occupied"
  );

  const handleCheckOut = () => {
    if (!selectedTable) {
      alert("Please select a table.");
      return;
    }

    // Hash Table Lookup (O(1))
    const table = tableMap.get(selectedTable);

    if (!table) {
      alert("Table not found.");
      return;
    }

    if (table.status === "Available") {
      alert("This table is already available.");
      return;
    }

    const customerName = table.customer ?? "";

    // Hash Table Update (O(1))
    checkOut(selectedTable);

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setHistory([
      ...history,
      {
        time: currentTime,
        customer: customerName,
        table: selectedTable,
        action: "Check Out",
      },
    ]);

    setMessage(
      `${customerName} has successfully checked out from Table ${selectedTable}.`
    );

    setSelectedTable("");
  };

  return (
    <div className="checkout-container">
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

      <div className="page-header">
        <div className="title-row">
          <div className="title-icon">
            <LogOut size={42} />
          </div>

          <h1 className="page-title">
            Check Out
          </h1>
        </div>

        <div className="checkout-card">
          <label>Select Occupied Table</label>

          <select
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
          >
            <option value="">Select Table</option>

            {occupiedTables.length > 0 ? (
              occupiedTables.map((table) => (
                <option
                  key={table.id}
                  value={table.id}
                >
                  {table.id} - {table.customer}
                </option>
              ))
            ) : (
              <option disabled>
                No occupied table
              </option>
            )}
          </select>

          <button
            className="checkout-btn"
            onClick={handleCheckOut}
          >
            Check Out
          </button>
        </div>
      </div>

      {message && (
        <div className="success-card">
          <h3>✓ Check Out Successful</h3>

          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default CheckOut;