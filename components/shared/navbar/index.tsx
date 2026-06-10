"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import useSWR from "swr";
import { getUserInfo } from "@/sanity/lib/queries";
import { fetcher } from "@/sanity/lib/client";
import { UserInfo } from "@/sanity/lib/types/userInfo";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: userInfo } = useSWR<UserInfo>(getUserInfo, fetcher);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Stack", path: "/stack" },
    { name: "Guestbook", path: "/guestbook" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-black bg-white dark:bg-black dark:border-white transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-2xl font-black uppercase tracking-tighter hover:-translate-y-1 transition-transform bg-primary px-3 py-1 border-2 border-black shadow-brutal dark:border-white dark:shadow-brutal-dark"
        >
          AMRL.
        </Link>

        <nav className="hidden md:flex items-center gap-4">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "px-4 py-2 font-bold text-sm uppercase border-2 border-transparent transition-all",
                  isActive 
                    ? "bg-accent border-black shadow-brutal dark:border-white dark:shadow-brutal-dark dark:text-black" 
                    : "hover:border-black hover:shadow-brutal hover:-translate-y-1 dark:hover:border-white dark:hover:shadow-brutal-dark"
                )}
              >
                {item.name}
              </Link>
            );
          })}

          {userInfo?.githubUrl && (
            <Link href={userInfo.githubUrl} target="_blank" className="font-bold text-xs uppercase border-2 border-black px-2 py-1 shadow-brutal hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all dark:border-white dark:shadow-brutal-dark">
              GH
            </Link>
          )}

          {userInfo?.linkedInUrl && (
            <Link href={userInfo.linkedInUrl} target="_blank" className="font-bold text-xs uppercase border-2 border-black px-2 py-1 shadow-brutal hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all dark:border-white dark:shadow-brutal-dark">
              IN
            </Link>
          )}

          <div className="ml-4 border-l-4 border-black dark:border-white pl-4">
            <ThemeToggle />
          </div>
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Button 
            variant="outline" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="font-black text-xl">{mobileOpen ? "✕" : "≡"}</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t-4 border-black dark:border-white bg-white dark:bg-black">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-4 py-3 font-bold text-sm uppercase border-2 transition-all",
                    isActive 
                      ? "bg-accent border-black shadow-brutal dark:border-white dark:shadow-brutal-dark dark:text-black" 
                      : "border-transparent hover:border-black hover:shadow-brutal dark:hover:border-white dark:hover:shadow-brutal-dark"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="flex gap-2 pt-2 border-t-2 border-black dark:border-white mt-2">
              {userInfo?.githubUrl && (
                <Link href={userInfo.githubUrl} target="_blank" className="font-bold text-xs uppercase border-2 border-black px-3 py-2 shadow-brutal hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all dark:border-white dark:shadow-brutal-dark">
                  GitHub
                </Link>
              )}
              {userInfo?.linkedInUrl && (
                <Link href={userInfo.linkedInUrl} target="_blank" className="font-bold text-xs uppercase border-2 border-black px-3 py-2 shadow-brutal hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all dark:border-white dark:shadow-brutal-dark">
                  LinkedIn
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
