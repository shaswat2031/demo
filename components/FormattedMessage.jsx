"use client";

import React from "react";

/**
 * Parses inline formatting tokens:
 * - **bold** or __bold__
 * - `code`
 * - *italic* or _italic_
 * - [link text](url)
 */
function parseInline(text) {
  if (!text) return null;

  // Match:
  // 1) **bold** or __bold__
  // 2) `code`
  // 3) [link text](url)
  // 4) *italic* or _italic_
  const tokenRegex = /(\*\*[^*]+?\*\*|__[^_]+?__|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*]+?\*|_[^_]+?_)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Bold: **text** or __text__
    if (
      (part.startsWith("**") && part.endsWith("**") && part.length >= 4) ||
      (part.startsWith("__") && part.endsWith("__") && part.length >= 4)
    ) {
      const content = part.slice(2, -2);
      return (
        <strong key={index} className="font-bold text-slate-900 tracking-tight">
          {content}
        </strong>
      );
    }

    // Inline code: `code`
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      const content = part.slice(1, -1);
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-xs text-blue-700 font-medium"
        >
          {content}
        </code>
      );
    }

    // Markdown link: [text](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline font-medium hover:text-blue-800"
        >
          {linkMatch[1]}
        </a>
      );
    }

    // Italic: *text* or _text_
    if (
      (part.startsWith("*") && part.endsWith("*") && part.length >= 2) ||
      (part.startsWith("_") && part.endsWith("_") && part.length >= 2)
    ) {
      const content = part.slice(1, -1);
      return (
        <em key={index} className="italic text-slate-700">
          {content}
        </em>
      );
    }

    // Fallback: strip any stray or orphaned ** from plain text so it never shows
    return typeof part === "string" ? part.replace(/\*\*/g, "") : part;
  });
}

/**
 * Formats AI responses and document intelligence messages:
 * - Eliminates raw `**` syntax and renders styled bold text
 * - Cleanly indents and aligns bullet points (•, -, *)
 * - Highlights numbered sections with distinct headers
 * - Gracefully parses headers, code snippets, and paragraphs
 */
export default function FormattedMessage({ text, className = "" }) {
  if (!text || typeof text !== "string") return null;

  const rawLines = text.replace(/\r\n/g, "\n").split("\n");
  const renderedElements = [];
  let inCodeBlock = false;
  let codeBlockLines = [];

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];
    const trimmed = line.trim();

    // Check for fenced code block ```
    if (trimmed.startsWith("```")) {
      if (inCodeBlock) {
        // End code block
        renderedElements.push(
          <pre
            key={`code-${i}`}
            className="p-3.5 my-2.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto shadow-inner"
          >
            <code>{codeBlockLines.join("\n")}</code>
          </pre>
        );
        codeBlockLines = [];
        inCodeBlock = false;
      } else {
        // Start code block
        inCodeBlock = true;
        codeBlockLines = [];
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    // Empty line -> spacing
    if (trimmed === "") {
      const prevElement = renderedElements[renderedElements.length - 1];
      if (prevElement && prevElement.key && !prevElement.key.startsWith("empty-")) {
        renderedElements.push(<div key={`empty-${i}`} className="h-2" />);
      }
      continue;
    }

    // Markdown Headings
    if (trimmed.startsWith("### ")) {
      renderedElements.push(
        <h5 key={`h3-${i}`} className="font-semibold text-slate-900 text-sm mt-3 mb-1">
          {parseInline(trimmed.slice(4))}
        </h5>
      );
      continue;
    }
    if (trimmed.startsWith("## ")) {
      renderedElements.push(
        <h4 key={`h2-${i}`} className="font-bold text-slate-900 text-base mt-3.5 mb-1.5">
          {parseInline(trimmed.slice(3))}
        </h4>
      );
      continue;
    }
    if (trimmed.startsWith("# ")) {
      renderedElements.push(
        <h3 key={`h1-${i}`} className="font-bold text-slate-900 text-lg mt-4 mb-2">
          {parseInline(trimmed.slice(2))}
        </h3>
      );
      continue;
    }

    // Numbered Section Titles like "1. Concrete Cracks in Spillway Section"
    const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (numberedMatch) {
      renderedElements.push(
        <div
          key={`num-${i}`}
          className="font-semibold text-slate-900 text-[14.5px] mt-3.5 mb-1.5 flex items-baseline gap-2"
        >
          <span className="text-blue-600 font-bold shrink-0">{numberedMatch[1]}.</span>
          <span className="flex-1 font-semibold text-slate-900">{parseInline(numberedMatch[2])}</span>
        </div>
      );
      continue;
    }

    // Bullet points: • or - or * (with space for - and *)
    const bulletMatch = trimmed.match(/^(?:[•]\s*|[\-\*]\s+)(.*)$/);
    if (bulletMatch) {
      renderedElements.push(
        <div key={`bullet-${i}`} className="flex items-start gap-2.5 my-1 pl-1 leading-relaxed text-slate-800">
          <span className="text-blue-500 font-bold text-sm leading-relaxed shrink-0 select-none">•</span>
          <div className="flex-1 min-w-0">
            {parseInline(bulletMatch[1])}
          </div>
        </div>
      );
      continue;
    }

    // Standard paragraph line
    renderedElements.push(
      <p key={`p-${i}`} className="my-1 leading-relaxed text-slate-800">
        {parseInline(trimmed)}
      </p>
    );
  }

  // Handle unclosed code block if any
  if (inCodeBlock && codeBlockLines.length > 0) {
    renderedElements.push(
      <pre
        key="code-unclosed"
        className="p-3.5 my-2.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto shadow-inner"
      >
        <code>{codeBlockLines.join("\n")}</code>
      </pre>
    );
  }

  return (
    <div className={`space-y-0.5 text-sm text-slate-800 ${className}`}>
      {renderedElements}
    </div>
  );
}
