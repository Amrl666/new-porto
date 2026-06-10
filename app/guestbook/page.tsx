import { Metadata } from 'next';
import Navbar from '@/components/shared/navbar';
import Footer from '@/components/shared/footer';
import { Guestbook } from '@/components/Guestbook';
import { client } from '@/sanity/lib/client';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Amirul | Guestbook',
  description: 'Sign my guestbook and leave a message!',
};

interface Message {
  _id: string;
  name: string;
  message: string;
  createdAt: string;
}

async function getMessages(): Promise<Message[]> {
  try {
    const messages = await client.fetch(
      `*[_type == "chat"] | order(createdAt desc)[0...50] {
        _id,
        name,
        message,
        createdAt
      }`,
    );
    return messages || [];
  } catch {
    return [];
  }
}

export default async function GuestbookPage() {
  const messages = await getMessages();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 text-center md:text-left">
            <div className="inline-block bg-secondary px-6 py-3 border-4 border-black dark:border-white shadow-brutal-lg dark:shadow-brutal-dark rotate-1 mb-4">
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black">
                GUESTBOOK
              </h1>
            </div>
            <p className="text-lg md:text-xl font-bold border-l-4 border-black dark:border-white pl-4 max-w-xl mt-4">
              Join the conversation! Leave a message and say hello.
            </p>
          </div>

          <Guestbook initialMessages={messages} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
