import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';
import { Troubleshooting, TroubleItem } from '../../components/Troubleshooting';

export default function WirelessModes() {
  return (
    <div className="content-area">
      <div className="topic-header">
        <div className="topic-breadcrumb">Network Hacking <span>/</span> Wireless Modes</div>
        <h1>Wireless Modes (Managed & Monitor)</h1>
        <p className="topic-desc">Understanding wireless modes is critical. Monitor mode is what allows your adapter to capture all WiFi traffic in range — the foundation of wireless hacking.</p>
      </div>

      <div className="topic-section">
        <h2>Wireless Interface Modes</h2>
        <table className="info-table">
          <thead>
            <tr><th>Mode</th><th>Description</th><th>Use Case</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Managed</strong></td>
              <td>Normal mode — connects to access points like a regular client</td>
              <td>Everyday WiFi usage</td>
            </tr>
            <tr>
              <td><strong>Monitor</strong></td>
              <td>Captures ALL wireless traffic in range without connecting to any network</td>
              <td>Packet sniffing, network discovery, attacks</td>
            </tr>
          </tbody>
        </table>

        <Diagram title="Managed vs Monitor Mode">
{`  MANAGED MODE                              MONITOR MODE
  ────────────                              ────────────
                                            
  ┌─────────┐      ┌──────────┐            ┌─────────┐
  │  Your    │◄────▶│  Router  │            │  Your   │     Captures ALL packets
  │  Device  │      │  (AP)    │            │  Device │     from ALL networks
  └─────────┘      └──────────┘            └────┬────┘     in range
                                                │
  Only sees traffic                     ┌───────┼───────┐
  to/from your device                   ▼       ▼       ▼
                                    ┌──────┐┌──────┐┌──────┐
                                    │ AP 1 ││ AP 2 ││ AP 3 │
                                    └──────┘└──────┘└──────┘`}
        </Diagram>
      </div>

      <div className="topic-section">
        <h2>Check Current Mode</h2>
        <Terminal title="Check Wireless Mode" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'iwconfig' }],
          [{ type: 'output', text: 'wlan0     IEEE 802.11  ESSID:off/any' }],
          [{ type: 'output', text: '          Mode:' }, { type: 'highlight', text: 'Managed' }, { type: 'output', text: '  Access Point: Not-Associated' }],
          [{ type: 'output', text: '          Tx-Power=20 dBm' }],
          [{ type: 'output', text: '          Retry short limit:7   RTS thr:off' }],
        ]} />
      </div>

      <div className="topic-section">
        <h2>Enable Monitor Mode (Method 1: airmon-ng)</h2>
        <p>The easiest and most reliable method. <code className="inline-code">airmon-ng</code> is part of the aircrack-ng suite.</p>

        <Terminal title="Using airmon-ng" lines={[
          [{ type: 'comment', text: '# Step 1: Kill interfering processes' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airmon-ng check kill' }],
          [{ type: 'output', text: 'Killing these processes:' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: '  PID Name' }],
          [{ type: 'output', text: '  723 wpa_supplicant' }],
          [{ type: 'output', text: '  812 NetworkManager' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Step 2: Start monitor mode' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airmon-ng start ' }, { type: 'string', text: 'wlan0' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: 'PHY     Interface   Driver      Chipset' }],
          [{ type: 'output', text: 'phy0    wlan0       ath9k_htc   Atheros AR9271' }],
          [{ type: 'output', text: '                (mac80211 monitor mode vif enabled for [phy0]wlan0 on [phy0]' }, { type: 'highlight', text: 'wlan0mon' }, { type: 'output', text: ')' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Step 3: Verify monitor mode is active' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'iwconfig ' }, { type: 'string', text: 'wlan0mon' }],
          [{ type: 'output', text: 'wlan0mon  IEEE 802.11  Mode:' }, { type: 'highlight', text: 'Monitor' }, { type: 'output', text: '  Frequency:2.437 GHz' }],
        ]} />

        <InfoBox type="note">
          <p>After running <code className="inline-code">airmon-ng start wlan0</code>, the interface name changes to <code className="inline-code">wlan0mon</code>. Use this new name for all subsequent commands.</p>
        </InfoBox>
      </div>

      <div className="topic-section">
        <h2>Enable Monitor Mode (Method 2: Manual)</h2>
        <Terminal title="Manual Monitor Mode" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo ifconfig ' }, { type: 'string', text: 'wlan0 ' }, { type: 'flag', text: 'down' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo iwconfig ' }, { type: 'string', text: 'wlan0 ' }, { type: 'flag', text: 'mode monitor' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo ifconfig ' }, { type: 'string', text: 'wlan0 ' }, { type: 'flag', text: 'up' }],
          [{ type: 'comment', text: '# Verify' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'iwconfig ' }, { type: 'string', text: 'wlan0' }],
          [{ type: 'output', text: 'wlan0     IEEE 802.11  Mode:' }, { type: 'highlight', text: 'Monitor' }],
        ]} />
      </div>

      <div className="topic-section">
        <h2>Disable Monitor Mode</h2>
        <Terminal title="Stop Monitor Mode" lines={[
          [{ type: 'comment', text: '# Method 1: airmon-ng' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airmon-ng stop ' }, { type: 'string', text: 'wlan0mon' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Restart NetworkManager to get internet back' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo systemctl start NetworkManager' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Method 2: Manual' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo ifconfig ' }, { type: 'string', text: 'wlan0 ' }, { type: 'flag', text: 'down' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo iwconfig ' }, { type: 'string', text: 'wlan0 ' }, { type: 'flag', text: 'mode managed' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo ifconfig ' }, { type: 'string', text: 'wlan0 ' }, { type: 'flag', text: 'up' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo systemctl start NetworkManager' }],
        ]} />

        <InfoBox type="warning">
          <p>After enabling monitor mode, your WiFi internet connection will stop working. Don't forget to stop monitor mode and restart NetworkManager when done.</p>
        </InfoBox>
      </div>

      <Troubleshooting>
        <TroubleItem issue="airmon-ng check kill doesn't kill all processes">
          <div className="solution">Solution:</div>
          <p>Manually kill the remaining processes:</p>
          <Terminal title="Manual Kill" lines={[
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo killall wpa_supplicant' }],
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo killall dhclient' }],
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo systemctl stop NetworkManager' }],
          ]} />
        </TroubleItem>
        <TroubleItem issue="Monitor mode starts but no packets captured">
          <div className="solution">Solution:</div>
          <p>Your adapter may not support packet injection. Verify with:</p>
          <Terminal title="Test Injection" lines={[
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo aireplay-ng ' }, { type: 'flag', text: '--test ' }, { type: 'string', text: 'wlan0mon' }],
          ]} />
          <p>If injection doesn't work, you need a different adapter.</p>
        </TroubleItem>
        <TroubleItem issue="Interface name didn't change to wlan0mon">
          <p>Some drivers keep the original name. Check with <code className="inline-code">iwconfig</code> — the mode should show "Monitor" regardless of the name.</p>
        </TroubleItem>
        <TroubleItem issue="Can't connect to WiFi after stopping monitor mode">
          <div className="solution">Solution:</div>
          <Terminal title="Restore WiFi" lines={[
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airmon-ng stop wlan0mon' }],
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo systemctl restart NetworkManager' }],
            [{ type: 'comment', text: '# Wait a few seconds, then connect to WiFi' }],
          ]} />
        </TroubleItem>
      </Troubleshooting>
    </div>
  );
}
