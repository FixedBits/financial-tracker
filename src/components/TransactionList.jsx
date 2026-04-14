import {useEffect} from "react";
import {motion} from "framer-motion";

const parentVariants = {
  hidden: {opacity: 1}, // Visible parent
  show: {opacity: 1, transition: {staggerChildren: 0.05}}, // Stagger children
};

const childVariants = {
  hidden: {opacity: 0, y: 10}, // Start hidden and slightly down
  show: {opacity: 1, y: 0},
  transition: {duration: 0.25, ease: "easeOut"}, // Smooth transition
};

function TransactionList({items, onDelete}) {
  // Run slide‑in animation for new items
  useEffect(() => {
    const elements = document.querySelectorAll(".transaction-item.enter");
    elements.forEach((el) => {
      requestAnimationFrame(() => {
        el.classList.add("enter-active");
      });
    });
  }, [items]);

  // Handle delete animation
  const handleDelete = (id) => {
    const el = document.getElementById(`t-${id}`);
    if (!el) return;

    // Remove enter animation classes
    el.classList.remove("enter", "enter-active");

    // Apply delete animation
    el.classList.add("removing");

    // Remove item after animation
    setTimeout(() => {
      onDelete(id);
    }, 250);
  };
  return (
    <div className="transaction-list">
      <h2>Transactions</h2>

      {/* Show message when there are no items */}
      {items.length === 0 && <p className="empty">No transactions yet</p>}

      <ul>
        {items.map((t) => (
          <li
            id={`t-${t.id}`}
            className="transaction-item enter" // New items start with enter
            key={t.id}
          >
            <span className="transaction-text">{t.text}</span>

            <span className={`transaction-amount ${t.amount >= 0 ? "income" : "expense"}`}>
              ${" "}
              {t.amount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>

            <button className="delete-btn" onClick={() => handleDelete(t.id)}>
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
