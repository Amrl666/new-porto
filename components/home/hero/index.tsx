"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { UserInfo } from "@/sanity/lib/types/userInfo";

interface Props {
  userInfo: UserInfo;
}

export default function Hero({ userInfo }: Props) {
  return (
    <section className="min-h-[85vh] flex flex-col justify-center items-center pt-10 pb-20 overflow-hidden">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Kiri: Teks Raksasa */}
        <div className="flex flex-col gap-6 order-2 lg:order-1 relative z-10">
          <motion.div 
            className="inline-block w-fit bg-secondary px-4 py-2 border-2 border-black shadow-brutal dark:border-white dark:shadow-brutal-dark"
            initial={{ opacity: 0, x: -40, rotate: -2 }}
            whileInView={{ opacity: 1, x: 0, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="font-bold text-sm md:text-base uppercase tracking-widest text-black">
              {userInfo?.title || "Hello World, I'm"}
            </p>
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            {userInfo?.name || "Amirul"} <br />
            <span className="text-primary">{userInfo?.surname || "Mabruri"}</span>
          </motion.h1>
          
          <motion.p 
            className="text-sm md:text-base font-medium max-w-lg border-l-4 border-black pl-4 dark:border-white bg-white/50 dark:bg-black/50 p-2"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            {userInfo?.summary || "A Fullstack Developer & IT Enthusiast."}
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button asChild size="lg" className="bg-primary text-black hover:bg-primary">
              <Link href="/projects">VIEW PROJECTS</Link>
            </Button>
            {userInfo?.cv?.url && (
              <Button asChild variant="outline" size="lg" className="bg-accent text-black hover:bg-accent border-black dark:border-white">
                <Link href={userInfo.cv.url} target="_blank">DOWNLOAD CV</Link>
              </Button>
            )}
          </motion.div>

          <motion.div 
            className="flex gap-4 mt-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {userInfo?.githubUrl && (
              <Link href={userInfo.githubUrl} target="_blank" className="font-bold uppercase text-sm border-2 border-black px-3 py-1 shadow-brutal hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all dark:border-white dark:shadow-brutal-dark">
                GitHub
              </Link>
            )}
            {userInfo?.linkedInUrl && (
              <Link href={userInfo.linkedInUrl} target="_blank" className="font-bold uppercase text-sm border-2 border-black px-3 py-1 shadow-brutal hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all dark:border-white dark:shadow-brutal-dark">
                LinkedIn
              </Link>
            )}
          </motion.div>
        </div>

        {/* Kanan: Foto/Ilustrasi Brutalist */}
        <motion.div 
          className="relative order-1 lg:order-2 flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-secondary translate-x-4 translate-y-4 border-4 border-black dark:border-white max-w-sm mx-auto aspect-square"></div>
          
          <div className="relative z-10 border-4 border-black dark:border-white bg-white overflow-hidden shadow-brutal-lg dark:shadow-brutal-dark transition-transform hover:-translate-y-2 hover:-translate-x-2">
            <Image
              src="/poto.webp"
              alt={`${userInfo?.name || "Amirul"} ${userInfo?.surname || "Mabruri"}`}
              width={384}
              height={384}
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500 w-full max-w-sm aspect-square"
              priority
            />
            <div className="absolute bottom-4 left-4 bg-primary px-3 py-1 border-2 border-black font-bold text-black text-sm uppercase -rotate-3 shadow-brutal">
              OPEN TO WORK
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
