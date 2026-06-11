'use client';

import { useOptimistic, useRef, useState, useTransition, useEffect, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { addMessage, deleteMessage } from '@/app/actions';
import { Button } from '@/components/ui/button';

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
    <div className="max-w-2xl mx-auto px-4 py-12 flex flex-col gap-12">
      {/* Form Section */}
      <motion.div 
        className="border-4 border-black dark:border-white p-6 bg-white dark:bg-black shadow-brutal-lg"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-black uppercase mb-4 text-black dark:text-white">Sign the Guestbook</h3>
        
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-black uppercase text-black dark:text-white">Your Name</label>
            <input 
              ref={inputRef}
              name="name"
              type="text"
              placeholder="e.g. anonymous dev"
              maxLength={50}
              required
              disabled={isPending}
              className="w-full bg-white text-black font-bold p-3 border-4 border-black focus:outline-none focus:bg-primary/10 rounded-none placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-black uppercase text-black dark:text-white">Message</label>
            <textarea 
              name="message"
              rows={3}
              maxLength={140}
              required
              disabled={isPending}
              onChange={(e) => setMessageLength(e.target.value.length)}
              placeholder="Leave a public architectural feedback or just say hello..."
              className="w-full bg-white text-black font-bold p-3 border-4 border-black focus:outline-none focus:bg-primary/10 rounded-none placeholder:text-gray-400"
            />
            <div className="text-right text-xs font-bold text-gray-500">
              {messageLength}/140
            </div>
          </div>

          <Button type="submit" size="lg" disabled={isPending} className="bg-primary text-black font-black uppercase w-full">
            {isPending ? 'SENDING...' : 'SUBMIT SIGNATURE →'}
          </Button>
        </form>

        {/* Admin Mode */}
        <div className="mt-4 pt-4 border-t-2 border-black dark:border-white">
          <button
            onClick={() => setShowAdminInput(!showAdminInput)}
            className="text-xs font-bold uppercase underline text-black dark:text-white"
          >
            {showAdminInput ? 'Hide Admin' : 'Admin Mode'}
          </button>
          {showAdminInput && (
            <input
              type="password"
              placeholder="Enter admin key..."
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              className="w-full bg-white text-black font-bold p-2 border-2 border-black mt-2 focus:outline-none rounded-none placeholder:text-gray-400 text-sm"
            />
          )}
        </div>
      </motion.div>

      {/* Message Feed List */}
      <motion.div 
        className="flex flex-col gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.3 }}
      >
        <h4 className="text-xl font-black uppercase border-b-4 border-black dark:border-white pb-2 w-fit text-black dark:text-white">
          Recent Signatures ({optimisticMessages.length})
        </h4>

        {optimisticMessages.length === 0 ? (
          <div className="border-4 border-dashed border-black dark:border-white p-12 text-center">
            <p className="text-lg font-black uppercase text-black dark:text-white">No messages yet</p>
            <p className="text-sm font-bold text-black/60 dark:text-white/60 mt-2">Be the first to say something nice!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {optimisticMessages.map((msg, idx) => {
              const prevMsg = idx > 0 ? optimisticMessages[idx - 1] : null;
              const showDate = !prevMsg || formatDate(msg.createdAt) !== formatDate(prevMsg.createdAt);

              return (
                <div key={msg._id || `temp-${idx}`}>
                  {showDate && (
                    <div className="text-xs font-bold text-gray-500 uppercase mb-2 mt-4 bg-primary/20 border-2 border-black dark:border-white px-3 py-1 w-fit">
                      {formatDate(msg.createdAt)}
                    </div>
                  )}
                  <motion.div 
                    className="border-4 border-black dark:border-white p-4 bg-white dark:bg-black shadow-brutal flex flex-col gap-1 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <div className="flex justify-between items-center border-b-2 border-black dark:border-white pb-1 mb-2">
                      <span className="font-black text-base uppercase text-white bg-black px-2 py-0.5 dark:bg-white dark:text-black">
                        {msg.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-500 uppercase">
                          {new Date(msg.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {adminKey && msg._id && (
                          <button
                            onClick={() => handleDelete(msg._id!)}
                            disabled={deletingId === msg._id}
                            className="text-xs font-black text-destructive border border-destructive px-1 hover:bg-destructive hover:text-white transition-colors"
                          >
                            X
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-black dark:text-white">
                      {msg.message}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
