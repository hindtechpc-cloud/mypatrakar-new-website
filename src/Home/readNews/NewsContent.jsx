import HtmlToPlainText from "../../utils/HtmlToPlainText";

export default function NewsContent({ news, type, zoomText }) {
  return (
    <>
      <div
        className="text-lg font-bold text-gray-800 my-2"
        style={{ fontSize: `${zoomText + 5}px` }}
      >
        {type === "shorts" ? news.news_title : news.news_headline}
      </div>
      <div style={{ fontSize: `${zoomText + 5}px` }}>
        <HtmlToPlainText
          maxLength={2000}
          htmlContent={
            type === "shorts"
              ? news.news_des
              : news.news_description_html || news.news_description
          }
          style={{ fontSize: `${zoomText + 5}px` }}
        />
      </div>
    </>
  );
}
