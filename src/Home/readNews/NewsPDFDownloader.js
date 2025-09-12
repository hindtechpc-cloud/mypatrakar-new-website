// import { jsPDF } from "jspdf";

// // Convert HTML to plain text
// const stripHtml = (html) => {
//   const div = document.createElement("div");
//   div.innerHTML = html;
//   return div.textContent || div.innerText || "";
// };

// // Convert image URL to base64
// const toDataURL = (url) =>
//   fetch(url)
//     .then((res) => res.blob())
//     .then(
//       (blob) =>
//         new Promise((resolve, reject) => {
//           const reader = new FileReader();
//           reader.onloadend = () => resolve(reader.result);
//           reader.onerror = reject;
//           reader.readAsDataURL(blob);
//         })
//     );

// // Format label for display
// const formatLabel = (key) => {
//   return key
//     .replace(/_/g, ' ')
//     .replace(/\b\w/g, l => l.toUpperCase());
// };

// // Main PDF generator function - Newspaper Style
// export const handleDownloadPDF = async (type, news) => {
//   // Initialize PDF with newspaper-like dimensions
//   const doc = new jsPDF("p", "mm", [297, 420]); // A3 size for newspaper feel
//   const pageWidth = doc.internal.pageSize.getWidth();
//   const margin = 15;
//   let currentY = margin;

//   // Add newspaper name header
//   doc.setFont("times", "bold");
//   doc.setFontSize(24);
//   doc.setTextColor(40, 40, 40);
//   doc.text("DAILY CHRONICLE", pageWidth / 2, currentY, { align: "center" });
//   currentY += 10;

//   // Add date line
//   doc.setFont("times", "normal");
//   doc.setFontSize(10);
//   doc.setTextColor(100, 100, 100);
//   const today = new Date();
//   const dateString = today.toLocaleDateString('en-US', { 
//     weekday: 'long', 
//     year: 'numeric', 
//     month: 'long', 
//     day: 'numeric' 
//   });
//   doc.text(`VOL. 1, NO. 1 • ${dateString.toUpperCase()}`, pageWidth / 2, currentY, { align: "center" });
  
//   // Add divider line
//   currentY += 5;
//   doc.setDrawColor(200, 200, 200);
//   doc.line(margin, currentY, pageWidth - margin, currentY);
//   currentY += 10;

//   // -------------------------------
//   // � MAIN HEADLINE SECTION
//   // -------------------------------
//   doc.setFont("times", "bold");
//   doc.setFontSize(28);
//   doc.setTextColor(0, 0, 0);
//   const headlineLines = doc.splitTextToSize(news.news_headline || "BREAKING NEWS", pageWidth - 2 * margin);
//   doc.text(headlineLines, margin, currentY);
//   currentY += headlineLines.length * 10 + 5;

//   // -------------------------------
//   // 🧑 REPORTER SECTION (with image)
//   // -------------------------------
//   doc.setFont("times", "italic");
//   doc.setFontSize(10);
//   doc.setTextColor(100, 100, 100);

//   if (news.reporter_img) {
//     try {
//       const avatar = await toDataURL(news.reporter_img);
//       // Circular reporter image
//       doc.roundedRect(margin, currentY - 5, 20, 20, 10, 10, 'F');
//       doc.addImage(avatar, "PNG", margin + 2, currentY - 3, 16, 16, undefined, 'none', 0);
//       doc.text(`By ${news.reporter_name || "Staff Reporter"}`, margin + 25, currentY + 8);
//     } catch (err) {
//       console.warn("Reporter image failed to load:", err);
//       doc.text(`By ${news.reporter_name || "Staff Reporter"}`, margin, currentY + 8);
//     }
//   } else {
//     doc.text(`By ${news.reporter_name || "Staff Reporter"}`, margin, currentY + 8);
//   }

//   currentY += 15;

//   // -------------------------------
//   // 🖼 NEWS IMAGE (Full Width with caption)
//   // -------------------------------
//   if (news.news_img_url) {
//     try {
//       const fullImageUrl = news.news_img_url.startsWith("http")
//         ? news.news_img_url
//         : `${import.meta.env.VITE_REACT_APP_API_URL_Image}${news.news_img_url}`;

