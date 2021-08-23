export async function shortenUrl(url: string): Promise<string> {
  const resp = await fetch("https://tiny.sibr.dev/submit", {
    method: "POST",
    body: url,
  });

  const data = await resp.text();
  return data;
}
