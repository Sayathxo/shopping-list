import { useTranslation } from "react-i18next";

function ItemCountBar({ items }) {
  const { t } = useTranslation();
  const total = items.length;
  const resolved = items.filter((i) => i.resolved).length;
  const pct = total === 0 ? 0 : Math.round((resolved / total) * 100);
  const isFull = total > 0 && resolved === total;

  return (
    <div className="item-count-bar">
      <div className="item-count-label">
        <span>{t("totalItems")}: {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="item-count-track">
        <div
          className={`item-count-fill${isFull ? " full" : ""}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="item-count-numbers">
        <span className="count-resolved">✓ {resolved}</span>
        <span>✗ {total - resolved}</span>
      </div>
    </div>
  );
}

function ShoppingListCard({ id, name, items, memberCount, isOwner, onOpenList, onDeleteList }) {
  const { t } = useTranslation();

  return (
    <div className="list-card">
      <div className="list-card-top">
        <span className="list-card-name">{name}</span>
        <div className="list-card-right">
          <span className={`list-card-role ${isOwner ? "" : "member"}`}>
            {isOwner ? t("owner") : t("member")}
          </span>
          {isOwner && (
            <button className="delete-btn" onClick={() => onDeleteList(id)}>✕</button>
          )}
        </div>
      </div>
      <div className="list-card-bottom">
        <div className="list-card-stats">
          <span className="member-count">👥 {memberCount}</span>
          <ItemCountBar items={items} />
        </div>
        <button className="detail-btn" onClick={() => onOpenList(id)}>{t("detail")}</button>
      </div>
    </div>
  );
}

export default ShoppingListCard;
