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
    <div className="flex min-h-screen flex-col bg-paper">
      <Navbar />

      <main className="mx-auto w-full max-w-[1180px] flex-grow px-5 pb-[76px] sm:px-[30px]">
        <div className="mb-[30px] pt-[30px]">
          <div className="mb-[18px] flex items-center justify-between gap-4 border-b border-ink/25 pb-[9px] font-gothic text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
            <span>The Guestbook</span>
            <span>Filed under: Correspondence</span>
          </div>
          <span className="block font-gothic text-xs font-bold uppercase tracking-[0.18em] text-ink">
            Correspondence
          </span>
          <h1 className="mt-1.5 font-display text-[clamp(30px,4vw,46px)] font-normal leading-[1.02] tracking-[-0.015em]">
            The Guestbook
          </h1>
          <p className="mt-3 max-w-[42ch] font-text text-[15px] leading-[1.55] text-ink-soft">
            Join the conversation — leave a message and say hello.
          </p>
          <div className="rv rv-rule mt-5 h-1 bg-ink" />
        </div>

        <Guestbook initialMessages={messages} />
      </main>

      <Footer />
    </div>
  );
}
