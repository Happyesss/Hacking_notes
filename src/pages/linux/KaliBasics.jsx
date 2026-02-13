import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';
import { Troubleshooting, TroubleItem } from '../../components/Troubleshooting';

export default function KaliBasics() {
  return (
    <div className="content-area">
      <div className="topic-header">
        <div className="topic-breadcrumb">Linux Basics <span>/</span> Kali Basics</div>
        <h1>Kali Linux Basics</h1>
        <p className="topic-desc">Kali Linux is a Debian-based distribution designed for penetration testing and security auditing. It comes pre-loaded with 600+ security tools.</p>
      </div>

      <div className="topic-section">
        <h2>What is Kali Linux?</h2>
        <p>Kali Linux is the industry-standard platform for offensive security. It is maintained by Offensive Security and is specifically designed for:</p>
        <ul>
          <li><strong>Penetration Testing</strong> — Testing network/application security</li>
          <li><strong>Security Research</strong> — Finding and analyzing vulnerabilities</li>
          <li><strong>Computer Forensics</strong> — Analyzing digital evidence</li>
          <li><strong>Reverse Engineering</strong> — Analyzing compiled software</li>
        </ul>

        <Diagram title="Kali Linux Ecosystem">
{`┌─────────────────────────────────────────────────┐
│                  KALI LINUX                      │
│            (Debian-based distro)                 │
├─────────────┬─────────────┬─────────────────────┤
│  Network    │  Web App    │  Wireless            │
│  Tools      │  Tools      │  Tools               │
│ ─────────── │ ─────────── │ ───────────────────  │
│ • Nmap      │ • Burp Suite│ • Aircrack-ng        │
│ • Wireshark │ • SQLmap    │ • Wifite             │
│ • Netcat    │ • Nikto     │ • Reaver             │
│ • Hydra     │ • ZAP       │ • Kismet             │
├─────────────┼─────────────┼─────────────────────┤
│  Password   │  Forensics  │  Exploitation        │
│  Tools      │  Tools      │  Frameworks          │
│ ─────────── │ ─────────── │ ───────────────────  │
│ • John      │ • Autopsy   │ • Metasploit         │
│ • Hashcat   │ • Volatility│ • BeEF               │
│ • Crunch    │ • Binwalk   │ • SET                │
└─────────────┴─────────────┴─────────────────────┘`}
        </Diagram>
      </div>

      <div className="topic-section">
        <h2>Installation Options</h2>
        <p>There are several ways to run Kali Linux:</p>

        <table className="info-table">
          <thead>
            <tr>
              <th>Method</th>
              <th>Best For</th>
              <th>Pros</th>
              <th>Cons</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Virtual Machine</strong></td>
              <td>Beginners, Learning</td>
              <td>Safe, easy snapshots</td>
              <td>Slower, USB passthrough needed</td>
            </tr>
            <tr>
              <td><strong>Dual Boot</strong></td>
              <td>Full hardware access</td>
              <td>Full performance</td>
              <td>Risky if done wrong</td>
            </tr>
            <tr>
              <td><strong>Live USB</strong></td>
              <td>Portable testing</td>
              <td>No install needed</td>
              <td>No persistence by default</td>
            </tr>
            <tr>
              <td><strong>WSL2</strong></td>
              <td>Windows users</td>
              <td>Easy setup</td>
              <td>Limited hardware access</td>
            </tr>
          </tbody>
        </table>

        <InfoBox type="tip" title="Recommended Setup">
          <p>For learning, use <strong>VirtualBox or VMware</strong> with the official Kali VM image from <code className="inline-code">kali.org/get-kali</code>. This way you can take snapshots and revert if anything breaks.</p>
        </InfoBox>
      </div>

      <div className="topic-section">
        <h2>First Steps After Installation</h2>

        <h3>Update the System</h3>
        <p>Always update Kali first to get the latest tools and patches:</p>
        <Terminal title="Update Kali Linux" lines={[
          [{ type: 'prompt', text: '┌──(kali㉿kali)-[~]\n└─$ ' }, { type: 'command', text: 'sudo apt update && sudo apt upgrade -y' }],
          [{ type: 'output', text: 'Hit:1 http://kali.download/kali kali-rolling InRelease' }],
          [{ type: 'output', text: 'Reading package lists... Done' }],
          [{ type: 'output', text: 'Building dependency tree... Done' }],
        ]} />

        <h3>Check Kali Version</h3>
        <Terminal title="Version Check" lines={[
          [{ type: 'prompt', text: '┌──(kali㉿kali)-[~]\n└─$ ' }, { type: 'command', text: 'cat /etc/os-release' }],
          [{ type: 'output', text: 'PRETTY_NAME="Kali GNU/Linux Rolling"' }],
          [{ type: 'output', text: 'NAME="Kali GNU/Linux"' }],
          [{ type: 'output', text: 'VERSION_ID="2024.4"' }],
        ]} />

        <h3>Default Credentials</h3>
        <InfoBox type="note">
          <p>Default login for Kali Linux: Username: <code className="inline-code">kali</code> Password: <code className="inline-code">kali</code>. Change it immediately after first login.</p>
        </InfoBox>

        <Terminal title="Change Password" lines={[
          [{ type: 'prompt', text: '┌──(kali㉿kali)-[~]\n└─$ ' }, { type: 'command', text: 'passwd' }],
          [{ type: 'output', text: 'Changing password for kali.' }],
          [{ type: 'output', text: 'Current password: ' }],
          [{ type: 'output', text: 'New password: ' }],
          [{ type: 'output', text: 'Retype new password: ' }],
          [{ type: 'output', text: 'passwd: password updated successfully' }],
        ]} />
      </div>

      <div className="topic-section">
        <h2>Key Directories in Kali</h2>
        <table className="info-table">
          <thead>
            <tr>
              <th>Path</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>/usr/share/</code></td><td>Where most tools store their data files</td></tr>
            <tr><td><code>/usr/share/wordlists/</code></td><td>Pre-installed wordlists (e.g., rockyou.txt)</td></tr>
            <tr><td><code>/usr/bin/</code></td><td>System-wide executables</td></tr>
            <tr><td><code>/etc/</code></td><td>Configuration files</td></tr>
            <tr><td><code>/tmp/</code></td><td>Temporary files (cleared on reboot)</td></tr>
            <tr><td><code>/opt/</code></td><td>Optional/third-party software</td></tr>
          </tbody>
        </table>
      </div>

      <Troubleshooting>
        <TroubleItem issue="Screen resolution too small in VM">
          <p>Install VirtualBox Guest Additions or VMware Tools:</p>
          <Terminal title="Fix Resolution" lines={[
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo apt install -y virtualbox-guest-x11' }],
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo reboot' }],
          ]} />
        </TroubleItem>
        <TroubleItem issue="No network connection in VM">
          <p>Check VM network adapter settings. It should be set to <strong>NAT</strong> or <strong>Bridged Adapter</strong>.</p>
          <div className="solution">Solution:</div>
          <p>In VirtualBox: Settings → Network → Attached to: NAT (or Bridged). Then restart networking:</p>
          <Terminal title="Restart Network" lines={[
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo systemctl restart NetworkManager' }],
          ]} />
        </TroubleItem>
        <TroubleItem issue="apt update fails with GPG errors">
          <div className="solution">Solution:</div>
          <p>Re-import the Kali signing key:</p>
          <Terminal title="Fix GPG" lines={[
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'wget -q -O - https://archive.kali.org/archive-key.asc | sudo apt-key add' }],
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo apt update' }],
          ]} />
        </TroubleItem>
        <TroubleItem issue="USB device not recognized in VM">
          <div className="solution">Solution:</div>
          <p>Install VirtualBox Extension Pack, add your user to the <code className="inline-code">vboxusers</code> group, then enable USB passthrough in VM settings.</p>
          <Terminal title="Fix USB" lines={[
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo usermod -aG vboxusers $USER' }],
          ]} />
        </TroubleItem>
      </Troubleshooting>
    </div>
  );
}
