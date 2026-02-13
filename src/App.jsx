import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import './App.css'

// Linux Basics
import KaliBasics from './pages/linux/KaliBasics'
import TerminalCommands from './pages/linux/TerminalCommands'
import AITerminals from './pages/linux/AITerminals'

// Network Hacking
import NetworkIntro from './pages/network/NetworkIntro'
import NetworkBasics from './pages/network/NetworkBasics'
import WirelessAdapter from './pages/network/WirelessAdapter'
import MACAddress from './pages/network/MACAddress'
import WirelessModes from './pages/network/WirelessModes'

// Pre Connection Attacks
import PacketSniffing from './pages/preconnection/PacketSniffing'
import WiFiBands from './pages/preconnection/WiFiBands'
import TargetedSniffing from './pages/preconnection/TargetedSniffing'
import DeauthAttack from './pages/preconnection/DeauthAttack'

// Gaining Access - WEP
import GainingAccessIntro from './pages/wep/GainingAccessIntro'
import WEPTheory from './pages/wep/WEPTheory'
import WEPCrackingBasics from './pages/wep/WEPCrackingBasics'
import FakeAuth from './pages/wep/FakeAuth'
import ARPReplay from './pages/wep/ARPReplay'

// Gaining Access - WPA/WPA2
import WPAIntro from './pages/wpa/WPAIntro'
import WithoutWordlist from './pages/wpa/WithoutWordlist'
import CaptureHandshake from './pages/wpa/CaptureHandshake'
import Wordlist from './pages/wpa/Wordlist'
import WPACracking from './pages/wpa/WPACracking'

// Gaining Access - Security
import SecuringNetwork from './pages/security/SecuringNetwork'
import WirelessSettings from './pages/security/WirelessSettings'

// Post Connection Attacks
import PostConnectionIntro from './pages/postconnection/PostConnectionIntro'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
        ☰
      </button>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/linux/kali-basics" replace />} />

          {/* Linux Basics */}
          <Route path="/linux/kali-basics" element={<KaliBasics />} />
          <Route path="/linux/terminal-commands" element={<TerminalCommands />} />
          <Route path="/linux/ai-terminals" element={<AITerminals />} />

          {/* Network Hacking */}
          <Route path="/network/intro" element={<NetworkIntro />} />
          <Route path="/network/basics" element={<NetworkBasics />} />
          <Route path="/network/wireless-adapter" element={<WirelessAdapter />} />
          <Route path="/network/mac-address" element={<MACAddress />} />
          <Route path="/network/wireless-modes" element={<WirelessModes />} />

          {/* Pre Connection Attacks */}
          <Route path="/pre-connection/packet-sniffing" element={<PacketSniffing />} />
          <Route path="/pre-connection/wifi-bands" element={<WiFiBands />} />
          <Route path="/pre-connection/targeted-sniffing" element={<TargetedSniffing />} />
          <Route path="/pre-connection/deauth-attack" element={<DeauthAttack />} />

          {/* WEP Cracking */}
          <Route path="/wep/gaining-access-intro" element={<GainingAccessIntro />} />
          <Route path="/wep/theory" element={<WEPTheory />} />
          <Route path="/wep/cracking-basics" element={<WEPCrackingBasics />} />
          <Route path="/wep/fake-auth" element={<FakeAuth />} />
          <Route path="/wep/arp-replay" element={<ARPReplay />} />

          {/* WPA/WPA2 Cracking */}
          <Route path="/wpa/intro" element={<WPAIntro />} />
          <Route path="/wpa/without-wordlist" element={<WithoutWordlist />} />
          <Route path="/wpa/capture-handshake" element={<CaptureHandshake />} />
          <Route path="/wpa/wordlist" element={<Wordlist />} />
          <Route path="/wpa/cracking" element={<WPACracking />} />

          {/* Security */}
          <Route path="/security/securing-network" element={<SecuringNetwork />} />
          <Route path="/security/wireless-settings" element={<WirelessSettings />} />

          {/* Post Connection */}
          <Route path="/post-connection/intro" element={<PostConnectionIntro />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
