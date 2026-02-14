import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';
import { Troubleshooting, TroubleItem } from '../../components/Troubleshooting';

export default function NetworkIntro() {
  return (
    <div className="content-area">
      <div className="topic-header">
        <div className="topic-breadcrumb">Network Hacking <span>/</span> Introduction</div>
        <h1>Introduction to Network Hacking / Penetration Testing</h1>
        <p className="topic-desc">
          Network hacking (penetration testing) is the disciplined process of probing a network's defenses
          by simulating real-world attacks — all with the goal of finding and fixing vulnerabilities before
          a malicious attacker can exploit them. Think of it as hiring a professional burglar to break into
          your own house so you can figure out which locks to change.
        </p>
      </div>

      {/* ═══════════════════════════════════════ SECTION: What is Network Penetration Testing? ═══════════════════════════════════════ */}
      <div className="topic-section">
        <h2>What is Network Penetration Testing?</h2>

        <p>
          Imagine you just built a brand-new house. You've installed doors, windows, a fence, maybe even
          a security camera. But how do you <em>really</em> know it's secure? You could ask a friend to
          try to break in — check every window latch, rattle every door handle, look for gaps in the fence.
          That friend isn't a criminal; they're helping you find the weak spots so you can fix them before
          someone with bad intentions comes along.
        </p>
        <p>
          <strong>Network penetration testing works exactly the same way.</strong> A penetration tester
          (also called a "pentester" or "ethical hacker") uses the same tools, techniques, and mindset as
          a real attacker — but with explicit permission from the network owner, clear rules of engagement,
          and the ultimate goal of <em>improving</em> security rather than exploiting it.
        </p>
        <p>
          The process is methodical. You don't just randomly poke at things; you follow a structured
          methodology that ensures every potential weakness is checked, every finding is documented, and
          every recommendation is actionable. At the end, the client receives a detailed report that
          tells them exactly what's broken, how bad it could be, and how to fix it.
        </p>

        <InfoBox type="note" title="Penetration Testing vs. Hacking">
          <p>
            The <strong>only</strong> difference between a penetration tester and a malicious hacker is
            <strong> authorization</strong>. Both use the same skills. Both follow the same attack paths.
            But one has written permission, operates within a defined scope, and delivers a report. The other
            goes to prison.
          </p>
        </InfoBox>

        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Penetration_test.svg/800px-Penetration_test.svg.png"
          alt="Penetration testing methodology diagram"
          style={{ maxWidth: '100%', borderRadius: 8, margin: '16px 0' }}
        />
        <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
          Diagram: A high-level view of the penetration testing lifecycle. (Source: Wikimedia Commons)
        </p>
      </div>

      {/* ═══════════════════════════════════════ SECTION: Pentest vs. Vulnerability Assessment ═══════════════════════════════════════ */}
      <div className="topic-section">
        <h2>Penetration Testing vs. Vulnerability Assessment</h2>
        <p>
          People often confuse these two, but they are fundamentally different. A <strong>vulnerability
          assessment</strong> is like a doctor performing a check-up — they scan you, list everything that
          looks wrong, and hand you a report. A <strong>penetration test</strong> is like that doctor
          actually <em>performing surgery</em> to prove that the problem is real and show exactly how bad
          it could get.
        </p>

        <table className="info-table">
          <thead>
            <tr><th>Aspect</th><th>Vulnerability Assessment</th><th>Penetration Testing</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Goal</strong></td>
              <td>Identify and list as many vulnerabilities as possible</td>
              <td>Exploit vulnerabilities to prove real-world impact</td>
            </tr>
            <tr>
              <td><strong>Depth</strong></td>
              <td>Wide but shallow — scans everything, verifies little</td>
              <td>Narrow but deep — focuses on exploitable weaknesses</td>
            </tr>
            <tr>
              <td><strong>Tools</strong></td>
              <td>Automated scanners (Nessus, OpenVAS, Qualys)</td>
              <td>Combination of automated tools + manual exploitation</td>
            </tr>
            <tr>
              <td><strong>Output</strong></td>
              <td>A list of CVEs with severity scores</td>
              <td>Proof-of-concept exploits, screenshots, data exfiltrated</td>
            </tr>
            <tr>
              <td><strong>Risk</strong></td>
              <td>Low — mostly passive scanning</td>
              <td>Higher — active exploitation may crash services</td>
            </tr>
            <tr>
              <td><strong>Frequency</strong></td>
              <td>Often run quarterly or continuously</td>
              <td>Typically annual or after major changes</td>
            </tr>
            <tr>
              <td><strong>Analogy</strong></td>
              <td>Checking if the door is unlocked</td>
              <td>Actually walking through the unlocked door and taking a photo of the safe</td>
            </tr>
          </tbody>
        </table>

        <InfoBox type="tip" title="When to Use Which?">
          <p>
            Use <strong>vulnerability assessments</strong> regularly (monthly/quarterly) as a health check.
            Use <strong>penetration testing</strong> annually, after major infrastructure changes, before
            product launches, or when compliance requires it (PCI-DSS, HIPAA, SOC 2, etc.).
          </p>
        </InfoBox>
      </div>

      {/* ═══════════════════════════════════════ SECTION: Types of Penetration Testing ═══════════════════════════════════════ */}
      <div className="topic-section">
        <h2>Types of Penetration Testing</h2>
        <p>
          Not all pentests are created equal. The amount of information the tester starts with dramatically
          changes the approach, the time required, and the kind of vulnerabilities discovered. There are three
          primary types, often described by "box" color:
        </p>

        <h3>—? Black Box Testing</h3>
        <p>
          The pentester receives <strong>zero information</strong> about the target — no network maps, no IP
          addresses, no credentials, no source code. They start from scratch, exactly like a real external
          attacker would. This is the most realistic simulation of an outside attack, but it's also the most
          time-consuming because the tester has to spend significant effort on reconnaissance.
        </p>
        <p>
          <strong>Analogy:</strong> You're dropped in front of a building you've never seen. You don't know
          the floor plan, you don't know if there are cameras, you don't even know how many doors there are.
          You have to figure out everything on your own.
        </p>
        <p>
          <strong>Best for:</strong> Simulating real-world external attacks. Common in compliance testing and
          when the organization wants to see how far an outsider can get.
        </p>

        <h3>— White Box Testing</h3>
        <p>
          The pentester receives <strong>full information</strong> — network diagrams, IP ranges, source code,
          credentials, architecture documentation, everything. This allows the tester to be extremely thorough
          and focus on finding deep, complex vulnerabilities that a black box test might miss due to time constraints.
        </p>
        <p>
          <strong>Analogy:</strong> You're given the building blueprints, all the key codes, a list of every
          security camera's blind spot, and a walkie-talkie to the security guard. Your job is to find every
          possible vulnerability, not to simulate a realistic attack.
        </p>
        <p>
          <strong>Best for:</strong> Thorough security audits, code reviews combined with testing, and when
          the organization cares more about finding all vulnerabilities than simulating a specific threat.
        </p>

        <h3>—? Gray Box Testing</h3>
        <p>
          The pentester receives <strong>partial information</strong> — perhaps user-level credentials, a
          network diagram, or knowledge of the technology stack, but not full admin access or source code.
          This simulates an attacker who has some insider knowledge (a disgruntled employee, a compromised
          user account, a partner with limited access).
        </p>
        <p>
          <strong>Analogy:</strong> You're a delivery person who legitimately enters the building's lobby
          every day. You know the general layout, you have a basic access badge, but you're trying to see
          if you can get into the server room, the CEO's office, or the vault.
        </p>
        <p>
          <strong>Best for:</strong> Simulating insider threats, testing privilege escalation, and balancing
          thoroughness with realistic attack simulation. This is the most commonly requested type.
        </p>

        <Diagram title="Pentest Types Comparison">
{`  ———————————————————————————————————————————————————————————————————
  —                   PENETRATION TEST TYPES                       —
  ————————————————————————————————————————————————————————————————  —
  —   BLACK BOX   —    GRAY BOX      —      WHITE BOX              —
  ————————————————————————————————————————————————————————————————  —
  — Info: None    — Info: Partial    — Info: Full                   —
  — Time: Long    — Time: Medium     — Time: Shortest               —
  — Cost: High    — Cost: Medium     — Cost: Lower                  —
  — Realism: ———  — Realism: ——      — Realism: —                  —
  — Coverage: —   — Coverage: ——     — Coverage: ———               —
  —               —                  —                              —
  — Simulates:    — Simulates:       — Simulates:                   —
  — Outside       — Insider with     — Full security                —
  — attacker      — limited access   — audit                        —
  ————————————————————————————————————————————————————————————————  —`}
        </Diagram>
      </div>

      {/* ═══════════════════════════════════════ SECTION: Penetration Testing Phases ═══════════════════════════════════════ */}
      <div className="topic-section">
        <h2>The 5 Phases of Penetration Testing</h2>
        <p>
          Every professional penetration test follows a structured methodology. While different frameworks
          (PTES, OWASP, NIST) describe these phases slightly differently, the core concept is always the same:
          a cycle of information gathering, analysis, exploitation, and reporting.
        </p>

        <Diagram title="Penetration Testing Lifecycle">
{`  ————————————————    ————————————————    ————————————————    ————————————————    ————————————————
  —              —    —              —    —              —    —              —    —              —
  — 1. RECON     —————— 2. SCANNING  —————— 3. GAINING   —————— 4. MAINTAIN  —————— 5. REPORTING —
  —              —    —              —    —    ACCESS    —    —    ACCESS    —    —              —
  ————————————————    ————————————————    ————————————————    ————————————————    ————————————————
       —                    —                    —                    —                    —
  Gather info         Map the            Exploit the          Stay inside          Document
  about target        attack surface     weaknesses           undetected           everything
                                                                                        —
  ——————————————————————————————————————————————————————————————————————————————————————————
                            Iterate: findings inform the next test`}
        </Diagram>

        {/* Phase 1 */}
        <h3>Phase 1: Reconnaissance (Information Gathering)</h3>
        <p>
          This is the "homework" phase. Before touching the target network at all, the pentester gathers
          as much publicly available information as possible. Think of it like a burglar casing a
          neighborhood — driving past the house, checking Google Maps satellite view, looking at the
          owner's social media to see when they're on vacation.
        </p>
        <p>
          Reconnaissance is split into two types:
        </p>
        <ul>
          <li>
            <strong>Passive Reconnaissance:</strong> Gathering information without directly interacting with the target.
            This includes OSINT (Open Source Intelligence) — looking up DNS records, checking social media,
            reading job postings (which often reveal the tech stack), browsing the Wayback Machine, searching
            breach databases, and analyzing publicly exposed documents for metadata.
          </li>
          <li>
            <strong>Active Reconnaissance:</strong> Directly interacting with the target to gather information —
            pinging servers, performing DNS zone transfers, visiting the website and mapping its structure,
            or making phone calls (social engineering). This leaves footprints and carries risk of detection.
          </li>
        </ul>

        <Terminal title="Passive Recon Examples" lines={[
          [{ type: 'comment', text: '# Look up DNS records for a target domain' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'whois ' }, { type: 'string', text: 'example.com' }],
          [{ type: 'output', text: 'Registrant: Example Corp' }],
          [{ type: 'output', text: 'Name Server: ns1.example.com' }],
          [{ type: 'output', text: 'Creation Date: 2005-03-14' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Enumerate subdomains' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'dig ' }, { type: 'flag', text: 'axfr ' }, { type: 'string', text: 'example.com ' }, { type: 'flag', text: '@ns1.example.com' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Search for exposed emails and subdomains' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'theHarvester ' }, { type: 'flag', text: '-d ' }, { type: 'string', text: 'example.com ' }, { type: 'flag', text: '-b ' }, { type: 'string', text: 'google' }],
        ]} />

        <InfoBox type="tip" title="Recon is 80% of the Work">
          <p>
            Experienced pentesters will tell you that reconnaissance is the most important phase. The more
            you know about a target before attacking, the more efficient and effective your attacks will be.
            Skipping recon is like trying to pick a lock blindfolded — you might get lucky, but you'll
            probably just waste time.
          </p>
        </InfoBox>

        {/* Phase 2 */}
        <h3>Phase 2: Scanning & Enumeration</h3>
        <p>
          Once you've gathered background information, it's time to actively probe the target. Scanning is
          like walking around the house and checking every door and window — which ones are open? Which
          ones are locked but flimsy? Are there any hidden entrances?
        </p>
        <p>In network terms, scanning involves:</p>
        <ul>
          <li><strong>Network Discovery:</strong> Identifying live hosts on the network (which devices are online?)</li>
          <li><strong>Port Scanning:</strong> Checking which ports are open on each host (what services are running?)</li>
          <li><strong>Service Enumeration:</strong> Identifying exact software versions running on open ports</li>
          <li><strong>Vulnerability Scanning:</strong> Cross-referencing discovered services against known vulnerability databases (CVEs)</li>
          <li><strong>OS Fingerprinting:</strong> Determining the operating system of each host based on how it responds to crafted packets</li>
        </ul>

        <Terminal title="Scanning with Nmap" lines={[
          [{ type: 'comment', text: '# Discover live hosts on the network' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'nmap ' }, { type: 'flag', text: '-sn ' }, { type: 'string', text: '192.168.1.0/24' }],
          [{ type: 'output', text: 'Nmap scan report for 192.168.1.1' }],
          [{ type: 'output', text: 'Host is up (0.0034s latency).' }],
          [{ type: 'output', text: 'Nmap scan report for 192.168.1.5' }],
          [{ type: 'output', text: 'Host is up (0.0089s latency).' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Aggressive scan: OS detection, version detection, scripts, traceroute' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'nmap ' }, { type: 'flag', text: '-A -T4 -p- ' }, { type: 'string', text: '192.168.1.5' }],
          [{ type: 'output', text: 'PORT     STATE SERVICE  VERSION' }],
          [{ type: 'output', text: '22/tcp   open  ssh      OpenSSH 8.9p1' }],
          [{ type: 'output', text: '80/tcp   open  http     Apache httpd 2.4.52' }],
          [{ type: 'output', text: '443/tcp  open  ssl/http Apache httpd 2.4.52' }],
          [{ type: 'output', text: '3306/tcp open  mysql    MySQL 8.0.31' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Scan for WiFi networks in range' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'airodump-ng ' }, { type: 'string', text: 'wlan0mon' }],
          [{ type: 'output', text: ' BSSID              PWR  Beacons  #Data  CH  ENC   ESSID' }],
          [{ type: 'output', text: ' AA:BB:CC:DD:EE:FF  -45  120      340    6   WPA2  TargetNetwork' }],
          [{ type: 'output', text: ' 11:22:33:44:55:66  -72  85       12     11  WEP   OldRouter' }],
        ]} />

        {/* Phase 3 */}
        <h3>Phase 3: Gaining Access (Exploitation)</h3>
        <p>
          This is the phase most people think of when they hear "hacking." Armed with the information from
          recon and scanning, the pentester now attempts to actually exploit vulnerabilities to gain
          unauthorized access. This is where you pick the lock, jimmy the window, or find the key hidden
          under the mat.
        </p>
        <p>In the context of WiFi network hacking, gaining access typically means:</p>
        <ul>
          <li><strong>Cracking WEP encryption</strong> — WEP is fundamentally broken and can be cracked in minutes by capturing enough IVs (Initialization Vectors)</li>
          <li><strong>Cracking WPA/WPA2 passwords</strong> — Capturing the 4-way handshake and using dictionary attacks or brute force</li>
          <li><strong>Exploiting WPS vulnerabilities</strong> — Brute-forcing the WPS PIN (often only 11,000 combinations)</li>
          <li><strong>Evil Twin attacks</strong> — Creating a fake access point that mimics the legitimate one to capture credentials</li>
          <li><strong>Exploiting misconfigured services</strong> — Default credentials, unpatched software, open shares</li>
        </ul>

        <Terminal title="Example: Capturing WPA Handshake" lines={[
          [{ type: 'comment', text: '# Step 1: Put adapter in monitor mode' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'airmon-ng ' }, { type: 'flag', text: 'start ' }, { type: 'string', text: 'wlan0' }],
          [{ type: 'output', text: 'Monitor mode enabled on wlan0mon' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Step 2: Listen for target network' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'airodump-ng ' }, { type: 'flag', text: '--bssid ' }, { type: 'string', text: 'AA:BB:CC:DD:EE:FF ' }, { type: 'flag', text: '-c ' }, { type: 'number', text: '6 ' }, { type: 'flag', text: '-w ' }, { type: 'path', text: 'capture ' }, { type: 'string', text: 'wlan0mon' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Step 3: Force a client to reconnect (deauth attack)' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'aireplay-ng ' }, { type: 'flag', text: '--deauth ' }, { type: 'number', text: '10 ' }, { type: 'flag', text: '-a ' }, { type: 'string', text: 'AA:BB:CC:DD:EE:FF ' }, { type: 'string', text: 'wlan0mon' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Step 4: Crack the captured handshake' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'aircrack-ng ' }, { type: 'flag', text: '-w ' }, { type: 'path', text: '/usr/share/wordlists/rockyou.txt ' }, { type: 'string', text: 'capture-01.cap' }],
          [{ type: 'output', text: '                                 Aircrack-ng 1.7' }],
          [{ type: 'output', text: '      [00:00:42] 12832/14344392 keys tested (304.57 k/s)' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: '                    KEY FOUND! [ ' }, { type: 'highlight', text: 'password123' }, { type: 'output', text: ' ]' }],
        ]} />

        {/* Phase 4 */}
        <h3>Phase 4: Maintaining Access (Post-Exploitation)</h3>
        <p>
          Once access is gained, the pentester tests whether an attacker could maintain persistent access
          to the network — could they install a backdoor? Could they survive a reboot? Could they move
          laterally to other systems? This phase demonstrates the true business impact of the vulnerability.
        </p>
        <p>
          <strong>Analogy:</strong> You got into the house through an unlocked back door. Now, can you hide
          a spare key somewhere so you can come back tomorrow? Can you get from the kitchen into the office
          where the valuables are?
        </p>
        <p>Post-exploitation activities include:</p>
        <ul>
          <li><strong>Lateral Movement:</strong> Pivoting from the compromised system to other systems on the network</li>
          <li><strong>Privilege Escalation:</strong> Elevating from a regular user account to admin/root access</li>
          <li><strong>Data Exfiltration:</strong> Demonstrating that sensitive data could be stolen</li>
          <li><strong>Persistence:</strong> Showing that access could be maintained even if the initial vulnerability is patched</li>
          <li><strong>Covering Tracks:</strong> Testing if the attack would be detected by the organization's security monitoring</li>
        </ul>

        <InfoBox type="warning" title="Scope Matters">
          <p>
            In a real engagement, post-exploitation activities must be <strong>explicitly authorized</strong> in
            the scope document. Some clients only want you to prove you can get in — they don't want you
            installing backdoors or extracting real data. Always confirm the rules of engagement before
            proceeding with post-exploitation.
          </p>
        </InfoBox>

        {/* Phase 5 */}
        <h3>Phase 5: Reporting & Remediation</h3>
        <p>
          The most technically skilled pentest in the world is worthless if the findings aren't communicated
          clearly. The report is the actual deliverable — it's what the client pays for. A good pentest report
          includes:
        </p>
        <ul>
          <li><strong>Executive Summary:</strong> A non-technical overview for management (1-2 pages). "We found 3 critical issues that could allow an attacker to access your customer database."</li>
          <li><strong>Scope & Methodology:</strong> What was tested, what wasn't, and what methodology was followed</li>
          <li><strong>Findings (detailed):</strong> Each vulnerability with severity rating (CVSS), description, proof-of-concept, screenshots, and affected systems</li>
          <li><strong>Risk Assessment:</strong> Likelihood ?? Impact analysis for each finding</li>
          <li><strong>Remediation Recommendations:</strong> Step-by-step instructions for fixing each vulnerability, prioritized by risk</li>
          <li><strong>Appendices:</strong> Raw scan output, tool versions used, testing timeline</li>
        </ul>

        <InfoBox type="tip" title="The Report Makes or Breaks You">
          <p>
            Many junior pentesters focus on the technical exploitation and treat the report as an afterthought.
            In professional pentesting, the report <em>is the product</em>. A clear, well-structured report
            that helps the client fix their issues is worth more than the most impressive exploit chain.
          </p>
        </InfoBox>
      </div>

      {/* ═══════════════════════════════════════ SECTION: Types of Network Attacks ═══════════════════════════════════════ */}
      <div className="topic-section">
        <h2>Types of Network Attacks (WiFi Focus)</h2>
        <p>
          In the context of WiFi network hacking, attacks are categorized by <em>when</em> they occur
          relative to your connection to the target network. Each category has distinct goals, techniques,
          and risk profiles.
        </p>

        <table className="info-table">
          <thead>
            <tr><th>Category</th><th>Attack Types</th><th>Description</th><th>Requires Connection?</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Pre-Connection</strong></td>
              <td>Packet Sniffing, Deauthentication, MAC Spoofing, Beacon Flooding</td>
              <td>
                Attacks performed <em>without</em> joining the target network. You're an outsider
                observing and interfering with wireless traffic. These attacks exploit the fact that
                WiFi frames are broadcast over the air and anyone within range can capture them.
              </td>
              <td>— No</td>
            </tr>
            <tr>
              <td><strong>Gaining Access</strong></td>
              <td>WEP Cracking (IV attack, ARP Replay), WPA/WPA2 Cracking (Handshake + Dictionary), WPS PIN Brute Force, Evil Twin / Rogue AP, PMKID Attack</td>
              <td>
                Attacks aimed at breaking the network's encryption to obtain the password and connect.
                The technique depends entirely on the encryption standard used. WEP is trivially broken;
                WPA2 requires capturing a handshake and using a wordlist or computing power.
              </td>
              <td>— — — (transitioning)</td>
            </tr>
            <tr>
              <td><strong>Post-Connection</strong></td>
              <td>ARP Spoofing, Man-in-the-Middle (MITM), DNS Spoofing, SSL Stripping, Session Hijacking, Network Sniffing</td>
              <td>
                Attacks performed <em>after</em> connecting to the target network. Now you're an insider.
                You can intercept, modify, and redirect traffic between other devices on the network.
                These attacks exploit trust relationships within the local network.
              </td>
              <td>— Yes</td>
            </tr>
          </tbody>
        </table>

        <Diagram title="WiFi Attack Flow">
{`  ———————————————————          ————————————————————          —————————————————————
  —  PRE-CONNECTION  —          —  GAINING ACCESS   —          —  POST-CONNECTION   —
  —                  —          —                   —          —                    —
  — — Sniff packets  —   ————   — — Crack WEP/WPA   —   ————   — — MITM attacks     —
  — — Deauth clients —          — — Exploit WPS      —          — — ARP spoofing     —
  — — Map networks   —          — — Evil Twin AP     —          — — DNS spoofing     —
  — — MAC spoofing   —          — — PMKID capture    —          — — Sniff traffic    —
  —                  —          —                   —          — — Session hijack   —
  — No password      —          — Obtain password    —          — Have password      —
  — needed           —          —                   —          —                    —
  ———————————————————          ————————————————————          —————————————————————
                                                                       —
                                                                       —
                                                              —————————————————————
                                                              —    REPORTING &     —
                                                              —    REMEDIATION     —
                                                              —————————————————————`}
        </Diagram>
      </div>

      {/* ═══════════════════════════════════════ SECTION: Tools ═══════════════════════════════════════ */}
      <div className="topic-section">
        <h2>Essential Tools for WiFi Penetration Testing</h2>
        <p>
          Every craftsperson needs their tools. Here's your toolkit for WiFi network penetration testing,
          organized by purpose. All of these come pre-installed on Kali Linux.
        </p>

        <h3>——? Wireless Auditing Suite (aircrack-ng)</h3>
        <p>
          The <code>aircrack-ng</code> suite is the Swiss Army knife of WiFi hacking. It's not a single
          tool but a collection of tools that work together:
        </p>
        <table className="info-table">
          <thead>
            <tr><th>Tool</th><th>Purpose</th><th>What It Actually Does</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>airmon-ng</code></td>
              <td>Monitor mode management</td>
              <td>Puts your wireless adapter into monitor mode (promiscuous listening). Kills interfering processes. Think of it as switching your radio from "play music" mode to "scan all frequencies" mode.</td>
            </tr>
            <tr>
              <td><code>airodump-ng</code></td>
              <td>Packet capture & network discovery</td>
              <td>Listens to all WiFi traffic in range and displays every network: its BSSID (MAC), channel, encryption type, signal strength, and connected clients. This is your "radar screen."</td>
            </tr>
            <tr>
              <td><code>aireplay-ng</code></td>
              <td>Packet injection & replay attacks</td>
              <td>Injects crafted packets into the wireless network. Used for deauthentication attacks (forcing clients offline), ARP replay (generating traffic for WEP cracking), and fake authentication.</td>
            </tr>
            <tr>
              <td><code>aircrack-ng</code></td>
              <td>Key cracking</td>
              <td>The actual cracker. Takes captured packets (IVs for WEP, handshakes for WPA) and attempts to recover the encryption key using statistical analysis (WEP) or dictionary attacks (WPA).</td>
            </tr>
            <tr>
              <td><code>airbase-ng</code></td>
              <td>Rogue access point creation</td>
              <td>Creates fake access points for Evil Twin attacks. Can be combined with DHCP and DNS servers to capture credentials from unsuspecting users.</td>
            </tr>
            <tr>
              <td><code>airdecap-ng</code></td>
              <td>Decrypt captured traffic</td>
              <td>Once you have the network key, this tool decrypts captured .cap files so you can read the actual traffic content.</td>
            </tr>
          </tbody>
        </table>

        <h3>—? Network Analysis & Sniffing</h3>
        <table className="info-table">
          <thead>
            <tr><th>Tool</th><th>Purpose</th><th>What It Actually Does</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>wireshark</code></td>
              <td>Network protocol analyzer (GUI)</td>
              <td>The gold standard for packet analysis. Captures and displays network traffic in a visual interface with powerful filtering. You can see every single packet, decode protocols, follow TCP streams, and export objects. Think of it as a microscope for network traffic.</td>
            </tr>
            <tr>
              <td><code>tshark</code></td>
              <td>Network protocol analyzer (CLI)</td>
              <td>Wireshark's command-line cousin. Same engine, but works in the terminal. Great for scripting, remote analysis, and when you don't have a GUI.</td>
            </tr>
            <tr>
              <td><code>tcpdump</code></td>
              <td>Lightweight packet capture</td>
              <td>The simplest packet capture tool. Runs in any terminal, uses minimal resources. Great for quick captures and piping data to other tools.</td>
            </tr>
            <tr>
              <td><code>bettercap</code></td>
              <td>Network attack framework</td>
              <td>A powerful, modular framework for MITM attacks. Handles ARP spoofing, DNS spoofing, SSL stripping, credential sniffing, and more — all from one interactive console.</td>
            </tr>
          </tbody>
        </table>

        <h3>—? Utility Tools</h3>
        <table className="info-table">
          <thead>
            <tr><th>Tool</th><th>Purpose</th><th>What It Actually Does</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>macchanger</code></td>
              <td>MAC address spoofing</td>
              <td>Changes your network adapter's MAC address to any value you want. Essential for anonymity, bypassing MAC filters, and impersonating other devices on the network.</td>
            </tr>
            <tr>
              <td><code>iwconfig</code> / <code>iw</code></td>
              <td>Wireless interface configuration</td>
              <td>View and configure wireless adapter settings — check mode, frequency, power, and associated network. <code>iw</code> is the modern replacement for <code>iwconfig</code>.</td>
            </tr>
            <tr>
              <td><code>ifconfig</code> / <code>ip</code></td>
              <td>Network interface configuration</td>
              <td>View and configure IP addresses, bring interfaces up/down, check link status. <code>ip</code> is the modern replacement for <code>ifconfig</code>.</td>
            </tr>
            <tr>
              <td><code>nmap</code></td>
              <td>Network scanner & mapper</td>
              <td>The most versatile network scanning tool. Discovers hosts, scans ports, detects services and OS versions, and runs vulnerability scripts. The first tool you reach for after gaining network access.</td>
            </tr>
            <tr>
              <td><code>hashcat</code></td>
              <td>Advanced password cracker</td>
              <td>GPU-accelerated password cracking. Significantly faster than aircrack-ng for WPA handshakes. Supports hundreds of hash types and advanced attack modes (rules, masks, combinator).</td>
            </tr>
            <tr>
              <td><code>hcxdumptool</code></td>
              <td>PMKID capture</td>
              <td>Captures PMKID hashes from WPA networks without needing a full handshake. A newer, often faster alternative to the traditional deauth-and-capture approach.</td>
            </tr>
          </tbody>
        </table>

        <Terminal title="Quick Tool Check" lines={[
          [{ type: 'comment', text: '# Verify your tools are installed' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'which ' }, { type: 'string', text: 'aircrack-ng airodump-ng aireplay-ng nmap wireshark macchanger' }],
          [{ type: 'output', text: '/usr/bin/aircrack-ng' }],
          [{ type: 'output', text: '/usr/bin/airodump-ng' }],
          [{ type: 'output', text: '/usr/bin/aireplay-ng' }],
          [{ type: 'output', text: '/usr/bin/nmap' }],
          [{ type: 'output', text: '/usr/bin/wireshark' }],
          [{ type: 'output', text: '/usr/bin/macchanger' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Check aircrack-ng version' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'aircrack-ng ' }, { type: 'flag', text: '--version' }],
          [{ type: 'output', text: "Aircrack-ng 1.7  - (C) 2006-2024 Thomas d'Otreppe" }],
        ]} />
      </div>

      {/* ═══════════════════════════════════════ SECTION: Legal & Ethical ═══════════════════════════════════════ */}
      <div className="topic-section">
        <h2>Legal & Ethical Considerations</h2>
        <p>
          This cannot be overstated: <strong>unauthorized access to computer networks is a serious crime</strong>.
          The techniques you'll learn in these notes are powerful, and with power comes responsibility.
          Let's be absolutely clear about the legal landscape.
        </p>

        <InfoBox type="danger" title="—— Critical Legal Warning">
          <p>
            <strong>NEVER test on networks you don't own or have explicit written permission to test.</strong>
          </p>
          <p>
            Even running a simple port scan against someone else's network without permission can be
            considered a criminal offense in many jurisdictions. "I was just learning" and "I didn't mean
            any harm" are <strong>not</strong> legal defenses.
          </p>
        </InfoBox>

        <h3>Relevant Laws by Country</h3>
        <table className="info-table">
          <thead>
            <tr><th>Country</th><th>Law</th><th>Key Provisions</th><th>Penalties</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>——?? USA</td>
              <td><strong>Computer Fraud and Abuse Act (CFAA)</strong> — 18 U.S.C. ?? 1030</td>
              <td>Criminalizes unauthorized access to protected computers and networks. Even exceeding authorized access (doing more than you were permitted) is a crime.</td>
              <td>Up to 10-20 years imprisonment, fines up to $250,000 for repeat offenses</td>
            </tr>
            <tr>
              <td>——?? UK</td>
              <td><strong>Computer Misuse Act 1990</strong></td>
              <td>Three offenses: unauthorized access, unauthorized access with intent to commit further offenses, unauthorized modification of computer material.</td>
              <td>Up to 10 years imprisonment</td>
            </tr>
            <tr>
              <td>——?? EU</td>
              <td><strong>Directive 2013/40/EU</strong> (Attacks against information systems)</td>
              <td>Harmonizes cybercrime laws across EU member states. Criminalizes illegal access, interference with systems and data, and interception of communications.</td>
              <td>Minimum 2-5 years (varies by member state)</td>
            </tr>
            <tr>
              <td>——?? India</td>
              <td><strong>Information Technology Act, 2000</strong> (Sections 43, 66)</td>
              <td>Criminalizes unauthorized access, data theft, introducing viruses/malware, and denial of service attacks.</td>
              <td>Up to 3 years imprisonment and fines up to —5 lakh</td>
            </tr>
            <tr>
              <td>——?? Germany</td>
              <td><strong>?? 202a-c StGB</strong> (German Criminal Code)</td>
              <td>Criminalizes unauthorized data access, data interception, and preparation of data espionage (even possessing hacking tools with intent).</td>
              <td>Up to 3 years imprisonment</td>
            </tr>
          </tbody>
        </table>

        <h3>What Happens if You Test Without Permission?</h3>
        <p>Let's walk through a realistic scenario:</p>
        <ol>
          <li>You scan your neighbor's WiFi network "just to practice." Your adapter sends probe packets to their router.</li>
          <li>Your neighbor has a security-conscious ISP or an IDS (Intrusion Detection System). The scan is logged.</li>
          <li>The ISP notices the anomaly and flags it. Or your neighbor notices their network acting strange and reports it.</li>
          <li>Law enforcement traces the activity back to your physical location (wireless signals can be triangulated, and your ISP knows your IP).</li>
          <li>You receive a visit from the police. Your equipment is seized as evidence.</li>
          <li>You're charged under the applicable computer crime law. Even if you "didn't do anything" beyond scanning, the <em>unauthorized access attempt</em> itself is the crime.</li>
          <li>You now have a criminal record that will follow you for the rest of your career — ironically making it nearly impossible to work in cybersecurity.</li>
        </ol>

        <InfoBox type="warning" title="The 'I Didn't Know' Defense Doesn't Work">
          <p>
            Ignorance of the law is not a defense. In many jurisdictions, <strong>intent doesn't even matter</strong> for
            basic unauthorized access charges. The act itself is the crime. The only protection is
            <strong> written authorization</strong> — a signed document clearly stating what you're allowed
            to test, when, and how.
          </p>
        </InfoBox>

        <h3>How to Stay Legal</h3>
        <ul>
          <li><strong>Build your own lab</strong> — Test only on equipment you own (see lab setup section below)</li>
          <li><strong>Get written permission</strong> — For professional pentests, always have a signed Statement of Work (SOW) and Rules of Engagement (ROE)</li>
          <li><strong>Define the scope clearly</strong> — Specify exactly which IP ranges, networks, and systems are in scope</li>
          <li><strong>Use CTF platforms</strong> — Practice on legal platforms like HackTheBox, TryHackMe, OverTheWire, PentesterLab</li>
          <li><strong>Get certified</strong> — Certifications like CEH, OSCP, PNPT, CompTIA PenTest+ prove you understand ethical boundaries</li>
          <li><strong>Document everything</strong> — Keep timestamped logs of all activities during a test</li>
          <li><strong>Have insurance</strong> — Professional pentesters carry Errors & Omissions (E&O) and professional liability insurance</li>
        </ul>
      </div>

      {/* ═══════════════════════════════════════ SECTION: Lab Setup ═══════════════════════════════════════ */}
      <div className="topic-section">
        <h2>Setting Up Your Hacking Lab</h2>
        <p>
          The safest and most legal way to practice network hacking is to build your own lab. This is your
          private playground — you own all the equipment, so you have full legal authority to attack it.
          Here's how to set up a proper lab from scratch.
        </p>

        <h3>—? Required Equipment</h3>
        <table className="info-table">
          <thead>
            <tr><th>Equipment</th><th>Purpose</th><th>Recommendations</th><th>Est. Cost</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>WiFi Router</strong></td>
              <td>Target network</td>
              <td>Any cheap router works. Ideally one that supports WEP, WPA, WPA2, and WPS so you can practice all attack types. Old TP-Link, Netgear, or Linksys routers from thrift stores work great. Consider flashing OpenWrt for more configuration options.</td>
              <td>$5 - $20</td>
            </tr>
            <tr>
              <td><strong>Wireless Adapter</strong></td>
              <td>Monitor mode & packet injection</td>
              <td>Must support <strong>monitor mode</strong> and <strong>packet injection</strong>. Recommended chipsets: <strong>Atheros AR9271</strong> (ALFA AWUS036NHA), <strong>Ralink RT3070</strong> (ALFA AWUS036NH), <strong>Realtek RTL8812AU</strong> (ALFA AWUS036ACH for 5GHz). The ALFA AWUS036ACH is the go-to modern choice — dual band, good range, well-supported.</td>
              <td>$25 - $60</td>
            </tr>
            <tr>
              <td><strong>Computer</strong></td>
              <td>Running Kali Linux</td>
              <td>Any modern laptop or desktop. If using a VM, you need <strong>USB passthrough</strong> to connect the wireless adapter. At least 4GB RAM and 40GB disk space for Kali. Dual-boot is recommended over VM for better hardware access.</td>
              <td>Existing hardware</td>
            </tr>
            <tr>
              <td><strong>Test Devices</strong></td>
              <td>Clients on target network</td>
              <td>Old smartphones, tablets, or laptops connected to your test router. These simulate real users on the network. Even one old phone is enough to generate handshakes and practice MITM attacks.</td>
              <td>$0 (use old devices)</td>
            </tr>
            <tr>
              <td><strong>Ethernet Cable</strong></td>
              <td>Wired connection to router</td>
              <td>For configuring the router and for internet access on your Kali machine while the wireless adapter is in monitor mode (it can't be connected to WiFi and monitoring at the same time).</td>
              <td>$3 - $5</td>
            </tr>
          </tbody>
        </table>

        <InfoBox type="tip" title="Budget Lab Setup">
          <p>
            You can set up a complete lab for <strong>under $40</strong>. Get a used router from a thrift
            store ($5), an ALFA AWUS036NHA adapter ($25-30), use your existing computer, and connect an
            old phone as the test client. That's everything you need.
          </p>
        </InfoBox>

        <h3>——? Lab Network Topology</h3>

        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Wiki_Network_Diagram.png/800px-Wiki_Network_Diagram.png"
          alt="Example network topology diagram"
          style={{ maxWidth: '100%', borderRadius: 8, margin: '16px 0' }}
        />
        <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
          Example of a network topology. Your lab will be simpler but follow the same principles. (Source: Wikimedia Commons)
        </p>

        <Diagram title="Recommended Lab Setup">
{`                           ————————————————————
                           —   YOUR MAIN      —
                           —   NETWORK         —
                           —   (Internet)      —
                           ————————————————————
                                    — Ethernet (for internet access)
                                    —
  ——————————————————————————————————————————————————————————————————————————
  —                                 —                                      —
  —    ——————————————————————————————————————————————————————————          —
  —    —              YOUR KALI MACHINE                         —          —
  —    —                                                        —          —
  —    —   ————————————        ————————————————————————        —          —
  —    —   — eth0     —        —   wlan0 (USB Adapter) —        —          —
  —    —   — Internet —        —   Monitor Mode        —        —          —
  —    —   — Access   —        —   Packet Injection    —        —          —
  —    —   ————————————        ————————————————————————        —          —
  —    —                                   —                    —          —
  —    ——————————————————————————————————————————————————————————          —
  —                                        — Wireless (monitor/inject)     —
  —                                        —                               —
  —                           ———————————————————————————                  —
  —                           —     TEST ROUTER          —                  —
  —                           —     (YOUR TARGET)        —                  —
  —  ——————— LAB —————————    —  SSID: "TestNetwork"     —    ————————     —
  —  —     NETWORK            —  WPA2: "testpassword"    —           —     —
  —  —                        —  192.168.2.1             —           —     —
  —  —                        ———————————————————————————           —     —
  —  —                                     —                        —     —
  —  —              ———————————————————————————————————————         —     —
  —  —              —                      —              —         —     —
  —  —        —————————————         —————————————  —————————————  —     —
  —  —        — Old Phone —         — Old Laptop—  — Tablet    —  —     —
  —  —        — .2.100    —         — .2.101    —  — .2.102    —  —     —
  —  —        —————————————         —————————————  —————————————  —     —
  —  ——————————————————————————————————————————————————————————————     —
  —                                                                      —
  —  IMPORTANT: Keep lab network physically separate from production!     —
  ————————————————————————————————————————————————————————————————————————`}
        </Diagram>

        <h3>—? Step-by-Step Lab Setup</h3>
        <ol className="step-list">
          <li>
            <strong>Set up the test router:</strong> Plug in your cheap/old router. Access its admin panel
            (usually <code>192.168.0.1</code> or <code>192.168.1.1</code>). Set the SSID to something like
            "TestNetwork" and configure it with WPA2 encryption and a known password like "testpassword123".
            <em> Do NOT connect it to the internet</em> — it should be a standalone, isolated network.
          </li>
          <li>
            <strong>Install Kali Linux:</strong> Download from <code>kali.org</code>. Either install as a
            dual-boot, run from a live USB, or set up in VirtualBox/VMware. If using a VM, allocate at least
            4GB RAM and enable USB 3.0 passthrough for the wireless adapter.
          </li>
          <li>
            <strong>Connect the wireless adapter:</strong> Plug your USB wireless adapter into the Kali machine.
            If using a VM, pass the USB device through to the guest OS. Verify it's recognized:
          </li>
        </ol>

        <Terminal title="Verify Adapter Detection" lines={[
          [{ type: 'comment', text: '# Check if the adapter is detected' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'iwconfig' }],
          [{ type: 'output', text: 'wlan0     IEEE 802.11  ESSID:off/any' }],
          [{ type: 'output', text: '          Mode:Managed  Frequency:2.412 GHz  Access Point: Not-Associated' }],
          [{ type: 'output', text: '          Tx-Power=20 dBm' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Check adapter chipset and driver' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'airmon-ng' }],
          [{ type: 'output', text: 'PHY     Interface  Driver          Chipset' }],
          [{ type: 'output', text: 'phy0    wlan0      ath9k_htc       Atheros Communications AR9271' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Test monitor mode' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airmon-ng ' }, { type: 'flag', text: 'start ' }, { type: 'string', text: 'wlan0' }],
          [{ type: 'output', text: 'Found 3 processes that could cause trouble.' }],
          [{ type: 'output', text: 'Run: airmon-ng check kill' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: 'PHY     Interface  Driver          Chipset' }],
          [{ type: 'output', text: 'phy0    ' }, { type: 'highlight', text: 'wlan0mon' }, { type: 'output', text: '   ath9k_htc       Atheros Communications AR9271' }],
          [{ type: 'output', text: '               (monitor mode enabled)' }],
        ]} />

        <ol className="step-list" start={4}>
          <li>
            <strong>Connect test devices:</strong> Connect one or more old devices (phone, laptop, tablet)
            to the test router's WiFi. These devices simulate the "victims" — they generate network traffic
            and handshakes that you'll capture during practice.
          </li>
          <li>
            <strong>Maintain internet access:</strong> Use an Ethernet cable to keep your Kali machine
            connected to the internet through your main router. This way, you have internet access for
            downloading tools and updates while your wireless adapter is busy in monitor mode.
          </li>
          <li>
            <strong>Configure different security modes for practice:</strong> As you progress through
            the notes, you'll want to change your test router's settings:
            <ul>
              <li>Set to <strong>WEP</strong> to practice WEP cracking (IV attacks, ARP replay)</li>
              <li>Set to <strong>WPA/WPA2 with a weak password</strong> to practice handshake capture and dictionary attacks</li>
              <li>Enable <strong>WPS</strong> to practice WPS PIN attacks</li>
              <li>Set to <strong>WPA2 with a strong password</strong> to see how attacks fail with good security</li>
            </ul>
          </li>
          <li>
            <strong>Test your setup:</strong> Run a quick scan to confirm everything works:
          </li>
        </ol>

        <Terminal title="Test Your Lab Setup" lines={[
          [{ type: 'comment', text: '# Put adapter in monitor mode' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airmon-ng ' }, { type: 'flag', text: 'check kill' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airmon-ng ' }, { type: 'flag', text: 'start ' }, { type: 'string', text: 'wlan0' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Scan for your test network' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airodump-ng ' }, { type: 'string', text: 'wlan0mon' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: ' CH  6 ][ Elapsed: 10 s' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: ' BSSID              PWR  Beacons  #Data  CH  ENC    CIPHER  AUTH  ESSID' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: ' ' }, { type: 'highlight', text: 'AA:BB:CC:DD:EE:FF  -35  45       12     6   WPA2   CCMP    PSK   TestNetwork' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: ' BSSID              STATION            PWR   Rate   Lost   Frames  Notes  Probes' }],
          [{ type: 'output', text: '' }],
          [{ type: 'output', text: ' AA:BB:CC:DD:EE:FF  11:22:33:44:55:66  -42   54e-54   0      25             TestNetwork' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# — If you see your TestNetwork and connected clients, your lab is ready!' }],
        ]} />

        <InfoBox type="success" title="Lab Setup Complete!">
          <p>
            If you can see your test network in <code>airodump-ng</code> and see at least one connected client,
            congratulations — your lab is fully functional! You're ready to start practicing the techniques
            covered in the rest of these notes.
          </p>
        </InfoBox>
      </div>

      {/* ═══════════════════════════════════════ SECTION: Troubleshooting ═══════════════════════════════════════ */}
      <div className="topic-section">
        <h2>Common Issues</h2>
        <Troubleshooting>
          <TroubleItem issue="Wireless adapter not detected in Kali (especially in VM)">
            <p>
              If using a virtual machine, ensure USB passthrough is enabled. In VirtualBox: go to
              Settings — USB — Add USB filter for your adapter. In VMware: go to VM — Removable Devices
              and connect the adapter. You may need to install VirtualBox Extension Pack for USB 3.0 support.
            </p>
            <Terminal title="Check USB devices" lines={[
              [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'lsusb' }],
              [{ type: 'output', text: 'Bus 001 Device 004: ID 0cf3:9271 Atheros Communications AR9271' }],
              [{ type: 'comment', text: "# If you don't see your adapter, it's not being passed through" }],
            ]} />
          </TroubleItem>

          <TroubleItem issue="Monitor mode fails or adapter doesn't support injection">
            <p>
              Not all wireless adapters support monitor mode. You need an adapter with a compatible chipset.
              Check the aircrack-ng compatibility list.
              If your adapter is compatible but monitor mode still fails, try killing interfering processes first:
            </p>
            <Terminal title="Fix monitor mode" lines={[
              [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airmon-ng ' }, { type: 'flag', text: 'check kill' }],
              [{ type: 'output', text: 'Killing these processes:' }],
              [{ type: 'output', text: '  PID  Name' }],
              [{ type: 'output', text: '  892  wpa_supplicant' }],
              [{ type: 'output', text: '  945  NetworkManager' }],
              [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airmon-ng ' }, { type: 'flag', text: 'start ' }, { type: 'string', text: 'wlan0' }],
            ]} />
          </TroubleItem>

          <TroubleItem issue="No networks showing up in airodump-ng">
            <p>
              If <code>airodump-ng</code> runs but shows no networks, check: (1) Is your test router powered
              on and broadcasting? (2) Is your adapter close enough to the router? (3) Are you scanning the
              right band? Some adapters only support 2.4GHz. (4) Try specifying the band explicitly:
            </p>
            <Terminal title="Scan specific band" lines={[
              [{ type: 'comment', text: '# Scan only 2.4GHz channels' }],
              [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airodump-ng ' }, { type: 'flag', text: '--band ' }, { type: 'string', text: 'bg ' }, { type: 'string', text: 'wlan0mon' }],
              [{ type: 'output', text: '' }],
              [{ type: 'comment', text: '# Scan only 5GHz channels' }],
              [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airodump-ng ' }, { type: 'flag', text: '--band ' }, { type: 'string', text: 'a ' }, { type: 'string', text: 'wlan0mon' }],
              [{ type: 'output', text: '' }],
              [{ type: 'comment', text: '# Scan both bands' }],
              [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airodump-ng ' }, { type: 'flag', text: '--band ' }, { type: 'string', text: 'abg ' }, { type: 'string', text: 'wlan0mon' }],
            ]} />
          </TroubleItem>

          <TroubleItem issue="Lost internet access after enabling monitor mode">
            <p>
              This is expected! When you put your wireless adapter into monitor mode, it can no longer
              connect to WiFi networks normally. Solution: use a <strong>second network connection</strong> for
              internet — either an Ethernet cable to your main router, or a second wireless adapter that
              stays in managed mode.
            </p>
          </TroubleItem>

          <TroubleItem issue="VirtualBox USB passthrough not working">
            <p>
              Make sure you installed the <strong>VirtualBox Extension Pack</strong> (not just VirtualBox itself).
              The Extension Pack adds USB 2.0/3.0 support. Download it from the VirtualBox website and install via
              File — Preferences — Extensions. Then add a USB filter for your adapter in VM settings.
            </p>
          </TroubleItem>
        </Troubleshooting>
      </div>

      {/* ═══════════════════════════════════════ SECTION: What's Next ═══════════════════════════════════════ */}
      <div className="topic-section">
        <h2>What's Next?</h2>
        <p>
          Now that you understand what penetration testing is, the methodology behind it, the tools you'll
          use, and you have your lab set up, it's time to dive into the fundamentals. The journey ahead
          covers:
        </p>

        <Diagram title="Learning Path">
{`  ———————————————————
  —  YOU ARE HERE    —
  —  Introduction    —
  ———————————————————
           —
           —
  ———————————————————     Understanding how WiFi networks work,
  —  Network Basics  —     IP addresses, MAC addresses, DHCP, etc.
  ———————————————————
           —
           —
  ———————————————————     Setting up your adapter, changing MAC,
  —  Pre-Connection  —     sniffing packets, deauth attacks
  ———————————————————
           —
           —
  ———————————————————     WEP cracking, WPA/WPA2 cracking,
  —  Gaining Access  —     capturing handshakes, wordlists
  ———————————————————
           —
           —
  ———————————————————     MITM attacks, ARP spoofing,
  — Post-Connection  —     sniffing credentials, DNS spoofing
  ———————————————————
           —
           —
  ———————————————————     Securing your own network against
  —  Securing Your   —     everything you just learned
  —  Network         —
  ———————————————————`}
        </Diagram>

        <InfoBox type="note" title="Practice Makes Perfect">
          <p>
            Don't just read these notes — <strong>practice every technique in your lab</strong>. Reading about
            deauthentication attacks is one thing; actually seeing a device get kicked off your test network
            is something completely different. The hands-on experience is what transforms theoretical knowledge
            into real skill.
          </p>
        </InfoBox>
      </div>
    </div>
  );
}
