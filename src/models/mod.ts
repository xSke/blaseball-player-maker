export type ModType = "game" | "week" | "season" | "permanent" | "item";

export interface Modification {
  name: string;
  description: string;
  type: ModType;
  icon: string;
  background: string;
  foreground: string;
}
