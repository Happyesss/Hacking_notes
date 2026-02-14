import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

export default function PostConnectionIntro() {
  return (
    <div className="content-area">
      <div className="topic-header">
        <div className="topic-breadcrumb">Post Connection Attacks <span>/</span> Introduction</div>
        <h1>Post Connection Attacks - Overview</h1>
        <p className="topic-desc">Once you're connected to a network (with or without the key), a whole new world of attack vectors becomes available. This comprehensive section covers what's possible after gaining network access, from reconnaissance to advanced man-in-the-middle attacks.</p>
      </div>

      <div className="topic-section">
        <h2>What Are Post-Connection Attacks?</h2>
        <p>Post-connection attacks occur <strong>after</strong> you've successfully connected to the target network. Unlike pre-connection attacks (which happen before network access), these techniques require you to be an active participant in the network as a client device. The critical insight here is that you don't need administrative privileges or root access to the router—you simply need to be connected as any regular device would be.</p>
        
        <p>Think of it like this: imagine you've been invited to a party (the network). Pre-connection attacks were about getting through the front door. Post-connection attacks are about what you can do once you're inside the party—listening to conversations, impersonating other guests, or even controlling who talks to whom. The network treats you as a legitimate guest, giving you access to all the "rooms" (network segments) and "conversations" (data packets) happening around you.</p>

        <p>These attacks are particularly powerful because modern networks often focus heavily on perimeter security (preventing unauthorized access) while assuming that once a device is inside the network, it can be trusted. This is a dangerous assumption that post-connection attacks exploit mercilessly.</p>

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
                                                   │  • Credential Theft  │
                                                   └─────────────────────┘
                                                     ▲
                                                     │ YOU ARE HERE
                                                     
  Phase 1: Outside the castle walls, observing traffic
  Phase 2: Breaking through the gates, getting the keys
  Phase 3: Inside the castle, impersonating guards and intercepting messages`}
        </Diagram>
      </div>

      <div className="topic-section">
        <h2>Types of Post-Connection Attacks</h2>
        <p>Post-connection attacks can be categorized into several distinct types, each with its own objectives and methodologies. Understanding these categories helps you choose the right technique for your specific penetration testing goals.</p>
        
        <table className="info-table">
          <thead>
            <tr><th>Attack</th><th>Description</th><th>Key Tool</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Network Discovery</strong></td>
              <td>Comprehensive mapping of all connected devices, identifying open ports, running services, operating systems, and potential vulnerabilities. This is your reconnaissance phase—like creating a detailed blueprint of the building you're in.</td>
              <td>netdiscover, nmap, masscan</td>
            </tr>
            <tr>
              <td><strong>ARP Spoofing</strong></td>
              <td>The foundation of most MITM attacks. By sending forged ARP messages, you convince other devices that your MAC address is associated with another IP (typically the router), causing traffic to flow through your machine. This is like intercepting mail by convincing the mailman you live at someone else's address.</td>
              <td>arpspoof, bettercap, ettercap</td>
            </tr>
            <tr>
              <td><strong>MITM (Man in the Middle)</strong></td>
              <td>Position yourself between two communicating parties (usually a client and the router) to intercept, read, and potentially modify all traffic passing between them. You become an invisible proxy that can see everything, from passwords to banking information, often without either party realizing it.</td>
              <td>bettercap, mitmproxy, Burp Suite</td>
            </tr>
            <tr>
              <td><strong>DNS Spoofing</strong></td>
              <td>Intercept and forge DNS responses, redirecting domain name requests to IP addresses you control. When a victim tries to visit "facebook.com", they unknowingly connect to your fake server instead. Perfect for phishing attacks or forcing users to malicious pages that look identical to legitimate sites.</td>
              <td>bettercap, dnsspoof, ettercap</td>
            </tr>
            <tr>
              <td><strong>Packet Sniffing</strong></td>
              <td>Capture and analyze all unencrypted network traffic flowing through the network. This includes HTTP requests, FTP credentials, email content, images, and any data transmitted without encryption. Think of it as wiretapping the entire building's communication system.</td>
              <td>Wireshark, tcpdump, tshark</td>
            </tr>
            <tr>
              <td><strong>Session Hijacking</strong></td>
              <td>Steal active session cookies or tokens from authenticated users, allowing you to impersonate them without knowing their passwords. If someone is logged into Gmail, you can steal their session and access their inbox as if you were them—no password required.</td>
              <td>bettercap, Ferret-Hamster, Wireshark</td>
            </tr>
            <tr>
              <td><strong>Code Injection</strong></td>
              <td>Inject malicious JavaScript, HTML, or other code into HTTP responses before they reach the victim. This allows you to modify web pages on-the-fly, steal credentials, inject keyloggers, or redirect users to malicious sites—all without touching the actual web server.</td>
              <td>bettercap, BeEF, mitmproxy</td>
            </tr>
            <tr>
              <td><strong>SSL Stripping</strong></td>
              <td>Downgrade HTTPS connections to HTTP by intercepting the initial connection request and serving HTTP versions of websites instead. This removes the encryption layer, making all transmitted data visible to you. Modern browsers have protections (HSTS), but many sites remain vulnerable.</td>
              <td>sslstrip, bettercap, mitmproxy</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="topic-section">
        <h2>The Foundation: ARP Spoofing Deep Dive</h2>
        <p>Almost all post-connection attacks rely on <strong>ARP Spoofing</strong> (also called ARP Poisoning) as their foundation. Understanding ARP spoofing is crucial because it's the mechanism that allows you to become the "man in the middle" between targets and the router.</p>

        <h3>Understanding the ARP Protocol</h3>
        <p>ARP (Address Resolution Protocol) is a fundamental network protocol that maps IP addresses to MAC addresses. When Device A wants to communicate with Device B on the same local network, it needs to know B's MAC address. Here's how ARP normally works:</p>
        
        <ul>
          <li><strong>ARP Request:</strong> Device A broadcasts "Who has IP 192.168.1.5? Tell me (Device A) at MAC aa:bb:cc:dd:ee:ff"</li>
          <li><strong>ARP Reply:</strong> Device B responds "I have IP 192.168.1.5, my MAC is 11:22:33:44:55:66"</li>
          <li><strong>ARP Cache:</strong> Device A stores this mapping in its ARP table for future use</li>
        </ul>

        <h3>The Fatal Flaw: No Authentication</h3>
        <p>The critical vulnerability is that <strong>ARP has no authentication mechanism</strong>. Devices blindly trust any ARP messages they receive. If you send a forged ARP reply claiming "I have IP 192.168.1.1 (the router), my MAC is YOUR_MAC", the victim will believe you and update their ARP table accordingly. All traffic intended for the router now comes to you instead.</p>

        <Diagram title="ARP Spoofing Concept">
{`  NORMAL COMMUNICATION:
  ┌──────────────┐                           ┌──────────────┐
  │    TARGET     │ ◄───── data ─────────▶  │    ROUTER    │
  │ 192.168.1.5   │                          │ 192.168.1.1  │
  │ MAC: aa:bb... │                          │ MAC: 00:11...│
  └──────────────┘                           └──────────────┘
  
  Target's ARP Table:              Router's ARP Table:
  192.168.1.1 → MAC: 00:11...     192.168.1.5 → MAC: aa:bb...


  AFTER ARP SPOOFING:
  ┌──────────────┐         ┌──────────────┐         ┌──────────────┐
  │    TARGET     │ ──────▶│   ATTACKER   │ ──────▶ │    ROUTER    │
  │ 192.168.1.5   │        │ 192.168.1.8  │        │ 192.168.1.1  │
  │ MAC: aa:bb... │◀──────│ MAC: ff:ff... │◀──────│ MAC: 00:11...│
  └──────────────┘        │   (YOU)      │        └──────────────┘
                           └──────────────┘
                           
  Target's ARP Table:              Router's ARP Table:
  192.168.1.1 → MAC: ff:ff... ✗   192.168.1.5 → MAC: ff:ff... ✗
  (thinks attacker is router)      (thinks attacker is target)
  
  Result: ALL traffic flows through YOU
  • Target sends data meant for router → Goes to you instead
  • Router sends data meant for target → Goes to you instead
  • You forward the traffic (with IP forwarding enabled)
  • Neither party realizes you're in the middle`}
        </Diagram>

        <h3>The Attack Process</h3>
        <ol>
          <li><strong>Reconnaissance:</strong> Identify the target device IP and the router (gateway) IP using network scanning</li>
          <li><strong>Enable IP Forwarding:</strong> Configure your system to forward packets, so traffic continues flowing (otherwise the connection breaks and victims notice)</li>
          <li><strong>Send Spoofed ARP Replies:</strong> Continuously send forged ARP messages to both the target and router</li>
          <li><strong>Intercept Traffic:</strong> All traffic now flows through your machine where you can read, modify, or log it</li>
          <li><strong>Forward Traffic:</strong> Pass the traffic along to its intended destination to maintain the connection</li>
        </ol>

        <h3>Edge Cases and Challenges</h3>
        <ul>
          <li><strong>Static ARP Entries:</strong> Some security-conscious networks use static ARP entries that can't be poisoned. These are manually configured and won't accept dynamic ARP updates.</li>
          <li><strong>ARP Spoofing Detection:</strong> Tools like arpwatch, XArp, or enterprise switches with dynamic ARP inspection can detect ARP poisoning by monitoring for suspicious ARP traffic patterns.</li>
          <li><strong>Network Segmentation:</strong> VLANs and network segmentation limit ARP spoofing to within the same broadcast domain. You can't ARP spoof across different network segments.</li>
          <li><strong>Timing Issues:</strong> ARP tables refresh periodically. You must continuously send spoofed ARP packets (typically every few seconds) to maintain the attack.</li>
          <li><strong>Performance Degradation:</strong> If your attacker machine can't forward packets fast enough, the network will slow down noticeably, alerting users.</li>
        </ul>
      </div>

      <div className="topic-section">
        <h2>What You Need</h2>
        <h3>Network Prerequisites</h3>
        <ul>
          <li><strong>Connection to the target network</strong> — Either you've cracked the WEP/WPA key, it's an open network, or you have legitimate access (testing your own network)</li>
          <li><strong>Same broadcast domain as targets</strong> — You must be on the same subnet; wireless clients are typically on the same broadcast domain</li>
          <li><strong>No network isolation</strong> — Some networks (especially public WiFi) enable client isolation, preventing clients from communicating with each other</li>
        </ul>

        <h3>System Requirements</h3>
        <ul>
          <li><strong>Kali Linux or similar</strong> — Comes pre-installed with essential tools: bettercap, arpspoof, nmap, Wireshark, tcpdump</li>
          <li><strong>IP forwarding enabled</strong> — Critical for MITM attacks. Without this, packets stop at your machine and connections break
            <ul>
              <li>Enable with: <code>echo 1 &gt; /proc/sys/net/ipv4/ip_forward</code></li>
              <li>Or: <code>sysctl -w net.ipv4.ip_forward=1</code></li>
            </ul>
          </li>
          <li><strong>Sufficient system resources</strong> — Packet capture and processing can be CPU and memory intensive, especially on busy networks</li>
          <li><strong>Network adapter in managed mode</strong> — Unlike pre-connection attacks, post-connection work requires managed (normal) mode, not monitor mode</li>
        </ul>

        <h3>Target Requirements</h3>
        <ul>
          <li><strong>Identified target devices</strong> — Know the IP addresses of devices you want to attack (use network discovery first)</li>
          <li><strong>Gateway/router IP</strong> — Usually 192.168.1.1, 192.168.0.1, or 10.0.0.1 (find with <code>ip route</code> or <code>route -n</code>)</li>
          <li><strong>Understanding of network topology</strong> — Know if there's a firewall, IDS, or other security measures in place</li>
        </ul>
      </div>

      <div className="topic-section">
        <h2>Common Tools Overview</h2>
        <p>Post-connection attacks require a diverse toolkit. Each tool specializes in different aspects of network exploitation:</p>
        
        <table className="info-table">
          <thead>
            <tr><th>Tool</th><th>Purpose</th><th>Key Features</th><th>Pre-installed in Kali</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>bettercap</strong></td>
              <td>Swiss army knife for network attacks</td>
              <td>ARP/DNS spoofing, MITM, packet sniffing, code injection, SSL stripping, credential harvesting—all in one powerful, modular framework</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td><strong>Wireshark</strong></td>
              <td>GUI packet analyzer</td>
              <td>Deep packet inspection, protocol analysis, filtering capabilities, follow TCP streams, export objects (images, files), great for learning</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td><strong>nmap</strong></td>
              <td>Network scanner</td>
              <td>Discover hosts, identify open ports, detect services/versions, OS fingerprinting, vulnerability scanning, scriptable with NSE</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td><strong>netdiscover</strong></td>
              <td>ARP-based network scanner</td>
              <td>Fast device discovery on local network, passive or active mode, identifies MAC vendor, lightweight and simple</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td><strong>tcpdump</strong></td>
              <td>CLI packet capture</td>
              <td>Lightweight command-line sniffing, powerful filtering with BPF syntax, can save to .pcap files for later analysis, scriptable</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td><strong>arpspoof</strong></td>
              <td>ARP poisoning tool</td>
              <td>Simple, focused ARP spoofing utility from dsniff suite, easy to script, reliable but basic (bettercap is more modern)</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td><strong>ettercap</strong></td>
              <td>Comprehensive MITM framework</td>
              <td>GUI or CLI, ARP/DNS spoofing, password collection, connection killing, packet filtering, plugin system</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td><strong>mitmproxy</strong></td>
              <td>Interactive HTTPS proxy</td>
              <td>Intercept and modify HTTPS traffic, Python scripting, web interface, SSL/TLS interception, great for API testing</td>
              <td>No (install: <code>pip install mitmproxy</code>)</td>
            </tr>
            <tr>
              <td><strong>Burp Suite</strong></td>
              <td>Web app security testing</td>
              <td>Intercept and modify HTTP/HTTPS, scanner, intruder, repeater, extensions—industry standard for web pentesting</td>
              <td>Yes (Community Edition)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="topic-section">
        <h2>Real-World Attack Scenarios</h2>
        
        <h3>Scenario 1: Coffee Shop Credential Harvesting</h3>
        <p><strong>Situation:</strong> You're on a public coffee shop WiFi. Multiple users are browsing the web, checking email, and working on their laptops.</p>
        <p><strong>Attack:</strong> Use ARP spoofing to position yourself as MITM between all clients and the router. Run packet capture to sniff HTTP traffic. Many users visit HTTP sites or sites with mixed content—their cookies, passwords, and personal data flow through your machine unencrypted.</p>
        <p><strong>Result:</strong> In 30 minutes, you might capture dozens of credentials, session cookies, email contents, and personal information—all without anyone noticing any performance degradation.</p>

        <h3>Scenario 2: Corporate Network Reconnaissance</h3>
        <p><strong>Situation:</strong> During a penetration test, you've gained access to a corporate WiFi network as a "guest" device.</p>
        <p><strong>Attack:</strong> First, use netdiscover and nmap to map the entire network—identify all devices, their operating systems, open ports, and running services. Then perform targeted ARP spoofing on key devices (file servers, admin workstations) to intercept their traffic and look for sensitive data or credentials.</p>
        <p><strong>Result:</strong> You create a complete network topology, identify vulnerable services, intercept internal communications, and potentially capture admin credentials that allow privilege escalation.</p>

        <h3>Scenario 3: DNS Spoofing Phishing Attack</h3>
        <p><strong>Situation:</strong> You're connected to a network and want to deliver a targeted phishing attack without sending emails.</p>
        <p><strong>Attack:</strong> Perform ARP spoofing and DNS spoofing simultaneously. When targets try to visit "facebook.com", your DNS spoof redirects them to your fake Facebook login page that looks identical. They enter their credentials, which you capture, then redirect them to the real Facebook (so they don't suspect anything).</p>
        <p><strong>Result:</strong> Highly effective phishing attack that bypasses email filters and appears as legitimate traffic. The victim never realizes they've been compromised.</p>
      </div>

      <div className="topic-section">
        <h2>Defense and Detection</h2>
        <p>Understanding attacks is only half the equation. As an ethical hacker or security professional, you must also know how to defend against these techniques:</p>
        
        <h3>Network-Level Defenses</h3>
        <ul>
          <li><strong>Dynamic ARP Inspection (DAI):</strong> Enterprise switch feature that validates ARP packets and drops suspicious ones</li>
          <li><strong>DHCP Snooping:</strong> Builds a trusted database of IP-to-MAC mappings, preventing ARP spoofing</li>
          <li><strong>Private VLANs:</strong> Isolate devices from each other even on the same subnet (common in hotels, airports)</li>
          <li><strong>802.1X Network Access Control:</strong> Requires authentication before granting network access</li>
          <li><strong>Network Segmentation:</strong> Separate critical systems onto different subnets with firewall rules between them</li>
        </ul>

        <h3>Host-Based Defenses</h3>
        <ul>
          <li><strong>Static ARP Entries:</strong> Manually configure ARP tables (impractical for large networks but effective for critical systems)</li>
          <li><strong>ARP Monitoring Tools:</strong> Software like XArp, ArpON, or arpwatch that alert on ARP changes</li>
          <li><strong>VPN Usage:</strong> Encrypts all traffic even on untrusted networks, making MITM attacks useless</li>
          <li><strong>HTTPS Everywhere:</strong> Browser extensions and HSTS ensure encrypted connections</li>
          <li><strong>Certificate Pinning:</strong> Apps that pin SSL certificates prevent MITM even with rogue certificates</li>
        </ul>

        <h3>Detection Indicators</h3>
        <ul>
          <li><strong>Duplicate IP/MAC Addresses:</strong> Network monitoring shows the same MAC claiming multiple IPs</li>
          <li><strong>Unusual ARP Traffic:</strong> High volume of ARP replies, especially unsolicited ones</li>
          <li><strong>SSL Certificate Warnings:</strong> Users see certificate errors (if attacker attempts SSL interception)</li>
          <li><strong>Performance Degradation:</strong> Network becomes slower as attacker's machine struggles to forward traffic</li>
          <li><strong>Gateway MAC Changes:</strong> ARP table shows the gateway MAC address changing frequently</li>
        </ul>
      </div>

      <InfoBox type="danger" title="Legal Warning">
        <p>Post-connection attacks on networks you don't own or haven't been explicitly authorized to test are <strong>illegal and unethical</strong>. These techniques intercept private communications and violate computer fraud and wiretapping laws in virtually every jurisdiction worldwide. Penalties can include:</p>
        <ul>
          <li><strong>Criminal charges:</strong> Computer Fraud and Abuse Act (CFAA) violations in the US, Computer Misuse Act in the UK</li>
          <li><strong>Civil liability:</strong> Lawsuits from victims for damages and privacy violations</li>
          <li><strong>Professional consequences:</strong> Loss of security certifications, inability to work in the industry</li>
        </ul>
        <p><strong>Only practice these techniques on:</strong></p>
        <ul>
          <li>Your own home lab network with devices you own</li>
          <li>Networks where you have explicit written authorization for penetration testing</li>
          <li>Dedicated cybersecurity training platforms and capture-the-flag (CTF) environments</li>
        </ul>
      </InfoBox>

      <InfoBox type="success" title="Setting Up Your Lab">
        <p>The best way to learn post-connection attacks is in a controlled lab environment:</p>
        <ul>
          <li><strong>Router:</strong> Use an old router or buy a cheap one dedicated to testing</li>
          <li><strong>Target Devices:</strong> Old laptops, Raspberry Pis, or virtual machines</li>
          <li><strong>Attacker Machine:</strong> Kali Linux VM or dedicated machine</li>
          <li><strong>Isolated Network:</strong> Disconnect from the internet to ensure your attacks don't leak onto production networks</li>
        </ul>
        <p>This setup lets you practice freely without legal or ethical concerns, and you can experiment with different network configurations and defense mechanisms.</p>
      </InfoBox>

      <InfoBox type="note" title="Course Progress">
        <p>This comprehensive overview introduces post-connection attacks and their underlying principles. Future sections will provide detailed, hands-on tutorials for each attack technique:</p>
        <ul>
          <li>Network Discovery and Reconnaissance</li>
          <li>ARP Spoofing Implementation and Automation</li>
          <li>Man-in-the-Middle Attack Execution</li>
          <li>DNS Spoofing and Phishing</li>
          <li>Advanced Packet Sniffing and Analysis</li>
          <li>Session Hijacking Techniques</li>
          <li>Code Injection and SSL Stripping</li>
          <li>Defensive Countermeasures</li>
        </ul>
        <p>Each topic will include practical examples, command references, troubleshooting guides, and real-world scenarios.</p>
      </InfoBox>
    </div>
  );
}
