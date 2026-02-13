import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';
import { Troubleshooting, TroubleItem } from '../../components/Troubleshooting';

export default function WirelessAdapter() {
  return (
    <div className="content-area">
      <div className="topic-header">
        <div className="topic-breadcrumb">Network Hacking <span>/</span> Wireless Adapter</div>
        <h1>Connecting a Wireless Adapter to Kali</h1>
        <p className="topic-desc">A compatible external wireless adapter is essential for WiFi hacking. Your laptop's built-in WiFi card usually doesn't support monitor mode or packet injection.</p>
      </div>

      <div className="topic-section">
        <h2>Why You Need an External Adapter</h2>
        <ul>
          <li><strong>Monitor Mode</strong> — Built-in cards usually don't support it</li>
          <li><strong>Packet Injection</strong> — Required for deauth and replay attacks</li>
          <li><strong>VM Compatibility</strong> — USB adapters can be passed through to VMs</li>
        </ul>

        <h3>Recommended Chipsets</h3>
        <table className="info-table">
          <thead>
            <tr><th>Chipset</th><th>Monitor Mode</th><th>Packet Injection</th><th>Popular Adapters</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Atheros AR9271</strong></td><td>✅</td><td>✅</td><td>Alfa AWUS036NHA</td></tr>
            <tr><td><strong>Ralink RT3070</strong></td><td>✅</td><td>✅</td><td>Alfa AWUS036NH</td></tr>
            <tr><td><strong>Realtek RTL8812AU</strong></td><td>✅</td><td>✅</td><td>Alfa AWUS036ACH</td></tr>
            <tr><td><strong>MediaTek MT7612U</strong></td><td>✅</td><td>✅</td><td>Panda PAU0D</td></tr>
          </tbody>
        </table>

        <InfoBox type="tip" title="Best Starter Adapter">
          <p>The <strong>Alfa AWUS036NHA</strong> (Atheros AR9271) is the most recommended adapter for beginners. It works out of the box with Kali Linux, no driver installation needed.</p>
        </InfoBox>
      </div>

      <div className="topic-section">
        <h2>Connecting to Kali VM</h2>

        <h3>VirtualBox Setup</h3>
        <ol className="step-list">
          <li>Plug in the USB wireless adapter to your host machine</li>
          <li>In VirtualBox: <strong>Devices → USB → Select your adapter</strong></li>
          <li>The adapter will disconnect from host and connect to Kali VM</li>
          <li>Verify it's recognized inside Kali</li>
        </ol>

        <Terminal title="Verify Adapter Connection" lines={[
          [{ type: 'comment', text: '# Check if adapter is recognized' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'iwconfig' }],
          [{ type: 'output', text: 'wlan0     IEEE 802.11  ESSID:off/any' }],
          [{ type: 'output', text: '          Mode:Managed  Access Point: Not-Associated' }],
          [{ type: 'output', text: '          Tx-Power=20 dBm' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Check USB devices' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'lsusb' }],
          [{ type: 'output', text: 'Bus 001 Device 002: ID 0cf3:9271 Atheros AR9271 802.11n' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Check detailed driver info' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'airmon-ng' }],
          [{ type: 'output', text: 'PHY     Interface   Driver      Chipset' }],
          [{ type: 'output', text: 'phy0    wlan0       ath9k_htc   Atheros AR9271' }],
        ]} />
      </div>

      <div className="topic-section">
        <h2>VMware Setup</h2>
        <p>In VMware: <strong>VM → Removable Devices → Select Adapter → Connect</strong></p>

        <InfoBox type="note">
          <p>For VMware, you may need to edit the <code className="inline-code">.vmx</code> file and add <code className="inline-code">usb.generic.allowHCI = "TRUE"</code> for USB 3.0 adapters.</p>
        </InfoBox>
      </div>

      <Troubleshooting>
        <TroubleItem issue="Adapter not showing up in iwconfig">
          <div className="solution">Solution:</div>
          <p>Check if the USB device is passed through to the VM:</p>
          <Terminal title="Debug USB" lines={[
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'lsusb' }],
            [{ type: 'comment', text: '# If not listed, reconnect via VM → USB menu' }],
            [{ type: 'comment', text: '# Check dmesg for errors' }],
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'dmesg ' }, { type: 'highlight', text: '| ' }, { type: 'command', text: 'tail ' }, { type: 'flag', text: '-20' }],
          ]} />
        </TroubleItem>
        <TroubleItem issue="Driver not loaded for the adapter">
          <div className="solution">Solution:</div>
          <p>For Realtek chipsets, you often need to install drivers manually:</p>
          <Terminal title="Install Realtek Driver" lines={[
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo apt install ' }, { type: 'string', text: 'realtek-rtl88xxau-dkms' }],
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo reboot' }],
          ]} />
        </TroubleItem>
        <TroubleItem issue="VirtualBox USB passthrough not working">
          <div className="solution">Solution:</div>
          <p>Install VirtualBox Extension Pack on your <strong>host</strong> machine. Add your user to vboxusers group. Enable USB 2.0/3.0 controller in VM settings.</p>
          <Terminal title="Fix USB Passthrough" lines={[
            [{ type: 'comment', text: '# On host machine (Linux):' }],
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo usermod -aG vboxusers ' }, { type: 'string', text: '$USER' }],
            [{ type: 'comment', text: '# Then log out and back in' }],
          ]} />
        </TroubleItem>
        <TroubleItem issue="Adapter connects but can't enter monitor mode">
          <div className="solution">Solution:</div>
          <p>The adapter's chipset may not support monitor mode. Check with <code className="inline-code">iw list</code> and look for "monitor" in supported interface modes. If not listed, you need a different adapter.</p>
        </TroubleItem>
      </Troubleshooting>
    </div>
  );
}
