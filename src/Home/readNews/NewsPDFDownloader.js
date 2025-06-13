import { jsPDF } from "jspdf";

// Convert HTML to plain text
const stripHtml = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

export const handleDownloadPDF = async (type, news) => {
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  let currentY = 20;

  // Convert image URL to base64
  const toDataURL = (url) =>
    fetch(url)
      .then((res) => res.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );

  // Title
  doc.setFont("times", "bold");
  doc.setFontSize(20);
  doc.text(news.news_title || news.news_headline, 10, currentY);
  currentY += 10;

  // Metadata
  doc.setFont("times", "italic");
  doc.setFontSize(10);
  doc.text(
    `By ${news.reporter_name || "Reporter"} | ${new Date(
      news.publishedAt || Date.now()
    ).toLocaleString()} | ${news.location || "Location"}`,
    10,
    currentY
  );
  currentY += 8;

  // Category
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(
    `Category: ${news.category || news.news_category_name || "N/A"}`,
    10,
    currentY
  );
  currentY += 10;

  // Image (if present)
  if (news.news_img || news.news_img_url) {
    try {
      const imageUrl = `${import.meta.env.VITE_REACT_APP_API_URL_Image}${
        type === "shorts" ? news?.news_img : news?.news_img_url
      }`;

      const imageData = await toDataURL(imageUrl);
      const imageHeight = 60;
      doc.addImage(imageData, "JPEG", 10, currentY, pageWidth - 20, imageHeight);
      currentY += imageHeight + 5;
    } catch (err) {
      console.error("Image load failed:", err);
    }
  }

  // Description
  doc.setFont("times", "normal");
  doc.setFontSize(12);
  const plainText = stripHtml(news.news_des || news.news_description || "");
  const contentLines = doc.splitTextToSize(plainText, pageWidth - 20);
  doc.text(contentLines, 10, currentY);
  currentY += contentLines.length * 6;

  // Views and Comments
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.text(
    `Views: ${news.views_count || news.views || 0} | Comments: ${
      news.comments_count || news.comments || 0
    }`,
    10,
    currentY
  );
  currentY += 10;

  // Author links (if any)
  if (news.links?.length) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Follow the author:", 10, currentY);
    currentY += 7;

    doc.setFont("helvetica", "normal");
    news.links.forEach((link) => {
      doc.textWithLink(link.name, 12, currentY, { url: link.url });
      currentY += 6;
    });
  }

  // Footer source
  doc.setFontSize(10);
  doc.setFont("times", "italic");
  doc.text(`Source: ${news.reporter_name || "Unknown"}`, 10, 290);

  // Save PDF
  doc.save(`${(news.news_title || news.news_headline).slice(0, 50)}.pdf`);
};
