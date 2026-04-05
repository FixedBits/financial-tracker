function TransactionList({ items, onDelete }) {
  return (
    <div className="transaction-list">
      <h2>Transactions</h2>

      {items.length === 0 && <p className="empty">No transactions yet</p>}

      <ul>
        {items.map((t) => (
          <li className="transaction-item" key={t.id}>
            <span className="transaction-text">{t.text}</span>

            <span
              className={`transaction-amount ${t.amount >= 0 ? "income" : "expense"}`}
            >
              $ {t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>

            <button className="delete-btn" onClick={() => onDelete(t.id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
