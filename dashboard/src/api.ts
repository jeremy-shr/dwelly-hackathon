import { useEffect, useState } from "react";

export function usePoll<T>(url: string | null, ms = 2000): T | null {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    if (!url) {
      setData(null);
      return;
    }
    let alive = true;
    const tick = async () => {
      try {
        const r = await fetch(url);
        if (r.ok && alive) setData(await r.json());
      } catch {
        // API not up yet; keep last data
      }
    };
    tick();
    const id = setInterval(tick, ms);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [url, ms]);
  return data;
}

export const clean = (v: unknown) => String(v ?? "").replace(/[_-]+/g, " ").trim();
export const titleCase = (v: unknown) => clean(v).replace(/\b\w/g, (c) => c.toUpperCase());
