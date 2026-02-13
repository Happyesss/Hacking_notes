import Terminal from '../../components/Terminal';
import InfoBox from '../../components/InfoBox';
import { Troubleshooting, TroubleItem } from '../../components/Troubleshooting';

export default function AITerminals() {
  return (
    <div className="content-area">
      <div className="topic-header">
        <div className="topic-breadcrumb">Linux Basics <span>/</span> AI-Powered Terminals</div>
        <h1>More Powerful Linux Terminals with AI Features</h1>
        <p className="topic-desc">Modern terminal tools enhanced with AI capabilities that can help you write commands, explain outputs, and speed up your workflow.</p>
      </div>

      <div className="topic-section">
        <h2>AI-Enhanced Terminal Tools</h2>
        <p>These tools integrate AI into your terminal workflow making it easier to construct complex commands, understand output, and work more efficiently.</p>

        <table className="info-table">
          <thead>
            <tr><th>Tool</th><th>What It Does</th><th>Use Case</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Warp</strong></td><td>AI-powered terminal with command suggestions</td><td>Faster command writing</td></tr>
            <tr><td><strong>GitHub Copilot CLI</strong></td><td>AI that suggests shell commands</td><td>Complex command generation</td></tr>
            <tr><td><strong>Shell GPT</strong></td><td>ChatGPT in your terminal</td><td>Explain commands, generate scripts</td></tr>
            <tr><td><strong>Fig (now Amazon Q)</strong></td><td>Autocomplete for terminal</td><td>Visual autocomplete</td></tr>
          </tbody>
        </table>
      </div>

      <div className="topic-section">
        <h2>Shell GPT (sgpt)</h2>
        <p>Shell GPT lets you use ChatGPT directly in your terminal. Great for generating commands, explaining output, and writing scripts.</p>

        <h3>Installation</h3>
        <Terminal title="Install Shell GPT" lines={[
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'pip install shell-gpt' }],
          [{ type: 'comment', text: '# Set your OpenAI API key' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'export OPENAI_API_KEY=' }, { type: 'string', text: '"your-api-key-here"' }],
        ]} />

        <h3>Usage Examples</h3>
        <Terminal title="Shell GPT in Action" lines={[
          [{ type: 'comment', text: '# Ask for a command' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sgpt ' }, { type: 'string', text: '"find all .log files larger than 100MB"' }],
          [{ type: 'output', text: 'find / -name "*.log" -size +100M' }],
          [{ type: 'comment', text: '# Execute the command directly' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sgpt ' }, { type: 'flag', text: '--shell ' }, { type: 'string', text: '"list all open ports"' }],
          [{ type: 'output', text: 'ss -tuln' }],
          [{ type: 'comment', text: '# Explain a command' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sgpt ' }, { type: 'string', text: '"explain: awk \'{print $1}\' access.log | sort | uniq -c | sort -rn"' }],
        ]} />
      </div>

      <div className="topic-section">
        <h2>Warp Terminal</h2>
        <p>Warp is a modern terminal built with Rust that has AI built-in. It can suggest commands, explain errors, and has a modern UI.</p>

        <h3>Key Features</h3>
        <ul>
          <li><strong>Warp AI</strong> — Press <code className="inline-code">#</code> to ask AI for commands</li>
          <li><strong>Blocks</strong> — Commands and output are grouped in blocks for easy navigation</li>
          <li><strong>Workflows</strong> — Save and share commonly used command sequences</li>
          <li><strong>Smart autocomplete</strong> — Context-aware suggestions</li>
        </ul>

        <InfoBox type="note">
          <p>Warp is currently available for macOS and Linux. For Kali in a VM, you can install it but some features may be limited.</p>
        </InfoBox>
      </div>

      <div className="topic-section">
        <h2>Useful Terminal Multiplexers</h2>
        <p>Not AI, but essential for efficient hacking — running multiple terminals in one window.</p>

        <h3>tmux</h3>
        <Terminal title="tmux Basics" lines={[
          [{ type: 'comment', text: '# Start a new tmux session' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'tmux new ' }, { type: 'flag', text: '-s ' }, { type: 'string', text: 'hacking' }],
          [{ type: 'comment', text: '# Split pane horizontally' }],
          [{ type: 'output', text: 'Ctrl+B then %' }],
          [{ type: 'comment', text: '# Split pane vertically' }],
          [{ type: 'output', text: 'Ctrl+B then "' }],
          [{ type: 'comment', text: '# Switch between panes' }],
          [{ type: 'output', text: 'Ctrl+B then arrow keys' }],
          [{ type: 'comment', text: '# Detach from session (keeps running)' }],
          [{ type: 'output', text: 'Ctrl+B then D' }],
          [{ type: 'comment', text: '# Reattach to session' }],
          [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'tmux attach ' }, { type: 'flag', text: '-t ' }, { type: 'string', text: 'hacking' }],
        ]} />

        <InfoBox type="tip" title="Pro Tip">
          <p>Use tmux during pentesting to run multiple tools simultaneously: one pane for scanning, one for exploitation, one for monitoring.</p>
        </InfoBox>
      </div>

      <Troubleshooting>
        <TroubleItem issue="Shell GPT installation fails with pip">
          <div className="solution">Solution:</div>
          <p>Use <code className="inline-code">pip3</code> instead or install in a virtual environment:</p>
          <Terminal title="Fix pip install" lines={[
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'pip3 install shell-gpt' }],
            [{ type: 'comment', text: '# Or use pipx for isolated install' }],
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'pipx install shell-gpt' }],
          ]} />
        </TroubleItem>
        <TroubleItem issue="API key not working for Shell GPT">
          <div className="solution">Solution:</div>
          <p>Make sure the key is set permanently by adding it to your shell config:</p>
          <Terminal title="Set API Key" lines={[
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'echo \'export OPENAI_API_KEY="your-key"\' ' }, { type: 'highlight', text: '>> ' }, { type: 'path', text: '~/.zshrc' }],
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'source ' }, { type: 'path', text: '~/.zshrc' }],
          ]} />
        </TroubleItem>
        <TroubleItem issue="tmux: command not found">
          <div className="solution">Solution:</div>
          <Terminal title="Install tmux" lines={[
            [{ type: 'prompt', text: '$ ' }, { type: 'command', text: 'sudo apt install ' }, { type: 'string', text: 'tmux' }],
          ]} />
        </TroubleItem>
      </Troubleshooting>
    </div>
  );
}
