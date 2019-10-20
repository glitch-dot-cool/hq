const crypto = require("crypto");

const encrypt = (key, data) => {
  const iv = crypto.randomBytes(16);
  let cipher = crypto.createCipheriv("aes-256-gcm", Buffer.from(key), iv);
  let encrypted = cipher.update(JSON.stringify(data));
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return {
    encryptedData: encrypted.toString("hex"),
    iv: iv.toString("hex"),
    authTag: cipher.getAuthTag()
  };
};

const decrypt = (key, data) => {
  let iv = Buffer.from(data.iv, "hex");
  let encryptedData = Buffer.from(data.encryptedData, "hex");
  let decipher = crypto.createDecipheriv("aes-256-gcm", Buffer.from(key), iv);
  decipher.setAuthTag(Buffer.from(data.authTag));
  let decrypted = decipher.update(encryptedData);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  decrypted = JSON.parse(decrypted.toString());
  return decrypted;
};

module.exports = { encrypt, decrypt };
