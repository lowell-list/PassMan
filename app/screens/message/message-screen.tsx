import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import * as aesjs from "aes-js"
import * as base64 from "base64-js"
import { syncScrypt } from "scrypt-js"
import { Buffer } from "buffer"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  padding: spacing.medium,
  flex: 1,
}

export const MessageScreen = observer(function MessageScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const [plainText, setPlainText] = useState("")
  const [encryptedText, setEncryptedText] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [action, setAction] = useState<"encrypt" | "decrypt">("encrypt")

  useEffect(() => {
    if (action === "encrypt") {
      setEncryptedText(computeEncryptedText(userPassword, plainText))
    }
  }, [plainText, userPassword])
  useEffect(() => {
    if (action === "decrypt") {
      setPlainText(computePlainText(userPassword, encryptedText))
    }
  }, [userPassword, encryptedText])

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="fixed">
      <View style={{ flexDirection: "column", height: "100%" }}>
        <TextField
          label="Message"
          placeholder="Type or paste your message here"
          value={plainText}
          onChangeText={(newPlainText) => {
            setAction("encrypt")
            setPlainText(newPlainText)
          }}
          style={{ flex: 5 }}
          inputStyle={{ height: "100%" }}
          multiline={true}
        />
        <TextField
          label="Password"
          placeholder="Password"
          value={userPassword}
          onChangeText={(text) => {
            setUserPassword(text)
          }}
          style={{ flex: 1, marginRight: spacing.tiny }}
          secureTextEntry={true}
        />
        <TextField
          label="Encrypted Message"
          placeholder="Your encrypted message"
          value={encryptedText}
          onChangeText={(text) => {
            setAction("decrypt")
            setEncryptedText(text)
          }}
          style={{ flex: 5 }}
          inputStyle={{ height: "100%" }}
          multiline={true}
        />
      </View>
    </Screen>
  )
})

/**
 * Generate a random string of the given length using only characters from
 * the given character set.
 * @param length The number of characters for the new random string.
 * @param chars The character set.
 * Credit: https://stackoverflow.com/a/10727155
 */
const generateRandomString = (
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
const generateKeyFromPassword = (password: string, salt: string): Uint8Array => {
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
const computeEncryptedText = (password: string, plainText: string): string => {
  try {
    const salt = generateRandomString(20)
    console.log(salt)
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
const computePlainText = (password: string, saltPlusEncryptedBytesBase64: string): string => {
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
