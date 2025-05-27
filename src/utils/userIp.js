export const getUserIP = async () => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip; // This is the user's public IP
  } catch (error) {
    console.error("Error fetching IP address:", error);
    return null;
  }
};
