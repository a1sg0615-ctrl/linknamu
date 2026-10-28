import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-gray-800 bg-gray-100 dark:border-gray-200 dark:bg-gray-800 sm:h-48 sm:w-48">
        {profile.image ? (
          <Image src={profile.image} alt={profile.name} fill className="object-cover" priority />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-4xl font-bold">
            {profile.name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <h1 className="mt-6 text-xl font-semibold">{profile.name}</h1>
      {profile.bio && <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{profile.bio}</p>}
    </header>
  );
}
