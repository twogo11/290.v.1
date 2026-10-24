"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/** Keep page scrolling, scene animation and same-page navigation in sync. */
export default function SmoothScroll({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.085,
      wheelMultiplier: 0.85,
      smoothWheel: true,
      syncTouch: false,
      respectReducedMotion: false,
      prevent: (node) => node instanceof HTMLElement && Boolean(node.closest("dialog")),
    });

    const syncDialogLock = () => {
      if (document.body.style.overflow === "hidden") lenis.stop();
      else lenis.start();
    };
    const observer = new MutationObserver(syncDialogLock);
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    syncDialogLock();

    const onAnchorClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== location.origin || destination.pathname !== location.pathname || destination.search !== location.search || !destination.hash) return;
      let id: string;
      try { id = decodeURIComponent(destination.hash.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      if (!target || document.querySelector("dialog[open]")) return;

      event.preventDefault();
      event.stopPropagation();
      if (location.hash !== destination.hash) history.pushState(history.state, "", destination.hash);
      lenis.scrollTo(target, {
        offset: 0,
        duration: 1.25,
        easing: (value) => 1 - Math.pow(1 - value, 4),
        onComplete: () => {
          if (event.detail === 0 && document.activeElement === anchor) {
            const original = target.getAttribute("tabindex");
            target.setAttribute("tabindex", "-1");
            target.focus({ preventScroll: true });
            if (original === null) target.removeAttribute("tabindex");
            else target.setAttribute("tabindex", original);
          }
        },
      });
    };
    const stopForControl = (event: PointerEvent) => {
      if (event.button === 0 && event.target instanceof Element && event.target.closest("button, input, select, textarea, summary")) {
        lenis.scrollTo(lenis.actualScroll, { immediate: true });
      }
    };
    const stopOnHistoryChange = () => lenis.scrollTo(window.scrollY, { immediate: true });
    document.addEventListener("click", onAnchorClick, true);
    document.addEventListener("pointerdown", stopForControl, true);
    window.addEventListener("popstate", stopOnHistoryChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("click", onAnchorClick, true);
      document.removeEventListener("pointerdown", stopForControl, true);
      window.removeEventListener("popstate", stopOnHistoryChange);
      lenis.destroy();
    };
  }, [enabled]);

  return null;
}
