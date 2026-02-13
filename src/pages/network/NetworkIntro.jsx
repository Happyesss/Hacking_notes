import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

export default function NetworkIntro() {
  return (
    <div className="content-area">
      <div className="topic-header">
        <div className="topic-breadcrumb">Network Hacking <span>/</span> Introduction</div>
        <h1>Introduction to Network Hacking / Penetration Testing</h1>
        <p className="topic-desc">Network hacking (penetration testing) is the process of testing a network's security by simulating attacks to find vulnerabilities before malicious hackers do.</p>
      </div>

      <div className="topic-section">
        <h2>What is Network Penetration Testing?</h2>
        <p>Network penetration testing involves systematically probing a network to identify security weaknesses. The goal is to find and fix vulnerabilities before they are exploited.</p>

        <Diagram title="Penetration Testing Phases">
{`┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│              │    │              │    │              │    │              │    │              │
│  1. Recon    │───▶│  2. Scanning │───▶│  3. Gaining  │───▶│  4. Maintain │───▶│  5. Report   │
│              │    │              │    │    Access    │    │    Access    │    │              │
│              │    │              │    │              │    │              │    │              │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
  Gather info        Port scanning      Exploit vulns       Persistence        Document all
  OSINT              Vuln scanning      Crack passwords     Backdoors          findings`}
        </Diagram>
      </div>

      <div className="topic-section">
        <h2>Types of Network Attacks</h2>
        <table className="info-table">
          <thead>
            <tr><th>Category</th><th>Attack Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Pre-Connection</strong></td><td>Packet Sniffing, Deauth</td><td>Attacks performed without connecting to the target network</td></tr>
            <tr><td><strong>Gaining Access</strong></td><td>WEP/WPA Cracking</td><td>Breaking encryption to join the network</td></tr>
            <tr><td><strong>Post-Connection</strong></td><td>MITM, ARP Spoofing</td><td>Attacks after joining the target network</td></tr>
          </tbody>
        </table>
      </div>

      <div className="topic-section">
        <h2>Tools You'll Use</h2>
        <table className="info-table">
          <thead>
            <tr><th>Tool</th><th>Purpose</th></tr>
          </thead>
          <tbody>
            <tr><td><code>aircrack-ng</code></td><td>WiFi security auditing suite</td></tr>
            <tr><td><code>airodump-ng</code></td><td>Packet capture & network discovery</td></tr>
            <tr><td><code>aireplay-ng</code></td><td>Packet injection & deauth attacks</td></tr>
            <tr><td><code>macchanger</code></td><td>MAC address spoofing</td></tr>
            <tr><td><code>wireshark</code></td><td>Network protocol analyzer</td></tr>
            <tr><td><code>iwconfig</code></td><td>Wireless interface configuration</td></tr>
          </tbody>
        </table>
      </div>

      <div className="topic-section">
        <h2>Legal & Ethical Considerations</h2>
        <InfoBox type="danger" title="Important Legal Warning">
          <p><strong>Only test on networks you own or have explicit written permission to test.</strong> Unauthorized access to computer networks is a federal crime in most countries. Always get a signed agreement before testing.</p>
        </InfoBox>

        <ul>
          <li><strong>Always get written authorization</strong> before testing any network</li>
          <li><strong>Only test on your own lab</strong> when learning</li>
          <li><strong>Set up a dedicated lab</strong> with your own router and devices</li>
          <li><strong>Document everything</strong> you do during a test</li>
          <li><strong>Report all findings</strong> responsibly</li>
        </ul>
      </div>

      <div className="topic-section">
        <h2>Setting Up Your Lab</h2>
        <p>For safe practice, set up your own lab:</p>
        <ol className="step-list">
          <li>Get a <strong>spare WiFi router</strong> (any cheap one works)</li>
          <li>Connect it to your existing network or run it standalone</li>
          <li>Set up Kali Linux in a <strong>VM with USB passthrough</strong></li>
          <li>Get a <strong>compatible wireless adapter</strong> that supports monitor mode</li>
          <li>Connect some test devices (old phones, laptops) to the test router</li>
        </ol>
      </div>
    </div>
  );
}
