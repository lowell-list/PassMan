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
    } else {
      setPlainText(computePlainText(userPassword, encryptedText))
    }
  }, [plainText, userPassword, encryptedText])

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
        <View style={{ flexDirection: "row" }}>
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
            label="Cipher"
            placeholder="Cipher"
            value="AES 256-bit"
            style={{ flex: 1, marginLeft: spacing.tiny }}
            editable={false}
          />
        </View>
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

const generateKeyFromPassword = (password: string) => {
  const passwordBytes = Buffer.from(password.normalize("NFKC"))
  const saltBytes = Buffer.from("someSaltyo".normalize("NFKC"))
  const N = 1024
  const r = 8
  const p = 1
  const dkLen = 32
  const key = syncScrypt(passwordBytes, saltBytes, N, r, p, dkLen)
  return key
}

const encryptToBase64 = (key: Uint8Array, plainText: string): string => {
  const textBytes = aesjs.utils.utf8.toBytes(plainText)
  const aesCtr = new aesjs.ModeOfOperation.ctr(key)
  const encryptedBytes = aesCtr.encrypt(textBytes)
  const base64String = base64.fromByteArray(encryptedBytes)
  return base64String
}

const computeEncryptedText = (password: string, plainText: string): string => {
  const key = generateKeyFromPassword(password)
  return encryptToBase64(key, plainText)
}

const computePlainText = (password: string, base64String: string): string => {
  try {
    const key = generateKeyFromPassword(password)
    const encryptedBytes = base64.toByteArray(base64String)
    const aesCtr = new aesjs.ModeOfOperation.ctr(key)
    const decryptedBytes = aesCtr.decrypt(encryptedBytes)
    const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes)
    return decryptedText
  } catch (error) {
    return "error, could not decrypt"
  }
}
