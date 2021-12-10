import * as aesjs from "aes-js"
import * as base64 from "base64-js"
import { syncScrypt } from "scrypt-js"
import { Buffer } from "buffer"

/**
 * Generate a random string of the given length using only characters from
 * the given character set.
 * @param length The number of characters for the new random string.
 * @param chars The character set.
 * Credit: https://stackoverflow.com/a/10727155
 */
export const generateRandomString = (
  length = 20,
  chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
) => {
  var result = ""
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

/**
 * Generate a constant-length key (byte array) given password and salt strings.
 */
export const generateKeyFromPassword = (password: string, salt: string): Uint8Array => {
  const passwordBytes = Buffer.from(password.normalize("NFKC"))
  const saltBytes = Buffer.from(salt.normalize("NFKC"))
  const N = 1024
  const r = 8
  const p = 1
  const dkLen = 32
  const key = syncScrypt(passwordBytes, saltBytes, N, r, p, dkLen)
  return key
}

/**
 * Encrypt a plaintext string using the given password string and return the
 * salt plus encrypted bytes as a base 64 string.
 */
export const computeEncryptedText = (password: string, plainText: string): string => {
  try {
    const salt = generateRandomString(20)
    const key = generateKeyFromPassword(password, salt)
    const textBytes = aesjs.utils.utf8.toBytes(plainText)
    const aesCtr = new aesjs.ModeOfOperation.ctr(key)
    const encryptedBytes = aesCtr.encrypt(textBytes)
    const encryptedBytesBase64 = base64.fromByteArray(encryptedBytes)
    return salt + encryptedBytesBase64
  } catch (error) {
    return "error, could not encrypt"
  }
}

/**
 * Decypt a salt + encrypted bytes (in base 64) and return the plaintext string.
 */
export const computePlainText = (
  password: string,
  saltPlusEncryptedBytesBase64: string,
): string => {
  if (saltPlusEncryptedBytesBase64.length < 21) {
    return "error, not long enough"
  }
  try {
    const salt = saltPlusEncryptedBytesBase64.substring(0, 20)
    const encryptedBytesBase64 = saltPlusEncryptedBytesBase64.substring(20)
    const key = generateKeyFromPassword(password, salt)
    const encryptedBytes = base64.toByteArray(encryptedBytesBase64)
    const aesCtr = new aesjs.ModeOfOperation.ctr(key)
    const decryptedBytes = aesCtr.decrypt(encryptedBytes)
    const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes)
    return decryptedText
  } catch (error) {
    return "error, could not decrypt"
  }
}
