import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { IconType } from "react-icons";
import { getGameIcon } from "../data/icons";
import { Modification as ModModel } from "../models/mod";

export type ModType = "game" | "week" | "season" | "permanent" | "item";

const modTypes = {
  game: {
    color: "#639e47",
    name: "Game",
    text: "Game Modifications are removed at the end of every game.",
  },
  week: {
    color: "#0a78a3",
    name: "Weekly",
    text: "Weekly Modifications are removed after every 9th game of the season.",
  },
  season: {
    color: "#c2157a",
    name: "Season",
    text: "Season Modifications are removed after the Internet Series finishes.",
  },
  permanent: {
    color: "#dbbc0b",
    name: "Permanent",
    text: "Permanent Modifications are never removed automatically.",
  },
  item: {
    color: "#bababa",
    name: "Item",
    text: "Item Modifications are removed when the Item is lost or broken.",
  },
};

interface ModProps {
  mod: ModModel;
}

export default function Modification(props: ModProps) {
  const modType = modTypes[props.mod.type];

  const IconComponent = getGameIcon(props.mod.icon);

  return (
    <OverlayTrigger
      placement="bottom-start"
      overlay={
        <Tooltip
          id={`mod-${props.mod.icon}`}
          className="theme-dark AttributeTooltip"
        >
          <div className="AttributeTooltip-Container">
            <div
              className="AttributeTooltip-Header"
              style={{ color: props.mod.foreground }}
            >
              {props.mod.name}
            </div>
            <div className="AttributeTooltip-Description">
              {props.mod.description}
            </div>

            <div className="AttributeTooltip-Divider" />
            <div
              className="AttributeTooltip-Header"
              style={{ color: modType.color }}
            >
              {modType.name}
            </div>
            <div className="AttributeTooltip-Description">{modType.text}</div>
          </div>
        </Tooltip>
      }
    >
      <div className="AttributeIcon">
        <div
          className="AttributeIcon"
          style={{
            color: props.mod.foreground,
            background: props.mod.background,
            border: `2px solid ${modType.color}`,
          }}
        >
          {IconComponent && <IconComponent />}
        </div>
      </div>
    </OverlayTrigger>
  );
}
