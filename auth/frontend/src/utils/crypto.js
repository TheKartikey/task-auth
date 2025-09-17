import CryptoJS from "crypto-js";

const KEY = CryptoJS.enc.Utf8.parse("1234567890abcdef1234567890abcdef");
const IV_LENGTH = 16;

export const decryptData = (encryptedText) => {
  if (!encryptedText) return "";

  const [ivHex, encryptedHex] = encryptedText.split(":");
  if (!ivHex || !encryptedHex) return "";

  const iv = CryptoJS.enc.Hex.parse(ivHex);
  const ciphertext = CryptoJS.enc.Hex.parse(encryptedHex);

  const decrypted = CryptoJS.AES.decrypt(
    { ciphertext: ciphertext },
    KEY,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return decrypted.toString(CryptoJS.enc.Utf8);
};
