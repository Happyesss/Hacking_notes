import React from 'react';
import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

const PacketSniffing = () => {
  return (
    <div className="page-content">
      <h1>Packet Sniffing — Discovering Networks with airodump-ng</h1>

      <p>
        Now that your adapter is in monitor mode, it's time to see what's happening in the airwaves 
        around you. <strong>Packet sniffing</strong> is the process of passively capturing wireless 
        frames to discover networks, connected devices, encryption types, signal strengths, and 
        much more. The primary tool for this is <code>airodump-ng</code>, part of the aircrack-ng suite.
      </p>

      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Aircrack-ng-new-logo.jpg/640px-Aircrack-ng-new-logo.jpg" 
        alt="Aircrack-ng logo" 
        style={{ maxWidth: '300px', borderRadius: 8, margin: '16px 0' }} 
      />
      <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
        Aircrack-ng — the Swiss Army knife of WiFi hacking tools.
      </p>

      {/* ============================================================ */}
      {/* SECTION: What is airodump-ng?                                */}
      {/* ============================================================ */}
      <h2>🔍 What is airodump-ng?</h2>

      <p>
        <strong>airodump-ng</strong> is a wireless network detector and packet sniffer. Think of it as 
        a radar system — it scans all WiFi channels and shows you every access point and every device 
        it detects. It's like turning on night vision in a dark room — suddenly you can see everything.
      </p>

      <h3>What airodump-ng can tell you:</h3>
      <ul>
        <li><strong>Every WiFi network</strong> in range (including hidden ones)</li>
        <li><strong>Encryption type</strong> of each network (Open, WEP, WPA, WPA2, WPA3)</li>
        <li><strong>All connected devices</strong> (clients) and which network they're on</li>
        <li><strong>Signal strength</strong> to gauge how close a network is</li>
        <li><strong>Channel</strong> each network operates on</li>
        <li><strong>Data packet count</strong> (useful for WEP cracking)</li>
        <li><strong>BSSID</strong> (the router's MAC address)</li>
        <li><strong>Manufacturer</strong> of each device (via OUI lookup)</li>
      </ul>

      {/* ============================================================ */}
      {/* SECTION: Starting airodump-ng                                */}
      {/* ============================================================ */}
      <h2>🚀 Starting a Basic Scan</h2>

      <p>
        Before running airodump-ng, make sure your adapter is in monitor mode (see previous section). 
        Then simply run:
      </p>

      <Terminal lines={[
        { segments: [{ text: '# Make sure you\'re in monitor mode first', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airodump-ng wlan0mon', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: ' CH  9 ][ Elapsed: 30 s ][ 2024-01-15 14:25', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: ' BSSID              PWR  Beacons  #Data  #/s  CH   MB   ENC   CIPHER AUTH ESSID', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: ' ', type: 'output' }, { text: 'AA:BB:CC:11:22:33', type: 'highlight' }, { text: '  -45    120     85   12   6   54e  ', type: 'output' }, { text: 'WPA2', type: 'highlight' }, { text: ' CCMP   PSK  HomeNetwork', type: 'output' }] },
        { segments: [{ text: ' DD:EE:FF:44:55:66  -67     89     23    3  11   54e  WPA2 CCMP   PSK  CoffeeShop', type: 'output' }] },
        { segments: [{ text: ' 11:22:33:AA:BB:CC  -72     45      0    0   1   54e  WPA2 CCMP   PSK  <length: 0>', type: 'output' }] },
        { segments: [{ text: ' 44:55:66:DD:EE:FF  -38    200    450   45   6   54e  ', type: 'output' }, { text: 'WEP', type: 'highlight' }, { text: '  WEP         OldRouter', type: 'output' }] },
        { segments: [{ text: ' 77:88:99:AA:BB:CC  -80     30      5    0   3   54e  OPN              FreeWifi', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: ' BSSID              STATION            PWR   Rate   Lost  Frames  Notes  Probes', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: ' AA:BB:CC:11:22:33  ', type: 'output' }, { text: 'A1:B2:C3:D4:E5:F6', type: 'highlight' }, { text: '  -35   54e-54e    0      85          ', type: 'output' }] },
        { segments: [{ text: ' AA:BB:CC:11:22:33  F6:E5:D4:C3:B2:A1  -52   54e-54e    2      23          ', type: 'output' }] },
        { segments: [{ text: ' DD:EE:FF:44:55:66  12:34:56:78:9A:BC  -60   54e-54e    5      12          ', type: 'output' }] },
        { segments: [{ text: ' (not associated)   99:88:77:66:55:44  -70    0 - 0     0       8          HomeNetwork', type: 'output' }] },
      ]} />

      <p>Press <code>Ctrl+C</code> to stop the scan at any time.</p>

      {/* ============================================================ */}
      {/* SECTION: Understanding the Output                            */}
      {/* ============================================================ */}
      <h2>📊 Understanding Every Column — The Complete Breakdown</h2>

      <h3>Top Section — Access Points (Routers)</h3>

      <Diagram title="airodump-ng Output Explained — Access Points">
{`
  BSSID              PWR  Beacons  #Data  #/s  CH  MB   ENC   CIPHER AUTH ESSID
  AA:BB:CC:11:22:33  -45  120      85     12   6   54e  WPA2  CCMP   PSK  HomeNetwork
  │                   │    │        │      │    │   │    │     │      │    │
  │                   │    │        │      │    │   │    │     │      │    └─ Network name
  │                   │    │        │      │    │   │    │     │      │       (SSID)
  │                   │    │        │      │    │   │    │     │      │
  │                   │    │        │      │    │   │    │     │      └─ Authentication
  │                   │    │        │      │    │   │    │     │         PSK = Pre-Shared Key
  │                   │    │        │      │    │   │    │     │         MGT = Enterprise
  │                   │    │        │      │    │   │    │     │
  │                   │    │        │      │    │   │    │     └─ Cipher (encryption algo)
  │                   │    │        │      │    │   │    │        CCMP = AES (strong)
  │                   │    │        │      │    │   │    │        TKIP = older (weaker)
  │                   │    │        │      │    │   │    │
  │                   │    │        │      │    │   │    └─ Encryption type
  │                   │    │        │      │    │   │       WPA2, WPA, WEP, OPN (open)
  │                   │    │        │      │    │   │
  │                   │    │        │      │    │   └─ Max supported speed (Mbps)
  │                   │    │        │      │    │      'e' = 802.11n/ac support
  │                   │    │        │      │    │
  │                   │    │        │      │    └─ WiFi channel (1-14 for 2.4GHz)
  │                   │    │        │      │
  │                   │    │        │      └─ Data packets per second (activity level)
  │                   │    │        │
  │                   │    │        └─ Total data packets captured
  │                   │    │           (CRITICAL for WEP cracking — need 25,000+)
  │                   │    │
  │                   │    └─ Beacon count (AP announcements)
  │                   │       Higher = stronger signal / closer
  │                   │
  │                   └─ Signal power in dBm
  │                      -30 = very close (right next to you)
  │                      -50 = good signal
  │                      -70 = weak signal
  │                      -90 = barely detectable
  │
  └─ Router's MAC address (unique identifier)
`}
      </Diagram>

      <h3>Bottom Section — Clients (Connected Devices)</h3>

      <Diagram title="airodump-ng Output Explained — Clients">
{`
  BSSID              STATION            PWR   Rate      Lost  Frames  Probes
  AA:BB:CC:11:22:33  A1:B2:C3:D4:E5:F6  -35  54e-54e   0     85      
  │                  │                   │    │          │     │       │
  │                  │                   │    │          │     │       └─ Networks this device
  │                  │                   │    │          │     │          has probed for
  │                  │                   │    │          │     │          (looking for saved WiFi)
  │                  │                   │    │          │     │
  │                  │                   │    │          │     └─ Total frames captured
  │                  │                   │    │          │
  │                  │                   │    │          └─ Lost packets (connectivity issues)
  │                  │                   │    │
  │                  │                   │    └─ Send-Receive rate
  │                  │                   │       (how fast data is flowing)
  │                  │                   │
  │                  │                   └─ Client signal strength
  │                  │
  │                  └─ Client's MAC address (phone/laptop/etc.)
  │
  └─ Which AP (router) the client is connected to
     "(not associated)" = device not connected to any network
     but still sending probe requests
`}
      </Diagram>

      {/* ============================================================ */}
      {/* SECTION: Signal Strength Guide                               */}
      {/* ============================================================ */}
      <h2>📶 Understanding Signal Strength (PWR/dBm)</h2>

      <p>
        Signal strength is measured in <strong>dBm</strong> (decibels relative to milliwatt). The scale 
        is logarithmic and always negative — the closer to 0, the stronger the signal:
      </p>

      <Diagram title="Signal Strength Scale">
{`
  Signal Strength (dBm)
  
  ◄── Stronger ────────────────────────────── Weaker ──►
  
  -20     -30     -40     -50     -60     -70     -80     -90
   │       │       │       │       │       │       │       │
   │       │       │       │       │       │       │       └─ 📵 Almost unusable
   │       │       │       │       │       │       │          Barely any packets
   │       │       │       │       │       │       │
   │       │       │       │       │       │       └─ 🔴 Very weak
   │       │       │       │       │       │          May capture some packets
   │       │       │       │       │       │
   │       │       │       │       │       └─ 🟠 Weak but usable
   │       │       │       │       │          Attacks may be slow
   │       │       │       │       │
   │       │       │       │       └─ 🟡 Good
   │       │       │       │          Reliable for most attacks
   │       │       │       │
   │       │       │       └─ 🟢 Strong
   │       │       │          Great for all attacks
   │       │       │
   │       │       └─ 🟢 Very strong (same room)
   │       │
   │       └─ 💚 Excellent (very close)
   │
   └─ 💚 Maximum (right next to AP)
  
  For hacking: aim for -60 dBm or better
  PWR of -1 = driver doesn't report signal strength
`}
      </Diagram>

      <InfoBox type="tip">
        <strong>Pro tip — Signal strength matters for attacks!</strong> 
        <ul>
          <li><strong>Deauth attacks</strong> need to reach both the AP and the client. If either has weak 
              signal, the attack may fail.</li>
          <li><strong>WEP cracking</strong> needs thousands of data packets. Weak signal = more packet loss = slower.</li>
          <li><strong>Handshake capture</strong> requires capturing specific frames. Better signal = higher chance 
              of capturing the complete handshake.</li>
          <li>Move physically closer to the target or use a <strong>high-gain antenna</strong>.</li>
        </ul>
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: What the Data Reveals                               */}
      {/* ============================================================ */}
      <h2>🕵️ What You Can Learn From a Scan</h2>

      <p>
        A single airodump-ng scan reveals a treasure trove of information. Let's analyze a sample 
        scenario:
      </p>

      <Diagram title="Analyzing a Scan — What Each Network Tells You">
{`
  Network Analysis:
  
  1. "HomeNetwork" — WPA2, CCMP, PSK, CH 6, PWR -45
     └─► Modern encryption, good signal, 2 clients connected
         Strategy: Capture handshake → wordlist attack
  
  2. "CoffeeShop" — WPA2, CCMP, PSK, CH 11, PWR -67
     └─► Weaker signal, some activity
         Could be a business with a simple password
  
  3. "<length: 0>" — WPA2, CCMP, PSK, CH 1, PWR -72
     └─► 🔥 HIDDEN NETWORK! SSID not broadcast
         But we can still see it! (length: 0 or empty ESSID)
         We can discover the name from probe requests
         or by deauthing a connected client
  
  4. "OldRouter" — WEP, CH 6, PWR -38, #Data: 450
     └─► 🎯 JACKPOT! WEP encryption (easily crackable!)
         Strong signal, lots of data already flowing
         Can crack in minutes with enough IVs
  
  5. "FreeWifi" — OPN (Open), CH 3, PWR -80
     └─► No encryption at all. All traffic visible.
         But weak signal. Could be an evil twin!
  
  6. "(not associated)" device probing for "HomeNetwork"
     └─► A device not connected but looking for that network
         Could be targeted with an evil twin attack
`}
      </Diagram>

      {/* ============================================================ */}
      {/* SECTION: Useful Flags                                        */}
      {/* ============================================================ */}
      <h2>🏁 Useful airodump-ng Options</h2>

      <Terminal lines={[
        { segments: [{ text: '# Scan only 2.4 GHz band', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airodump-ng --band a wlan0mon', type: 'command' }, { text: '  # 5GHz only', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airodump-ng --band bg wlan0mon', type: 'command' }, { text: '  # 2.4GHz only', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airodump-ng --band abg wlan0mon', type: 'command' }, { text: '  # Both bands', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Lock to a specific channel (stops channel hopping)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airodump-ng --channel 6 wlan0mon', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Only show networks with specific encryption', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airodump-ng --encrypt WEP wlan0mon', type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airodump-ng --encrypt WPA2 wlan0mon', type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airodump-ng --encrypt OPN wlan0mon', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Save results to files (essential for later analysis)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airodump-ng -w capture_results wlan0mon', type: 'command' }] },
        { segments: [{ text: '# Creates: capture_results-01.cap (packets)', type: 'comment' }] },
        { segments: [{ text: '#          capture_results-01.csv (spreadsheet data)', type: 'comment' }] },
        { segments: [{ text: '#          capture_results-01.kismet.csv', type: 'comment' }] },
        { segments: [{ text: '#          capture_results-01.kismet.netxml', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Apply manufacturer name lookup (shows device brands)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airodump-ng --manufacturer wlan0mon', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Show WPS status (useful for WPS attacks)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airodump-ng --wps wlan0mon', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Update speed (in seconds) — slower = less CPU', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airodump-ng --update 2 wlan0mon', type: 'command' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: Edge Cases                                          */}
      {/* ============================================================ */}
      <h2>⚠️ Edge Cases & Important Considerations</h2>

      <h3>Edge Case: Hidden Networks (ESSID: &lt;length: 0&gt;)</h3>
      <p>
        Some networks hide their SSID by not including it in beacon frames. But they're <em>not invisible</em> — 
        airodump-ng still detects them! You'll see <code>&lt;length: 0&gt;</code> or a blank ESSID. 
        The network name is revealed when:
      </p>
      <ul>
        <li>A client sends a probe request for the hidden network</li>
        <li>A client connects/reconnects (the SSID appears in association frames)</li>
        <li>You deauth a connected client, forcing reconnection</li>
      </ul>

      <h3>Edge Case: Networks appearing and disappearing</h3>
      <p>
        airodump-ng hops between channels by default. A network on channel 6 is only visible when 
        the adapter is tuned to channel 6. Networks may seem to "flicker" in and out. If you need 
        stable monitoring of one network, <strong>lock to its channel</strong> with <code>--channel</code>.
      </p>

      <h3>Edge Case: PWR shows -1</h3>
      <p>
        A power reading of <code>-1</code> means the driver doesn't support signal level reporting for 
        that frame. This is common for some chipsets. You can still capture packets — you just can't 
        gauge the signal strength.
      </p>

      <h3>Edge Case: Same ESSID, different BSSID</h3>
      <p>
        Large offices and hotels use multiple access points with the same network name but different 
        BSSIDs. They'll appear as separate entries in airodump-ng. When targeting such networks, always 
        use the <strong>BSSID</strong> (MAC address) to identify the specific AP, not the ESSID (name).
      </p>

      <h3>Edge Case: "Fixed channel" warning</h3>
      <Terminal lines={[
        { segments: [{ text: '# If you see: "fixed channel wlan0mon: 6"', type: 'comment' }] },
        { segments: [{ text: '# This means another process locked your adapter to a channel', type: 'comment' }] },
        { segments: [{ text: '# Fix: kill all interfering processes', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airmon-ng check kill', type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airodump-ng wlan0mon', type: 'command' }] },
      ]} />

      <InfoBox type="success">
        <strong>Key Takeaways:</strong>
        <ul>
          <li><code>airodump-ng</code> is your primary reconnaissance tool</li>
          <li>Top section shows APs, bottom section shows connected clients</li>
          <li>Pay attention to <strong>ENC</strong> (encryption type) to determine attack strategy</li>
          <li><strong>PWR</strong> tells you signal strength — closer is better for attacks</li>
          <li>Always note the <strong>BSSID</strong> and <strong>channel</strong> of your target</li>
          <li>Use <code>-w</code> to save captures for later analysis</li>
          <li>Hidden networks are still visible — just with empty ESSID</li>
        </ul>
      </InfoBox>

      <h2>📚 What's Next?</h2>
      <p>
        Next, we'll learn about <strong>WiFi Bands</strong> (2.4 GHz vs 5 GHz) and how to scan them 
        both effectively. Then we'll move on to <strong>targeted sniffing</strong> — focusing on a 
        single network and its clients.
      </p>
    </div>
  );
};

export default PacketSniffing;
