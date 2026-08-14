"use client";

import { useState } from "react";
import { sendEmail } from "@/app/contact/action";

export default function Letters() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const values = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    setStatus("sending");
    try {
      await sendEmail(values);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 border-t-4 border-ink py-[76px]">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-[30px]">
        <div className="mb-[30px]">
          <div className="rv flex flex-wrap items-baseline justify-between gap-5 pb-2.5">
            <div>
              <span className="rv-fade font-gothic text-xs font-bold uppercase tracking-[0.18em] text-ink">
                Submit a Tip
              </span>
              <h2 className="mt-1.5 font-display text-[clamp(30px,4vw,46px)] font-normal leading-[1.02] tracking-[-0.015em]">
                <span className="rv-word" style={{ ["--i" as string]: 0 }}>
                  Letters
                </span>{" "}
                <span className="rv-word" style={{ ["--i" as string]: 1 }}>
                  &amp;
                </span>{" "}
                <span className="rv-word" style={{ ["--i" as string]: 2 }}>
                  Commissions
                </span>
              </h2>
            </div>
            <span className="rv-fade whitespace-nowrap font-gothic text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">
              The desk is open for select work — 2026
            </span>
          </div>
          <div className="rv rv-rule h-1 bg-ink" />
        </div>

        <div className="rv rv-settle grid grid-cols-1 border-2 border-ink min-[600px]:grid-cols-[1.15fr_0.85fr]">
          {/* Form */}
          <div className="border-b-2 border-ink p-6 min-[600px]:border-b-0 min-[600px]:border-r-2 min-[600px]:p-9">
            <h3 className="mb-1.5 font-display text-[32px] font-normal">
              Put it in writing
            </h3>
            <p className="mb-6 font-text text-[15px] leading-[1.55] text-ink-soft">
              A project in mind, a role to fill, or just a good question — send
              it through and he&rsquo;ll get back to you.
            </p>
            <form onSubmit={handleSubmit}>
              <input className="hidden" tabIndex={-1} autoComplete="off" name="company" />
              <div className="grid grid-cols-1 gap-4 min-[600px]:grid-cols-2">
                <div className="mb-4">
                  <label
                    className="mb-[7px] block font-gothic text-[11px] font-bold uppercase tracking-[0.12em] text-ink-soft"
                    htmlFor="contact-name"
                  >
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    className="w-full border-2 border-ink bg-paper-bright px-3.5 py-3 font-text text-[16px] text-ink placeholder:text-ink-faint focus:outline-none"
                    placeholder="Jane Doe"
                    required
                    name="name"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="mb-[7px] block font-gothic text-[11px] font-bold uppercase tracking-[0.12em] text-ink-soft"
                    htmlFor="contact-email"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    className="w-full border-2 border-ink bg-paper-bright px-3.5 py-3 font-text text-[16px] text-ink placeholder:text-ink-faint focus:outline-none"
                    type="email"
                    placeholder="jane@company.com"
                    required
                    name="email"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="mb-[7px] block font-gothic text-[11px] font-bold uppercase tracking-[0.12em] text-ink-soft"
                  htmlFor="contact-subject"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  className="w-full border-2 border-ink bg-paper-bright px-3.5 py-3 font-text text-[16px] text-ink placeholder:text-ink-faint focus:outline-none"
                  placeholder="A new product, a rebuild, a contract..."
                  name="subject"
                />
              </div>
              <div className="mb-4">
                <label
                  className="mb-[7px] block font-gothic text-[11px] font-bold uppercase tracking-[0.12em] text-ink-soft"
                  htmlFor="contact-message"
                >
                  The story
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="min-h-[120px] w-full resize-y border-2 border-ink bg-paper-bright px-3.5 py-3 font-text text-[16px] leading-[1.5] text-ink placeholder:text-ink-faint focus:outline-none"
                  placeholder="Tell him what you're building."
                  required
                />
              </div>
              <div className="mt-[22px] flex flex-wrap items-center justify-between gap-4">
                <span className="font-gothic text-[11px] uppercase tracking-[0.06em] text-ink-soft">
                  {status === "sent"
                    ? "Letter received — thank you!"
                    : status === "error"
                      ? "Dispatch failed — try again, or email directly."
                      : "Usually replies within 24 hours"}
                </span>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex cursor-pointer items-center gap-2.5 whitespace-nowrap border-2 border-ink bg-ink px-7 py-[15px] font-gothic text-[14px] font-bold uppercase tracking-[0.1em] text-paper transition-colors duration-150 hover:bg-transparent hover:text-ink disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send the letter"}
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col bg-paper-warm p-6 min-[600px]:p-8">
            <div className="border-b border-ink/25 py-4 pt-0 last:border-b-0">
              <p className="mb-[5px] font-gothic text-[11px] font-bold uppercase tracking-[0.12em] text-ink-soft">
                Direct line
              </p>
              <p className="font-display text-[21px] leading-[1.2] [overflow-wrap:anywhere]">
                <a className="link-pencil" href="mailto:amirul.mabruri03@gmail.com">
                  amirul.mabruri03@gmail.com
                </a>
              </p>
              <p className="mt-1 font-text text-[14px] text-ink-soft">
                For commissions, contracts, and the occasional good argument about CSS.
              </p>
            </div>

            <div className="border-b border-ink/25 py-4 last:border-b-0">
              <p className="mb-[5px] font-gothic text-[11px] font-bold uppercase tracking-[0.12em] text-ink-soft">
                The Desk
              </p>
              <p className="font-display text-[21px] leading-[1.2] [overflow-wrap:anywhere]">
                Jakarta, Indonesia
              </p>
              <p className="mt-1 font-text text-[14px] text-ink-soft">
                WIB — working with teams worldwide, remote-first.
              </p>
            </div>

            <div className="border-b border-ink/25 py-4 last:border-b-0">
              <p className="mb-[5px] font-gothic text-[11px] font-bold uppercase tracking-[0.12em] text-ink-soft">
                Availability
              </p>
              <p className="font-display text-[21px] leading-[1.2] [overflow-wrap:anywhere]">
                Freelance &amp; contract
              </p>
              <p className="mt-1 font-text text-[14px] text-ink-soft">
                Working full-time, so he takes on select freelance / contract
                projects — and side explorations into data, ML &amp; beyond.
              </p>
            </div>

            <div className="mt-auto flex gap-2.5 pt-[22px]">
              <a
                className="flex h-[42px] w-[42px] items-center justify-center border-2 border-ink text-ink transition-colors hover:bg-ink hover:text-paper"
                href="https://github.com/Amrl666"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <GithubIcon />
              </a>
              <a
                className="flex h-[42px] w-[42px] items-center justify-center border-2 border-ink text-ink transition-colors hover:bg-ink hover:text-paper"
                href="https://www.linkedin.com/in/amirul-mabruri-/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedinIcon />
              </a>
              <a
                className="flex h-[42px] w-[42px] items-center justify-center border-2 border-ink text-ink transition-colors hover:bg-ink hover:text-paper"
                href="mailto:amirul.mabruri03@gmail.com"
                aria-label="Email"
              >
                <MailIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GithubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      viewBox="0 0 256 256"
      className="h-[19px] w-[19px]"
    >
      <path d="M212.62,75.17A63.7,63.7,0,0,0,206.39,26,12,12,0,0,0,196,20a63.71,63.71,0,0,0-50,24H126A63.71,63.71,0,0,0,76,20a12,12,0,0,0-10.39,6,63.7,63.7,0,0,0-6.23,49.17A61.5,61.5,0,0,0,52,104v8a60.1,60.1,0,0,0,45.76,58.28A43.66,43.66,0,0,0,92,192v4H76a20,20,0,0,1-20-20,44.05,44.05,0,0,0-44-44,12,12,0,0,0,0,24,20,20,0,0,1,20,20,44.05,44.05,0,0,0,44,44H92v12a12,12,0,0,0,24,0V192a20,20,0,0,1,40,0v40a12,12,0,0,0,24,0V192a43.66,43.66,0,0,0-5.76-21.72A60.1,60.1,0,0,0,220,112v-8A61.5,61.5,0,0,0,212.62,75.17ZM196,112a36,36,0,0,1-36,36H112a36,36,0,0,1-36-36v-8a37.87,37.87,0,0,1,6.13-20.12,11.65,11.65,0,0,0,1.58-11.49,39.9,39.9,0,0,1-.4-27.72,39.87,39.87,0,0,1,26.41,17.8A12,12,0,0,0,119.82,68h32.35a12,12,0,0,0,10.11-5.53,39.84,39.84,0,0,1,26.41-17.8,39.9,39.9,0,0,1-.4,27.72,12,12,0,0,0,1.61,11.53A37.85,37.85,0,0,1,196,104Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      viewBox="0 0 256 256"
      className="h-[19px] w-[19px]"
    >
      <path d="M216,20H40A20,20,0,0,0,20,40V216a20,20,0,0,0,20,20H216a20,20,0,0,0,20-20V40A20,20,0,0,0,216,20Zm-4,192H44V44H212ZM112,176V120a12,12,0,0,1,21.43-7.41A40,40,0,0,1,192,148v28a12,12,0,0,1-24,0V148a16,16,0,0,0-32,0v28a12,12,0,0,1-24,0ZM96,120v56a12,12,0,0,1-24,0V120a12,12,0,0,1,24,0ZM68,80A16,16,0,1,1,84,96,16,16,0,0,1,68,80Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      viewBox="0 0 256 256"
      className="h-[19px] w-[19px]"
    >
      <path d="M224,44H32A12,12,0,0,0,20,56V192a20,20,0,0,0,20,20H216a20,20,0,0,0,20-20V56A12,12,0,0,0,224,44ZM193.15,68,128,127.72,62.85,68ZM44,188V83.28l75.89,69.57a12,12,0,0,0,16.22,0L212,83.28V188Z" />
    </svg>
  );
}
