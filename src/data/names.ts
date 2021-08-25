import data from "./names_data.json";

export function getRandomName(): string {
  const firstName =
    data.firstNames[Math.floor(Math.random() * data.firstNames.length)];
  const lastName =
    data.lastNames[Math.floor(Math.random() * data.lastNames.length)];
  return firstName + " " + lastName;
}

export function getRandomRitual(): string {
  return data.rituals[Math.floor(Math.random() * data.rituals.length)];
}
