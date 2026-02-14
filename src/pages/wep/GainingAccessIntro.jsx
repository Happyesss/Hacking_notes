import React from 'react';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

const GainingAccessIntro = () => {
  return (
    <div className="page-content">
      <h1>Gaining Access — Understanding WiFi Encryption</h1>

      <p>
        Welcome to the heart of WiFi hacking — <strong>gaining access</strong> to encrypted networks. 
        So far, we've been passively observing networks from the outside. Now we learn how to break 
        through the encryption and actually connect to (or crack) protected WiFi networks. But first, 
        you need to understand <em>what</em> you're breaking.
      </p>

      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Rickard_Falkvinge_at_Piratpartiet_rally_in_Lund.jpg/1280px-Rickard_Falkvinge_at_Piratpartiet_rally_in_Lund.jpg" 
        alt="WiFi security concept" 
        style={{ maxWidth: '100%', borderRadius: 8, margin: '16px 0', display: 'none' }} 
      />

      {/* ============================================================ */}
      {/* SECTION: The Evolution of WiFi Security                      */}
      {/* ============================================================ */}
      <h2>🔐 The Evolution of WiFi Security — A Story</h2>

      <p>
        WiFi security has evolved through several generations, each addressing the weaknesses of the 
        last. Think of it as a locksmith's arms race — every time someone picks the lock, the industry 
        designs a better one. Here's the full timeline:
      </p>

      <Diagram title="WiFi Encryption Evolution Timeline">
{`
  Timeline of WiFi Security:
  
  1997 ─── WEP (Wired Equivalent Privacy)
  │         ├─ First WiFi encryption ever
  │         ├─ 64-bit or 128-bit RC4 stream cipher
  │         ├─ Fatally flawed design
  │         └─ Crackable in MINUTES ❌
  │
  2001 ─── WEP declared "broken" by researchers
  │         └─ FMS attack published (Fluhrer, Mantin, Shamir)
  │
  2003 ─── WPA (WiFi Protected Access)
  │         ├─ Emergency fix while WPA2 was being developed
  │         ├─ TKIP cipher (based on RC4 but with fixes)
  │         ├─ Per-packet key mixing
  │         ├─ Better but still uses RC4 under the hood
  │         └─ Crackable via dictionary/brute force ⚠️
  │
  2004 ─── WPA2 (WiFi Protected Access 2)
  │         ├─ Full IEEE 802.11i standard
  │         ├─ AES-CCMP cipher (very strong!)
  │         ├─ 4-way handshake for key exchange
  │         ├─ Still most common encryption today
  │         └─ Crackable via dictionary/brute force ⚠️
  │             (but encryption itself is strong)
  │
  2017 ─── KRACK Attack discovered
  │         └─ Key Reinstallation Attack against WPA2
  │             (patched by most vendors)
  │
  2018 ─── WPA3 (WiFi Protected Access 3)
            ├─ SAE (Simultaneous Authentication of Equals)
            ├─ Forward secrecy
            ├─ Protected management frames (PMF)
            ├─ Resistant to offline dictionary attacks!
            └─ Most secure option ✅
               (but adoption is still slow)
`}
      </Diagram>

      {/* ============================================================ */}
      {/* SECTION: Encryption Comparison                               */}
      {/* ============================================================ */}
      <h2>📊 Complete Encryption Comparison</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ padding: '8px', textAlign: 'left' }}>Feature</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>WEP</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>WPA</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>WPA2</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>WPA3</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Year', '1997', '2003', '2004', '2018'],
            ['Cipher', 'RC4', 'RC4/TKIP', 'AES/CCMP', 'AES/GCMP-256'],
            ['Key Size', '40 or 104 bit', '128 bit', '128 bit', '192/256 bit'],
            ['Auth Method', 'Shared Key', 'PSK/Enterprise', 'PSK/Enterprise', 'SAE/Enterprise'],
            ['IV Size', '24 bit (too small!)', '48 bit', 'N/A (built into AES)', 'N/A'],
            ['Security Level', '❌ Broken', '⚠️ Weak', '✅ Good*', '✅ Strong'],
            ['Attack Method', 'IV collection + statistical', 'Dictionary/brute force', 'Dictionary/brute force', 'Very limited'],
            ['Time to Crack', 'Minutes', 'Hours-Days', 'Hours-Days', 'Years+ (if any)'],
            ['Still in Use?', 'Rare (legacy devices)', 'Rare', 'Very common', 'Growing'],
          ].map(([feature, wep, wpa, wpa2, wpa3], i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '8px' }}><strong>{feature}</strong></td>
              <td style={{ padding: '8px' }}>{wep}</td>
              <td style={{ padding: '8px' }}>{wpa}</td>
              <td style={{ padding: '8px' }}>{wpa2}</td>
              <td style={{ padding: '8px' }}>{wpa3}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ fontSize: 13 }}>* WPA2 encryption is strong, but the password can be cracked if it's weak.</p>

      {/* ============================================================ */}
      {/* SECTION: The Two Authentication Types                        */}
      {/* ============================================================ */}
      <h2>🔑 PSK vs Enterprise — Two Worlds of WiFi Auth</h2>

      <h3>PSK (Pre-Shared Key) — Home Networks</h3>
      <p>
        PSK is what you use at home — everyone shares the same WiFi password. When you give a friend 
        your WiFi password, that's PSK. The key is "pre-shared" because you set it once on the router 
        and everyone who wants to connect needs to know it.
      </p>
      <ul>
        <li><strong>Advantage:</strong> Simple to set up</li>
        <li><strong>Weakness:</strong> One password for everyone. If one person's device is compromised or the password is weak, the entire network is at risk</li>
        <li><strong>Attack:</strong> Capture handshake → dictionary/brute force → crack the PSK</li>
      </ul>

      <h3>Enterprise (802.1X / RADIUS) — Corporate Networks</h3>
      <p>
        Enterprise authentication gives each user their own unique credentials (username + password). 
        A RADIUS server verifies each login. If one employee's credentials are compromised, only their 
        access is affected, not the whole network.
      </p>
      <ul>
        <li><strong>Advantage:</strong> Individual accounts, certificate-based auth, logging</li>
        <li><strong>Weakness:</strong> More complex to set up. Users can still be phished.</li>
        <li><strong>Attack:</strong> Evil Twin + fake RADIUS server → capture credentials</li>
      </ul>

      <Diagram title="PSK vs Enterprise Authentication">
{`
  PSK (Pre-Shared Key):
  ┌──────────────────────────────────────────────┐
  │  Everyone uses the same password              │
  │                                              │
  │  Alice ──"password123"──► Router             │
  │  Bob   ──"password123"──► Router             │
  │  Carol ──"password123"──► Router             │
  │                                              │
  │  If password is cracked, EVERYONE is exposed │
  └──────────────────────────────────────────────┘
  
  Enterprise (802.1X):
  ┌──────────────────────────────────────────────┐
  │  Each person has unique credentials           │
  │                                              │
  │  Alice ──"alice/Pass1"──► Router ──► RADIUS  │
  │  Bob   ──"bob/Pass2"────► Router ──► Server  │
  │  Carol ──"carol/Pass3"──► Router ──► (Auth)  │
  │                                              │
  │  If Bob's password is cracked, only Bob is   │
  │  affected. Admin can revoke just his access. │
  └──────────────────────────────────────────────┘
`}
      </Diagram>

      {/* ============================================================ */}
      {/* SECTION: How We Attack Each Type                             */}
      {/* ============================================================ */}
      <h2>⚔️ Attack Strategy Per Encryption Type</h2>

      <Diagram title="Attack Decision Tree">
{`
  What encryption does the target use?
  (Check airodump-ng ENC column)
  │
  ├─► OPN (Open / No encryption)
  │   └─ No password needed! Connect directly.
  │      But be careful — it might be a honeypot.
  │      All traffic is visible in plaintext.
  │
  ├─► WEP
  │   └─ Collect enough IVs (Initialization Vectors)
  │      └─ Use aircrack-ng to statistically crack the key
  │      └─ Takes: 5-30 minutes
  │      └─ Success rate: ~100%
  │
  ├─► WPA / WPA2 (PSK)
  │   ├─ Method 1: Capture handshake → dictionary attack
  │   │  └─ Success depends on password complexity
  │   ├─ Method 2: WPS attack (if WPS is enabled)
  │   │  └─ Brute force the WPS PIN (takes 2-10 hours)
  │   └─ Method 3: PMKID attack (clientless!)
  │      └─ No need to deauth anyone
  │
  ├─► WPA2 (Enterprise)
  │   └─ Evil Twin + Fake RADIUS server
  │      └─ Capture user credentials
  │
  └─► WPA3
      └─ Very difficult to crack
         ├─ No offline dictionary attacks (SAE)
         ├─ Deauth doesn't work (PMF required)
         └─ May need to target transition mode
            (if WPA2 fallback is enabled)
`}
      </Diagram>

      <InfoBox type="note">
        <strong>What you'll see in airodump-ng:</strong>
        <ul>
          <li><code>OPN</code> — Open network (no encryption)</li>
          <li><code>WEP</code> — WEP encryption (easily crackable)</li>
          <li><code>WPA</code> with <code>TKIP</code> — WPA version 1</li>
          <li><code>WPA2</code> with <code>CCMP</code> — WPA2 with AES (most common)</li>
          <li><code>WPA2</code> with <code>TKIP</code> — WPA2 with older cipher (uncommon, less secure)</li>
          <li><code>WPA3</code> with <code>SAE</code> — WPA3 (hardest to crack)</li>
        </ul>
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: Why WEP is Still Relevant                           */}
      {/* ============================================================ */}
      <h2>🤔 Why Learn About WEP in 2024?</h2>

      <p>
        You might wonder why we cover WEP at all — it's ancient and broken. Here's why:
      </p>

      <ol>
        <li><strong>It still exists!</strong> Some legacy devices (old printers, industrial systems, IoT) 
            only support WEP. In penetration testing, you <em>will</em> encounter it.</li>
        <li><strong>Educational value:</strong> WEP cracking teaches you fundamental concepts — IV collection, 
            statistical attacks, and the importance of proper key management — that apply to understanding 
            modern security.</li>
        <li><strong>Easy wins:</strong> If you find a WEP network during a pentest, it's an easy access 
            point that demonstrates critical vulnerability to the client.</li>
        <li><strong>Foundation:</strong> Understanding why WEP failed helps you understand why WPA/WPA2 
            are designed the way they are.</li>
      </ol>

      <InfoBox type="warning">
        <strong>The arms race continues:</strong> Even WPA2 has weaknesses — it's only as strong as 
        the password. A WPA2 network with the password "12345678" can be cracked in seconds. The 
        encryption algorithm isn't broken, but human password choices are. This is why WPA3 introduced 
        SAE — to make offline password cracking impossible.
      </InfoBox>

      <InfoBox type="success">
        <strong>Key Takeaways:</strong>
        <ul>
          <li>WiFi encryption has evolved: WEP → WPA → WPA2 → WPA3</li>
          <li>WEP is fundamentally broken — crackable in minutes regardless of password strength</li>
          <li>WPA/WPA2 depend on password strength — weak passwords = easy crack</li>
          <li>WPA3 is the most secure but adoption is still limited</li>
          <li>Always check the ENC column in airodump-ng to determine your attack strategy</li>
          <li>PSK networks share one password; Enterprise networks have per-user credentials</li>
        </ul>
      </InfoBox>

      <h2>📚 What's Next?</h2>
      <p>
        In the next section, we'll deep dive into <strong>WEP Theory</strong> — understanding exactly 
        how WEP works and why its design makes it so easy to crack. Then we'll move on to hands-on 
        WEP cracking!
      </p>
    </div>
  );
};

export default GainingAccessIntro;
