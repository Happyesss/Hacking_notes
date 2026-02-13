import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

export default function WiFiBands() {
  return (
    <div className="content-area">
      <div className="topic-header">
        <div className="topic-breadcrumb">Pre Connection Attacks <span>/</span> WiFi Bands</div>
        <h1>WiFi Bands — 2.4GHz & 5GHz Frequencies</h1>
        <p className="topic-desc">WiFi operates on two main frequency bands. Understanding them is important because your sniffing and attacks must target the correct band.</p>
      </div>

      <div className="topic-section">
        <h2>2.4GHz vs 5GHz</h2>
        <table className="info-table">
          <thead>
            <tr><th>Feature</th><th>2.4 GHz</th><th>5 GHz</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Range</strong></td><td>Longer range (~100m+)</td><td>Shorter range (~35m)</td></tr>
            <tr><td><strong>Speed</strong></td><td>Slower (up to ~150 Mbps)</td><td>Faster (up to ~1300 Mbps)</td></tr>
            <tr><td><strong>Channels</strong></td><td>14 channels (1-14)</td><td>25+ channels</td></tr>
            <tr><td><strong>Interference</strong></td><td>More (microwaves, Bluetooth)</td><td>Less interference</td></tr>
            <tr><td><strong>Wall Penetration</strong></td><td>Better through walls</td><td>Blocked more by walls</td></tr>
            <tr><td><strong>Hacking</strong></td><td>Easier to capture (more range)</td><td>Harder (need to be closer)</td></tr>
          </tbody>
        </table>

        <Diagram title="WiFi Frequency Bands">
{`  2.4 GHz Band (2400-2484 MHz)
  ═══════════════════════════════════════════════════════
  CH1    CH2    CH3    CH4    CH5    CH6    CH7    ...  CH13  CH14
  ────   ────   ────   ────   ────   ────   ────        ────  ────
  │    Overlapping channels!     │
  │    Only 1, 6, 11 are         │
  │    non-overlapping           │
  ▼                              ▼
  ████████                ████████                ████████
    CH 1                    CH 6                    CH 11
  
  
  5 GHz Band (5150-5825 MHz)  
  ═══════════════════════════════════════════════════════
  CH36   CH40   CH44   CH48   ...   CH149  CH153  CH157  CH161
  ────   ────   ────   ────         ────   ────   ────   ────
  │ Non-overlapping channels = less interference │
  ████   ████   ████   ████         ████   ████   ████   ████`}
        </Diagram>
      </div>

      <div className="topic-section">
        <h2>Sniffing on Specific Bands</h2>
        <p>By default, <code className="inline-code">airodump-ng</code> only sniffs on 2.4GHz. To capture 5GHz traffic, you need to specify it.</p>

        <Terminal title="Sniff 2.4GHz Only (default)" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airodump-ng ' }, { type: 'string', text: 'wlan0mon' }],
        ]} />

        <Terminal title="Sniff 5GHz Only" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airodump-ng ' }, { type: 'flag', text: '--band a ' }, { type: 'string', text: 'wlan0mon' }],
        ]} />

        <Terminal title="Sniff Both 2.4GHz and 5GHz" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo airodump-ng ' }, { type: 'flag', text: '--band abg ' }, { type: 'string', text: 'wlan0mon' }],
        ]} />

        <h3>Band Flags</h3>
        <table className="info-table">
          <thead>
            <tr><th>Flag</th><th>Band</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>--band a</code></td><td>5 GHz</td><td>802.11a channels</td></tr>
            <tr><td><code>--band b</code></td><td>2.4 GHz</td><td>802.11b channels</td></tr>
            <tr><td><code>--band g</code></td><td>2.4 GHz</td><td>802.11g channels (default)</td></tr>
            <tr><td><code>--band abg</code></td><td>Both</td><td>All bands — slower hopping</td></tr>
          </tbody>
        </table>

        <InfoBox type="warning" title="5GHz Adapter Required">
          <p>Your wireless adapter must support 5GHz to sniff on that band. Most budget adapters (like Alfa AWUS036NHA) only support 2.4GHz. The <strong>Alfa AWUS036ACH</strong> supports both bands.</p>
        </InfoBox>
      </div>

      <div className="topic-section">
        <h2>Check What Your Adapter Supports</h2>
        <Terminal title="Check Supported Bands" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'iw list ' }, { type: 'highlight', text: '| ' }, { type: 'command', text: 'grep ' }, { type: 'flag', text: '-A 20 ' }, { type: 'string', text: '"Frequencies:"' }],
          [{ type: 'output', text: '    Frequencies:' }],
          [{ type: 'output', text: '        * 2412 MHz [1] (20.0 dBm)' }],
          [{ type: 'output', text: '        * 2417 MHz [2] (20.0 dBm)' }],
          [{ type: 'output', text: '        ...' }],
          [{ type: 'output', text: '        * 2462 MHz [11] (20.0 dBm)' }],
          [{ type: 'output', text: '        * 5180 MHz [36] (20.0 dBm)    ← 5GHz support!' }],
          [{ type: 'output', text: '        * 5200 MHz [40] (20.0 dBm)' }],
        ]} />

        <InfoBox type="tip">
          <p>If you only see 2400 MHz frequencies in the output, your adapter doesn't support 5GHz. You'll need a dual-band adapter for 5GHz hacking.</p>
        </InfoBox>
      </div>

      <div className="topic-section">
        <h2>Why This Matters for Hacking</h2>
        <ul>
          <li><strong>Many modern routers are dual-band</strong> — they broadcast on both 2.4GHz and 5GHz</li>
          <li><strong>If you only sniff 2.4GHz</strong>, you'll miss clients connected to the 5GHz network</li>
          <li><strong>5GHz is often less secured</strong> because people think it's harder to hack (it's not, you just need to be closer)</li>
          <li><strong>Scanning both bands is slower</strong> because the adapter has to hop between more channels</li>
        </ul>
      </div>
    </div>
  );
}
