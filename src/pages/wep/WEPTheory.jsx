import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

export default function WEPTheory() {
  return (
    <div className="content-area">
      <div className="topic-header">
        <div className="topic-breadcrumb">WEP Cracking <span>/</span> Theory</div>
        <h1>Theory Behind Cracking WEP Encryption</h1>
        <p className="topic-desc">WEP (Wired Equivalent Privacy) uses the RC4 stream cipher with a flawed key scheduling algorithm. This fundamental flaw makes it crackable regardless of the password strength.</p>
      </div>

      <div className="topic-section">
        <h2>How WEP Encryption Works</h2>
        <Diagram title="WEP Encryption Process">
{`  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
  │  Plain Text  │     │   WEP Key    │     │  Encrypted   │
  │   (Data)     │     │  + IV (24-bit)│     │   Packet     │
  └──────┬───────┘     └──────┬───────┘     └──────────────┘
         │                    │                     ▲
         │              ┌─────┴──────┐              │
         │              │  RC4 Stream │              │
         │              │  Cipher     │              │
         │              └─────┬──────┘              │
         │                    │                     │
         │              ┌─────┴──────┐              │
         └─────────────▶│   XOR      │──────────────┘
                        └────────────┘
  
  
  Packet Structure:
  ┌──────────────────────────────────────────────┐
  │  IV (24 bits)  │  Encrypted Data  │   ICV    │
  │  Sent in       │  (XOR'd with    │  (CRC32  │
  │  PLAIN TEXT!   │   RC4 keystream)│  check)  │
  └──────────────────────────────────────────────┘
       ▲
       │
       └── THIS IS THE FLAW! IV is sent unencrypted`}
        </Diagram>
      </div>

      <div className="topic-section">
        <h2>Why WEP is Broken</h2>

        <h3>The IV (Initialization Vector) Problem</h3>
        <ul>
          <li><strong>IV is only 24 bits</strong> — only 16.7 million possible values</li>
          <li><strong>IV is sent in plain text</strong> — attached to every packet unencrypted</li>
          <li><strong>IVs repeat quickly</strong> — on a busy network, IVs start repeating after ~5000 packets</li>
          <li><strong>Weak IVs exist</strong> — certain IV values leak information about the key</li>
        </ul>

        <Diagram title="Why IV Repetition Breaks WEP">
{`  Packet 1:  IV=001  +  Key  →  RC4 Keystream A  →  XOR with Data1  →  Encrypted1
  Packet 2:  IV=002  +  Key  →  RC4 Keystream B  →  XOR with Data2  →  Encrypted2
  Packet 3:  IV=003  +  Key  →  RC4 Keystream C  →  XOR with Data3  →  Encrypted3
  ...
  Packet N:  IV=001  +  Key  →  RC4 Keystream A  →  XOR with DataN  →  EncryptedN
             ▲                          ▲
             │                          │
             └── SAME IV!               └── SAME KEYSTREAM!
  
  If Encrypted1 XOR EncryptedN = Data1 XOR DataN
  → We can recover the plaintext!
  
  With enough IVs (especially "weak" IVs), we can 
  statistically recover the entire WEP key.`}
        </Diagram>
      </div>

      <div className="topic-section">
        <h2>The Attack Process</h2>
        <ol className="step-list">
          <li><strong>Capture packets</strong> — Each packet contains an IV in plain text</li>
          <li><strong>Collect enough IVs</strong> — Need ~10,000-40,000+ unique IVs</li>
          <li><strong>Statistical analysis</strong> — aircrack-ng uses the FMS, KoreK, and PTW attacks to correlate weak IVs with key bytes</li>
          <li><strong>Recover the key</strong> — The algorithm determines each byte of the WEP key</li>
        </ol>

        <InfoBox type="note">
          <p><strong>Key point:</strong> WEP cracking doesn't need a wordlist. It's a pure statistical/mathematical attack. Given enough IVs, the key will be found 100% of the time regardless of its complexity.</p>
        </InfoBox>
      </div>

      <div className="topic-section">
        <h2>How Many IVs Do You Need?</h2>
        <table className="info-table">
          <thead>
            <tr><th>Attack Method</th><th>IVs Required</th><th>Success Rate</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>PTW Attack</strong></td><td>~20,000-40,000</td><td>Very high</td></tr>
            <tr><td><strong>FMS/KoreK Attack</strong></td><td>~200,000-500,000</td><td>High</td></tr>
            <tr><td><strong>Combined (aircrack-ng default)</strong></td><td>~10,000-20,000</td><td>High</td></tr>
          </tbody>
        </table>

        <InfoBox type="tip">
          <p>On a busy network, you can collect enough IVs passively in minutes. On a quiet network, you'll need to use ARP replay attacks to generate traffic (covered in upcoming topics).</p>
        </InfoBox>
      </div>
    </div>
  );
}
