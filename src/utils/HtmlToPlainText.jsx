// // src/utils/HtmlToPlainText.jsx
// import React from "react";
// import { FaExternalLinkAlt } from "react-icons/fa"; // Example icon for links

// const convertNodeToJSX = (node, id,style) => {
//   if (node.nodeType === Node.TEXT_NODE) {
//     return node.textContent;
//   }

//   const tag = node?.tagName?.toLowerCase();
//   const children = Array.from(node.childNodes).map((child) =>
//     convertNodeToJSX(child, id)
//   );

//   const styles = {
//     h1: "text-3xl font-bold text-gray-800 mb-4",
//     h2: "text-2xl font-semibold text-gray-700 mb-3",
//     p: "text-base text-gray-600 leading-relaxed mb-4",
//     li: "text-sm text-gray-600 mb-2",
//     a: "text-blue-600 hover:text-blue-700 inline-flex items-center gap-2",
//     img: "w-full max-w-4xl h-auto rounded-lg shadow-md mb-6",
//   };

//   switch (tag) {
//     case "div":
//       return <div className="mb-4">{children}</div>;
//     case "h1":
//       return <h1 className={styles.h1}>{children}</h1>;
//     case "h2":
//       return <h2 className={styles.h2}>{children}</h2>;
//     case "h3":
//       return <h3 className={styles.h2}>{children}</h3>;
//     case "p":
//       return <p className={styles.p} style={style}>{children}</p>;
//     case "li":
//       return (
//         <li key={Math.random() * 10 + id} className={styles.li}>
//           {children}
//         </li>
//       );
//     case "a":
//       return (
//         <a
//           className={styles.a}
//           href={node.getAttribute("href")}
//           target="_blank"
//           rel="nofollow noopener noreferrer"
//         >
//           {children} <FaExternalLinkAlt />
//         </a>
//       );
//     case "img":
//       return (
//         <img
//           className={styles.img}
//           src={node.getAttribute("src")}
//           alt={node.getAttribute("alt") || ""}
//         />
//       );
//     default:
//       return <span>{children}</span>; // Fallback for unhandled tags
//   }
// };

// // Main component
// export default function HtmlToPlainText({ htmlContent, id,style }) {
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(htmlContent, "text/html");
//   const body = doc.body;

//   const elements = Array.from(body.childNodes).map((node) =>
//     convertNodeToJSX(node, id,style)
//   );

//   return <div className="container mx-auto px-4 py-8" style={style}>{elements}</div>;
// }

// src/utils/HtmlToPlainText.jsx
import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

const convertNodeToJSX = (node, id, style) => {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent;
  }

  const tag = node?.tagName?.toLowerCase();
  const children = Array.from(node.childNodes).map((child) =>
    convertNodeToJSX(child, id)
  );

  const styles = {
    h1: "text-[20px] font-bold text-gray-800 mb-4",
    h2: "text-2xl font-semibold text-gray-700 mb-3",
    p: " text-black leading-relaxed md:mb-4 mb- font-Noto Sans Dev",
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
      return (
        <p className={styles.p} style={{ fontFamily: "Noto Sans Devanagari" }}>
          {children}
        </p>
      );
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
      return <span>{children}</span>; // Fallback
  }
};

// Main component
export default function HtmlToPlainText({
  htmlContent,
  id,
  style,
  maxLength = 100,
}) {
  const [expanded, setExpanded] = useState(false);

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");
  const body = doc.body;

  // Extract plain text for length calculation
  const plainText = body.innerText || "";

  // Check length
  const shouldTruncate = maxLength && plainText.length > maxLength;
  const displayText =
    shouldTruncate && !expanded ? plainText.substring(0, maxLength) : plainText;

  // Parse again for JSX (only if not truncated)
  const elements = Array.from(body.childNodes).map((node) =>
    convertNodeToJSX(node, id, style)
  );

  return (
    <div className="container md:mx-auto mx-0 py-2" style={style}>
      {shouldTruncate && !expanded ? (
        <p className="text-base text-gray-600 leading-relaxed mb-4">
          {displayText}
          <button
            onClick={() => setExpanded(true)}
            className="ml-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            {/* ... */}
          </button>
        </p>
      ) : (
        <div style={style}>{elements}</div>
      )}
    </div>
  );
}
