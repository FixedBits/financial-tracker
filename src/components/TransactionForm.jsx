import { useState } from "react";

function TransactionForm({ onAdd }) {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text || !amount) return;

    const newTransaction = {
      id: Date.now(),
      text,
      amount: Number(amount),
    };

    onAdd(newTransaction);

    setText("");
    setAmount("");
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Description" value={text} onChange={(e) => setText(e.target.value)} />

      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />

      <button type="submit">Add</button>
    </form>
  );
}

export default TransactionForm;
