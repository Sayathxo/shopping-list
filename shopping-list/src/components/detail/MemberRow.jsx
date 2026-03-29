function MemberRow({ name, isOwner, canRemove, onRemove }) {
  return (
   <div className="member-row">
    <span>{name}{isOwner && <span className="owner-badge">vlastník</span>}</span>
    {canRemove && <button className="member-remove-btn" onClick={onRemove}>✕</button>}
  </div>
  );
}

export default MemberRow;