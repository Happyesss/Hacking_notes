import React from 'react';
import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

const WiFiBands = () => {
  return (
    <div className="page-content">
      <h1>WiFi Bands — 2.4 GHz vs 5 GHz (and 6 GHz)</h1>

      <p>
        WiFi doesn't operate on a single frequency — it uses different <strong>frequency bands</strong>, 
        each with different characteristics. Understanding these bands is crucial because your choice of 
        band affects what networks you can see, attack range, and which adapter you need. Think of it 
        like AM vs FM radio — different frequencies, different behaviors.
      </p>

      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Electromagnetic-Spectrum.svg/1280px-Electromagnetic-Spectrum.svg.png" 
        alt="Electromagnetic spectrum showing where WiFi operates" 
        style={{ maxWidth: '100%', borderRadius: 8, margin: '16px 0', background: '#fff', padding: 8 }} 
      />
      <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
        WiFi operates in the microwave portion of the electromagnetic spectrum, between 2.4 and 6 GHz.
      </p>

      {/* ============================================================ */}
      {/* SECTION: Band Comparison                                     */}
      {/* ============================================================ */}
      <h2>📊 Complete Band Comparison</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ padding: '8px', textAlign: 'left' }}>Feature</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>2.4 GHz</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>5 GHz</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>6 GHz (WiFi 6E)</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Range', '~50m indoors, ~100m outdoors', '~30m indoors, ~50m outdoors', '~20m indoors'],
            ['Speed', 'Up to 600 Mbps (WiFi 4)', 'Up to 6.9 Gbps (WiFi 5/6)', 'Up to 9.6 Gbps'],
            ['Wall penetration', '✅ Good (passes through walls)', '⚠️ Poor (blocked by walls)', '❌ Very poor'],
            ['Channels', '14 (3 non-overlapping)', '25+ non-overlapping', '59 non-overlapping'],
            ['Congestion', '🔴 Very crowded', '🟢 Less crowded', '🟢 Mostly empty'],
            ['Interference', 'High (microwaves, Bluetooth)', 'Low', 'Very low'],
            ['Device support', 'Universal (all devices)', 'Most modern devices', 'Only WiFi 6E devices'],
            ['Hacking tools', '✅ Full support', '⚠️ Need dual-band adapter', '❌ Limited support'],
            ['Common use', 'IoT, old devices, long range', 'Streaming, gaming', 'Latest devices only'],
          ].map(([feature, b24, b5, b6], i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '8px' }}><strong>{feature}</strong></td>
              <td style={{ padding: '8px' }}>{b24}</td>
              <td style={{ padding: '8px' }}>{b5}</td>
              <td style={{ padding: '8px' }}>{b6}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ============================================================ */}
      {/* SECTION: 2.4 GHz Deep Dive                                   */}
      {/* ============================================================ */}
      <h2>📡 2.4 GHz Band — The Workhorse</h2>

      <p>
        The 2.4 GHz band is the oldest and most widely used WiFi frequency. It's like a busy highway — 
        everyone uses it because it's accessible, but that means it's often congested.
      </p>

      <h3>Channels in 2.4 GHz</h3>
      <Diagram title="2.4 GHz Channel Map">
{`
  2.4 GHz Channel Layout (most countries):
  
  Channel:  1    2    3    4    5    6    7    8    9   10   11   12   13
  Freq:  2.412                    2.437                    2.462     2.472
  (GHz)    │    │    │    │    │    │    │    │    │    │    │    │    │
           ├────┼────┼────┼────┼────┤    │    │    │    │    │    │    │
           │    Channel 1 width    │    │    │    │    │    │    │    │
           │    (22 MHz wide!)     │    │    │    │    │    │    │    │
           │                       │    │    │    │    │    │    │    │
                                   ├────┼────┼────┼────┼────┤    │    │
                                   │    Channel 6 width    │    │    │
                                                           │    │    │
                                                           ├────┼────┤
                                                           │ Channel │
                                                           │ 11 width│
  
  Non-overlapping channels: 1, 6, 11
  (These are the ONLY channels that don't interfere!)
  
  ⚠️ If your target is on channel 3, it overlaps with
     channels 1-5! This causes interference.
  
  Channel 14: Only available in Japan (2.484 GHz)
`}
      </Diagram>

      <InfoBox type="note">
        <strong>Why channels 1, 6, and 11?</strong> Each WiFi channel is 22 MHz wide, but channels 
        are spaced only 5 MHz apart. This means adjacent channels overlap and interfere with each other. 
        Channels 1, 6, and 11 are spaced far enough apart (25 MHz) that they don't overlap. Most 
        well-configured networks use one of these three channels. When scanning, you'll see the 
        majority of networks on channels 1, 6, or 11.
      </InfoBox>

      <h3>Why 2.4 GHz is Great for Hacking</h3>
      <ul>
        <li><strong>Better range</strong> — you can capture packets from further away</li>
        <li><strong>Better wall penetration</strong> — signals pass through walls and floors</li>
        <li><strong>Most targets</strong> — IoT devices, older devices, and most home networks still use 2.4 GHz</li>
        <li><strong>Best tool support</strong> — all hacking adapters support 2.4 GHz</li>
        <li><strong>Fewer channels to scan</strong> — faster discovery</li>
      </ul>

      {/* ============================================================ */}
      {/* SECTION: 5 GHz Deep Dive                                     */}
      {/* ============================================================ */}
      <h2>📡 5 GHz Band — Speed Over Range</h2>

      <p>
        The 5 GHz band is newer, faster, and less congested. It's like a premium highway with more lanes 
        and less traffic — but it covers a shorter distance.
      </p>

      <Diagram title="5 GHz Channel Groups">
{`
  5 GHz uses much wider channels and more spectrum:
  
  UNII-1 (Indoor):     36, 40, 44, 48
  UNII-2 (Indoor):     52, 56, 60, 64        ← DFS channels
  UNII-2 Extended:     100-144 (varies)       ← DFS channels  
  UNII-3 (Outdoor):    149, 153, 157, 161, 165
  
  Channel widths available:
  ┌──────────┬────────────────────────────────┐
  │  20 MHz  │ Standard width (like 2.4 GHz) │
  ├──────────┼────────────────────────────────┤
  │  40 MHz  │ Bond 2 channels = 2x speed    │
  ├──────────┼────────────────────────────────┤
  │  80 MHz  │ Bond 4 channels = 4x speed    │
  ├──────────┼────────────────────────────────┤
  │ 160 MHz  │ Bond 8 channels = max speed!  │
  └──────────┴────────────────────────────────┘
  
  DFS (Dynamic Frequency Selection) channels:
  ├─ Shared with weather radar!
  ├─ Router must detect radar and switch channels
  ├─ Some routers avoid these channels entirely
  └─ Not all adapters support DFS channels
`}
      </Diagram>

      <InfoBox type="warning">
        <strong>5 GHz Hacking Challenges:</strong>
        <ul>
          <li>Need a <strong>dual-band adapter</strong> (like Alfa AWUS036ACH or AWUS036ACHM)</li>
          <li>Shorter range means you need to be <strong>closer</strong> to the target</li>
          <li>Many more channels to scan = <strong>slower discovery</strong></li>
          <li>Some DFS channels may not be supported by your adapter</li>
          <li>Some older aircrack-ng versions have issues with 5 GHz</li>
        </ul>
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: Scanning Both Bands                                 */}
      {/* ============================================================ */}
      <h2>🔍 Scanning Different Bands with airodump-ng</h2>

      <Terminal lines={[
        { segments: [{ text: '# Scan ONLY 2.4 GHz (default behavior)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airodump-ng --band bg wlan0mon', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Scan ONLY 5 GHz', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airodump-ng --band a wlan0mon', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Scan BOTH 2.4 GHz and 5 GHz simultaneously', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airodump-ng --band abg wlan0mon', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Check which bands your adapter supports', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'iw phy phy0 info | grep -A 20 "Frequencies"', type: 'command' }] },
        { segments: [{ text: '        Frequencies:', type: 'output' }] },
        { segments: [{ text: '            * 2412 MHz [1] (20.0 dBm)', type: 'output' }] },
        { segments: [{ text: '            * 2417 MHz [2] (20.0 dBm)', type: 'output' }] },
        { segments: [{ text: '            ...', type: 'output' }] },
        { segments: [{ text: '            * 5180 MHz [36] (20.0 dBm)', type: 'highlight' }, { text: '  ← 5GHz support!', type: 'comment' }] },
        { segments: [{ text: '            * 5200 MHz [40] (20.0 dBm)', type: 'output' }] },
      ]} />

      <InfoBox type="tip">
        <strong>Strategy tip:</strong> When doing initial reconnaissance, scan both bands 
        (<code>--band abg</code>) to see everything. Then when targeting a specific network, lock 
        to its channel. Note that scanning both bands takes longer since there are many more channels 
        to hop through.
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: Edge Cases                                          */}
      {/* ============================================================ */}
      <h2>⚠️ Edge Cases & Real-World Scenarios</h2>

      <h3>Edge Case: Dual-band routers with same SSID</h3>
      <p>
        Most modern routers broadcast on <em>both</em> 2.4 GHz and 5 GHz with the same network name 
        (SSID). In airodump-ng, you'll see two entries with the same ESSID but different BSSIDs and 
        channels. They're the same router but different radio interfaces. Target the 2.4 GHz one for 
        better range, or the 5 GHz one if you're close and it has the specific clients you want.
      </p>

      <h3>Edge Case: Band steering</h3>
      <p>
        Some routers use <strong>band steering</strong> to push devices to 5 GHz when they support it. 
        The router may briefly deny 2.4 GHz connections from capable devices. This means a device you 
        deauth from 2.4 GHz might reconnect on 5 GHz (where you can't see it if you have a 2.4 GHz-only 
        adapter).
      </p>

      <h3>Edge Case: DFS channels</h3>
      <p>
        Some 5 GHz channels (52-64, 100-144) are shared with weather radar. Routers on these channels 
        must perform <strong>DFS (Dynamic Frequency Selection)</strong> — if they detect radar, they 
        switch channels. This can cause target networks to suddenly disappear from your scan. They'll 
        reappear on a different channel.
      </p>

      <h3>Edge Case: 6 GHz / WiFi 6E</h3>
      <p>
        The newest WiFi standard (WiFi 6E) uses the 6 GHz band (5.925-7.125 GHz). As of 2024, very 
        few hacking tools and adapters support this band. If your target has WiFi 6E, you'll need 
        specialized equipment. Most networks still have 2.4/5 GHz fallback, so you can target those instead.
      </p>

      <InfoBox type="success">
        <strong>Key Takeaways:</strong>
        <ul>
          <li><strong>2.4 GHz</strong>: Better range, fewer channels, most targets — your primary hacking band</li>
          <li><strong>5 GHz</strong>: Faster, more channels, shorter range — need a dual-band adapter</li>
          <li>Use <code>--band abg</code> to scan both bands simultaneously</li>
          <li>Most networks use channels 1, 6, or 11 on 2.4 GHz</li>
          <li>Always check your adapter's supported frequencies with <code>iw phy info</code></li>
          <li>When a target is on 5 GHz, the attack range is significantly reduced</li>
        </ul>
      </InfoBox>

      <h2>📚 What's Next?</h2>
      <p>
        Now that you understand WiFi bands and how to scan them, let's learn <strong>targeted 
        sniffing</strong> — focusing on a specific network and capturing detailed information about 
        it and its connected clients.
      </p>
    </div>
  );
};

export default WiFiBands;
