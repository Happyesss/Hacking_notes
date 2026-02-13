import { useState } from 'react';

export function Troubleshooting({ children }) {
  return (
    <div className="troubleshooting">
      <h3>🔧 Troubleshooting</h3>
      {children}
    </div>
  );
}

export function TroubleItem({ issue, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="trouble-item">
      <div className="trouble-header" onClick={() => setOpen(!open)}>
        <span className="icon">✖</span>
        <span>{issue}</span>
        <span className={`chevron ${open ? 'open' : ''}`}>▶</span>
      </div>
      {open && <div className="trouble-body">{children}</div>}
    </div>
  );
}
