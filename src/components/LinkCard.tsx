import type { LinkItem } from "@/data/profile";

type LinkCardProps = {
  link: LinkItem;
  count: number;
  onClick: () => void;
};

export default function LinkCard({ link, count, onClick }: LinkCardProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="relative flex w-full items-center justify-center gap-3 rounded-xl border-2 border-gray-800 px-16 py-4 transition hover:-translate-y-0.5 hover:bg-gray-100 active:translate-y-0 dark:border-gray-200 dark:hover:bg-gray-800"
    >
      <span className="text-2xl" aria-hidden="true">
        {link.icon}
      </span>
      <span className="font-medium">{link.title}</span>
      <span className="absolute right-4 text-xs tabular-nums text-gray-500 dark:text-gray-400">
        {count.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
