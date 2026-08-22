import { Post } from "@/sanity/lib/types/post";
import Link from "next/link";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { formatMMYY } from "@/lib/utils";

const builder = imageUrlBuilder(client);

interface Props {
  posts: Post[];
}

export default function BlogGrid({ posts }: Props) {
  return (
    <div className="grid grid-cols-1 gap-8 min-[600px]:grid-cols-2">
      {posts.map((post, idx) => {
        const imageUrl = post.mainImage
          ? builder.image(post.mainImage).width(600).url()
          : "/file.svg";

        return (
          <article
            key={post._id}
            className="group relative flex h-full flex-col border-2 border-ink bg-paper-bright transition-colors hover:bg-paper-warm"
          >
            <div className="relative h-[176px] overflow-hidden border-b-2 border-ink bg-paper">
              <Image
                src={imageUrl}
                alt={post.title || "Blog post"}
                fill
                sizes="(max-width: 600px) 100vw, 50vw"
                className="object-cover object-top grayscale contrast-[1.04] mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.03] dark:mix-blend-normal"
              />
              <span className="absolute left-2.5 top-2.5 border-2 border-ink bg-paper-bright/85 px-2 py-0.5 font-gothic text-[10px] font-black uppercase tracking-[0.14em] text-stamp">
                {post.publishedAt ? formatMMYY(post.publishedAt) : "Recent"}
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="font-gothic text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink">
                From the Archive
              </span>
              <h2 className="font-display text-[24px] font-normal leading-[1.1] tracking-[-0.01em] text-ink">
                <Link href={`/blog/${post.slug.current}`} className="link-pencil">
                  {post.title}
                </Link>
              </h2>
              <p className="line-clamp-3 flex-1 font-text text-[14px] leading-[1.55] text-ink-soft">
                {post.description ||
                  "Click through to read the full article from the archive."}
              </p>

              <div className="mt-auto flex items-center justify-between gap-3 border-t border-ink/25 pt-3.5">
                <span className="font-mono text-xs text-ink-soft">
                  {post.publishedAt ? formatMMYY(post.publishedAt) : "—"}
                </span>
                <Link
                  href={`/blog/${post.slug.current}`}
                  className="group/link inline-flex items-center gap-1.5 border-b-[1.5px] border-stamp pb-0.5 font-gothic text-xs font-bold uppercase tracking-[0.08em] text-stamp"
                >
                  Read the piece{" "}
                  <span className="transition-transform duration-150 group-hover/link:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
