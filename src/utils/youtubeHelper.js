// utils/youtubeHelper.js
export const extractChannelIdOrUsername = (url) => {
  const channelRegex = /youtube\.com\/channel\/([^/?]+)/;
  const handleRegex = /youtube\.com\/@([^/?]+)/;
  const usernameRegex = /youtube\.com\/user\/([^/?]+)/;

  if (channelRegex.test(url)) {
    return { type: "channelId", value: url.match(channelRegex)[1] };
  } else if (handleRegex.test(url)) {
    return { type: "handle", value: url.match(handleRegex)[1] };
  } else if (usernameRegex.test(url)) {
    return { type: "username", value: url.match(usernameRegex)[1] };
  } else {
    return null;
  }
};
