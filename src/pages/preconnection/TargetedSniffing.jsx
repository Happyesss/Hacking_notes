import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';
import { Troubleshooting, TroubleItem } from '../../components/Troubleshooting';

export default function TargetedSniffing() {
  return (
    <div className="content-area">
      <div className="topic-header">
        <div className="topic-breadcrumb">Pre Connection Attacks <span>/</span> Targeted Packet Sniffing</div>
        <h1>Targeted Packet Sniffing</h1>
        <p className="topic-desc">Instead of sniffing all networks, you can target a specific access point to capture more detailed information about it and its clients.</p>
      </div>

      <div className="topic-section">
        <h2>Why Target a Specific Network?</h2>
        <ul>
          <li><strong>More data captured</strong> — adapter stays on one channel instead of hopping</li>
          <li><strong>See all clients</strong> connected to that specific network</li>
          <li><strong>Capture handshakes</strong> when clients connect/reconnect</li>
          <li><strong>Save packets to file</strong> for later analysis or cracking</li>
        </ul>
      </div>

      <div className="topic-section">
        <h2>Step-by-Step: Targeted Sniffing</h2>

        <h3>Step 1: Run General Scan First</h3>
        <p>Find the target network's BSSID and channel.</p>
        <Terminal title="General Scan" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airodump-ng ' }, { type: 'string', text: 'wlan0mon' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: ' BSSID              PWR  Beacons  #Data  CH  ENC   ESSID' }],
          [{ type: 'output', text: ' ' }, { type: 'highlight', text: 'AA:BB:CC:DD:EE:FF' }, { type: 'output', text: '  -45    120      35  ' }, { type: 'highlight', text: '  6' }, { type: 'output', text: '  WPA2  ' }, { type: 'highlight', text: 'TargetNetwork' }],
        ]} />

        <InfoBox type="note">
          <p>Note down: <strong>BSSID</strong> (AA:BB:CC:DD:EE:FF) and <strong>Channel</strong> (6). You'll need both.</p>
        </InfoBox>

        <h3>Step 2: Target That Specific Network</h3>
        <Terminal title="Targeted Sniffing" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airodump-ng ' }, { type: 'flag', text: '--bssid ' }, { type: 'highlight', text: 'AA:BB:CC:DD:EE:FF ' }, { type: 'flag', text: '--channel ' }, { type: 'number', text: '6 ' }, { type: 'flag', text: '--write ' }, { type: 'string', text: 'capture ' }, { type: 'string', text: 'wlan0mon' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: ' CH  6 ][ Elapsed: 2 min' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: ' BSSID              PWR  Beacons  #Data  CH  ENC   ESSID' }],
          [{ type: 'output', text: ' AA:BB:CC:DD:EE:FF  -45    520     185    6  WPA2  TargetNetwork' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: ' BSSID              STATION            PWR   Rate  Lost  Packets' }],
          [{ type: 'output', text: ' AA:BB:CC:DD:EE:FF  ' }, { type: 'highlight', text: '11:22:33:44:55:66' }, { type: 'output', text: '  -35   54e-54    0      230' }],
          [{ type: 'output', text: ' AA:BB:CC:DD:EE:FF  ' }, { type: 'highlight', text: '77:88:99:AA:BB:CC' }, { type: 'output', text: '  -52   24e-24    2       98' }],
          [{ type: 'output', text: ' AA:BB:CC:DD:EE:FF  ' }, { type: 'highlight', text: 'DD:EE:FF:00:11:22' }, { type: 'output', text: '  -67   11e-11    5       45' }],
        ]} />
      </div>

      <div className="topic-section">
        <h2>Command Breakdown</h2>
        <table className="info-table">
          <thead>
            <tr><th>Flag</th><th>Purpose</th></tr>
          </thead>
          <tbody>
            <tr><td><code>--bssid AA:BB:CC:DD:EE:FF</code></td><td>Only capture packets from this access point</td></tr>
            <tr><td><code>--channel 6</code></td><td>Lock to channel 6 (stops channel hopping)</td></tr>
            <tr><td><code>--write capture</code></td><td>Save captured data to files named "capture-01.cap" etc.</td></tr>
          </tbody>
        </table>

        <h3>Files Created by --write</h3>
        <Terminal title="Output Files" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'ls capture*' }],
          [{ type: 'output', text: 'capture-01.cap      ← Packet capture (used for cracking)' }],
          [{ type: 'output', text: 'capture-01.csv      ← CSV data about networks/clients' }],
          [{ type: 'output', text: 'capture-01.kismet.csv' }],
          [{ type: 'output', text: 'capture-01.kismet.netxml' }],
          [{ type: 'output', text: 'capture-01.log.csv' }],
        ]} />

        <InfoBox type="tip">
          <p>The <code className="inline-code">.cap</code> file is the most important — it contains the actual captured packets. This is what you'll use later for cracking WEP/WPA passwords.</p>
        </InfoBox>
      </div>

      <div className="topic-section">
        <h2>What You Can See</h2>
        <Diagram title="Information Gathered from Targeted Sniffing">
{`  ┌─────────────────────────────────────────────────┐
  │           TARGET: TargetNetwork (WPA2)            │
  │           BSSID: AA:BB:CC:DD:EE:FF                │
  │           Channel: 6                              │
  ├─────────────────────────────────────────────────┤
  │                                                   │
  │  Connected Clients:                               │
  │  ┌──────────────────┐ ┌──────────────────┐       │
  │  │ Client 1         │ │ Client 2         │       │
  │  │ 11:22:33:44:55:66│ │ 77:88:99:AA:BB:CC│       │
  │  │ Signal: -35 dBm  │ │ Signal: -52 dBm  │       │
  │  │ Packets: 230     │ │ Packets: 98      │       │
  │  └──────────────────┘ └──────────────────┘       │
  │                                                   │
  │  Data Captured: 185 packets                       │
  │  Handshakes: Waiting...                           │
  └─────────────────────────────────────────────────┘`}
        </Diagram>
      </div>

      <Troubleshooting>
        <TroubleItem issue="No clients showing up for the target network">
          <div className="solution">Solution:</div>
          <p>Wait longer — clients appear only when they transmit data. If no one is using the network, there's no traffic to capture. You can try deauthenticating clients to force them to reconnect (covered in next topic).</p>
        </TroubleItem>
        <TroubleItem issue="Data count stays at 0">
          <p>No active traffic on the network. Wait for someone to use it, or you'll need to generate traffic using aireplay-ng techniques.</p>
        </TroubleItem>
        <TroubleItem issue="Channel mismatch — 'fixed channel wlan0mon: -1'">
          <div className="solution">Solution:</div>
          <p>Kill interfering processes and restart:</p>
          <Terminal title="Fix Channel" lines={[
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airmon-ng check kill' }],
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airodump-ng --bssid AA:BB:CC:DD:EE:FF --channel 6 wlan0mon' }],
          ]} />
        </TroubleItem>
        <TroubleItem issue="Capture file is empty or very small">
          <p>Make sure the <code className="inline-code">--write</code> flag is used. Also check that the <code className="inline-code">--bssid</code> is correct (copy-paste it). Let the capture run for at least a few minutes.</p>
        </TroubleItem>
      </Troubleshooting>
    </div>
  );
}
