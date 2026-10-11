"use client";

import { useEffect, useRef, useState } from "react";

import { Photo } from "@/components/media/Photo";

type Step = { key: string; title: string; body: string };
type Shot = { path: string; width: number; height: number };

/**
 * Steps told beside one nail-shaped frame (almond, a polish-pink rim and a gel
 * shine) that stays put while they scroll past,
 * its photo changing to match the step in the middle of the screen. The step
 * being read is full strength, the rest fade back. From 900px only; phones get
 * the plain list, since a sticky frame there would cover the text.
 *
 * The photos are decorative (her work, all in the gallery with alt text); the
 * steps themselves are ordinary text either way.
 */
export function StoryScroll({ steps, shots }: { steps: Step[]; shots: Shot[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    // A thin line across the middle of the screen: whichever step crosses it is the one being read.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    for (const element of refs.current) if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid gap-12 min-[900px]:grid-cols-[minmax(0,420px)_1fr] min-[900px]:gap-20">
      <div aria-hidden="true" className="hidden min-[900px]:block">
        <div className="sticky top-28">
          <div className="drop-shadow-[0_34px_40px_rgba(120,30,80,0.32)]">
          <div className="nail-almond aspect-[100/150] bg-[image:var(--hot)] p-2">
          <div className="nail-almond gel-shine relative h-full overflow-hidden bg-shot">
            {shots.map((shot, index) => (
              <div
                key={shot.path}
                className={`absolute inset-0 transition-[opacity,scale] duration-700 ease-out ${index === active % shots.length ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
              >
                <Photo
                  path={shot.path}
                  alt=""
                  width={shot.width}
                  height={shot.height}
                  sizes="420px"
                  className="block h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          </div>
          </div>
          <span className="font-display absolute -right-8 -bottom-10 bg-[image:var(--hot-text)] bg-clip-text text-[150px] leading-none font-extrabold tracking-[-0.06em] text-transparent">
            {String(active + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      <ol className="flex flex-col">
        {steps.map((step, index) => (
          <li
            key={step.key}
            ref={(element) => {
              refs.current[index] = element;
            }}
            data-index={index}
            className={`flex flex-col justify-center py-8 transition-opacity duration-500 min-[900px]:min-h-[52vh] ${index === active ? "opacity-100" : "min-[900px]:opacity-30"}`}
          >
            <span
              aria-hidden="true"
              className="font-display mb-3 block bg-[image:var(--hot-text)] bg-clip-text text-[44px] leading-none font-extrabold text-transparent min-[900px]:hidden"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mb-3 text-[clamp(26px,3.4vw,40px)]">{step.title}</h3>
            <p className="max-w-[48ch] text-[16.5px] text-ink-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
