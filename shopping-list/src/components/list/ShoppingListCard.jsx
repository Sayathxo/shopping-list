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
        <div className={`item-count-fill${isFull ? " full" : ""}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="item-count-numbers">
        <span className="count-resolved">✓ {resolved}</span>
        <span>✗ {total - resolved}</span>
      </div>
    </div>
  );
}

function ShoppingListCard({
  id, name, items, memberCount, isOwner, archived,
  onOpenList, onDeleteList, onArchiveList, onUnarchiveList,
}) {
  const { t } = useTranslation();

  return (
    <div className={`list-card${archived ? " list-card--archived" : ""}`}>
      <div className="list-card-top">
        <span className="list-card-name">{name}</span>
        <div className="list-card-right">
          {archived && (
            <span className="list-card-archived-badge">{t("archivedBadge")}</span>
          )}
          <span className={`list-card-role${isOwner ? "" : " member"}`}>
            {isOwner ? t("owner") : t("member")}
          </span>
          {isOwner && !archived && (
            <button className="archive-btn" title={t("archive")} onClick={() => onArchiveList(id)}>
              📦
            </button>
          )}
          {isOwner && archived && (
            <button className="archive-btn" title={t("unarchive")} onClick={() => onUnarchiveList(id)}>
              ↩
            </button>
          )}
          {isOwner && !archived && (
            <button className="delete-btn" onClick={() => onDeleteList(id)}>✕</button>
          )}
        </div>
      </div>
      <div className="list-card-bottom">
        <div className="list-card-stats">
          <span className="member-count">👥 {memberCount}</span>
          <ItemCountBar items={items} />
        </div>
        {!archived && (
          <button className="detail-btn" onClick={() => onOpenList(id)}>{t("detail")}</button>
        )}
      </div>
    </div>
  );
}

export default ShoppingListCard;
