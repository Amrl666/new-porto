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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-4 max-w-5xl mx-auto w-full pt-24">
        {/* Header Blog */}
        <div className="mb-16 text-center md:text-left">
          <div className="inline-block bg-secondary px-6 py-3 border-4 border-black dark:border-white shadow-brutal-lg dark:shadow-brutal-dark rotate-1 mb-4">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black">
              THE ARCHIVE
            </h1>
          </div>
          <p className="text-lg md:text-xl font-bold border-l-4 border-black dark:border-white pl-4 max-w-xl mt-4">
            Writing about technical architectures, software engineering, and things I learn along the way.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="border-4 border-dashed border-black dark:border-white p-12 text-center bg-white dark:bg-black">
            <p className="text-xl font-black uppercase">No articles published yet.</p>
          </div>
        ) : (
          <BlogGrid posts={posts} />
        )}
      </main>
      <Footer />
    </div>
  );
}
