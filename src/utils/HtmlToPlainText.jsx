import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa"; // Example icon for links

const convertNodeToJSX = (node, id) => {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent;
  }

  const tag = node.tagName.toLowerCase();
  const children = Array.from(node.childNodes).map((child) =>
    convertNodeToJSX(child, id)
  );

  const styles = {
    h1: "text-3xl font-bold text-gray-800 mb-4",
    h2: "text-2xl font-semibold text-gray-700 mb-3",
    p: "text-base text-gray-600 leading-relaxed mb-4",
    li: "text-sm text-gray-600 mb-2",
    a: "text-blue-600 hover:text-blue-700 inline-flex items-center gap-2",
    img: "w-full max-w-4xl h-auto rounded-lg shadow-md mb-6",
  };

  switch (tag) {
    case "div":
      return <div className="mb-4">{children}</div>;
    case "h1":
      return <h1 className={styles.h1}>{children}</h1>;
    case "h2":
      return <h2 className={styles.h2}>{children}</h2>;
    case "h3":
      return <h3 className={styles.h2}>{children}</h3>;
    case "p":
      return <p className={styles.p}>{children}</p>;
    case "li":
      return (
        <li key={Math.random() * 10 + id} className={styles.li}>
          {children}
        </li>
      );
    case "a":
      return (
        <a
          className={styles.a}
          href={node.getAttribute("href")}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          {children} <FaExternalLinkAlt />
        </a>
      );
    case "img":
      return (
        <img
          className={styles.img}
          src={node.getAttribute("src")}
          alt={node.getAttribute("alt") || ""}
        />
      );
    default:
      return <span>{children}</span>; // Fallback for unhandled tags
  }
};

// Main component
export default function HtmlToPlainText({ htmlContent, id }) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");
  const body = doc.body;

  const elements = Array.from(body.childNodes).map((node) =>
    convertNodeToJSX(node, id)
  );

  return <div className="container mx-auto px-4 py-8">{elements}</div>;
}
