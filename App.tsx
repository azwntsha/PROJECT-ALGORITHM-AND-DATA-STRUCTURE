import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import ViewTables from "./pages/ViewTables";
import SearchTable from "./pages/SearchTable";
import Capacity from "./pages/Capacity";
import CheckIn from "./pages/CheckIn";
import CheckOut from "./pages/CheckOut";
import Statistics from "./pages/Statistics";
import History from "./pages/History";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/viewtables" element={<ViewTables />} />
      <Route path="/search" element={<SearchTable />} />
      <Route path="/capacity" element={<Capacity />} />
      <Route path="/checkin" element={<CheckIn />} />
      <Route path="/checkout" element={<CheckOut />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
}

export default App;

