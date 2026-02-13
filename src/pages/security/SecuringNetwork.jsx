import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

export default function SecuringNetwork() {
  return (
    <div className="content-area">
      <div className="topic-header">
        <div className="topic-breadcrumb">Gaining Access - Security <span>/</span> Securing Your Network</div>
        <h1>Securing Your Network From Hackers</h1>
        <p className="topic-desc">Now that you understand how attacks work, here's how to defend against them. These are the countermeasures for every attack you've learned.</p>
      </div>

      <div className="topic-section">
        <h2>Defense Against Each Attack</h2>
        <table className="info-table">
          <thead>
            <tr><th>Attack</th><th>Defense</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Packet Sniffing</strong></td><td>Use WPA2/WPA3 encryption — sniffed data is encrypted</td></tr>
            <tr><td><strong>Deauth Attack</strong></td><td>Use WPA3 or 802.11w (Protected Management Frames)</td></tr>
            <tr><td><strong>WEP Cracking</strong></td><td>Never use WEP — switch to WPA2 or WPA3</td></tr>
            <tr><td><strong>WPA Wordlist Attack</strong></td><td>Use a long, random, complex password (16+ chars)</td></tr>
            <tr><td><strong>WPS Brute Force</strong></td><td>Disable WPS completely in router settings</td></tr>
            <tr><td><strong>MAC Spoofing</strong></td><td>Don't rely on MAC filtering alone as security</td></tr>
            <tr><td><strong>Evil Twin</strong></td><td>Verify network authenticity, use VPN</td></tr>
          </tbody>
        </table>
      </div>

      <div className="topic-section">
        <h2>Essential Security Checklist</h2>
        <ol className="step-list">
          <li><strong>Use WPA2-AES or WPA3</strong> — Never WEP or WPA-TKIP</li>
          <li><strong>Set a strong password</strong> — 16+ characters, random, mix of types</li>
          <li><strong>Disable WPS</strong> — It's a major vulnerability</li>
          <li><strong>Change default router password</strong> — admin/admin is the first thing hackers try</li>
          <li><strong>Update router firmware</strong> — Patches known vulnerabilities</li>
          <li><strong>Change default SSID</strong> — Don't use manufacturer defaults</li>
          <li><strong>Enable 802.11w</strong> — Protects against deauth attacks</li>
          <li><strong>Reduce transmit power</strong> — Limit WiFi range to what you need</li>
          <li><strong>Monitor connected devices</strong> — Regularly check for unknown devices</li>
          <li><strong>Use a guest network</strong> — Isolate IoT devices and guests</li>
        </ol>
      </div>

      <div className="topic-section">
        <h2>What Makes a Strong WiFi Password?</h2>
        <Diagram title="Password Strength Comparison">
{`  WEAK PASSWORDS (crackable):          STRONG PASSWORDS (practically uncrackable):
  ═══════════════════════               ══════════════════════════════════════════
  
  password123       ← In rockyou.txt    j#K9mP2$vL8nQ4wX   ← Random, 16 chars
  admin2024         ← Easy pattern      Horse-Battery-Staple-Correct  ← Passphrase
  John1990          ← Name + year       xK7#mN9$pQ2&vL5@rT8  ← 20 random chars
  12345678          ← Sequential        My-C@t-Ate-7-Fish!   ← Memorable + complex
  qwerty123         ← Keyboard pattern  
  iloveyou          ← Too common        
  
  Time to crack (GPU):                  Time to crack (GPU):
  < 1 second                            > 1,000,000 years`}
        </Diagram>

        <InfoBox type="tip" title="Best Practice">
          <p>Use a <strong>passphrase</strong> — 4+ random words with numbers and symbols. Example: <code className="inline-code">Purple-Tiger-42-Jumping!</code> — easy to remember, impossible to crack with wordlists.</p>
        </InfoBox>
      </div>

      <div className="topic-section">
        <h2>Router Admin Security</h2>
        <ul>
          <li><strong>Change admin credentials</strong> — Default is usually admin/admin or admin/password</li>
          <li><strong>Disable remote management</strong> — Don't expose the admin panel to the internet</li>
          <li><strong>Use HTTPS for admin panel</strong> — If available</li>
          <li><strong>Disable UPnP</strong> — It can be exploited to open ports</li>
          <li><strong>Enable firewall</strong> — Built into most routers</li>
        </ul>
      </div>

      <div className="topic-section">
        <h2>Network Monitoring</h2>
        <p>Regularly check who is connected to your network:</p>
        <ul>
          <li><strong>Router admin panel</strong> — Check connected devices list</li>
          <li><strong>Fing app</strong> — Scans your network for all devices</li>
          <li><strong>nmap</strong> — <code className="inline-code">nmap -sn 192.168.1.0/24</code> from Kali</li>
          <li><strong>Set up alerts</strong> — Some routers can notify when new devices connect</li>
        </ul>
      </div>
    </div>
  );
}
