"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type Counts = Record<string, number>;

// 클릭 수는 늘어나기만 하므로, 응답 순서가 뒤바뀌어도 더 큰 값을 남기면 됩니다.
function mergeCounts(prev: Counts, next: Counts): Counts {
  const merged = { ...prev };
  for (const [id, count] of Object.entries(next)) {
    merged[id] = Math.max(merged[id] ?? 0, count);
  }
  return merged;
}

export default function LinkList({ links }: { links: LinkItem[] }) {
  const [counts, setCounts] = useState<Counts>({});

  useEffect(() => {
    fetch("/api/clicks", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : {}))
      .then((data: Counts) => setCounts((prev) => mergeCounts(prev, data)))
      .catch(() => {});
  }, []);

  const handleClick = (linkId: string) => {
    // 응답을 기다리지 않고 바로 1 올려 보여줍니다.
    setCounts((prev) => ({ ...prev, [linkId]: (prev[linkId] ?? 0) + 1 }));

    // 새 탭으로 이동해도 요청이 끊기지 않도록 keepalive를 사용합니다.
    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ linkId }),
      keepalive: true,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { count: number | null } | null) => {
        if (typeof data?.count === "number") {
          setCounts((prev) => mergeCounts(prev, { [linkId]: data.count as number }));
        }
      })
      .catch(() => {});
  };

  return (
    <nav className="mt-10 flex flex-col gap-6">
      {links.map((link) => (
        <LinkCard
          key={link.id}
          link={link}
          count={counts[link.id] ?? 0}
          onClick={() => handleClick(link.id)}
        />
      ))}
    </nav>
  );
}
