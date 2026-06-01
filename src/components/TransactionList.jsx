// React hooks for state + lifecycle
import {useEffect, useState} from "react";

// Framer Motion for animations
import {motion} from "framer-motion";

// Animation settings for the entire list container
const listVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// Animation settings for each individual list item
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

// ===============================
// PARENT COMPONENT
// Renders the entire transaction list
// ===============================
function TransactionList({items, onDelete, onEdit}) {
  // ===============================
  // CHILD COMPONENT (INLINE)
  // Renders ONE transaction item
  // ===============================
  function TransactionItem({t, onEdit}) {
    // Local state: whether this item is in edit mode
    const [isEditing, setIsEditing] = useState(false);

    // Local state: editable text field
    const [editText, setEditText] = useState(t.text);

    // Local state: editable amount field
    const [editAmount, setEditAmount] = useState(t.amount);

    // -------------------------------
    // CHILD COMPONENT RETURN (UI for ONE item)
    // -------------------------------

    return (
      <motion.li variants={itemVariants} id={`t-${t.id}`} className={`transaction-item ${t.isNew ? "enter" : ""}`}>
        {/* If editing → show inputs */}
        {isEditing ? (
          <div className="edit-mode">
            <input className="edit-input" value={editText} onChange={(e) => setEditText(e.target.value)} />

            <input className="edit-input amount" type="number" value={editAmount} onChange={(e) => setEditAmount(Number(e.target.value))} />

            {/* Save button → calls parent edit + exits edit mode */}
            <button
              className="btn save-btn"
              onClick={() => {
                onEdit(t.id, editText, editAmount);
                setIsEditing(false);
              }}
            >
              Save
            </button>

            {/* Cancel button → exits edit mode */}
            <button className="btn cancel-btn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        ) : (
          <>
            {/* Normal view mode */}
            <span className="transaction-text">{t.text}</span>

            <span className={`transaction-amount ${t.amount >= 0 ? "income" : "expense"}`}>$ {t.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>

            {/* Edit button → enters edit mode */}
            <button className="btn btn-ghost" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          </>
        )}

        {/* Delete button → triggers delete animation */}
        <button className="btn delete-btn" title="Delete Transaction" onClick={() => handleDelete(t.id)}>
          ×
        </button>
      </motion.li>
    );
  }

  // ===============================
  // SLIDE-IN ANIMATION FOR NEW ITEMS
  // Runs whenever items change
  // ===============================
  useEffect(() => {
    const elements = document.querySelectorAll(".transaction-item.enter");
    elements.forEach((el) => {
      requestAnimationFrame(() => {
        el.classList.add("enter-active");
      });
    });
  }, [items]);

  // ===============================
  // DELETE ANIMATION HANDLER
  // Adds CSS class → waits → calls parent delete
  // ===============================
  const handleDelete = (id) => {
    const el = document.getElementById(`t-${id}`);
    if (!el) return;

    el.classList.remove("enter", "enter-active");
    el.classList.add("removing");

    setTimeout(() => {
      onDelete(id);
    }, 250);
  };

  // ===============================
  // PARENT COMPONENT RETURN
  // Renders the entire list + header
  // ===============================
  return (
    <div className="transaction-list">
      <h2>Transactions</h2>

      {/* Empty state */}
      {items.length === 0 && <p className="empty">No transactions yet</p>}

      {/* Animated list container */}
      <motion.ul variants={listVariants} initial="hidden" animate="show">
        {/* Render each transaction using the child component */}
        {items.map((t) => (
          <TransactionItem t={t} key={t.id} onEdit={onEdit} />
        ))}
      </motion.ul>
    </div>
  );
}

export default TransactionList;