//       const imageData = await toDataURL(fullImageUrl);
//       const imageWidth = pageWidth - 2 * margin;
//       const imageHeight = 120; // Fixed height for newspaper style
      
//       doc.addImage(imageData, "PNG", margin, currentY, imageWidth, imageHeight, undefined, 'FAST');
      
//       // Add image caption
//       doc.setFont("times", "italic");
//       doc.setFontSize(8);
//       doc.setTextColor(100, 100, 100);
//       doc.text("Featured Story Image", margin, currentY + imageHeight + 5);
      
//       currentY += imageHeight + 10;
//     } catch (err) {
//       console.error("News image failed to load:", err);
//     }
//   }

//   // Add divider line
//   doc.setDrawColor(200, 200, 200);
//   doc.line(margin, currentY, pageWidth - margin, currentY);
//   currentY += 10;

//   // -------------------------------
//   // 📰 COLUMNS FOR CONTENT (Newspaper style)
//   // -------------------------------
//   const columnWidth = (pageWidth - 3 * margin) / 2;
//   let column1Y = currentY;
//   let column2Y = currentY;

//   // Left Column (Main story)
//   doc.setFont("times", "normal");
//   doc.setFontSize(12);
//   doc.setTextColor(0, 0, 0);

//   const plainText = stripHtml(news.news_description_html || "No description available");
//   const contentLines = doc.splitTextToSize(plainText, columnWidth);
  
//   // First paragraph with drop cap
//   if (contentLines.length > 0) {
//     const firstPara = contentLines[0];
//     doc.setFontSize(24);
//     doc.text(firstPara.charAt(0), margin, column1Y + 10);
//     doc.setFontSize(12);
//     doc.text(firstPara.substring(1), margin + 8, column1Y + 10, { maxWidth: columnWidth - 8 });
//     column1Y += 10;
    
//     // Remaining paragraphs
//     for (let i = 1; i < contentLines.length; i++) {
//       if (column1Y < 280) { // Prevent overflow
//         doc.text(contentLines[i], margin, column1Y + 5, { maxWidth: columnWidth });
//         column1Y += 7;
//       }
//     }
//   }

//   // Right Column (Additional info)
//   doc.setFont("times", "bold");
//   doc.setFontSize(14);
//   doc.text("Story Details", margin * 2 + columnWidth, column2Y);
//   column2Y += 8;

//   doc.setFont("times", "normal");
//   doc.setFontSize(10);

//   const details = [
//     { label: "Category", value: news.news_category_name },
//     { label: "News ID", value: news.news_id },
//     { label: "Published", value: new Date().toLocaleDateString() },
//     { label: "Views", value: news.views_count },
//     { label: "Comments", value: news.comments_count }
//   ];

//   details.forEach(item => {
//     if (item.value) {
//       doc.setFont("times", "bold");
//       doc.text(`${item.label}:`, margin * 2 + columnWidth, column2Y);
//       doc.setFont("times", "normal");
//       doc.text(item.value.toString(), margin * 2 + columnWidth + 25, column2Y);
//       column2Y += 7;
//     }
//   });

//   // If video available, add to right column
//   if (news.is_video === "1" && news.news_video_url) {
//     column2Y += 5;
//     doc.setFont("times", "bold");
//     doc.text("Video Content:", margin * 2 + columnWidth, column2Y);
//     column2Y += 5;
    
//     doc.setFont("times", "normal");
//     const videoLines = doc.splitTextToSize(news.news_video_url, columnWidth);
//     doc.text(videoLines, margin * 2 + columnWidth, column2Y);
//     column2Y += videoLines.length * 7 + 5;
//   }

//   // -------------------------------
//   // 📌 FOOTER
//   // -------------------------------
//   doc.setFont("times", "italic");
//   doc.setFontSize(8);
//   doc.setTextColor(100, 100, 100);
//   doc.text(`© ${new Date().getFullYear()} Daily Chronicle. All rights reserved.`, margin, 400);

