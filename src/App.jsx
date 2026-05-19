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
  // Global list of all transactions (array stored in state)
  const [transactions, setTransactions] = useState([]);

  // Current filter mode ("all", "income", "expense")
  // setFilter updates this value when buttons are clicked
  const [filter, setFilter] = useState("all");

  // Tracks whether this is the first render (so we don't save immediately)
  const firstRender = useRef(true);

  // ===============================
  // LOAD SAVED TRANSACTIONS (runs once on mount)
  // ===============================
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("transactions"));
    if (saved !== null) setTransactions(saved); // restore saved list
  }, []);

  // ===============================
  // SAVE TRANSACTIONS TO LOCALSTORAGE
  // Runs whenever transactions change
  // BUT skips the very first render
  // ===============================
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false; // mark first render as done
      return; // skip saving on first load
    }

    // Save updated transactions list
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // ===============================
  // ADD A NEW TRANSACTION
  // Called by <TransactionForm />
  // ===============================
  const addTransaction = (transaction) => {
    // Add new transaction to the array
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
    // Remove the transaction with matching id
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // ===============================
  // CALCULATE TOTAL BALANCE
  // Derived from all transaction amounts
  // ===============================
  const totalBalance = transactions.reduce((sum, t) => sum + Number(t.amount), 0);

  // ===============================
  // EDIT A TRANSACTION
  // Called by <TransactionList />
  // ===============================
  const editTransaction = (id, newText, newAmount) => {
    // Replace the matching transaction with updated values
    setTransactions((prev) => prev.map((t) => (t.id === id ? {...t, text: newText, amount: newAmount} : t)));
  };

  // ===============================
  // FILTERED TRANSACTIONS
  // Logic:
  // - income → amount >= 0
  // - expense → amount < 0
  //  -anything else → return true (show all)
  // ===============================
  const filteredTransactions = transactions.filter((t) => {
    if (filter === "income") return t.amount >= 0;
    if (filter === "expense") return t.amount < 0;
    return true; // default: include everything
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
        {/* Set filter to "all" */}
        <button className="btn" onClick={() => setFilter("all")}>
          All
        </button>

        {/* Set filter to "income" */}
        <button className="btn" onClick={() => setFilter("income")}>
          Income
        </button>

        {/* Set filter to "expense" */}
        <button className="btn" onClick={() => setFilter("expense")}>
          Expense
        </button>
      </div>

      {/* Render filtered list */}
      <TransactionList items={filteredTransactions} onDelete={deleteTransaction} onEdit={editTransaction} />
    </div>
  );
}

export default App;
