import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTables } from "../context/TableContext";
import { ArrowLeft, LogIn } from "lucide-react";
import "./CheckIn.css";

function CheckIn() {
  const navigate = useNavigate();

  const {
    tables,
    tableMap,
    checkIn,
    history,
    setHistory,
  } = useTables();

  const [customerName, setCustomerName] = useState("");
  const [people, setPeople] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const [message, setMessage] = useState("");

  const availableTables = tables.filter(
    (table) =>
      table.status === "Available" &&
      table.capacity >= Number(people || 0)
  );

  const handleCheckIn = () => {
    if (!customerName || !people || !selectedTable) {
      alert("Please fill in all fields.");
      return;
    }

    // Hash Table Lookup (O(1))
    const table = tableMap.get(selectedTable);

    if (!table) {
      alert("Table not found.");
      return;
    }

    if (table.status === "Occupied") {
      alert("This table is already occupied.");
      return;
    }

    // Hash Table Update (O(1))
    checkIn(selectedTable, customerName);

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
        action: "Check In",
      },
    ]);

    setMessage(
      `${customerName} has successfully checked in to Table ${selectedTable}.`
    );

    setCustomerName("");
    setPeople("");
    setSelectedTable("");
  };

  return (
    <div className="checkin-container">
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
            <LogIn size={42} />
          </div>

          <h1 className="page-title">
            Check In
          </h1>
        </div>

        <div className="checkin-card">
          <label>Customer Name</label>

          <input
            type="text"
            placeholder="Enter customer name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <label>Number of People</label>

          <input
            type="number"
            min="1"
            max="8"
            placeholder="Enter number of people"
            value={people}
            onChange={(e) => {
              setPeople(e.target.value);
              setSelectedTable("");
            }}
          />

          <label>Available Tables</label>

          <select
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
          >
            <option value="">Select Table</option>

            {availableTables.length > 0 ? (
              availableTables.map((table) => (
                <option
                  key={table.id}
                  value={table.id}
                >
                  {table.id} ({table.capacity} Seats)
                </option>
              ))
            ) : (
              <option disabled>
                No available table
              </option>
            )}
          </select>

          <button
            className="checkin-btn"
            onClick={handleCheckIn}
          >
            Check In
          </button>
        </div>
      </div>

      {message && (
        <div className="success-card">
          <h3>✓ Check In Successful</h3>

          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default CheckIn;