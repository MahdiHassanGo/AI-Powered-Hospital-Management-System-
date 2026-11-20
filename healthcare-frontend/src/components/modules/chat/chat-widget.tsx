"use client";

import {
  ArrowRight,
  MessageSquare,
  SendIcon,
  Stethoscope,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useSendChatMessage } from "@/hooks";
import type { ChatDoctor } from "@/types";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  doctors?: ChatDoctor[];
}

const SUGGESTIONS = [
  "I have persistent chest discomfort and shortness of breath",
  "I have an itchy red rash on my arm for two weeks",
  "Severe recurring migraines with vision sensitivity",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { mutate, isPending } = useSendChatMessage();

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener("open-healthcare-chat", handleOpenChat);
    return () =>
      window.removeEventListener("open-healthcare-chat", handleOpenChat);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll when a message or the pending state is added
  useEffect(() => {
    const scrollArea = scrollAreaRef.current;

    if (scrollArea && isOpen) {
      scrollArea.scrollTo({
        top: scrollArea.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isPending, isOpen]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setIsOpen(false);
      triggerRef.current?.focus();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const closeChat = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const sendMessage = (overrideText?: string) => {
    const content = (overrideText ?? input).trim();

    if (!content || isPending) return;

    setMessages((previous) => [
      ...previous,
      { id: crypto.randomUUID(), role: "user", content },
    ]);
    setInput("");

    mutate(
      { message: content, sessionId },
      {
        onSuccess: (response) => {
          setSessionId(response.data.sessionId);
          setMessages((previous) => [
            ...previous,
            {
              id: crypto.randomUUID(),
              role: "assistant",
              content: response.data.answer,
              doctors: response.data.doctors,
            },
          ]);
        },
        onError: () => {
          setInput((current) => current || content);
          toast.add({
            title: "Transmission failed",
            description:
              "Could not connect to hospital triage service. Please try again.",
            type: "error",
          });
        },
      },
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <>
      <Button
        ref={triggerRef}
        size="icon"
        className="fixed right-6 bottom-6 z-40 size-12 rounded-full border border-black bg-black text-white transition-colors hover:bg-white hover:text-black shadow-md"
        aria-label={
          isOpen ? "Close clinical triage" : "Open hospital clinical triage"
        }
        aria-expanded={isOpen}
        aria-controls="healthcare-chat-panel"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? (
          <XIcon className="size-5" />
        ) : (
          <MessageSquare className="size-5" />
        )}
      </Button>

      {isOpen && (
        <div
          id="healthcare-chat-panel"
          role="dialog"
          aria-label="Bangladesh Specialized Hospital Triage Assistant"
          className="fixed right-6 bottom-22 z-40 flex h-[min(34rem,calc(100dvh-7rem))] w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden border border-black bg-white text-xs text-black shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-black bg-black px-4 py-3 text-white">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex size-7 shrink-0 items-center justify-center border border-white/20 text-white font-mono text-[10px]">
                BSH
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold text-xs tracking-wider uppercase text-white">
                  Triage Assistant
                </p>
                <p className="truncate text-[10px] text-white/60">
                  Department &amp; specialist matching
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon-xs"
              className="text-white hover:bg-white/10"
              aria-label="Close triage"
              onClick={closeChat}
            >
              <XIcon className="size-4" />
            </Button>
          </div>

          {/* Conversation Body */}
          <div
            ref={scrollAreaRef}
            aria-live="polite"
            className="flex-1 space-y-3 overflow-y-auto bg-slate-50/60 p-3.5"
          >
            {messages.length === 0 && !isPending && (
              <div className="space-y-3">
                <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-xs">
                  <p className="leading-relaxed text-slate-700">
                    Welcome to <strong>Bangladesh Specialized Hospital</strong>{" "}
                    triage guidance. Describe your symptoms to find the
                    appropriate medical specialty and BMDC-verified consultants.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                    Suggested queries
                  </p>
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      className="w-full rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-left text-[11px] text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
                      onClick={() => sendMessage(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))}

            {isPending && (
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-3 text-slate-500 shadow-xs">
                <Spinner className="size-3.5" />
                <span>Checking hospital clinical directory…</span>
              </div>
            )}
          </div>

          {/* Input & Form */}
          <form
            className="border-t border-slate-200 bg-white p-2.5"
            onSubmit={handleSubmit}
          >
            <div className="flex items-end gap-1.5">
              <Textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Describe your symptoms (e.g. fever, headache)…"
                aria-label="Message"
                rows={1}
                className="max-h-24 min-h-8 resize-none py-1.5 text-xs"
              />
              <Button
                type="submit"
                size="icon-sm"
                className="size-8 shrink-0"
                disabled={!input.trim() || isPending}
                aria-label="Send query"
              >
                {isPending ? <Spinner /> : <SendIcon className="size-3.5" />}
              </Button>
            </div>
            <p className="mt-1.5 text-[10px] leading-snug text-slate-400">
              Guidance tool only. For acute emergencies, call{" "}
              <strong>10633</strong> or visit Emergency Dept, Shyamoli.
            </p>
          </form>
        </div>
      )}
    </>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={isUser ? "flex justify-end" : "flex justify-start"}>
      <div
        className={
          isUser
            ? "max-w-[85%] rounded-lg bg-slate-900 px-3 py-2 text-white shadow-xs"
            : "max-w-[92%] rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-800 shadow-xs"
        }
      >
        <ChatAnswer content={message.content} />

        {!!message.doctors?.length && (
          <div className="mt-2.5 space-y-1.5 border-t border-slate-100 pt-2">
            <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
              Recommended Specialists
            </p>
            {message.doctors.map((doctor) => (
              <Link
                key={doctor.id}
                href={`/doctors/${doctor.id}`}
                className="group flex items-center justify-between gap-2 rounded-md border border-slate-200 bg-slate-50 p-2 transition-colors hover:border-slate-300 hover:bg-white"
              >
                <div className="min-w-0">
                  <span className="flex items-center gap-1 font-semibold text-slate-900 text-[11px]">
                    <Stethoscope className="size-3 shrink-0 text-slate-600" />
                    <span className="truncate">{doctor.name}</span>
                  </span>
                  <span className="block font-mono text-[10px] tabular-nums text-slate-500">
                    {doctor.specialization}
                    {doctor.consultationFee
                      ? ` • ৳ ${Number(doctor.consultationFee).toLocaleString()}`
                      : ""}
                  </span>
                </div>
                <ArrowRight className="size-3.5 shrink-0 text-slate-400 group-hover:text-slate-900" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ChatAnswer({ content }: { content: string }) {
  return (
    <div className="whitespace-pre-wrap break-words leading-relaxed">
      {content.split(/\*\*(.+?)\*\*/g).map((part, index) =>
        index % 2 === 1 ? (
          // biome-ignore lint/suspicious/noArrayIndexKey: static segments
          <strong key={index} className="font-semibold text-slate-900">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </div>
  );
}
