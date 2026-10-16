import { useNavigate } from "react-router-dom";
import { useTables } from "../context/TableContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import {
  ArrowLeft,
  BarChart3,
} from "lucide-react";

import "./Statistics.css";

function Statistics() {
  const navigate = useNavigate();
  const { tables } = useTables();

  const totalTables = tables.length;

  const availableTables = tables.filter(
    (table) => table.status === "Available"
  ).length;

  const occupiedTables = tables.filter(
    (table) => table.status === "Occupied"
  ).length;

  const occupancyRate = (
    (occupiedTables / totalTables) * 100
  ).toFixed(0);

  const pieData = [
    {
      name: "Available",
      value: availableTables,
    },
    {
      name: "Occupied",
      value: occupiedTables,
    },
  ];

  const barData = [
    {
      capacity: "2 Seats",
      tables: tables.filter((t) => t.capacity === 2).length,
    },
    {
      capacity: "4 Seats",
      tables: tables.filter((t) => t.capacity === 4).length,
    },
    {
      capacity: "6 Seats",
      tables: tables.filter((t) => t.capacity === 6).length,
    },
    {
      capacity: "8 Seats",
      tables: tables.filter((t) => t.capacity === 8).length,
    },
  ];

  const COLORS = ["#2ECC71", "#E74C3C"];

  // Custom label
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    value,
    fill,
  }: any) => {
    const RADIAN = Math.PI / 180;

    const radius = outerRadius + 35;

    const x =
      cx + radius * Math.cos(-midAngle * RADIAN);

    const y =
      cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={fill}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={18}
        fontWeight="bold"
      >
        {value}
      </text>
    );
  };

  return (
    <div className="statistics-container">

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
            <BarChart3 size={42} />
          </div>

          <h1 className="page-title">
            Food Court Statistics
          </h1>

        </div>

        <div className="summary-cards">

          <div className="card total-card">
            <h3>Total Tables</h3>
            <p>{totalTables}</p>
          </div>

          <div className="card available-card">
            <h3>Available</h3>
            <p>{availableTables}</p>
          </div>

          <div className="card occupied-card">
            <h3>Occupied</h3>
            <p>{occupiedTables}</p>
          </div>

          <div className="card rate-card">
            <h3>Occupancy Rate</h3>
            <p>{occupancyRate}%</p>
          </div>

        </div>

      </div>

      <div className="charts">

        <div className="chart-card glass-card">

          <h2>Table Status</h2>

          <ResponsiveContainer
            width="100%"
            height={340}
          >

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
                label={renderCustomizedLabel}
                labelLine={true}
              >

                {pieData.map((_, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />

                ))}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div className="chart-card glass-card">

          <h2>Table Capacity Distribution</h2>

          <ResponsiveContainer
            width="100%"
            height={340}
          >

            <BarChart data={barData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="capacity" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="tables"
                fill="#E2B357"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}

export default Statistics;