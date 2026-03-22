function TransactionList({ items }) {
  return (
    <div className="transaction-list">
      <h2>Transactions</h2>

      {items.length === 0 && <p className="empty">No transactions yet</p>}

      <ul>
        {items.map((t) => (
          <li key={t.id}>
            <span>{t.text}</span>
            <span className={t.amount >= 0 ? "income" : "expense"}>${t.amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
