// Hover text roll: letters swap for an identical copy from below (Leo Marlowe reference).
// The readable label stays a single visually-hidden string; the animated letters are aria-hidden.
export function RollText({ children }) {
  const text = String(children);
  return (
    <span className="roll">
      <span className="roll__sr">{text}</span>
      <span aria-hidden="true">
        {[...text].map((char, i) => {
          const glyph = char === " " ? " " : char;
          return <span className="roll__char" key={`${char}-${i}`} style={{ "--i": i }}><span>{glyph}</span><span>{glyph}</span></span>;
        })}
      </span>
    </span>
  );
}
