import React from 'react';
import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

const Wordlist = () => {
  return (
    <div className="page-content">
      <h1>Creating Wordlists — The Key to WPA Cracking</h1>

      <p>
        Here's the brutal truth about WPA/WPA2 cracking: <strong>if the password isn't in your 
        wordlist, you can't crack it</strong>. Period. Unlike WEP where we exploited math, WPA 
        cracking is essentially a guessing game. Your wordlist IS your attack. A mediocre wordlist 
        means a mediocre attack. A smart, targeted wordlist can crack passwords that generic lists miss.
      </p>

      <p>
        Think of it like a lockpick set. A generic set might work on common locks, but a set 
        crafted specifically for the target lock brand? Much more effective.
      </p>

      {/* ============================================================ */}
      {/* SECTION: Pre-Built Wordlists                                  */}
      {/* ============================================================ */}
      <h2>📦 Pre-Built Wordlists</h2>

      <p>
        Kali Linux comes with several wordlists pre-installed. The most famous is 
        <strong> rockyou.txt</strong> — a list of 14.3 million real passwords leaked from the 
        RockYou data breach in 2009. These are actual passwords that real people used, making it 
        incredibly effective against people who reuse common passwords.
      </p>

      <Terminal lines={[
        { segments: [{ text: '# See what wordlists are available in Kali', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'ls /usr/share/wordlists/', type: 'command' }] },
        { segments: [{ text: 'dirb      fasttrack.txt  rockyou.txt.gz  wfuzz', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# rockyou.txt is compressed by default — decompress it!', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo gunzip /usr/share/wordlists/rockyou.txt.gz', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Check how many passwords it contains', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'wc -l /usr/share/wordlists/rockyou.txt', type: 'command' }] },
        { segments: [{ text: '14344392 /usr/share/wordlists/rockyou.txt', type: 'highlight' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# See some sample passwords from the list', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'head -20 /usr/share/wordlists/rockyou.txt', type: 'command' }] },
        { segments: [{ text: '123456', type: 'output' }] },
        { segments: [{ text: '12345', type: 'output' }] },
        { segments: [{ text: '123456789', type: 'output' }] },
        { segments: [{ text: 'password', type: 'output' }] },
        { segments: [{ text: 'iloveyou', type: 'output' }] },
        { segments: [{ text: 'princess', type: 'output' }] },
        { segments: [{ text: '1234567', type: 'output' }] },
        { segments: [{ text: 'rockyou', type: 'output' }] },
        { segments: [{ text: '...', type: 'output' }] },
      ]} />

      <h3>Available Wordlists Comparison</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Wordlist</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Entries</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Size</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Best For</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={{ padding: '8px' }}><code>rockyou.txt</code></td><td style={{ padding: '8px' }}>~14.3M</td><td style={{ padding: '8px' }}>133 MB</td><td style={{ padding: '8px' }}>General password cracking — always try first</td></tr>
          <tr><td style={{ padding: '8px' }}><code>fasttrack.txt</code></td><td style={{ padding: '8px' }}>~220</td><td style={{ padding: '8px' }}>2 KB</td><td style={{ padding: '8px' }}>Quick check of ultra-common passwords</td></tr>
          <tr><td style={{ padding: '8px' }}>SecLists WiFi</td><td style={{ padding: '8px' }}>Varies</td><td style={{ padding: '8px' }}>Varies</td><td style={{ padding: '8px' }}>WiFi-specific passwords and patterns</td></tr>
          <tr><td style={{ padding: '8px' }}>CrackStation</td><td style={{ padding: '8px' }}>~1.5B</td><td style={{ padding: '8px' }}>15 GB</td><td style={{ padding: '8px' }}>Massive coverage (download from web)</td></tr>
        </tbody>
      </table>

      <Terminal lines={[
        { segments: [{ text: '# Install SecLists — HUGE collection of wordlists for everything', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo apt install seclists', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Browse WiFi-specific password lists', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'ls /usr/share/seclists/Passwords/', type: 'command' }] },
        { segments: [{ text: 'Common-Credentials/  Default-Credentials/  Leaked-Databases/', type: 'output' }] },
        { segments: [{ text: 'Honeypot-Captures/   WiFi-WPA/             darkweb2017-top10000.txt', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# WiFi-WPA folder has WiFi-specific password lists!', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'ls /usr/share/seclists/Passwords/WiFi-WPA/', type: 'command' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: Custom Wordlists with Crunch                        */}
      {/* ============================================================ */}
      <h2>🔨 Creating Custom Wordlists with Crunch</h2>

      <p>
        <code>crunch</code> is a wordlist generator that creates every possible combination 
        based on rules you define. It's perfect when you know something about the password format — 
        maybe the target uses their phone number, or passwords always start with a company name.
      </p>

      <Terminal lines={[
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '# CRUNCH SYNTAX:', type: 'comment' }] },
        { segments: [{ text: '# crunch <min-len> <max-len> <characters> [options]', type: 'comment' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Example 1: All 8-digit number combinations', type: 'comment' }] },
        { segments: [{ text: '# (WiFi passwords must be 8+ chars, many people use numbers)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'crunch 8 8 0123456789 -o numbers8.txt', type: 'command' }] },
        { segments: [{ text: 'Crunch will now generate the following amount of data: 900000000 bytes', type: 'output' }] },
        { segments: [{ text: '858 MB', type: 'output' }] },
        { segments: [{ text: '100000000 lines', type: 'output' }] },
        { segments: [{ text: '# That\'s 100 million combinations — 00000000 to 99999999', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Example 2: Phone number pattern (Indian mobile)', type: 'comment' }] },
        { segments: [{ text: '# Starts with 9 or 8, followed by 9 digits', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'crunch 10 10 -t 9%%%%%%%%% -o phones.txt', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Example 3: Name + birth year pattern', type: 'comment' }] },
        { segments: [{ text: '# If target is "Ahmed" born in 1990s', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'crunch 9 9 -t ahmed199% -o ahmed.txt', type: 'command' }] },
        { segments: [{ text: '# Generates: ahmed1990, ahmed1991, ... ahmed1999', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Example 4: Lowercase letters 8 chars (WARNING: 208 GB!)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'crunch 8 8 abcdefghijklmnopqrstuvwxyz -o alpha8.txt', type: 'command' }] },
        { segments: [{ text: '# DON\'T DO THIS! 208 GB file. Use pipe instead (shown below)', type: 'comment' }] },
      ]} />

      <h3>Crunch Pattern Characters</h3>
      <Diagram title="Crunch Pattern Symbols">
{`
  Pattern Characters for -t flag:
  ════════════════════════════════
  
  Symbol    Represents               Example
  ──────    ──────────               ───────
  @         Lowercase letter (a-z)    pass@@@@ → passaaaa to passzzzz
  ,         Uppercase letter (A-Z)    ,@@@%%%% → Aaaa0000 to Zzzz9999
  %         Number (0-9)             admin%%%  → admin000 to admin999
  ^         Special char (!@#$...)   pass%%^   → pass00! to pass99~
  
  Fixed characters are used as-is:
  crunch 10 10 -t password%%
  → password00, password01, ... password99
  
  crunch 11 11 -t %%%%%%%%%%%
  → 00000000000 through 99999999999 (phone numbers!)
`}
      </Diagram>

      <InfoBox type="warning">
        <strong>⚠️ Size Warning:</strong> Crunch can generate ENORMOUS files. Before writing to disk, 
        always estimate the size first:
        <br /><br />
        <code>crunch 8 8 0123456789</code> → 100 million lines = 858 MB
        <br />
        <code>crunch 8 8 abcdefghijklmnopqrstuvwxyz</code> → 208 BILLION lines = 208+ GB
        <br />
        <code>crunch 8 8 abcdefghijklmnopqrstuvwxyz0123456789</code> → 2.8+ TRILLION lines = 2.8 TB!
        <br /><br />
        Rule of thumb: if the character set × length exceeds what you can store, pipe directly 
        to aircrack instead of saving to file.
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: Piping to Aircrack                                   */}
      {/* ============================================================ */}
      <h2>🔗 Piping Crunch Directly to Aircrack-ng</h2>

      <p>
        Instead of creating a massive file, you can pipe crunch output directly into aircrack-ng. 
        Crunch generates passwords on-the-fly and feeds them to aircrack, which tests each one 
        against the handshake. No disk space wasted!
      </p>

      <Terminal lines={[
        { segments: [{ text: '# Pipe crunch output directly to aircrack-ng', type: 'comment' }] },
        { segments: [{ text: '# -w - tells aircrack to read wordlist from stdin (pipe)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'crunch 8 8 0123456789 | aircrack-ng -w - -b AA:BB:CC:DD:EE:FF wpa_handshake-01.cap', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# This tests all 100 million 8-digit number combinations', type: 'comment' }] },
        { segments: [{ text: '# without creating any file on disk!', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Another example: phone numbers starting with 98', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'crunch 10 10 -t 98%%%%%%%% | aircrack-ng -w - -b AA:BB:CC:DD:EE:FF wpa_handshake-01.cap', type: 'command' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: Smart Wordlist Strategies                            */}
      {/* ============================================================ */}
      <h2>🧠 Smart Wordlist Strategies</h2>

      <p>
        Random brute-force is slow. Smart targeting is fast. Here's how to think about wordlists 
        strategically:
      </p>

      <Diagram title="Wordlist Strategy — Think Like the Target">
{`
  ┌────────────────────────────────────────────────────────────────────┐
  │                    WORDLIST STRATEGY GUIDE                        │
  ├────────────────────────────────────────────────────────────────────┤
  │                                                                    │
  │  LAYER 1: Quick Wins (try first, < 1 minute)                      │
  │  ──────────────────────────────────────────                        │
  │  • fasttrack.txt (220 most common passwords)                       │
  │  • Top 1000 passwords lists                                       │
  │  • Default router passwords for that brand                        │
  │                                                                    │
  │  LAYER 2: Common Passwords (try second, ~30-60 min)               │
  │  ─────────────────────────────────────────────                     │
  │  • rockyou.txt (14.3M passwords)                                   │
  │  • darkweb2017-top10000.txt                                       │
  │                                                                    │
  │  LAYER 3: Targeted Attack (based on OSINT)                        │
  │  ─────────────────────────────────────────                         │
  │  • Target's name + numbers: ahmed1990, ahmed123, etc.              │
  │  • Phone numbers: 10-digit local mobile patterns                  │
  │  • City/team names + years: london2024, arsenal99                  │
  │  • Company name + patterns: companyname123                        │
  │  • Pet names, children names + birth years                         │
  │                                                                    │
  │  LAYER 4: Brute Force (last resort, hours-days)                   │
  │  ──────────────────────────────────────────────                    │
  │  • 8-digit numbers: crunch 8 8 0123456789                          │
  │  • 8-char lowercase: crunch 8 8 a-z (208 GB!)                     │
  │  • Hashcat rules: base wordlist × mutations                       │
  │                                                                    │
  └────────────────────────────────────────────────────────────────────┘
`}
      </Diagram>

      <h3>Combining Wordlists</h3>
      <Terminal lines={[
        { segments: [{ text: '# Merge multiple wordlists and remove duplicates', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'cat list1.txt list2.txt list3.txt | sort -u > combined.txt', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Filter to only WPA-valid lengths (8-63 characters)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: "awk 'length >= 8 && length <= 63' combined.txt > wpa_valid.txt", type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Count how many valid passwords we have', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'wc -l wpa_valid.txt', type: 'command' }] },
        { segments: [{ text: '12583947 wpa_valid.txt', type: 'output' }] },
      ]} />

      <h3>Creating Targeted Lists with CeWL</h3>
      <Terminal lines={[
        { segments: [{ text: '# CeWL crawls a website and builds a wordlist from its content', type: 'comment' }] },
        { segments: [{ text: '# Great for company/organization WiFi networks!', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'cewl https://targetcompany.com -d 2 -m 8 -w company_words.txt', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# -d 2 = crawl depth (follow links 2 levels deep)', type: 'comment' }] },
        { segments: [{ text: '# -m 8 = minimum word length 8 (WPA requirement)', type: 'comment' }] },
        { segments: [{ text: '# -w = output file', type: 'comment' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: Common WiFi Patterns                                 */}
      {/* ============================================================ */}
      <h2>🔑 Common WiFi Password Patterns</h2>

      <p>
        After years of analyzing cracked WiFi passwords, security researchers have identified 
        the most common patterns people use:
      </p>

      <Diagram title="Most Common WiFi Password Patterns">
{`
  Pattern                    Examples                 Frequency
  ═══════                    ════════                 ═════════
  
  Name + numbers             ahmed123, sarah1990      Very High
  Phone numbers              9876543210               Very High
  Simple words + 123         password123, hello123    Very High
  Keyboard patterns          qwerty123, asdf1234      High
  Name + birth year          john1985, maria1992      High
  City/country names         newyork123, india2024    Medium
  "I love" patterns          iloveyou, ilovedog       Medium
  Sport teams + numbers      arsenal99, barca2024     Medium
  Sequential numbers         12345678, 87654321       Medium
  Dictionary word + !/@/#    password!, admin@123     Medium
  
  WiFi-specific patterns:
  Company/brand name + 123   tplink1234, netgear123   Common
  SSID-based passwords       MyHomeWifi123            Common
  Router default passwords   admin1234, user1234      Common
`}
      </Diagram>

      <InfoBox type="tip">
        <strong>Investigator's mindset:</strong> Before burning through rockyou.txt, spend 5 minutes 
        thinking about the target. Is it a home network? Try name+year patterns. A business? Try 
        company name variations. A café? Try the café name + common suffixes. A few hundred 
        targeted guesses can be more effective than millions of random ones.
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: Edge Cases                                           */}
      {/* ============================================================ */}
      <h2>⚠️ Edge Cases</h2>

      <h3>Edge Case: rockyou.txt.gz not found</h3>
      <Terminal lines={[
        { segments: [{ text: '# If rockyou.txt is missing from Kali:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo apt install wordlists', type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo gunzip /usr/share/wordlists/rockyou.txt.gz', type: 'command' }] },
      ]} />

      <h3>Edge Case: Crunch uses too much disk space</h3>
      <p>
        Never write massive crunch output to disk. Always pipe to aircrack-ng or hashcat. If you 
        must save to file, use a more targeted pattern with fewer combinations.
      </p>

      <h3>Edge Case: Wordlist encoding issues</h3>
      <Terminal lines={[
        { segments: [{ text: '# Some wordlists have Windows line endings or encoding issues', type: 'comment' }] },
        { segments: [{ text: '# Convert to Unix format:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'dos2unix wordlist.txt', type: 'command' }] },
        { segments: [{ text: '# Or:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: "tr -d '\\r' < wordlist.txt > clean_wordlist.txt", type: 'command' }] },
      ]} />

      <h3>Edge Case: Password has non-ASCII characters</h3>
      <p>
        WPA supports passwords with special characters, Unicode, and spaces. Most wordlists only 
        contain ASCII. If the target uses characters like é, ñ, ü, or emoji, standard wordlists 
        won't help. You'd need a language-specific wordlist.
      </p>

      <InfoBox type="success">
        <strong>Key Takeaways:</strong>
        <ul>
          <li>Always try <code>rockyou.txt</code> first — it catches most weak passwords</li>
          <li>Create targeted wordlists based on what you know about the target</li>
          <li>Use <code>crunch</code> for pattern-based generation (phone numbers, name+year, etc.)</li>
          <li>Pipe to aircrack-ng instead of saving huge files: <code>crunch ... | aircrack-ng -w - ...</code></li>
          <li>Filter wordlists to 8-63 characters (WPA requirement) to skip invalid entries</li>
          <li>Combine multiple wordlists with <code>sort -u</code> to remove duplicates</li>
        </ul>
      </InfoBox>
    </div>
  );
};

export default Wordlist;
