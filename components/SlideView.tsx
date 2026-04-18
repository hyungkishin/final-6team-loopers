"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { ImgRef, Slide } from "@/lib/slides";

export function SlideView({ slide }: { slide: Slide }) {
  switch (slide.kind) {
    case "cover":
      return <CoverSlide s={slide} />;
    case "photo":
      return <PhotoSlide s={slide} />;
    case "week":
      return <WeekSlide s={slide} />;
    case "grid":
      return <GridSlide s={slide} />;
    case "members":
      return <MembersSlide s={slide} />;
    case "banner":
      return <BannerSlide s={slide} />;
    case "quote":
      return <QuoteSlide s={slide} />;
    case "outro":
      return <OutroSlide s={slide} />;
    case "chosen":
      return <ChosenSlide s={slide} />;
  }
}

function Frame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`relative flex h-full w-full items-center justify-center px-6 py-16 sm:px-10 md:px-20 ${className}`}
    >
      <div className="relative w-full max-w-[1560px]">{children}</div>
    </section>
  );
}

function naturalMaxWidth(img: ImgRef): number {
  const upscale = 1.6;
  const hardCap = 940;
  return Math.min(Math.round(img.w * upscale), hardCap);
}

function Polaroid({
  img,
  rotate = 0,
  maxH = "74vh",
  widthCap,
  tape,
  showMeta = false,
  index,
}: {
  img: ImgRef;
  rotate?: number;
  maxH?: string;
  widthCap?: number;
  tape?: "pink" | "yellow" | "none";
  showMeta?: boolean;
  index?: string;
}) {
  const tapeColor =
    tape === "pink"
      ? "bg-(--color-tape-pink)"
      : tape === "none"
        ? "hidden"
        : "bg-(--color-tape)";

  const cap = widthCap ?? naturalMaxWidth(img);

  return (
    <div
      className="relative mx-auto block w-full"
      style={{
        transform: `rotate(${rotate}deg)`,
        maxWidth: `${cap}px`,
      }}
    >
      <div className="relative w-full bg-white p-4 pb-6 shadow-[0_30px_60px_-30px_rgba(15,15,18,0.55),0_12px_24px_-12px_rgba(15,15,18,0.25)] ring-1 ring-(--color-ink)/5">
        <div
          className={`absolute -top-4 left-1/2 h-6 w-28 -translate-x-1/2 rotate-[-2deg] opacity-80 shadow-sm ${tapeColor}`}
        />
        <div
          className="relative flex items-center justify-center overflow-hidden bg-(--color-paper-2)"
          style={{ minHeight: "clamp(240px, 36vh, 420px)" }}
        >
          <Image
            src={img.src}
            alt=""
            width={img.w}
            height={img.h}
            priority
            quality={95}
            sizes="(max-width: 768px) 92vw, 55vw"
            className="block h-auto w-full object-contain"
            style={{ maxHeight: maxH }}
          />
        </div>
        {showMeta ? (
          <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-widest text-(--color-ink)/55 uppercase">
            <span>Loopers · 6팀</span>
            <span>{index ?? `${img.w}×${img.h}`}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Sticker({
  text,
  color = "sun",
  rotate = -4,
  size = "sm",
  className = "",
}: {
  text: string;
  color?: "sun" | "pink" | "lime" | "sky";
  rotate?: number;
  size?: "sm" | "lg";
  className?: string;
}) {
  const bg =
    color === "pink"
      ? "bg-(--color-pink) text-white"
      : color === "lime"
        ? "bg-(--color-lime) text-(--color-ink)"
        : color === "sky"
          ? "bg-(--color-sky) text-(--color-ink)"
          : "bg-(--color-sun) text-(--color-ink)";
  const sizing =
    size === "lg"
      ? "px-5 py-2.5 text-2xl sm:text-3xl shadow-[6px_6px_0_0_rgba(0,0,0,0.9)]"
      : "px-3 py-1.5 text-xs shadow-[4px_4px_0_0_rgba(0,0,0,0.9)]";
  return (
    <span
      className={`font-display inline-block tracking-widest uppercase ${sizing} ${bg} ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {text}
    </span>
  );
}

function CoverSlide({ s }: { s: Extract<Slide, { kind: "cover" }> }) {
  return (
    <Frame className="paper-grain">
      <div className="relative grid gap-12">
        <div className="flex items-center gap-3">
          <Sticker text={s.eyebrow} color="pink" rotate={-3} />
          <Sticker text="no.06" color="lime" rotate={5} />
        </div>
        <h1 className="font-display text-[clamp(3.2rem,12vw,10rem)] leading-[0.88] tracking-[-0.03em]">
          {splitCoverTitle(s.title)}
        </h1>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <p className="font-hand max-w-xl text-2xl leading-snug text-(--color-ink-soft) sm:text-3xl">
            {s.tagline}
          </p>
          <p className="font-mono text-xs tracking-[0.3em] text-(--color-ink)/70 uppercase">
            {s.subtitle}
          </p>
        </div>
        <CoverMarquee />
      </div>
    </Frame>
  );
}

function splitCoverTitle(title: string) {
  const idx = title.indexOf(",");
  if (idx < 0) return title;
  return (
    <>
      <span className="text-(--color-pink)">{title.slice(0, idx + 1)}</span>
      <br />
      <span className="marker-lime">{title.slice(idx + 1).trim()}</span>
    </>
  );
}

function CoverMarquee() {
  const items = [
    "TDD",
    "Software Design",
    "Domain Modeling",
    "Transactional Op.",
    "Read Optimization",
    "Failure-Ready",
    "Kafka",
    "Queue",
    "Ranking",
    "Batch & MV",
  ];
  const track = [...items, ...items];
  return (
    <div className="mt-4 overflow-hidden border-y-2 border-dashed border-(--color-ink)/30 py-3">
      <div className="marquee-track flex gap-10 whitespace-nowrap">
        {track.map((t, i) => (
          <span
            key={i}
            className="font-display text-lg tracking-[0.2em] text-(--color-ink) uppercase"
          >
            {t} <span className="mx-6 text-(--color-pink)">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function PhotoSlide({ s }: { s: Extract<Slide, { kind: "photo" }> }) {
  const stickerColor = pickStickerColor(s.id);
  const [stage, setStage] = useState<"hero" | "split">("hero");
  const [swapped, setSwapped] = useState(false);

  useEffect(() => {
    setStage("hero");
    const t = setTimeout(() => setStage("split"), 1000);
    return () => clearTimeout(t);
  }, [s.id]);

  useEffect(() => {
    setSwapped(false);
    if (!s.swapImage) return;
    const t = setTimeout(() => setSwapped(true), s.swapAfterMs ?? 5000);
    return () => clearTimeout(t);
  }, [s.id, s.swapImage, s.swapAfterMs]);

  const EASE = [0.22, 1, 0.36, 1] as const;
  const currentImg = swapped && s.swapImage ? s.swapImage : s.image;

  return (
    <Frame className="paper-grain">
      <div className="grid h-full w-full grid-cols-[minmax(0,6fr)_minmax(0,4fr)] items-center gap-12 md:gap-16">
        <motion.div
          className="flex w-full justify-center"
          initial={false}
          animate={{
            scale: stage === "hero" ? 1.05 : 1,
            x: stage === "hero" ? "35%" : "0%",
          }}
          transition={{ duration: 1, ease: EASE }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentImg.src}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <Polaroid
                img={currentImg}
                rotate={s.rotate ?? -1.2}
                maxH="78vh"
                tape="yellow"
                showMeta
                index={s.sticker}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="relative"
          initial={false}
          animate={{
            opacity: stage === "split" ? 1 : 0,
            x: stage === "split" ? 0 : 32,
          }}
          transition={{
            duration: 0.75,
            ease: EASE,
            delay: stage === "split" ? 0.15 : 0,
          }}
        >
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-(--color-pink)" />
            <p className="font-mono text-[11px] tracking-[0.4em] text-(--color-pink) uppercase">
              behind the scene
            </p>
          </div>

          <h2 className="font-display mt-5 text-[clamp(2.4rem,4.4vw,4.4rem)] leading-[0.98] tracking-[-0.02em]">
            {s.caption}
          </h2>

          {s.drip ? (
            <p className="font-hand mt-6 max-w-md text-[clamp(1.4rem,1.8vw,2rem)] leading-snug text-(--color-ink-soft)">
              {s.drip}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {s.sticker ? (
              <Sticker text={s.sticker} color={stickerColor} rotate={-4} size="lg" />
            ) : null}
            <span className="font-mono text-[10px] tracking-[0.3em] text-(--color-ink)/50 uppercase">
              Loopers · Round Ing~
            </span>
          </div>
        </motion.div>
      </div>
    </Frame>
  );
}

function pickStickerColor(id: string): "sun" | "pink" | "lime" | "sky" {
  const sum = [...id].reduce((a, c) => a + c.charCodeAt(0), 0);
  return (["sun", "pink", "lime", "sky"] as const)[sum % 4];
}

const weekBg = {
  pink: "bg-(--color-pink) text-white",
  lime: "bg-(--color-lime) text-(--color-ink)",
  sun: "bg-(--color-sun) text-(--color-ink)",
  sky: "bg-(--color-sky) text-(--color-ink)",
} as const;

const weekMarker = {
  pink: "marker-pink",
  lime: "marker-lime",
  sun: "hand-underline",
  sky: "marker-lime",
} as const;

function WeekSlide({ s }: { s: Extract<Slide, { kind: "week" }> }) {
  return (
    <Frame className="paper-grain">
      <div className="grid gap-12 md:grid-cols-[300px_1fr] md:gap-16">
        <div
          className={`relative flex aspect-square flex-col justify-between p-7 shadow-[10px_10px_0_0_rgba(15,15,18,0.9)] ${weekBg[s.color]}`}
          style={{ transform: "rotate(-1.5deg)" }}
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase">Week</p>
          <p className="font-display text-[clamp(6rem,9vw,11rem)] leading-[0.82]">
            {String(s.week).padStart(2, "0")}
          </p>
          <p className="font-display text-sm tracking-[0.2em] uppercase">
            {s.theme}
          </p>
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-(--color-pink)" />
            <p className="font-mono text-[11px] tracking-[0.4em] text-(--color-pink) uppercase">
              chapter {String(s.week).padStart(2, "0")} of 10
            </p>
          </div>

          <h2 className="font-display mt-5 text-[clamp(2.4rem,4.6vw,4.6rem)] leading-[0.98] tracking-[-0.02em]">
            <span className={weekMarker[s.color]}>{s.title}</span>
          </h2>

          <p className="font-hand mt-6 max-w-2xl text-[clamp(1.4rem,1.9vw,2.1rem)] leading-snug text-(--color-ink-soft)">
            {s.summary}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {s.keywords.map((k) => (
              <span
                key={k}
                className="border-2 border-(--color-ink) bg-white px-3 py-1 font-mono text-xs tracking-wider text-(--color-ink)"
              >
                #{k}
              </span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 3.5 }}
            className="mt-10 inline-block max-w-full border-l-[10px] border-(--color-ink) bg-white px-8 py-7 shadow-[12px_12px_0_0_rgba(15,15,18,0.9)]"
            style={{ transform: "rotate(-0.6deg)" }}
          >
            <p className="font-mono text-sm font-bold tracking-[0.35em] text-(--color-pink) uppercase">
              ★ 한 줄 결론
            </p>
            <p className="font-display mt-3 text-[clamp(2.4rem,4vw,4.2rem)] font-bold leading-[1.05] tracking-[-0.01em]">
              <span className={weekMarker[s.color]}>{s.takeaway}</span>
            </p>
          </motion.div>
        </div>
      </div>
    </Frame>
  );
}

function GridSlide({ s }: { s: Extract<Slide, { kind: "grid" }> }) {
  const tapes: ("pink" | "sun" | "lime" | "sky")[] = [
    "pink",
    "sun",
    "lime",
    "sky",
    "pink",
    "sun",
    "lime",
    "sky",
    "pink",
    "sun",
  ];
  return (
    <Frame>
      <div className="mb-8">
        <Sticker text="table of contents" color="sun" rotate={-4} />
        <h2 className="font-display mt-4 text-5xl leading-tight sm:text-6xl">
          {s.title}
        </h2>
        {s.subtitle ? (
          <p className="font-hand mt-3 max-w-2xl text-2xl text-(--color-ink-soft)">
            {s.subtitle}
          </p>
        ) : null}
      </div>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {s.items.map((it, i) => {
          const color = tapes[i % tapes.length];
          const rot = (i % 2 === 0 ? -1 : 1) * (1 + (i % 3) * 0.6);
          return (
            <li
              key={i}
              className="relative bg-white p-4 shadow-[6px_6px_0_0_rgba(15,15,18,0.85)]"
              style={{ transform: `rotate(${rot}deg)` }}
            >
              <span
                className={`absolute -top-2 left-3 h-5 w-16 opacity-80 ${
                  color === "pink"
                    ? "bg-(--color-tape-pink)"
                    : color === "lime"
                      ? "bg-(--color-lime)"
                      : color === "sky"
                        ? "bg-(--color-sky)"
                        : "bg-(--color-tape)"
                }`}
                style={{ transform: "rotate(-4deg)" }}
              />
              <p className="font-mono text-[10px] tracking-widest text-(--color-ink)/60 uppercase">
                {it.label}
              </p>
              <p className="font-display mt-2 text-lg leading-tight">
                {it.value}
              </p>
              {it.hint ? (
                <p className="font-hand mt-2 text-base leading-tight text-(--color-ink-soft)">
                  {it.hint}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </Frame>
  );
}

function MembersSlide({ s }: { s: Extract<Slide, { kind: "members" }> }) {
  const tapes: ("pink" | "yellow")[] = ["pink", "yellow", "pink"];
  const [focusIdx, setFocusIdx] = useState<number | null>(null);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const GRID_HOLD = 2500;
    const FOCUS_HOLD = 7000;
    let t = 0;
    for (let i = 0; i < s.people.length; i++) {
      t += GRID_HOLD;
      const idx = i;
      timeouts.push(setTimeout(() => setFocusIdx(idx), t));
      t += FOCUS_HOLD;
      timeouts.push(setTimeout(() => setFocusIdx(null), t));
    }
    return () => timeouts.forEach(clearTimeout);
  }, [s.id, s.people.length]);

  const EASE = [0.22, 1, 0.36, 1] as const;
  const focused = focusIdx !== null ? s.people[focusIdx] : null;

  return (
    <Frame>
      <div className="mb-10">
        <Sticker text={s.subtitle} color="pink" rotate={-3} />
        <h2 className="font-display mt-4 text-5xl leading-tight sm:text-6xl">
          {s.title}
        </h2>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {focused === null ? (
          <motion.ul
            key="grid"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {s.people.map((p, i) => (
              <li key={p.name} className="flex flex-col items-center">
                <Polaroid
                  img={p.image}
                  rotate={p.rotate ?? 0}
                  maxH="52vh"
                  widthCap={Math.min(p.image.w * 1.4, 420)}
                  tape={tapes[i % tapes.length]}
                />
                <div className="mt-6 text-center">
                  <p className="font-mono text-xs tracking-[0.2em] text-(--color-pink) uppercase">
                    {p.role}
                  </p>
                  <p className="font-display mt-2 text-3xl">{p.name}</p>
                  <p className="font-hand mt-2 text-xl leading-snug text-(--color-ink-soft)">
                    {p.blurb}
                  </p>
                </div>
              </li>
            ))}
          </motion.ul>
        ) : (
          <motion.div
            key={`focus-${focusIdx}`}
            className="flex flex-col items-center gap-5"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Polaroid
              img={focused.image}
              rotate={focused.rotate ?? 0}
              maxH="52vh"
              widthCap={Math.min(focused.image.w * 1.6, 460)}
              tape={tapes[(focusIdx ?? 0) % tapes.length]}
            />
            <div className="text-center">
              <p className="font-mono text-base tracking-[0.3em] text-(--color-pink) uppercase sm:text-lg">
                {focused.role}
              </p>
              <p className="font-display mt-2 text-6xl leading-[0.95] sm:text-7xl">
                {focused.name}
              </p>
              <p className="font-hand mt-3 max-w-3xl text-3xl leading-snug text-(--color-ink-soft) sm:text-4xl">
                {focused.blurb}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Frame>
  );
}

function BannerSlide({ s }: { s: Extract<Slide, { kind: "banner" }> }) {
  return (
    <Frame className="paper-grain">
      <div className="grid gap-10">
        <div className="flex items-center gap-3">
          <span className="h-[2px] w-8 bg-(--color-pink)" />
          <p className="font-mono text-[11px] tracking-[0.4em] text-(--color-pink) uppercase">
            evidence
          </p>
        </div>
        <h2 className="font-display text-[clamp(3rem,6vw,6rem)] leading-[0.95] tracking-[-0.02em]">
          {s.title}
        </h2>
        <div
          className="relative border-4 border-(--color-ink) bg-white p-3 shadow-[12px_12px_0_0_rgba(15,15,18,0.9)]"
          style={{ transform: "rotate(-0.4deg)" }}
        >
          <span
            className="absolute -top-3 left-8 h-6 w-32 bg-(--color-tape) opacity-80 shadow-sm"
            style={{ transform: "rotate(-3deg)" }}
          />
          <div className="flex items-center justify-center bg-(--color-paper-2) py-10">
            <Image
              src={s.image.src}
              alt={s.title}
              width={s.image.w}
              height={s.image.h}
              quality={95}
              sizes="100vw"
              className="block h-auto w-full max-w-[85%] object-contain"
            />
          </div>
          <p className="font-mono mt-3 text-center text-[10px] tracking-[0.3em] text-(--color-ink)/60 uppercase">
            exhibit A · {s.image.w}×{s.image.h}
          </p>
        </div>
        <p className="font-hand max-w-2xl text-[clamp(1.4rem,2vw,2.2rem)] leading-snug text-(--color-ink-soft)">
          {s.body}
        </p>
      </div>
    </Frame>
  );
}

function QuoteSlide({ s }: { s: Extract<Slide, { kind: "quote" }> }) {
  const [revealed, setRevealed] = useState(false);
  const EASE = [0.22, 1, 0.36, 1] as const;

  useEffect(() => {
    if (!s.swapImage) return;
    const t = setTimeout(() => setRevealed(true), s.swapAfterMs ?? 5000);
    return () => clearTimeout(t);
  }, [s.id, s.swapImage, s.swapAfterMs]);

  return (
    <Frame>
      <div
        className="mx-auto max-w-4xl text-center"
        style={{ transform: "translateY(-22vh)" }}
      >
        <span className="font-display block text-[8rem] leading-none text-(--color-pink)">
          “
        </span>
        <p className="font-display -mt-10 text-4xl leading-[1.1] sm:text-5xl md:text-6xl">
          <span className="hand-underline">{s.quote}</span>
        </p>
        <p className="font-hand mt-8 text-xl text-(--color-ink-soft)">
          {s.cite}
        </p>
      </div>

      {s.swapImage ? (
        <AnimatePresence>
          {revealed ? (
            <motion.div
              key="reveal"
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "35%", opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <Polaroid
                img={s.swapImage}
                rotate={-2}
                maxH="38vh"
                tape="pink"
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      ) : null}
    </Frame>
  );
}

function OutroSlide({ s }: { s: Extract<Slide, { kind: "outro" }> }) {
  return (
    <section className="relative flex h-full w-full items-center justify-center overflow-hidden px-6 py-16 sm:px-10 md:px-20">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#ff9a3d_0%,#ff5a8a_42%,#6a3a9a_80%,#2a1a55_100%)]" />
      <div
        className="absolute left-1/2 top-[34%] h-[44vmin] w-[44vmin] -translate-x-1/2 rounded-full blur-[2px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,246,210,0.98) 0%, rgba(255,200,140,0.65) 50%, rgba(255,170,120,0) 72%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-[26%] bg-gradient-to-t from-[#120827] via-[#2a1850]/70 to-transparent" />
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-1/2 h-[2px] bg-[rgba(255,255,255,0.45)] shadow-[0_0_18px_4px_rgba(255,255,255,0.25)]"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      />

      <Sparkles count={26} />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.6) 0, rgba(0,0,0,0.6) 1px, transparent 1px, transparent 3px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      <motion.div
        className="relative z-10 grid w-full max-w-[1560px] gap-6 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      >
        <p className="font-mono text-xs tracking-[0.55em] text-white/85 uppercase">
          ─ end credits ─
        </p>
        <h2 className="font-display text-[clamp(5rem,15vw,13rem)] leading-[0.86] tracking-[-0.03em] text-white drop-shadow-[8px_8px_0_rgba(0,0,0,0.55)]">
          THE&nbsp;END
        </h2>
        <p className="font-display text-[clamp(2rem,4.2vw,3.8rem)] leading-[0.95] text-[#ffe58a] drop-shadow-[4px_4px_0_rgba(0,0,0,0.45)]">
          {s.title}
        </p>
        <p className="font-hand max-w-2xl text-3xl leading-snug text-white/95">
          {s.body}
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-6 border-t border-white/40 pt-6">
          <p className="font-hand text-3xl text-white">{s.signature}</p>
          <p className="font-mono text-xs tracking-[0.35em] text-white/75 uppercase">
            Loopers BE L2 · Round 10 · 6팀
          </p>
        </div>
      </motion.div>
    </section>
  );
}

const HERO_ACCENT: Record<
  "gold" | "sky" | "pink" | "lime",
  { glow: string; ring: string; name: string }
> = {
  gold: {
    glow: "radial-gradient(circle, rgba(255,220,120,0.95) 0%, rgba(255,170,60,0.35) 45%, rgba(255,170,60,0) 72%)",
    ring: "rgba(255,210,90,0.9)",
    name: "#ffe58a",
  },
  sky: {
    glow: "radial-gradient(circle, rgba(150,220,255,0.95) 0%, rgba(80,170,255,0.35) 45%, rgba(80,170,255,0) 72%)",
    ring: "rgba(130,210,255,0.9)",
    name: "#bfe7ff",
  },
  pink: {
    glow: "radial-gradient(circle, rgba(255,170,210,0.95) 0%, rgba(255,90,160,0.4) 45%, rgba(255,90,160,0) 72%)",
    ring: "rgba(255,150,200,0.9)",
    name: "#ffcce0",
  },
  lime: {
    glow: "radial-gradient(circle, rgba(200,255,150,0.95) 0%, rgba(130,220,80,0.4) 45%, rgba(130,220,80,0) 72%)",
    ring: "rgba(190,255,140,0.9)",
    name: "#d8ffa8",
  },
};

function ChosenSlide({ s }: { s: Extract<Slide, { kind: "chosen" }> }) {
  const EASE = [0.22, 1, 0.36, 1] as const;
  const STEP = 0.6;
  return (
    <section className="relative flex h-full w-full items-center justify-center overflow-hidden px-6 py-12 sm:px-10 md:px-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#2a1a55_0%,#120827_55%,#05020f_100%)]" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 4px)",
        }}
      />
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "70vmin",
          height: "70vmin",
          background:
            "radial-gradient(circle, rgba(255,240,180,0.25) 0%, rgba(255,200,120,0.08) 40%, rgba(0,0,0,0) 70%)",
        }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.6, 1.15, 1], opacity: [0, 0.9, 0.65] }}
        transition={{ duration: 2.2, ease: EASE }}
      />
      <Sparkles count={28} />

      <div className="relative z-10 flex w-full max-w-[1560px] flex-col items-center gap-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {s.subtitle ? (
            <p className="font-mono text-sm tracking-[0.55em] text-white/75 uppercase">
              ─ {s.subtitle} ─
            </p>
          ) : null}
          <h2 className="font-display mt-4 text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.02em] text-white drop-shadow-[4px_4px_0_rgba(0,0,0,0.55)]">
            {s.title}
          </h2>
        </motion.div>

        <ul className="grid w-full grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {s.heroes.map((h, i) => {
            const accent = HERO_ACCENT[h.accent];
            const delay = 0.6 + i * STEP;
            return (
              <li
                key={h.name}
                className="relative flex flex-col items-center"
              >
                <motion.div
                  aria-hidden
                  className="absolute inset-0 -z-10"
                  style={{ background: accent.glow }}
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: [0, 0.95, 0.6], scale: [0.3, 1.25, 1] }}
                  transition={{ duration: 1, ease: EASE, delay: delay - 0.05 }}
                />
                <motion.div
                  className="relative overflow-hidden rounded-full border-[6px] bg-white/5 backdrop-blur-[1px]"
                  style={{
                    borderColor: accent.ring,
                    boxShadow: `0 0 32px 6px ${accent.ring}, inset 0 0 24px rgba(255,255,255,0.15)`,
                    width: "min(22vw, 260px)",
                    height: "min(22vw, 260px)",
                  }}
                  initial={{ opacity: 0, scale: 0.2, rotate: -18 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay }}
                >
                  <Image
                    src={h.image.src}
                    alt={h.name}
                    width={h.image.w}
                    height={h.image.h}
                    quality={95}
                    sizes="(max-width: 768px) 40vw, 22vw"
                    className="h-full w-full object-cover"
                  />
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.95, 0] }}
                    transition={{
                      duration: 0.55,
                      ease: "easeOut",
                      delay: delay + 0.1,
                    }}
                  />
                </motion.div>
                <motion.div
                  className="mt-5 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: delay + 0.35 }}
                >
                  {h.label ? (
                    <p
                      className="font-mono text-[11px] tracking-[0.4em] uppercase"
                      style={{ color: accent.name }}
                    >
                      {h.label}
                    </p>
                  ) : null}
                  <p
                    className="font-display mt-1 text-4xl leading-none sm:text-5xl"
                    style={{
                      color: accent.name,
                      textShadow: "3px 3px 0 rgba(0,0,0,0.5)",
                    }}
                  >
                    {h.name}
                  </p>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Sparkles({ count }: { count: number }) {
  const particles = Array.from({ length: count }, (_, i) => {
    const seed = i + 1;
    const left = (seed * 37.41) % 100;
    const size = 2 + ((seed * 13) % 5);
    const delay = (seed * 0.47) % 5;
    const dur = 7 + ((seed * 1.3) % 9);
    const drift = ((seed * 11) % 20) - 10;
    return { left, size, delay, dur, drift, key: i };
  });
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {particles.map((p) => (
        <motion.span
          key={p.key}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.left}%`,
            bottom: "-4%",
            width: p.size,
            height: p.size,
            boxShadow: "0 0 10px 2px rgba(255,255,255,0.85)",
          }}
          initial={{ y: 0, x: 0, opacity: 0 }}
          animate={{
            y: "-110vh",
            x: [0, p.drift, -p.drift, 0],
            opacity: [0, 1, 1, 0.8, 0],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
