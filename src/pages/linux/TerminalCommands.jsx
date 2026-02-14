import React from 'react';
import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import Diagram from '../../components/Diagram';

const TerminalCommands = () => {
  return (
    <div className="page-content">
      <h1>The Terminal & Linux Commands — Your Hacker's Toolkit</h1>

      <p>
        The terminal is your <strong>primary weapon</strong> as a penetration tester. Every single 
        tool you'll use — aircrack-ng, nmap, hashcat, reaver — runs from the command line. There's 
        no GUI for most hacking tools. Mastering the terminal isn't optional — it's the foundation 
        everything else is built on.
      </p>

      <p>
        Think of the terminal like a surgeon's hands — the GUI is like using oven mitts. You can 
        do basic things with a GUI, but for precision work, you need direct control.
      </p>

      {/* ============================================================ */}
      {/* SECTION: File System Navigation                               */}
      {/* ============================================================ */}
      <h2>📂 Navigating the File System</h2>

      <p>
        Linux organizes everything as files in a tree structure starting from <code>/</code> (root). 
        Unlike Windows with drive letters (C:, D:), Linux has one unified tree.
      </p>

      <Diagram title="Linux File System Structure">
{`
  /                          ← Root (top of everything)
  ├── home/                  ← User home directories
  │   └── kali/              ← Your home directory (~)
  │       ├── Desktop/
  │       ├── Documents/
  │       └── Downloads/
  ├── etc/                   ← System configuration files
  │   ├── passwd             ← User accounts
  │   ├── shadow             ← Password hashes (need root!)
  │   └── network/           ← Network configuration
  ├── var/                   ← Variable data (logs, web files)
  │   ├── log/               ← System logs
  │   └── www/               ← Web server files
  ├── usr/                   ← User programs and data
  │   ├── bin/               ← User commands
  │   └── share/             ← Shared data
  │       └── wordlists/     ← Kali wordlists live here!
  ├── tmp/                   ← Temporary files (anyone can write)
  ├── root/                  ← Root user's home directory
  └── dev/                   ← Device files (hardware)
`}
      </Diagram>

      <Terminal lines={[
        { segments: [{ text: '# Where am I right now?', type: 'comment' }] },
        { segments: [{ text: '┌──(kali㉿kali)-[~]', type: 'prompt' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'pwd', type: 'command' }] },
        { segments: [{ text: '/home/kali', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# List files in current directory (detailed view)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'ls -la', type: 'command' }] },
        { segments: [{ text: 'total 44', type: 'output' }] },
        { segments: [{ text: 'drwxr-xr-x 2 kali kali 4096 Jan 10 10:30 Desktop', type: 'output' }] },
        { segments: [{ text: 'drwxr-xr-x 2 kali kali 4096 Jan 10 10:30 Documents', type: 'output' }] },
        { segments: [{ text: '-rw-r--r-- 1 kali kali  256 Jan 10 10:30 notes.txt', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Change directory', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'cd /var/log', type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'pwd', type: 'command' }] },
        { segments: [{ text: '/var/log', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Shortcuts:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'cd ~', type: 'command' }, { text: '         # Go to home directory (/home/kali)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'cd ..', type: 'command' }, { text: '        # Go up one directory', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'cd -', type: 'command' }, { text: '         # Go back to previous directory', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'cd', type: 'command' }, { text: '           # Also goes to home (same as cd ~)', type: 'comment' }] },
      ]} />

      <h3>Navigation Commands Reference</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Command</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Description</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={{ padding: '8px' }}><code>pwd</code></td><td style={{ padding: '8px' }}>Print working (current) directory</td><td style={{ padding: '8px' }}><code>pwd</code> → /home/kali</td></tr>
          <tr><td style={{ padding: '8px' }}><code>ls</code></td><td style={{ padding: '8px' }}>List files and directories</td><td style={{ padding: '8px' }}><code>ls -la</code> (detailed + hidden files)</td></tr>
          <tr><td style={{ padding: '8px' }}><code>cd</code></td><td style={{ padding: '8px' }}>Change directory</td><td style={{ padding: '8px' }}><code>cd /etc</code></td></tr>
          <tr><td style={{ padding: '8px' }}><code>cd ..</code></td><td style={{ padding: '8px' }}>Go up one level</td><td style={{ padding: '8px' }}><code>cd ../../../</code> (up 3 levels)</td></tr>
          <tr><td style={{ padding: '8px' }}><code>tree</code></td><td style={{ padding: '8px' }}>Visual directory tree</td><td style={{ padding: '8px' }}><code>tree -L 2</code> (2 levels deep)</td></tr>
        </tbody>
      </table>

      {/* ============================================================ */}
      {/* SECTION: File Operations                                      */}
      {/* ============================================================ */}
      <h2>📄 File Operations</h2>

      <Terminal lines={[
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '# CREATING FILES AND DIRECTORIES', type: 'comment' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'touch myfile.txt', type: 'command' }, { text: '          # Create an empty file', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'mkdir myfolder', type: 'command' }, { text: '           # Create a directory', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'mkdir -p parent/child/grand', type: 'command' }, { text: '  # Create nested dirs at once', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '# COPYING FILES', type: 'comment' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'cp file.txt /tmp/', type: 'command' }, { text: '          # Copy file to /tmp/', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'cp file.txt backup.txt', type: 'command' }, { text: '     # Copy and rename', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'cp -r myfolder/ /tmp/', type: 'command' }, { text: '     # Copy directory (recursive)', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '# MOVING AND RENAMING', type: 'comment' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'mv old.txt new.txt', type: 'command' }, { text: '       # Rename a file', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'mv file.txt /tmp/', type: 'command' }, { text: '        # Move file to /tmp/', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '# DELETING', type: 'comment' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'rm file.txt', type: 'command' }, { text: '              # Delete a file', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'rm -r myfolder/', type: 'command' }, { text: '          # Delete directory + contents', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'rm -rf myfolder/', type: 'command' }, { text: '         # Force delete (no confirmation)', type: 'comment' }] },
      ]} />

      <InfoBox type="danger">
        <strong>⚠️ rm -rf is PERMANENT!</strong> There is no recycle bin in Linux. <code>rm -rf</code> 
        deletes everything instantly with no recovery. Always double-check the path before pressing 
        Enter. The infamous <code>rm -rf /</code> will destroy your entire operating system. Never 
        run it, even as a joke.
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: Reading Files                                        */}
      {/* ============================================================ */}
      <h2>📖 Reading & Editing Files</h2>

      <Terminal lines={[
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '# VIEWING FILE CONTENTS', type: 'comment' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'cat /etc/passwd', type: 'command' }, { text: '           # Print entire file', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'cat -n /etc/passwd', type: 'command' }, { text: '        # Print with line numbers', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'head -20 /etc/passwd', type: 'command' }, { text: '      # First 20 lines', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'tail -20 /var/log/syslog', type: 'command' }, { text: '  # Last 20 lines', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'tail -f /var/log/syslog', type: 'command' }, { text: '   # Follow log in real-time', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'less /etc/passwd', type: 'command' }, { text: '          # Scrollable viewer (q to quit)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'wc -l /etc/passwd', type: 'command' }, { text: '         # Count lines in file', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '# WRITING TO FILES', type: 'comment' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'echo "hello" > file.txt', type: 'command' }, { text: '    # Write (overwrites file!)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'echo "world" >> file.txt', type: 'command' }, { text: '   # Append to file', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '# TEXT EDITORS', type: 'comment' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'nano myfile.txt', type: 'command' }, { text: '           # Beginner-friendly editor', type: 'comment' }] },
        { segments: [{ text: '# Ctrl+O to save, Ctrl+X to exit', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'vim myfile.txt', type: 'command' }, { text: '            # Advanced editor (powerful but steep learning curve)', type: 'comment' }] },
        { segments: [{ text: '# Press i to type, Esc then :wq to save and quit', type: 'comment' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: Searching                                            */}
      {/* ============================================================ */}
      <h2>🔍 Searching & Filtering</h2>

      <p>
        Searching is critical for pentesting — finding configuration files, passwords in logs, 
        specific tools, and more.
      </p>

      <Terminal lines={[
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '# GREP — Search INSIDE files', type: 'comment' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'grep "password" /etc/passwd', type: 'command' }, { text: '      # Find "password" in file', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'grep -i "root" /etc/passwd', type: 'command' }, { text: '       # Case-insensitive', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'grep -r "secret" /var/www/', type: 'command' }, { text: '      # Search recursively in all files', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'grep -n "error" /var/log/syslog', type: 'command' }, { text: ' # Show line numbers', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'grep -c "failed" auth.log', type: 'command' }, { text: '       # Count matching lines', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '# FIND — Search for FILES by name, size, date', type: 'comment' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'find / -name "*.conf" 2>/dev/null', type: 'command' }, { text: '   # Find all .conf files', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'find / -name "passwd" 2>/dev/null', type: 'command' }, { text: '   # Find files named "passwd"', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'find / -size +100M 2>/dev/null', type: 'command' }, { text: '     # Files larger than 100MB', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'find / -mtime -1 2>/dev/null', type: 'command' }, { text: '       # Modified in last 24h', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'find / -perm -4000 2>/dev/null', type: 'command' }, { text: '     # SUID files (privilege escalation!)', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# 2>/dev/null suppresses "Permission denied" errors', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '# LOCATE — Fast file search (uses database)', type: 'comment' }] },
        { segments: [{ text: '# ═══════════════════════════════════════════', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo updatedb', type: 'command' }, { text: '                   # Update the database first', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'locate aircrack', type: 'command' }, { text: '                  # Instant search', type: 'comment' }] },
        { segments: [{ text: '/usr/bin/aircrack-ng', type: 'output' }] },
        { segments: [{ text: '/usr/share/man/man1/aircrack-ng.1.gz', type: 'output' }] },
      ]} />

      <InfoBox type="tip">
        <strong>Pentesting use:</strong> <code>find / -perm -4000</code> finds SUID files — programs 
        that run with root privileges. These are gold for privilege escalation. 
        <code>grep -r "password" /var/www/</code> searches web server files for hardcoded passwords.
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: Permissions                                          */}
      {/* ============================================================ */}
      <h2>🔐 Permissions & Ownership</h2>

      <p>
        Linux permissions control who can read, write, or execute a file. Understanding permissions 
        is crucial for both attacking and defending systems.
      </p>

      <Diagram title="Understanding Linux File Permissions">
{`
  $ ls -la script.sh
  -rwxr-xr-- 1 kali kali 256 Jan 10 script.sh
  │└┬┘└┬┘└┬┘   └┬─┘ └┬─┘
  │ │   │   │     │    └── Group owner
  │ │   │   │     └─────── File owner
  │ │   │   └───────────── Others (everyone else): r-- = read only
  │ │   └───────────────── Group permissions:       r-x = read + execute
  │ └───────────────────── Owner permissions:       rwx = read + write + execute
  └─────────────────────── File type:               - = regular file
                                                     d = directory
                                                     l = symbolic link
  
  Permission Numbers (chmod):
  ═══════════════════════════
  r (read)    = 4
  w (write)   = 2
  x (execute) = 1
  
  Common combinations:
  7 = rwx (4+2+1)    full access
  6 = rw- (4+2)      read + write
  5 = r-x (4+1)      read + execute
  4 = r-- (4)        read only
  0 = --- (0)        no access
  
  Example: chmod 755 script.sh
  Owner: 7 (rwx)  Group: 5 (r-x)  Others: 5 (r-x)
`}
      </Diagram>

      <Terminal lines={[
        { segments: [{ text: '# Make a script executable', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'chmod +x script.sh', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Set specific permissions (owner: rwx, group: r-x, others: r--)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'chmod 754 script.sh', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Change file owner', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo chown root:root script.sh', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Run a command as root', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo cat /etc/shadow', type: 'command' }] },
        { segments: [{ text: 'root:$6$abc...:19000:0:99999:7:::', type: 'output' }] },
        { segments: [{ text: '# /etc/shadow contains password hashes — only root can read it', type: 'comment' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: Piping & Redirection                                 */}
      {/* ============================================================ */}
      <h2>🔗 Piping & Redirection — The Power of Linux</h2>

      <p>
        This is where Linux becomes incredibly powerful. You can <strong>chain commands together</strong>, 
        sending the output of one command as input to the next. This is like building with LEGO — 
        small, simple pieces that combine into complex tools.
      </p>

      <Terminal lines={[
        { segments: [{ text: '# PIPE (|) — Send output of one command to another', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'cat /etc/passwd | grep "root"', type: 'command' }] },
        { segments: [{ text: 'root:x:0:0:root:/root:/bin/bash', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Count how many users are on the system', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'cat /etc/passwd | wc -l', type: 'command' }] },
        { segments: [{ text: '45', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Sort unique IP addresses from a log', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: "cat access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head -10", type: 'command' }] },
        { segments: [{ text: '   1523 192.168.1.100', type: 'output' }] },
        { segments: [{ text: '    847 10.0.0.5', type: 'output' }] },
        { segments: [{ text: '    231 172.16.0.1', type: 'output' }] },
        { segments: [{ text: '# Top 10 IP addresses by number of requests', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# REDIRECTION', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'echo "hello" > output.txt', type: 'command' }, { text: '     # Write to file (overwrites!)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'echo "world" >> output.txt', type: 'command' }, { text: '    # Append to file', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'find / -name "*.conf" 2>/dev/null', type: 'command' }, { text: '  # Suppress errors', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'nmap 192.168.1.1 > scan.txt 2>&1', type: 'command' }, { text: '  # Save output + errors to file', type: 'comment' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: Process Management                                   */}
      {/* ============================================================ */}
      <h2>⚙️ Process & System Management</h2>

      <Terminal lines={[
        { segments: [{ text: '# List all running processes', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'ps aux', type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'ps aux | grep aircrack', type: 'command' }, { text: '  # Find specific process', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Interactive process viewer (like Task Manager)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'top', type: 'command' }, { text: '                         # Press q to quit', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'htop', type: 'command' }, { text: '                        # Better version (install: apt install htop)', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Kill a process', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'kill 1234', type: 'command' }, { text: '                    # Graceful kill (by PID)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'kill -9 1234', type: 'command' }, { text: '                 # Force kill', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'killall aircrack-ng', type: 'command' }, { text: '          # Kill by name', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Run a process in the background', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'airodump-ng wlan0mon &', type: 'command' }, { text: '    # & runs in background', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'jobs', type: 'command' }, { text: '                         # List background jobs', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'fg', type: 'command' }, { text: '                           # Bring to foreground', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# System info', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'df -h', type: 'command' }, { text: '                        # Disk space', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'free -h', type: 'command' }, { text: '                      # Memory usage', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'uname -a', type: 'command' }, { text: '                     # System info', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'whoami', type: 'command' }, { text: '                       # Current user', type: 'comment' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: Networking Commands                                  */}
      {/* ============================================================ */}
      <h2>🌐 Networking Commands</h2>

      <Terminal lines={[
        { segments: [{ text: '# View network interfaces and IP addresses', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'ip a', type: 'command' }, { text: '                          # Modern way (ip address)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'ifconfig', type: 'command' }, { text: '                      # Legacy way (still works)', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Check connectivity', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'ping -c 4 google.com', type: 'command' }, { text: '          # 4 ping packets', type: 'comment' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# DNS lookup', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'nslookup google.com', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Download files', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'wget https://example.com/file.zip', type: 'command' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'curl -O https://example.com/file.zip', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# View open ports', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'ss -tuln', type: 'command' }, { text: '                      # Active listening ports', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'netstat -tuln', type: 'command' }, { text: '                  # Legacy version', type: 'comment' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: Package Management                                   */}
      {/* ============================================================ */}
      <h2>📦 Package Management (APT)</h2>

      <Terminal lines={[
        { segments: [{ text: '# Update package list (always do this first!)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo apt update', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Upgrade all installed packages', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo apt upgrade -y', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Install a package', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo apt install nmap', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Remove a package', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo apt remove nmap', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Search for a package', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'apt search wireless', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Check if a tool is installed', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'which aircrack-ng', type: 'command' }] },
        { segments: [{ text: '/usr/bin/aircrack-ng', type: 'output' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Full system upgrade (including Kali tools)', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo apt update && sudo apt full-upgrade -y', type: 'command' }] },
      ]} />

      {/* ============================================================ */}
      {/* SECTION: Keyboard Shortcuts                                   */}
      {/* ============================================================ */}
      <h2>⌨️ Essential Keyboard Shortcuts</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>Shortcut</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>What It Does</th>
            <th style={{ padding: '10px', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>When to Use</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={{ padding: '8px' }}><code>Ctrl + C</code></td><td style={{ padding: '8px' }}>Kill/stop running command</td><td style={{ padding: '8px' }}>Stop a scan, cancel a process</td></tr>
          <tr><td style={{ padding: '8px' }}><code>Ctrl + Z</code></td><td style={{ padding: '8px' }}>Suspend (pause) process</td><td style={{ padding: '8px' }}>Pause to run something else, then <code>fg</code> to resume</td></tr>
          <tr><td style={{ padding: '8px' }}><code>Ctrl + D</code></td><td style={{ padding: '8px' }}>End of input / logout</td><td style={{ padding: '8px' }}>Close terminal session</td></tr>
          <tr><td style={{ padding: '8px' }}><code>Ctrl + L</code></td><td style={{ padding: '8px' }}>Clear screen</td><td style={{ padding: '8px' }}>Clean up terminal display</td></tr>
          <tr><td style={{ padding: '8px' }}><code>Ctrl + R</code></td><td style={{ padding: '8px' }}>Search command history</td><td style={{ padding: '8px' }}>Find a command you ran before</td></tr>
          <tr><td style={{ padding: '8px' }}><code>Tab</code></td><td style={{ padding: '8px' }}>Auto-complete</td><td style={{ padding: '8px' }}>Complete file names, commands, paths</td></tr>
          <tr><td style={{ padding: '8px' }}><code>↑ / ↓</code></td><td style={{ padding: '8px' }}>Scroll through history</td><td style={{ padding: '8px' }}>Repeat previous commands</td></tr>
          <tr><td style={{ padding: '8px' }}><code>!!</code></td><td style={{ padding: '8px' }}>Repeat last command</td><td style={{ padding: '8px' }}><code>sudo !!</code> = rerun last command as root</td></tr>
        </tbody>
      </table>

      <InfoBox type="tip">
        <strong>Power move:</strong> Forgot <code>sudo</code>? Type <code>sudo !!</code> and it 
        will re-run your last command with sudo. Extremely handy — you'll use this daily.
      </InfoBox>

      {/* ============================================================ */}
      {/* SECTION: Edge Cases                                           */}
      {/* ============================================================ */}
      <h2>⚠️ Common Issues & Edge Cases</h2>

      <h3>Edge Case: "Command not found"</h3>
      <Terminal lines={[
        { segments: [{ text: '# The tool isn\'t installed. Install it:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo apt install <tool-name>', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Not sure of the package name?', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'apt search <keyword>', type: 'command' }] },
      ]} />

      <h3>Edge Case: "Permission denied"</h3>
      <p>You need elevated privileges. Prefix with <code>sudo</code>. For scripts, make them 
      executable first: <code>chmod +x script.sh</code></p>

      <h3>Edge Case: "No space left on device"</h3>
      <Terminal lines={[
        { segments: [{ text: '# Check disk usage:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'df -h', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Find large files:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'du -sh /home/kali/* | sort -rh | head -10', type: 'command' }] },
        { segments: [{ text: '', type: 'output' }] },
        { segments: [{ text: '# Clean up apt cache:', type: 'comment' }] },
        { segments: [{ text: '└─$ ', type: 'prompt' }, { text: 'sudo apt autoremove && sudo apt clean', type: 'command' }] },
      ]} />

      <h3>Edge Case: Stuck in vim</h3>
      <p>
        If you accidentally opened vim and can't exit: press <code>Esc</code>, then type 
        <code>:q!</code> and press Enter. This quits without saving. The exclamation mark forces 
        the quit even if you made changes.
      </p>

      <InfoBox type="success">
        <strong>Key Takeaways:</strong>
        <ul>
          <li>Master <code>cd</code>, <code>ls</code>, <code>cat</code>, <code>grep</code>, <code>find</code> — you'll use them constantly</li>
          <li>Piping (<code>|</code>) is Linux's superpower — chain commands for powerful one-liners</li>
          <li>Always use <code>Tab</code> for auto-completion — saves time and prevents typos</li>
          <li><code>sudo !!</code> reruns the last command as root — your new best friend</li>
          <li>Use <code>man &lt;command&gt;</code> to read the manual for any command</li>
        </ul>
      </InfoBox>
    </div>
  );
};

export default TerminalCommands;
