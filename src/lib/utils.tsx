import React from "react";
import type { Post } from "../types";

export const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? (crypto as any).randomUUID()
    : Math.random().toString(36).slice(2, 10);

export const now = () => Date.now();

export const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

export const formatCount = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : String(n);

export function timeAgo(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}

// Convert a File to base64 data URL (browser-only; guarded at call site)
export const readAsDataURL = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

// Placeholder image (SVG data URI)
export const placeholderImg =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='#e5e7eb'/>
          <stop offset='100%' stop-color='#c7cbd1'/>
        </linearGradient>
      </defs>
      <rect width='100%' height='100%' fill='url(#g)'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#6b7280' font-family='system-ui' font-size='28'>Image</text>
    </svg>`
  );

// Basic rich text display: turn URLs and #hashtags into minimal elements
export function renderRichText(text: string): React.ReactNode {
  const parts = text.split(/(https?:\/\/\S+|#[\p{L}0-9_]+)/u);
  return (
    <>
      {parts.map((p, i) => {
        if (!p) return null;
        if (/^https?:\/\//.test(p))
          return (
            <a key={i} href={p} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
              {p}
            </a>
          );
        if (/^#[\p{L}0-9_]+$/u.test(p))
          return (
            <span key={i} className="px-2 py-0.5 rounded-full border text-xs ml-1">
              {p}
            </span>
          );
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

// tiny self-tests (no-op export so we can call it in App on first mount)
export function runSelfTests() {
  // Ensure helper types compile against Post
  const _p: Post = {
    id: "1",
    userId: "u1",
    type: "text",
    content: "hello",
    likes: 0,
    recasts: 0,
    comments: 0,
    created_at: Date.now(),
  };
  if (!_p) return; // silence unused var
}
