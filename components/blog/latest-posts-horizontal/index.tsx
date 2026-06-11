"use client";
import React from "react";
import useSWR from "swr";
import { client, customFetcher } from "@/sanity/lib/client";
import { getOtherPosts } from "@/sanity/lib/queries";
import { Post } from "@/sanity/lib/types/post";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const builder = imageUrlBuilder(client);

interface Props {
  slug: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

function LatestPostsHorizontal({ slug }: Props) {
  const { data: posts } = useSWR<Post[]>(
    [getOtherPosts, { slug }],
    customFetcher
  );
  return (
    <>
      <motion.h2 
        className="text-foreground leading-snug text-4xl text-center underline mb-5 font-semibold mt-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Latest Posts
      </motion.h2>
      <motion.div 
        className="mt-10 flex flex-col max-w-4xl gap-5 justify-center mx-5 lg:mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {posts &&
          posts?.map((post) => (
            <motion.div
              key={post._id}
              variants={itemVariants}
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Card
                className="backdrop-blur-md bg-card h-[400px] sm:h-[200px] md:h-[150px]"
              >
              <CardContent className="grid grid-rows-2 gap-y-5 grid-cols-1 sm:grid-rows-1 sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_3fr]  h-full p-5">
                <div className="h-full w-full  flex items-center justify-center sm:border-r md:pr-4 border-border">
                  <Image
                    className="object-cover obect-center overflow-none max-w-full max-h-full rounded-md mx-auto"
                    src={builder
                      .image(post.mainImage)
                      .width(500)
                      .format("png")
                      .url()}
                    alt={post?.mainImage?.alt}
                    width={300}
                    height={300}
                  />
                </div>
                <div className="ml-4">
                  <Link href={`/blog/${post?.slug.current}`}>
                    <CardTitle className="text-foreground font-semibold text-lg leading-tight hover:underline hover:cursor">
                      {post.title}
                    </CardTitle>
                  </Link>
                  <CardDescription className="text-muted-foreground mt-1.5 text-sm leading-tight">
                    {post.description}
                  </CardDescription>
                  <Link
                    href={`/blog/${post?.slug.current}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "mt-4 md:mt-1.5"
                    )}
                  >
                    Read More
                  </Link>
                </div>
              </CardContent>
            </Card>
            </motion.div>
          ))}
      </motion.div>
    </>
  );
}

export default LatestPostsHorizontal;
