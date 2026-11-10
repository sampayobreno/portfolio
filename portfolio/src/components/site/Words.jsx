// Splits heading lines into word spans so [data-reveal="words"] can stagger them in.
// Pure markup: the text stays one readable string for assistive tech and no-JS.
export function Words({ lines, start = 0 }) {
  let index = start;
  return lines.map((line, lineIndex) => (
    <span key={`${line}-${lineIndex}`}>
      {lineIndex > 0 && <br />}
      {line.split(" ").map((word, wordIndex) => {
        const i = index++;
        return (
          <span key={`${word}-${wordIndex}`}>
            {wordIndex > 0 && " "}
            <span className="w" style={{ "--i": i }}>{word}</span>
          </span>
        );
      })}
    </span>
  ));
}
