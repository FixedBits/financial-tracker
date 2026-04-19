import {useEffect} from "react";
import {easeIn, motion} from "framer-motion";

const listVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: {opacity: 0, y: 12},
  animate: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.25, ease: "easeOut"},
  },
  exit: {
    opacity: 0,
    y: -8,
    height: 0,
    marginTop: 0,
    marginBottom: 0,
    transition: {duration: 0.25, ease: "easeOut"},
  },
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

      {/* New items start with enter */}
      <motion.ul variants={listVariants} initial="hidden" animate="show">
        {items.map((t) => (
          <motion.li variants={itemVariants} id={`t-${t.id}`} className={`transaction-item ${t.isNew ? "enter" : ""}`} key={t.id}>
            <span className="transaction-text">{t.text}</span>

            <span className={`transaction-amount ${t.amount >= 0 ? "income" : "expense"}`}>
              ${" "}
              {t.amount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>

            <button className="edit-btn" onClick={() => onEdit(id)}>
              Delete
            </button>
            <button className="delete-btn" onClick={() => handleDelete(t.id)}>
              ×
            </button>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

export default TransactionList;
