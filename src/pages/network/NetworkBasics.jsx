import React from 'react';
import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

const NetworkBasics = () => {
  return (
    <div className="page-content">
      <h1>Network Basics — How Devices Actually Communicate</h1>

      <p>
        Before you can hack a network, you need to deeply understand how it works. This page covers the 
        foundational building blocks: IP addresses, MAC addresses, DHCP, DNS, ports, and how WiFi 
        networks tie everything together. Think of this as learning the language of the network before 
        you try to manipulate the conversation.
      </p>

      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Internet_map_1024.jpg" 
        alt="Visualization of internet routing paths" 
        style={{ maxWidth: '100%', borderRadius: 8, margin: '16px 0' }} 
      />
      <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
        A partial map of the Internet based on routing paths — every device on a network is part of this interconnected web.
      </p>

      {/* ============================================================ */}
      {/* SECTION: The OSI & TCP/IP Models                             */}
      {/* ============================================================ */}
      <h2>🧱 The OSI Model & TCP/IP — Understanding Layers</h2>

      <p>
        Imagine you want to send a letter to a friend in another city. You write the letter (application), 
        put it in an envelope (presentation), address it (session), hand it to the post office (transport), 
        they figure out the route (network), the truck drives it (data link), and the road carries the 
        truck (physical). That's essentially how the OSI model works — each layer has a specific job.
      </p>

      <Diagram title="OSI Model vs TCP/IP Model">
{`
  OSI Model (7 Layers)          TCP/IP Model (4 Layers)
  ─────────────────────         ──────────────────────
  7. Application    ─┐
  6. Presentation    ├─────►  4. Application
  5. Session        ─┘
  4. Transport      ──────►  3. Transport (TCP/UDP)
  3. Network        ──────►  2. Internet (IP)
  2. Data Link      ─┐
  1. Physical        ├─────►  1. Network Access
                    ─┘
  
  Data Flow (Sending):
  ┌──────────────┐
  │  Your Data   │  ← Application creates data
  ├──────────────┤
  │ + TCP Header │  ← Transport adds port info
  ├──────────────┤
  │ + IP Header  │  ← Network adds IP addresses
  ├──────────────┤
  │ + MAC Header │  ← Data Link adds MAC addresses
  ├──────────────┤
  │ + Preamble   │  ← Physical adds sync bits
  └──────────────┘
  This is called ENCAPSULATION
`}
      </Diagram>

      <InfoBox type="note">
        <strong>Why does this matter for hacking?</strong> Different attacks target different layers. 
        ARP spoofing targets Layer 2 (Data Link), IP spoofing targets Layer 3 (Network), 
        and application exploits target Layer 7. Knowing the layers helps you understand 
        <em>where</em> an attack takes place and <em>why</em> it works.
      </InfoBox>

      <h3>Quick Layer Reference</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ padding: '8px', textAlign: 'left' }}>Layer</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Key Protocols</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Hacking Relevance</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['7', 'Application', 'HTTP, DNS, FTP, SMTP', 'Web exploits, DNS poisoning'],
            ['4', 'Transport', 'TCP, UDP', 'Port scanning, SYN floods'],
            ['3', 'Network', 'IP, ICMP, ARP', 'IP spoofing, MITM, routing attacks'],
            ['2', 'Data Link', 'Ethernet, WiFi (802.11)', 'MAC spoofing, deauth, sniffing'],
            ['1', 'Physical', 'Radio waves, cables', 'Signal jamming, evil twin'],
          ].map(([layer, name, protocols, relevance], i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '8px' }}>{layer}</td>
              <td style={{ padding: '8px' }}><strong>{name}</strong></td>
              <td style={{ padding: '8px' }}>{protocols}</td>
              <td style={{ padding: '8px' }}>{relevance}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ============================================================ */}
      {/* SECTION: IP Addresses                                        */}
      {/* ============================================================ */}
      <h2>🌐 IP Addresses — Your Device's Network Identity</h2>

      <p>
        Every device on a network needs an address so other devices can find it — just like every 
        house needs a street address for mail delivery. An <strong>IP address</strong> (Internet Protocol address) 
        is that address. There are two versions in use today:
      </p>

      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/7/74/Ipv4_address.svg" 
        alt="IPv4 address structure diagram" 
        style={{ maxWidth: '100%', borderRadius: 8, margin: '16px 0', background: '#fff', padding: 8 }} 
      />
      <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
        Structure of an IPv4 address — four octets (groups of 8 bits) separated by dots.
      </p>

      <h3>IPv4 — The Classic</h3>
      <p>
        IPv4 addresses look like <code>192.168.1.105</code>. Each number (called an <strong>octet</strong>) 
        ranges from 0 to 255, giving us about 4.3 billion possible addresses. That sounds like a lot, 
        but with billions of devices connected today, we've actually run out of IPv4 addresses globally — 
        which is why IPv6 was invented.
      </p>

      <h3>Private vs Public IP — The Story</h3>
      <p>
        Here's a story to understand this: Imagine an apartment building. The building has one street 
        address (like <code>203.0.113.50</code> — the <strong>public IP</strong>). But inside, each 
        apartment has its own number (Apt 1, Apt 2, etc. — like <code>192.168.1.1</code>, 
        <code>192.168.1.2</code> — the <strong>private IPs</strong>). When someone mails a letter to 
        "Apt 3, 123 Main St," the mail carrier delivers to the building (public IP), and the building 
        manager routes it to the right apartment (private IP). Your router does exactly this using 
        <strong>NAT (Network Address Translation)</strong>.
      </p>

      <Diagram title="Public vs Private IP Address Flow">
{`
  The Internet                     Your Home Network
  ┌─────────────────┐              ┌─────────────────────────────────┐
  │   Google.com    │              │                                 │
  │  142.250.80.46  │◄────────────►│  Router (Gateway)               │
  │                 │  Public IP:  │  Public:  203.0.113.50          │
  └─────────────────┘  203.0.113.50│  Private: 192.168.1.1           │
                                   │         │                       │
  ┌─────────────────┐              │    ┌────┴────┐                  │
  │  facebook.com   │              │    │   NAT   │ ← Translates    │
  │  157.240.1.35   │              │    └────┬────┘   addresses      │
  └─────────────────┘              │         │                       │
                                   │  ┌──────┼──────┐               │
                                   │  │      │      │               │
                                   │ 📱     💻     🖥️              │
                                   │.100   .101   .102              │
                                   │ Phone  Laptop  PC              │
                                   └─────────────────────────────────┘
`}
      </Diagram>

      <h3>Private IP Address Ranges</h3>
      <p>Three ranges are reserved for private use and are <strong>never</strong> routed on the internet:</p>

      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ padding: '8px', textAlign: 'left' }}>Class</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Range</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Subnet Mask</th>
            <th style={{ padding: '8px', textAlign: 'left' }}># of Addresses</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Common Use</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['A', '10.0.0.0 – 10.255.255.255', '255.0.0.0 (/8)', '16.7 million', 'Large enterprises'],
            ['B', '172.16.0.0 – 172.31.255.255', '255.240.0.0 (/12)', '1 million', 'Medium organizations'],
            ['C', '192.168.0.0 – 192.168.255.255', '255.255.0.0 (/16)', '65,536', 'Home networks'],
          ].map(([cls, range, mask, count, use], i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '8px' }}><strong>{cls}</strong></td>
              <td style={{ padding: '8px' }}><code>{range}</code></td>
              <td style={{ padding: '8px' }}><code>{mask}</code></td>
              <td style={{ padding: '8px' }}>{count}</td>
              <td style={{ padding: '8px' }}>{use}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Viewing Your IP Address</h3>

      <Terminal lines={[
        { segments: [{ text: '# View all network interfaces and their IPs', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'ip addr show', type: 'command' }] },
        { segments: [{ text: '1: lo: <LOOPBACK,UP> mtu 65536', type: 'output' }] },
        { segments: [{ text: '    inet 127.0.0.1/8 scope host lo', type: 'output' }] },
        { segments: [{ text: '2: eth0: <BROADCAST,MULTICAST,UP> mtu 1500', type: 'output' }] },
        { segments: [{ text: '    inet ', type: 'output' }, { text: '192.168.1.105', type: 'highlight' }, { text: '/24 brd 192.168.1.255 scope global eth0', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Shorter alternative', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'hostname -I', type: 'command' }] },
        { segments: [{ text: '192.168.1.105', type: 'highlight' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Check your public IP', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'curl ifconfig.me', type: 'command' }] },
        { segments: [{ text: '203.0.113.50', type: 'highlight' }] },
      ]} />

      <InfoBox type="tip">
        <strong>Edge Case — Multiple IPs:</strong> A device can have multiple IP addresses! If you have 
        both an Ethernet cable and WiFi connected, you'll have two different private IPs. Also, virtual 
        machines create virtual network interfaces with their own IPs. Use <code>ip addr</code> to see 
        them all.
      </InfoBox>

      <h3>Special IP Addresses You Should Know</h3>
      <ul>
        <li><code>127.0.0.1</code> — <strong>Localhost/Loopback.</strong> Always refers to your own machine. Used for testing.</li>
        <li><code>0.0.0.0</code> — <strong>All interfaces.</strong> When a server listens on 0.0.0.0, it accepts connections on all network interfaces.</li>
        <li><code>255.255.255.255</code> — <strong>Broadcast.</strong> Sends to every device on the local network.</li>
        <li><code>169.254.x.x</code> — <strong>APIPA (Link-local).</strong> Assigned automatically when DHCP fails. If you see this, your device couldn't get an IP from the router.</li>
        <li><code>192.168.1.1</code> or <code>192.168.0.1</code> — <strong>Default gateway.</strong> Usually your router's address.</li>
      </ul>

      <h3>IPv6 — The Future</h3>
      <p>
        IPv6 addresses look like <code>2001:0db8:85a3:0000:0000:8a2e:0370:7334</code>. They're 128-bit 
        (vs IPv4's 32-bit), giving us 340 undecillion addresses — enough for every atom on Earth to 
        have its own IP. IPv6 is slowly replacing IPv4, but most home networks still primarily use IPv4.
      </p>

      <InfoBox type="warning">
        <strong>Hacking consideration:</strong> Many security tools and techniques assume IPv4. If a target 
        network uses IPv6, some tools may not work as expected. Always check for both IPv4 and IPv6 
        addresses. Some devices may have IPv6 enabled even when the admin thinks only IPv4 is in use — 
        this can be an attack vector!
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: Subnet Masks                                        */}
      {/* ============================================================ */}
      <h2>🎭 Subnet Masks — Defining Network Boundaries</h2>

      <p>
        A subnet mask tells your device which part of an IP address identifies the <strong>network</strong> 
        and which part identifies the <strong>device</strong> (host). Think of it like a phone number: 
        the area code identifies the city (network), and the remaining digits identify the specific phone 
        (host).
      </p>

      <Diagram title="How Subnet Masks Work">
{`
  IP Address:     192.168.1.105
  Subnet Mask:    255.255.255.0
  
  In Binary:
  IP:     11000000.10101000.00000001.01101001
  Mask:   11111111.11111111.11111111.00000000
          ├── Network Part ──────────┤├ Host ┤
  
  Result:
  Network:  192.168.1.0     (identifies your network)
  Host:     .105            (identifies your device)
  Broadcast: 192.168.1.255  (reaches all devices)
  
  Usable IPs: 192.168.1.1 — 192.168.1.254 (254 devices)
  
  Common CIDR Notations:
  /24 = 255.255.255.0    = 254 hosts   (most home networks)
  /16 = 255.255.0.0      = 65,534 hosts
  /8  = 255.0.0.0        = 16,777,214 hosts
  /32 = 255.255.255.255  = 1 host (single device)
`}
      </Diagram>

      <InfoBox type="tip">
        <strong>Why this matters for hacking:</strong> When you scan a network, you need to know the 
        subnet to determine the range of possible targets. A <code>/24</code> network has 254 possible 
        hosts. Scanning the wrong subnet means missing targets entirely. Use <code>ip route</code> to 
        find your network's subnet.
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: MAC Addresses                                       */}
      {/* ============================================================ */}
      <h2>🏷️ MAC Addresses — The Hardware Fingerprint</h2>

      <p>
        While IP addresses can change (they're assigned by software), every network interface has a 
        <strong>MAC address</strong> (Media Access Control) burned into its hardware by the manufacturer. 
        It's a 48-bit address written as six pairs of hexadecimal digits like <code>AA:BB:CC:DD:EE:FF</code>.
      </p>

      <Diagram title="MAC Address Structure">
{`
  MAC Address: AA:BB:CC:DD:EE:FF
               ├───────┤├───────┤
               OUI       Device ID
               (Vendor)  (Unique)
  
  Example:  00:1A:2B:3C:4D:5E
            ├──────┤
            00:1A:2B = Vendor (e.g., Ayecom Technology)
            3C:4D:5E = Unique device identifier
  
  Real Vendor Examples:
  ┌────────────┬──────────────────┐
  │ OUI Prefix │ Manufacturer     │
  ├────────────┼──────────────────┤
  │ 00:0C:29   │ VMware           │
  │ 08:00:27   │ VirtualBox       │
  │ DC:A6:32   │ Raspberry Pi     │
  │ 00:50:56   │ VMware (alt)     │
  │ AC:DE:48   │ Apple (iPhone)   │
  │ B4:2E:99   │ Intel            │
  └────────────┴──────────────────┘
`}
      </Diagram>

      <p>
        <strong>The story of MAC vs IP:</strong> Think of your MAC address as your passport number 
        (it's tied to you physically) and your IP address as a hotel room number (it changes based 
        on where you are). When data travels across the internet, it uses IP addresses for routing. 
        But on the local network (the "last mile"), devices use MAC addresses to deliver frames to 
        the right machine. This is critical — ARP bridges the gap between IP and MAC.
      </p>

      <Terminal lines={[
        { segments: [{ text: '# View MAC addresses of all interfaces', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'ip link show', type: 'command' }] },
        { segments: [{ text: '1: lo: <LOOPBACK,UP> mtu 65536', type: 'output' }] },
        { segments: [{ text: '    link/loopback 00:00:00:00:00:00', type: 'output' }] },
        { segments: [{ text: '2: eth0: <BROADCAST,MULTICAST,UP> mtu 1500', type: 'output' }] },
        { segments: [{ text: '    link/ether ', type: 'output' }, { text: '08:00:27:1a:2b:3c', type: 'highlight' }, { text: ' brd ff:ff:ff:ff:ff:ff', type: 'output' }] },
        { segments: [{ text: '3: wlan0: <BROADCAST,MULTICAST,UP> mtu 1500', type: 'output' }] },
        { segments: [{ text: '    link/ether ', type: 'output' }, { text: 'aa:bb:cc:dd:ee:ff', type: 'highlight' }, { text: ' brd ff:ff:ff:ff:ff:ff', type: 'output' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: ARP                                                 */}
      {/* ============================================================ */}
      <h2>🔗 ARP — The Bridge Between IP and MAC</h2>

      <p>
        <strong>ARP (Address Resolution Protocol)</strong> translates IP addresses to MAC addresses on a 
        local network. When your computer wants to send data to <code>192.168.1.1</code> (the router), 
        it needs to know the router's MAC address to create the Ethernet frame. Here's the story:
      </p>

      <ol>
        <li>Your computer shouts to everyone on the network: <em>"Hey! Who has IP 192.168.1.1? Tell me your MAC address!"</em> (ARP Request — broadcast)</li>
        <li>The router responds: <em>"That's me! My MAC address is AA:BB:CC:11:22:33"</em> (ARP Reply — unicast)</li>
        <li>Your computer stores this mapping in its <strong>ARP cache</strong> for future use</li>
      </ol>

      <Diagram title="ARP Request/Reply Flow">
{`
  Step 1: ARP Request (Broadcast to everyone)
  ┌──────────┐    "Who has 192.168.1.1?"     ┌──────────┐
  │  Your PC │ ──────────────────────────────►│  Router  │
  │ .1.105   │ ──────────────────────────────►│  .1.1    │
  │          │ ──────────────────────────────►│          │
  └──────────┘    (sent to ff:ff:ff:ff:ff:ff) └──────────┘
       │                                           │
       │          Also received by:                │
       ▼                                           ▼
  ┌──────────┐                              ┌──────────┐
  │ Phone    │  (ignores — not .1.1)        │ Laptop   │
  │ .1.100   │                              │ .1.101   │
  └──────────┘                              └──────────┘
  
  Step 2: ARP Reply (Unicast — only to requester)
  ┌──────────┐    "I'm 192.168.1.1,          ┌──────────┐
  │  Your PC │◄──── my MAC is AA:BB:CC:..."  │  Router  │
  │ .1.105   │                               │  .1.1    │
  └──────────┘                               └──────────┘
`}
      </Diagram>

      <InfoBox type="danger">
        <strong>ARP's Fatal Flaw — No Authentication!</strong> ARP has zero security. Any device can 
        send an ARP reply claiming to be any IP address. This is the basis of <strong>ARP spoofing</strong> 
        (also called ARP poisoning), which is the foundation of Man-in-the-Middle (MITM) attacks. We'll 
        explore this deeply in the Post-Connection section.
      </InfoBox>

      <Terminal lines={[
        { segments: [{ text: '# View your ARP cache', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'arp -a', type: 'command' }] },
        { segments: [{ text: '? (192.168.1.1) at aa:bb:cc:11:22:33 [ether] on eth0', type: 'output' }] },
        { segments: [{ text: '? (192.168.1.100) at dd:ee:ff:44:55:66 [ether] on eth0', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Or use the modern ip command', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'ip neigh show', type: 'command' }] },
        { segments: [{ text: '192.168.1.1 dev eth0 lladdr aa:bb:cc:11:22:33 REACHABLE', type: 'output' }] },
        { segments: [{ text: '192.168.1.100 dev eth0 lladdr dd:ee:ff:44:55:66 STALE', type: 'output' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: DHCP                                                */}
      {/* ============================================================ */}
      <h2>📋 DHCP — Automatic IP Assignment</h2>

      <p>
        When you connect your phone to WiFi, how does it magically get an IP address? The answer is 
        <strong>DHCP (Dynamic Host Configuration Protocol)</strong>. It's like checking into a hotel — 
        you show up, and the front desk (DHCP server, usually your router) assigns you a room 
        number (IP address), tells you the building's address (gateway), and gives you a map 
        (DNS servers).
      </p>

      <h3>The DHCP 4-Step Dance (DORA)</h3>

      <Diagram title="DHCP DORA Process">
{`
  Client (You)                               DHCP Server (Router)
  ─────────────                              ────────────────────
  
  1. DISCOVER ──────────────────────────────►
     "Hey! I need an IP address!"
     (Broadcast to 255.255.255.255)
     (Source: 0.0.0.0)
  
  2.              ◄────────────────────────── OFFER
                  "How about 192.168.1.105?"
                  "Gateway: 192.168.1.1"
                  "DNS: 8.8.8.8"
                  "Lease: 24 hours"
  
  3. REQUEST ──────────────────────────────►
     "Yes! I'll take 192.168.1.105!"
     (Still broadcast — so other DHCP
      servers know to withdraw their offers)
  
  4.              ◄────────────────────────── ACK
                  "Confirmed! 192.168.1.105 is yours
                   for the next 24 hours."
  
  Remember: D-O-R-A
  Discover → Offer → Request → Acknowledge
`}
      </Diagram>

      <InfoBox type="warning">
        <strong>DHCP Attack — Rogue DHCP Server:</strong> An attacker can set up a rogue DHCP server 
        that responds faster than the real one, assigning victims a gateway IP that points to the 
        attacker's machine. This instantly becomes a MITM attack without needing ARP spoofing! The 
        victim's traffic willingly routes through the attacker because they were told to by "DHCP."
      </InfoBox>

      <InfoBox type="tip">
        <strong>Edge Case — DHCP Starvation:</strong> An attacker sends thousands of DHCP requests 
        with fake MAC addresses, exhausting the DHCP pool. Legitimate devices can't get IP addresses 
        and connect. This is a form of Denial of Service (DoS). Tools like <code>yersinia</code> can 
        perform this attack.
      </InfoBox>

      <Terminal lines={[
        { segments: [{ text: '# Release your current DHCP lease', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo dhclient -r eth0', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Request a new IP via DHCP', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo dhclient eth0', type: 'command' }] },
        { segments: [{ text: 'DHCPDISCOVER on eth0 to 255.255.255.255 port 67', type: 'output' }] },
        { segments: [{ text: 'DHCPOFFER from 192.168.1.1', type: 'output' }] },
        { segments: [{ text: 'DHCPREQUEST on eth0 to 255.255.255.255 port 67', type: 'output' }] },
        { segments: [{ text: 'DHCPACK from 192.168.1.1 (xid=0x26d04a1b)', type: 'output' }] },
        { segments: [{ text: 'bound to ', type: 'output' }, { text: '192.168.1.105', type: 'highlight' }, { text: ' -- renewal in 40000 seconds', type: 'output' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: DNS                                                 */}
      {/* ============================================================ */}
      <h2>📖 DNS — The Internet's Phone Book</h2>

      <p>
        <strong>DNS (Domain Name System)</strong> translates human-readable domain names 
        (like <code>google.com</code>) into IP addresses (like <code>142.250.80.46</code>). Without DNS, 
        you'd have to memorize IP addresses for every website you visit.
      </p>

      <h3>How DNS Resolution Works — The Full Story</h3>
      <p>
        When you type <code>www.google.com</code> in your browser, here's what actually happens behind 
        the scenes:
      </p>

      <Diagram title="DNS Resolution Step by Step">
{`
  You type: www.google.com
  
  Step 1: Check local cache
  ┌──────────┐  "Do I already know this?"
  │ Browser  │──► Browser cache → OS cache → hosts file
  │          │  If found → DONE! Use cached IP
  └──────────┘  If not found → continue...
  
  Step 2: Ask the recursive resolver (usually your ISP)
  ┌──────────┐         ┌─────────────────┐
  │ Your PC  │────────►│ Recursive DNS   │
  │          │         │ (e.g., 8.8.8.8) │
  └──────────┘         └───────┬─────────┘
                               │
  Step 3: Resolver asks Root DNS servers
                               │ "Where is .com?"
                       ┌───────▼─────────┐
                       │  Root Server    │
                       │  (13 worldwide) │
                       └───────┬─────────┘
                               │ "Try .com TLD server"
  Step 4: Ask the TLD server
                       ┌───────▼─────────┐
                       │  .com TLD       │
                       │  Server         │
                       └───────┬─────────┘
                               │ "Try Google's nameserver"
  Step 5: Ask authoritative nameserver
                       ┌───────▼──────────────┐
                       │  ns1.google.com      │
                       │  "142.250.80.46!"    │
                       └──────────────────────┘
  
  Total time: ~20-120ms (then cached for hours)
`}
      </Diagram>

      <Terminal lines={[
        { segments: [{ text: '# Look up a domain\'s IP address', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'nslookup google.com', type: 'command' }] },
        { segments: [{ text: 'Server:    192.168.1.1', type: 'output' }] },
        { segments: [{ text: 'Address:   192.168.1.1#53', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: 'Non-authoritative answer:', type: 'output' }] },
        { segments: [{ text: 'Name:  google.com', type: 'output' }] },
        { segments: [{ text: 'Address: ', type: 'output' }, { text: '142.250.80.46', type: 'highlight' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# More detailed lookup with dig', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'dig google.com +short', type: 'command' }] },
        { segments: [{ text: '142.250.80.46', type: 'highlight' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Check what DNS server you\'re using', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'cat /etc/resolv.conf', type: 'command' }] },
        { segments: [{ text: 'nameserver 192.168.1.1', type: 'output' }] },
      ]} />

      <InfoBox type="danger">
        <strong>DNS Attacks:</strong>
        <ul>
          <li><strong>DNS Spoofing/Poisoning:</strong> Attacker corrupts DNS cache to redirect traffic. 
              You type <code>bank.com</code> but get sent to a phishing site.</li>
          <li><strong>DNS Hijacking:</strong> Attacker changes your DNS server settings (via DHCP attack 
              or router compromise) to control all name resolution.</li>
          <li><strong>DNS Tunneling:</strong> Hiding data exfiltration inside DNS queries to bypass firewalls.</li>
        </ul>
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: Ports                                               */}
      {/* ============================================================ */}
      <h2>🚪 Ports — Doors Into a Machine</h2>

      <p>
        If an IP address is like a building's street address, then <strong>ports</strong> are like doors 
        and windows in that building. Each port number (0–65535) corresponds to a specific service or 
        application. When you connect to a web server, you're connecting to its IP address on port 80 
        (HTTP) or port 443 (HTTPS).
      </p>

      <h3>Port Number Ranges</h3>
      <ul>
        <li><strong>0–1023:</strong> Well-known ports (require root). Used by standard services.</li>
        <li><strong>1024–49151:</strong> Registered ports. Used by specific applications.</li>
        <li><strong>49152–65535:</strong> Dynamic/ephemeral ports. Used temporarily by client connections.</li>
      </ul>

      <h3>Critical Ports Every Hacker Must Know</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ padding: '8px', textAlign: 'left' }}>Port</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Service</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Protocol</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Security Note</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['20/21', 'FTP', 'TCP', 'Transmits credentials in plaintext!'],
            ['22', 'SSH', 'TCP', 'Secure remote access. Brute-forceable.'],
            ['23', 'Telnet', 'TCP', 'Everything in plaintext. Never use.'],
            ['25', 'SMTP', 'TCP', 'Email sending. Can be used for spoofing.'],
            ['53', 'DNS', 'TCP/UDP', 'Name resolution. DNS tunneling risk.'],
            ['80', 'HTTP', 'TCP', 'Unencrypted web traffic.'],
            ['443', 'HTTPS', 'TCP', 'Encrypted web traffic (TLS/SSL).'],
            ['445', 'SMB', 'TCP', 'Windows file sharing. EternalBlue!'],
            ['3306', 'MySQL', 'TCP', 'Database. Should never be exposed.'],
            ['3389', 'RDP', 'TCP', 'Remote Desktop. High-value target.'],
            ['8080', 'HTTP Alt', 'TCP', 'Often used for proxies/dev servers.'],
          ].map(([port, service, proto, note], i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '8px' }}><code>{port}</code></td>
              <td style={{ padding: '8px' }}><strong>{service}</strong></td>
              <td style={{ padding: '8px' }}>{proto}</td>
              <td style={{ padding: '8px' }}>{note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Terminal lines={[
        { segments: [{ text: '# See what ports are open on your machine', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'ss -tulnp', type: 'command' }] },
        { segments: [{ text: 'Netid  State   Recv-Q  Send-Q  Local Address:Port  Peer Address:Port', type: 'output' }] },
        { segments: [{ text: 'tcp    LISTEN  0       128     0.0.0.0:', type: 'output' }, { text: '22', type: 'highlight' }, { text: '      0.0.0.0:*    sshd', type: 'output' }] },
        { segments: [{ text: 'tcp    LISTEN  0       128     0.0.0.0:', type: 'output' }, { text: '80', type: 'highlight' }, { text: '      0.0.0.0:*    apache2', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Quick port scan of a target (with nmap)', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'nmap -sV 192.168.1.1', type: 'command' }] },
        { segments: [{ text: 'PORT     STATE  SERVICE  VERSION', type: 'output' }] },
        { segments: [{ text: '22/tcp   open   ssh      OpenSSH 8.9', type: 'output' }] },
        { segments: [{ text: '53/tcp   open   domain   dnsmasq 2.86', type: 'output' }] },
        { segments: [{ text: '80/tcp   open   http     lighttpd 1.4.59', type: 'output' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: How WiFi Works                                      */}
      {/* ============================================================ */}
      <h2>📡 How WiFi Actually Works</h2>

      <p>
        WiFi (officially <strong>IEEE 802.11</strong>) is just a way to transmit data using radio waves 
        instead of cables. Your router is essentially a radio station, and your phone is a radio receiver 
        (and transmitter). But unlike FM radio, WiFi is bidirectional — your device both listens and talks.
      </p>

      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Wireless_network.svg/800px-Wireless_network.svg.png" 
        alt="Wireless network topology diagram" 
        style={{ maxWidth: '100%', borderRadius: 8, margin: '16px 0', background: '#fff', padding: 8 }} 
      />
      <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
        A typical wireless network setup with an access point connecting multiple devices.
      </p>

      <h3>WiFi Standards Evolution</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ padding: '8px', textAlign: 'left' }}>Standard</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Year</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Max Speed</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Frequency</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['802.11b', 'WiFi 1', '1999', '11 Mbps', '2.4 GHz'],
            ['802.11g', 'WiFi 3', '2003', '54 Mbps', '2.4 GHz'],
            ['802.11n', 'WiFi 4', '2009', '600 Mbps', '2.4/5 GHz'],
            ['802.11ac', 'WiFi 5', '2014', '6.9 Gbps', '5 GHz'],
            ['802.11ax', 'WiFi 6', '2020', '9.6 Gbps', '2.4/5/6 GHz'],
          ].map(([std, name, year, speed, freq], i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '8px' }}><code>{std}</code></td>
              <td style={{ padding: '8px' }}><strong>{name}</strong></td>
              <td style={{ padding: '8px' }}>{year}</td>
              <td style={{ padding: '8px' }}>{speed}</td>
              <td style={{ padding: '8px' }}>{freq}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>How a WiFi Connection Is Established</h3>
      <Diagram title="WiFi Association Process">
{`
  Client Device                            Access Point (Router)
  ─────────────                            ─────────────────────
  
  1. AP broadcasts beacon frames every ~100ms:
                    ◄──────────────────── Beacon: "I'm NetworkName, 
                                          channel 6, WPA2, speed..."
  
  2. Client sends probe request:
  Probe Request ──────────────────────►
  "Are you there, NetworkName?"
  
  3. AP responds:
                    ◄────────────────── Probe Response
                                        "Yes, here I am!"
  
  4. Authentication (Open System):
  Auth Request ────────────────────────►
                    ◄────────────────── Auth Response: "OK"
  
  5. Association:
  Assoc Request ───────────────────────►
  "I support these rates/features..."
                    ◄────────────────── Assoc Response: "Welcome!
                                        Your Association ID is 1"
  
  6. 4-Way Handshake (if WPA/WPA2):
  ◄──────────── Exchange encryption keys ──────────►
  (This is what we capture for WPA cracking!)
  
  7. Connected! Data flows encrypted.
`}
      </Diagram>

      <InfoBox type="note">
        <strong>Why beacon frames matter:</strong> Routers constantly broadcast beacon frames announcing 
        their existence. This is how your phone sees available networks. In monitor mode, we capture 
        these beacons to discover all networks in range — even hidden ones (they still send beacons, 
        just with an empty SSID field).
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: Network Tools Quick Reference                       */}
      {/* ============================================================ */}
      <h2>🛠️ Essential Network Commands — Quick Reference</h2>

      <Terminal lines={[
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '# NETWORK INFORMATION', type: 'comment' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Show all interfaces with IPs', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'ip addr show', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Show routing table (find gateway)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'ip route show', type: 'command' }] },
        { segments: [{ text: 'default via ', type: 'output' }, { text: '192.168.1.1', type: 'highlight' }, { text: ' dev eth0', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Show ARP table (who\'s on the network)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'arp -a', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '# CONNECTIVITY TESTING', type: 'comment' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Ping a host (test connectivity)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'ping -c 4 google.com', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Trace the route packets take', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'traceroute google.com', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '# SCANNING & DISCOVERY', type: 'comment' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Discover devices on network', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo nmap -sn 192.168.1.0/24', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Scan a target for open ports', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo nmap -sV -sC 192.168.1.1', type: 'command' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: Putting It All Together                             */}
      {/* ============================================================ */}
      <h2>🧩 Putting It All Together — A Complete Story</h2>

      <p>
        Let's trace what happens when you open <code>https://google.com</code> on your laptop connected 
        to WiFi. This single action involves <em>every concept</em> on this page:
      </p>

      <Diagram title="Complete Flow: Opening a Website">
{`
  You type: https://google.com
  
  1. WiFi Layer (Physical + Data Link)
     Your laptop's WiFi radio sends the request as 
     encrypted radio waves to the access point
     └─► Uses your device's MAC address → Router's MAC
  
  2. DHCP Already Assigned You:
     ├─ IP: 192.168.1.105
     ├─ Gateway: 192.168.1.1  
     ├─ DNS: 8.8.8.8
     └─ Subnet: 255.255.255.0
  
  3. DNS Resolution
     "What IP is google.com?"
     └─► DNS server says: 142.250.80.46
  
  4. ARP Resolution
     "What MAC has IP 192.168.1.1 (gateway)?"
     └─► ARP cache says: AA:BB:CC:11:22:33
  
  5. Routing
     Destination 142.250.80.46 is NOT in 192.168.1.0/24
     └─► Send to gateway (192.168.1.1) 
  
  6. NAT (at Router)
     Source changes: 192.168.1.105 → 203.0.113.50
     └─► Router remembers the mapping for the reply
  
  7. TCP Connection (Port 443 for HTTPS)
     └─► SYN → SYN-ACK → ACK (3-way handshake)
  
  8. TLS Handshake (Encryption)
     └─► Certificate verification, key exchange
  
  9. HTTP Request
     └─► GET / HTTP/1.1  Host: google.com
  
  10. Response comes back through reverse path!
`}
      </Diagram>

      <InfoBox type="success">
        <strong>Key Takeaway:</strong> Every step in this process is a potential attack surface. DNS can 
        be spoofed, ARP can be poisoned, the WiFi radio waves can be intercepted, NAT can be bypassed, 
        and TLS can be downgraded. Understanding the normal flow is the first step to understanding 
        how to exploit it. In the upcoming sections, we'll attack each of these layers systematically.
      </InfoBox>

      <h2>📚 What's Next?</h2>
      <p>
        Now that you understand the networking foundations, we'll move on to the specific hardware 
        you need. In the next section, <strong>Wireless Adapter</strong>, we'll cover why regular WiFi 
        cards can't hack networks and what special hardware you need — along with how to set it up 
        in your Kali virtual machine.
      </p>
    </div>
  );
};

export default NetworkBasics;
