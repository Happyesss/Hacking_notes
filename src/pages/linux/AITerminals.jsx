import React from 'react';
import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

const AITerminals = () => {
  return (
    <div className="page-content">
      <h1>AI-Enhanced Terminals & Productivity Tools</h1>

      <p>
        Modern terminals have evolved far beyond simple command prompts. AI-powered tools can 
        now <strong>suggest commands</strong>, <strong>explain errors</strong>, and <strong>generate 
        complex one-liners</strong> for you. Combined with terminal multiplexers like tmux, 
        these tools can dramatically speed up your pentesting workflow.
      </p>

      <p>
        Imagine you're in the middle of a penetration test — you need to run airodump-ng in one 
        pane, aireplay-ng in another, and aircrack-ng in a third, all while monitoring logs. 
        That's where terminal multiplexers and AI assistants become indispensable.
      </p>

      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Tmux_session.png/800px-Tmux_session.png"
        alt="tmux terminal multiplexer session with multiple panes"
        style={{ maxWidth: '100%', borderRadius: 8, margin: '16px 0' }}
      />

      {/* ============================================================ */}
      {/* SECTION: AI Terminal Tools Overview                            */}
      {/* ============================================================ */}
      <h2>🤖 AI-Enhanced Terminal Tools</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Tool</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>What It Does</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Best For</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '8px' }}><strong>Shell GPT</strong></td>
            <td style={{ padding: '8px' }}>ChatGPT directly in your terminal</td>
            <td style={{ padding: '8px' }}>Generating complex commands, explaining errors</td>
            <td style={{ padding: '8px' }}>Free (with API key)</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}><strong>Warp</strong></td>
            <td style={{ padding: '8px' }}>Modern terminal with AI built-in</td>
            <td style={{ padding: '8px' }}>Daily use, command search, blocks</td>
            <td style={{ padding: '8px' }}>Free tier available</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}><strong>GitHub Copilot CLI</strong></td>
            <td style={{ padding: '8px' }}>AI command suggestions in terminal</td>
            <td style={{ padding: '8px' }}>Complex git, shell commands</td>
            <td style={{ padding: '8px' }}>GitHub Copilot subscription</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}><strong>Amazon Q (Fig)</strong></td>
            <td style={{ padding: '8px' }}>Autocomplete for terminal</td>
            <td style={{ padding: '8px' }}>Tab completion, visual suggestions</td>
            <td style={{ padding: '8px' }}>Free tier</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}><strong>aichat</strong></td>
            <td style={{ padding: '8px' }}>Multi-model AI chat in terminal</td>
            <td style={{ padding: '8px' }}>Supports multiple LLM providers</td>
            <td style={{ padding: '8px' }}>Free (bring your own API key)</td>
          </tr>
        </tbody>
      </table>

      {/* ============================================================ */}
      {/* SECTION: Shell GPT                                            */}
      {/* ============================================================ */}
      <h2>🧠 Shell GPT (sgpt) — AI in Your Terminal</h2>

      <p>
        Shell GPT is the most popular AI terminal assistant. It lets you ask questions, generate 
        commands, and even execute them — all without leaving your terminal. Think of it as having 
        a senior pentester sitting next to you, answering questions instantly.
      </p>

      <h3>Installation</h3>
      <Terminal lines={[
        { segments: [{ text: '# Install Shell GPT via pip', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'pip install shell-gpt', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Set your OpenAI API key (get one from platform.openai.com)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'export OPENAI_API_KEY="sk-your-key-here"', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# To make it permanent, add to your shell config', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'echo \'export OPENAI_API_KEY="sk-your-key-here"\' >> ~/.zshrc', type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'source ~/.zshrc', type: 'command' }] },
      ]} />

      <h3>Usage Examples</h3>
      <Terminal lines={[
        { segments: [{ text: '# Ask a question', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sgpt "What is a deauth attack?"', type: 'command' }] },
        { segments: [{ text: 'A deauthentication attack sends forged deauth frames to disconnect', type: 'output' }] },
        { segments: [{ text: 'clients from a WiFi network. It exploits the IEEE 802.11 protocol...', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Generate a command (--shell flag)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sgpt --shell "find all .pcap files modified in the last 24 hours"', type: 'command' }] },
        { segments: [{ text: 'find / -name "*.pcap" -mtime -1 2>/dev/null', type: 'output' }] },
        { segments: [{ text: '[E]xecute, [D]escribe, [A]bort: ', type: 'highlight' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Generate and describe a complex command', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sgpt --shell "scan the top 1000 ports of 192.168.1.0/24 and save results"', type: 'command' }] },
        { segments: [{ text: 'nmap -sV --top-ports 1000 192.168.1.0/24 -oA scan_results', type: 'output' }] },
        { segments: [{ text: '[E]xecute, [D]escribe, [A]bort: ', type: 'highlight' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Explain code or commands', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sgpt --code "write a python script to extract WPA handshake from a pcap file"', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Chat mode (multi-turn conversation)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sgpt --chat pentest "I found an open SSH port on 192.168.1.50"', type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sgpt --chat pentest "What should I try next?"', type: 'command' }] },
      ]} />

      <InfoBox type="warning">
        <strong>Security Warning:</strong> Never send actual passwords, API keys, or sensitive 
        target data to Shell GPT — it sends queries to OpenAI's servers. Use it for learning 
        and generating commands, not for processing real pentest data.
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: Warp Terminal                                         */}
      {/* ============================================================ */}
      <h2>🚀 Warp Terminal</h2>

      <p>
        Warp is a modern terminal built from scratch with AI, collaboration, and developer 
        experience in mind. Instead of a stream of text, it organizes your terminal into 
        "blocks" — each command and its output is a distinct, selectable, searchable unit.
      </p>

      <h3>Key Features</h3>
      <ul>
        <li><strong>Warp AI:</strong> Press <code>#</code> to describe what you want in natural language. Warp suggests the command.</li>
        <li><strong>Blocks:</strong> Each command + output is a block you can copy, share, or bookmark</li>
        <li><strong>Command Palette:</strong> <code>Ctrl+Shift+P</code> to search commands, settings, themes</li>
        <li><strong>Workflows:</strong> Save complex multi-step command sequences as reusable workflows</li>
        <li><strong>Modern Editor:</strong> Full text editing in the input area — cursor movement, selection, multi-line</li>
      </ul>

      <Terminal lines={[
        { segments: [{ text: '# Install Warp (Linux)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'wget -qO- https://releases.warp.dev/linux/x86_64/warp.deb', type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo dpkg -i warp.deb', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Or use the package manager on supported distros', type: 'comment' }] },
        { segments: [{ text: '# Check https://www.warp.dev for latest instructions', type: 'comment' }] },
      ]} />

      <InfoBox type="note">
        <strong>Note:</strong> Warp requires an account to use. It's available for macOS 
        and Linux. Some pentesters prefer not to use it on sensitive engagements because 
        it requires internet connectivity and an account. For sensitive work, use a 
        traditional terminal with tmux.
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: GitHub Copilot CLI                                   */}
      {/* ============================================================ */}
      <h2>🤖 GitHub Copilot CLI</h2>

      <p>
        If you already have GitHub Copilot, you can use it directly in the terminal. It 
        understands context and generates shell commands, git operations, and more.
      </p>

      <Terminal lines={[
        { segments: [{ text: '# Install GitHub CLI first', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo apt install gh', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Login to GitHub', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'gh auth login', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Install Copilot extension', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'gh extension install github/gh-copilot', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Suggest a command', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'gh copilot suggest "monitor wifi traffic on wlan0"', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Explain a command', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'gh copilot explain "awk \'{print $1}\' access.log | sort | uniq -c | sort -rn"', type: 'command' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: tmux                                                 */}
      {/* ============================================================ */}
      <h2>🖥️ tmux — Terminal Multiplexer</h2>

      <p>
        tmux is <strong>THE essential tool</strong> for penetration testing. It lets you create 
        multiple terminal windows and panes within a single session — and most importantly, 
        sessions <strong>persist even if you disconnect</strong>. Imagine running a long 
        brute-force attack, closing your laptop, going to sleep, and reconnecting in the 
        morning to see the results. That's tmux.
      </p>

      <Diagram title="tmux Concepts">
{`
  ┌─────────────────────────────────────────────────────┐
  │                    tmux server                       │
  │                                                     │
  │  ┌─────────────── Session: "pentest" ─────────────┐ │
  │  │                                                 │ │
  │  │  ┌── Window 0: "recon" ───┐ ┌── Window 1 ───┐  │ │
  │  │  │                        │ │                │  │ │
  │  │  │  ┌─ Pane 0 ──────────┐│ │  Single pane   │  │ │
  │  │  │  │  airodump-ng      ││ │  running nmap   │  │ │
  │  │  │  │  (monitoring)     ││ │                │  │ │
  │  │  │  ├───────────────────┤│ └────────────────┘  │ │
  │  │  │  │  Pane 1           ││                     │ │
  │  │  │  │  aireplay-ng      ││                     │ │
  │  │  │  │  (deauth attack)  ││                     │ │
  │  │  │  └───────────────────┘│                     │ │
  │  │  └────────────────────────┘                     │ │
  │  └─────────────────────────────────────────────────┘ │
  │                                                     │
  │  Session: "dev"  (another independent session)       │
  │  ...                                                │
  └─────────────────────────────────────────────────────┘
  
  Hierarchy: Server → Sessions → Windows → Panes
`}
      </Diagram>

      <h3>tmux Basics</h3>
      <Terminal lines={[
        { segments: [{ text: '# Install tmux', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo apt install tmux', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '# SESSION MANAGEMENT', type: 'comment' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'tmux new -s pentest', type: 'command' }, { text: '      # Create named session', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'tmux ls', type: 'command' }, { text: '                  # List all sessions', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'tmux attach -t pentest', type: 'command' }, { text: '  # Reattach to session', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'tmux kill-session -t pentest', type: 'command' }, { text: '  # Kill a session', type: 'comment' }] },
      ]} />

      <h3>tmux Key Bindings (prefix: Ctrl+B)</h3>
      <p>
        All tmux shortcuts start with the <strong>prefix key</strong>: <code>Ctrl+B</code>. 
        You press <code>Ctrl+B</code>, release it, then press the next key.
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Shortcut</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={{ padding: '8px' }}><code>Ctrl+B</code> then <code>d</code></td><td style={{ padding: '8px' }}>Detach from session (session keeps running!)</td></tr>
          <tr><td style={{ padding: '8px' }}><code>Ctrl+B</code> then <code>%</code></td><td style={{ padding: '8px' }}>Split pane vertically (side by side)</td></tr>
          <tr><td style={{ padding: '8px' }}><code>Ctrl+B</code> then <code>"</code></td><td style={{ padding: '8px' }}>Split pane horizontally (top/bottom)</td></tr>
          <tr><td style={{ padding: '8px' }}><code>Ctrl+B</code> then <code>arrow key</code></td><td style={{ padding: '8px' }}>Switch between panes</td></tr>
          <tr><td style={{ padding: '8px' }}><code>Ctrl+B</code> then <code>c</code></td><td style={{ padding: '8px' }}>Create new window</td></tr>
          <tr><td style={{ padding: '8px' }}><code>Ctrl+B</code> then <code>n</code></td><td style={{ padding: '8px' }}>Next window</td></tr>
          <tr><td style={{ padding: '8px' }}><code>Ctrl+B</code> then <code>p</code></td><td style={{ padding: '8px' }}>Previous window</td></tr>
          <tr><td style={{ padding: '8px' }}><code>Ctrl+B</code> then <code>0-9</code></td><td style={{ padding: '8px' }}>Switch to window by number</td></tr>
          <tr><td style={{ padding: '8px' }}><code>Ctrl+B</code> then <code>z</code></td><td style={{ padding: '8px' }}>Zoom current pane (toggle fullscreen)</td></tr>
          <tr><td style={{ padding: '8px' }}><code>Ctrl+B</code> then <code>x</code></td><td style={{ padding: '8px' }}>Kill current pane</td></tr>
          <tr><td style={{ padding: '8px' }}><code>Ctrl+B</code> then <code>[</code></td><td style={{ padding: '8px' }}>Enter scroll/copy mode (q to exit)</td></tr>
        </tbody>
      </table>

      <h3>Pentesting Workflow with tmux</h3>
      <p>
        Here's a real-world example — setting up a WiFi cracking workspace with tmux:
      </p>

      <Terminal lines={[
        { segments: [{ text: '# Create a new session for WiFi testing', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'tmux new -s wifi', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Now inside tmux, split into 3 panes:', type: 'comment' }] },
        { segments: [{ text: '# Ctrl+B then % → vertical split', type: 'comment' }] },
        { segments: [{ text: '# Ctrl+B then " → horizontal split on one side', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Pane 1: Monitor mode & scanning', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airmon-ng start wlan0', type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airodump-ng wlan0mon', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Ctrl+B → arrow key to switch to Pane 2', type: 'comment' }] },
        { segments: [{ text: '# Pane 2: Targeted capture', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo airodump-ng --bssid AA:BB:CC:DD:EE:FF -c 6 -w capture wlan0mon', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Ctrl+B → arrow key to switch to Pane 3', type: 'comment' }] },
        { segments: [{ text: '# Pane 3: Deauth attack', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo aireplay-ng --deauth 10 -a AA:BB:CC:DD:EE:FF wlan0mon', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Detach (Ctrl+B then d) — everything keeps running!', type: 'comment' }] },
        { segments: [{ text: '# Later, reattach:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'tmux attach -t wifi', type: 'command' }] },
      ]} />

      <InfoBox type="success">
        <strong>Pro Tip:</strong> Create a <code>~/.tmux.conf</code> file to customize tmux. 
        Popular settings include changing the prefix key to <code>Ctrl+A</code> (easier to 
        reach), enabling mouse support, and setting better colors:
      </InfoBox>

      <Terminal lines={[
        { segments: [{ text: '# Create a tmux config file', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'nano ~/.tmux.conf', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Add these useful settings:', type: 'comment' }] },
        { segments: [{ text: '# Enable mouse (click to switch panes, scroll)', type: 'comment' }] },
        { segments: [{ text: 'set -g mouse on', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Change prefix to Ctrl+A (easier to press)', type: 'comment' }] },
        { segments: [{ text: 'unbind C-b', type: 'output' }] },
        { segments: [{ text: 'set -g prefix C-a', type: 'output' }] },
        { segments: [{ text: 'bind C-a send-prefix', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Start window numbering at 1 (not 0)', type: 'comment' }] },
        { segments: [{ text: 'set -g base-index 1', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Reload config without restarting tmux', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'tmux source-file ~/.tmux.conf', type: 'command' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: Other Productivity Tools                             */}
      {/* ============================================================ */}
      <h2>🛠️ Other Terminal Productivity Tools</h2>

      <h3>fzf — Fuzzy Finder</h3>
      <p>
        fzf is a command-line fuzzy finder. It lets you search through files, command history, 
        and more with an interactive, type-as-you-search interface.
      </p>

      <Terminal lines={[
        { segments: [{ text: '# Install fzf', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo apt install fzf', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Interactive file search', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'fzf', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Search command history interactively', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'history | fzf', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Open a file with fuzzy search', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'nano $(fzf)', type: 'command' }] },
      ]} />

      <h3>bat — cat with Syntax Highlighting</h3>
      <Terminal lines={[
        { segments: [{ text: '# Install bat (better cat)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo apt install bat', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Use batcat (on Debian/Kali the command is batcat)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'batcat script.py', type: 'command' }, { text: '  # Syntax-highlighted output with line numbers', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Create an alias for convenience', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: "echo 'alias bat=\"batcat\"' >> ~/.zshrc", type: 'command' }] },
      ]} />

      <h3>tldr — Simplified Man Pages</h3>
      <Terminal lines={[
        { segments: [{ text: '# Install tldr', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo apt install tldr', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Instead of the massive "man nmap", get concise examples:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'tldr nmap', type: 'command' }] },
        { segments: [{ text: '  nmap', type: 'output' }] },
        { segments: [{ text: '  Network exploration tool and security / port scanner.', type: 'output' }] },
        { segments: [{ text: '  - Scan the top 1000 ports of a remote host:', type: 'output' }] },
        { segments: [{ text: '    nmap {{remote_host}}', type: 'highlight' }] },
        { segments: [{ text: '  - Scan specific ports:', type: 'output' }] },
        { segments: [{ text: '    nmap -p {{22,80,443}} {{remote_host}}', type: 'highlight' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: Edge Cases & Troubleshooting                         */}
      {/* ============================================================ */}
      <h2>⚠️ Common Issues & Edge Cases</h2>

      <h3>Shell GPT not responding</h3>
      <p>Check your API key is set correctly: <code>echo $OPENAI_API_KEY</code>. Also check 
      you have API credits available on platform.openai.com.</p>

      <h3>tmux "sessions should be nested" error</h3>
      <p>
        You're trying to start tmux inside tmux. You're already in a session! Use 
        <code>Ctrl+B</code> then <code>c</code> for a new window, or <code>%</code>/<code>"</code> for 
        panes.
      </p>

      <h3>Can't scroll in tmux</h3>
      <p>
        Press <code>Ctrl+B</code> then <code>[</code> to enter copy/scroll mode. Use arrow keys 
        or Page Up/Down to scroll. Press <code>q</code> to exit scroll mode. Or enable mouse 
        mode with <code>set -g mouse on</code> in your tmux.conf.
      </p>

      <h3>tmux panes too small</h3>
      <p>
        Press <code>Ctrl+B</code> then <code>z</code> to zoom/unzoom the current pane to 
        fullscreen. You can also resize panes with <code>Ctrl+B</code> then hold an arrow key.
      </p>

      <InfoBox type="success">
        <strong>Key Takeaways:</strong>
        <ul>
          <li><strong>Shell GPT</strong> is your AI assistant for generating commands and explaining concepts</li>
          <li><strong>tmux</strong> is essential for pentesting — run multiple tools simultaneously and persist sessions</li>
          <li><strong>fzf</strong>, <strong>bat</strong>, and <strong>tldr</strong> make your daily terminal life much more efficient</li>
          <li>Always use named tmux sessions (<code>tmux new -s name</code>) so you can easily find them later</li>
          <li>Detach from tmux with <code>Ctrl+B d</code> — your processes keep running in the background</li>
        </ul>
      </InfoBox>
    </div>
  );
};

export default AITerminals;
