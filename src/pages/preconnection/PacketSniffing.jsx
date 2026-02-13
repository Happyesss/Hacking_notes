import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';
import { Troubleshooting, TroubleItem } from '../../components/Troubleshooting';

export default function PacketSniffing() {
  return (
    <div className="content-area">
      <div className="topic-header">
        <div className="topic-breadcrumb">Pre Connection Attacks <span>/</span> Packet Sniffing</div>
        <h1>Packet Sniffing Basics</h1>
        <p className="topic-desc">Packet sniffing is capturing and analyzing data packets traveling over a network. With monitor mode enabled, you can see all WiFi traffic in range without being connected to any network.</p>
      </div>

      <div className="topic-section">
        <h2>What is Packet Sniffing?</h2>
        <p>In monitor mode, your wireless adapter can capture all wireless packets in range — not just packets meant for your device. This lets you:</p>
        <ul>
          <li><strong>Discover all nearby networks</strong> (SSIDs, BSSIDs, channels, encryption)</li>
          <li><strong>See all connected clients</strong> (their MAC addresses)</li>
          <li><strong>Capture handshakes</strong> (for later cracking)</li>
          <li><strong>Analyze network traffic</strong> (data packets)</li>
        </ul>

        <Diagram title="Packet Sniffing Concept">
{`                    Radio Waves (2.4GHz / 5GHz)
                    ════════════════════════════
                    
   ┌──────────┐         ┌──────────┐         ┌──────────┐
   │ Network A│ )))     │ Network B│ )))     │ Network C│ )))
   │ (WPA2)   │         │ (WEP)   │         │ (Open)   │
   └──────────┘         └──────────┘         └──────────┘
         │                    │                    │
         │                    │                    │
         ▼                    ▼                    ▼
   ┌─────────────────────────────────────────────────────┐
   │              YOUR ADAPTER (Monitor Mode)             │
   │                                                      │
   │  Captures ALL packets from ALL networks in range     │
   └─────────────────────────────────────────────────────┘`}
        </Diagram>
      </div>

      <div className="topic-section">
        <h2>Using airodump-ng</h2>
        <p><code className="inline-code">airodump-ng</code> is the primary tool for wireless packet sniffing. It shows all networks and clients in range.</p>

        <h3>Prerequisites</h3>
        <Terminal title="Enable Monitor Mode First" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airmon-ng check kill' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airmon-ng start ' }, { type: 'string', text: 'wlan0' }],
        ]} />

        <h3>Start Sniffing</h3>
        <Terminal title="airodump-ng Basic Scan" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airodump-ng ' }, { type: 'string', text: 'wlan0mon' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: ' CH  6 ][ Elapsed: 30 s' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: ' BSSID              PWR  Beacons  #Data  CH  ENC   ESSID' }],
          [{ type: 'output', text: ' ' }, { type: 'highlight', text: 'AA:BB:CC:DD:EE:FF' }, { type: 'output', text: '  -45    120      35    6  WPA2  HomeNetwork' }],
          [{ type: 'output', text: ' 11:22:33:44:55:66  -67     85      12    1  WEP   OldRouter' }],
          [{ type: 'output', text: ' 77:88:99:AA:BB:CC  -72     60       0   11  OPN   FreeWiFi' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: ' BSSID              STATION            PWR   Rate  Lost  Packets' }],
          [{ type: 'output', text: ' AA:BB:CC:DD:EE:FF  ' }, { type: 'highlight', text: 'DD:EE:FF:11:22:33' }, { type: 'output', text: '  -35   54e-54    0      125' }],
        ]} />
      </div>

      <div className="topic-section">
        <h2>Understanding the Output</h2>

        <h3>Top Section — Access Points (Networks)</h3>
        <table className="info-table">
          <thead>
            <tr><th>Column</th><th>Meaning</th></tr>
          </thead>
          <tbody>
            <tr><td><code>BSSID</code></td><td>MAC address of the access point (router)</td></tr>
            <tr><td><code>PWR</code></td><td>Signal strength (closer to 0 = stronger). -30 is strong, -80 is weak</td></tr>
            <tr><td><code>Beacons</code></td><td>Announcement packets sent by AP</td></tr>
            <tr><td><code>#Data</code></td><td>Number of data packets captured</td></tr>
            <tr><td><code>CH</code></td><td>Channel the network is on</td></tr>
            <tr><td><code>ENC</code></td><td>Encryption type (WPA2, WPA, WEP, OPN)</td></tr>
            <tr><td><code>ESSID</code></td><td>Network name (SSID)</td></tr>
          </tbody>
        </table>

        <h3>Bottom Section — Clients</h3>
        <table className="info-table">
          <thead>
            <tr><th>Column</th><th>Meaning</th></tr>
          </thead>
          <tbody>
            <tr><td><code>BSSID</code></td><td>MAC of the AP the client is connected to</td></tr>
            <tr><td><code>STATION</code></td><td>MAC address of the client device</td></tr>
            <tr><td><code>PWR</code></td><td>Signal strength of the client</td></tr>
            <tr><td><code>Packets</code></td><td>Number of packets from this client</td></tr>
          </tbody>
        </table>
      </div>

      <div className="topic-section">
        <h2>Key Shortcuts in airodump-ng</h2>
        <table className="info-table">
          <thead>
            <tr><th>Key</th><th>Action</th></tr>
          </thead>
          <tbody>
            <tr><td><code>a</code></td><td>Toggle display of associated/unassociated clients</td></tr>
            <tr><td><code>s</code></td><td>Sort by different columns</td></tr>
            <tr><td><code>Tab</code></td><td>Toggle between different display modes</td></tr>
            <tr><td><code>Ctrl+C</code></td><td>Stop the capture</td></tr>
          </tbody>
        </table>
      </div>

      <Troubleshooting>
        <TroubleItem issue="airodump-ng shows no networks">
          <div className="solution">Solution:</div>
          <p>Make sure monitor mode is properly enabled:</p>
          <Terminal title="Verify Monitor" lines={[
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'iwconfig ' }, { type: 'string', text: 'wlan0mon' }],
            [{ type: 'comment', text: '# Should show Mode:Monitor' }],
          ]} />
          <p>If it shows Managed, re-enable monitor mode. Also make sure all interfering processes are killed.</p>
        </TroubleItem>
        <TroubleItem issue="Only seeing networks on one channel">
          <p>By default airodump-ng hops between channels. If it's stuck on one channel, the adapter may have an issue. Try specifying channel hopping manually or check if your adapter supports all channels.</p>
        </TroubleItem>
        <TroubleItem issue="PWR shows -1 for all networks">
          <p>This means the driver doesn't support signal strength reporting. The adapter still works, you just can't see signal levels. Try a different driver or adapter.</p>
        </TroubleItem>
        <TroubleItem issue="Networks appear and disappear from the list">
          <p>This is normal — airodump-ng is hopping between channels. When it's on channel 6, it can only see channel 6 networks. To focus on one network, use targeted sniffing (next topic).</p>
        </TroubleItem>
      </Troubleshooting>
    </div>
  );
}
