import { DollarSign, House, Library, NotebookPen, Zap } from "lucide-react";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Editor",
  description: "Feito com Nextjs + HeroUI + TipTap + Localstorage",
  navItems: [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: House
    },
    {
      name: 'Artigos',
      href: '/dashboard/artigos',
      icon: Library
    },
    {
      name: 'Editor',
      href: '/dashboard/editor',
      icon: NotebookPen
    },  
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
