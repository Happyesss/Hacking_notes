import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

export default function GainingAccessIntro() {
  return (
    <div className="content-area">
      <div className="topic-header">
        <div className="topic-breadcrumb">WEP Cracking <span>/</span> Introduction</div>
        <h1>Gaining Access Introduction</h1>
        <p className="topic-desc">Gaining access means breaking the encryption of a WiFi network so you can connect to it. The method depends on the encryption type used.</p>
      </div>

      <div className="topic-section">
        <h2>Encryption Types & Attack Methods</h2>
        <Diagram title="WiFi Encryption vs Attack Method">
{`  ┌──────────────────────────────────────────────────────────────────┐
  │                    WiFi ENCRYPTION TYPES                         │
  ├────────────┬────────────────────┬────────────────────────────────┤
  │            │                    │                                │
  │    WEP     │      WPA/WPA2      │           WPA3                │
  │            │                    │                                │
  │  Very Weak │    Strong but       │      Very Strong              │
  │            │    crackable with   │                                │
  │  Crack in  │    weak password    │      Resistant to             │
  │  minutes   │                    │      offline attacks           │
  │            │                    │                                │
  │  Method:   │    Method:         │      Method:                   │
  │  • Collect │    • Capture       │      • Very difficult          │
  │    IVs     │      handshake     │      • Mostly secure           │
  │  • Crack   │    • Wordlist      │                                │
  │    with    │      attack        │                                │
  │  aircrack  │    • Brute force   │                                │
  └────────────┴────────────────────┴────────────────────────────────┘`}
        </Diagram>
      </div>

      <div className="topic-section">
        <h2>Attack Requirements</h2>
        <table className="info-table">
          <thead>
            <tr><th>Encryption</th><th>What You Need</th><th>Time Required</th><th>Success Rate</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>WEP</strong></td><td>~10,000+ IVs (data packets)</td><td>5-15 minutes</td><td>~100%</td></tr>
            <tr><td><strong>WPA/WPA2</strong></td><td>Handshake + Wordlist</td><td>Depends on password</td><td>Only if password is in wordlist</td></tr>
            <tr><td><strong>WPA3</strong></td><td>SAE handshake</td><td>Very long</td><td>Very low</td></tr>
          </tbody>
        </table>

        <InfoBox type="note">
          <p>WEP is almost never used anymore, but it's great for learning the fundamentals. The concepts you learn here (capturing packets, replaying, cracking) apply to more advanced attacks too.</p>
        </InfoBox>
      </div>

      <div className="topic-section">
        <h2>General Approach</h2>
        <ol className="step-list">
          <li><strong>Enable monitor mode</strong> on your wireless adapter</li>
          <li><strong>Discover networks</strong> using airodump-ng</li>
          <li><strong>Target the network</strong> — lock onto its BSSID and channel</li>
          <li><strong>Capture enough data</strong> — IVs for WEP, handshake for WPA</li>
          <li><strong>Crack the key</strong> — using aircrack-ng</li>
        </ol>
      </div>
    </div>
  );
}
