import { createContext, useContext, useState } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";

export interface Table {
  id: string;
  capacity: number;
  status: "Available" | "Occupied";
  customer?: string;
}

export interface HistoryRecord {
  time: string;
  customer: string;
  table: string;
  action: "Check In" | "Check Out";
}

interface TableContextType {
  // Array List (for displaying UI)
  tables: Table[];

  // Hash Table
  tableMap: Map<string, Table>;

  // Hash Table operations
  checkIn: (tableId: string, customer: string) => void;
  checkOut: (tableId: string) => void;

  history: HistoryRecord[];
  setHistory: Dispatch<SetStateAction<HistoryRecord[]>>;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export function TableProvider({ children }: { children: ReactNode }) {
  const initialTables: Table[] = [
    { id: "A01", capacity: 2, status: "Occupied", customer: "Ali" },
    { id: "A02", capacity: 4, status: "Available" },
    { id: "A03", capacity: 4, status: "Available" },
    { id: "A04", capacity: 6, status: "Occupied", customer: "Sarah" },
    { id: "A05", capacity: 2, status: "Available" },
    { id: "A06", capacity: 8, status: "Occupied", customer: "John" },
    { id: "A07", capacity: 4, status: "Occupied", customer: "Aisyah" },
    { id: "A08", capacity: 6, status: "Available" },
    { id: "A09", capacity: 2, status: "Available" },
    { id: "A10", capacity: 4, status: "Occupied", customer: "Daniel" },

    { id: "B01", capacity: 2, status: "Available" },
    { id: "B02", capacity: 8, status: "Occupied", customer: "Adam" },
    { id: "B03", capacity: 4, status: "Available" },
    { id: "B04", capacity: 6, status: "Occupied", customer: "Farah" },
    { id: "B05", capacity: 2, status: "Available" },
    { id: "B06", capacity: 4, status: "Occupied", customer: "Hakim" },
    { id: "B07", capacity: 6, status: "Available" },
    { id: "B08", capacity: 4, status: "Available" },
    { id: "B09", capacity: 2, status: "Occupied", customer: "Siti" },
    { id: "B10", capacity: 8, status: "Available" },
  ];

  // Hash Table
  const [tableMap, setTableMap] = useState<Map<string, Table>>(
    new Map(initialTables.map((table) => [table.id, table]))
  );

  // Array List (generated from Hash Table)
  const tables = Array.from(tableMap.values());

  // Hash Table Check In
  const checkIn = (tableId: string, customer: string) => {
    setTableMap((prev) => {
      const updated = new Map(prev);

      const table = updated.get(tableId);

      if (table) {
        updated.set(tableId, {
          ...table,
          status: "Occupied",
          customer,
        });
      }

      return updated;
    });
  };

  // Hash Table Check Out
  const checkOut = (tableId: string) => {
    setTableMap((prev) => {
      const updated = new Map(prev);

      const table = updated.get(tableId);

      if (table) {
        updated.set(tableId, {
          ...table,
          status: "Available",
          customer: undefined,
        });
      }

      return updated;
    });
  };

  const [history, setHistory] = useState<HistoryRecord[]>([
    {
      time: "09:00 AM",
      customer: "Ali",
      table: "A01",
      action: "Check In",
    },
    {
      time: "09:15 AM",
      customer: "Sarah",
      table: "A04",
      action: "Check In",
    },
    {
      time: "09:30 AM",
      customer: "John",
      table: "A06",
      action: "Check In",
    },
    {
      time: "09:45 AM",
      customer: "Aisyah",
      table: "A07",
      action: "Check In",
    },
    {
      time: "10:00 AM",
      customer: "Daniel",
      table: "A10",
      action: "Check In",
    },
    {
      time: "10:15 AM",
      customer: "Adam",
      table: "B02",
      action: "Check In",
    },
    {
      time: "10:30 AM",
      customer: "Farah",
      table: "B04",
      action: "Check In",
    },
    {
      time: "10:45 AM",
      customer: "Hakim",
      table: "B06",
      action: "Check In",
    },
    {
      time: "11:00 AM",
      customer: "Siti",
      table: "B09",
      action: "Check In",
    },
  ]);

  return (
    <TableContext.Provider
      value={{
        tables,
        tableMap,
        checkIn,
        checkOut,
        history,
        setHistory,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}

export function useTables() {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error("useTables must be used within TableProvider");
  }

  return context;
}