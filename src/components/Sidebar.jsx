import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const sections = [
  {
    title: 'Linux Basics',
    items: [
      { label: 'Kali Basics', path: '/linux/kali-basics' },
      { label: 'Terminal & Linux Commands', path: '/linux/terminal-commands' },
      { label: 'Powerful Terminals with AI', path: '/linux/ai-terminals' },
    ],
  },
  {
    title: 'Network Hacking',
    items: [
      { label: 'Intro to Network Hacking', path: '/network/intro' },
      { label: 'Networks Basics', path: '/network/basics' },
      { label: 'Connecting Wireless Adapter', path: '/network/wireless-adapter' },
      { label: 'MAC Address & How to Change', path: '/network/mac-address' },
      { label: 'Wireless Modes', path: '/network/wireless-modes' },
    ],
  },
  {
    title: 'Pre Connection Attacks',
    items: [
      { label: 'Packet Sniffing Basics', path: '/pre-connection/packet-sniffing' },
      { label: 'WiFi Bands - 2.4Ghz & 5Ghz', path: '/pre-connection/wifi-bands' },
      { label: 'Targeted Packet Sniffing', path: '/pre-connection/targeted-sniffing' },
      { label: 'Deauthentication Attack', path: '/pre-connection/deauth-attack' },
    ],
  },
  {
    title: 'WEP Cracking',
    items: [
      { label: 'Gaining Access Intro', path: '/wep/gaining-access-intro' },
      { label: 'Theory Behind WEP Cracking', path: '/wep/theory' },
      { label: 'WEP Cracking Basics', path: '/wep/cracking-basics' },
      { label: 'Fake Authentication Attack', path: '/wep/fake-auth' },
      { label: 'ARP Request Replay Attack', path: '/wep/arp-replay' },
    ],
  },
  {
    title: 'WPA / WPA2 Cracking',
    items: [
      { label: 'Intro to WPA/WPA2 Cracking', path: '/wpa/intro' },
      { label: 'Hacking WPA2 Without Wordlist', path: '/wpa/without-wordlist' },
      { label: 'Capturing The Handshake', path: '/wpa/capture-handshake' },
      { label: 'Creating a Wordlist', path: '/wpa/wordlist' },
      { label: 'Cracking WPA/WPA2', path: '/wpa/cracking' },
    ],
  },
  {
    title: 'Gaining Access - Security',
    items: [
      { label: 'Securing From Hackers', path: '/security/securing-network' },
      { label: 'Wireless Settings for Max Security', path: '/security/wireless-settings' },
    ],
  },
  {
    title: 'Post Connection Attacks',
    items: [
      { label: 'Intro to Post-Connection', path: '/post-connection/intro' },
    ],
  },
];

export { sections };

export default function Sidebar({ isOpen, onClose }) {
  const [openSections, setOpenSections] = useState(() => {
    const initial = {};
    sections.forEach((_, i) => (initial[i] = true));
    return initial;
  });
  const location = useLocation();

  const toggleSection = (idx) => {
    setOpenSections(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay visible" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="logo-icon">⚡</span>
          <div>
            <h1>Hacking Notes</h1>
            <span>Ethical Hacking Reference</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          {sections.map((section, idx) => (
            <div className="sidebar-section" key={idx}>
              <div className="sidebar-section-header" onClick={() => toggleSection(idx)}>
                {section.title}
                <span className={`chevron ${openSections[idx] ? 'open' : ''}`}>▶</span>
              </div>
              <div
                className={`sidebar-section-items ${!openSections[idx] ? 'collapsed' : ''}`}
                style={{ maxHeight: openSections[idx] ? section.items.length * 40 + 'px' : 0 }}
              >
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                    onClick={onClose}
                  >
                    <span className="link-icon">📄</span>
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
