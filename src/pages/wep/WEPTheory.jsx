import React from 'react';
import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

const WEPTheory = () => {
  return (
    <div className="page-content">
      <h1>WEP Theory — Why WEP Is Broken</h1>

      <p>
        <strong>WEP (Wired Equivalent Privacy)</strong> was the first encryption standard for WiFi, 
        introduced in 1997. Its goal was to provide wireless networks with the same level of privacy 
        as wired Ethernet networks. Spoiler: it failed catastrophically. Understanding <em>how</em> it 
        failed is key to understanding WiFi security.
      </p>

      {/* ============================================================ */}
      {/* SECTION: How WEP Encryption Works                            */}
      {/* ============================================================ */}
      <h2>🔐 How WEP Encryption Works — The Story</h2>

      <p>
        Imagine you and your friend want to send secret messages. You agree on a password (the 
        <strong>WEP key</strong>). For each message, you generate a random "message number" (the 
        <strong>IV — Initialization Vector</strong>), combine it with the password, and use it to 
        scramble the message. The problem? The message number is only 24 bits long — there are only 
        about 16 million possible values. With enough messages, the same number WILL repeat, and that's 
        where the crack happens.
      </p>

      <Diagram title="WEP Encryption Process — Step by Step">
{`
  HOW WEP ENCRYPTS A PACKET:
  
  ┌─────────────────────────────────────────────────────────┐
  │ Step 1: Start with plaintext data                       │
  │ "Hello, this is my secret message"                      │
  └──────────────┬──────────────────────────────────────────┘
                 │
                 ▼
  ┌──────────────────────────────────────────────────────────┐
  │ Step 2: Calculate integrity check (ICV)                  │
  │ CRC-32("Hello...") = 0xA1B2C3D4                         │
  │ Append to data: "Hello...message" + 0xA1B2C3D4           │
  │                                                          │
  │ ⚠️ Problem: CRC-32 is NOT cryptographically secure!      │
  │    An attacker can modify data AND recalculate the CRC   │
  └──────────────┬───────────────────────────────────────────┘
                 │
                 ▼
  ┌──────────────────────────────────────────────────────────┐
  │ Step 3: Generate keystream                               │
  │                                                          │
  │ IV (24 bits) + WEP Key (40 or 104 bits) = Seed           │
  │ ┌────────┐   ┌──────────────────────┐                    │
  │ │  IV:   │ + │     WEP Key:         │                    │
  │ │ 3 bytes│   │   5 or 13 bytes      │                    │
  │ └────┬───┘   └──────────┬───────────┘                    │
  │      │                  │                                │
  │      └──────┬───────────┘                                │
  │             ▼                                            │
  │      ┌─────────────┐                                     │
  │      │  RC4 Cipher  │  ← Generates pseudo-random stream  │
  │      │  (PRGA)      │                                     │
  │      └──────┬──────┘                                     │
  │             │                                            │
  │             ▼                                            │
  │      Keystream: 0x7F3A9B2E...                             │
  └──────────────┬───────────────────────────────────────────┘
                 │
                 ▼
  ┌──────────────────────────────────────────────────────────┐
  │ Step 4: XOR plaintext with keystream                     │
  │                                                          │
  │ Plaintext + ICV:  0x48656C6C6F...A1B2C3D4                │
  │ Keystream:        0x7F3A9B2E1D...                         │
  │                   ─────────────────────                   │
  │ XOR Result:       0x375FF7424E... = Ciphertext            │
  └──────────────┬───────────────────────────────────────────┘
                 │
                 ▼
  ┌──────────────────────────────────────────────────────────┐
  │ Step 5: Send the packet                                  │
  │                                                          │
  │ ┌────────┐┌──────────────────────────┐                   │
  │ │ IV     ││     Ciphertext           │                   │
  │ │(clear!)││  (encrypted data + ICV)  │                   │
  │ └────────┘└──────────────────────────┘                   │
  │                                                          │
  │ ⚠️ THE IV IS SENT IN PLAINTEXT! Anyone can read it!      │
  └──────────────────────────────────────────────────────────┘
`}
      </Diagram>

      {/* ============================================================ */}
      {/* SECTION: The Fatal Flaws                                     */}
      {/* ============================================================ */}
      <h2>💀 WEP's Fatal Flaws — Why It's Crackable</h2>

      <h3>Flaw 1: Tiny IV Space (24 bits = only 16.7 million possible IVs)</h3>
      <p>
        The IV is only 24 bits, giving about 16.7 million unique values. On a busy network sending 
        1000 packets per second, all possible IVs are exhausted in under 5 hours. When IVs repeat, 
        the same keystream is used again — and <strong>XOR-ing two ciphertexts encrypted with the same 
        keystream reveals the XOR of the two plaintexts</strong>, which can be analyzed to recover 
        the original messages.
      </p>

      <Diagram title="The Birthday Problem Applied to WEP IVs">
{`
  IV Collision (Reuse):
  
  Packet 1: IV=0x00A1B2 + Key → RC4 → Keystream₁
  Packet 2: IV=0x00A1B2 + Key → RC4 → Keystream₁  ← SAME!
  
  If two packets use the same IV, they use the SAME keystream:
  
  Ciphertext₁ = Plaintext₁ ⊕ Keystream
  Ciphertext₂ = Plaintext₂ ⊕ Keystream
  
  XOR them together:
  Ciphertext₁ ⊕ Ciphertext₂ = Plaintext₁ ⊕ Plaintext₂
  
  Now you have the XOR of two plaintexts — and with
  known plaintext analysis, you can recover both!
  
  Birthday paradox:
  ├─ After ~5,000 packets: 50% chance of IV collision
  ├─ After ~24,000 packets: 99% chance
  └─ Busy network: happens in SECONDS
`}
      </Diagram>

      <h3>Flaw 2: Weak IVs (FMS Attack)</h3>
      <p>
        In 2001, researchers Fluhrer, Mantin, and Shamir discovered that certain IV values create 
        <strong>weak keys</strong> in RC4. When the IV has specific byte patterns, the first bytes of 
        the keystream become correlated with the key bytes. By collecting enough weak IVs (about 
        40,000-85,000), you can statistically determine the WEP key.
      </p>

      <InfoBox type="note">
        <strong>FMS Attack (2001):</strong> The original WEP cracking attack. Needed ~4-6 million 
        IVs. Later improved by the <strong>PTW Attack (2007)</strong> (Pyshkin, Tews, Weinmann) which 
        only needs about <strong>40,000 IVs</strong> for 50% success rate, or <strong>85,000 IVs</strong> 
        for near-certain success. aircrack-ng uses the PTW attack by default.
      </InfoBox>

      <h3>Flaw 3: CRC-32 Integrity Check</h3>
      <p>
        WEP uses CRC-32 to verify data hasn't been tampered with. But CRC-32 is <strong>not</strong> 
        a cryptographic hash — it's a simple checksum designed for error detection, not security. An 
        attacker can modify the ciphertext and recalculate the CRC to match, without knowing the key.
      </p>

      <h3>Flaw 4: No Key Rotation</h3>
      <p>
        The WEP key never changes. Every device on the network uses the same key forever (until someone 
        manually changes it on the router). This means once you crack it, you have permanent access 
        until the administrator changes it.
      </p>

      <h3>Flaw 5: IVs Sent in Cleartext</h3>
      <p>
        The IV is transmitted <strong>unencrypted</strong> with every packet. This means an attacker 
        can see every IV being used and specifically collect the "weak" ones needed for the FMS attack.
      </p>

      <Diagram title="WEP's Flaws Summary">
{`
  ┌─────────────────────────────────────────────────┐
  │              WEP's Design Failures              │
  ├─────────────────────────────────────────────────┤
  │                                                 │
  │  1. Small IV space (24 bits)                    │
  │     └─ Guarantees IV reuse                     │
  │                                                 │
  │  2. Weak IVs in RC4                             │
  │     └─ Certain IVs leak key information         │
  │                                                 │
  │  3. CRC-32 for integrity                        │
  │     └─ Not cryptographically secure             │
  │                                                 │
  │  4. Static key (never changes)                  │
  │     └─ Once cracked, permanent access           │
  │                                                 │
  │  5. IV sent in plaintext                        │
  │     └─ Attacker can see all IVs                 │
  │                                                 │
  │  6. Same key for ALL users                      │
  │     └─ No per-user isolation                    │
  │                                                 │
  │  Result: Can be cracked in 5-30 minutes         │
  │  regardless of password complexity!              │
  └─────────────────────────────────────────────────┘
`}
      </Diagram>

      {/* ============================================================ */}
      {/* SECTION: WEP Key Types                                       */}
      {/* ============================================================ */}
      <h2>🔑 WEP Key Sizes</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ padding: '8px', textAlign: 'left' }}>Type</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Key Length</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Total (Key + IV)</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Hex Characters</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>ASCII Characters</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['WEP-64', '40 bits (5 bytes)', '64 bits', '10 hex chars', '5 ASCII chars'],
            ['WEP-128', '104 bits (13 bytes)', '128 bits', '26 hex chars', '13 ASCII chars'],
          ].map(([type, key, total, hex, ascii], i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '8px' }}><strong>{type}</strong></td>
              <td style={{ padding: '8px' }}>{key}</td>
              <td style={{ padding: '8px' }}>{total}</td>
              <td style={{ padding: '8px' }}><code>{hex}</code></td>
              <td style={{ padding: '8px' }}>{ascii}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <InfoBox type="tip">
        <strong>Key size doesn't matter!</strong> Whether it's WEP-64 or WEP-128, the attack is the 
        same because the vulnerability is in the IV (which is always 24 bits), not in the key length. 
        WEP-128 takes only slightly longer to crack than WEP-64. The password complexity is irrelevant — 
        even a 13-character random password is crackable because the attack is statistical, not brute force.
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: How Cracking Works                                  */}
      {/* ============================================================ */}
      <h2>🧮 How WEP Cracking Actually Works</h2>

      <Diagram title="WEP Cracking Process Overview">
{`
  The WEP Cracking Process:
  
  ┌────────────────────────────────────────────────────┐
  │ 1. CAPTURE: Collect encrypted packets with IVs    │
  │    Each packet contains: [IV (cleartext)] [Data]   │
  │    Tool: airodump-ng --write capture               │
  │    Need: ~20,000-85,000 unique IVs                │
  └────────────────┬───────────────────────────────────┘
                   │
                   ▼
  ┌────────────────────────────────────────────────────┐
  │ 2. ANALYZE: Feed IVs to statistical attack         │
  │    aircrack-ng uses the PTW attack algorithm       │
  │    It analyzes correlations between:               │
  │    • Known IV values (sent in cleartext)           │
  │    • First bytes of each keystream                 │
  │    Tool: aircrack-ng capture-01.cap                │
  └────────────────┬───────────────────────────────────┘
                   │
                   ▼
  ┌────────────────────────────────────────────────────┐
  │ 3. RECOVER: Key bytes emerge statistically         │
  │    Each key byte is guessed independently          │
  │    The most probable value for each byte is tried   │
  │    With enough IVs, probability → certainty        │
  │                                                    │
  │    Result: KEY FOUND! [ AB:CD:EF:12:34 ]           │
  └────────────────────────────────────────────────────┘
  
  Why this works:
  ├─ RC4 has known statistical biases with certain IVs
  ├─ The more IVs we collect, the more data points
  ├─ With enough data, the correct key becomes obvious
  └─ It's like solving a puzzle where each piece
     slightly reveals the answer
`}
      </Diagram>

      <InfoBox type="success">
        <strong>Key Takeaways:</strong>
        <ul>
          <li>WEP uses RC4 encryption with a 24-bit IV — far too small</li>
          <li>The IV is sent in plaintext with every packet</li>
          <li>Certain IVs create weak keys that leak information about the WEP key</li>
          <li>Need ~40,000-85,000 IVs to crack (PTW attack)</li>
          <li>Password strength is <strong>irrelevant</strong> — the attack is statistical, not brute force</li>
          <li>WEP-128 is barely harder to crack than WEP-64</li>
          <li>CRC-32 provides no real integrity protection</li>
          <li>The key never changes until manually updated</li>
        </ul>
      </InfoBox>

      <h2>📚 What's Next?</h2>
      <p>
        Now that you understand <em>why</em> WEP is broken, let's learn <em>how</em> to break it in 
        practice. The next section covers the <strong>WEP Cracking Basics</strong> — the hands-on 
        process of capturing IVs and cracking the key with aircrack-ng.
      </p>
    </div>
  );
};

export default WEPTheory;
