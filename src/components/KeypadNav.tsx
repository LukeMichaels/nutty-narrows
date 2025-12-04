// /components/KeypadNav.tsx
import { useState } from "react";

const LETTERS = ["A", "B", "C"];
const NUMBERS = ["1", "2", "3"];

export default function KeypadNav({ onCodeSelect, lastCode }) {
  const [pendingLetter, setPendingLetter] = useState(null);

  function handleLetter(letter) {
    setPendingLetter(letter);
  }

  function handleNumber(num) {
    if (!pendingLetter) return; // ignore until letter chosen
    const code = `${pendingLetter}${num}`;
    setPendingLetter(null);
    onCodeSelect(code);
  }

  const statusLabel = pendingLetter
    ? `Selected ${pendingLetter}. Choose a number to complete the code.`
    : "Choose a letter, then a number.";

  return (
    <div className="vm-keypad" aria-label="Keypad navigation">
      <p className="visually-hidden">{statusLabel}</p>

      <div className="vm-keypad-row">
        {LETTERS.map((letter) => (
          <button
            key={letter}
            type="button"
            className={
              "vm-key vm-key--letter" +
              (pendingLetter === letter ? " vm-key--active" : "")
            }
            onClick={() => handleLetter(letter)}
            aria-pressed={pendingLetter === letter}
            aria-label={`Select code starting with ${letter}`}
          >
            {letter}
          </button>
        ))}
      </div>

      <div className="vm-keypad-row">
        {NUMBERS.map((num) => (
          <button
            key={num}
            type="button"
            className="vm-key vm-key--number"
            onClick={() => handleNumber(num)}
            aria-label={
              pendingLetter
                ? `Complete code ${pendingLetter}${num}`
                : `Number ${num}. Choose a letter first.`
            }
          >
            {num}
          </button>
        ))}
      </div>

      {lastCode && (
        <p className="vm-keypad-last-code" aria-live="polite">
          Last selection: {lastCode}
        </p>
      )}
    </div>
  );
}
