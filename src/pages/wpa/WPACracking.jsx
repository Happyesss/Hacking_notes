import React from 'react';
import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

const WPACracking = () => {
  return (
    <div className="page-content">
      <h1>Cracking WPA/WPA2 — Aircrack-ng & Hashcat</h1>

      <p>
        You've captured the handshake. You've prepared your wordlist. Now comes the moment of truth — 
        <strong>testing every password in your list against the captured handshake</strong>. For each 
        password guess, the cracking tool computes: <em>Password + SSID → PMK → PTK → MIC</em>, then 
        compares the computed MIC with the one captured in the handshake. Match? Password found! 
        No match? Try the next one.
      </p>

      <Diagram title="What Happens for Each Password Guess">
{`
  For EACH password in your wordlist:
  
  "password123"  +  "TargetNetwork"  (SSID)
        │                  │
        ▼                  ▼
  ┌─────────────────────────────────┐
  │  PBKDF2 (4096 iterations)      │   ← This is why it's SLOW
  │  Deliberately computationally   │      (anti-brute-force measure)
  │  expensive                      │
  └─────────────────────────────────┘
                 │
                 ▼
         PMK (256-bit key)
                 │
                 ▼
  PMK + ANonce + SNonce + MACs
                 │
                 ▼
  ┌─────────────────────────────────┐
  │  PRF (Pseudo-Random Function)   │
  └─────────────────────────────────┘
                 │
                 ▼
         PTK (512-bit key)
                 │
                 ├──► KCK (Key Confirmation Key)
                 │          │
                 │          ▼
                 │    Compute MIC
                 │          │
                 │          ▼
                 │    Compare with captured MIC
                 │          │
                 │          ├── MATCH? → PASSWORD FOUND! 🎉
                 │          └── No match? → Next password...
                 │
                 └──► (TK and KEK not needed for cracking)
`}
      </Diagram>

      {/* ============================================================ */}
      {/* SECTION: Aircrack-ng                                         */}
      {/* ============================================================ */}
      <h2>🖥️ Method 1: Cracking with Aircrack-ng (CPU)</h2>

      <p>
        <strong>Aircrack-ng</strong> is the easiest and most accessible way to crack WPA. It uses 
        your CPU, which means it works everywhere — no special GPU needed. The downside? It's 
        relatively slow: typically 3,000-5,000 passwords per second on a modern CPU.
      </p>

      <Terminal lines={[
        { segments: [{ text: '# Basic WPA2 crack with rockyou.txt', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo aircrack-ng -w /usr/share/wordlists/rockyou.txt -b AA:BB:CC:DD:EE:FF wpa_handshake-01.cap', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '                                 Aircrack-ng 1.7', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '      [00:01:52] 35684/14344392 keys tested (3220.15 k/s)', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '      Time left: 1 hour, 13 minutes, 45 seconds              0.25%', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '                        Current passphrase: michael2001', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '      Master Key     : A1 B2 C3 D4 E5 F6 ...', type: 'output' }] },
        { segments: [{ text: '      Transient Key  : 1A 2B 3C 4D 5E 6F ...', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# ... time passes ... then:', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '                    KEY FOUND! [ password123 ]', type: 'highlight' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '      Master Key     : A1 B2 C3 D4 E5 F6 78 9A BC DE F0 12 34 56 78 9A', type: 'output' }] },
        { segments: [{ text: '      Transient Key  : 1A 2B 3C 4D 5E 6F 78 9A BC DE F0 12 34 56 78 9A', type: 'output' }] },
        { segments: [{ text: '                       AB CD EF 01 23 45 67 89 AB CD EF 01 23 45 67 89', type: 'output' }] },
        { segments: [{ text: '      EAPOL HMAC     : AB CD EF 01 23 45 67 89 AB CD EF 01 23 45 67 89', type: 'output' }] },
      ]} />

      <InfoBox type="success">
        <strong>Password found!</strong> The WiFi password is shown after <code>KEY FOUND!</code>. 
        In this example: <code>password123</code>. You can now connect to the network using this password.
      </InfoBox>

      <h3>Aircrack-ng Command Options</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Flag</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Purpose</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={{ padding: '8px' }}><code>-w</code></td><td style={{ padding: '8px' }}>Path to wordlist (or <code>-</code> for stdin)</td><td style={{ padding: '8px' }}><code>-w rockyou.txt</code></td></tr>
          <tr><td style={{ padding: '8px' }}><code>-b</code></td><td style={{ padding: '8px' }}>Target BSSID (router MAC)</td><td style={{ padding: '8px' }}><code>-b AA:BB:CC:DD:EE:FF</code></td></tr>
          <tr><td style={{ padding: '8px' }}><code>-l</code></td><td style={{ padding: '8px' }}>Save found key to file</td><td style={{ padding: '8px' }}><code>-l found_key.txt</code></td></tr>
          <tr><td style={{ padding: '8px' }}><code>-e</code></td><td style={{ padding: '8px' }}>Target ESSID (network name)</td><td style={{ padding: '8px' }}><code>-e TargetNetwork</code></td></tr>
        </tbody>
      </table>

      {/* ============================================================ */}
      {/* SECTION: Hashcat (GPU)                                       */}
      {/* ============================================================ */}
      <h2>⚡ Method 2: Cracking with Hashcat (GPU)</h2>

      <p>
        <strong>Hashcat</strong> uses your GPU (graphics card) for cracking, which is 
        <strong> 10x to 100x faster</strong> than aircrack-ng on CPU. A mid-range GPU can test 
        300,000-500,000 passwords per second. A high-end GPU like an RTX 4090 can exceed 
        1,000,000 per second. The tradeoff? You need proper GPU drivers installed (CUDA for NVIDIA 
        or OpenCL for AMD).
      </p>

      <h3>Step 1: Convert .cap to Hashcat format</h3>
      <Terminal lines={[
        { segments: [{ text: '# Hashcat can\'t read .cap files directly', type: 'comment' }] },
        { segments: [{ text: '# Convert to .hc22000 format using hcxpcapngtool', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Install hcxtools if not present', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo apt install hcxtools', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Convert the capture file', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'hcxpcapngtool -o hash.hc22000 wpa_handshake-01.cap', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: 'Networks detected: 1', type: 'output' }] },
        { segments: [{ text: 'EAPOL pairs written to hash.hc22000: 1', type: 'highlight' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# If it says "0 pairs written" → your capture doesn\'t have a valid handshake', type: 'comment' }] },
      ]} />

      <h3>Step 2: Run Hashcat</h3>
      <Terminal lines={[
        { segments: [{ text: '# Dictionary attack with GPU', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'hashcat -m 22000 hash.hc22000 /usr/share/wordlists/rockyou.txt', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: 'hashcat (v6.2.6) starting', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: 'OpenCL API (OpenCL 3.0 CUDA 12.2.148) - Platform #1 [NVIDIA Corporation]', type: 'output' }] },
        { segments: [{ text: '* Device #1: NVIDIA GeForce RTX 3070, 6144/8192 MB, 46MCU', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: 'Hash.Mode........: 22000 (WPA-PBKDF2-PMKID+EAPOL)', type: 'output' }] },
        { segments: [{ text: 'Hash.Target......: hash.hc22000', type: 'output' }] },
        { segments: [{ text: 'Speed.#1.........:   452.3 kH/s (8.12ms) @ Accel:64 Loops:128', type: 'highlight' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# 452,300 passwords per second! vs ~3,000 with aircrack-ng', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: 'hash.hc22000:password123', type: 'highlight' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: 'Session..........: hashcat', type: 'output' }] },
        { segments: [{ text: 'Status...........: Cracked', type: 'highlight' }] },
      ]} />

      <h3>Hashcat with Rules — Smarter than Brute Force</h3>
      <p>
        Rules tell hashcat to <em>mutate</em> each word in the wordlist. For example, for the word 
        "password", rules might test: Password, PASSWORD, password1, password!, p@ssword, 
        passw0rd, drowssap (reversed), etc. This dramatically increases coverage without needing 
        a larger wordlist.
      </p>

      <Terminal lines={[
        { segments: [{ text: '# Use the "best64" rule — tests 64 variations of each word', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'hashcat -m 22000 hash.hc22000 /usr/share/wordlists/rockyou.txt -r /usr/share/hashcat/rules/best64.rule', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Each word gets 64 variations: capital, numbers, special chars, etc.', type: 'comment' }] },
        { segments: [{ text: '# 14M words × 64 rules = 921M effective passwords tested!', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# More aggressive: rockyou-30000 rule', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'hashcat -m 22000 hash.hc22000 /usr/share/wordlists/rockyou.txt -r /usr/share/hashcat/rules/rockyou-30000.rule', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Common hashcat rules available:', type: 'comment' }] },
        { segments: [{ text: '# best64.rule         → 64 variations (fast, good coverage)', type: 'comment' }] },
        { segments: [{ text: '# d3ad0ne.rule        → 34,000 variations (thorough)', type: 'comment' }] },
        { segments: [{ text: '# rockyou-30000.rule  → 30,000 variations (very thorough)', type: 'comment' }] },
        { segments: [{ text: '# dive.rule           → 99,000 variations (exhaustive)', type: 'comment' }] },
      ]} />

      <InfoBox type="note">
        <strong>What rules actually do:</strong> When hashcat applies the <code>best64</code> rule 
        to the word "admin", it tests variations like:
        <br />admin, Admin, ADMIN, admin1, admin2, admin!, admin@, admin123, 
        nimda (reversed), 1admin, @admin, adm1n, and 50+ more.
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: Speed Comparison                                    */}
      {/* ============================================================ */}
      <h2>📊 Speed Comparison</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Tool</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Hardware</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Speed (keys/sec)</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>rockyou.txt Time</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={{ padding: '8px' }}>aircrack-ng</td><td style={{ padding: '8px' }}>CPU (i5)</td><td style={{ padding: '8px' }}>~2,000</td><td style={{ padding: '8px' }}>~2 hours</td></tr>
          <tr><td style={{ padding: '8px' }}>aircrack-ng</td><td style={{ padding: '8px' }}>CPU (i9)</td><td style={{ padding: '8px' }}>~5,000</td><td style={{ padding: '8px' }}>~48 minutes</td></tr>
          <tr><td style={{ padding: '8px' }}>hashcat</td><td style={{ padding: '8px' }}>GPU (GTX 1660)</td><td style={{ padding: '8px' }}>~150,000</td><td style={{ padding: '8px' }}>~1.5 minutes</td></tr>
          <tr><td style={{ padding: '8px' }}>hashcat</td><td style={{ padding: '8px' }}>GPU (RTX 3070)</td><td style={{ padding: '8px' }}>~450,000</td><td style={{ padding: '8px' }}>~32 seconds</td></tr>
          <tr><td style={{ padding: '8px' }}>hashcat</td><td style={{ padding: '8px' }}>GPU (RTX 4090)</td><td style={{ padding: '8px' }}>~1,200,000</td><td style={{ padding: '8px' }}>~12 seconds</td></tr>
        </tbody>
      </table>

      <InfoBox type="tip">
        <strong>VM users:</strong> If you're running Kali in a VM (VirtualBox/VMware), your GPU 
        is not passed through by default. Hashcat will fall back to CPU mode and be very slow. 
        Options: (1) Use aircrack-ng instead, (2) Set up GPU passthrough, (3) Copy the hash file 
        to your host OS and run hashcat there.
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: Edge Cases                                          */}
      {/* ============================================================ */}
      <h2>⚠️ Edge Cases & Troubleshooting</h2>

      <h3>Edge Case: "KEY NOT FOUND" — exhausted wordlist</h3>
      <Terminal lines={[
        { segments: [{ text: '# aircrack-ng has tested every password — none matched', type: 'comment' }] },
        { segments: [{ text: 'KEY NOT FOUND', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# This means the password is NOT in your wordlist.', type: 'comment' }] },
        { segments: [{ text: '# Options:', type: 'comment' }] },
        { segments: [{ text: '# 1. Try a bigger wordlist (download CrackStation list)', type: 'comment' }] },
        { segments: [{ text: '# 2. Create a targeted wordlist with crunch', type: 'comment' }] },
        { segments: [{ text: '# 3. Use hashcat rules for password mutations', type: 'comment' }] },
        { segments: [{ text: '# 4. Try WPS attack (reaver) if WPS is enabled', type: 'comment' }] },
        { segments: [{ text: '# 5. Accept that a strong random password = uncrackable', type: 'comment' }] },
      ]} />

      <h3>Edge Case: "Passphrase must have between 8 and 63 characters"</h3>
      <p>
        This is just a warning — aircrack-ng skips passwords shorter than 8 characters (WPA minimum). 
        It's normal when using general-purpose wordlists. The tool continues with valid-length passwords.
      </p>

      <h3>Edge Case: Hashcat "No hashes loaded"</h3>
      <Terminal lines={[
        { segments: [{ text: '# The .hc22000 file is empty or conversion failed', type: 'comment' }] },
        { segments: [{ text: '# Check if the file has content:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'cat hash.hc22000', type: 'command' }] },
        { segments: [{ text: '# If empty → recapture the handshake or re-convert', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Alternatively, use the older cap2hccapx converter:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'cap2hccapx wpa_handshake-01.cap hash.hccapx', type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'hashcat -m 2500 hash.hccapx /usr/share/wordlists/rockyou.txt', type: 'command' }] },
      ]} />

      <h3>Edge Case: Hashcat "CUDA/OpenCL not found"</h3>
      <Terminal lines={[
        { segments: [{ text: '# GPU drivers not installed. For NVIDIA:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo apt install nvidia-driver nvidia-cuda-toolkit', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# For AMD:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo apt install mesa-opencl-icd', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# In a VM: GPU passthrough is complex.', type: 'comment' }] },
        { segments: [{ text: '# Easier: copy hash file to host and run hashcat there', type: 'comment' }] },
      ]} />

      <h3>Edge Case: Cracking is extremely slow</h3>
      <p>
        WPA2 uses PBKDF2 with 4096 iterations — it's intentionally slow. This is by design to 
        make brute-force impractical. Strategies to speed up:
      </p>
      <ul>
        <li><strong>Use GPU (hashcat)</strong> instead of CPU (aircrack-ng) — 100x faster</li>
        <li><strong>Use targeted wordlists</strong> — fewer passwords to test</li>
        <li><strong>Use rules</strong> — smarter mutations instead of blind brute force</li>
        <li><strong>Pre-compute PMK</strong> with <code>airolib-ng</code> for specific SSIDs</li>
      </ul>

      <InfoBox type="success">
        <strong>Key Takeaways:</strong>
        <ul>
          <li><strong>aircrack-ng:</strong> Easy, CPU-based, ~3K-5K passwords/sec. Good for quick checks.</li>
          <li><strong>hashcat:</strong> GPU-based, ~150K-1.2M passwords/sec. Use for serious cracking.</li>
          <li><strong>Rules:</strong> Multiply your wordlist effectiveness by testing mutations of each word.</li>
          <li>If the password isn't found, you need a better wordlist — not more time.</li>
          <li>Strong random passwords (16+ chars) make WPA2 effectively uncrackable.</li>
        </ul>
      </InfoBox>
    </div>
  );
};

export default WPACracking;