//   // -------------------------------
//   // 💾 SAVE FILE
//   // -------------------------------
//   const fileName = `${(news.news_headline || "daily_news").slice(0, 50)}.pdf`.replace(/[^a-z0-9]/gi, '_');
//   doc.save(fileName);
// };



import { jsPDF } from "jspdf";
import { NotoSansDevanagari } from "../../assets/fonts/NotoSansDevanagari";
import axios from "axios";

// Register Hindi Unicode Font
const registerHindiFont = (doc) => {
  doc.addFileToVFS("NotoSansDevanagari-Regular.ttf", NotoSansDevanagari);
  doc.addFont("NotoSansDevanagari-Regular.ttf", "Noto", "normal");
};

// Check if text contains Hindi (Devanagari) characters
const hasHindi = (text) => {
  if (!text) return false;
  return /[\u0900-\u097F]/.test(text);
};

// Strip HTML tags from string
const stripHtml = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

// Convert image URL to base64 using axios
const toDataURL = async (url) => {
  try {
    const response = await axios.get(url, {
      responseType: "blob",
    });
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(response.data);
    });
  } catch (error) {
    console.error("Image loading failed:", error);
    return null;
  }
};

export const handleDownloadPDF = async (type, news) => {
  const doc = new jsPDF("p", "mm", [297, 420]); // A3 size
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  let currentY = margin;

  // Headline text (sanitize Unicode + remove control chars)
  const rawHeadline = news.news_headline || "BREAKING NEWS";
  const headlineText = rawHeadline
    .normalize("NFC")
    .replace(/[^\P{C}\n]+/gu, ""); // Remove control chars

  // Check if headline contains Hindi
  const headlineIsHindi = hasHindi(headlineText);

  // Set font based on headline language
  if (headlineIsHindi) {
    registerHindiFont(doc);
    doc.setFont("Noto", "normal");
  } else {
    doc.setFont("times", "bold");
  }

  // Newspaper name header (English)
  doc.setFontSize(24);
  doc.setTextColor(40, 40, 40);
  doc.text("DAILY CHRONICLE", pageWidth / 2, currentY, { align: "center" });
  currentY += 10;

  // Date line (English)
  doc.setFont(headlineIsHindi ? "Noto" : "times", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const today = new Date();
  const dateString = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.text(`VOL. 1, NO. 1 • ${dateString.toUpperCase()}`, pageWidth / 2, currentY, {
    align: "center",
  });
  currentY += 5;

  doc.setDrawColor(200, 200, 200);
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 10;

  // Headline (exact text, no sanitize beyond above)
  doc.setFont(headlineIsHindi ? "Noto" : "times", "bold");
  doc.setFontSize(28);
  doc.setTextColor(0, 0, 0);
  const headlineLines = doc.splitTextToSize(headlineText, pageWidth - 2 * margin);
  doc.text(headlineLines, margin, currentY);
  currentY += headlineLines.length * 10 + 5;

  // Reporter section
  doc.setFont(headlineIsHindi ? "Noto" : "times", "italic");
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  if (news.reporter_img) {
    try {
      const avatar = await toDataURL(news.reporter_img);
      if (avatar) {
        doc.roundedRect(margin, currentY - 5, 20, 20, 10, 10, "F");
        doc.addImage(avatar, "PNG", margin + 2, currentY - 3, 16, 16);
      }
      doc.text(`By ${news.reporter_name || "Staff Reporter"}`, margin + 25, currentY + 8);
    } catch {
      doc.text(`By ${news.reporter_name || "Staff Reporter"}`, margin, currentY + 8);
    }
  } else {
    doc.text(`By ${news.reporter_name || "Staff Reporter"}`, margin, currentY + 8);
  }
  currentY += 15;

  // News image section
  if (news.news_img_url) {
    try {
      const fullImageUrl = news.news_img_url.startsWith("https")
        ? news.news_img_url
        : `${import.meta.env.VITE_REACT_APP_API_URL_Image}${news.news_img_url}`;
      const imageData = await toDataURL(fullImageUrl);
      if (imageData) {
        const imageWidth = pageWidth - 2 * margin;
        const imageHeight = 120;
        doc.addImage(imageData, "PNG", margin, currentY, imageWidth, imageHeight, undefined, "FAST");

        doc.setFont(headlineIsHindi ? "Noto" : "times", "italic");
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text("Featured Story Image", margin, currentY + imageHeight + 5);

        currentY += imageHeight + 10;
      }
    } catch (err) {
      console.log("Image error:", err);
    }
  }

  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 10;

  // Content columns
  const columnWidth = (pageWidth - 3 * margin) / 2;
  let column1Y = currentY;
  let column2Y = currentY;

  // Content description
  const descHtml = news.news_description_html || "No description available";
  const plainText = stripHtml(descHtml);
  const contentIsHindi = hasHindi(plainText);

  if (contentIsHindi) {
    registerHindiFont(doc);
    doc.setFont("Noto", "normal");
  } else {
    doc.setFont("times", "normal");
  }
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);

  const contentLines = doc.splitTextToSize(plainText, columnWidth);

  if (contentLines.length > 0) {
    // Drop cap first letter
    const firstPara = contentLines[0];
    const firstChar = firstPara.charAt(0);
    doc.setFont(contentIsHindi ? "Noto" : "times", "bold");
    doc.setFontSize(24);
    doc.text(firstChar, margin, column1Y + 10);

    // Rest of first line
    doc.setFont(contentIsHindi ? "Noto" : "times", "normal");
    doc.setFontSize(12);
    doc.text(firstPara.substring(1), margin + 8, column1Y + 10, {
      maxWidth: columnWidth - 8,
    });

    column1Y += 10;

    // Remaining lines
    for (let i = 1; i < contentLines.length; i++) {
      if (column1Y < 280) {
        doc.setFont(contentIsHindi ? "Noto" : "times", "normal");
        doc.setFontSize(12);
        doc.text(contentLines[i], margin, column1Y + 5, { maxWidth: columnWidth });
        column1Y += 7;
      }
    }
  }

  // Story Details right column
  doc.setFont(headlineIsHindi || contentIsHindi ? "Noto" : "times", "bold");
  doc.setFontSize(14);
  doc.text("Story Details", margin * 2 + columnWidth, column2Y);
  column2Y += 8;

  doc.setFont(headlineIsHindi || contentIsHindi ? "Noto" : "times", "normal");
  doc.setFontSize(10);

  const details = [
    { label: "Category", value: news.news_category_name },
    { label: "News ID", value: news.news_id },
    { label: "Published", value: new Date().toLocaleDateString() },
    { label: "Views", value: news.views_count },
    { label: "Comments", value: news.comments_count },
  ];

  details.forEach((item) => {
    if (item.value) {
      doc.setFont(headlineIsHindi || contentIsHindi ? "Noto" : "times", "bold");
      doc.text(`${item.label}:`, margin * 2 + columnWidth, column2Y);
      doc.setFont(headlineIsHindi || contentIsHindi ? "Noto" : "times", "normal");
      doc.text(item.value.toString(), margin * 2 + columnWidth + 25, column2Y);
      column2Y += 7;
    }
  });

  // Video content (optional)
  if (news.is_video === "1" && news.news_video_url) {
    column2Y += 5;
    doc.setFont(headlineIsHindi || contentIsHindi ? "Noto" : "times", "bold");
    doc.text("Video Content:", margin * 2 + columnWidth, column2Y);
    column2Y += 5;
    doc.setFont(headlineIsHindi || contentIsHindi ? "Noto" : "times", "normal");
    const videoLines = doc.splitTextToSize(news.news_video_url, columnWidth);
    doc.text(videoLines, margin * 2 + columnWidth, column2Y);
    column2Y += videoLines.length * 7 + 5;
  }

  // Footer (usually English or italic Hindi)
  doc.setFont(headlineIsHindi || contentIsHindi ? "Noto" : "times", "italic");
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text(`© ${new Date().getFullYear()} Daily Chronicle. All rights reserved.`, margin, 400);

  // Sanitize filename for saving PDF
  const safeFileName = (headlineText || "daily_news")
    .slice(0, 50)
    .replace(/[^\w\u0900-\u097F]+/g, "_")
    .replace(/^_+|_+$/g, "");

  doc.save(safeFileName + ".pdf");
};
