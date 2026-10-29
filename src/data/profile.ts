export type LinkItem = {
  id: string;
  title: string;
  url: string;
  icon: string;
};

export type Profile = {
  name: string;
  bio?: string;
  image?: string;
};

// 보여주기용 더미 값입니다. 실제 내용으로 교체하세요.
export const profile: Profile = {
  name: "J",
  // public/ 폴더에 사진을 넣고 경로를 바꾸세요. 예: "/profile.jpg"
  image: "/profile-placeholder.svg",
};

export const links: LinkItem[] = [
  { id: "github", title: "GitHub", url: "https://github.com", icon: "💻" },
  { id: "linkedin", title: "LinkedIn", url: "https://www.fotmob.com/", icon: "⚽" },
  { id: "blog", title: "Blog", url: "https://velog.io", icon: "✍️" },
];
