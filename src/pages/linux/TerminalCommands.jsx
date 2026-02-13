import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import { Troubleshooting, TroubleItem } from '../../components/Troubleshooting';

export default function TerminalCommands() {
  return (
    <div className="content-area">
      <div className="topic-header">
        <div className="topic-breadcrumb">Linux Basics <span>/</span> Terminal & Linux Commands</div>
        <h1>The Terminal & Linux Commands</h1>
        <p className="topic-desc">The terminal is your primary interface for hacking. Mastering the command line is essential for every penetration tester.</p>
      </div>

      <div className="topic-section">
        <h2>Navigating the File System</h2>

        <Terminal title="Basic Navigation" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'pwd' }],
          [{ type: 'output', text: '/home/kali' }],
          [{ type: 'comment', text: '# List files with details' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'ls ' }, { type: 'flag', text: '-la' }],
          [{ type: 'output', text: 'total 44' }],
          [{ type: 'output', text: 'drwxr-xr-x 2 kali kali 4096 Jan 10 10:30 Desktop' }],
          [{ type: 'output', text: 'drwxr-xr-x 2 kali kali 4096 Jan 10 10:30 Documents' }],
          [{ type: 'comment', text: '# Change directory' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'cd ' }, { type: 'path', text: '/var/log' }],
          [{ type: 'comment', text: '# Go back to home' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'cd ' }, { type: 'path', text: '~' }],
          [{ type: 'comment', text: '# Go back to previous directory' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'cd ' }, { type: 'flag', text: '-' }],
        ]} />

        <table className="info-table">
          <thead>
            <tr><th>Command</th><th>Description</th><th>Example</th></tr>
          </thead>
          <tbody>
            <tr><td><code>pwd</code></td><td>Print working directory</td><td><code>pwd</code></td></tr>
            <tr><td><code>ls</code></td><td>List files</td><td><code>ls -la</code></td></tr>
            <tr><td><code>cd</code></td><td>Change directory</td><td><code>cd /etc</code></td></tr>
            <tr><td><code>cd ..</code></td><td>Go up one directory</td><td><code>cd ..</code></td></tr>
            <tr><td><code>cd ~</code></td><td>Go to home directory</td><td><code>cd ~</code></td></tr>
            <tr><td><code>cd -</code></td><td>Go to previous directory</td><td><code>cd -</code></td></tr>
          </tbody>
        </table>
      </div>

      <div className="topic-section">
        <h2>File Operations</h2>

        <Terminal title="File Management" lines={[
          [{ type: 'comment', text: '# Create a file' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'touch ' }, { type: 'string', text: 'myfile.txt' }],
          [{ type: 'comment', text: '# Create a directory' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'mkdir ' }, { type: 'string', text: 'myfolder' }],
          [{ type: 'comment', text: '# Create nested directories' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'mkdir ' }, { type: 'flag', text: '-p ' }, { type: 'string', text: 'parent/child/grandchild' }],
          [{ type: 'comment', text: '# Copy files' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'cp ' }, { type: 'string', text: 'file.txt ' }, { type: 'path', text: '/tmp/' }],
          [{ type: 'comment', text: '# Copy directory recursively' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'cp ' }, { type: 'flag', text: '-r ' }, { type: 'string', text: 'myfolder/ ' }, { type: 'path', text: '/tmp/' }],
          [{ type: 'comment', text: '# Move/rename files' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'mv ' }, { type: 'string', text: 'old.txt new.txt' }],
          [{ type: 'comment', text: '# Delete file' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'rm ' }, { type: 'string', text: 'file.txt' }],
          [{ type: 'comment', text: '# Delete directory and contents' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'rm ' }, { type: 'flag', text: '-rf ' }, { type: 'string', text: 'myfolder/' }],
        ]} />

        <InfoBox type="danger" title="Careful with rm -rf">
          <p><code className="inline-code">rm -rf</code> deletes everything permanently with no recycle bin. Double-check your path before running. <strong>Never</strong> run <code className="inline-code">rm -rf /</code> — it will destroy your entire system.</p>
        </InfoBox>
      </div>

      <div className="topic-section">
        <h2>Reading & Editing Files</h2>

        <Terminal title="Viewing Files" lines={[
          [{ type: 'comment', text: '# View file contents' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'cat ' }, { type: 'string', text: '/etc/passwd' }],
          [{ type: 'comment', text: '# View with line numbers' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'cat ' }, { type: 'flag', text: '-n ' }, { type: 'string', text: '/etc/passwd' }],
          [{ type: 'comment', text: '# View first 10 lines' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'head ' }, { type: 'flag', text: '-n 10 ' }, { type: 'string', text: '/etc/passwd' }],
          [{ type: 'comment', text: '# View last 20 lines' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'tail ' }, { type: 'flag', text: '-n 20 ' }, { type: 'string', text: '/var/log/syslog' }],
          [{ type: 'comment', text: '# Follow log in real time' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'tail ' }, { type: 'flag', text: '-f ' }, { type: 'string', text: '/var/log/syslog' }],
          [{ type: 'comment', text: '# Scroll through large files' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'less ' }, { type: 'string', text: '/etc/passwd' }],
          [{ type: 'comment', text: '# Edit with nano (beginner-friendly)' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'nano ' }, { type: 'string', text: 'myfile.txt' }],
          [{ type: 'comment', text: '# Edit with vim (advanced)' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'vim ' }, { type: 'string', text: 'myfile.txt' }],
        ]} />
      </div>

      <div className="topic-section">
        <h2>Searching & Filtering</h2>

        <Terminal title="Search Commands" lines={[
          [{ type: 'comment', text: '# Search inside files' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'grep ' }, { type: 'string', text: '"password" ' }, { type: 'path', text: '/etc/passwd' }],
          [{ type: 'comment', text: '# Case-insensitive search' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'grep ' }, { type: 'flag', text: '-i ' }, { type: 'string', text: '"root" ' }, { type: 'path', text: '/etc/passwd' }],
          [{ type: 'comment', text: '# Recursive search in all files' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'grep ' }, { type: 'flag', text: '-r ' }, { type: 'string', text: '"secret" ' }, { type: 'path', text: '/var/www/' }],
          [{ type: 'comment', text: '# Find files by name' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'find ' }, { type: 'path', text: '/ ' }, { type: 'flag', text: '-name ' }, { type: 'string', text: '"*.conf"' }],
          [{ type: 'comment', text: '# Find files modified in last 24h' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'find ' }, { type: 'path', text: '/ ' }, { type: 'flag', text: '-mtime -1' }],
          [{ type: 'comment', text: '# Locate files (faster, uses database)' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'locate ' }, { type: 'string', text: 'aircrack' }],
        ]} />
      </div>

      <div className="topic-section">
        <h2>Permissions & Ownership</h2>

        <Terminal title="File Permissions" lines={[
          [{ type: 'comment', text: '# View permissions' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'ls ' }, { type: 'flag', text: '-la ' }, { type: 'string', text: 'script.sh' }],
          [{ type: 'output', text: '-rw-r--r-- 1 kali kali 256 Jan 10 script.sh' }],
          [{ type: 'comment', text: '# Make script executable' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'chmod ' }, { type: 'flag', text: '+x ' }, { type: 'string', text: 'script.sh' }],
          [{ type: 'comment', text: '# Set specific permissions (rwxr-xr-x)' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'chmod ' }, { type: 'number', text: '755 ' }, { type: 'string', text: 'script.sh' }],
          [{ type: 'comment', text: '# Change file owner' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'chown ' }, { type: 'string', text: 'root:root script.sh' }],
          [{ type: 'comment', text: '# Run as superuser' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo ' }, { type: 'string', text: 'cat /etc/shadow' }],
        ]} />

        <table className="info-table">
          <thead>
            <tr><th>Number</th><th>Permission</th><th>Meaning</th></tr>
          </thead>
          <tbody>
            <tr><td><code>7</code></td><td>rwx</td><td>Read + Write + Execute</td></tr>
            <tr><td><code>6</code></td><td>rw-</td><td>Read + Write</td></tr>
            <tr><td><code>5</code></td><td>r-x</td><td>Read + Execute</td></tr>
            <tr><td><code>4</code></td><td>r--</td><td>Read only</td></tr>
            <tr><td><code>0</code></td><td>---</td><td>No permission</td></tr>
          </tbody>
        </table>
      </div>

      <div className="topic-section">
        <h2>Process & System Management</h2>

        <Terminal title="System Commands" lines={[
          [{ type: 'comment', text: '# List running processes' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'ps ' }, { type: 'flag', text: 'aux' }],
          [{ type: 'comment', text: '# Interactive process viewer' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'top' }],
          [{ type: 'comment', text: '# Kill a process' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'kill ' }, { type: 'number', text: '1234' }],
          [{ type: 'comment', text: '# Force kill' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'kill ' }, { type: 'flag', text: '-9 ' }, { type: 'number', text: '1234' }],
          [{ type: 'comment', text: '# Check disk space' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'df ' }, { type: 'flag', text: '-h' }],
          [{ type: 'comment', text: '# Check network interfaces' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'ifconfig' }],
          [{ type: 'comment', text: '# or the modern way' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'ip ' }, { type: 'flag', text: 'a' }],
        ]} />
      </div>

      <div className="topic-section">
        <h2>Piping & Redirection</h2>
        <p>One of the most powerful features of Linux — chaining commands together.</p>

        <Terminal title="Pipes & Redirects" lines={[
          [{ type: 'comment', text: '# Pipe output of one command to another' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'cat /etc/passwd ' }, { type: 'highlight', text: '| ' }, { type: 'command', text: 'grep ' }, { type: 'string', text: '"root"' }],
          [{ type: 'comment', text: '# Count lines' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'cat /etc/passwd ' }, { type: 'highlight', text: '| ' }, { type: 'command', text: 'wc ' }, { type: 'flag', text: '-l' }],
          [{ type: 'comment', text: '# Write output to file (overwrites)' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'echo "hello" ' }, { type: 'highlight', text: '> ' }, { type: 'path', text: 'output.txt' }],
          [{ type: 'comment', text: '# Append output to file' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'echo "world" ' }, { type: 'highlight', text: '>> ' }, { type: 'path', text: 'output.txt' }],
          [{ type: 'comment', text: '# Redirect errors' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'find / -name "secret" ' }, { type: 'highlight', text: '2>/dev/null' }],
        ]} />
      </div>

      <div className="topic-section">
        <h2>Package Management</h2>

        <Terminal title="APT Package Manager" lines={[
          [{ type: 'comment', text: '# Update package list' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo apt update' }],
          [{ type: 'comment', text: '# Upgrade all packages' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo apt upgrade ' }, { type: 'flag', text: '-y' }],
          [{ type: 'comment', text: '# Install a package' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo apt install ' }, { type: 'string', text: 'nmap' }],
          [{ type: 'comment', text: '# Remove a package' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo apt remove ' }, { type: 'string', text: 'nmap' }],
          [{ type: 'comment', text: '# Search for a package' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'apt search ' }, { type: 'string', text: 'wireless' }],
        ]} />
      </div>

      <Troubleshooting>
        <TroubleItem issue="Command not found">
          <div className="solution">Solution:</div>
          <p>The tool is not installed. Install it with <code className="inline-code">sudo apt install &lt;tool-name&gt;</code>. If you're not sure of the package name, search with <code className="inline-code">apt search &lt;keyword&gt;</code>.</p>
        </TroubleItem>
        <TroubleItem issue="Permission denied when running a command">
          <div className="solution">Solution:</div>
          <p>You need elevated privileges. Prefix the command with <code className="inline-code">sudo</code>. If the file is a script, make sure it's executable: <code className="inline-code">chmod +x script.sh</code></p>
        </TroubleItem>
        <TroubleItem issue="nano/vim shows empty screen or weird characters">
          <div className="solution">Solution:</div>
          <p>Your terminal emulator may not support the editor's display. Try resizing the terminal or use <code className="inline-code">export TERM=xterm-256color</code></p>
        </TroubleItem>
        <TroubleItem issue="'locate' command returns nothing">
          <div className="solution">Solution:</div>
          <p>The locate database needs to be updated first:</p>
          <Terminal title="Update locate DB" lines={[
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo updatedb' }],
          ]} />
        </TroubleItem>
      </Troubleshooting>
    </div>
  );
}
