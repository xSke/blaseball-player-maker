export async function shortenUrl(url: string): Promise<string> {
  const resp = await fetch("https://tiny.sibr.dev/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: "url=" + encodeURIComponent(url),
  });

  const data = await resp.text();
  return data;
}

export async function lookupUrl(code: string): Promise<string | null> {
  const resp = await fetch("https://tiny.sibr.dev/lookup/" + code);
  if (resp.status !== 200) return null;
  return await resp.text();
}
