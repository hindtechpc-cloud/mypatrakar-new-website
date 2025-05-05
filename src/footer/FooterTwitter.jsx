import React, { useEffect } from "react";

const FooterTwitter = () => {
  const account = "@Arvind827502";  // Replace with your Twitter account

  useEffect(() => {
    // Dynamically load Twitter embed script
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script tag if the component is removed
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex justify-center items-center p-4 rounded-lg">
      <a
        className="twitter-timeline"
        data-width="100%" // This makes it responsive
        data-height="310" // This controls the height of the widget
        data-theme="light" // You can set it to 'dark' if you prefer a dark mode theme
        data-chrome="noheader nofooter noborders transparent" // Customize the widget (remove header, footer, etc.)
        href={`https://twitter.com/${account}?ref_src=twsrc%5Etfw`} // Link to the Twitter account
      >
        Tweets by {account}
         {/* // Displayed if the widget fails to load */}
      </a>
    </div>
  );
};

export default FooterTwitter;
