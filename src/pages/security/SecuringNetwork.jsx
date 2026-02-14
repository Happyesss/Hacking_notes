import React from 'react';
import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

const SecuringNetwork = () => {
  return (
    <div className="page-content">
      <h1>Securing Your Network — Defense Against Every Attack</h1>

      <p>
        You've learned how every WiFi attack works — from packet sniffing to WPA cracking to WPS 
        brute-force. Now it's time to flip the script. <strong>How do you defend against yourself?</strong> 
        This section covers countermeasures for every attack technique covered in this course. 
        Think of it as the "antidote" chapter — for each poison, there's a cure.
      </p>

      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/No_sign.svg/200px-No_sign.svg.png" 
        alt="Security Shield" 
        style={{ maxWidth: '150px', borderRadius: 8, margin: '16px 0' }} 
      />

      {/* ============================================================ */}
      {/* SECTION: Attack-Defense Map                                   */}
      {/* ============================================================ */}
      <h2>🛡️ Attack → Defense Matrix</h2>

      <p>
        For every attack you've learned, here's the specific defense. No vague advice — concrete 
        actions you can take right now:
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Attack</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>How It Works</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Defense</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '8px' }}><strong>Packet Sniffing</strong></td>
            <td style={{ padding: '8px' }}>Attacker captures all wireless traffic in range</td>
            <td style={{ padding: '8px' }}>Use WPA2/WPA3 — sniffed data is encrypted. Use HTTPS/VPN for extra protection.</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}><strong>Deauth Attack</strong></td>
            <td style={{ padding: '8px' }}>Fake deauthentication frames disconnect clients</td>
            <td style={{ padding: '8px' }}>Enable <strong>802.11w (PMF)</strong> — authenticates management frames so fake ones are rejected.</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}><strong>WEP Cracking</strong></td>
            <td style={{ padding: '8px' }}>Collect IVs → statistical attack on RC4</td>
            <td style={{ padding: '8px' }}><strong>Never use WEP.</strong> Period. Switch to WPA2-AES or WPA3 immediately.</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}><strong>WPA Wordlist Attack</strong></td>
            <td style={{ padding: '8px' }}>Capture handshake → offline brute force</td>
            <td style={{ padding: '8px' }}>Use a <strong>strong, random password</strong> (16+ characters). If it's not in any wordlist, it can't be cracked.</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}><strong>WPS Brute Force</strong></td>
            <td style={{ padding: '8px' }}>Guess 8-digit PIN (only 11,000 combos)</td>
            <td style={{ padding: '8px' }}><strong>Disable WPS completely</strong> in router settings. There is no safe way to use it.</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}><strong>MAC Spoofing</strong></td>
            <td style={{ padding: '8px' }}>Attacker copies a legitimate device's MAC</td>
            <td style={{ padding: '8px' }}>Don't rely on MAC filtering as security. Use strong encryption + password instead.</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}><strong>Evil Twin</strong></td>
            <td style={{ padding: '8px' }}>Fake AP mimics legitimate network</td>
            <td style={{ padding: '8px' }}>Always verify network authenticity. Use VPN. Enable certificate-based auth (WPA2-Enterprise).</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}><strong>PMKID Attack</strong></td>
            <td style={{ padding: '8px' }}>Capture PMKID without any client needed</td>
            <td style={{ padding: '8px' }}>Strong password (same defense as WPA wordlist). Use WPA3 which doesn't expose PMKID.</td>
          </tr>
        </tbody>
      </table>

      {/* ============================================================ */}
      {/* SECTION: Security Checklist                                   */}
      {/* ============================================================ */}
      <h2>✅ The Ultimate Security Checklist</h2>

      <Diagram title="WiFi Security Checklist — Priority Order">
{`
  ┌──────────────────────────────────────────────────────────────────┐
  │                   WIFI SECURITY CHECKLIST                       │
  │              (In order of importance)                            │
  ├──────────────────────────────────────────────────────────────────┤
  │                                                                  │
  │  🔴 CRITICAL (Do these IMMEDIATELY):                            │
  │  ────────────────────────────────────                            │
  │  □ Use WPA2-AES or WPA3 (never WEP, never TKIP)                │
  │  □ Set strong WiFi password (16+ chars, random)                 │
  │  □ Disable WPS completely                                       │
  │  □ Change default admin password (not admin/admin!)             │
  │                                                                  │
  │  🟡 IMPORTANT (Do these soon):                                  │
  │  ──────────────────────────────                                  │
  │  □ Update router firmware to latest version                     │
  │  □ Disable remote management/administration                     │
  │  □ Enable 802.11w (Protected Management Frames)                 │
  │  □ Change default SSID (don't reveal router model)              │
  │                                                                  │
  │  🟢 RECOMMENDED (Do these for maximum security):                │
  │  ──────────────────────────────────────────────                  │
  │  □ Set up a guest network for visitors/IoT devices              │
  │  □ Reduce transmit power to cover only needed area              │
  │  □ Disable UPnP (prevents automatic port opening)               │
  │  □ Monitor connected devices regularly                          │
  │  □ Consider WPA2-Enterprise (802.1X) for businesses             │
  │  □ Use a VPN for sensitive activities                            │
  │  □ Enable logging on the router                                 │
  │                                                                  │
  └──────────────────────────────────────────────────────────────────┘
`}
      </Diagram>

      {/* ============================================================ */}
      {/* SECTION: Password Strength                                    */}
      {/* ============================================================ */}
      <h2>🔑 What Makes a Strong WiFi Password?</h2>

      <p>
        Your password is the <strong>single most important security measure</strong> for WiFi. 
        Everything else is secondary. Here's why: WPA2's encryption (AES) is mathematically 
        unbreakable. The ONLY way to crack WPA2 is to guess the password. If the password can't 
        be guessed, the network can't be cracked. It's that simple.
      </p>

      <Diagram title="Password Strength — Real World Examples">
{`
  ┌────────────────────────────────────────────────────────────────────┐
  │  WEAK PASSWORDS (cracked in seconds to hours):                    │
  │  ─────────────────────────────────────────────                     │
  │  password123       ← In rockyou.txt (14M passwords)               │
  │  admin2024         ← Common pattern (word + year)                 │
  │  John1990          ← Name + birth year                            │
  │  12345678          ← Sequential (most common WiFi password!)      │
  │  qwerty123         ← Keyboard pattern                             │
  │  iloveyou          ← In every wordlist ever                       │
  │  CompanyName123    ← Predictable for businesses                   │
  │  9876543210        ← Phone number pattern                         │
  │                                                                    │
  │  Crack time: < 1 second to 1 hour                                 │
  │                                                                    │
  ├────────────────────────────────────────────────────────────────────┤
  │  STRONG PASSWORDS (essentially uncrackable):                      │
  │  ───────────────────────────────────────────                       │
  │  j#K9mP2$vL8nQ4wX         ← 16 random chars (best)               │
  │  Purple-Tiger-42-Jump!    ← Passphrase (easy to remember!)       │
  │  xK7#mN9$pQ2&vL5@rT8wY   ← 22 random chars                      │
  │  correct-horse-battery-7  ← Modified XKCD-style passphrase       │
  │                                                                    │
  │  Crack time: > 1,000,000 years (even with GPU farms)              │
  │                                                                    │
  └────────────────────────────────────────────────────────────────────┘
`}
      </Diagram>

      <InfoBox type="tip">
        <strong>The passphrase trick:</strong> You don't need to remember 
        <code> j#K9mP2$vL8nQ4wX</code>. Instead, use a <strong>passphrase</strong> — 4+ random 
        words with a number and symbol: <code>Purple-Tiger-42-Jump!</code>. It's 22 characters, 
        easy to remember, and impossible to crack with any wordlist. You only need to type it 
        once per device, so length doesn't matter for convenience.
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: Common Mistakes                                      */}
      {/* ============================================================ */}
      <h2>❌ Common Security Mistakes</h2>

      <h3>Mistake 1: "I'll just hide my SSID"</h3>
      <p>
        Hiding your network name (SSID) provides <strong>zero security</strong>. Hidden networks 
        are still visible to anyone with airodump-ng. In fact, hidden networks can be LESS secure 
        because your devices constantly broadcast probe requests looking for the hidden network, 
        revealing it everywhere you go.
      </p>

      <h3>Mistake 2: "MAC filtering will protect me"</h3>
      <p>
        MAC filtering is trivially bypassed. An attacker sees legitimate MACs in airodump-ng and 
        spoofs one with <code>macchanger</code>. It takes 5 seconds. MAC filtering gives you a 
        false sense of security.
      </p>

      <h3>Mistake 3: "My password is strong: MyDogMax2024!"</h3>
      <p>
        This feels strong but isn't. It follows a predictable pattern (Subject + Numbers + Symbol). 
        Hashcat rules will generate this from "mydogmax" in seconds. A truly strong password is 
        <em>random</em> — not based on personal information.
      </p>

      <h3>Mistake 4: "WPS is convenient, I'll leave it on"</h3>
      <p>
        WPS reduces your security from "practically uncrackable" to "3 hours max." Even if your 
        password is 60 random characters, WPS bypasses it entirely. <strong>Always disable WPS.</strong>
      </p>

      <h3>Mistake 5: "I never update my router firmware"</h3>
      <p>
        Router vulnerabilities are discovered regularly. Firmware updates patch these holes. An 
        unpatched router from 2019 might have known exploits that give attackers direct admin access 
        without needing the WiFi password at all.
      </p>

      {/* ============================================================ */}
      {/* SECTION: Router Admin Security                                */}
      {/* ============================================================ */}
      <h2>🔧 Router Administration Security</h2>

      <ul>
        <li><strong>Change admin credentials:</strong> Default is usually admin/admin or admin/password. Every hacker tries these first.</li>
        <li><strong>Disable remote management:</strong> Don't expose the admin panel to the internet. Admin should only be accessible from your local network.</li>
        <li><strong>Use HTTPS for admin panel:</strong> If your router supports it, access admin via HTTPS to encrypt the admin password in transit.</li>
        <li><strong>Disable UPnP:</strong> Universal Plug and Play can be exploited to open ports on your router without your knowledge.</li>
        <li><strong>Enable the built-in firewall:</strong> Most routers have a firewall — make sure it's enabled.</li>
        <li><strong>Disable unnecessary services:</strong> Turn off Telnet, SSH (if not needed), and any remote access features you don't use.</li>
      </ul>

      {/* ============================================================ */}
      {/* SECTION: Network Monitoring                                   */}
      {/* ============================================================ */}
      <h2>👁️ Monitoring Your Network</h2>

      <p>
        Even with perfect security settings, you should regularly check for unauthorized devices. 
        An attacker who somehow got your password would appear as a connected device.
      </p>

      <Terminal lines={[
        { segments: [{ text: '# Scan your local network for all connected devices', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo nmap -sn 192.168.1.0/24', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: 'Starting Nmap 7.94 ( https://nmap.org )', type: 'output' }] },
        { segments: [{ text: 'Nmap scan report for 192.168.1.1 (Router)', type: 'output' }] },
        { segments: [{ text: 'Host is up (0.0023s latency).', type: 'output' }] },
        { segments: [{ text: 'MAC Address: AA:BB:CC:DD:EE:FF (TP-Link)', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: 'Nmap scan report for 192.168.1.5 (Your Laptop)', type: 'output' }] },
        { segments: [{ text: 'Host is up (0.0001s latency).', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: 'Nmap scan report for 192.168.1.12 (Unknown Device?!)', type: 'highlight' }] },
        { segments: [{ text: 'Host is up (0.045s latency).', type: 'output' }] },
        { segments: [{ text: 'MAC Address: XX:XX:XX:XX:XX:XX (Unknown)', type: 'highlight' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# If you see a device you don\'t recognize → change your password!', type: 'comment' }] },
      ]} />

      <p>Other monitoring methods:</p>
      <ul>
        <li><strong>Router admin panel:</strong> Check the "Connected Devices" or "DHCP Clients" list</li>
        <li><strong>Fing app (iOS/Android):</strong> Easy network scanner for your phone</li>
        <li><strong>Set up alerts:</strong> Some routers can notify you when new devices connect</li>
        <li><strong>Regular audits:</strong> Check connected devices weekly</li>
      </ul>

      {/* ============================================================ */}
      {/* SECTION: WPA3 Future                                          */}
      {/* ============================================================ */}
      <h2>🔮 The Future: WPA3</h2>

      <p>
        WPA3 addresses many of the weaknesses we exploited:
      </p>

      <Diagram title="WPA3 Improvements Over WPA2">
{`
  ┌─────────────────────────────────────────────────────────────┐
  │  WPA3 Security Improvements:                                │
  ├─────────────────────────────────────────────────────────────┤
  │                                                             │
  │  1. SAE (Simultaneous Authentication of Equals)             │
  │     └─ Replaces 4-way handshake with Dragonfly protocol     │
  │     └─ Offline dictionary attacks NO LONGER POSSIBLE!       │
  │     └─ Each session has unique encryption keys              │
  │                                                             │
  │  2. Forward Secrecy                                         │
  │     └─ Even if password is compromised later,               │
  │        past sessions cannot be decrypted                    │
  │                                                             │
  │  3. Protected Management Frames (mandatory)                 │
  │     └─ Deauth attacks blocked by default                   │
  │                                                             │
  │  4. 192-bit Security Suite (WPA3-Enterprise)                │
  │     └─ GCMP-256 encryption                                  │
  │     └─ 384-bit ECDH key exchange                            │
  │                                                             │
  │  Bottom line: WPA3 makes nearly all attacks in this         │
  │  course ineffective. Upgrade when your hardware supports it.│
  └─────────────────────────────────────────────────────────────┘
`}
      </Diagram>

      <InfoBox type="success">
        <strong>Summary — The 4 Things That Actually Matter:</strong>
        <ol>
          <li><strong>Use WPA2-AES minimum, WPA3 if available</strong> — Never WEP, never TKIP</li>
          <li><strong>Use a strong random password (16+ chars)</strong> — This is 90% of your security</li>
          <li><strong>Disable WPS</strong> — It bypasses your password entirely</li>
          <li><strong>Keep firmware updated</strong> — Patches known vulnerabilities</li>
        </ol>
        Everything else is a bonus. Get these 4 right and your network is essentially uncrackable.
      </InfoBox>
    </div>
  );
};

export default SecuringNetwork;
