import React, { useState } from "react"
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

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="fixed">
      <View style={{ flexDirection: "column", height: "100%" }}>
        <TextField
          label="Message"
          placeholder="Type or paste your message here"
          style={{ flex: 5 }}
          inputStyle={{ height: "100%" }}
          multiline={true}
          onChangeText={(newPlainText) => {
            setPlainText(newPlainText)
            setEncryptedText(computeEncryptedText(userPassword, newPlainText))
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <TextField
            label="Password"
            placeholder="Password"
            value={userPassword}
            onChangeText={(newPassword) => {
              setUserPassword(newPassword)
              setEncryptedText(computeEncryptedText(newPassword, plainText))
            }}
            style={{ flex: 1, marginRight: spacing.tiny }}
            secureTextEntry={true}
          />
          <TextField
            label="Cipher"
            placeholder="Cipher"
            value="AES 256-bit, CTR"
            style={{ flex: 1, marginLeft: spacing.tiny }}
            editable={false}
          />
        </View>
        <TextField
          label="Encrypted Message"
          placeholder="Your encrypted message"
          style={{ flex: 5 }}
          inputStyle={{ height: "100%" }}
          multiline={true}
          value={encryptedText}
        />
      </View>
    </Screen>
  )
})

const computeEncryptedText = (password: string, text: string): string => {
  const passwordBytes = Buffer.from(password.normalize("NFKC"))
  const saltBytes = Buffer.from("someSaltyo".normalize("NFKC"))

  const N = 1024
  const r = 8
  const p = 1
  const dkLen = 32

  const key = syncScrypt(passwordBytes, saltBytes, N, r, p, dkLen)
  // console.log(key)

  // aesjs
  // const text = "Text may be any length you wish, no padding is required."
  const textBytes = aesjs.utils.utf8.toBytes(text)
  const aesCtr = new aesjs.ModeOfOperation.ctr(key)
  const encryptedBytes = aesCtr.encrypt(textBytes)
  // console.log(base64.fromByteArray(encryptedBytes))
  return base64.fromByteArray(encryptedBytes)
}
