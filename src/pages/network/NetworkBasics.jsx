import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

export default function NetworkBasics() {
  return (
    <div className="content-area">
      <div className="topic-header">
        <div className="topic-breadcrumb">Network Hacking <span>/</span> Networks Basics</div>
        <h1>Networks Basics</h1>
        <p className="topic-desc">Understanding how networks work is fundamental to hacking them. This covers the core concepts of networking.</p>
      </div>

      <div className="topic-section">
        <h2>How Networks Work</h2>
        <p>A network is a group of devices connected together to share resources and communicate. Every device on a network has a unique identifier.</p>

        <Diagram title="Basic Network Architecture">
{`                          ┌──────────┐
                          │ INTERNET │
                          └────┬─────┘
                               │
                          ┌────┴─────┐
                          │  ROUTER  │
                          │192.168.1.1│
                          └────┬─────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
        ┌─────┴─────┐   ┌─────┴─────┐   ┌─────┴─────┐
        │   Phone   │   │  Laptop   │   │  Desktop  │
        │ .1.2      │   │ .1.3      │   │ .1.4      │
        │ MAC: AA:BB│   │ MAC: CC:DD│   │ MAC: EE:FF│
        └───────────┘   └───────────┘   └───────────┘`}
        </Diagram>
      </div>

      <div className="topic-section">
        <h2>Key Networking Concepts</h2>

        <h3>IP Address</h3>
        <p>A unique address assigned to each device on a network. There are two types:</p>
        <table className="info-table">
          <thead>
            <tr><th>Type</th><th>Example</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Private IP</strong></td><td><code>192.168.1.5</code></td><td>Used within local network, not routable on internet</td></tr>
            <tr><td><strong>Public IP</strong></td><td><code>203.45.67.89</code></td><td>Used on the internet, assigned by ISP</td></tr>
          </tbody>
        </table>

        <h3>Common Private IP Ranges</h3>
        <table className="info-table">
          <thead>
            <tr><th>Class</th><th>Range</th><th>Default Subnet</th></tr>
          </thead>
          <tbody>
            <tr><td>A</td><td><code>10.0.0.0 – 10.255.255.255</code></td><td><code>255.0.0.0</code></td></tr>
            <tr><td>B</td><td><code>172.16.0.0 – 172.31.255.255</code></td><td><code>255.240.0.0</code></td></tr>
            <tr><td>C</td><td><code>192.168.0.0 – 192.168.255.255</code></td><td><code>255.255.255.0</code></td></tr>
          </tbody>
        </table>

        <h3>MAC Address</h3>
        <p>A hardware address burned into the network interface card (NIC). It's a 48-bit address written as 6 pairs of hex:</p>
        <Terminal title="View MAC Address" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'ifconfig' }],
          [{ type: 'output', text: 'eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>' }],
          [{ type: 'output', text: '        ether ' }, { type: 'highlight', text: 'aa:bb:cc:dd:ee:ff' }, { type: 'output', text: '  txqueuelen 1000' }],
          [{ type: 'output', text: '        inet 192.168.1.5  netmask 255.255.255.0' }],
        ]} />

        <h3>DHCP (Dynamic Host Configuration Protocol)</h3>
        <p>Automatically assigns IP addresses to devices joining a network. The router typically acts as the DHCP server.</p>

        <Diagram title="DHCP Process">
{`   Client                          DHCP Server (Router)
     │                                    │
     │──── DHCP Discover ────────────────▶│   "I need an IP!"
     │                                    │
     │◀─── DHCP Offer ──────────────────  │   "How about 192.168.1.5?"
     │                                    │
     │──── DHCP Request ─────────────────▶│   "Yes, I'll take it!"
     │                                    │
     │◀─── DHCP Acknowledge ─────────────│   "It's yours for 24h"
     │                                    │`}
        </Diagram>
      </div>

      <div className="topic-section">
        <h2>Wireless Networks (WiFi)</h2>
        <p>WiFi networks use radio waves to connect devices. Each WiFi network has:</p>
        <ul>
          <li><strong>SSID</strong> — Network name (e.g., "Home_WiFi")</li>
          <li><strong>BSSID</strong> — MAC address of the access point</li>
          <li><strong>Channel</strong> — Radio frequency channel (1-14 for 2.4GHz)</li>
          <li><strong>Encryption</strong> — Security protocol (WEP, WPA, WPA2, WPA3)</li>
        </ul>

        <table className="info-table">
          <thead>
            <tr><th>Encryption</th><th>Security Level</th><th>Crackable?</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Open</strong></td><td>🔴 None</td><td>No encryption at all</td></tr>
            <tr><td><strong>WEP</strong></td><td>🔴 Very Weak</td><td>Yes, in minutes</td></tr>
            <tr><td><strong>WPA</strong></td><td>🟡 Weak</td><td>Yes, with wordlist</td></tr>
            <tr><td><strong>WPA2</strong></td><td>🟢 Good</td><td>Only with weak password</td></tr>
            <tr><td><strong>WPA3</strong></td><td>🟢 Strong</td><td>Very difficult</td></tr>
          </tbody>
        </table>
      </div>

      <div className="topic-section">
        <h2>Useful Network Commands</h2>
        <Terminal title="Network Discovery" lines={[
          [{ type: 'comment', text: '# View your IP and interfaces' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'ifconfig' }],
          [{ type: 'comment', text: '# Modern alternative' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'ip ' }, { type: 'flag', text: 'addr show' }],
          [{ type: 'comment', text: '# View routing table' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'route ' }, { type: 'flag', text: '-n' }],
          [{ type: 'comment', text: '# Check connectivity' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'ping ' }, { type: 'string', text: '192.168.1.1' }],
          [{ type: 'comment', text: '# View wireless interfaces' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'iwconfig' }],
          [{ type: 'comment', text: '# View ARP table (who is on the network)' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'arp ' }, { type: 'flag', text: '-a' }],
        ]} />
      </div>
    </div>
  );
}
