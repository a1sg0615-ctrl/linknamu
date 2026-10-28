import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import ThemeToggle from "@/components/ThemeToggle";
import { links, profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <ThemeToggle />
      <div className="w-full max-w-md rounded-3xl border-2 border-gray-800 px-5 py-12 dark:border-gray-200 sm:px-8">
        <ProfileHeader profile={profile} />
        <nav className="mt-10 flex flex-col gap-6">
          {links.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </nav>
      </div>
    </main>
  );
}
