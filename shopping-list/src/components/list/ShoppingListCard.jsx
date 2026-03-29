function ShoppingListCard({ id, name, memberCount, isOwner, onOpenList, onDeleteList }) {
    return (
        <div className="list-card">
            <div className="list-card-top">
                <span className="list-card-name">{name}</span>
                <div className="list-card-right">
                    <span className={`list-card-role ${isOwner ? "" : "member"}`}>
                        {isOwner ? "Vlastník" : "Člen"}
                    </span>
                    {isOwner && (
                        <button className="delete-btn" onClick={() => onDeleteList(id)}>✕</button>
                    )}
                </div>
            </div>
            <div className="list-card-bottom">
                <span className="member-count">Members: {memberCount}</span>
                <button className="detail-btn" onClick={() => onOpenList(id)}>Detail</button>
            </div>
        </div>
    );
}

export default ShoppingListCard;

