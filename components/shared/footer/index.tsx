import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t-8 border-black bg-white dark:bg-black dark:border-white mt-20">
      {/* Banner / Marquee Area */}
      <div className="w-full bg-primary border-b-4 border-black dark:border-white py-4 overflow-hidden flex whitespace-nowrap">
        <h2 className="text-4xl md:text-5xl font-black uppercase text-black tracking-widest animate-marquee">
          LET'S BUILD SOMETHING • LET'S BUILD SOMETHING • LET'S BUILD SOMETHING • 
        </h2>
      </div>

      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Kolom 1 */}
        <div className="flex flex-col gap-4">
          <div className="w-fit bg-black text-white dark:bg-white dark:text-black px-4 py-2 font-black text-2xl uppercase border-2 border-transparent">
            AMRL.
          </div>
        </div>

        {/* Kolom 2: Tautan */}
        <div className="flex flex-col gap-2 font-bold uppercase">
          <h3 className="text-xl font-black mb-2 border-b-2 border-black w-fit dark:border-white">Sitemap</h3>
          <Link href="/" className="hover:underline hover:text-primary w-fit">Home</Link>
          <Link href="/projects" className="hover:underline hover:text-primary w-fit">Projects</Link>
          <Link href="/blog" className="hover:underline hover:text-primary w-fit">Blog</Link>
          <Link href="/guestbook" className="hover:underline hover:text-primary w-fit">Guestbook</Link>
        </div>

        {/* Kolom 3: Sosial Media */}
        <div className="flex flex-col gap-2 font-bold uppercase">
          <h3 className="text-xl font-black mb-2 border-b-2 border-black w-fit dark:border-white">Socials</h3>
          <a href="https://github.com/Amrl666" target="_blank" rel="noreferrer" className="hover:bg-primary hover:pl-2 transition-all w-fit border border-transparent hover:border-black dark:hover:border-white dark:hover:text-black">GitHub</a>
          <a href="https://linkedin.com/in/amirul-mabruri-" target="_blank" rel="noreferrer" className="hover:bg-primary hover:pl-2 transition-all w-fit border border-transparent hover:border-black dark:hover:border-white dark:hover:text-black">LinkedIn</a>
          <a href="mailto:amirul.mabruri03@gmail.com" className="hover:bg-primary hover:pl-2 transition-all w-fit border border-transparent hover:border-black dark:hover:border-white dark:hover:text-black">Email</a>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t-4 border-black dark:border-white bg-accent dark:bg-black py-4">
        <div className="container mx-auto px-4 text-center font-bold text-sm uppercase text-black dark:text-white">
          © {currentYear} Amirul Mabruri.
        </div>
      </div>
    </footer>
  );
}
