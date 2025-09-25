// /utils/youtubeHelper.js
export const extractChannelIdOrUsername = (url) => {
  const channelRegex = /youtube\.com\/channel\/([^/?]+)/;
  const handleRegex = /youtube\.com\/@([^/?]+)/;

  if (channelRegex.test(url)) {
    return { type: "channelId", value: url.match(channelRegex)[1] };
  } else if (handleRegex.test(url)) {
    return { type: "username", value: url.match(handleRegex)[1] };
  } else {
    return null;
  }
};
