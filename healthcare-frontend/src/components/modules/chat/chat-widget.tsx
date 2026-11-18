"use client";

import {
  ArrowRight,
  MessageCircleIcon,
  SendIcon,
  SparklesIcon,
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
  "I have a rash on my skin, which doctor should I consult?",
  "I have trouble sleeping. Which specialist can help?",
  "Suggest a cardiologist for chest pain or high blood pressure",
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
            title: "Message not sent",
            description:
              "We couldn't reach the hospital assistant. Please try again.",
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
        size="icon-lg"
        className="fixed right-5 bottom-5 z-40 size-14 rounded-full shadow-xl shadow-primary/25 transition-transform hover:scale-105"
        aria-label={
          isOpen
            ? "Close chat"
            : "Chat with Bangladesh Specialized Hospital Assistant"
        }
        aria-expanded={isOpen}
        aria-controls="healthcare-chat-panel"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? (
          <XIcon className="size-6" />
        ) : (
          <MessageCircleIcon className="size-6" />
        )}
      </Button>

      {isOpen && (
        <div
          id="healthcare-chat-panel"
          role="dialog"
          aria-label="Bangladesh Specialized Hospital Assistant"
          className="fixed right-5 bottom-22 z-40 flex h-[min(36rem,calc(100dvh-7rem))] w-[min(25rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl bg-popover text-sm text-popover-foreground shadow-2xl ring-1 ring-foreground/10"
        >
          <div className="flex items-center gap-3 border-b bg-primary px-4 py-3.5 text-primary-foreground">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-foreground/15">
              <SparklesIcon className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">BSH Medical Assistant</p>
              <p className="truncate text-xs text-primary-foreground/80">
                AI-powered specialist recommendations
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"
              aria-label="Close chat"
              onClick={closeChat}
            >
              <XIcon />
            </Button>
          </div>

          <div
            ref={scrollAreaRef}
            aria-live="polite"
            className="flex-1 space-y-3 overflow-y-auto bg-slate-50/60 p-4"
          >
            {messages.length === 0 && !isPending && (
              <div className="space-y-3">
                <div className="max-w-[92%] rounded-2xl rounded-bl-sm border bg-white px-3.5 py-2.5 shadow-xs">
                  <p className="leading-relaxed">
                    Welcome to{" "}
                    <strong className="font-semibold text-slate-900">
                      Bangladesh Specialized Hospital
                    </strong>
                    ! Tell me your symptoms and I&apos;ll recommend the right
                    specialist from our verified doctors.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="px-1 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                    Try asking
                  </p>
                  {SUGGESTIONS.map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="outline"
                      className="h-auto w-full justify-start bg-white px-3 py-2 text-left text-xs whitespace-normal hover:border-primary/40 hover:bg-primary/5"
                      onClick={() => sendMessage(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))}

            {isPending && (
              <div className="flex max-w-[90%] items-center gap-2 rounded-2xl rounded-bl-sm border bg-white px-3.5 py-2.5 text-muted-foreground shadow-xs">
                <Spinner className="size-3.5" />
                <span>Searching our specialist directory…</span>
              </div>
            )}
          </div>

          <form className="border-t bg-white p-3" onSubmit={handleSubmit}>
            <div className="flex items-end gap-2">
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
                placeholder="Describe your symptoms…"
                aria-label="Message"
                rows={1}
                className="max-h-28 min-h-9 resize-none py-2"
              />
              <Button
                type="submit"
                size="icon"
                className="size-9 shrink-0"
                disabled={!input.trim() || isPending}
                aria-label="Send message"
              >
                {isPending ? <Spinner /> : <SendIcon />}
              </Button>
            </div>
            <p className="mt-2 text-[11px] leading-snug text-muted-foreground">
              Not a substitute for medical advice. For emergencies, call 10633
              or visit our 24/7 Emergency Department.
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
            ? "max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5 text-primary-foreground shadow-xs"
            : "max-w-[92%] rounded-2xl rounded-bl-sm border bg-white px-3.5 py-2.5 shadow-xs"
        }
      >
        <ChatAnswer content={message.content} />

        {!!message.doctors?.length && (
          <div className="mt-3 space-y-2 border-t pt-2.5">
            <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
              Recommended Specialists
            </p>
            {message.doctors.map((doctor) => (
              <Link
                key={doctor.id}
                href={`/doctors/${doctor.id}`}
                className="group flex items-center justify-between gap-2 rounded-xl border bg-slate-50/80 p-2.5 text-card-foreground transition-all hover:border-primary/40 hover:bg-primary/5"
              >
                <div className="min-w-0">
                  <span className="flex items-center gap-1.5 font-semibold text-slate-900">
                    <Stethoscope className="size-3.5 shrink-0 text-primary" />
                    <span className="truncate">{doctor.name}</span>
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {doctor.specialization}
                    {doctor.consultationFee
                      ? ` • ৳${Number(doctor.consultationFee).toLocaleString()}`
                      : ""}
                  </span>
                </div>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
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
          // biome-ignore lint/suspicious/noArrayIndexKey: static text segments never reorder
          <strong key={index} className="font-semibold">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </div>
  );
}
