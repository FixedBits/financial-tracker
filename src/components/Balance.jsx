function Balance({ total }) {
  return (
    <div className="balance">
      <h2>Balance</h2>
      <p className="amount">{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
    </div>
  );
}

export default Balance;
