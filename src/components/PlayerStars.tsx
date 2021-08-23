import { PlayerStars as PlayerStarData } from "../models/player";

function SingleStar(props: { className?: string }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      version="1.2"
      baseProfile="tiny"
      viewBox="0 0 24 24"
      className={props.className}
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.362 9.158l-5.268.584c-.19.023-.358.15-.421.343s0 .394.14.521c1.566 1.429 3.919 3.569 3.919 3.569-.002 0-.646 3.113-1.074 5.19-.036.188.032.387.196.506.163.119.373.121.538.028 1.844-1.048 4.606-2.624 4.606-2.624l4.604 2.625c.168.092.378.09.541-.029.164-.119.232-.318.195-.505l-1.071-5.191 3.919-3.566c.14-.131.202-.332.14-.524s-.23-.319-.42-.341c-2.108-.236-5.269-.586-5.269-.586l-2.183-4.83c-.082-.173-.254-.294-.456-.294s-.375.122-.453.294l-2.183 4.83z"></path>
    </svg>
  );
}

function EvoStar() {
  return <SingleStar className="Player-Stars-Gilded" />;
}

function RedLine() {
  return <div className="Player-Stars-Red-Line" />;
}

function FractionalStar(props: {
  className?: string;
  width: number;
  includeRedLine?: boolean;
  position?: "absolute";
}) {
  return (
    <div
      className="Player-Stars-Fractional-Wrapper"
      style={{
        width: getStarWidth(props.width) + "px",
        position: props.position,
      }}
    >
      <SingleStar className={props.className} />
      {props.includeRedLine && <RedLine />}
    </div>
  );
}

function FullRedStar() {
  return (
    <div className="Player-Stars-Temp-Wrapper">
      <SingleStar className="Player-Stars-Temp-Red" />
      <RedLine />
    </div>
  );
}

function SplitStar(props: {
  base: number;
  temp: number;
  type: string;
  includeRedLine?: boolean;
}) {
  return (
    <div className="Player-Stars-Temp-Wrapper">
      <FractionalStar
        width={props.temp}
        position="absolute"
        className={`Player-Stars-Temp-${props.type}`}
      />
      {props.includeRedLine && <RedLine />}
      <FractionalStar
        width={props.base}
        position="absolute"
        className="Player-Stars-Temp-White"
      />
    </div>
  );
}

function getStarWidth(frac: number) {
  return 18 * Math.max(frac, 0.31);
}

function StarLabel(props: { stars: PlayerStarData }) {
  let extra = null;
  if (props.stars.item > 0) {
    extra = (
      <>
        &nbsp;+&nbsp;
        <span className="Player-Stars-Blue">{props.stars.item.toFixed(1)}</span>
      </>
    );
  } else if (props.stars.item < 0) {
    extra = (
      <>
        &nbsp;-&nbsp;
        <span className="Player-Stars-Red">
          {(-props.stars.item).toFixed(1)}
        </span>
      </>
    );
  }

  return (
    <span className="Player-Stars-Num">
      ({props.stars.base.toFixed(1)}
      {extra})
    </span>
  );
}

export default function PlayerStars(props: {
  stars: PlayerStarData;
  label: boolean;
}) {
  const base = props.stars.base + Math.min(props.stars.item, 0);
  const temp = Math.abs(props.stars.item);
  const total = base + temp;
  const type = props.stars.item > 0 ? "Blue" : "Red";

  const starCount = Math.ceil(total);

  const baseFrac = base - Math.floor(base);
  const tempFrac = Math.min(total - Math.floor(base), 1);

  const stars = [];

  for (let i = 0; i < starCount; i++) {
    if (i < props.stars.evolution) {
      // This is a single evo star
      stars.push(<EvoStar key={i} />);
    } else if (i <= base - 1) {
      // This is a single white star
      stars.push(<SingleStar key={i} />);
    } else if (i == Math.floor(base) && baseFrac > 0 && tempFrac > 0) {
      // This is a "split" star, white on the left, blue/red on the right
      // may or may not be the full width
      stars.push(
        <SplitStar
          base={baseFrac}
          temp={tempFrac}
          type={type}
          key={i}
          includeRedLine={type === "Red"}
        />
      );
    } else if (i == Math.floor(total)) {
      // This is a "remainder" star, of any type
      const remainder = total - Math.floor(total);
      let cn = "Player-Stars-Fractional";
      if (temp > 0) cn += ` Player-Stars-Temp-${type}`;
      stars.push(
        <FractionalStar
          includeRedLine={type === "Red"}
          width={remainder}
          className={cn}
          key={i}
        />
      );
    } else {
      // This is a blue/red full star
      stars.push(
        type === "Red" ? (
          <FullRedStar key={i} />
        ) : (
          <SingleStar className={`Player-Stars-${type}`} key={i} />
        )
      );
    }
  }

  return (
    <span style={{ display: "flex" }}>
      {stars}
      {props.label ? <StarLabel stars={props.stars} /> : null}
    </span>
  );
}
