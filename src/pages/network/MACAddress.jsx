import React from 'react';
import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

const MACAddress = () => {
  return (
    <div className="page-content">
      <h1>MAC Address — Changing Your Digital Identity</h1>

      <p>
        Every network interface card (NIC) in the world has a unique identifier called a <strong>MAC address</strong> 
        (Media Access Control address). It's like a serial number burned into the hardware at the factory. 
        In this section, we'll learn what MAC addresses are, why they matter for hacking, and how to 
        <strong>spoof (change)</strong> yours to stay anonymous.
      </p>

      {/* ============================================================ */}
      {/* SECTION: What is a MAC Address?                              */}
      {/* ============================================================ */}
      <h2>🏷️ What Exactly Is a MAC Address?</h2>

      <p>
        A MAC address is a <strong>48-bit (6-byte)</strong> identifier assigned to every network interface — 
        your WiFi card, Ethernet port, Bluetooth chip, and even virtual machine network adapters all have one. 
        It's written as six pairs of hexadecimal digits:
      </p>

      <Diagram title="MAC Address Anatomy">
{`
  Full MAC Address: AA:BB:CC:DD:EE:FF
                    ─────── ───────
                    OUI      NIC
                    
  ┌─────────────────────────────────────────────────────┐
  │  AA : BB : CC : DD : EE : FF                        │
  │  ├─────────────┤  ├─────────────┤                   │
  │  OUI (Organizationally       NIC Specific           │
  │  Unique Identifier)          (Device Serial)        │
  │                                                     │
  │  First 3 bytes = Manufacturer ID                    │
  │  Last 3 bytes  = Unique device within that vendor   │
  │                                                     │
  │  Possible formats:                                  │
  │  AA:BB:CC:DD:EE:FF  (Linux/Mac - colon separated)  │
  │  AA-BB-CC-DD-EE-FF  (Windows - hyphen separated)   │
  │  AABB.CCDD.EEFF     (Cisco - dot separated)        │
  └─────────────────────────────────────────────────────┘
  
  Total possible MAC addresses: 2^48 = 281 trillion
`}
      </Diagram>

      <h3>The Story Behind MAC Addresses</h3>
      <p>
        Imagine a massive apartment building where every apartment has a globally unique ID number. 
        The first half of the number tells you which construction company built the apartment (the 
        <strong>OUI/vendor prefix</strong>), and the second half is the specific unit number. The 
        IEEE (Institute of Electrical and Electronics Engineers) manages these vendor prefixes — 
        manufacturers like Intel, Apple, and Alfa each have their own assigned prefixes.
      </p>

      <h3>Common Vendor OUI Prefixes</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ padding: '8px', textAlign: 'left' }}>OUI Prefix</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Manufacturer</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Commonly Found In</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['00:0C:29', 'VMware', 'Virtual machines (VMware)'],
            ['08:00:27', 'Oracle (VirtualBox)', 'Virtual machines (VirtualBox)'],
            ['00:50:56', 'VMware (alt)', 'VMware ESXi servers'],
            ['DC:A6:32', 'Raspberry Pi Foundation', 'Raspberry Pi devices'],
            ['AC:DE:48', 'Apple Inc.', 'iPhones, iPads, MacBooks'],
            ['B4:2E:99', 'Intel Corporation', 'Laptops, PCs with Intel WiFi'],
            ['00:1A:2B', 'Ayecom Technology', 'Various network devices'],
            ['00:C0:CA', 'Alfa Inc.', 'Alfa WiFi adapters'],
            ['FC:FB:FB', 'Cisco Systems', 'Enterprise routers/switches'],
            ['00:1E:58', 'D-Link', 'Home routers'],
          ].map(([oui, vendor, found], i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '8px' }}><code>{oui}</code></td>
              <td style={{ padding: '8px' }}><strong>{vendor}</strong></td>
              <td style={{ padding: '8px' }}>{found}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <InfoBox type="note">
        <strong>Why OUI matters for hackers:</strong> When you capture network traffic, you can identify 
        device types by their MAC prefix. See <code>08:00:27</code>? That's a VirtualBox VM. See 
        <code>AC:DE:48</code>? That's an Apple device. This is called <strong>OUI fingerprinting</strong> 
        and it helps you understand what devices are on a network before you even interact with them.
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: Why Change Your MAC?                                */}
      {/* ============================================================ */}
      <h2>🎭 Why Would You Change Your MAC Address?</h2>

      <p>
        There are several critical reasons to change (spoof) your MAC address when performing 
        penetration testing:
      </p>

      <h3>1. Anonymity — Hide Your Identity</h3>
      <p>
        Every WiFi frame you send contains your MAC address. When you perform attacks like deauthentication 
        or packet sniffing, your real MAC is logged by the access point and potentially by network monitoring 
        systems. By spoofing your MAC, you prevent your real hardware identity from being tied to the attack.
      </p>

      <h3>2. Impersonation — Become Another Device</h3>
      <p>
        Some networks use <strong>MAC filtering</strong> — they only allow specific MAC addresses to connect. 
        If you capture the MAC of an authorized device (from sniffed traffic), you can change your MAC to 
        match it and bypass the filter. You literally become that device from the network's perspective.
      </p>

      <h3>3. Bypass Network Restrictions</h3>
      <p>
        Hotels, airports, and coffee shops often give limited free WiFi per device (identified by MAC). 
        Changing your MAC gives you a "fresh" identity. Some captive portals also track session time by MAC.
      </p>

      <h3>4. Evade Bans</h3>
      <p>
        If a network administrator bans your MAC address, you can simply change it to regain access. 
        This is why MAC filtering is considered weak security.
      </p>

      <Diagram title="MAC Spoofing Attack Scenario">
{`
  Scenario: Bypassing MAC Filtering
  
  Access Point (Router)
  MAC Whitelist:
  ┌──────────────────────┐
  │ Allowed MACs:        │
  │ • AA:AA:AA:11:11:11  │  ← Owner's laptop
  │ • BB:BB:BB:22:22:22  │  ← Owner's phone
  │ • CC:CC:CC:33:33:33  │  ← Smart TV
  └──────────────────────┘
  
  Step 1: Attacker sniffs the network (monitor mode)
          Sees BB:BB:BB:22:22:22 is communicating
  
  Step 2: Attacker waits for phone to disconnect
          (or deauths it)
  
  Step 3: Attacker changes their MAC:
          Real MAC: DD:DD:DD:44:44:44  (blocked!)
          Spoofed:  BB:BB:BB:22:22:22  (allowed!)
  
  Step 4: Attacker connects — router thinks it's
          the owner's phone!
  
  ⚠️ Only ONE device can use a MAC at a time on
     the same network (or both get disconnected)
`}
      </Diagram>

      {/* ============================================================ */}
      {/* SECTION: How to View MAC                                     */}
      {/* ============================================================ */}
      <h2>👁️ Viewing Your Current MAC Address</h2>

      <Terminal lines={[
        { segments: [{ text: '# Method 1: Using ip command (recommended)', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'ip link show wlan0', type: 'command' }] },
        { segments: [{ text: '3: wlan0: <BROADCAST,MULTICAST,UP> mtu 1500 qdisc mq state UP mode DEFAULT', type: 'output' }] },
        { segments: [{ text: '    link/ether ', type: 'output' }, { text: '00:c0:ca:ab:cd:ef', type: 'highlight' }, { text: ' brd ff:ff:ff:ff:ff:ff', type: 'output' }] },
        { segments: [{ text: '                ^^^^^^^^^^^^^^^^^ This is your MAC address', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Method 2: Using ifconfig (older but still works)', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'ifconfig wlan0', type: 'command' }] },
        { segments: [{ text: 'wlan0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500', type: 'output' }] },
        { segments: [{ text: '        ether ', type: 'output' }, { text: '00:c0:ca:ab:cd:ef', type: 'highlight' }, { text: '  txqueuelen 1000  (Ethernet)', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Method 3: Using macchanger (shows vendor info too)', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'macchanger -s wlan0', type: 'command' }] },
        { segments: [{ text: 'Current MAC:   00:c0:ca:ab:cd:ef (Alfa, Inc.)', type: 'output' }] },
        { segments: [{ text: 'Permanent MAC: 00:c0:ca:ab:cd:ef (Alfa, Inc.)', type: 'output' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: How to Change MAC                                   */}
      {/* ============================================================ */}
      <h2>🔄 Changing Your MAC Address</h2>

      <p>
        There are two main approaches: using <code>macchanger</code> (recommended, pre-installed on Kali) 
        or using raw <code>ip</code> commands. Both require the interface to be <strong>down</strong> first.
      </p>

      <h3>Method 1: Using macchanger (Recommended)</h3>
      <Terminal lines={[
        { segments: [{ text: '# Step 1: Bring the interface down', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo ip link set wlan0 down', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Option A: Set a completely random MAC', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo macchanger -r wlan0', type: 'command' }] },
        { segments: [{ text: 'Current MAC:   00:c0:ca:ab:cd:ef (Alfa, Inc.)', type: 'output' }] },
        { segments: [{ text: 'Permanent MAC: 00:c0:ca:ab:cd:ef (Alfa, Inc.)', type: 'output' }] },
        { segments: [{ text: 'New MAC:       ', type: 'output' }, { text: '3e:2a:1f:8b:c4:d7', type: 'highlight' }, { text: ' (unknown)', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Option B: Random MAC but keep valid vendor prefix', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo macchanger -a wlan0', type: 'command' }] },
        { segments: [{ text: 'New MAC:       ', type: 'output' }, { text: 'b4:2e:99:1a:2b:3c', type: 'highlight' }, { text: ' (Intel Corporation)', type: 'output' }] },
        { segments: [{ text: '# ↑ Looks like an Intel device — less suspicious!', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Option C: Set a specific MAC address', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo macchanger -m AA:BB:CC:DD:EE:FF wlan0', type: 'command' }] },
        { segments: [{ text: 'New MAC:       ', type: 'output' }, { text: 'aa:bb:cc:dd:ee:ff', type: 'highlight' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Step 3: Bring the interface back up', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo ip link set wlan0 up', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Verify the change', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'macchanger -s wlan0', type: 'command' }] },
        { segments: [{ text: 'Current MAC:   aa:bb:cc:dd:ee:ff (unknown)', type: 'highlight' }] },
        { segments: [{ text: 'Permanent MAC: 00:c0:ca:ab:cd:ef (Alfa, Inc.)', type: 'output' }] },
        { segments: [{ text: '# ↑ Current ≠ Permanent = Success!', type: 'comment' }] },
      ]} />

      <h3>Method 2: Using ip command (Manual)</h3>
      <Terminal lines={[
        { segments: [{ text: '# Same process, using raw ip commands', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo ip link set wlan0 down', type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo ip link set dev wlan0 address AA:BB:CC:DD:EE:FF', type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo ip link set wlan0 up', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Verify', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'ip link show wlan0 | grep ether', type: 'command' }] },
        { segments: [{ text: '    link/ether ', type: 'output' }, { text: 'aa:bb:cc:dd:ee:ff', type: 'highlight' }, { text: ' brd ff:ff:ff:ff:ff:ff', type: 'output' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: Restoring Original MAC                              */}
      {/* ============================================================ */}
      <h2>↩️ Restoring Your Original MAC Address</h2>

      <Terminal lines={[
        { segments: [{ text: '# Method 1: Using macchanger', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo ip link set wlan0 down', type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo macchanger -p wlan0', type: 'command' }] },
        { segments: [{ text: 'Current MAC:   aa:bb:cc:dd:ee:ff (unknown)', type: 'output' }] },
        { segments: [{ text: 'Permanent MAC: 00:c0:ca:ab:cd:ef (Alfa, Inc.)', type: 'output' }] },
        { segments: [{ text: 'New MAC:       ', type: 'output' }, { text: '00:c0:ca:ab:cd:ef', type: 'highlight' }, { text: ' (Alfa, Inc.)', type: 'output' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo ip link set wlan0 up', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Method 2: Simply reboot — MAC resets to original', type: 'comment' }] },
        { segments: [{ text: '# MAC changes are temporary and don\'t survive reboots', type: 'comment' }] },
      ]} />

      <InfoBox type="note">
        <strong>MAC changes are always temporary!</strong> The spoofed MAC only exists in software — 
        the original MAC is permanently stored in the hardware's EEPROM. Rebooting your computer or 
        restarting the network interface will reset it to the original. If you want the change to persist 
        across reboots, you'd need to add the macchanger commands to a startup script.
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: Edge Cases and Advanced Topics                      */}
      {/* ============================================================ */}
      <h2>⚠️ Edge Cases & Important Considerations</h2>

      <h3>Edge Case 1: MAC Randomization on Modern Devices</h3>
      <p>
        Modern smartphones (iOS 14+, Android 10+) and computers (Windows 10+) now use 
        <strong>MAC randomization</strong> by default. Every time they scan for networks or connect to a 
        new network, they use a different random MAC. This was designed to prevent tracking, but it also 
        means:
      </p>
      <ul>
        <li>The MACs you see in airodump-ng for mobile devices may change</li>
        <li>MAC filtering becomes even less effective as a security measure</li>
        <li>The "random" MAC still follows certain patterns (the locally administered bit is set)</li>
      </ul>

      <Diagram title="MAC Address Bits — The Locally Administered Flag">
{`
  MAC Address in Binary (first octet):
  
  Normal MAC (globally unique, from manufacturer):
  Bit pattern: xxxxxxx0  ← The second-least-significant bit
               │         is 0 = globally unique (from IEEE)
               │
  Example: 00:C0:CA:... (00 in binary = 00000000)
                                              ^
                                              0 = global
  
  Randomized MAC (locally administered):
  Bit pattern: xxxxxxx1  ← The bit is 1 = locally administered
               │         (not from IEEE, made up)
               │
  Example: 02:xx:xx:... (02 in binary = 00000010)
                                              ^
                                              1 = local
  
  Also: The least-significant bit of the first byte:
  0 = unicast (sent to one device)
  1 = multicast (sent to multiple devices)
  
  Valid spoofed unicast MAC first bytes: 02, 06, 0A, 0E, etc.
`}
      </Diagram>

      <h3>Edge Case 2: Two Devices with Same MAC on Same Network</h3>
      <p>
        If you spoof your MAC to match a device that's currently active on the network, both devices 
        will experience problems — dropped connections, intermittent connectivity, and ARP conflicts. 
        The switch/router gets confused about which port the MAC is on. Always make sure the target 
        device is <strong>offline</strong> before using its MAC, or use a completely random one.
      </p>

      <h3>Edge Case 3: Some Adapters Refuse MAC Changes</h3>
      <p>
        Some WiFi chipsets or drivers reject certain MAC addresses. Common restrictions:
      </p>
      <ul>
        <li>The first byte must be <strong>even</strong> (unicast). Odd = multicast, which won't work as a device MAC</li>
        <li>Cannot be all zeros (<code>00:00:00:00:00:00</code>) or all ones (<code>FF:FF:FF:FF:FF:FF</code>)</li>
        <li>Some Realtek drivers have bugs that prevent MAC changes — try updating the driver</li>
      </ul>

      <h3>Edge Case 4: MAC Change While in Monitor Mode</h3>
      <Terminal lines={[
        { segments: [{ text: '# If your adapter is already in monitor mode (wlan0mon),', type: 'comment' }] },
        { segments: [{ text: '# you need to change the MAC on the monitor interface:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo ip link set wlan0mon down', type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo macchanger -r wlan0mon', type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo ip link set wlan0mon up', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Some adapters require you to change MAC BEFORE', type: 'comment' }] },
        { segments: [{ text: '# entering monitor mode. If the above doesn\'t work:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airmon-ng stop wlan0mon', type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo ip link set wlan0 down', type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo macchanger -r wlan0', type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo ip link set wlan0 up', type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airmon-ng start wlan0', type: 'command' }] },
      ]} />

      <h3>Edge Case 5: Identifying Spoofed MACs</h3>
      <p>
        Network administrators can sometimes detect spoofed MACs by:
      </p>
      <ul>
        <li>Checking if the OUI prefix matches a real manufacturer</li>
        <li>Detecting the locally administered bit being set</li>
        <li>Noticing a MAC address suddenly appearing that matches a known device</li>
        <li>Using 802.1X authentication which goes beyond MAC validation</li>
      </ul>

      <InfoBox type="tip">
        <strong>Pro tip for stealth:</strong> Use <code>macchanger -a</code> instead of <code>-r</code>. 
        The <code>-a</code> flag generates a random MAC with a <em>valid vendor prefix</em>, making it 
        look like a real device. A completely random MAC (with <code>-r</code>) may have an obviously 
        fake OUI prefix that could raise suspicion in network monitoring tools. Pick a vendor that makes 
        sense — using an Apple OUI on a device that behaves like a Linux box might be suspicious.
      </InfoBox>

      <h2>🔒 One-Liner MAC Change Script</h2>
      <Terminal lines={[
        { segments: [{ text: '# Complete MAC change in one line', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo ip link set wlan0 down && sudo macchanger -a wlan0 && sudo ip link set wlan0 up', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Or create an alias in your ~/.zshrc:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: "echo 'alias randmac=\"sudo ip link set wlan0 down && sudo macchanger -a wlan0 && sudo ip link set wlan0 up\"' >> ~/.zshrc", type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'source ~/.zshrc', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Now just type:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'randmac', type: 'command' }] },
      ]} />

      <InfoBox type="success">
        <strong>Key Takeaways:</strong>
        <ul>
          <li>MAC addresses are unique hardware identifiers — but they can be changed in software</li>
          <li>Always change your MAC before performing any network attacks</li>
          <li>Use <code>macchanger -a</code> for realistic spoofed MACs with valid vendor prefixes</li>
          <li>MAC changes are temporary — they reset on reboot</li>
          <li>Be careful about using the same MAC as an active device on the network</li>
          <li>Modern devices use MAC randomization, making tracking harder</li>
        </ul>
      </InfoBox>

      <h2>📚 What's Next?</h2>
      <p>
        Now that you can change your identity, let's learn about <strong>Wireless Modes</strong> — 
        specifically how to switch your adapter into <strong>monitor mode</strong>, which lets you 
        capture all WiFi traffic in the air, not just traffic meant for your device.
      </p>
    </div>
  );
};

export default MACAddress;
