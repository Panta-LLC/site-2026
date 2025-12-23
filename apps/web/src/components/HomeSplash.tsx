"use client";
import React, { useEffect, useState } from "react";
import styles from "./HomeSplash.module.css";

export default function HomeSplash({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [bgColor, setBgColor] = useState<string | undefined>(undefined);
  const [contentVisible, setContentVisible] = useState(false);
  type BgItem = { alt: string; phase: 0 | 1 };
  const [bgItems, setBgItems] = useState<BgItem[]>([]);
  const [showPanta, setShowPanta] = useState(true);

  useEffect(() => {
    // animation duration (slowed to half speed -> doubled)
    const animationDuration = 1200; // ms
    // show the logo after animation for half the previous display time (1.25s)
    const displayDuration = 625; // ms
    const total = animationDuration + displayDuration;
    const t = setTimeout(() => setVisible(false), total);
    // capture the computed background color of the page so the overlay matches
    try {
      const bodyBg = getComputedStyle(document.body).backgroundColor;
      setBgColor(bodyBg);
    } catch {
      // ignore in environments without window
    }
    // populate repeating text grid with phased pattern
    try {
      const cols = 6;
      const rows = 6;
      const total = cols * rows;
      const words = [
        "All Things",
        "Everything",
        "Todo",
        "Tudo",
        "Tout",
        "Alles",
        "Tutto",
        "παντα",
        "Всe",
      ];
      const items: BgItem[] = Array.from({ length: total }).map((_, idx) => {
        const row = Math.floor(idx / cols);
        const col = idx % cols;
        // phase: 0 means shows Panta when showPanta === true; 1 means shows alt when showPanta === true
        const phase: 0 | 1 =
          row % 2 === 0 && col % 2 === 0 ? 0 : row % 2 === 1 && col % 2 === 1 ? 1 : 0;
        const alt = words[Math.floor(Math.random() * words.length)];
        return { alt, phase };
      });
      setBgItems(items);
    } catch {
      // ignore
    }
    return () => clearTimeout(t);
  }, []);

  // after the splash is hidden, reveal content (simple fade-in)
  useEffect(() => {
    if (!visible) {
      const reveal = setTimeout(() => {
        setContentVisible(true);
      }, 80);
      return () => clearTimeout(reveal);
    }
  }, [visible]);

  // alternate showing Panta vs a random alternate every 125ms
  useEffect(() => {
    if (!bgItems || bgItems.length === 0) return;
    const words = [
      "All Things",
      "Everything",
      "Todo",
      "Tudo",
      "Tout",
      "Alles",
      "Tutto",
      "παντα",
      "Всe",
    ];
    const interval = setInterval(() => {
      setShowPanta((prevShow) => {
        const nextShow = !prevShow;
        // refresh alt words for items that will display the alternative on the next tick
        setBgItems((prevItems) =>
          prevItems.map((it) => {
            const willShowAlt = (nextShow && it.phase === 1) || (!nextShow && it.phase === 0);
            if (willShowAlt) {
              return { ...it, alt: words[Math.floor(Math.random() * words.length)] };
            }
            return it;
          })
        );
        return nextShow;
      });
    }, 300);
    return () => clearInterval(interval);
  }, [bgItems]);

  return (
    <>
      <div
        className={`${styles.overlay} ${!visible ? styles.hidden : ""}`}
        aria-hidden={!visible}
        style={bgColor ? { backgroundColor: bgColor } : undefined}
      >
        {/* Background repeating text */}
        <div className={styles.bgText} aria-hidden="true">
          {bgItems.map((item, i) => {
            const showingAlt = (showPanta && item.phase === 1) || (!showPanta && item.phase === 0);
            const display = showingAlt ? item.alt : "Panta";
            // first item (top-left) stays static as 'Panta' with theme blue and full opacity
            if (i === 0) {
              return (
                <div
                  key={`0-Panta-static`}
                  className={`${styles.bgTextItem} ${styles.primaryCell} fixed top-4 left-20 font-normal`}
                >
                  Panta
                </div>
              );
            }

            return (
              <div key={`${i}-${display}`} className={styles.bgTextItem}>
                {display}
              </div>
            );
          })}
        </div>

        <div className={styles.center}>
          {/* Ripples */}
          <span className={`${styles.ripple} ${styles["delay-1"]}`} />
          <span className={`${styles.ripple} ${styles["delay-2"]}`} />
          <span className={`${styles.ripple} ${styles["delay-3"]}`} />

          {/* Inline Logo SVG (keeps original look) */}
          <svg
            className={styles.logo}
            id="Layer_2"
            data-name="Layer 2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12.86 12.86"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <style>{`.cls-1{fill:currentColor;}`}</style>
            </defs>
            <g id="Layer_1-2" data-name="Layer 1">
              <g>
                <path
                  className="cls-1"
                  d="M6.43,5.65c.43,0,.78.35.78.78s-.35.78-.78.78-.78-.35-.78-.78.35-.78.78-.78M6.43,4.62c-1,0-1.81.81-1.81,1.81s.81,1.81,1.81,1.81,1.81-.81,1.81-1.81-.81-1.81-1.81-1.81h0Z"
                />
                <path
                  className="cls-1"
                  d="M6.43,2.89c1.95,0,3.54,1.59,3.54,3.54s-1.59,3.54-3.54,3.54-3.54-1.59-3.54-3.54,1.59-3.54,3.54-3.54M6.43,2.12c-2.38,0-4.31,1.93-4.31,4.31s1.93,4.31,4.31,4.31,4.31-1.93,4.31-4.31-1.93-4.31-4.31-4.31h0Z"
                />
                <path
                  className="cls-1"
                  d="M6.43.51c3.26,0,5.91,2.65,5.91,5.91s-2.65,5.91-5.91,5.91S.51,9.69.51,6.43,3.17.51,6.43.51M6.43,0C2.88,0,0,2.88,0,6.43s2.88,6.43,6.43,6.43,6.43-2.88,6.43-6.43S9.98,0,6.43,0h0Z"
                />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* Render children under the splash; keep them in DOM so layout is ready */}
      <div className={contentVisible ? styles.contentVisible : styles.contentHidden}>
        {children}
      </div>
    </>
  );
}
