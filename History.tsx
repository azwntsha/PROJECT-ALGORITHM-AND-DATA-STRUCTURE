import { useNavigate } from "react-router-dom";
import { useTables } from "../context/TableContext";
import {
  ArrowLeft,
  History as HistoryIcon,
} from "lucide-react";
import "./History.css";

function History() {
  const navigate = useNavigate();
  const { history } = useTables();

  return (
    <div className="history-container">

      <button
        className="back-btn"
        onClick={() =>
  navigate("/", {
    state: { showMenu: true },
  })
}
      >
        <ArrowLeft size={18}/>
        Back to Home
      </button>

      <div className="page-header">

        <div className="title-row">

          <div className="title-icon">
            <HistoryIcon size={42}/>
          </div>

          <h1 className="page-title">
            Check In / Check Out History
          </h1>

        </div>

      </div>

      <div className="table-wrapper">

        <table className="history-table">

          <thead>

            <tr>
              <th>Time</th>
              <th>Customer</th>
              <th>Table</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {history.length > 0 ? (

              history.map((record, index) => (

                <tr key={index}>

                  <td>{record.time}</td>

                  <td>{record.customer}</td>

                  <td>{record.table}</td>

                  <td>

                    <span
                      className={
                        record.action === "Check In"
                          ? "checkin-badge"
                          : "checkout-badge"
                      }
                    >
                      {record.action}
                    </span>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan={4}
                  className="empty-history"
                >
                  No history available.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default History;