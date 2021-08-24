import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { lookupUrl } from "../api/tiny";

function decodePayload(payload: string): string {
  const encoded = decodeURIComponent(payload);
  const buf = Buffer.from(
    encoded.replace(/_/g, "/").replace(/-/g, "+"),
    "base64"
  );
  return buf.toString("utf-8");
}

async function extractCodePayload(
  prefix: string,
  code: string
): Promise<string | null> {
  const url = await lookupUrl(code);
  if (url && url.startsWith(prefix)) {
    return decodePayload(url.substr(prefix.length));
  }
  return null;
}

export function useUrlCode(prefix: string): string | null | undefined {
  const router = useRouter();
  const [data, setData] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    if (router.isReady) {
      const inner = async () => {
        const codeStr = router.query.code as string;
        const dataStr = router.query.data as string;

        if (codeStr) {
          const data = await extractCodePayload(prefix, codeStr);
          if (data) {
            setData(data);
            return;
          }
        } else if (dataStr) {
          const data = decodePayload(dataStr);
          if (data) {
            setData(data);
            return;
          }
        }

        setData(null);
        return null;
      };
      inner();
    }
  }, [router.query.code, router.query.data, router.isReady]);

  return data;
}
