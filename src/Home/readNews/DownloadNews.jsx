import { jsPDF } from "jspdf";

export default function DownloadNews({news}) {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(news.title, 10, 20);

    // Content (Wrapped text)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const contentLines = doc.splitTextToSize(news.content, 180); // Wrap text within 180mm width
    doc.text(contentLines, 10, 40);

    // Save PDF
    doc.save(`${news.title}.pdf`);
  };

  return (
    <div className="bg-white p-2 rounded-lg">
      <div className="text-lg font-bold text-gray-800 my-2" style={{ fontSize: `${zoomText + 5}px` }}>
        {news?.title}
      </div>
      <div>
        <p style={{ fontSize: `${zoomText}px` }}>{news?.content}</p>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownloadPDF}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Download as PDF
      </button>
    </div>
  );
}
