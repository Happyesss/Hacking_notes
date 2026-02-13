export default function InfoBox({ type = 'note', title, children }) {
  const icons = { note: 'ℹ️', warning: '⚠️', danger: '🚫', tip: '💡' };
  const labels = { note: 'Note', warning: 'Warning', danger: 'Danger', tip: 'Tip' };
  return (
    <div className={`info-box ${type}`}>
      <div className="info-box-title">{icons[type]} {title || labels[type]}</div>
      <div>{children}</div>
    </div>
  );
}
