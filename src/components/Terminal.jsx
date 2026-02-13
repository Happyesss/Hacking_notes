import { useState } from 'react';

export default function Terminal({ title = "Terminal", lines = [] }) {
  const [copied, setCopied] = useState(false);

  const getCommandText = () => {
    return lines
      .filter(l => l.some && l.some(seg => seg.type === 'command' || seg.type === 'prompt'))
      .map(l => l.filter(seg => seg.type === 'command' || seg.type === 'flag' || seg.type === 'string' || seg.type === 'path' || seg.type === 'number' || seg.type === 'highlight')
        .map(seg => seg.text).join(''))
      .join('\n');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCommandText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="terminal-block">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="terminal-dot red" />
          <span className="terminal-dot yellow" />
          <span className="terminal-dot green" />
        </div>
        <span className="terminal-title">{title}</span>
        <button className={`terminal-copy ${copied ? 'copied' : ''}`} onClick={handleCopy}>
          {copied ? '✓ Copied' : '⧉ Copy'}
        </button>
      </div>
      <div className="terminal-body">
        {lines.map((line, i) => (
          <div key={i} className="terminal-line">
            {Array.isArray(line) ? line.map((seg, j) => (
              <span key={j} className={seg.type || ''}>{seg.text}</span>
            )) : <span className="output">{line}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
