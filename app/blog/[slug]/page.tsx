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
    ? builder.image(post.mainImage).width(1200).url()
    : null;

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Navbar />
      <main className="mx-auto w-full max-w-[1180px] flex-grow px-5 pb-[76px] sm:px-[30px]">
        <div className="mb-[30px] pt-[30px]">
          <div className="mb-[18px] flex items-center justify-between gap-4 border-b border-ink/25 pb-[9px] font-gothic text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
            <span>From the Archive</span>
            <span>
              {post.publishedAt ? formatMMYY(post.publishedAt) : "—"}
            </span>
          </div>

          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 border-b-[1.5px] border-ink pb-0.5 font-gothic text-xs font-bold uppercase tracking-[0.08em] text-ink"
          >
            <span className="transition-transform duration-150 group-hover:-translate-x-1">
              ←
            </span>{" "}
            Back to the archive
          </Link>

          <h1 className="mt-5 max-w-[20ch] font-display text-[clamp(36px,6vw,72px)] font-normal leading-[1.02] tracking-[-0.015em]">
            {post.title}
          </h1>
          <div className="rv rv-rule mt-5 h-1 bg-ink" />
        </div>

        <article className="flex flex-col gap-8">
          {mainImageUrl && (
            <div className="rv rv-develop">
              <div className="relative border border-ink/25 bg-paper-bright p-2 pb-0 shadow-[0_2px_14px_rgba(22,20,15,0.14)]">
                <span
                  aria-hidden="true"
                  className="absolute -top-2 left-1/2 z-[1] h-4 w-16 -translate-x-1/2 -rotate-2 border border-ink/10 bg-paper-deep/75"
                />
                <div className="relative aspect-video overflow-hidden border border-ink/40 bg-paper">
                  <Image
                    src={mainImageUrl}
                    alt={post.title || "Blog post"}
                    fill
                    priority
                    sizes="(max-width: 940px) 100vw, 1100px"
                    className="object-cover object-top grayscale contrast-[1.04] mix-blend-multiply"
                  />
                </div>
              </div>
            </div>
          )}

          {post.description && (
            <div className="rv rv-settle border-l-4 border-ink pl-[18px]">
              <p className="font-text text-[clamp(18px,2vw,23px)] italic leading-[1.45] text-ink-soft">
                {post.description}
              </p>
            </div>
          )}

          <div className="rv rv-settle mx-auto w-full max-w-[680px] font-text text-[17px] leading-[1.7] text-ink [hyphens:auto] [text-align:justify]">
            {post?.body ? (
              <div className="prose prose-neutral max-w-none [&_h1]:font-display [&_h2]:font-display [&_h3]:font-display [&_a]:text-stamp [&_a]:underline">
                <PortableText value={post.body} />
              </div>
            ) : null}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
