function UpArrow() {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 10 16"
      className="Player-VibeLine-Arrow"
      role="img"
      aria-label="Green Up Arrow"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" d="M5 3L0 9h3v4h4V9h3L5 3z"></path>
    </svg>
  );
}

function DownArrow() {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 10 16"
      className="Player-VibeLine-Arrow"
      role="img"
      aria-label="Red Down Arrow"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" d="M7 7V3H3v4H0l5 6 5-6H7z"></path>
    </svg>
  );
}

function MehArrow() {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 20 16"
      className="Player-VibeLine-Arrow"
      role="img"
      aria-label="Gray Arrow Pointing Left and Right"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 8l6-5v3h8V3l6 5-6 5v-3H6v3L0 8z"></path>
    </svg>
  );
}

function getVibeClass(vibes: number) {
  if (vibes >= 3) return "ModalItem-Vibe-MostExcellent";
  if (vibes >= 2) return "ModalItem-Vibe-Excellent";
  if (vibes >= 1) return "ModalItem-Vibe-Quality";
  if (vibes >= 0) return "ModalItem-Vibe-Neutral";
  if (vibes >= -1) return "ModalItem-Vibe-LessThanIdeal";
  if (vibes >= -2) return "ModalItem-Vibe-FarLessThanIdeal";
  return "ModalItem-Vibe-Terrible";
}

export default function PlayerVibes(props: {
  enabled: boolean;
  arrows: number;
  label: string | null;
}) {
  const vibeArrows = [];
  if (props.enabled) {
    if (props.arrows > 0) {
      for (let i = 0; i < props.arrows; i++)
        vibeArrows.push(<UpArrow key={i} />);
    } else if (props.arrows < 0) {
      for (let i = 0; i < -props.arrows; i++)
        vibeArrows.push(<DownArrow key={i} />);
    } else {
      vibeArrows.push(<MehArrow key={0} />);
    }
  }
  return (
    <div className={`Player-VibeLine ${getVibeClass(props.arrows)}`}>
      {vibeArrows}
      {props.label && <div className="Player-VibeLine-Text">{props.label}</div>}
    </div>
  );
}
