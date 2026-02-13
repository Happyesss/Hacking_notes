import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import { Troubleshooting, TroubleItem } from '../../components/Troubleshooting';

export default function Wordlist() {
  return (
    <div className="content-area">
      <div className="topic-header">
        <div className="topic-breadcrumb">WPA / WPA2 Cracking <span>/</span> Wordlists</div>
        <h1>Creating a Wordlist</h1>
        <p className="topic-desc">A wordlist is a text file containing potential passwords, one per line. The quality of your wordlist determines whether you can crack a WPA password.</p>
      </div>

      <div className="topic-section">
        <h2>Pre-Built Wordlists</h2>
        <p>Kali Linux comes with some wordlists pre-installed:</p>

        <Terminal title="Default Wordlists in Kali" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'ls ' }, { type: 'path', text: '/usr/share/wordlists/' }],
          [{ type: 'output', text: 'dirb      fasttrack.txt  rockyou.txt.gz  wfuzz' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# rockyou.txt is the most famous wordlist' }],
          [{ type: 'comment', text: '# It contains ~14 million real passwords from a data breach' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Decompress it first (it\'s gzipped by default)' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo gunzip ' }, { type: 'path', text: '/usr/share/wordlists/rockyou.txt.gz' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Check the size' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'wc ' }, { type: 'flag', text: '-l ' }, { type: 'path', text: '/usr/share/wordlists/rockyou.txt' }],
          [{ type: 'output', text: '14344392 /usr/share/wordlists/rockyou.txt' }],
        ]} />

        <table className="info-table">
          <thead>
            <tr><th>Wordlist</th><th>Size</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>rockyou.txt</code></td><td>~14 million</td><td>Real passwords from RockYou breach</td></tr>
            <tr><td><code>fasttrack.txt</code></td><td>~200</td><td>Most common passwords</td></tr>
            <tr><td>SecLists</td><td>Varies</td><td>Huge collection of wordlists for many purposes</td></tr>
          </tbody>
        </table>
      </div>

      <div className="topic-section">
        <h2>Creating Custom Wordlists with Crunch</h2>
        <p><code className="inline-code">crunch</code> generates wordlists based on character sets, lengths, and patterns. Useful when you know something about the password format.</p>

        <Terminal title="Crunch Basics" lines={[
          [{ type: 'comment', text: '# Syntax: crunch <min-length> <max-length> <characters> -o <output-file>' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Generate all 8-char combos of lowercase letters (WARNING: huge file!)' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'crunch ' }, { type: 'number', text: '8 8 ' }, { type: 'string', text: 'abcdefghijklmnopqrstuvwxyz ' }, { type: 'flag', text: '-o ' }, { type: 'path', text: 'wordlist.txt' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Generate 6-8 char passwords with lowercase + numbers' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'crunch ' }, { type: 'number', text: '6 8 ' }, { type: 'string', text: 'abcdefghijklmnopqrstuvwxyz0123456789 ' }, { type: 'flag', text: '-o ' }, { type: 'path', text: 'wordlist.txt' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Use a pattern: @ = lowercase, , = uppercase, % = number, ^ = special' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'crunch ' }, { type: 'number', text: '10 10 ' }, { type: 'flag', text: '-t ' }, { type: 'string', text: 'password%% ' }, { type: 'flag', text: '-o ' }, { type: 'path', text: 'wordlist.txt' }],
          [{ type: 'comment', text: '# Generates: password00, password01, ... password99' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Phone number format' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'crunch ' }, { type: 'number', text: '10 10 ' }, { type: 'flag', text: '-t ' }, { type: 'string', text: '98%%%%%%%% ' }, { type: 'flag', text: '-o ' }, { type: 'path', text: 'phones.txt' }],
          [{ type: 'comment', text: '# Generates: 9800000000 through 9899999999' }],
        ]} />

        <h3>Crunch Pattern Characters</h3>
        <table className="info-table">
          <thead>
            <tr><th>Symbol</th><th>Character Set</th></tr>
          </thead>
          <tbody>
            <tr><td><code>@</code></td><td>Lowercase letters (a-z)</td></tr>
            <tr><td><code>,</code></td><td>Uppercase letters (A-Z)</td></tr>
            <tr><td><code>%</code></td><td>Numbers (0-9)</td></tr>
            <tr><td><code>^</code></td><td>Special characters (!@#$...)</td></tr>
          </tbody>
        </table>

        <InfoBox type="warning">
          <p>Crunch can generate <strong>enormous</strong> files. An 8-char all-lowercase wordlist is 208+ GB. Always estimate size first with <code className="inline-code">crunch 8 8 abc... | wc -l</code> before writing to disk.</p>
        </InfoBox>
      </div>

      <div className="topic-section">
        <h2>Piping Crunch Directly to Aircrack</h2>
        <p>Instead of saving to a file, you can pipe crunch output directly to aircrack-ng:</p>
        <Terminal title="Pipe to Aircrack" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'crunch ' }, { type: 'number', text: '8 8 ' }, { type: 'string', text: '0123456789 ' }, { type: 'highlight', text: '| ' }, { type: 'command', text: 'aircrack-ng ' }, { type: 'flag', text: '-w - ' }, { type: 'flag', text: '-b ' }, { type: 'highlight', text: 'AA:BB:CC:DD:EE:FF ' }, { type: 'string', text: 'wpa_handshake-01.cap' }],
          [{ type: 'comment', text: '# -w -  means read wordlist from stdin (pipe)' }],
        ]} />
      </div>

      <div className="topic-section">
        <h2>Download Better Wordlists</h2>
        <Terminal title="SecLists Collection" lines={[
          [{ type: 'comment', text: '# Install SecLists — huge collection of wordlists' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo apt install ' }, { type: 'string', text: 'seclists' }],
          [{ type: 'output', text: '' }],
          [{ type: 'comment', text: '# Browse the password lists' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'ls ' }, { type: 'path', text: '/usr/share/seclists/Passwords/' }],
          [{ type: 'output', text: 'Common-Credentials/  Default-Credentials/  Leaked-Databases/' }],
          [{ type: 'output', text: 'Honeypot-Captures/   WiFi-WPA/             darkweb2017-top10000.txt' }],
        ]} />
      </div>

      <div className="topic-section">
        <h2>Tips for Effective Wordlists</h2>
        <ul>
          <li><strong>Start with rockyou.txt</strong> — covers most common passwords</li>
          <li><strong>Use target-specific info</strong> — name, birthday, pet name, city + numbers</li>
          <li><strong>Common WiFi patterns</strong> — many people use phone numbers, names+birth year, or simple words+numbers</li>
          <li><strong>Combine wordlists</strong>: <code className="inline-code">cat list1.txt list2.txt | sort -u &gt; combined.txt</code></li>
          <li><strong>Use rules with hashcat</strong> — add numbers, capitalize, leet speak variations</li>
        </ul>
      </div>

      <Troubleshooting>
        <TroubleItem issue="rockyou.txt.gz not found">
          <Terminal title="Install rockyou" lines={[
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo apt install ' }, { type: 'string', text: 'wordlists' }],
          ]} />
        </TroubleItem>
        <TroubleItem issue="crunch: command not found">
          <Terminal title="Install crunch" lines={[
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo apt install ' }, { type: 'string', text: 'crunch' }],
          ]} />
        </TroubleItem>
        <TroubleItem issue="Disk full from crunch output">
          <div className="solution">Solution:</div>
          <p>Don't generate massive wordlists to disk. Either pipe directly to aircrack, or use more targeted patterns with shorter lengths. A full 8-char alphanumeric list is 2.8+ TB.</p>
        </TroubleItem>
      </Troubleshooting>
    </div>
  );
}
