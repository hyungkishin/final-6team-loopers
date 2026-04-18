"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { slides } from "@/lib/slides";
import { SlideView } from "./SlideView";

const VARIANTS = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 60 : -60,
    scale: 0.98,
  }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -60 : 60,
    scale: 0.98,
  }),
};

const OUTRO_AUDIO_SRC = encodeURI(
  "/전영호_01_Butter_Fly_Butter_Fly (디지몬 어드벤처)_320.mp3",
);
const AUDIO_START_SLIDE_ID = "lesson";
const AUDIO_END_SLIDE_ID = "farewell";

export function Deck() {
  const [[index, dir], setIndex] = useState<[number, number]>([0, 0]);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const reduceMotion = useReducedMotion();

  const total = slides.length;
  const current = slides[index];

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(total - 1, next));
      setIndex(([prev]) => [clamped, clamped > prev ? 1 : -1]);
    },
    [total],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const hit = slides.findIndex((s) => s.id === hash);
    if (hit >= 0) setIndex([hit, 0]);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.location.hash = slides[index].id;
  }, [index]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const startIdx = slides.findIndex((s) => s.id === AUDIO_START_SLIDE_ID);
    const endIdx = slides.findIndex((s) => s.id === AUDIO_END_SLIDE_ID);
    const inRange = index >= startIdx && index <= endIdx;
    if (inRange) {
      audio.volume = 0.6;
      if (current.id === AUDIO_START_SLIDE_ID && audio.paused) {
        audio.currentTime = 0;
      }
      audio.play().catch(() => {});
    } else {
      if (!audio.paused) audio.pause();
      audio.currentTime = 0;
    }
  }, [current, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLElement &&
        ["INPUT", "TEXTAREA"].includes(e.target.tagName)
      )
        return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        goTo(0);
      } else if (e.key === "End") {
        goTo(total - 1);
      } else if (e.key === "o" || e.key === "Escape") {
        setOverviewOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, goTo, total]);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next();
      else prev();
    }
    touchStart.current = null;
  };

  const progress = useMemo(() => ((index + 1) / total) * 100, [index, total]);

  return (
    <div
      className="relative h-dvh w-full overflow-hidden bg-(--color-paper) text-(--color-ink)"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <TopBar index={index} total={total} progress={progress} current={current.id} />

      <audio ref={audioRef} src={OUTRO_AUDIO_SRC} preload="auto" loop />

      <div className="absolute inset-0">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={current.id}
            custom={dir}
            variants={reduceMotion ? undefined : VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: reduceMotion ? 0 : 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0"
          >
            <SlideView slide={current} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* <BottomBar
        index={index}
        total={total}
        onNext={next}
        onPrev={prev}
        onOverview={() => setOverviewOpen(true)}
      /> */}

      <Overview
        open={overviewOpen}
        onClose={() => setOverviewOpen(false)}
        onPick={(i) => {
          goTo(i);
          setOverviewOpen(false);
        }}
        activeIndex={index}
      />
    </div>
  );
}

function TopBar({
  index,
  total,
  progress,
  current,
}: {
  index: number;
  total: number;
  progress: number;
  current: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 pt-5 sm:px-10">
      <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-(--color-ink)/60 uppercase">
        <span>Loopers · 6팀</span>
        <span className="hidden sm:inline">/</span>
        <span className="hidden sm:inline">{current}</span>
      </div>
      <div className="flex items-center gap-3 font-mono text-xs text-(--color-ink)/60">
        <span>
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
      <div className="absolute inset-x-0 top-0 h-[3px] bg-(--color-ink)/10">
        <div
          className="h-full bg-(--color-pink) transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function BottomBar({
  index,
  total,
  onNext,
  onPrev,
  onOverview,
}: {
  index: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
  onOverview: () => void;
}) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex items-center justify-between px-6 pb-5 sm:px-10">
      <div className="pointer-events-auto flex items-center gap-2">
        <NavButton label="←" disabled={index === 0} onClick={onPrev} />
        <NavButton label="→" disabled={index === total - 1} onClick={onNext} />
      </div>
      <div className="pointer-events-auto hidden items-center gap-3 font-mono text-xs text-(--color-ink)/60 sm:flex">
        <Kbd>←</Kbd>
        <Kbd>→</Kbd>
        <span className="opacity-70">이동</span>
        <Kbd>O</Kbd>
        <span className="opacity-70">전체보기</span>
      </div>
      <button
        onClick={onOverview}
        className="pointer-events-auto border-2 border-(--color-ink) bg-(--color-sun) px-4 py-2 font-mono text-xs tracking-wider shadow-[4px_4px_0_0_rgba(15,15,18,0.9)] transition hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_0_rgba(15,15,18,0.9)]"
      >
        OVERVIEW
      </button>
    </div>
  );
}

function NavButton({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid size-11 place-items-center border-2 border-(--color-ink) bg-white font-mono text-(--color-ink) shadow-[4px_4px_0_0_rgba(15,15,18,0.9)] transition hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-(--color-lime) hover:shadow-[6px_6px_0_0_rgba(15,15,18,0.9)] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:bg-white disabled:hover:shadow-[4px_4px_0_0_rgba(15,15,18,0.9)]"
    >
      {label}
    </button>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-grid min-w-6 place-items-center border border-(--color-ink)/40 bg-white px-1.5 py-0.5 font-mono text-[10px] text-(--color-ink)">
      {children}
    </span>
  );
}

function Overview({
  open,
  onClose,
  onPick,
  activeIndex,
}: {
  open: boolean;
  onClose: () => void;
  onPick: (i: number) => void;
  activeIndex: number;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 z-40 flex flex-col bg-(--color-paper)/97 backdrop-blur"
        >
          <div className="flex items-center justify-between border-b-2 border-dashed border-(--color-ink)/30 px-6 pt-6 pb-4 sm:px-10">
            <h2 className="font-display text-sm tracking-widest text-(--color-ink) uppercase">
              전체 슬라이드 · {slides.length}
            </h2>
            <button
              onClick={onClose}
              className="border-2 border-(--color-ink) bg-(--color-pink) px-4 py-2 font-mono text-xs tracking-wider text-white shadow-[4px_4px_0_0_rgba(15,15,18,0.9)]"
            >
              CLOSE (ESC)
            </button>
          </div>
          <div className="hide-scrollbar flex-1 overflow-y-auto px-6 py-6 sm:px-10">
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
              {slides.map((s, i) => (
                <li key={s.id}>
                  <button
                    onClick={() => onPick(i)}
                    className={`group flex w-full flex-col items-start border-2 p-3 text-left transition ${
                      i === activeIndex
                        ? "border-(--color-pink) bg-(--color-sun)"
                        : "border-(--color-ink)/20 bg-white hover:border-(--color-ink) hover:bg-(--color-lime)"
                    }`}
                    style={{
                      boxShadow:
                        i === activeIndex
                          ? "4px 4px 0 0 rgba(15,15,18,0.9)"
                          : undefined,
                    }}
                  >
                    <span className="font-mono text-[10px] tracking-widest text-(--color-ink)/60 uppercase">
                      {String(i + 1).padStart(2, "0")} · {s.kind}
                    </span>
                    <span className="font-display mt-2 line-clamp-2 text-sm text-(--color-ink)">
                      {labelFor(s)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function labelFor(s: (typeof slides)[number]): string {
  if ("title" in s && s.title) return s.title;
  if (s.kind === "photo") return s.caption;
  if (s.kind === "quote") return s.quote;
  return s.id;
}
