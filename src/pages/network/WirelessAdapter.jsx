import React from 'react';
import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

const WirelessAdapter = () => {
  return (
    <div className="page-content">
      <h1>Wireless Adapter — Your Hacking Hardware</h1>

      <p>
        Your laptop's built-in WiFi card <strong>cannot</strong> be used for WiFi hacking. Why? Because 
        regular WiFi cards are designed to only see traffic meant for <em>your</em> device. To capture 
        other people's WiFi traffic, perform deauthentication attacks, or crack WiFi passwords, you need 
        a special external USB wireless adapter that supports <strong>monitor mode</strong> and 
        <strong>packet injection</strong>.
      </p>

      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Alfa_AWUS036NHA.jpg/1280px-Alfa_AWUS036NHA.jpg" 
        alt="Alfa AWUS036NHA wireless adapter" 
        style={{ maxWidth: '100%', borderRadius: 8, margin: '16px 0' }} 
      />
      <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
        The Alfa AWUS036NHA — one of the most popular wireless adapters for penetration testing.
      </p>

      {/* ============================================================ */}
      {/* SECTION: Why You Need a Special Adapter                      */}
      {/* ============================================================ */}
      <h2>🤔 Why Can't You Use Your Built-in WiFi Card?</h2>

      <p>
        Think of your built-in WiFi card like a pair of noise-cancelling headphones — they're designed 
        to filter out everything except what's meant for you. A hacking adapter is more like a radio 
        scanner that picks up <em>everything</em> on the airwaves. Here are the specific technical 
        reasons:
      </p>

      <h3>1. Monitor Mode Support</h3>
      <p>
        Normal WiFi cards operate in <strong>managed mode</strong> — they associate with one access point 
        and only receive packets addressed to their MAC address. <strong>Monitor mode</strong> puts the 
        card into a passive listening state where it captures <em>every</em> wireless frame in the air, 
        regardless of the destination. Most built-in cards either don't support monitor mode at all, or 
        their drivers actively prevent it.
      </p>

      <h3>2. Packet Injection</h3>
      <p>
        <strong>Packet injection</strong> is the ability to create and send arbitrary WiFi frames. This 
        is needed for:
      </p>
      <ul>
        <li><strong>Deauthentication attacks</strong> — Forging disconnect frames to kick users off a network</li>
        <li><strong>Fake authentication</strong> — Associating with an AP without knowing the password</li>
        <li><strong>ARP replay attacks</strong> — Injecting captured ARP packets to generate WEP IVs</li>
      </ul>

      <h3>3. Linux Driver Compatibility</h3>
      <p>
        Even if a WiFi card technically supports monitor mode, it needs a Linux driver that works well 
        with the <strong>aircrack-ng</strong> suite. The best chipsets have been tested and confirmed by 
        the security community over many years.
      </p>

      <Diagram title="Regular vs Hacking WiFi Adapter">
{`
  Built-in WiFi (Managed Mode)          Hacking Adapter (Monitor Mode)
  ──────────────────────────            ───────────────────────────────
  
  Only receives:                        Receives EVERYTHING:
  ┌─────────────────────────┐          ┌─────────────────────────────┐
  │ ✅ Packets TO your MAC  │          │ ✅ ALL packets in the air   │
  │ ❌ Other people's data  │          │ ✅ Beacon frames            │
  │ ❌ Management frames    │          │ ✅ Probe requests           │
  │ ❌ Beacon details       │          │ ✅ Handshakes               │
  │ ❌ Handshakes           │          │ ✅ Deauth frames            │
  └─────────────────────────┘          │ ✅ Data from ANY device     │
                                       └─────────────────────────────┘
  
  Can inject packets?                   Can inject packets?
  ❌ NO                                 ✅ YES
  
  Result: Can only browse internet      Result: Full WiFi hacking
                                              capability
`}
      </Diagram>

      {/* ============================================================ */}
      {/* SECTION: Recommended Adapters                                */}
      {/* ============================================================ */}
      <h2>🏆 Recommended Wireless Adapters</h2>

      <p>
        Not all USB WiFi adapters work for hacking. You need one with a chipset that's known to support 
        monitor mode and packet injection on Linux. Here are the proven options, ranked by recommendation:
      </p>

      <h3>Tier 1 — Best Overall (2024)</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ padding: '8px', textAlign: 'left' }}>Adapter</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Chipset</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Band</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Best For</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Alfa AWUS036ACHM', 'MT7612U', 'Dual (2.4/5)', 'Modern networks, WiFi 5', '~$45'],
            ['Alfa AWUS036ACH', 'RTL8812AU', 'Dual (2.4/5)', 'Long range + dual band', '~$60'],
            ['Alfa AWUS036NHA', 'AR9271', '2.4 GHz only', 'Beginners, most reliable', '~$30'],
            ['Panda PAU09', 'RT5572', 'Dual (2.4/5)', 'Budget dual-band option', '~$25'],
            ['TP-Link TL-WN722N v1', 'AR9271', '2.4 GHz only', 'Budget single-band', '~$15'],
          ].map(([adapter, chipset, band, bestFor, price], i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '8px' }}><strong>{adapter}</strong></td>
              <td style={{ padding: '8px' }}><code>{chipset}</code></td>
              <td style={{ padding: '8px' }}>{band}</td>
              <td style={{ padding: '8px' }}>{bestFor}</td>
              <td style={{ padding: '8px' }}>{price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <InfoBox type="danger">
        <strong>⚠️ CRITICAL: TP-Link TL-WN722N Version Warning!</strong> Only <strong>Version 1</strong> (v1) 
        of the TP-Link TL-WN722N uses the AR9271 chipset that supports monitor mode. Versions 2 and 3 
        use the Realtek RTL8188EUS chipset which does NOT natively support monitor mode or packet injection. 
        Check the version on the box before buying! This is one of the most common mistakes beginners make.
      </InfoBox>

      <InfoBox type="tip">
        <strong>Best beginner choice:</strong> The <strong>Alfa AWUS036NHA</strong> is the gold standard 
        for beginners. It uses the AR9271 chipset which has rock-solid Linux support, works out-of-the-box 
        in Kali Linux, and has been used in every major hacking course for over a decade. Its only 
        limitation is 2.4 GHz only — but most attacks target 2.4 GHz networks anyway since they have 
        better range.
      </InfoBox>

      <h3>Chipset Compatibility Quick Reference</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ padding: '8px', textAlign: 'left' }}>Chipset</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Monitor Mode</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Injection</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Linux Driver</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['AR9271 (Atheros)', '✅', '✅', 'ath9k_htc (built-in)', 'Best compatibility, plug & play'],
            ['MT7612U (MediaTek)', '✅', '✅', 'mt76 (built-in)', 'Great modern choice, dual-band'],
            ['RTL8812AU (Realtek)', '✅', '✅', 'rtl8812au (needs install)', 'Good but driver needs manual setup'],
            ['RT3070 (Ralink)', '✅', '✅', 'rt2800usb (built-in)', 'Older but very reliable'],
            ['RTL8188EUS', '❌', '❌', 'N/A', 'Does NOT work! (TL-WN722N v2/v3)'],
            ['Intel AX200/201', '⚠️', '❌', 'iwlwifi', 'Built-in cards, limited support'],
          ].map(([chip, monitor, inject, driver, notes], i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '8px' }}><code>{chip}</code></td>
              <td style={{ padding: '8px', textAlign: 'center' }}>{monitor}</td>
              <td style={{ padding: '8px', textAlign: 'center' }}>{inject}</td>
              <td style={{ padding: '8px' }}><code>{driver}</code></td>
              <td style={{ padding: '8px' }}>{notes}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ============================================================ */}
      {/* SECTION: VM USB Passthrough                                  */}
      {/* ============================================================ */}
      <h2>🖥️ Connecting Your Adapter to a Virtual Machine</h2>

      <p>
        If you're running Kali Linux inside a virtual machine (which most people do), you need to 
        <strong>pass through</strong> the USB adapter from your host OS to the VM. This is because 
        the VM doesn't automatically have access to physical USB devices — the host OS claims them first.
      </p>

      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/VirtualBox_logo.png/480px-VirtualBox_logo.png" 
        alt="VirtualBox logo" 
        style={{ maxWidth: '200px', borderRadius: 8, margin: '16px 0' }} 
      />

      <h3>VirtualBox Setup</h3>
      <ol>
        <li><strong>Install VirtualBox Extension Pack</strong> (for USB 2.0/3.0 support):
          <ul>
            <li>Download from <code>virtualbox.org/wiki/Downloads</code></li>
            <li>File → Preferences → Extensions → Add the downloaded file</li>
            <li>Without this, USB passthrough will be unreliable or slow</li>
          </ul>
        </li>
        <li><strong>Enable USB Controller</strong> in VM settings:
          <ul>
            <li>VM Settings → USB → Enable USB Controller</li>
            <li>Select <strong>USB 3.0 (xHCI)</strong> for best performance</li>
          </ul>
        </li>
        <li><strong>Add USB filter</strong> for your adapter:
          <ul>
            <li>Click the "+" icon with USB plug → Select your adapter</li>
            <li>This makes the adapter auto-connect when the VM starts</li>
          </ul>
        </li>
        <li><strong>Start the VM</strong> and plug in the adapter</li>
        <li>From the VM menu: <strong>Devices → USB → Select your adapter</strong></li>
      </ol>

      <InfoBox type="warning">
        <strong>Edge Case — USB not showing up:</strong> If your adapter doesn't appear in the USB devices 
        menu, try these fixes:
        <ul>
          <li>Ensure your user is in the <code>vboxusers</code> group: <code>sudo usermod -aG vboxusers $USER</code></li>
          <li>Log out and back in after adding to the group</li>
          <li>Try a different USB port (USB 2.0 ports are more compatible)</li>
          <li>Disable USB 3.0 in VM settings and try USB 2.0 (EHCI)</li>
          <li>On Linux host: <code>sudo systemctl restart virtualbox</code></li>
        </ul>
      </InfoBox>

      <h3>VMware Setup</h3>
      <ol>
        <li>Go to <strong>VM → Removable Devices → Your adapter → Connect</strong></li>
        <li>Or set it in VM Settings → USB Controller → "Automatically connect new USB devices"</li>
        <li>VMware generally handles USB passthrough more smoothly than VirtualBox</li>
      </ol>

      <Diagram title="USB Passthrough Architecture">
{`
  Physical USB Adapter
  ┌─────────────────┐
  │ Alfa AWUS036NHA │
  │ (USB 2.0)       │
  └────────┬────────┘
           │ USB Cable
           ▼
  ┌──────────────────────────────────────────────┐
  │  Host Operating System (Windows/Mac/Linux)   │
  │                                              │
  │  ┌──────────────────────┐  Before passthrough│
  │  │ USB Device Manager   │  host "owns" the   │
  │  │ sees the adapter     │  adapter            │
  │  └──────────┬───────────┘                    │
  │             │ USB Passthrough                 │
  │             ▼                                │
  │  ┌──────────────────────────────────────┐    │
  │  │  Virtual Machine (Kali Linux)        │    │
  │  │                                      │    │
  │  │  After passthrough:                  │    │
  │  │  ┌─────────────────────────────┐     │    │
  │  │  │ Kali sees it as wlan0       │     │    │
  │  │  │ Full control: monitor mode, │     │    │
  │  │  │ injection, channel hopping  │     │    │
  │  │  └─────────────────────────────┘     │    │
  │  └──────────────────────────────────────┘    │
  └──────────────────────────────────────────────┘
`}
      </Diagram>

      {/* ============================================================ */}
      {/* SECTION: Verifying Your Adapter                              */}
      {/* ============================================================ */}
      <h2>✅ Verifying Your Adapter in Kali Linux</h2>

      <p>
        Once your adapter is connected (either directly or through VM USB passthrough), you need to 
        verify that Kali Linux recognizes it and that it supports the features we need. Here's the 
        complete verification process:
      </p>

      <Terminal lines={[
        { segments: [{ text: '# Step 1: Check if the USB device is detected', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'lsusb', type: 'command' }] },
        { segments: [{ text: 'Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub', type: 'output' }] },
        { segments: [{ text: 'Bus 001 Device 002: ID ', type: 'output' }, { text: '0cf3:9271', type: 'highlight' }, { text: ' Qualcomm Atheros AR9271 802.11n', type: 'output' }] },
        { segments: [{ text: '                    ^^^^^^^^ This is your adapter!', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Step 2: Check if a wireless interface was created', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'iwconfig', type: 'command' }] },
        { segments: [{ text: 'lo        no wireless extensions.', type: 'output' }] },
        { segments: [{ text: 'eth0      no wireless extensions.', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: 'wlan0     IEEE 802.11  ESSID:off/any', type: 'highlight' }] },
        { segments: [{ text: '          Mode:Managed  Frequency:2.412 GHz', type: 'output' }] },
        { segments: [{ text: '          Access Point: Not-Associated', type: 'output' }] },
        { segments: [{ text: '          Tx-Power=20 dBm', type: 'output' }] },
        { segments: [{ text: '   ^^^^^^^ wlan0 is your wireless adapter!', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Step 3: Check which driver is being used', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airmon-ng', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: 'PHY     Interface   Driver        Chipset', type: 'output' }] },
        { segments: [{ text: 'phy0    ', type: 'output' }, { text: 'wlan0', type: 'highlight' }, { text: '       ath9k_htc     Qualcomm Atheros AR9271', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Step 4: Check supported modes', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'iw phy phy0 info | grep -A 10 "Supported interface modes"', type: 'command' }] },
        { segments: [{ text: '        Supported interface modes:', type: 'output' }] },
        { segments: [{ text: '                 * IBSS', type: 'output' }] },
        { segments: [{ text: '                 * managed', type: 'output' }] },
        { segments: [{ text: '                 * AP', type: 'output' }] },
        { segments: [{ text: '                 * ', type: 'output' }, { text: 'monitor', type: 'highlight' }] },
        { segments: [{ text: '                 ^^^^^^^^ This MUST be listed!', type: 'comment' }] },
        { segments: [{ text: '                 * mesh point', type: 'output' }] },
        { segments: [{ text: '                 * P2P-client', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Step 5: Test packet injection', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo aireplay-ng --test wlan0', type: 'command' }] },
        { segments: [{ text: '14:25:30  Trying broadcast probe requests...', type: 'output' }] },
        { segments: [{ text: '14:25:30  Injection is working!', type: 'highlight' }] },
        { segments: [{ text: '14:25:32  Found 5 APs', type: 'output' }] },
      ]} />

      <InfoBox type="note">
        <strong>What each verification step tells you:</strong>
        <ul>
          <li><code>lsusb</code> — Confirms the USB hardware is physically connected and recognized</li>
          <li><code>iwconfig</code> — Confirms a wireless interface (wlan0) was created by the driver</li>
          <li><code>airmon-ng</code> — Shows the driver name and chipset being used</li>
          <li><code>iw phy info</code> — Confirms monitor mode is supported</li>
          <li><code>aireplay-ng --test</code> — Confirms packet injection actually works</li>
        </ul>
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: Troubleshooting                                     */}
      {/* ============================================================ */}
      <h2>🔧 Troubleshooting Common Issues</h2>

      <h3>Problem: lsusb shows the adapter but iwconfig doesn't show wlan0</h3>
      <p>
        This means the USB device is detected but no driver loaded for it. Common causes:
      </p>
      <Terminal lines={[
        { segments: [{ text: '# Check kernel messages for driver errors', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'dmesg | tail -20', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# For Realtek chipsets (RTL8812AU), install the driver:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo apt update', type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo apt install realtek-rtl88xxau-dkms', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Then replug the adapter or reload the module', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo modprobe 88XXau', type: 'command' }] },
      ]} />

      <h3>Problem: "Monitor mode" not listed in supported modes</h3>
      <p>You likely have the wrong adapter or chipset version. Double-check with:</p>
      <Terminal lines={[
        { segments: [{ text: '# Get detailed USB device info', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'lsusb -v | grep -i "idVendor\\|idProduct\\|iProduct"', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Cross-reference the USB ID with Linux WiFi compatibility lists', type: 'comment' }] },
        { segments: [{ text: '# If it shows RTL8188EUS — sorry, you need a different adapter', type: 'comment' }] },
      ]} />

      <h3>Problem: Injection test fails</h3>
      <Terminal lines={[
        { segments: [{ text: '# Make sure you\'re in monitor mode first', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airmon-ng start wlan0', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Kill interfering processes', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airmon-ng check kill', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Then test again (note: interface name changes to wlan0mon)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo aireplay-ng --test wlan0mon', type: 'command' }] },
      ]} />

      <h3>Problem: Adapter disconnects randomly in VM</h3>
      <InfoBox type="tip">
        <strong>VM USB stability tips:</strong>
        <ul>
          <li>Use a <strong>USB extension cable</strong> — this reduces electromagnetic interference from the laptop</li>
          <li>Increase VM USB polling: In VirtualBox, set <code>USB Controller</code> to <code>USB 2.0 (EHCI)</code> if 3.0 is unstable</li>
          <li>Avoid using a USB hub — connect directly to the laptop</li>
          <li>In VMware, go to <code>VM → Settings → USB → USB compatibility</code> and try different settings</li>
          <li>On the host, disable USB power management: <code>echo "on" | sudo tee /sys/bus/usb/devices/*/power/control</code></li>
        </ul>
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: Multiple Adapters                                   */}
      {/* ============================================================ */}
      <h2>🔄 Using Multiple Adapters</h2>

      <p>
        Advanced attacks sometimes require two adapters — for example, one in monitor mode to sniff 
        traffic while the other performs packet injection. If you have two adapters, they'll show as 
        <code>wlan0</code> and <code>wlan1</code>.
      </p>

      <Terminal lines={[
        { segments: [{ text: '# With two adapters connected', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airmon-ng', type: 'command' }] },
        { segments: [{ text: 'PHY     Interface   Driver        Chipset', type: 'output' }] },
        { segments: [{ text: 'phy0    wlan0       ath9k_htc     Qualcomm Atheros AR9271', type: 'output' }] },
        { segments: [{ text: 'phy1    wlan1       rt2800usb     Ralink RT3070', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Use wlan0 for monitoring, wlan1 for injection', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airmon-ng start wlan0', type: 'command' }, { text: '  # Monitor mode', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo aireplay-ng -0 5 -a [BSSID] wlan1', type: 'command' }, { text: '  # Injection', type: 'comment' }] },
      ]} />

      <InfoBox type="success">
        <strong>Key Takeaways:</strong>
        <ul>
          <li>You <strong>must</strong> have an external USB WiFi adapter for WiFi hacking</li>
          <li>The adapter must support <strong>monitor mode</strong> and <strong>packet injection</strong></li>
          <li>Recommended chipsets: <strong>AR9271</strong> (best beginner), <strong>MT7612U</strong> (best modern)</li>
          <li>In a VM, you must <strong>USB passthrough</strong> the adapter to the guest OS</li>
          <li>Always verify with <code>airmon-ng</code> and <code>aireplay-ng --test</code></li>
          <li>Watch out for adapter version numbers (especially TP-Link WN722N!)</li>
        </ul>
      </InfoBox>

      <h2>📚 What's Next?</h2>
      <p>
        Now that your adapter is connected and verified, we'll learn about <strong>MAC addresses</strong> — 
        your device's unique hardware fingerprint. We'll learn how to view, understand, and most importantly, 
        <strong>change (spoof)</strong> your MAC address to stay anonymous while hacking.
      </p>
    </div>
  );
};

export default WirelessAdapter;
