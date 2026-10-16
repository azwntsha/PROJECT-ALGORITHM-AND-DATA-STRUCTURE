import { Search, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTables } from "../context/TableContext";
import "./SearchTable.css";

function SearchTable() {
  const navigate = useNavigate();
  const { tableMap } = useTables();

  const [searchId, setSearchId] = useState("");
  const [result, setResult] =
    useState<ReturnType<typeof tableMap.get> | null>(null);

  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    const table = tableMap.get(searchId.toUpperCase());

    setResult(table || null);
    setSearched(true);
  };

  return (
    <div className="search-container">

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
            <Search size={42} />
          </div>

          <h1 className="page-title">
            Search Table
          </h1>

        </div>

        <div className="search-box">

          <input
            type="text"
            placeholder="Enter Table ID (e.g. A01)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />

          <button
            className="search-btn"
            onClick={handleSearch}
          >
            Search
          </button>

        </div>

      </div>

      {/* Search Result */}

      {searched && result && (

        <div className="result-card">

          <h2>
            Table {result.id}
          </h2>

          <div className="result-info">

            <div className="info-item">
              <span>Capacity</span>
              <strong>{result.capacity} Seats</strong>
            </div>

            <div className="info-item">
              <span>Status</span>

              <span
                className={
                  result.status === "Available"
                    ? "available"
                    : "occupied"
                }
              >
                {result.status}
              </span>

            </div>

            <div className="info-item">
              <span>Customer</span>
              <strong>{result.customer || "-"}</strong>
            </div>

          </div>

        </div>

      )}

      {/* Not Found */}

      {searched && !result && (

        <div className="error-card">

          <h3>Table Not Found</h3>

          <p>
            No table with ID <b>{searchId.toUpperCase()}</b> exists.
          </p>

        </div>

      )}

    </div>
  );
}

export default SearchTable;