import { useTranslation } from "react-i18next";
import MemberRow from "./MemberRow";

function MembersSection({ members, ownerId, currentUserId, onRemoveMember, onLeaveList }) {
  const { t } = useTranslation();

  return (
    <div className="members-section">
      <p className="members-title">{t("members_section")} ({members.length})</p>
      {members.map((member) => (
        <MemberRow
          key={member.id}
          id={member.id}
          name={member.name}
          isOwner={member.id === ownerId}
          isSelf={member.id === currentUserId}
          canRemove={currentUserId === ownerId && member.id !== ownerId}
          onRemove={() =>
            member.id === currentUserId ? onLeaveList() : onRemoveMember(member.id)
          }
          onLeave={onLeaveList}
        />
      ))}
    </div>
  );
}

export default MembersSection;
