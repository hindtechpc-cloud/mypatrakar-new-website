import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_REACT_APP_SECRET_KEY;

// Helper to make Base64 URL-safe
const toUrlSafeBase64 = (str) =>
  str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

// Helper to decode URL-safe Base64 back to standard Base64
const fromUrlSafeBase64 = (str) => {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  return str;
};

export const encryptData = (data) => {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  return toUrlSafeBase64(ciphertext);
};

export const decryptData = (urlSafeCiphertext) => {
  const base64Ciphertext = fromUrlSafeBase64(urlSafeCiphertext);
  const bytes = CryptoJS.AES.decrypt(base64Ciphertext, SECRET_KEY);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};
