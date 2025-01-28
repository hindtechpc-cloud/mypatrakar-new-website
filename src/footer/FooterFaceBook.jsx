
export default function FooterFaceBook() {
  return (
    <div className="flex justify-center items-center p-1 rounded-lg ">
      <iframe
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FBharatSamacharTV&amp;tabs=timeline&amp;small_header=true&amp;width=230&amp;adapt_container_width=true&amp;hide_cover=false&amp;show_facepile=true&amp;appId=2403244613331014"
      
        className="border-none overflow-hidden rounded-md w-full h-[500px] sm:h-[500px] md:h-[310px] lg:h-[310px] sm:w-[full] md:w-[200px] lg:w-[200px]"
        scrolling="no"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};
