"use client";

import { useEffect, useRef, useState } from "react";

export function PeruMapVisual({
  activeDept,
  onHoverDept,
}: {
  activeDept: string | null;
  onHoverDept: (dept: string) => void;
}) {
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/zonas/overlay.svg")
      .then((res) => res.text())
      .then(setSvgMarkup)
      .catch(() => setSvgMarkup(null));
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.querySelectorAll(".region").forEach((el) => {
      el.classList.toggle("active", el.getAttribute("data-dept") === activeDept);
    });
  }, [svgMarkup, activeDept]);

  return (
    <div className="relative mx-auto w-full max-w-[420px] leading-none">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/zonas/mapa-peru.png" alt="Mapa político del Perú" className="block w-full" />
      {svgMarkup && (
        <div
          ref={containerRef}
          className="map-overlay absolute inset-0 h-full w-full"
          onMouseOver={(e) => {
            const region = (e.target as HTMLElement).closest("[data-dept]");
            const dept = region?.getAttribute("data-dept");
            if (dept) onHoverDept(dept);
          }}
          dangerouslySetInnerHTML={{
            __html: svgMarkup.replace(
              "<svg ",
              '<svg style="width:100%;height:100%;display:block" '
            ),
          }}
        />
      )}
    </div>
  );
}
