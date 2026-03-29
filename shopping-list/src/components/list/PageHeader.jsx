function PageHeader({ title, userName }) {
  return (
    <div className="page-header">
      <h1>{title}</h1>
      <span className="user-badge">☆ {userName}</span>
    </div>
  );
}

export default PageHeader;