import React from 'react';
import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

const WirelessSettings = () => {
  return (
    <div className="page-content">
      <h1>Configuring Secure Wireless Settings — Step by Step</h1>

      <p>
        This is the hands-on guide to actually configuring your router for maximum security. 
        No theory — just step-by-step instructions you can follow right now. We'll cover every 
        setting you need to change and explain <em>why</em> each one matters.
      </p>

      {/* ============================================================ */}
      {/* SECTION: Accessing Your Router                                */}
      {/* ============================================================ */}
      <h2>🔌 Step 1: Access Your Router's Admin Panel</h2>

      <p>
        First, find your router's IP address (gateway), then open it in a browser:
      </p>

      <Terminal lines={[
        { segments: [{ text: '# Find your router\'s IP address (default gateway)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'ip route | grep default', type: 'command' }] },
        { segments: [{ text: 'default via ', type: 'output' }, { text: '192.168.1.1', type: 'highlight' }, { text: ' dev wlan0 proto dhcp', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Your gateway is 192.168.1.1', type: 'comment' }] },
        { segments: [{ text: '# Open http://192.168.1.1 in your browser', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Alternative commands:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'ip r | head -1', type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: "route -n | grep 'UG' | awk '{print $2}'", type: 'command' }] },
      ]} />

      <InfoBox type="note">
        <strong>Common router gateway addresses:</strong>
        <ul>
          <li><strong>192.168.1.1</strong> — Most routers (TP-Link, Netgear, ASUS, Linksys)</li>
          <li><strong>192.168.0.1</strong> — D-Link, some TP-Link models</li>
          <li><strong>10.0.0.1</strong> — Xfinity, some ISP-provided routers</li>
          <li><strong>192.168.1.254</strong> — Some BT, TalkTalk routers</li>
          <li><strong>192.168.2.1</strong> — Some Belkin routers</li>
        </ul>
        Default admin credentials are usually printed on a sticker on the bottom of the router. 
        Common defaults: admin/admin, admin/password, admin/1234.
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: Settings Guide                                       */}
      {/* ============================================================ */}
      <h2>⚙️ Step 2: Configure Wireless Security</h2>

      <Diagram title="Recommended Router Configuration">
{`
  ┌──────────────────────────────────────────────────────────────────┐
  │              RECOMMENDED ROUTER SETTINGS                        │
  ├──────────────────────────────────────────────────────────────────┤
  │                                                                  │
  │  Wireless Security                                              │
  │  ══════════════════                                             │
  │  Security Mode:     WPA2-Personal ✅  (or WPA3 if available)    │
  │                     WPA-TKIP ❌  (weak, deprecated)             │
  │                     WEP ❌  (broken, never use)                 │
  │                                                                  │
  │  Encryption:        AES/CCMP ✅  (strong, modern)               │
  │                     TKIP ❌  (weak, legacy)                     │
  │                     AES+TKIP ⚠️  (mixed mode, avoid if possible)│
  │                                                                  │
  │  Password:          16+ characters, random ✅                    │
  │                     Example: Purple-Tiger-42-Jump!               │
  │                                                                  │
  │  WPS:               DISABLED ✅                                  │
  │                     Enabled ❌  (critical vulnerability!)        │
  │                                                                  │
  │  SSID Broadcast:    ENABLED ✅  (hiding provides no security)   │
  │                                                                  │
  │  802.11w (PMF):     ENABLED ✅  (blocks deauth attacks)         │
  │                     or "Required" for maximum protection         │
  │                                                                  │
  │  Administration                                                  │
  │  ══════════════                                                  │
  │  Admin Password:    CHANGED from default ✅                      │
  │  Remote Mgmt:       DISABLED ✅                                  │
  │  UPnP:              DISABLED ✅                                  │
  │  Firmware:          UPDATED to latest ✅                         │
  │                                                                  │
  └──────────────────────────────────────────────────────────────────┘
`}
      </Diagram>

      {/* ============================================================ */}
      {/* SECTION: Step by Step                                         */}
      {/* ============================================================ */}
      <h2>📝 Detailed Step-by-Step Guide</h2>

      <h3>1. Change the Admin Password (FIRST!)</h3>
      <p>
        Before anything else, change the admin login credentials. If an attacker gets on your 
        network (even as a guest), the first thing they try is the router admin panel with 
        default credentials.
      </p>
      <ul>
        <li>Navigate to: <strong>Administration → System → Password</strong> (varies by brand)</li>
        <li>Set a strong password different from your WiFi password</li>
        <li>Write it down and store it securely (not on a sticky note on the router!)</li>
      </ul>

      <h3>2. Configure Wireless Security</h3>
      <ul>
        <li>Navigate to: <strong>Wireless → Security</strong> (or Wireless Settings)</li>
        <li>Set Security Mode to: <strong>WPA2-Personal</strong> (or WPA3-Personal if available)</li>
        <li>Set Encryption to: <strong>AES</strong> (also labeled CCMP). Never TKIP.</li>
        <li>Set your WiFi password: <strong>16+ characters, random</strong></li>
      </ul>

      <InfoBox type="warning">
        <strong>About "WPA2/WPA Mixed Mode":</strong> Some routers offer mixed WPA/WPA2 mode for 
        backward compatibility with old devices. This is less secure because it allows TKIP 
        connections. If all your devices support WPA2, use <strong>WPA2 only</strong>.
      </InfoBox>

      <h3>3. Disable WPS</h3>
      <p>
        This is arguably the most important setting after the password. WPS is a backdoor that 
        bypasses your password entirely.
      </p>
      <ul>
        <li>Navigate to: <strong>Wireless → WPS</strong> (or Advanced Wireless Settings)</li>
        <li>Turn WPS OFF — disable all WPS options (PIN, Push Button, etc.)</li>
        <li>Some routers have WPS in multiple locations — check Advanced settings too</li>
      </ul>

      <InfoBox type="danger">
        <strong>⚠️ Some routers claim WPS is "off" but it's still active!</strong> After disabling 
        WPS, verify by scanning your own network with <code>wash</code>:
      </InfoBox>

      <Terminal lines={[
        { segments: [{ text: '# Verify WPS is actually disabled', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo wash -i wlan0mon', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# If your network NO LONGER appears → WPS is truly disabled ✅', type: 'comment' }] },
        { segments: [{ text: '# If it still appears with "Lck: No" → WPS is STILL ACTIVE ❌', type: 'comment' }] },
        { segments: [{ text: '# Some routers need a firmware update to properly disable WPS', type: 'comment' }] },
      ]} />

      <h3>4. Enable 802.11w (Protected Management Frames)</h3>
      <ul>
        <li>Navigate to: <strong>Wireless → Advanced</strong> (or Professional Settings)</li>
        <li>Find "Protected Management Frames" or "802.11w" or "PMF"</li>
        <li>Set to <strong>Enabled</strong> (compatible) or <strong>Required</strong> (maximum security)</li>
        <li>Note: "Required" mode may disconnect older devices that don't support PMF</li>
      </ul>

      <h3>5. Update Firmware</h3>
      <ul>
        <li>Navigate to: <strong>Administration → Firmware Update</strong></li>
        <li>Click "Check for Updates" (or download manually from manufacturer's website)</li>
        <li>Install the update and reboot the router</li>
        <li>Set a reminder to check quarterly</li>
      </ul>

      <h3>6. Disable Remote Management</h3>
      <ul>
        <li>Navigate to: <strong>Administration → Remote Management</strong></li>
        <li>Turn it OFF completely</li>
        <li>This prevents anyone from accessing your router's admin panel from the internet</li>
      </ul>

      <h3>7. Disable UPnP</h3>
      <ul>
        <li>Navigate to: <strong>Advanced → UPnP</strong> (or NAT/Forwarding section)</li>
        <li>Turn it OFF</li>
        <li>UPnP allows applications to automatically open ports — this can be exploited by malware</li>
      </ul>

      <h3>8. Set Up a Guest Network</h3>
      <ul>
        <li>Navigate to: <strong>Wireless → Guest Network</strong></li>
        <li>Enable with a separate password</li>
        <li>Enable "Client Isolation" — guests can't see each other or your main devices</li>
        <li>Use for: visitors, IoT devices (smart bulbs, cameras), anything you don't fully trust</li>
      </ul>

      {/* ============================================================ */}
      {/* SECTION: Verify Your Security                                 */}
      {/* ============================================================ */}
      <h2>🔍 Step 3: Verify Your Configuration</h2>

      <p>
        After configuring everything, scan your own network to verify the settings are applied:
      </p>

      <Terminal lines={[
        { segments: [{ text: '# Put adapter in monitor mode', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airmon-ng start wlan0', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Scan for your network', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airodump-ng wlan0mon', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: ' BSSID              PWR  CH  ENC    CIPHER  AUTH  ESSID', type: 'output' }] },
        { segments: [{ text: ' AA:BB:CC:DD:EE:FF  -30   6  WPA2   CCMP    PSK   MySecureNetwork', type: 'highlight' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# VERIFY:', type: 'comment' }] },
        { segments: [{ text: '# ✅ ENC = WPA2 (or WPA3) — NOT WEP or WPA', type: 'comment' }] },
        { segments: [{ text: '# ✅ CIPHER = CCMP (AES) — NOT TKIP', type: 'comment' }] },
        { segments: [{ text: '# ❌ If you see WEP or TKIP → go back and reconfigure!', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Check WPS status', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo wash -i wlan0mon', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# ✅ If your network doesn\'t appear → WPS is off', type: 'comment' }] },
        { segments: [{ text: '# ❌ If it appears with Lck:No → WPS is still enabled!', type: 'comment' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: Encryption Comparison                                */}
      {/* ============================================================ */}
      <h2>📊 Encryption Comparison Summary</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Setting</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Security</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Crack Time</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Recommendation</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={{ padding: '8px' }}>WEP</td><td style={{ padding: '8px' }}>❌ None</td><td style={{ padding: '8px' }}>5-15 minutes</td><td style={{ padding: '8px' }}>NEVER use</td></tr>
          <tr><td style={{ padding: '8px' }}>WPA-TKIP</td><td style={{ padding: '8px' }}>⚠️ Weak</td><td style={{ padding: '8px' }}>Hours (vulnerable)</td><td style={{ padding: '8px' }}>Avoid</td></tr>
          <tr><td style={{ padding: '8px' }}>WPA2-TKIP</td><td style={{ padding: '8px' }}>⚠️ Moderate</td><td style={{ padding: '8px' }}>Depends on password</td><td style={{ padding: '8px' }}>Avoid if possible</td></tr>
          <tr><td style={{ padding: '8px' }}>WPA2-AES (CCMP)</td><td style={{ padding: '8px' }}>✅ Strong</td><td style={{ padding: '8px' }}>Depends on password only</td><td style={{ padding: '8px' }}>Minimum standard</td></tr>
          <tr><td style={{ padding: '8px' }}>WPA3-SAE</td><td style={{ padding: '8px' }}>✅ Strongest</td><td style={{ padding: '8px' }}>Offline attacks impossible</td><td style={{ padding: '8px' }}>Best option available</td></tr>
        </tbody>
      </table>

      {/* ============================================================ */}
      {/* SECTION: Edge Cases                                           */}
      {/* ============================================================ */}
      <h2>⚠️ Edge Cases & Troubleshooting</h2>

      <h3>Edge Case: Old devices can't connect after switching to WPA2-only</h3>
      <p>
        Some very old devices (pre-2006) only support WEP or WPA-TKIP. Options:
      </p>
      <ul>
        <li>Put old devices on a separate guest network with lower security</li>
        <li>Replace the old device (recommended — it's a security risk anyway)</li>
        <li>Use WPA2/WPA mixed mode as a temporary compromise (less secure)</li>
      </ul>

      <h3>Edge Case: Router doesn't have WPA3 option</h3>
      <p>
        WPA3 requires hardware support. If your router doesn't offer WPA3, use WPA2-AES — it's 
        still excellent security with a strong password. Check for firmware updates that might add 
        WPA3 support, or consider upgrading your router.
      </p>

      <h3>Edge Case: Router doesn't have 802.11w/PMF option</h3>
      <p>
        Older routers may not support Protected Management Frames. Check for firmware updates. 
        If PMF isn't available, your network remains vulnerable to deauth attacks — but with a 
        strong password and WPS disabled, an attacker still can't crack your network (they can 
        only temporarily disconnect you).
      </p>

      <h3>Edge Case: Can't find WPS setting in router</h3>
      <p>
        Try these locations (varies by brand):
      </p>
      <ul>
        <li>Wireless → WPS (most common)</li>
        <li>Wireless → Advanced → WPS</li>
        <li>Security → Wi-Fi Protected Setup</li>
        <li>Advanced → Wireless → WPS PIN</li>
        <li>Some routers have a physical WPS button — disabling in software may not fully disable it. Check with <code>wash</code>.</li>
      </ul>

      <InfoBox type="success">
        <strong>You're done!</strong> If you've followed all these steps, your network is now 
        significantly more secure than 95% of WiFi networks. The key takeaway: <strong>WPA2-AES + 
        strong random password + WPS disabled</strong> = practically uncrackable. Everything else 
        is extra hardening.
      </InfoBox>
    </div>
  );
};

export default WirelessSettings;
