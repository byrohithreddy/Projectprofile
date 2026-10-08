import { useEffect, useState } from "react";
import TextType from "../TextType/TextType";

type Phase = "browser" | "prompt" | "packages" | "done";

const PACKAGES = [
  "Software Engineer",
  "Web Developer",
  "Data Analyst",
];

async function detectBrowser(): Promise<string> {
  const ua = navigator.userAgent;

  // Brave must be checked first
  if ((navigator as any).brave?.isBrave) {
    try {
      const isBrave = await (navigator as any).brave.isBrave();
      if (isBrave) {
        const v = ua.match(/Chrome\/([\d.]+)/)?.[1] ?? "";
        return `Brave Browser [ ${v} ]`;
      }
    } catch {
      // brave check failed, fall through
    }
  }

  if (ua.includes("OPR") || ua.includes("Opera")) {
    const v = ua.match(/OPR\/([\d.]+)/)?.[1] ?? "";
    return `Opera [ ${v} ]`;
  }
  if (ua.includes("Edg")) {
    const v = ua.match(/Edg\/([\d.]+)/)?.[1] ?? "";
    return `Microsoft Edge [ ${v} ]`;
  }
  if (ua.includes("Chrome")) {
    const v = ua.match(/Chrome\/([\d.]+)/)?.[1] ?? "";
    return `Google Chrome [ ${v} ]`;
  }
  if (ua.includes("Firefox")) {
    const v = ua.match(/Firefox\/([\d.]+)/)?.[1] ?? "";
    return `Mozilla Firefox [ ${v} ]`;
  }
  if (ua.includes("Safari")) {
    const v = ua.match(/Version\/([\d.]+)/)?.[1] ?? "";
    return `Safari [ ${v} ]`;
  }
  return "Terminal Client [ 2.0 ]";
}

interface Props {
  onFinish: () => void;
}

export default function LoadingScreen({ onFinish }: Props) {
  const [phase, setPhase] = useState<Phase>("browser");
  const [installedCount, setInstalledCount] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [browser, setBrowser] = useState("Detecting system...");

  useEffect(() => {
    detectBrowser().then(setBrowser);
  }, []);

  // Snappy modern timing to avoid holding users back
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("prompt"), 350);
    const t2 = setTimeout(() => setPhase("packages"), 1000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (phase !== "packages") return;
    PACKAGES.forEach((_, i) => {
      setTimeout(() => {
        setInstalledCount((c) => c + 1);
      }, i * 220 + 100);
    });
    const t = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onFinish, 450);
    }, PACKAGES.length * 220 + 500);
    return () => clearTimeout(t);
  }, [phase, onFinish]);

  return (
    <div
      className="loading-screen-container"
      style={{
        position: "fixed",
        inset: 0,
        background: "#090a0f",
        zIndex: 99999,
        fontFamily: "'JetBrains Mono', monospace",
        padding: "clamp(1.5rem, 4vw, 3rem)",
        color: "#cbd5e1",
        fontSize: "clamp(12px, 1.5vw, 13px)",
        lineHeight: 1.75,
        transition: "opacity 0.45s ease",
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      {/* Browser line */}
      <p style={{ color: "#e2e8f0", marginBottom: "0.25rem", fontWeight: 500 }}>
        {browser}
      </p>

      {/* Copyright */}
      <p style={{ color: "#64748b", fontSize: "0.85em", marginBottom: "1.25rem" }}>
        (c) Mushke Rohith Reddy. All rights reserved.
      </p>

      {/* Prompt */}
      {phase !== "browser" && (
        <p style={{ color: "#94a3b8", marginBottom: "0.5rem" }}>
          C:\portfolio&gt;{" "}
          <TextType
            text="npm run dev"
            typingSpeed={35}
            loop={false}
            className="loading-prompt"
            style={{ color: "#f8fafc", display: "inline-block" }}
          />
        </p>
      )}

      {/* vite output header */}
      {(phase === "packages" || installedCount > 0) && (
        <p style={{ color: "#64748b", fontSize: "0.8em", marginBottom: "0.75rem" }}>
          &gt; portfolio@1.0.0 dev<br />
          &gt; vite v8.3.0 ready in 240ms
        </p>
      )}

      {/* Package install lines */}
      {PACKAGES.slice(0, installedCount).map((pkg) => (
        <div
          key={pkg}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            animation: "slideIn 0.2s ease",
            marginBottom: "3px",
          }}
        >
          <span style={{ color: "#10b981", fontSize: "0.85em" }}>✓</span>
          <span style={{ color: "#f8fafc", fontWeight: 500 }}>{pkg}</span>
          <span style={{ color: "#64748b" }}>ready</span>
        </div>
      ))}

      {/* Ready line */}
      {installedCount === PACKAGES.length && (
        <p style={{ color: "#94a3b8", marginTop: "0.75rem", fontSize: "0.8em" }}>
          &gt; Initializing 3D experience...
        </p>
      )}

      {/* Bottom progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "2px",
          background: "linear-gradient(90deg, #94a3b8, #ffffff)",
          transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
          width: phase === "packages" ? "100%" : "0%",
        }}
      />

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .loading-prompt .text-type__content {
          font-size: 13px !important;
          font-weight: normal !important;
          font-family: inherit !important;
          line-height: inherit !important;
        }
        @media (max-width: 600px) {
          .loading-screen-container {
            padding: 1.25rem !important;
          }
          .loading-prompt .text-type__content {
            font-size: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
