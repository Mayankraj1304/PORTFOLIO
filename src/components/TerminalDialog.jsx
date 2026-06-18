export default function TerminalDialog({ onClose }) {
  return (
    <div className="terminal" role="dialog" aria-label="Developer terminal">
      <button onClick={onClose}>close</button>
      <pre>
        {
          "> developer_mode --unlock\nAchievement: recruiter curiosity +1\nStatus: ready for collaboration"
        }
      </pre>
    </div>
  );
}
