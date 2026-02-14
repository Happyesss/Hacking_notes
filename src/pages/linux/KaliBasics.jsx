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
        <p className="topic-desc">
          Kali Linux is a Debian-based distribution designed for penetration testing and security auditing.
          It comes pre-loaded with 600+ security tools, maintained by Offensive Security — the same team
          behind the OSCP certification. Think of it as the Swiss Army knife that every ethical hacker
          carries into the field.
        </p>
      </div>

      {/* ═══════════════════════════════════════ SECTION: What is Kali Linux? ═══════════════════════════════════════ */}
      <div className="topic-section">
        <h2>What is Kali Linux?</h2>

        <p>
          Imagine you are a <strong>locksmith</strong>. A homeowner hires you to test whether their new
          front-door lock can be picked. You don't show up empty-handed — you bring a specialized
          toolkit: tension wrenches, pick sets, bump keys, and bypass tools. You didn't build these
          tools from scratch; you bought a professional kit that has everything organized and ready
          to go. <strong>Kali Linux is that professional kit, but for computer security.</strong>
        </p>
        <p>
          Instead of lock picks, Kali ships with tools like <em>Nmap</em> (to scan networks),
          <em> Wireshark</em> (to inspect traffic), <em>Aircrack-ng</em> (to test wireless security),
          and <em>Metasploit</em> (to simulate real exploits). Every tool is pre-installed,
          pre-configured, and organized into categories — so when you sit down to do a security
          assessment, you can focus on the <em>job</em> rather than spending hours installing software.
        </p>

        <p>
          Kali Linux is maintained by <strong>Offensive Security</strong> (OffSec), the organization
          behind the renowned OSCP, OSWE, and OSEP certifications. It is specifically designed for:
        </p>
        <ul>
          <li><strong>Penetration Testing</strong> — Probing networks, applications, and systems for weaknesses</li>
          <li><strong>Security Research</strong> — Discovering and analyzing new vulnerabilities (CVEs)</li>
          <li><strong>Computer Forensics</strong> — Extracting and analyzing digital evidence from disks and memory</li>
          <li><strong>Reverse Engineering</strong> — Disassembling compiled binaries to understand or find flaws in software</li>
          <li><strong>Social Engineering Audits</strong> — Testing human factors with tools like the Social Engineering Toolkit (SET)</li>
        </ul>

        <img
          src="https://www.kali.org/images/kali-dragon-icon.svg"
          alt="Kali Linux dragon logo"
          style={{ maxWidth: 180, display: 'block', margin: '18px auto', borderRadius: 12 }}
        />
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', textAlign: 'center' }}>
          The Kali Linux dragon logo — the iconic symbol of offensive security. (Source: kali.org)
        </p>

        <InfoBox type="warning" title="Legal Disclaimer">
          <p>
            Kali Linux is designed for <strong>authorized security testing only</strong>. Using these tools
            against systems you do not own or do not have explicit written permission to test is
            <strong> illegal</strong> in virtually every jurisdiction and can result in criminal prosecution.
            Always have a signed authorization before you begin any engagement.
          </p>
        </InfoBox>
      </div>

      {/* ═══════════════════════════════════════ SECTION: History ═══════════════════════════════════════ */}
      <div className="topic-section">
        <h2>A Brief History — From BackTrack to Kali</h2>

        <p>
          Kali Linux didn't appear out of nowhere. It is the direct successor to <strong>BackTrack Linux</strong>,
          which itself was born from a merger of two earlier security distributions: <em>WHAX</em> and
          <em> Auditor Security Collection</em>. BackTrack ran from 2006 to 2013 and became the go-to
          distro for pentesters worldwide — but it had a fundamental problem: it was built on top of
          Ubuntu with a patchwork of scripts and manual tool installations. Over time, maintaining it
          became a nightmare.
        </p>
        <p>
          In <strong>March 2013</strong>, Offensive Security announced Kali Linux as a complete
          ground-up rebuild on top of <strong>Debian</strong>. This was a game-changer for several reasons:
        </p>
        <ul>
          <li><strong>Proper Debian packaging</strong> — Every tool is a real <code className="inline-code">.deb</code> package with dependency tracking, so updates no longer break the system</li>
          <li><strong>Rolling release model</strong> — Instead of major version jumps, Kali continuously receives the latest tool updates</li>
          <li><strong>FHS compliant filesystem</strong> — Files are where Linux standards say they should be, making it predictable</li>
          <li><strong>Git-based development</strong> — All packages are version-controlled and open-source</li>
          <li><strong>ARM support</strong> — Kali can run on Raspberry Pi, Android (via NetHunter), and other ARM devices</li>
        </ul>

        <Diagram title="Evolution Timeline">
{`  2004          2006              2013             Present
   —              —                 —                  —
   —              —                 —                  —
 WHAX  ——                                             
         ————  BackTrack  ———————  Kali Linux  ———  Kali Rolling
 Auditor —     (Ubuntu)           (Debian)          (Continuous)
                                                        
 Features:      Features:         Features:            
 — Basic tools  — 300+ tools      — 600+ tools         
 — Live CD      — GUI installer   — Debian packages    
                — BackTrack 5R3   — ARM / NetHunter    
                  was the last    — Cloud images       
                  release         — WSL support`}
        </Diagram>

        <InfoBox type="note" title="Why the Name?">
          <p>
            "Kali" comes from the Hindu goddess of destruction and transformation. The name reflects the
            distribution's purpose: tearing apart insecure systems so they can be rebuilt stronger. It has
            no connection to the martial art "Kali" (Eskrima) from the Philippines.
          </p>
        </InfoBox>
      </div>

      {/* ═══════════════════════════════════════ SECTION: Kali Ecosystem ═══════════════════════════════════════ */}
      <div className="topic-section">
        <h2>The Kali Linux Tool Ecosystem</h2>
        <p>
          One of the biggest advantages of Kali is that tools are organized into logical categories.
          When you open the application menu, you will see categories that match the phases of a
          penetration test. Here is an overview of the major tool categories and their flagship tools:
        </p>

        <Diagram title="Kali Linux Tool Ecosystem">
{`————————————————————————————————————————————————————————————
—                      KALI LINUX                          —
—              (Debian-based ?? Rolling Release)            —
————————————————————————————————————————————————————————————
—  Information —  Vulnerability—  Wireless                 —
—  Gathering   —  Analysis     —  Attacks                  —
— ———————————— — ——————————————— ————————————————————————  —
— — Nmap       — — Nikto       — — Aircrack-ng             —
— — Recon-ng   — — OpenVAS     — — Wifite                  —
— — theHarvester— — WPScan     — — Reaver                  —
— — Maltego    — — Nessus*     — — Kismet                  —
————————————————————————————————————————————————————————————
—  Web App     —  Password    —  Exploitation              —
—  Testing     —  Attacks     —  Frameworks                —
— ———————————— — ———————————— — —————————————————————————— —
— — Burp Suite — — John       — — Metasploit               —
— — SQLmap     — — Hashcat    — — BeEF                     —
— — ZAP Proxy  — — Hydra      — — SET (Social Eng.)        —
— — Commix     — — Crunch     — — Exploit-DB               —
————————————————————————————————————————————————————————————
—  Sniffing &  —  Forensics   —  Reverse                   —
—  Spoofing    —  & Recovery  —  Engineering               —
— ———————————— — ———————————— — —————————————————————————— —
— — Wireshark  — — Autopsy    — — Ghidra                   —
— — Ettercap   — — Volatility — — Radare2                  —
— — Bettercap  — — Binwalk    — — apktool                  —
— — mitmproxy  — — Foremost   — — jadx                     —
————————————————————————————————————————————————————————————
              * Nessus requires separate license`}
        </Diagram>
      </div>

      {/* ═══════════════════════════════════════ SECTION: Installation Options ═══════════════════════════════════════ */}
      <div className="topic-section">
        <h2>Installation Options</h2>
        <p>
          There are several ways to run Kali Linux, each with trade-offs. Your choice depends on
          what you need: if you are learning, a virtual machine is the safest bet. If you need
          full hardware access (especially for wireless adapters), dual boot or bare metal is better.
        </p>

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
              <td><strong>Virtual Machine (VM)</strong></td>
              <td>Beginners, Learning, Labs</td>
              <td>Safe isolation, snapshots, easy reset</td>
              <td>Slower performance, USB passthrough required for wireless adapters</td>
            </tr>
            <tr>
              <td><strong>Dual Boot</strong></td>
              <td>Full hardware access</td>
              <td>Native performance, direct hardware access</td>
              <td>Risk of data loss if partitioning goes wrong, need to reboot to switch OS</td>
            </tr>
            <tr>
              <td><strong>Live USB (Persistent)</strong></td>
              <td>Portable testing, on-site work</td>
              <td>No installation needed, carry in your pocket</td>
              <td>Slower than HDD/SSD, persistence requires extra setup</td>
            </tr>
            <tr>
              <td><strong>WSL2 (Windows)</strong></td>
              <td>Quick CLI access on Windows</td>
              <td>Easy setup, runs alongside Windows</td>
              <td>No GUI by default, very limited hardware access, no raw sockets</td>
            </tr>
            <tr>
              <td><strong>Cloud (AWS/Azure)</strong></td>
              <td>Remote engagements</td>
              <td>High bandwidth, accessible from anywhere</td>
              <td>No wireless testing, ongoing cost, latency</td>
            </tr>
            <tr>
              <td><strong>Raspberry Pi / ARM</strong></td>
              <td>Drop boxes, covert testing</td>
              <td>Tiny, cheap, can be left on-site</td>
              <td>Limited processing power, some tools may not work on ARM</td>
            </tr>
          </tbody>
        </table>

        <InfoBox type="tip" title="Recommended: VirtualBox or VMware">
          <p>
            For learning, download the official pre-built Kali VM image from
            <code className="inline-code"> kali.org/get-kali/#kali-virtual-machines</code>.
            These come as <code className="inline-code">.ova</code> (VirtualBox) or
            <code className="inline-code"> .vmx</code> (VMware) files — just double-click to import.
            No ISO installation required!
          </p>
        </InfoBox>

        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Virtualbox_logo.png"
          alt="VirtualBox logo"
          style={{ maxWidth: 80, display: 'inline-block', marginRight: 24, verticalAlign: 'middle' }}
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Vmware_workstation_16_icon.svg"
          alt="VMware logo"
          style={{ maxWidth: 80, display: 'inline-block', verticalAlign: 'middle' }}
        />
        <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
          VirtualBox (free, open-source) and VMware Workstation Player (free for personal use) are the
          two most popular hypervisors for running Kali. (Source: Wikimedia Commons)
        </p>
      </div>

      {/* ═══════════════════════════════════════ SECTION: VM Resource Allocation ═══════════════════════════════════════ */}
      <div className="topic-section">
        <h2>VM Resource Allocation Guide</h2>
        <p>
          Getting the VM resources right is crucial. Too little RAM and Kali will crawl; too many CPU
          cores and your host OS will suffer. Here are the recommended allocations:
        </p>

        <table className="info-table">
          <thead>
            <tr>
              <th>Resource</th>
              <th>Minimum</th>
              <th>Recommended</th>
              <th>Heavy Use (Hashcat, Burp, etc.)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>RAM</strong></td>
              <td>2 GB</td>
              <td>4 GB</td>
              <td>8+ GB</td>
            </tr>
            <tr>
              <td><strong>CPU Cores</strong></td>
              <td>1</td>
              <td>2</td>
              <td>4+ (leave at least 2 for host)</td>
            </tr>
            <tr>
              <td><strong>Disk Space</strong></td>
              <td>20 GB</td>
              <td>50 GB</td>
              <td>80+ GB (wordlists + captures)</td>
            </tr>
            <tr>
              <td><strong>Video Memory</strong></td>
              <td>32 MB</td>
              <td>128 MB</td>
              <td>128 MB (enable 3D acceleration)</td>
            </tr>
            <tr>
              <td><strong>Network</strong></td>
              <td>NAT</td>
              <td>NAT + Host-Only</td>
              <td>NAT + Host-Only + Bridged</td>
            </tr>
          </tbody>
        </table>

        <InfoBox type="warning" title="Don't Starve Your Host">
          <p>
            Always leave your host OS at least <strong>4 GB RAM</strong> and <strong>2 CPU cores</strong>.
            If your host runs out of resources, the entire system (including the VM) will become
            unresponsive. On a system with 8 GB total RAM, give Kali 4 GB maximum.
          </p>
        </InfoBox>

        <Diagram title="Network Adapter Modes in VirtualBox">
{`———————————————————————————————————————————————————————————————
—                    HOST MACHINE                             —
—  ————————————————————————————————————————————————————————   —
—  —                  KALI VM                              —   —
—  —                                                       —   —
—  —  eth0 (NAT)           ———  Internet access            —   —
—  —  eth1 (Host-Only)     ———  Talk to host + other VMs   —   —
—  —  eth2 (Bridged)       ———  Appear on real LAN         —   —
—  —  wlan0 (USB Passthru) ———  Wireless testing           —   —
—  ————————————————————————————————————————————————————————   —
—                                                             —
—  NAT        = VM can reach internet, but is hidden from LAN —
—  Host-Only  = VM can talk to host, but NOT the internet     —
—  Bridged    = VM gets its own IP on the physical network    —
———————————————————————————————————————————————————————————————`}
        </Diagram>
      </div>

      {/* ═══════════════════════════════════════ SECTION: First Steps After Installation ═══════════════════════════════════════ */}
      <div className="topic-section">
        <h2>First Steps After Installation</h2>
        <p>
          You have just imported or installed Kali Linux. Before you start hacking anything, you need
          to set up a solid foundation. Think of this as a pilot going through a pre-flight checklist —
          skip a step and things can go wrong mid-engagement.
        </p>

        <h3>1. Update the System</h3>
        <p>
          Kali is a rolling distribution, meaning tools are updated continuously. The first thing you
          should always do is pull the latest updates. This ensures you have the newest tool versions
          and security patches:
        </p>
        <Terminal title="Update Kali Linux" lines={[
          [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'sudo apt update' }],
          [{ type: 'output', text: 'Hit:1 http://kali.download/kali kali-rolling InRelease' }],
          [{ type: 'output', text: 'Reading package lists... Done' }],
          [{ type: 'output', text: 'All packages are up to date.' }],
          [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'sudo apt full-upgrade -y' }],
          [{ type: 'output', text: 'Reading package lists... Done' }],
          [{ type: 'output', text: 'Building dependency tree... Done' }],
          [{ type: 'output', text: 'Calculating upgrade... Done' }],
          [{ type: 'output', text: '142 upgraded, 12 newly installed, 3 to remove.' }],
        ]} />

        <InfoBox type="tip" title="apt update vs apt full-upgrade">
          <p>
            <code className="inline-code">apt update</code> only refreshes the package list (like checking
            a catalog). <code className="inline-code">apt full-upgrade</code> actually installs the updates
            AND handles dependency changes (adding/removing packages as needed). Use
            <code className="inline-code"> full-upgrade</code> instead of just
            <code className="inline-code"> upgrade</code> on Kali to avoid broken dependencies.
          </p>
        </InfoBox>

        <h3>2. Check Your Kali Version</h3>
        <p>Knowing your exact version is important when reporting bugs or following tutorials:</p>
        <Terminal title="Version Check" lines={[
          [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'cat /etc/os-release' }],
          [{ type: 'output', text: 'PRETTY_NAME="Kali GNU/Linux Rolling"' }],
          [{ type: 'output', text: 'NAME="Kali GNU/Linux"' }],
          [{ type: 'output', text: 'VERSION_ID="2024.4"' }],
          [{ type: 'output', text: 'VERSION="2024.4"' }],
          [{ type: 'output', text: 'ID=kali' }],
          [{ type: 'output', text: 'ID_LIKE=debian' }],
        ]} />

        <h3>3. Change the Default Password</h3>
        <p>
          The pre-built VM images ship with default credentials. If you leave the default password,
          anyone on your network could SSH into your Kali box. Change it immediately:
        </p>

        <InfoBox type="danger" title="Default Credentials">
          <p>
            Default login — Username: <code className="inline-code">kali</code> / Password:
            <code className="inline-code"> kali</code>. These are publicly known. Leaving them unchanged is
            like leaving your house key under the doormat with a neon sign pointing to it.
          </p>
        </InfoBox>

        <Terminal title="Change Password" lines={[
          [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'passwd' }],
          [{ type: 'output', text: 'Changing password for kali.' }],
          [{ type: 'output', text: 'Current password: ' }],
          [{ type: 'output', text: 'New password: ' }],
          [{ type: 'output', text: 'Retype new password: ' }],
          [{ type: 'highlight', text: 'passwd: password updated successfully' }],
        ]} />

        <h3>4. Set Your Timezone</h3>
        <p>Accurate timestamps matter for logging and forensics:</p>
        <Terminal title="Set Timezone" lines={[
          [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'sudo timedatectl set-timezone America/New_York' }],
          [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'timedatectl' }],
          [{ type: 'output', text: '               Local time: Sat 2025-02-14 10:30:00 EST' }],
          [{ type: 'output', text: '           Universal time: Sat 2025-02-14 15:30:00 UTC' }],
          [{ type: 'output', text: '                 RTC time: Sat 2025-02-14 15:30:00' }],
          [{ type: 'output', text: '                Time zone: America/New_York (EST, -0500)' }],
        ]} />

        <h3>5. Install Additional Tool Packs (Optional)</h3>
        <p>
          Kali has metapackages that bundle tools by category. If you downloaded the smaller image,
          you can add the full toolset:
        </p>
        <Terminal title="Install Tool Packs" lines={[
          [{ type: 'comment', text: '# Install the default full toolset (takes a while)' }],
          [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'sudo apt install -y kali-linux-default' }],
          [{ type: 'comment', text: '# Or install EVERYTHING (1000+ packages, ~15 GB)' }],
          [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'sudo apt install -y kali-linux-everything' }],
          [{ type: 'comment', text: '# Or install specific categories only' }],
          [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'sudo apt install -y kali-tools-wireless' }],
          [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'sudo apt install -y kali-tools-web' }],
        ]} />
      </div>

      {/* ═══════════════════════════════════════ SECTION: Desktop Environment ═══════════════════════════════════════ */}
      <div className="topic-section">
        <h2>Kali Desktop Environment (XFCE)</h2>
        <p>
          Since 2019, Kali ships with <strong>XFCE</strong> as its default desktop environment. XFCE was
          chosen because it is lightweight (uses less RAM and CPU than GNOME or KDE), highly customizable,
          and snappy even inside a virtual machine. Kali's XFCE theme is a custom dark theme called
          "Kali-Dark" with the signature blue/purple accent colors.
        </p>

        <h3>Key Desktop Shortcuts</h3>
        <table className="info-table">
          <thead>
            <tr>
              <th>Shortcut</th>
              <th>Action</th>
              <th>When to Use</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code className="inline-code">Ctrl + Alt + T</code></td>
              <td>Open terminal</td>
              <td>Most common action — opens a new terminal window instantly</td>
            </tr>
            <tr>
              <td><code className="inline-code">Super</code> (Windows key)</td>
              <td>Application menu</td>
              <td>Search and launch any installed tool by name</td>
            </tr>
            <tr>
              <td><code className="inline-code">Alt + F2</code></td>
              <td>Run dialog</td>
              <td>Quickly run a command without opening a full terminal</td>
            </tr>
            <tr>
              <td><code className="inline-code">Ctrl + Alt + D</code></td>
              <td>Show desktop</td>
              <td>Minimize all windows to see the desktop</td>
            </tr>
            <tr>
              <td><code className="inline-code">Alt + Tab</code></td>
              <td>Switch windows</td>
              <td>Cycle between open applications</td>
            </tr>
            <tr>
              <td><code className="inline-code">Ctrl + Alt + Del</code></td>
              <td>Lock screen / Log out</td>
              <td>Secure your session when stepping away</td>
            </tr>
          </tbody>
        </table>

        <InfoBox type="tip" title="Switching Desktop Environments">
          <p>
            If you prefer a different desktop environment, Kali supports GNOME, KDE Plasma, and i3
            (tiling window manager). Install them with
            <code className="inline-code"> sudo apt install kali-desktop-gnome</code> or
            <code className="inline-code"> kali-desktop-kde</code>. Then select your DE at the login screen.
          </p>
        </InfoBox>
      </div>

      {/* ═══════════════════════════════════════ SECTION: Post-Install Configuration ═══════════════════════════════════════ */}
      <div className="topic-section">
        <h2>Post-Install Configuration (VMs)</h2>
        <p>
          If you are running Kali in a virtual machine, there are several important configurations
          to do before you start any real work. Skipping these will lead to a frustrating experience.
        </p>

        <h3>Install Guest Additions / VMware Tools</h3>
        <p>
          Guest additions enable dynamic screen resizing, shared clipboard, drag-and-drop file
          transfer, and better graphics performance. Without them, you are stuck with a tiny
          fixed-resolution window:
        </p>
        <Terminal title="Install Guest Additions (VirtualBox)" lines={[
          [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'sudo apt update' }],
          [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'sudo apt install -y virtualbox-guest-x11' }],
          [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'sudo reboot' }],
        ]} />
        <Terminal title="Install Open VM Tools (VMware)" lines={[
          [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'sudo apt install -y open-vm-tools-desktop' }],
          [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'sudo reboot' }],
        ]} />

        <h3>Enable Shared Clipboard</h3>
        <p>
          Being able to copy-paste between your host and Kali is essential (especially for pasting
          long commands or copying hashes):
        </p>
        <ul>
          <li><strong>VirtualBox:</strong> VM Settings — General — Advanced — Shared Clipboard — Bidirectional</li>
          <li><strong>VMware:</strong> VM Settings — Options — Guest Isolation — Enable copy and paste</li>
        </ul>

        <h3>Set Up Shared Folders</h3>
        <p>
          Shared folders let you transfer files between your host and Kali without using the network.
          This is useful for moving wordlists, exploits, or captured data:
        </p>
        <Terminal title="Mount Shared Folder (VirtualBox)" lines={[
          [{ type: 'comment', text: '# In VirtualBox: Settings — Shared Folders — Add folder' }],
          [{ type: 'comment', text: '# Name it "shared", check "Auto-mount"' }],
          [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'sudo mkdir -p /mnt/shared' }],
          [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'sudo mount -t vboxsf shared /mnt/shared' }],
          [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'ls /mnt/shared' }],
          [{ type: 'output', text: 'wordlists/  tools/  notes.txt' }],
        ]} />

        <h3>Take Your First Snapshot</h3>
        <p>
          This is <strong>the single most important step</strong>. A snapshot saves the exact state of
          your VM. If you break something (and you will), you can revert to this clean snapshot in
          seconds instead of re-installing from scratch.
        </p>

        <InfoBox type="success" title="Snapshot Strategy">
          <p>
            Take snapshots at these key moments: <strong>(1)</strong> Right after fresh install + updates,
            <strong> (2)</strong> Before making major system changes,
            <strong> (3)</strong> Before each new engagement or lab exercise.
            Name them descriptively: "Clean Install 2025-02", "Pre-Lab3", etc.
          </p>
        </InfoBox>

        <Terminal title="VirtualBox Snapshots (from host terminal)" lines={[
          [{ type: 'comment', text: '# Take a snapshot from the command line (on the HOST)' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'VBoxManage snapshot "Kali-Linux" take "Clean-Install" --description "Fresh install with updates"' }],
          [{ type: 'output', text: '0%...10%...20%...30%...40%...50%...60%...70%...80%...90%...100%' }],
          [{ type: 'highlight', text: 'Snapshot taken. UUID: a1b2c3d4-e5f6-7890-abcd-ef1234567890' }],
          [{ type: 'comment', text: '# Or just use the GUI: Machine — Take Snapshot (Ctrl+Shift+S)' }],
        ]} />
      </div>

      {/* ═══════════════════════════════════════ SECTION: Key Directories ═══════════════════════════════════════ */}
      <div className="topic-section">
        <h2>Key Directories in Kali</h2>
        <p>
          Understanding the Linux filesystem is critical for penetration testing. You need to know where
          tools store their files, where to find wordlists, and where to drop your output. Here are the
          directories that matter most for hacking:
        </p>

        <table className="info-table">
          <thead>
            <tr>
              <th>Path</th>
              <th>Purpose</th>
              <th>Why It Matters for Hacking</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>/usr/share/</code></td>
              <td>Shared data files for installed programs</td>
              <td>Tools like Nmap store their scripts here (<code className="inline-code">/usr/share/nmap/scripts/</code>)</td>
            </tr>
            <tr>
              <td><code>/usr/share/wordlists/</code></td>
              <td>Pre-installed wordlists</td>
              <td>Contains <code className="inline-code">rockyou.txt</code> — the most-used password list for cracking WPA, hashes, and logins</td>
            </tr>
            <tr>
              <td><code>/usr/share/metasploit-framework/</code></td>
              <td>Metasploit installation</td>
              <td>Modules, exploits, payloads, and auxiliary scripts live here</td>
            </tr>
            <tr>
              <td><code>/usr/bin/</code></td>
              <td>System-wide executables</td>
              <td>When you type a command like <code className="inline-code">nmap</code>, it runs from here</td>
            </tr>
            <tr>
              <td><code>/etc/</code></td>
              <td>System configuration files</td>
              <td>Network configs (<code className="inline-code">/etc/network/</code>), DNS (<code className="inline-code">/etc/resolv.conf</code>), hosts file</td>
            </tr>
            <tr>
              <td><code>/tmp/</code></td>
              <td>Temporary files (cleared on reboot)</td>
              <td>Good place for temporary exploit output, but remember: it is wiped on reboot</td>
            </tr>
            <tr>
              <td><code>/opt/</code></td>
              <td>Optional/third-party software</td>
              <td>Manually installed tools (e.g., custom scripts, GitHub clones) often go here</td>
            </tr>
            <tr>
              <td><code>/var/log/</code></td>
              <td>System log files</td>
              <td>Check logs for service errors, or practice log analysis for forensics</td>
            </tr>
            <tr>
              <td><code>/home/kali/</code></td>
              <td>User home directory</td>
              <td>Your working directory — store engagement output, scripts, and notes here</td>
            </tr>
          </tbody>
        </table>

        <Terminal title="Explore Key Directories" lines={[
          [{ type: 'comment', text: '# Decompress the rockyou.txt wordlist (it comes gzipped)' }],
          [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'sudo gzip -d /usr/share/wordlists/rockyou.txt.gz' }],
          [{ type: 'comment', text: '# Check how many passwords it contains' }],
          [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'wc -l /usr/share/wordlists/rockyou.txt' }],
          [{ type: 'output', text: '14344392 /usr/share/wordlists/rockyou.txt' }],
          [{ type: 'comment', text: '# List Nmap scripts for HTTP' }],
          [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'ls /usr/share/nmap/scripts/ | grep http | head -5' }],
          [{ type: 'output', text: 'http-auth.nse' }],
          [{ type: 'output', text: 'http-brute.nse' }],
          [{ type: 'output', text: 'http-config-backup.nse' }],
          [{ type: 'output', text: 'http-default-accounts.nse' }],
          [{ type: 'output', text: 'http-enum.nse' }],
        ]} />

        <Diagram title="Kali Filesystem Overview">
{`/  (root)
——— home/
—   ——— kali/              — Your working directory
—       ——— Desktop/
—       ——— Documents/     — Engagement reports
—       ——— Downloads/     — Downloaded exploits
——— usr/
—   ——— bin/               — Tool executables (nmap, sqlmap...)
—   ——— share/
—       ——— wordlists/     — rockyou.txt, dirb lists
—       ——— nmap/scripts/  — NSE scripts
—       ——— metasploit-framework/
—       ——— exploitdb/     — Local Exploit-DB mirror
——— etc/
—   ——— resolv.conf        — DNS settings
—   ——— hosts              — Static hostname mapping
—   ——— network/           — Network interface config
——— var/log/               — System logs
——— tmp/                   — Temp files (wiped on reboot)
——— opt/                   — Third-party / custom tools`}
        </Diagram>
      </div>

      {/* ═══════════════════════════════════════ SECTION: Troubleshooting ═══════════════════════════════════════ */}
      <Troubleshooting>
        <TroubleItem issue="Screen resolution too small in VM">
          <p>
            This almost always means Guest Additions (VirtualBox) or open-vm-tools (VMware) are not
            installed or not loaded. The VM cannot communicate with the hypervisor to negotiate
            screen resolution without them.
          </p>
          <Terminal title="Fix Resolution (VirtualBox)" lines={[
            [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'sudo apt install -y virtualbox-guest-x11' }],
            [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'sudo reboot' }],
          ]} />
          <p>If it still does not resize after reboot, try manually setting the resolution:</p>
          <Terminal title="Manual Resolution" lines={[
            [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'xrandr --output Virtual1 --mode 1920x1080' }],
          ]} />
        </TroubleItem>

        <TroubleItem issue="No network connection in VM">
          <p>
            Check the VM network adapter settings. For basic internet access, use <strong>NAT</strong>.
            For connecting to other VMs or the host, use <strong>Host-Only</strong>. For appearing on
            your physical LAN, use <strong>Bridged</strong>.
          </p>
          <p>In VirtualBox: Settings — Network — Attached to: NAT (or Bridged). Then:</p>
          <Terminal title="Restart Network" lines={[
            [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'sudo systemctl restart NetworkManager' }],
            [{ type: 'comment', text: '# Verify you have an IP address' }],
            [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'ip a show eth0' }],
            [{ type: 'comment', text: '# Test internet connectivity' }],
            [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'ping -c 3 8.8.8.8' }],
          ]} />
        </TroubleItem>

        <TroubleItem issue="DNS resolution not working (can ping IPs but not domains)">
          <p>
            You can reach IPs (like 8.8.8.8) but cannot resolve domain names (like google.com). This
            means DNS is misconfigured. Check and fix <code className="inline-code">/etc/resolv.conf</code>:
          </p>
          <Terminal title="Fix DNS" lines={[
            [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'cat /etc/resolv.conf' }],
            [{ type: 'output', text: '# If empty or pointing to wrong server:' }],
            [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf' }],
            [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'echo "nameserver 8.8.4.4" | sudo tee -a /etc/resolv.conf' }],
            [{ type: 'comment', text: '# Test DNS resolution' }],
            [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'nslookup google.com' }],
            [{ type: 'output', text: 'Server:  8.8.8.8' }],
            [{ type: 'output', text: 'Address: 8.8.8.8#53' }],
            [{ type: 'output', text: 'Name:    google.com' }],
            [{ type: 'output', text: 'Address: 142.250.80.46' }],
          ]} />
        </TroubleItem>

        <TroubleItem issue="System is extremely slow / freezing">
          <p>
            This is usually caused by insufficient RAM or CPU allocation. Check resource usage and
            adjust your VM settings:
          </p>
          <Terminal title="Check Resources" lines={[
            [{ type: 'comment', text: '# Check RAM usage' }],
            [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'free -h' }],
            [{ type: 'output', text: '              total    used    free    shared  buff/cache  available' }],
            [{ type: 'output', text: 'Mem:          1.9Gi   1.6Gi   120Mi    48Mi      280Mi      180Mi' }],
            [{ type: 'error', text: '— Only 120Mi free — this VM needs more RAM!' }],
            [{ type: 'comment', text: '# Check CPU usage' }],
            [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'top -bn1 | head -5' }],
          ]} />
          <p>
            <strong>Fix:</strong> Shut down the VM (not just pause), go to VM Settings, and increase
            RAM to at least 4 GB and CPU cores to 2. Also make sure you are not running heavy
            applications on your host at the same time.
          </p>
        </TroubleItem>

        <TroubleItem issue="apt update fails with GPG errors">
          <p>
            This happens when the Kali repository signing key is missing or expired. Re-import it:
          </p>
          <Terminal title="Fix GPG" lines={[
            [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'wget -q -O - https://archive.kali.org/archive-key.asc | sudo apt-key add' }],
            [{ type: 'output', text: 'OK' }],
            [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'sudo apt update' }],
          ]} />
          <p>
            If <code className="inline-code">apt-key</code> is deprecated on your version, use the modern method:
          </p>
          <Terminal title="Fix GPG (Modern Method)" lines={[
            [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'wget -q -O /tmp/kali-key.asc https://archive.kali.org/archive-key.asc' }],
            [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'sudo gpg --dearmor -o /usr/share/keyrings/kali-archive-keyring.gpg /tmp/kali-key.asc' }],
          ]} />
        </TroubleItem>

        <TroubleItem issue="USB wireless adapter not recognized in VM">
          <p>
            Wireless adapters need USB passthrough to work inside a VM. The VM must "capture" the USB
            device from the host OS. Follow these steps:
          </p>
          <ol>
            <li>Install the <strong>VirtualBox Extension Pack</strong> on your host (for USB 2.0/3.0 support)</li>
            <li>Add your user to the <code className="inline-code">vboxusers</code> group</li>
            <li>Enable USB passthrough in VM settings and add a USB filter for your adapter</li>
          </ol>
          <Terminal title="Fix USB Passthrough" lines={[
            [{ type: 'comment', text: '# On the HOST machine (not inside the VM):' }],
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo usermod -aG vboxusers $USER' }],
            [{ type: 'output', text: '# Log out and back in for group change to take effect' }],
            [{ type: 'comment', text: '# Then in VirtualBox: Settings — USB — Enable USB 2.0/3.0' }],
            [{ type: 'comment', text: '# Click the "+" icon — select your wireless adapter' }],
            [{ type: 'comment', text: '# Start the VM, then inside Kali verify:' }],
            [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'lsusb' }],
            [{ type: 'output', text: 'Bus 001 Device 002: ID 148f:5370 Ralink Technology, Corp. RT5370' }],
            [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'iwconfig' }],
            [{ type: 'output', text: 'wlan0     IEEE 802.11  ESSID:off/any' }],
            [{ type: 'output', text: '          Mode:Managed  Access Point: Not-Associated' }],
          ]} />
        </TroubleItem>

        <TroubleItem issue="Clock/time is wrong after resuming VM">
          <p>
            VMs can lose time sync when paused or suspended. This can cause TLS certificate errors
            and break apt updates. Fix it by syncing the clock:
          </p>
          <Terminal title="Fix Time Sync" lines={[
            [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'sudo timedatectl set-ntp true' }],
            [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'sudo systemctl restart systemd-timesyncd' }],
            [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'date' }],
            [{ type: 'output', text: 'Fri Feb 14 10:30:00 EST 2025' }],
          ]} />
        </TroubleItem>

        <TroubleItem issue="'Command not found' for a tool you expected">
          <p>
            Kali's smaller images do not include every tool. You may need to install it manually:
          </p>
          <Terminal title="Install Missing Tool" lines={[
            [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'wifite' }],
            [{ type: 'error', text: 'bash: wifite: command not found' }],
            [{ type: 'comment', text: '# Search for the package' }],
            [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'apt search wifite' }],
            [{ type: 'output', text: 'wifite/kali-rolling 2.7.0-1 all' }],
            [{ type: 'output', text: '  Python script to automate wireless auditing' }],
            [{ type: 'prompt', text: '———(kali—kali)-[~]\n——$ ' }, { type: 'command', text: 'sudo apt install -y wifite' }],
          ]} />
        </TroubleItem>
      </Troubleshooting>
    </div>
  );
}
