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

  // Brave must be checked first — its UA contains "Chrome"
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
  return "Unknown Browser [ — ]";
}

interface Props {
  onFinish: () => void;
}

export default function LoadingScreen({ onFinish }: Props) {
  const [phase, setPhase] = useState<Phase>("browser");
  const [installedCount, setInstalledCount] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [browser, setBrowser] = useState("Detecting...");

  // Async browser detection
  useEffect(() => {
    detectBrowser().then(setBrowser);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("prompt"), 800);
    const t2 = setTimeout(() => setPhase("packages"), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (phase !== "packages") return;
    PACKAGES.forEach((_, i) => {
      setTimeout(() => {
        setInstalledCount((c) => c + 1);
      }, i * 800 + 200);
    });
    const t = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onFinish, 800);
    }, PACKAGES.length * 800 + 1000);
    return () => clearTimeout(t);
  }, [phase, onFinish]);

  return (
    <div
      className="loading-screen-container"
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        zIndex: 9999,
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        padding: "clamp(1.5rem, 4vw, 3rem)",
        color: "#e0e0e0",
        fontSize: "clamp(12px, 1.5vw, 14px)",
        lineHeight: 1.75,
        transition: "opacity 0.8s ease",
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      {/* Browser line */}
      <p style={{ color: "#c084fc", marginBottom: "0.25rem" }}>
        {browser}
      </p>

      {/* Copyright */}
      <p style={{ color: "#555", fontSize: "0.85em", marginBottom: "1.5rem" }}>
        (c) Mushke Rohith Reddy. All rights reserved.
      </p>

      {/* Prompt */}
      {phase !== "browser" && (
        <p style={{ color: "#c084fc", marginBottom: "0.5rem" }}>
          C:\Software_engineer\Developer\Data_analyst\Portfolio&gt;{" "}
          <TextType
            text="npm run dev"
            typingSpeed={60}
            loop={false}
            className="loading-prompt"
            style={{ color: "#fff", display: "inline-block" }}
          />
        </p>
      )}

      {/* vite output header */}
      {(phase === "packages" || installedCount > 0) && (
        <p style={{ color: "#555", fontSize: "0.8em", marginBottom: "0.75rem" }}>
          &gt; portfolio@1.0.0 dev<br />
          &gt; vite
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
            animation: "slideIn 0.3s ease",
            marginBottom: "2px",
          }}
        >
          <span style={{ color: "#4ade80", fontSize: "0.85em" }}>✓</span>
          <span style={{ color: "#c084fc" }}>{pkg}</span>
          <span style={{ color: "#888" }}>successfully installed</span>
        </div>
      ))}

      {/* Ready line */}
      {installedCount === PACKAGES.length && (
        <p style={{ color: "#555", marginTop: "1rem", fontSize: "0.8em" }}>
          &gt; Portfolio ready. Launching...
        </p>
      )}

      {/* Bottom progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "2px",
          background: "#c084fc",
          transition: `width ${(PACKAGES.length * 800 + 1000) / 1000}s linear`,
          width: phase === "packages" ? "100%" : "0%",
        }}
      />

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .loading-prompt .text-type__content {
          font-size: 14px !important;
          font-weight: normal !important;
          font-family: inherit !important;
          line-height: inherit !important;
          letter-spacing: inherit !important;
        }
        @media (max-width: 600px) {
          .loading-screen-container {
            padding: 1rem !important;
          }
          .loading-prompt .text-type__content {
            font-size: 12px !important;
          }
        }
        .loading-screen-container p, .loading-screen-container div {
          word-break: break-word;
          overflow-wrap: break-word;
        }
      `}</style>
    </div>
  );
}