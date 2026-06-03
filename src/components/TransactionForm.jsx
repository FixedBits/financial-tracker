// React hook for managing local component state
import {useState} from "react";

// Simple console test to confirm the file is loading
console.log("TransactionForm LOADED from components folder");

// ===============================
// COMPONENT: TransactionForm
// Handles creating a NEW transaction
// ===============================
function TransactionForm({onAdd}) {
  // Local state: text input field
  const [text, setText] = useState("");

  // Local state: amount input field
  const [amount, setAmount] = useState("");

  // ===============================
  // FORM SUBMIT HANDLER
  // Runs when the user clicks "Add"
  // ===============================
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    // Basic validation: require both fields
    if (!text || !amount) return;

    // Build a new transaction object
    const newTransaction = {
      id: Date.now(), // unique ID
      text, // description
      amount: Number(amount), // convert string → number
      isNew: true, // used for animation
    };

    // Send the new transaction UP to the parent component
    onAdd(newTransaction);

    // Reset form fields
    setText("");
    setAmount("");
  };

  // ===============================
  // COMPONENT RETURN (UI)
  // Renders the form with two inputs + button
  // ===============================
  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      {/* Description input */}
      <input type="text" placeholder="Description" value={text} onChange={(e) => setText(e.target.value)} />

      {/* Amount input */}
      <input type="text" inputMode="decimal" placeholder="Amount (e.g. 10 or -10)" value={amount} onChange={(e) => setAmount(e.target.value)} />

      {/* Submit button */}
      <button className="btn btn-primary add-btn" type="submit">
        Add
      </button>
    </form>
  );
}

// Export the component so App.jsx can use it
export default TransactionForm;
