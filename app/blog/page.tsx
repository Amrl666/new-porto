import { client } from "@/sanity/lib/client";
import { Post } from "@/sanity/lib/types/post";
import Link from "next/link";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { formatMMYY } from "@/lib/utils";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

const builder = imageUrlBuilder(client);

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => {
              const imageUrl = post.mainImage
                ? builder.image(post.mainImage).width(600).height(400).url()
                : "/file.svg";

              return (
                <article 
                  key={post._id}
                  className="bg-white dark:bg-black border-4 border-black dark:border-white rounded-none shadow-brutal-lg dark:shadow-brutal-dark flex flex-col h-full transition-all hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] group"
                >
                  <div className="relative w-full aspect-[16/9] border-b-4 border-black dark:border-white overflow-hidden bg-accent">
                    <Image
                      src={imageUrl}
                      alt={post.title || "Blog post"}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-primary px-3 py-1 border-2 border-black font-bold text-xs uppercase text-black">
                      {post.publishedAt ? formatMMYY(post.publishedAt) : "RECENT"}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow gap-3">
                    <h2 className="text-2xl font-black uppercase tracking-tight leading-tight text-black dark:text-white">
                      <Link href={`/blog/${post.slug.current}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-sm font-medium text-black/80 dark:text-white/80 line-clamp-3 leading-relaxed flex-grow">
                      {post.description || "Click details to read the full comprehensive breakdown of this topic."}
                    </p>
                    
                    <div className="pt-4 mt-auto">
                      <Link
                        href={`/blog/${post.slug.current}`}
                        className="inline-block w-full text-center py-2 bg-accent text-black font-black text-sm uppercase border-2 border-black shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                      >
                        READ ARTICLE →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
