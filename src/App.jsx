import { useState } from "react";
import "./styles/app.css";

import Balance from "./components/Balance";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

function App() {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const totalBalance = transactions.reduce((sum, t) => sum + Number(t.amount), 0);

  return (
    <div className="app">
      <h1>Financial Tracker</h1>

      <Balance total={totalBalance} />
      <TransactionForm onAdd={addTransaction} />
      <TransactionList items={transactions} />
    </div>
  );
}

export default App;
