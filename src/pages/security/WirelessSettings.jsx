import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

export default function WirelessSettings() {
  return (
    <div className="content-area">
      <div className="topic-header">
        <div className="topic-breadcrumb">Gaining Access - Security <span>/</span> Wireless Settings Guide</div>
        <h1>Configuring Secure Wireless Settings</h1>
        <p className="topic-desc">Step-by-step guide to configuring your router for maximum security. Covers the most common router interfaces.</p>
      </div>

      <div className="topic-section">
        <h2>Accessing Your Router</h2>
        <p>First, find your router's gateway address:</p>
        <Terminal title="Find Default Gateway" lines={[
          { type: 'command', prompt: '~$', text: 'ip route | grep default' },
          { type: 'output', text: 'default via 192.168.1.1 dev wlan0 proto dhcp' },
          { type: 'comment', text: '# Your gateway is 192.168.1.1 — open this in a browser' },
        ]} />

        <InfoBox type="note" title="Common Router Gateways">
          <ul>
            <li><strong>192.168.1.1</strong> — Most common (TP-Link, Netgear, Asus)</li>
            <li><strong>192.168.0.1</strong> — D-Link, some TP-Link</li>
            <li><strong>10.0.0.1</strong> — Xfinity, some ISPs</li>
            <li><strong>192.168.1.254</strong> — Some BT, TalkTalk routers</li>
          </ul>
        </InfoBox>
      </div>

      <div className="topic-section">
        <h2>Wireless Security Settings</h2>
        <Diagram title="Recommended Settings">
{`  Router Wireless Security Configuration
  ═══════════════════════════════════════

  Security Mode:     [WPA2-Personal]  or  [WPA3-Personal]
                     ✓ RECOMMENDED         ✓ BEST (if supported)
  
  Encryption:        [AES/CCMP]
                     ✓ NEVER use TKIP
  
  Password:          [••••••••••••••••]
                     ✓ 16+ characters, random
  
  WPS:               [DISABLED] ✓
                     ✗ NEVER enable
  
  SSID Broadcast:    [ENABLED]
                     (hiding doesn't add real security)
  
  802.11w (PMF):     [ENABLED] ✓  (if available)
                     Protects against deauth attacks`}
        </Diagram>
      </div>

      <div className="topic-section">
        <h2>Step-by-Step Configuration</h2>
        <ol className="step-list">
          <li>
            <strong>Login to Router</strong>
            <p>Open <code className="inline-code">http://192.168.1.1</code> in browser. Enter admin credentials (check router sticker for defaults).</p>
          </li>
          <li>
            <strong>Change Admin Password First</strong>
            <p>Navigate to <em>Administration → Password</em>. Set a strong, unique password different from your WiFi password.</p>
          </li>
          <li>
            <strong>Configure Wireless Security</strong>
            <p>Navigate to <em>Wireless → Security</em>. Select WPA2-Personal (or WPA3 if available). Set encryption to AES. Enter your new strong password.</p>
          </li>
          <li>
            <strong>Disable WPS</strong>
            <p>Navigate to <em>Wireless → WPS</em> or <em>Advanced → WPS</em>. Turn it OFF completely. Some routers have it under PIN settings too — disable all WPS options.</p>
          </li>
          <li>
            <strong>Update Firmware</strong>
            <p>Navigate to <em>Administration → Firmware Update</em>. Check for updates and install if available.</p>
          </li>
          <li>
            <strong>Disable Remote Management</strong>
            <p>Navigate to <em>Administration → Remote Management</em>. Turn it OFF.</p>
          </li>
          <li>
            <strong>Enable 802.11w (PMF)</strong>
            <p>Navigate to <em>Wireless → Advanced</em>. Set Protected Management Frames to "Enabled" or "Required".</p>
          </li>
        </ol>
      </div>

      <div className="topic-section">
        <h2>Verify Your Security</h2>
        <p>After configuring, scan your own network to verify settings:</p>
        <Terminal title="Verify Security Configuration" lines={[
          { type: 'comment', text: '# Put adapter in monitor mode' },
          { type: 'command', prompt: '~$', text: 'sudo airmon-ng start wlan0' },
          { type: 'comment', text: '# Scan for your network' },
          { type: 'command', prompt: '~$', text: 'sudo airodump-ng wlan0mon' },
          { type: 'comment', text: '# Look at the ENC and CIPHER columns for your network:' },
          { type: 'output', text: '' },
          { type: 'output', text: ' BSSID              CH  ENC    CIPHER  AUTH  ESSID' },
          { type: 'highlight', text: ' AA:BB:CC:DD:EE:FF   6  WPA2   CCMP    PSK   MySecureNetwork' },
          { type: 'comment', text: '# ✓ ENC should be WPA2 (or WPA3)' },
          { type: 'comment', text: '# ✓ CIPHER should be CCMP (AES)' },
          { type: 'comment', text: '# ✗ If you see WEP or TKIP — reconfigure!' },
        ]} />
        <Terminal title="Check for WPS" lines={[
          { type: 'command', prompt: '~$', text: 'sudo wash -i wlan0mon' },
          { type: 'output', text: '' },
          { type: 'output', text: ' BSSID              Ch  dBm  WPS  Lck  Vendor    ESSID' },
          { type: 'highlight', text: ' AA:BB:CC:DD:EE:FF   6  -30  2.0  Yes  RalinkTe  MySecureNetwork' },
          { type: 'comment', text: '# Lck = Yes means WPS is locked/disabled ✓' },
          { type: 'comment', text: '# If Lck = No and your network appears — WPS is still enabled!' },
        ]} />
      </div>

      <div className="topic-section">
        <h2>Encryption Comparison Summary</h2>
        <table className="info-table">
          <thead>
            <tr><th>Setting</th><th>Security Level</th><th>Recommendation</th></tr>
          </thead>
          <tbody>
            <tr><td>WEP</td><td>❌ None (cracked in minutes)</td><td>Never use</td></tr>
            <tr><td>WPA-TKIP</td><td>⚠️ Weak (vulnerable)</td><td>Avoid</td></tr>
            <tr><td>WPA2-TKIP</td><td>⚠️ Moderate</td><td>Avoid if possible</td></tr>
            <tr><td>WPA2-AES (CCMP)</td><td>✅ Strong</td><td>Use this (minimum)</td></tr>
            <tr><td>WPA3-SAE</td><td>✅ Strongest</td><td>Best option</td></tr>
          </tbody>
        </table>
      </div>

      <InfoBox type="warning" title="Important Reminder">
        <p>Even the best encryption is useless with a weak password. A strong password is your #1 defense against WiFi attacks. All the WPA/WPA2 cracking techniques you learned rely on weak passwords.</p>
      </InfoBox>
    </div>
  );
}
