import {useEffect, useState} from "react";
import {motion} from "framer-motion";

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

function TransactionList({items, onDelete, onEdit}) {
  // Inline component
  function TransactionItem({t, onEdit}) {
    const [isEditing, setIsEditing] = useState(false);

    const [editText, setEditText] = useState(t.text);

    const [editAmount, setEditAmount] = useState(t.amount);

    return (
      <motion.li variants={itemVariants} id={`t-${t.id}`} className={`transaction-item ${t.isNew ? "enter" : ""}`}>
        {isEditing ? (
          <>
            <input className="edit-input" value={editText} onChange={(e) => setEditText(e.target.value)} />

            <input className="edit-input amount" type="number" value={editAmount} onChange={(e) => setEditAmount(Number(e.target.value))} />

            <button
              className="save-btn"
              onClick={() => {
                onEdit(t.id, editText, editAmount);
                setIsEditing(false);
              }}
            >
              Save
            </button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <span className="transaction-text">{t.text}</span>
            <span className={`transaction-amount ${t.amount >= 0 ? "income" : "expense"}`}>$ {t.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>

            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          </>
        )}

        <button className="delete-btn" onClick={() => handleDelete(t.id)}>
          ×
        </button>
      </motion.li>
    );
  }

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

    el.classList.remove("enter", "enter-active");
    el.classList.add("removing");

    setTimeout(() => {
      onDelete(id);
    }, 250);
  };

  return (
    <div className="transaction-list">
      <h2>Transactions</h2>

      {items.length === 0 && <p className="empty">No transactions yet</p>}

      <motion.ul variants={listVariants} initial="hidden" animate="show">
        {items.map((t) => (
          <TransactionItem t={t} key={t.id} onEdit={onEdit} />
        ))}
      </motion.ul>
    </div>
  );
}

export default TransactionList;
