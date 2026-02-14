import React from 'react';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

const WPAIntro = () => {
  return (
    <div className="page-content">
      <h1>Introduction to WPA and WPA2 Cracking</h1>

      <p>
        After the catastrophic failure of WEP, the Wi-Fi Alliance needed a replacement — fast. 
        <strong> WPA (Wi-Fi Protected Access)</strong> was the emergency patch, and 
        <strong> WPA2</strong> was the proper, long-term solution. Unlike WEP, where we exploited 
        mathematical weaknesses in the encryption itself, WPA/WPA2 is <em>cryptographically sound</em>. 
        You can't just collect packets and crack it. The only way in? <strong>Brute force the password.</strong>
      </p>

      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Wi-Fi_Protected_Access_logo.svg/320px-Wi-Fi_Protected_Access_logo.svg.png" 
        alt="WPA Logo" 
        style={{ maxWidth: '280px', borderRadius: 8, margin: '16px 0' }} 
      />

      {/* ============================================================ */}
      {/* SECTION: WPA vs WPA2 vs WPA3                                 */}
      {/* ============================================================ */}
      <h2>📊 WPA vs WPA2 vs WPA3 — Evolution of WiFi Security</h2>

      <p>
        Think of it like locks on a door. WEP was a cheap lock that anyone with a hairpin could pick. 
        WPA was a better lock installed while the real one was being manufactured. WPA2 is the deadbolt. 
        WPA3 is the deadbolt with a biometric scanner.
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Feature</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>WPA</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>WPA2</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>WPA3</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={{ padding: '8px' }}><strong>Year</strong></td><td style={{ padding: '8px' }}>2003</td><td style={{ padding: '8px' }}>2004</td><td style={{ padding: '8px' }}>2018</td></tr>
          <tr><td style={{ padding: '8px' }}><strong>Encryption</strong></td><td style={{ padding: '8px' }}>TKIP</td><td style={{ padding: '8px' }}>AES-CCMP</td><td style={{ padding: '8px' }}>AES-GCMP-256</td></tr>
          <tr><td style={{ padding: '8px' }}><strong>Key Exchange</strong></td><td style={{ padding: '8px' }}>4-Way Handshake</td><td style={{ padding: '8px' }}>4-Way Handshake</td><td style={{ padding: '8px' }}>SAE (Dragonfly)</td></tr>
          <tr><td style={{ padding: '8px' }}><strong>Offline Attack?</strong></td><td style={{ padding: '8px' }}>Yes ⚠️</td><td style={{ padding: '8px' }}>Yes ⚠️</td><td style={{ padding: '8px' }}>No ✅</td></tr>
          <tr><td style={{ padding: '8px' }}><strong>Vulnerable To</strong></td><td style={{ padding: '8px' }}>Weak passwords</td><td style={{ padding: '8px' }}>Weak passwords, KRACK</td><td style={{ padding: '8px' }}>Dragonblood (patched)</td></tr>
          <tr><td style={{ padding: '8px' }}><strong>Status</strong></td><td style={{ padding: '8px' }}>❌ Deprecated</td><td style={{ padding: '8px' }}>✅ Most common</td><td style={{ padding: '8px' }}>✅ Recommended</td></tr>
        </tbody>
      </table>

      <InfoBox type="note">
        <strong>Critical difference from WEP:</strong> With WEP, we exploited a mathematical flaw 
        in RC4 encryption — the attack always works given enough packets. With WPA/WPA2, the 
        encryption (AES) is unbreakable. The <em>only</em> attack vector is the password itself. 
        If the password is strong and random (e.g., <code>j#K9mP2$vL8nQ4wX</code>), WPA2 is 
        effectively uncrackable. If it's <code>password123</code>... well, that's a different story.
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: The 4-Way Handshake                                 */}
      {/* ============================================================ */}
      <h2>🤝 The 4-Way Handshake — The Heart of WPA Security</h2>

      <p>
        When you type a WiFi password and hit "Connect," your device and the router perform a 
        cryptographic dance called the <strong>4-Way Handshake</strong>. This handshake doesn't 
        transmit the password — instead, both sides prove they know it without revealing it. 
        Think of it like two spies who share a secret code. They verify each other by showing 
        they can both produce the same result from the code, without ever saying the code out loud.
      </p>

      <Diagram title="WPA2 4-Way Handshake — Deep Dive">
{`
   Client (Your Phone)                          Access Point (Router)
     │                                                │
     │   Both independently compute the PMK:          │
     │   PMK = PBKDF2(Password, SSID, 4096 rounds)   │
     │   (Password + Network Name → Master Key)       │
     │                                                │
     │◄══════ Message 1: ANonce ═════════════════════│
     │   Router sends a random number (ANonce)        │
     │   This is sent in cleartext!                   │
     │                                                │
     │   Client now has everything to compute PTK:    │
     │   PTK = PRF(PMK + ANonce + SNonce + MACs)      │
     │                                                │
     │══════ Message 2: SNonce + MIC ════════════════►│
     │   Client sends its random number (SNonce)      │
     │   Plus a MIC (Message Integrity Code)          │
     │   MIC proves client knows the correct PMK!     │
     │                                                │
     │   Router computes PTK and verifies MIC         │
     │   If MIC matches → password is correct!        │
     │                                                │
     │◄══════ Message 3: GTK + MIC ══════════════════│
     │   Router sends Group Temporal Key (GTK)        │
     │   For decrypting broadcast/multicast traffic   │
     │   Another MIC to verify integrity              │
     │                                                │
     │══════ Message 4: ACK ═════════════════════════►│
     │   Client confirms everything is set            │
     │                                                │
     │   ═══ ENCRYPTED COMMUNICATION BEGINS ═══      │
     │   All data now encrypted with PTK              │
     │                                                │
     
   ╔══════════════════════════════════════════════════════╗
   ║  KEY DERIVATION CHAIN:                               ║
   ║                                                       ║
   ║  Password + SSID                                      ║
   ║       │                                               ║
   ║       ▼ PBKDF2 (4096 iterations — intentionally slow) ║
   ║  PMK (Pre-shared Master Key) — 256 bits               ║
   ║       │                                               ║
   ║       ▼ PRF (Pseudo-Random Function)                  ║
   ║  PTK (Pairwise Transient Key) — 512 bits              ║
   ║       │                                               ║
   ║       ├── KCK: Key Confirmation Key (for MIC)         ║
   ║       ├── KEK: Key Encryption Key (for GTK)           ║
   ║       └── TK: Temporal Key (for data encryption)      ║
   ╚══════════════════════════════════════════════════════╝
`}
      </Diagram>

      <h3>Why PBKDF2 Matters for Attackers</h3>
      <p>
        The password-to-key derivation uses <strong>PBKDF2 with 4096 iterations</strong>. This is 
        deliberately slow — it means testing each password guess takes significant computation. On a 
        CPU, you might test 3,000-5,000 passwords per second. On a powerful GPU, maybe 500,000/sec. 
        Compare this to MD5 hashing where you can test <em>billions</em> per second. PBKDF2 is what 
        makes WPA2 brute-forcing so much harder than, say, cracking password hashes.
      </p>

      <InfoBox type="warning">
        <strong>What we capture from the handshake:</strong>
        <ul>
          <li><strong>ANonce</strong> — Router's random number (from Message 1)</li>
          <li><strong>SNonce</strong> — Client's random number (from Message 2)</li>
          <li><strong>MAC addresses</strong> — Both client and AP MAC addresses</li>
          <li><strong>MIC</strong> — The Message Integrity Code (from Message 2)</li>
          <li><strong>SSID</strong> — The network name (from beacons)</li>
        </ul>
        With all of these, we can <em>test</em> password guesses offline: generate PMK → generate PTK → 
        compute MIC → compare with captured MIC. If they match, we found the password!
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: Attack Strategy                                     */}
      {/* ============================================================ */}
      <h2>🎯 WPA/WPA2 Attack Strategy</h2>

      <Diagram title="Complete WPA2 Attack Flow">
{`
  ┌──────────────────────────────────────────────────────────────────┐
  │                    WPA2 ATTACK STRATEGY                         │
  ├──────────────────────────────────────────────────────────────────┤
  │                                                                  │
  │  Phase 1: CAPTURE THE HANDSHAKE                                 │
  │  ═══════════════════════════════                                │
  │  • Monitor target network with airodump-ng                      │
  │  • Wait for client to connect (passive)                         │
  │  • OR deauth a client to force reconnection (active)            │
  │  • Capture the 4-way handshake in a .cap file                  │
  │                                                                  │
  │  Phase 2: PREPARE WORDLIST                                      │
  │  ══════════════════════════                                     │
  │  • Use pre-built lists (rockyou.txt — 14M passwords)            │
  │  • Create custom lists with crunch (targeted patterns)          │
  │  • Download specialized lists (SecLists, CrackStation)          │
  │                                                                  │
  │  Phase 3: CRACK OFFLINE                                         │
  │  ══════════════════════                                         │
  │  • aircrack-ng (CPU — slower, always available)                 │
  │  • hashcat (GPU — 100x faster, needs GPU drivers)               │
  │  • cowpatty (rainbow tables — pre-computed, fastest)             │
  │                                                                  │
  │  Phase 4: SUCCESS?                                              │
  │  ═════════════════                                              │
  │  • Password in wordlist → CRACKED! 🎉                          │
  │  • Password NOT in wordlist → Need better wordlist              │
  │  • Strong random password → Essentially UNCRACKABLE 🔒         │
  │                                                                  │
  │  ALTERNATIVE: WPS ATTACK (no wordlist needed!)                  │
  │  ════════════════════════════════════════════                    │
  │  • If router has WPS enabled                                    │
  │  • Brute-force the 8-digit WPS PIN (~11,000 combos)             │
  │  • Reaver/Bully tools — takes 2-10 hours                       │
  │  • PixieWPS — seconds (if router is vulnerable)                │
  └──────────────────────────────────────────────────────────────────┘
`}
      </Diagram>

      {/* ============================================================ */}
      {/* SECTION: Methods Overview                                    */}
      {/* ============================================================ */}
      <h2>🛠️ Cracking Methods Compared</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Method</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Tool</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Speed</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Best For</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Needs</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={{ padding: '8px' }}><strong>Dictionary (CPU)</strong></td><td style={{ padding: '8px' }}>aircrack-ng</td><td style={{ padding: '8px' }}>~3-5K/s</td><td style={{ padding: '8px' }}>Quick check</td><td style={{ padding: '8px' }}>Wordlist</td></tr>
          <tr><td style={{ padding: '8px' }}><strong>Dictionary (GPU)</strong></td><td style={{ padding: '8px' }}>hashcat</td><td style={{ padding: '8px' }}>~300K-1M/s</td><td style={{ padding: '8px' }}>Serious cracking</td><td style={{ padding: '8px' }}>Wordlist + GPU</td></tr>
          <tr><td style={{ padding: '8px' }}><strong>Rules-based</strong></td><td style={{ padding: '8px' }}>hashcat + rules</td><td style={{ padding: '8px' }}>Varies</td><td style={{ padding: '8px' }}>Password mutations</td><td style={{ padding: '8px' }}>Base wordlist + rules</td></tr>
          <tr><td style={{ padding: '8px' }}><strong>Rainbow Tables</strong></td><td style={{ padding: '8px' }}>cowpatty</td><td style={{ padding: '8px' }}>Very fast</td><td style={{ padding: '8px' }}>Common SSIDs</td><td style={{ padding: '8px' }}>Pre-computed tables</td></tr>
          <tr><td style={{ padding: '8px' }}><strong>WPS Brute Force</strong></td><td style={{ padding: '8px' }}>reaver/bully</td><td style={{ padding: '8px' }}>~1/sec online</td><td style={{ padding: '8px' }}>WPS-enabled routers</td><td style={{ padding: '8px' }}>WPS enabled</td></tr>
          <tr><td style={{ padding: '8px' }}><strong>WPS PixieWPS</strong></td><td style={{ padding: '8px' }}>reaver -K</td><td style={{ padding: '8px' }}>Seconds</td><td style={{ padding: '8px' }}>Vulnerable routers</td><td style={{ padding: '8px' }}>Weak RNG on router</td></tr>
          <tr><td style={{ padding: '8px' }}><strong>PMKID Attack</strong></td><td style={{ padding: '8px' }}>hcxdumptool</td><td style={{ padding: '8px' }}>Varies</td><td style={{ padding: '8px' }}>No client needed!</td><td style={{ padding: '8px' }}>Vulnerable AP</td></tr>
        </tbody>
      </table>

      <h3>The PMKID Attack — A Newer Technique</h3>
      <p>
        Discovered in 2018, this attack doesn't even need a connected client! Some access points 
        send a PMKID (derived from the PMK) in the first message of the RSN (Robust Security Network) 
        negotiation. You can capture this from a single frame and crack it offline — no deauth 
        needed, no client needed.
      </p>

      <InfoBox type="tip">
        <strong>Bottom line:</strong> WPA2 security = password strength. A 20-character random password 
        makes WPA2 uncrackable regardless of the attacker's hardware. A dictionary word with a number 
        at the end? That's falling in minutes. The encryption is perfect — the humans choosing 
        passwords are the weak link.
      </InfoBox>

      <h2>📚 What's Next?</h2>
      <p>
        In the following sections, we'll walk through each step in detail:
      </p>
      <ol>
        <li><strong>Capturing the Handshake</strong> — How to capture the 4-way handshake using airodump-ng and deauthentication</li>
        <li><strong>Creating Wordlists</strong> — Building effective password lists with crunch and other tools</li>
        <li><strong>Cracking with aircrack-ng & hashcat</strong> — Testing passwords against the handshake</li>
        <li><strong>WPS Attacks</strong> — Bypassing WPA2 entirely using the WPS vulnerability</li>
      </ol>
    </div>
  );
};

export default WPAIntro;
