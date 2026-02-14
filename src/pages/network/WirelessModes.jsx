import React from 'react';
import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

const WirelessModes = () => {
  return (
    <div className="page-content">
      <h1>Wireless Modes — Managed vs Monitor Mode</h1>

      <p>
        Your wireless adapter can operate in several modes, but the two most important for WiFi hacking 
        are <strong>Managed Mode</strong> (normal usage) and <strong>Monitor Mode</strong> (passive 
        sniffing). Understanding these modes is the gateway to everything we'll do from here — packet 
        sniffing, handshake capture, deauth attacks, and WEP/WPA cracking all require monitor mode.
      </p>

      {/* ============================================================ */}
      {/* SECTION: Understanding Wireless Modes                        */}
      {/* ============================================================ */}
      <h2>📡 All WiFi Operating Modes Explained</h2>

      <p>
        WiFi adapters can operate in several modes. Think of it like a walkie-talkie with different 
        settings — some let you talk to one person, others let you listen to everyone:
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ padding: '8px', textAlign: 'left' }}>Mode</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Description</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Can See</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Use Case</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Managed', 'Normal mode. Connects to one AP.', 'Only your own traffic', 'Everyday WiFi usage'],
            ['Monitor', 'Passive listening. No association.', 'ALL wireless frames', 'Packet sniffing, hacking'],
            ['Master/AP', 'Acts as an access point.', 'All connected clients', 'Evil Twin attacks, rogue AP'],
            ['Ad-hoc', 'Peer-to-peer, no router needed.', 'Direct device traffic', 'Mesh networks'],
            ['Mesh', 'Cooperative multi-hop network.', 'Forwarded traffic', 'Large area coverage'],
          ].map(([mode, desc, canSee, use], i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '8px' }}><strong>{mode}</strong></td>
              <td style={{ padding: '8px' }}>{desc}</td>
              <td style={{ padding: '8px' }}>{canSee}</td>
              <td style={{ padding: '8px' }}>{use}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ============================================================ */}
      {/* SECTION: Managed Mode Deep Dive                              */}
      {/* ============================================================ */}
      <h2>📱 Managed Mode — Normal WiFi Operation</h2>

      <p>
        In <strong>Managed Mode</strong>, your wireless adapter behaves like a well-mannered guest at a 
        party. It connects to one specific access point (the host), and only listens to conversations 
        directed at it. This is the default mode for every WiFi device — your phone, laptop, smart TV, 
        and IoT devices all operate in managed mode.
      </p>

      <h3>How Managed Mode Works Under the Hood</h3>
      <Diagram title="Managed Mode — Traffic Flow">
{`
  Access Point: "HomeNetwork" (192.168.1.1)
  ┌──────────────────────────────────────────────┐
  │                                              │
  │  Broadcasting on Channel 6, 2.4 GHz          │
  │                                              │
  └──┬──────────┬──────────┬──────────┬──────────┘
     │          │          │          │
     │          │          │          │
  ┌──▼──┐   ┌──▼──┐   ┌──▼──┐   ┌──▼──┐
  │Phone│   │ PC  │   │ TV  │   │ YOU │
  │.100 │   │.101 │   │.102 │   │.105 │
  └─────┘   └─────┘   └─────┘   └─────┘
  
  What YOUR adapter (in managed mode) sees:
  ┌─────────────────────────────────────────┐
  │ ✅ Traffic TO your MAC (from router)    │
  │ ✅ Traffic FROM your MAC (to router)    │
  │ ✅ Broadcast frames (DHCP, ARP)         │
  │ ❌ Phone ↔ Router traffic               │
  │ ❌ PC ↔ Router traffic                  │
  │ ❌ TV ↔ Router traffic                  │
  │ ❌ Other networks' traffic              │
  │ ❌ Probe requests from nearby devices   │
  └─────────────────────────────────────────┘
`}
      </Diagram>

      <p>
        The key limitation: in managed mode, the adapter's firmware and driver <strong>filter out</strong> 
        any frame not addressed to your MAC address. Even though the radio physically receives all 
        nearby WiFi signals, the chip discards everything that's "not for you" before it even reaches 
        the operating system.
      </p>

      {/* ============================================================ */}
      {/* SECTION: Monitor Mode Deep Dive                              */}
      {/* ============================================================ */}
      <h2>🎯 Monitor Mode — See Everything</h2>

      <p>
        <strong>Monitor Mode</strong> is like having super-hearing at that party — you can hear 
        <em>every</em> conversation happening in the room, not just the ones directed at you. The 
        adapter stops filtering and passes <strong>every single wireless frame</strong> to the operating 
        system, regardless of the destination MAC address.
      </p>

      <h3>What You Can See in Monitor Mode</h3>
      <Diagram title="Monitor Mode — Everything Is Visible">
{`
  In Monitor Mode, your adapter captures EVERYTHING:
  
  ┌─────────────────────────────────────────────────────┐
  │  ALL WiFi frames in range on the current channel    │
  ├─────────────────────────────────────────────────────┤
  │                                                     │
  │  📡 Beacon Frames (from ALL access points)          │
  │     → SSID, channel, encryption type, vendor        │
  │                                                     │
  │  📱 Probe Requests (from ALL devices)               │
  │     → Devices searching for known networks          │
  │     → Reveals network names devices remember!       │
  │                                                     │
  │  🔐 Authentication/Association Frames               │
  │     → See who's connecting to what                  │
  │                                                     │
  │  🤝 WPA 4-Way Handshakes                            │
  │     → The key exchange we capture for cracking      │
  │                                                     │
  │  📦 Data Frames (encrypted if WPA/WPA2)             │
  │     → Can see source/dest MAC, packet sizes         │
  │     → WEP data can be decrypted                     │
  │                                                     │
  │  💀 Deauthentication/Disassociation Frames          │
  │     → See if someone is performing deauth attacks   │
  │                                                     │
  │  🔍 Management Frames (all types)                   │
  │     → The complete "control plane" of WiFi          │
  └─────────────────────────────────────────────────────┘
`}
      </Diagram>

      <InfoBox type="warning">
        <strong>Important limitation:</strong> In monitor mode, your adapter can only listen on 
        <strong>one channel at a time</strong>. WiFi uses multiple channels (1-14 for 2.4 GHz, many 
        more for 5 GHz). To see all networks, tools like <code>airodump-ng</code> rapidly hop between 
        channels. But when you're targeting a specific network, you lock to its channel.
      </InfoBox>

      <InfoBox type="note">
        <strong>Monitor mode ≠ Connected to a network.</strong> When you enter monitor mode, your 
        adapter <strong>disconnects from all networks</strong>. It can't be in managed mode and monitor 
        mode simultaneously (though some modern adapters support virtual interfaces for both). This 
        means you'll lose your internet connection on that adapter while sniffing.
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: Enabling Monitor Mode                               */}
      {/* ============================================================ */}
      <h2>🚀 Enabling Monitor Mode</h2>

      <p>
        There are two main methods to enable monitor mode. Method 1 (<code>airmon-ng</code>) is the 
        recommended approach for beginners. Method 2 (<code>iw</code>) gives you more control.
      </p>

      <h3>Method 1: Using airmon-ng (Recommended)</h3>
      <Terminal lines={[
        { segments: [{ text: '# Step 1: Check your wireless interfaces', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airmon-ng', type: 'command' }] },
        { segments: [{ text: 'PHY     Interface   Driver        Chipset', type: 'output' }] },
        { segments: [{ text: 'phy0    wlan0       ath9k_htc     Qualcomm Atheros AR9271', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Step 2: Kill interfering processes', type: 'comment' }] },
        { segments: [{ text: '# These processes can cause problems in monitor mode', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airmon-ng check kill', type: 'command' }] },
        { segments: [{ text: 'Killing these processes:', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '  PID Name', type: 'output' }] },
        { segments: [{ text: '  684 wpa_supplicant', type: 'output' }] },
        { segments: [{ text: '  721 NetworkManager', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Step 3: Enable monitor mode', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airmon-ng start wlan0', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: 'PHY     Interface   Driver        Chipset', type: 'output' }] },
        { segments: [{ text: 'phy0    ', type: 'output' }, { text: 'wlan0mon', type: 'highlight' }, { text: '    ath9k_htc     Qualcomm Atheros AR9271', type: 'output' }] },
        { segments: [{ text: '              (mac80211 monitor mode vif enabled for [phy0]wlan0 on [phy0]wlan0mon)', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Step 4: Verify monitor mode is active', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'iwconfig wlan0mon', type: 'command' }] },
        { segments: [{ text: 'wlan0mon  IEEE 802.11  Mode:', type: 'output' }, { text: 'Monitor', type: 'highlight' }, { text: '  Frequency:2.412 GHz', type: 'output' }] },
        { segments: [{ text: '          Tx-Power=20 dBm', type: 'output' }] },
      ]} />

      <InfoBox type="danger">
        <strong>Why "check kill" is critical!</strong> Programs like <code>NetworkManager</code> and 
        <code>wpa_supplicant</code> constantly try to manage your WiFi adapter — scanning for networks, 
        reconnecting, changing channels. If they're running while you're in monitor mode, they'll:
        <ul>
          <li>Change your channel randomly (ruining targeted captures)</li>
          <li>Try to take the adapter out of monitor mode</li>
          <li>Cause packet loss and unreliable captures</li>
          <li>Interfere with injection attacks</li>
        </ul>
        Always run <code>airmon-ng check kill</code> before starting monitor mode!
      </InfoBox>

      <h3>Method 2: Using iw and ip commands (Manual)</h3>
      <Terminal lines={[
        { segments: [{ text: '# Manual approach — more control but more steps', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Step 1: Kill interfering processes manually', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo systemctl stop NetworkManager', type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo killall wpa_supplicant', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Step 2: Bring interface down', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo ip link set wlan0 down', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Step 3: Set monitor mode', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo iw dev wlan0 set type monitor', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Step 4: Bring interface back up', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo ip link set wlan0 up', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Verify', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'iwconfig wlan0', type: 'command' }] },
        { segments: [{ text: 'wlan0  IEEE 802.11  Mode:', type: 'output' }, { text: 'Monitor', type: 'highlight' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Note: With this method, the interface stays as "wlan0"', type: 'comment' }] },
        { segments: [{ text: '# (not renamed to wlan0mon like with airmon-ng)', type: 'comment' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: Stopping Monitor Mode                               */}
      {/* ============================================================ */}
      <h2>⏹️ Stopping Monitor Mode</h2>

      <Terminal lines={[
        { segments: [{ text: '# Method 1: Using airmon-ng', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airmon-ng stop wlan0mon', type: 'command' }] },
        { segments: [{ text: 'PHY     Interface   Driver        Chipset', type: 'output' }] },
        { segments: [{ text: 'phy0    wlan0       ath9k_htc     Qualcomm Atheros AR9271', type: 'output' }] },
        { segments: [{ text: '          (mac80211 station mode vif enabled on [phy0]wlan0)', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Restart NetworkManager to get internet back', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo systemctl start NetworkManager', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Method 2: Manual', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo ip link set wlan0 down', type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo iw dev wlan0 set type managed', type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo ip link set wlan0 up', type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo systemctl start NetworkManager', type: 'command' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: Complete Workflow                                    */}
      {/* ============================================================ */}
      <h2>📋 Complete Monitor Mode Workflow</h2>

      <p>Here's the complete workflow you'll follow for every WiFi hacking session:</p>

      <Diagram title="Standard WiFi Hacking Session Setup">
{`
  START
   │
   ▼
  ┌─────────────────────────────┐
  │ 1. Plug in USB WiFi adapter │
  │    (or USB passthrough VM)  │
  └──────────────┬──────────────┘
                 │
   ▼─────────────┘
  ┌─────────────────────────────┐
  │ 2. Verify adapter detected  │
  │    $ sudo airmon-ng         │
  └──────────────┬──────────────┘
                 │
   ▼─────────────┘
  ┌─────────────────────────────┐
  │ 3. (Optional) Change MAC    │
  │    $ sudo macchanger -a     │
  └──────────────┬──────────────┘
                 │
   ▼─────────────┘
  ┌─────────────────────────────┐
  │ 4. Kill interfering procs   │
  │    $ sudo airmon-ng         │
  │      check kill             │
  └──────────────┬──────────────┘
                 │
   ▼─────────────┘
  ┌─────────────────────────────┐
  │ 5. Enable monitor mode      │
  │    $ sudo airmon-ng start   │
  │      wlan0                  │
  └──────────────┬──────────────┘
                 │
   ▼─────────────┘
  ┌─────────────────────────────┐
  │ 6. Start your attack!       │
  │    (sniffing, deauth, etc.) │
  └──────────────┬──────────────┘
                 │
   ▼─────────────┘
  ┌─────────────────────────────┐
  │ 7. When done:               │
  │    $ sudo airmon-ng stop    │
  │      wlan0mon               │
  │    $ sudo systemctl start   │
  │      NetworkManager         │
  └─────────────────────────────┘
   │
   ▼
  DONE (Internet restored)
`}
      </Diagram>

      {/* ============================================================ */}
      {/* SECTION: Edge Cases                                          */}
      {/* ============================================================ */}
      <h2>⚠️ Edge Cases & Troubleshooting</h2>

      <h3>Edge Case: Interface name doesn't change to wlan0mon</h3>
      <p>
        Some adapters and drivers don't rename the interface. The adapter may stay as <code>wlan0</code> 
        even in monitor mode. Check with <code>iwconfig</code> — if it says <code>Mode:Monitor</code>, 
        you're in monitor mode regardless of the name.
      </p>

      <h3>Edge Case: "Device or resource busy" error</h3>
      <Terminal lines={[
        { segments: [{ text: '# If you get "Device or resource busy":', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo rfkill list all', type: 'command' }, { text: '  # Check for soft/hard blocks', type: 'comment' }] },
        { segments: [{ text: '0: phy0: Wireless LAN', type: 'output' }] },
        { segments: [{ text: '    Soft blocked: ', type: 'output' }, { text: 'yes', type: 'highlight' }, { text: '  ← Problem!', type: 'comment' }] },
        { segments: [{ text: '    Hard blocked: no', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Unblock it:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo rfkill unblock all', type: 'command' }] },
      ]} />

      <h3>Edge Case: Monitor mode starts but no packets captured</h3>
      <ul>
        <li><strong>Channel mismatch:</strong> Your adapter might be on channel 1 while the target AP is on channel 6. Use <code>iwconfig wlan0mon channel 6</code> to change.</li>
        <li><strong>5 GHz network:</strong> If your adapter only supports 2.4 GHz, you won't see 5 GHz networks.</li>
        <li><strong>Antenna issue:</strong> Some USB adapters have detachable antennas. Make sure it's screwed on.</li>
        <li><strong>Too far away:</strong> Move closer to the target network.</li>
      </ul>

      <h3>Edge Case: Multiple virtual interfaces</h3>
      <Terminal lines={[
        { segments: [{ text: '# Some adapters create extra virtual interfaces', type: 'comment' }] },
        { segments: [{ text: '# that can interfere with monitor mode:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'iw dev', type: 'command' }] },
        { segments: [{ text: 'phy#0', type: 'output' }] },
        { segments: [{ text: '    Interface wlan0', type: 'output' }] },
        { segments: [{ text: '        type managed', type: 'output' }] },
        { segments: [{ text: '    Interface wlan0mon', type: 'output' }] },
        { segments: [{ text: '        type monitor', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# If both exist, remove the managed one:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo iw dev wlan0 del', type: 'command' }] },
      ]} />

      <InfoBox type="success">
        <strong>Key Takeaways:</strong>
        <ul>
          <li><strong>Managed mode</strong> = normal WiFi. Only sees your traffic.</li>
          <li><strong>Monitor mode</strong> = hacking mode. Sees ALL traffic on the current channel.</li>
          <li>Always <code>airmon-ng check kill</code> before starting monitor mode</li>
          <li>Monitor mode disconnects you from all WiFi networks</li>
          <li>Your adapter can only monitor one channel at a time</li>
          <li>Remember to stop monitor mode and restart NetworkManager when you're done</li>
        </ul>
      </InfoBox>

      <h2>📚 What's Next?</h2>
      <p>
        Now that your adapter is in monitor mode, it's time to start <strong>sniffing packets</strong>! 
        In the next section, we'll use <code>airodump-ng</code> to discover all WiFi networks and 
        connected devices in your area.
      </p>
    </div>
  );
};

export default WirelessModes;
