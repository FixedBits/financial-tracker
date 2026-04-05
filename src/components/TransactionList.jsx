import {useEffect} from "react";

function TransactionList({items, onDelete}) {
  // Slide‑in animation for new items
  useEffect(() => {
    const elements = document.querySelectorAll(".transaction-item.enter");
    elements.forEach((el) => {
      requestAnimationFrame(() => {
        el.classList.add("enter-active");
      });
    });
  }, [items]);

  const handleDelete = (id) => {
    const el = document.getElementById(`t-${id}`);
    if (!el) return;

    // ⭐ Remove enter animation classes so they don't override delete
    el.classList.remove("enter", "enter-active");

    // ⭐ Apply delete animation
    el.classList.add("removing");

    setTimeout(() => {
      onDelete(id);
    }, 250);
  };

  return (
    <div className="transaction-list">
      <h2>Transactions</h2>

      {items.length === 0 && <p className="empty">No transactions yet</p>}

      <ul>
        {items.map((t) => (
          <li id={`t-${t.id}`} className="transaction-item enter" key={t.id}>
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
