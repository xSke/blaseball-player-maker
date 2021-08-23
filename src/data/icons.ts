import dynamic from "next/dynamic";

const sources = {
  Ai: () => import("react-icons/ai"),
  Bs: () => import("react-icons/bs"),
  Bi: () => import("react-icons/bi"),
  Di: () => import("react-icons/di"),
  Fi: () => import("react-icons/fi"),
  Fc: () => import("react-icons/fc"),
  Fa: () => import("react-icons/fa"),
  Gi: () => import("react-icons/gi"),
  Go: () => import("react-icons/go"),
  Gr: () => import("react-icons/gr"),
  Hi: () => import("react-icons/hi"),
  Md: () => import("react-icons/md"),
  Ri: () => import("react-icons/ri"),
  Si: () => import("react-icons/si"),
  Ti: () => import("react-icons/ti"),
  Vsc: () => import("react-icons/vsc"),
  Wi: () => import("react-icons/wi"),
  Cg: () => import("react-icons/cg"),
};

import { IconType } from "react-icons";

export function getGameIcon(name: string): IconType {
  for (const sourceKey of Object.keys(sources)) {
    if (name.startsWith(sourceKey)) {
      const source = sources[sourceKey]();
      const icon = dynamic(() => source.then((icons) => (icons as any)[name]));
      return icon as IconType;
    }
  }
  return null;
}
