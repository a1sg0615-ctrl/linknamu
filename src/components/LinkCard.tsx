"use client";

import type { LinkItem } from "@/data/profile";

export default function LinkCard({ link }: { link: LinkItem }) {
  const handleClick = () => {
    // 새 탭으로 이동해도 요청이 끊기지 않도록 keepalive를 사용합니다.
    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ linkId: link.id }),
      keepalive: true,
    }).catch(() => {});
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-gray-800 px-5 py-4 transition hover:-translate-y-0.5 hover:bg-gray-100 active:translate-y-0 dark:border-gray-200 dark:hover:bg-gray-800"
    >
      <span className="text-2xl" aria-hidden="true">
        {link.icon}
      </span>
      <span className="font-medium">{link.title}</span>
    </a>
  );
}
