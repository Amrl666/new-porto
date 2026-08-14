import { client } from "@/sanity/lib/client";
import { Post } from "@/sanity/lib/types/post";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import BlogGrid from "@/components/blog/blog-grid";

async function getPosts(): Promise<Post[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    description,
    body
  }`;
  return await client.fetch(query);
}

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Navbar />
      <main className="mx-auto w-full max-w-[1180px] flex-grow px-5 pb-[76px] sm:px-[30px]">
        <div className="mb-[30px] pt-[30px]">
          <div className="mb-[18px] flex items-center justify-between gap-4 border-b border-ink/25 pb-[9px] font-gothic text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
            <span>The Archive</span>
            <span>Filed under: Field Notes</span>
          </div>
          <span className="block font-gothic text-xs font-bold uppercase tracking-[0.18em] text-ink">
            Field Notes
          </span>
          <h1 className="mt-1.5 font-display text-[clamp(30px,4vw,46px)] font-normal leading-[1.02] tracking-[-0.015em]">
            The Archive
          </h1>
          <p className="mt-3 max-w-[42ch] font-text text-[15px] leading-[1.55] text-ink-soft">
            Writing about technical architectures, software engineering, data
            science and things learned along the way.
          </p>
          <div className="rv rv-rule mt-5 h-1 bg-ink" />
        </div>

        {posts.length === 0 ? (
          <div className="border-2 border-dashed border-ink p-12 text-center">
            <p className="font-display text-[28px]">No articles published yet.</p>
          </div>
        ) : (
          <BlogGrid posts={posts} />
        )}
      </main>
      <Footer />
    </div>
  );
}
