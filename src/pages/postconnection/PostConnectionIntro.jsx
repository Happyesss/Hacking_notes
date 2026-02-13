import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

export default function PostConnectionIntro() {
  return (
    <div className="content-area">
      <div className="topic-header">
        <div className="topic-breadcrumb">Post Connection Attacks <span>/</span> Introduction</div>
        <h1>Post Connection Attacks - Overview</h1>
        <p className="topic-desc">Once you're connected to a network (with or without the key), these are the attacks you can perform. This section covers what's possible after gaining network access.</p>
      </div>

      <div className="topic-section">
        <h2>What Are Post-Connection Attacks?</h2>
        <p>Post-connection attacks happen <strong>after</strong> you're connected to the target network. You don't need to be the admin — just a client on the same network. This is the next phase after gaining access via WEP/WPA cracking or simply being on a public WiFi.</p>

        <Diagram title="Attack Phases">
{`  ┌─────────────────┐    ┌──────────────────┐    ┌─────────────────────┐
  │  PRE-CONNECTION  │───▶│  GAINING ACCESS   │───▶│  POST-CONNECTION    │
  │                  │    │                   │    │                     │
  │  • Sniffing      │    │  • WEP Cracking   │    │  • Info Gathering   │
  │  • Deauth        │    │  • WPA Cracking   │    │  • MITM Attacks     │
  │  • Recon         │    │  • WPS Exploits    │    │  • ARP Spoofing     │
  │                  │    │                   │    │  • DNS Spoofing      │
  │  No access       │    │  Getting the key   │    │  • Sniffing Data    │
  │  needed          │    │  or connecting     │    │  • Session Hijack   │
  └─────────────────┘    └──────────────────┘    │  • Injection         │
                                                   └─────────────────────┘
                                                     ▲
                                                     │ YOU ARE HERE`}
        </Diagram>
      </div>

      <div className="topic-section">
        <h2>Types of Post-Connection Attacks</h2>
        <table className="info-table">
          <thead>
            <tr><th>Attack</th><th>Description</th><th>Key Tool</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Network Discovery</strong></td><td>Map all devices, open ports, and services on the network</td><td>netdiscover, nmap</td></tr>
            <tr><td><strong>ARP Spoofing</strong></td><td>Redirect traffic through your machine by poisoning ARP tables</td><td>arpspoof, bettercap</td></tr>
            <tr><td><strong>MITM (Man in the Middle)</strong></td><td>Intercept and read/modify data between client and router</td><td>bettercap, mitmproxy</td></tr>
            <tr><td><strong>DNS Spoofing</strong></td><td>Redirect domain requests to your controlled servers</td><td>bettercap, ettercap</td></tr>
            <tr><td><strong>Packet Sniffing</strong></td><td>Capture unencrypted data (passwords, images, URLs)</td><td>Wireshark, tcpdump</td></tr>
            <tr><td><strong>Session Hijacking</strong></td><td>Steal session cookies to access authenticated accounts</td><td>bettercap, ferret</td></tr>
            <tr><td><strong>Code Injection</strong></td><td>Inject JavaScript/HTML into HTTP responses</td><td>bettercap</td></tr>
          </tbody>
        </table>
      </div>

      <div className="topic-section">
        <h2>The Foundation: ARP Spoofing</h2>
        <p>Almost all post-connection attacks rely on <strong>ARP Spoofing</strong> as the foundation. It allows you to become the "man in the middle" between the target and the router.</p>

        <Diagram title="ARP Spoofing Concept">
{`  NORMAL COMMUNICATION:
  ┌──────────┐                           ┌──────────┐
  │  TARGET   │ ◄───── data ─────────▶  │  ROUTER  │
  │ 192.168.1.5│                          │192.168.1.1│
  └──────────┘                           └──────────┘


  AFTER ARP SPOOFING:
  ┌──────────┐         ┌──────────┐         ┌──────────┐
  │  TARGET   │ ──────▶│ ATTACKER │ ──────▶ │  ROUTER  │
  │192.168.1.5│        │192.168.1.8│        │192.168.1.1│
  └──────────┘ ◀──────│  (YOU)   │ ◀──────└──────────┘
                       └──────────┘
                       
  Target thinks you're the router
  Router thinks you're the target
  ALL traffic flows through YOU`}
        </Diagram>
      </div>

      <div className="topic-section">
        <h2>What You Need</h2>
        <ul>
          <li><strong>Connection to the target network</strong> — Either cracked the key or it's an open network</li>
          <li><strong>Kali Linux</strong> — With tools: bettercap, arpspoof, nmap, Wireshark</li>
          <li><strong>IP forwarding enabled</strong> — So traffic passes through you without dropping</li>
          <li><strong>Target device on the same network</strong> — Any device you want to attack</li>
        </ul>
      </div>

      <div className="topic-section">
        <h2>Common Tools Overview</h2>
        <table className="info-table">
          <thead>
            <tr><th>Tool</th><th>Purpose</th><th>Pre-installed in Kali</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>bettercap</strong></td><td>Swiss army knife — ARP spoof, DNS spoof, sniff, inject</td><td>Yes</td></tr>
            <tr><td><strong>Wireshark</strong></td><td>GUI packet analyzer — inspect captured traffic</td><td>Yes</td></tr>
            <tr><td><strong>nmap</strong></td><td>Network scanner — discover hosts and services</td><td>Yes</td></tr>
            <tr><td><strong>netdiscover</strong></td><td>ARP-based network scanner — find connected devices</td><td>Yes</td></tr>
            <tr><td><strong>tcpdump</strong></td><td>CLI packet capture — lightweight sniffing</td><td>Yes</td></tr>
            <tr><td><strong>mitmproxy</strong></td><td>Interactive HTTPS proxy — inspect encrypted traffic</td><td>No (pip install)</td></tr>
          </tbody>
        </table>
      </div>

      <InfoBox type="danger" title="Legal Warning">
        <p>Post-connection attacks on networks you don't own are <strong>illegal</strong>. These techniques intercept private communications, which violates wiretapping laws in most countries. Only practice on your own lab network with devices you own.</p>
      </InfoBox>

      <InfoBox type="note" title="Course Progress">
        <p>This is an introductory overview of post-connection attacks. Detailed pages covering each attack technique (ARP spoofing, MITM, DNS spoofing, sniffing, injection) will be added as the course progresses.</p>
      </InfoBox>
    </div>
  );
}
