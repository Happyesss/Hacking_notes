import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

export default function WPAIntro() {
  return (
    <div className="content-area">
      <div className="topic-header">
        <div className="topic-breadcrumb">WPA / WPA2 Cracking <span>/</span> Introduction</div>
        <h1>Introduction to WPA and WPA2 Cracking</h1>
        <p className="topic-desc">WPA/WPA2 uses much stronger encryption than WEP. Cracking it requires capturing a 4-way handshake and then running a dictionary/brute-force attack against it.</p>
      </div>

      <div className="topic-section">
        <h2>WPA vs WPA2</h2>
        <table className="info-table">
          <thead>
            <tr><th>Feature</th><th>WPA</th><th>WPA2</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Encryption</strong></td><td>TKIP (Temporal Key Integrity Protocol)</td><td>AES-CCMP (much stronger)</td></tr>
            <tr><td><strong>Key Derivation</strong></td><td>4-way handshake</td><td>4-way handshake</td></tr>
            <tr><td><strong>Vulnerability</strong></td><td>Weak passwords</td><td>Weak passwords</td></tr>
            <tr><td><strong>Attack Method</strong></td><td>Capture handshake + wordlist</td><td>Capture handshake + wordlist</td></tr>
          </tbody>
        </table>

        <InfoBox type="note">
          <p>Unlike WEP, <strong>WPA/WPA2 cannot be cracked mathematically</strong>. The only way to crack it is if the password is in your wordlist or you can brute-force it. A strong random password makes WPA2 essentially uncrackable.</p>
        </InfoBox>
      </div>

      <div className="topic-section">
        <h2>The 4-Way Handshake</h2>
        <p>When a client connects to a WPA/WPA2 network, they perform a 4-way handshake. This handshake contains enough information to verify a password guess offline.</p>

        <Diagram title="WPA2 4-Way Handshake">
{`   Client                                     Access Point (AP)
     │                                              │
     │    Both know: PMK (derived from password + SSID)
     │                                              │
     │◀────── Message 1: ANonce ───────────────────│
     │        (AP sends random number)              │
     │                                              │
     │        Client computes PTK using:            │
     │        PMK + ANonce + SNonce + MACs          │
     │                                              │
     │─────── Message 2: SNonce + MIC ────────────▶│
     │        (Client sends its random number)      │
     │                                              │
     │        AP computes PTK and verifies MIC      │
     │                                              │
     │◀────── Message 3: GTK + MIC ────────────────│
     │        (AP sends Group Temporal Key)         │
     │                                              │
     │─────── Message 4: ACK ─────────────────────▶│
     │        (Client confirms)                     │
     │                                              │
     │     ═══ ENCRYPTED COMMUNICATION ═══         │
     │                                              │
     
   KEY DERIVATION:
   Password + SSID  →  PBKDF2  →  PMK (Pre-shared Master Key)
   PMK + ANonce + SNonce + MAC addresses  →  PTK (Pairwise Transient Key)
   
   WE CAPTURE: ANonce, SNonce, MACs, MIC
   WE TEST: Each password guess → generate PMK → generate PTK → check MIC`}
        </Diagram>
      </div>

      <div className="topic-section">
        <h2>Attack Strategy</h2>
        <ol className="step-list">
          <li><strong>Capture the 4-way handshake</strong> — Wait for a client to connect, or force reconnection with deauth</li>
          <li><strong>Get or create a wordlist</strong> — A file containing potential passwords</li>
          <li><strong>Run the cracking tool</strong> — aircrack-ng or hashcat tests each password against the handshake</li>
          <li><strong>If password is in the list → cracked!</strong> If not → need a better wordlist</li>
        </ol>

        <InfoBox type="warning">
          <p>WPA/WPA2 cracking success depends <strong>entirely</strong> on the password being in your wordlist. No wordlist = no crack. This is why strong, random passwords are so effective.</p>
        </InfoBox>
      </div>

      <div className="topic-section">
        <h2>Methods Overview</h2>
        <table className="info-table">
          <thead>
            <tr><th>Method</th><th>Tool</th><th>Speed</th><th>Best For</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Dictionary Attack</strong></td><td>aircrack-ng</td><td>Moderate</td><td>Common passwords</td></tr>
            <tr><td><strong>GPU Brute Force</strong></td><td>hashcat</td><td>Fast</td><td>Short passwords</td></tr>
            <tr><td><strong>Rainbow Tables</strong></td><td>cowpatty</td><td>Very Fast</td><td>Pre-computed for specific SSID</td></tr>
            <tr><td><strong>WPS Attack</strong></td><td>reaver/bully</td><td>Hours</td><td>Routers with WPS enabled</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
