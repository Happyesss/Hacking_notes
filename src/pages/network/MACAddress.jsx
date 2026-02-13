import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';
import { Troubleshooting, TroubleItem } from '../../components/Troubleshooting';

export default function MACAddress() {
  return (
    <div className="content-area">
      <div className="topic-header">
        <div className="topic-breadcrumb">Network Hacking <span>/</span> MAC Address</div>
        <h1>What is MAC Address & How To Change It</h1>
        <p className="topic-desc">MAC addresses are unique hardware identifiers. Changing (spoofing) your MAC address is a fundamental technique for anonymity and bypassing network restrictions.</p>
      </div>

      <div className="topic-section">
        <h2>What is a MAC Address?</h2>
        <p>A MAC (Media Access Control) address is a unique 48-bit identifier assigned to a network interface card (NIC) by the manufacturer. It operates at Layer 2 (Data Link) of the OSI model.</p>

        <Diagram title="MAC Address Format">
{`     MAC Address: AA:BB:CC:DD:EE:FF
                  ─────── ───────
                     │       │
                     │       └── Device-specific (unique per device)
                     │
                     └────────── OUI (Organizationally Unique Identifier)
                                 Identifies the manufacturer
                                 
   Example: 00:C0:CA:XX:XX:XX = Alfa Inc.
            00:1A:2B:XX:XX:XX = Ayecom Technology`}
        </Diagram>
      </div>

      <div className="topic-section">
        <h2>Why Change Your MAC Address?</h2>
        <ul>
          <li><strong>Anonymity</strong> — Hide your real hardware identity on a network</li>
          <li><strong>Bypass MAC filtering</strong> — Some networks only allow specific MAC addresses</li>
          <li><strong>Impersonate devices</strong> — Pretend to be another device on the network</li>
          <li><strong>Bypass network restrictions</strong> — Some public WiFi limit time per MAC</li>
          <li><strong>Avoid tracking</strong> — Prevent network admins from tracking your device</li>
        </ul>
      </div>

      <div className="topic-section">
        <h2>Check Current MAC Address</h2>
        <Terminal title="View MAC Address" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'ifconfig ' }, { type: 'string', text: 'wlan0' }],
          [{ type: 'output', text: 'wlan0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>' }],
          [{ type: 'output', text: '        ether ' }, { type: 'highlight', text: 'aa:bb:cc:dd:ee:ff' }, { type: 'output', text: '  txqueuelen 1000' }],
          [{ type: 'output', text: '        inet 192.168.1.5  netmask 255.255.255.0' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Or use ip command' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'ip link show ' }, { type: 'string', text: 'wlan0' }],
        ]} />
      </div>

      <div className="topic-section">
        <h2>Change MAC Address (Manual Method)</h2>
        <Terminal title="Manual MAC Spoofing" lines={[
          [{ type: 'comment', text: '# Step 1: Bring interface down' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo ifconfig ' }, { type: 'string', text: 'wlan0 ' }, { type: 'flag', text: 'down' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Step 2: Change MAC address' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo ifconfig ' }, { type: 'string', text: 'wlan0 ' }, { type: 'flag', text: 'hw ether ' }, { type: 'highlight', text: '00:11:22:33:44:55' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Step 3: Bring interface back up' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo ifconfig ' }, { type: 'string', text: 'wlan0 ' }, { type: 'flag', text: 'up' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Step 4: Verify the change' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'ifconfig ' }, { type: 'string', text: 'wlan0' }],
          [{ type: 'output', text: '        ether ' }, { type: 'highlight', text: '00:11:22:33:44:55' }],
        ]} />
      </div>

      <div className="topic-section">
        <h2>Change MAC Address (Using macchanger)</h2>
        <p><code className="inline-code">macchanger</code> is a dedicated tool that makes MAC spoofing easier and offers more options.</p>

        <Terminal title="macchanger Usage" lines={[
          [{ type: 'comment', text: '# Install macchanger' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo apt install ' }, { type: 'string', text: 'macchanger' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Bring interface down first' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo ifconfig ' }, { type: 'string', text: 'wlan0 ' }, { type: 'flag', text: 'down' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Set a specific MAC' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo macchanger ' }, { type: 'flag', text: '-m ' }, { type: 'highlight', text: '00:11:22:33:44:55 ' }, { type: 'string', text: 'wlan0' }],
          [{ type: 'output', text: 'Current MAC: aa:bb:cc:dd:ee:ff (Unknown)' }],
          [{ type: 'output', text: 'Permanent MAC: aa:bb:cc:dd:ee:ff (Unknown)' }],
          [{ type: 'output', text: 'New MAC: ' }, { type: 'highlight', text: '00:11:22:33:44:55' }, { type: 'output', text: ' (Unknown)' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Set a random MAC' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo macchanger ' }, { type: 'flag', text: '-r ' }, { type: 'string', text: 'wlan0' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Reset to original MAC' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo macchanger ' }, { type: 'flag', text: '-p ' }, { type: 'string', text: 'wlan0' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Bring interface back up' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo ifconfig ' }, { type: 'string', text: 'wlan0 ' }, { type: 'flag', text: 'up' }],
        ]} />

        <InfoBox type="note">
          <p>MAC address changes are <strong>temporary</strong>. After a reboot, your original MAC address will be restored. To make it persistent, you'd need to add the commands to a startup script.</p>
        </InfoBox>
      </div>

      <div className="topic-section">
        <h2>macchanger Options</h2>
        <table className="info-table">
          <thead>
            <tr><th>Flag</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>-m MAC</code></td><td>Set specific MAC address</td></tr>
            <tr><td><code>-r</code></td><td>Set completely random MAC</td></tr>
            <tr><td><code>-a</code></td><td>Set random vendor MAC (same type)</td></tr>
            <tr><td><code>-p</code></td><td>Reset to original permanent MAC</td></tr>
            <tr><td><code>-s</code></td><td>Show current MAC</td></tr>
            <tr><td><code>-l</code></td><td>List known vendors</td></tr>
          </tbody>
        </table>
      </div>

      <Troubleshooting>
        <TroubleItem issue="MAC address doesn't change after running the command">
          <div className="solution">Solution:</div>
          <p>Make sure the interface is <strong>down</strong> before changing. Also check if NetworkManager is resetting it:</p>
          <Terminal title="Fix MAC Change" lines={[
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo service NetworkManager stop' }],
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo ifconfig wlan0 down' }],
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo macchanger -r wlan0' }],
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo ifconfig wlan0 up' }],
          ]} />
        </TroubleItem>
        <TroubleItem issue="'SIOCSIFHWADDR: Cannot assign requested address'">
          <div className="solution">Solution:</div>
          <p>The MAC address you specified is invalid. The first byte should be even (unicast). Don't use <code className="inline-code">ff:ff:ff:ff:ff:ff</code> or <code className="inline-code">00:00:00:00:00:00</code>.</p>
        </TroubleItem>
        <TroubleItem issue="MAC resets after reboot">
          <p>This is expected behavior. To auto-change on boot, create a systemd service or add the commands to <code className="inline-code">/etc/rc.local</code>.</p>
        </TroubleItem>
        <TroubleItem issue="WiFi doesn't connect after MAC change">
          <div className="solution">Solution:</div>
          <p>Some routers use MAC filtering. The new MAC may not be on the allowed list. Also restart NetworkManager after the change:</p>
          <Terminal title="Restart NetworkManager" lines={[
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo service NetworkManager restart' }],
          ]} />
        </TroubleItem>
      </Troubleshooting>
    </div>
  );
}
