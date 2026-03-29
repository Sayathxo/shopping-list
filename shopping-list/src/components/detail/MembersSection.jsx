import MemberRow from "./MemberRow";

function MembersSection({ members, ownerId, currentUserId, onRemoveMember, onLeaveList }) {
  return ( 
    <div className="members-section">
      <p>Členové: {members.length}</p>
      {members.map((member) => (
        <MemberRow
          key={member.id}
          id={member.id}
          name={member.name}
          isOwner={member.id === ownerId}
          canRemove={currentUserId === ownerId && member.id !== ownerId}
          onRemove={() =>
            member.id === currentUserId ? onLeaveList() : onRemoveMember(member.id)
          }
        />
      ))}
    </div>
  );
}

export default MembersSection;