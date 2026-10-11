/**
 * A sentence that lights up word by word as it scrolls through the middle of
 * the screen, each word fading from dim to full in turn. Plain text to screen
 * readers, and fully lit where scroll timelines or motion are off (globals.css).
 */
export function LitText({
  text,
  as: Tag = "p",
  className = "",
}: {
  text: string;
  as?: "p" | "h2";
  className?: string;
}) {
  const words = text.split(" ");
  // Spread the words across the middle stretch of the block's pass through the screen.
  const span = 34 / words.length;

  return (
    <Tag className={`lit ${className}`}>
      {words.map((word, index) => (
        <span
          key={index}
          className="lit-word"
          style={
            {
              "--s": `${22 + index * span}%`,
              "--e": `${22 + (index + 1.6) * span}%`,
            } as React.CSSProperties
          }
        >
          {word}{" "}
        </span>
      ))}
    </Tag>
  );
}
