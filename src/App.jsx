// Simple test to confirm App.jsx is loading
console.log("App LOADED");

// React hooks
import {useState, useEffect, useRef} from "react";

// Global styles
import "./styles/app.css";

// Child components
import Balance from "./components/Balance";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

// ===============================
// ROOT COMPONENT: App
// Holds ALL global state for the app
// ===============================
function App() {
  // Global list of all transactions
  const [transactions, setTransactions] = useState([]);

  // Filter state
  const [filter, setFilter] = useState("all");

  // Tracks whether this is the first render
  const firstRender = useRef(true);

  // ===============================
  // LOAD SAVED TRANSACTIONS (runs once)
  // ===============================
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("transactions"));
    if (saved !== null) setTransactions(saved);
  }, []);

  // ===============================
  // SAVE TRANSACTIONS TO LOCALSTORAGE
  // Runs whenever transactions change
  // BUT skips the very first render
  // ===============================
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return; // skip saving on first load
    }

    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // ===============================
  // ADD A NEW TRANSACTION
  // Called by <TransactionForm />
  // ===============================
  const addTransaction = (transaction) => {
    // Add the new transaction to the list
    setTransactions((prev) => [...prev, transaction]);

    // After animation delay, remove isNew flag
    setTimeout(() => {
      setTransactions((prev) => prev.map((t) => (t.id === transaction.id ? {...t, isNew: false} : t)));
    }, 360);
  };

  // ===============================
  // DELETE A TRANSACTION
  // Called by <TransactionList />
  // ===============================
  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // ===============================
  // CALCULATE TOTAL BALANCE
  // Derived value from transactions
  // ===============================
  const totalBalance = transactions.reduce((sum, t) => sum + Number(t.amount), 0);

  // ===============================
  // EDIT A TRANSACTION
  // Called by <TransactionList />
  // ===============================
  const editTransaction = (id, newText, newAmount) => {
    setTransactions((prev) => prev.map((t) => (t.id === id ? {...t, text: newText, amount: newAmount} : t)));
  };

  const filteredTransactions = transactions.filter((t) => {
    if (filter === "income") return t.amount >= 0;
    if (filter === "expense") return t.amount < 0;
    return true; // "all"
  });

  // ===============================
  // ROOT COMPONENT RETURN
  // Renders the entire app UI
  // ===============================
  return (
    <div className="app">
      <h1>Financial Tracker</h1>

      {/* Balance summary */}
      <Balance total={totalBalance} />

      {/* Form for adding new transactions */}
      <TransactionForm onAdd={addTransaction} />

      {/* Filter Buttons */}
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("income")}>Income</button>
        <button onClick={() => setFilter("expense")}>Expense</button>
      </div>

      {/* List of all transactions */}
      <TransactionList items={filteredTransactions} onDelete={deleteTransaction} onEdit={editTransaction} />
    </div>
  );
}

export default App;
