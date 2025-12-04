// /components/LCDDisplay.tsx
export default function LcdDisplay({ mainLine, subLine }) {
  return (
    <div className="vm-lcd" aria-live="polite">
      <p className="vm-lcd-main">{mainLine}</p>
      {subLine && <p className="vm-lcd-sub">{subLine}</p>}
    </div>
  );
}
