
export default function FooterFaceBook() {
  const url='HindtechLucknow';
  return (
    <div className="flex justify-center items-center p-1 rounded-lg ">
      <iframe
    src={`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F${url}&tabs=timeline&small_header=true&width=300&adapt_container_width=true&hide_cover=false&show_facepile=true`}
      
        className="border-none overflow-hidden rounded-md w-full h-[500px] sm:h-[500px] md:h-[310px] lg:h-[310px] sm:w-[full] md:w-[250px] lg:w-[250px]"
        scrolling="no"
        frameBorder="0"
        allowFullScreen
        style={{ border: "none", overflow: "hidden" }}
        data-chrome="noscrollbar"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};
