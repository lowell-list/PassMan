import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { computeEncryptedText, computePlainText } from "../../utils"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  padding: spacing.medium,
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
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="Message" />
      <Text>Encrypt or decrypt a small message with a password.</Text>

      <View style={{ marginTop: spacing.medium, marginBottom: spacing.medium }}>
        <TextField
          label="Message (plain text)"
          placeholder="Type or paste your message here"
          value={plainText}
          onChangeText={(newPlainText) => {
            setAction("encrypt")
            setPlainText(newPlainText)
          }}
          inputStyle={{ height: spacing.huge * 3 }}
          multiline={true}
          copyButton={true}
        />
        <TextField
          label="Password"
          placeholder="Password"
          value={userPassword}
          onChangeText={(text) => {
            setUserPassword(text)
          }}
          style={{ marginTop: spacing.small }}
          secureTextEntry={true}
        />
        <TextField
          label="Encrypted Message (AES 256-bit, with salt)"
          placeholder="Type or paste your encrypted message here"
          value={encryptedText}
          onChangeText={(text) => {
            setAction("decrypt")
            setEncryptedText(text)
          }}
          style={{ marginTop: spacing.small }}
          inputStyle={{ height: spacing.huge * 3 }}
          multiline={true}
          copyButton={true}
        />
      </View>
    </Screen>
  )
})
