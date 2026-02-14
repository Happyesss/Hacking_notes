import React from 'react';
import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

const TargetedSniffing = () => {
  return (
    <div className="page-content">
      <h1>Targeted Sniffing — Focusing on Your Target Network</h1>

      <p>
        In the previous section, we used <code>airodump-ng</code> to discover all networks in range. 
        Now it's time to zoom in on a <strong>specific target</strong>. Targeted sniffing locks your 
        adapter to a single network's channel and captures detailed information about that network 
        and all its connected clients. This is a critical step before any attack.
      </p>

      {/* ============================================================ */}
      {/* SECTION: Why Targeted Sniffing?                              */}
      {/* ============================================================ */}
      <h2>🎯 Why Do We Need Targeted Sniffing?</h2>

      <p>
        Think of the general scan (previous section) as flying over a city in a helicopter — you see 
        all the buildings but can't read the street signs. Targeted sniffing is like landing in one 
        neighborhood and studying every detail. Here's why it's essential:
      </p>

      <ul>
        <li><strong>Channel locking:</strong> No more hopping between channels — your adapter stays on the target's channel, capturing every single packet</li>
        <li><strong>Client discovery:</strong> See ALL devices connected to the target network with detailed stats</li>
        <li><strong>Handshake capture:</strong> You need to be locked on the right channel to capture WPA handshakes</li>
        <li><strong>Data collection:</strong> For WEP cracking, you need to capture IVs from only one network</li>
        <li><strong>File saving:</strong> Save captured packets to files for offline analysis and cracking</li>
      </ul>

      {/* ============================================================ */}
      {/* SECTION: How to Target a Network                             */}
      {/* ============================================================ */}
      <h2>🔍 Targeting a Specific Network</h2>

      <p>
        After your general scan, note the <strong>BSSID</strong> (MAC address) and <strong>channel</strong> 
        of your target. Then run airodump-ng with these filters:
      </p>

      <Terminal lines={[
        { segments: [{ text: '# Step 1: Run a general scan first to find your target', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airodump-ng wlan0mon', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Find your target. Note these values:', type: 'comment' }] },
        { segments: [{ text: '# BSSID:   AA:BB:CC:11:22:33', type: 'comment' }] },
        { segments: [{ text: '# Channel: 6', type: 'comment' }] },
        { segments: [{ text: '# ESSID:   TargetNetwork', type: 'comment' }] },
        { segments: [{ text: '# Press Ctrl+C to stop the general scan', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Step 2: Target that specific network', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airodump-ng --bssid AA:BB:CC:11:22:33 --channel 6 --write target_capture wlan0mon', type: 'command' }] },
      ]} />

      <h3>Breaking Down the Command</h3>
      <Diagram title="Targeted airodump-ng Command Breakdown">
{`
  sudo airodump-ng --bssid AA:BB:CC:11:22:33 --channel 6 --write target_capture wlan0mon
  │                │                          │           │                       │
  │                │                          │           │                       └─ Monitor
  │                │                          │           │                          interface
  │                │                          │           │
  │                │                          │           └─ Save captured packets
  │                │                          │              to files with this prefix
  │                │                          │
  │                │                          └─ Lock to channel 6
  │                │                             (no more channel hopping!)
  │                │
  │                └─ Filter by this BSSID only
  │                   (only show this access point)
  │
  └─ Run as root (required for raw packet capture)
`}
      </Diagram>

      {/* ============================================================ */}
      {/* SECTION: Understanding Targeted Output                       */}
      {/* ============================================================ */}
      <h2>📊 Targeted Scan Output — Deep Analysis</h2>

      <Terminal lines={[
        { segments: [{ text: ' CH  6 ][ Elapsed: 2 min ][ 2024-01-15 14:30 ][ WPA handshake: AA:BB:CC:11:22:33', type: 'highlight' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: ' BSSID              PWR RXQ  Beacons  #Data  #/s  CH   MB   ENC   CIPHER AUTH ESSID', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: ' AA:BB:CC:11:22:33  -42 100    856     2340   45   6   54e  WPA2  CCMP   PSK  TargetNetwork', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: ' BSSID              STATION            PWR   Rate   Lost  Frames  Notes  Probes', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: ' AA:BB:CC:11:22:33  ', type: 'output' }, { text: 'A1:B2:C3:D4:E5:F6', type: 'highlight' }, { text: '  -35   54e-54e    0      856    EAPOL  ', type: 'output' }] },
        { segments: [{ text: ' AA:BB:CC:11:22:33  F6:E5:D4:C3:B2:A1  -52   54e-54e    3      234           ', type: 'output' }] },
        { segments: [{ text: ' AA:BB:CC:11:22:33  11:22:33:AA:BB:CC  -68   24e-54e   12       89           ', type: 'output' }] },
      ]} />

      <h3>New Columns in Targeted Mode</h3>
      <Diagram title="Additional Information in Targeted Mode">
{`
  New/Important columns:
  
  RXQ (Receive Quality):
  ├─ Percentage of successfully received packets
  ├─ 100 = perfect reception
  ├─ Below 80 = you're losing packets (move closer!)
  └─ Only shown in single-channel mode
  
  Notes column:
  ├─ EAPOL = This client completed a handshake!
  │         (We captured the WPA 4-way handshake)
  └─ Empty = normal traffic
  
  Top-right corner message:
  ┌──────────────────────────────────────────────────┐
  │ "WPA handshake: AA:BB:CC:11:22:33"              │
  │                                                  │
  │ 🎉 This means you've captured a WPA handshake!  │
  │ You can now try to crack the password offline!   │
  │                                                  │
  │ If this message doesn't appear, no handshake     │
  │ was captured yet. Wait for a client to connect,  │
  │ or force it with a deauth attack (next section)  │
  └──────────────────────────────────────────────────┘
`}
      </Diagram>

      {/* ============================================================ */}
      {/* SECTION: Saved Files                                         */}
      {/* ============================================================ */}
      <h2>💾 Understanding the Saved Files</h2>

      <p>
        When you use the <code>--write</code> flag, airodump-ng creates several files. Each serves a 
        different purpose:
      </p>

      <Terminal lines={[
        { segments: [{ text: '# After stopping the capture, check what was created:', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'ls -la target_capture*', type: 'command' }] },
        { segments: [{ text: '-rw-r--r-- 1 root root  245760 Jan 15 14:32 ', type: 'output' }, { text: 'target_capture-01.cap', type: 'highlight' }] },
        { segments: [{ text: '-rw-r--r-- 1 root root    2048 Jan 15 14:32 target_capture-01.csv', type: 'output' }] },
        { segments: [{ text: '-rw-r--r-- 1 root root    1536 Jan 15 14:32 target_capture-01.kismet.csv', type: 'output' }] },
        { segments: [{ text: '-rw-r--r-- 1 root root    3072 Jan 15 14:32 target_capture-01.kismet.netxml', type: 'output' }] },
        { segments: [{ text: '-rw-r--r-- 1 root root     512 Jan 15 14:32 target_capture-01.log.csv', type: 'output' }] },
      ]} />

      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ padding: '8px', textAlign: 'left' }}>File</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Format</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['.cap', 'PCAP (packet capture)', 'Raw packets! Used by aircrack-ng, Wireshark, hashcat. THE IMPORTANT FILE.'],
            ['.csv', 'Comma-separated values', 'Summary of APs and clients. Open in spreadsheet for analysis.'],
            ['.kismet.csv', 'Kismet CSV format', 'Compatible with Kismet network detector.'],
            ['.kismet.netxml', 'Kismet NetXML', 'Detailed XML format for advanced tools.'],
            ['.log.csv', 'Log CSV', 'GPS coordinates and timing info (if GPS is connected).'],
          ].map(([file, format, purpose], i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '8px' }}><code>{file}</code></td>
              <td style={{ padding: '8px' }}>{format}</td>
              <td style={{ padding: '8px' }}>{purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <InfoBox type="danger">
        <strong>The .cap file is everything!</strong> This is the file that contains the raw captured 
        packets. It's what you feed to <code>aircrack-ng</code> for password cracking, to 
        <code>Wireshark</code> for deep packet analysis, or to <code>hashcat</code> for GPU-accelerated 
        cracking. <strong>Never delete your .cap files</strong> until you're completely done with the 
        engagement. Back them up!
      </InfoBox>

      <Terminal lines={[
        { segments: [{ text: '# Verify the capture file contains a handshake', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'aircrack-ng target_capture-01.cap', type: 'command' }] },
        { segments: [{ text: '                               Aircrack-ng 1.7', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '      [00:00:00] Tested 0 keys (got 0 IVs)', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '   #  BSSID              ESSID                 Encryption', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '   1  AA:BB:CC:11:22:33  TargetNetwork         WPA (', type: 'output' }, { text: '1 handshake', type: 'highlight' }, { text: ')', type: 'output' }] },
        { segments: [{ text: '                                                ^^^^^^^^^^^^', type: 'comment' }] },
        { segments: [{ text: '                                                Handshake confirmed!', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Open in Wireshark for detailed packet inspection', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'wireshark target_capture-01.cap &', type: 'command' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: Client Analysis                                     */}
      {/* ============================================================ */}
      <h2>👥 Analyzing Connected Clients</h2>

      <p>
        The bottom section of the targeted scan is incredibly valuable. Each connected client reveals:
      </p>

      <Diagram title="Client Intelligence Gathering">
{`
  What each client tells you:
  
  Client: A1:B2:C3:D4:E5:F6  PWR: -35  Frames: 856  Notes: EAPOL
  │                            │         │             │
  │                            │         │             └─ Recently authenticated
  │                            │         │                (handshake captured!)
  │                            │         │
  │                            │         └─ Very active (many frames)
  │                            │            Good target for deauth
  │                            │
  │                            └─ Strong signal (close to you)
  │                               Deauth attack will work well
  │
  └─ MAC address → OUI lookup:
     A1:B2:C3 = ? (check manufacturer)
     
     Common scenarios:
     ├─ AC:DE:48 = Apple device (iPhone/MacBook)
     ├─ 08:00:27 = VirtualBox VM (test environment?)
     ├─ DC:A6:32 = Raspberry Pi
     └─ B4:2E:99 = Intel (Windows laptop likely)
  
  Strategic value:
  ├─ Closest client → best for deauth
  ├─ Most active client → most data to capture
  ├─ EAPOL client → already got their handshake!
  └─ Multiple clients → more chances for handshake
`}
      </Diagram>

      {/* ============================================================ */}
      {/* SECTION: Edge Cases                                          */}
      {/* ============================================================ */}
      <h2>⚠️ Edge Cases & Troubleshooting</h2>

      <h3>Edge Case: No clients showing up</h3>
      <p>
        If the top section shows the AP but the bottom section is empty, possible reasons:
      </p>
      <ul>
        <li><strong>No one is connected</strong> — wait longer or try at a busier time</li>
        <li><strong>Wrong channel</strong> — verify you specified the correct channel</li>
        <li><strong>5 GHz clients</strong> — clients might be on the 5 GHz band while you're scanning 2.4 GHz</li>
        <li><strong>Devices are idle</strong> — devices that aren't actively sending data may not appear immediately. Wait a few minutes.</li>
      </ul>

      <h3>Edge Case: File numbering (-01, -02, -03...)</h3>
      <p>
        If you run the same <code>--write</code> prefix multiple times, airodump-ng increments the 
        number: <code>target_capture-01.cap</code>, <code>target_capture-02.cap</code>, etc. It never 
        overwrites existing files. If you want to start fresh, delete or move old files.
      </p>

      <h3>Edge Case: Capture file getting too large</h3>
      <Terminal lines={[
        { segments: [{ text: '# On busy networks, .cap files can grow to GBs', type: 'comment' }] },
        { segments: [{ text: '# Check file size periodically:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'ls -lh target_capture-01.cap', type: 'command' }] },
        { segments: [{ text: '-rw-r--r-- 1 root root 2.3G Jan 15 15:45 target_capture-01.cap', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# If you only need the handshake, extract it to a smaller file:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'tshark -r target_capture-01.cap -Y "eapol" -w handshake_only.cap', type: 'command' }] },
      ]} />

      <h3>Edge Case: "WPA handshake" message appears then disappears</h3>
      <p>
        Sometimes airodump-ng briefly shows "WPA handshake" but it disappears. This means a 
        <em>partial</em> handshake was captured (not all 4 EAPOL frames). You need the complete 
        4-way handshake. Force a re-capture using a deauth attack (covered next).
      </p>

      <InfoBox type="success">
        <strong>Key Takeaways:</strong>
        <ul>
          <li>Always use <code>--bssid</code> and <code>--channel</code> for targeted captures</li>
          <li>Always use <code>--write</code> to save packets — you'll need the .cap file!</li>
          <li>The "WPA handshake:" message at top-right means you captured a handshake</li>
          <li>Client data helps you pick the best target for deauth attacks</li>
          <li>Watch for the EAPOL note in the client section</li>
          <li>Verify your capture with <code>aircrack-ng filename.cap</code></li>
        </ul>
      </InfoBox>

      <h2>📚 What's Next?</h2>
      <p>
        Now that you can target and capture traffic from a specific network, let's learn the most 
        powerful pre-connection attack: the <strong>Deauthentication Attack</strong>. This forces 
        clients to disconnect and reconnect, allowing you to capture WPA handshakes on demand.
      </p>
    </div>
  );
};

export default TargetedSniffing;
