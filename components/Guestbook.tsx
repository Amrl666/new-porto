'use client';

import { useOptimistic, useRef, useState, useTransition, useEffect, FormEvent } from 'react';
import { addMessage, deleteMessage } from '@/app/actions';

interface Message {
  _id?: string;
  name: string;
  message: string;
  createdAt: string;
}

interface GuestbookProps {
  initialMessages: Message[];
}

export function Guestbook({ initialMessages }: GuestbookProps) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<Message[], Message>(
    initialMessages,
    (state, newMessage) => [newMessage, ...state],
  );

  const [isPending, startTransition] = useTransition();
  const [messageLength, setMessageLength] = useState(0);
  const [adminKey, setAdminKey] = useState('');
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    if (hasSubmitted) {
      scrollToBottom();
    }
  }, [optimisticMessages, hasSubmitted]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const message = formData.get('message') as string;

    if (!name || !message) return;

    formRef.current?.reset();
    setMessageLength(0);
    inputRef.current?.focus();
    setHasSubmitted(true);

    startTransition(async () => {
      addOptimisticMessage({
        name,
        message,
        createdAt: new Date().toISOString(),
      });

      try {
        await addMessage(formData);
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    });
  }

  async function handleDelete(messageId: string) {
    if (!messageId || !adminKey) return;
    const confirmed = window.confirm('Are you sure you want to delete this message?');
    if (!confirmed) return;

    setDeletingId(messageId);
    try {
      await deleteMessage(messageId, adminKey);
    } catch {
      alert('Failed to delete message. Check your admin key.');
    } finally {
      setDeletingId(null);
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    if (isToday) return 'Today';
    return date.toLocaleDateString('id-ID', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="mx-auto flex max-w-[820px] flex-col gap-12">
      {/* Form Section */}
      <div className="border-2 border-ink bg-paper-bright">
        <h3 className="border-b-2 border-ink px-5 py-[11px] font-gothic text-[11px] font-bold uppercase tracking-[0.12em] text-ink">
          Sign the Guestbook
        </h3>

        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
          <div className="flex flex-col gap-1.5">
            <label className="mb-[7px] block font-gothic text-[11px] font-bold uppercase tracking-[0.12em] text-ink-soft">
              Your Name
            </label>
            <input
              ref={inputRef}
              name="name"
              type="text"
              placeholder="e.g. anonymous dev"
              maxLength={50}
              required
              disabled={isPending}
              className="w-full border-2 border-ink bg-paper px-3.5 py-3 font-text text-[16px] text-ink placeholder:text-ink-faint focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="mb-[7px] block font-gothic text-[11px] font-bold uppercase tracking-[0.12em] text-ink-soft">
              Message
            </label>
            <textarea
              name="message"
              rows={3}
              maxLength={140}
              required
              disabled={isPending}
              onChange={(e) => setMessageLength(e.target.value.length)}
              placeholder="Leave a public architectural feedback or just say hello..."
              className="w-full resize-y border-2 border-ink bg-paper px-3.5 py-3 font-text text-[16px] leading-[1.5] text-ink placeholder:text-ink-faint focus:outline-none"
            />
            <div className="text-right font-mono text-[11px] text-ink-soft">
              {messageLength}/140
            </div>
          </div>

          <div className="mt-[22px] flex flex-wrap items-center justify-between gap-4">
            <span className="font-gothic text-[11px] uppercase tracking-[0.06em] text-ink-soft">
              Usually replies never — it&rsquo;s a guestbook
            </span>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex cursor-pointer items-center gap-2.5 whitespace-nowrap border-2 border-ink bg-ink px-7 py-[15px] font-gothic text-[14px] font-bold uppercase tracking-[0.1em] text-paper transition-colors duration-150 hover:bg-transparent hover:text-ink disabled:opacity-60"
            >
              {isPending ? 'Signing…' : 'Sign the book →'}
            </button>
          </div>
        </form>

        {/* Admin Mode */}
        <div className="border-t-2 border-ink/25 px-5 py-4">
          <button
            onClick={() => setShowAdminInput(!showAdminInput)}
            className="font-gothic text-[11px] font-bold uppercase tracking-[0.1em] text-ink-soft underline"
          >
            {showAdminInput ? 'Hide Admin' : 'Admin Mode'}
          </button>
          {showAdminInput && (
            <input
              type="password"
              placeholder="Enter admin key..."
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              className="mt-2 w-full border-2 border-ink bg-paper px-3.5 py-2 font-text text-[14px] text-ink placeholder:text-ink-faint focus:outline-none"
            />
          )}
        </div>
      </div>

      {/* Message Feed List */}
      <div className="flex flex-col gap-6">
        <h4 className="w-fit border-b-2 border-ink pb-2 font-display text-[26px] font-normal text-ink">
          Recent Signatures ({optimisticMessages.length})
        </h4>

        {optimisticMessages.length === 0 ? (
          <div className="border-2 border-dashed border-ink p-12 text-center">
            <p className="font-display text-[28px] text-ink">No messages yet</p>
            <p className="mt-2 font-text text-[14px] text-ink-soft">
              Be the first to say something nice!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {optimisticMessages.map((msg, idx) => {
              const prevMsg = idx > 0 ? optimisticMessages[idx - 1] : null;
              const showDate = !prevMsg || formatDate(msg.createdAt) !== formatDate(prevMsg.createdAt);

              return (
                <div key={msg._id || `temp-${idx}`}>
                  {showDate && (
                    <div className="mb-2 mt-4 w-fit border-2 border-ink bg-paper-deep/75 px-3 py-1 font-gothic text-[10px] font-bold uppercase tracking-[0.14em] text-ink">
                      {formatDate(msg.createdAt)}
                    </div>
                  )}
                  <div className="flex flex-col gap-1 border-2 border-ink bg-paper-bright p-4 transition-colors hover:bg-paper-warm">
                    <div className="mb-2 flex items-center justify-between border-b-2 border-ink/25 pb-1">
                      <span className="font-gothic text-[11px] font-extrabold uppercase tracking-[0.12em] text-ink">
                        {msg.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] uppercase text-ink-soft">
                          {new Date(msg.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {adminKey && msg._id && (
                          <button
                            onClick={() => handleDelete(msg._id!)}
                            disabled={deletingId === msg._id}
                            className="border border-stamp px-1 font-gothic text-[11px] font-black text-stamp transition-colors hover:bg-stamp hover:text-paper"
                          >
                            X
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="font-text text-[15px] leading-[1.55] text-ink">
                      {msg.message}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
