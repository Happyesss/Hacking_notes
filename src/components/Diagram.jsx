export default function Diagram({ children, title }) {
  return (
    <div className="diagram-box">
      {title && <div style={{ marginBottom: 12, color: 'var(--text-secondary)', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>{title}</div>}
      <pre>{children}</pre>
    </div>
  );
}
