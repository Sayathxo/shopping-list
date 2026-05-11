import { useTranslation } from "react-i18next";

function MemberRow({ name, isOwner, isSelf, canRemove, onRemove, onLeave }) {
  const { t } = useTranslation();

  return (
    <div className="member-row">
      <span>
        {name}
        {isOwner && <span className="owner-badge">{t("owner")}</span>}
      </span>
      <div className="member-actions">
        {canRemove && (
          <button className="member-remove-btn" onClick={onRemove}>{t("remove")}</button>
        )}
        {isSelf && !isOwner && (
          <button className="member-remove-btn" onClick={onLeave}>{t("leave")}</button>
        )}
      </div>
    </div>
  );
}

export default MemberRow;
