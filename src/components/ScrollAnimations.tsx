"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * GSAP + ScrollTrigger анимации появления секций.
 * Работают только на десктопе (>=768px) и только если пользователь
 * не запросил уменьшение анимаций (prefers-reduced-motion).
 * Анимируются исключительно opacity и transform.
 */
export function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!isDesktop || reducedMotion) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    async function init() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".animate-section").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      });

      cleanup = () => {
        ctx.revert();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }

    init();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [pathname]);

  return null;
}
