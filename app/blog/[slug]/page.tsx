import { client } from "@/sanity/lib/client";
import { Post } from "@/sanity/lib/types/post";
import Link from "next/link";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { notFound } from "next/navigation";
import { formatMMYY } from "@/lib/utils";
import { PortableText } from "@portabletext/react";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

const builder = imageUrlBuilder(client);

interface Props {
  params: { slug: string } | Promise<{ slug: string }>;
}

async function getPost(slug: string): Promise<Post | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    description,
    body
  }`;
  return await client.fetch(query, { slug });
}

export default async function PostDetailPage({ params }: Props) {
  const { slug } = await Promise.resolve(params);
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const mainImageUrl = post.mainImage
    ? builder.image(post.mainImage).width(1200).height(600).url()
    : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4 max-w-3xl mx-auto w-full pt-24">
        <Link
          href="/blog"
          className="inline-block mb-8 px-4 py-2 bg-white text-black font-black text-sm uppercase border-2 border-black shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all dark:bg-black dark:text-white dark:border-white"
        >
          ← BACK TO ARCHIVE
        </Link>

        <article className="flex flex-col gap-8">
          <header className="border-b-4 border-black dark:border-white pb-6 flex flex-col gap-4">
            <div className="w-fit bg-primary px-3 py-1 border-2 border-black font-bold text-sm uppercase text-black">
              Published: {post.publishedAt ? formatMMYY(post.publishedAt) : "UNKNOWN"}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none text-black dark:text-white">
              {post.title}
            </h1>
          </header>

          {mainImageUrl && (
            <div className="border-4 border-black dark:border-white p-2 bg-white dark:bg-black shadow-brutal-lg">
              <div className="relative w-full aspect-video border-2 border-black">
                <Image
                  src={mainImageUrl}
                  alt={post.title || "Blog post"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          {post.description && (
            <div className="border-4 border-black dark:border-white bg-accent/20 p-6 shadow-brutal font-bold text-base md:text-lg border-l-[12px] text-black dark:text-white">
              <span className="bg-accent text-black px-2 py-0.5 border border-black text-xs uppercase inline-block mb-2">TL;DR</span>
              <p>{post.description}</p>
            </div>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none font-medium leading-relaxed text-black dark:text-white pt-4
            prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
            prose-h2:border-b-4 prose-h2:border-black dark:prose-h2:border-white prose-h2:pb-2
            prose-strong:font-black prose-a:text-primary prose-a:underline font-sans">
            {post?.body ? <PortableText value={post.body} /> : null}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
