import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  padding: spacing.medium,
  flex: 1,
}

export const MessageScreen = observer(function MessageScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

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
        />
        <View style={{ flexDirection: "row" }}>
          <TextField
            label="Password"
            placeholder="Password"
            style={{ flex: 1, marginRight: spacing.tiny }}
            secureTextEntry={true}
          />
          <TextField
            label="Encryption"
            placeholder="Encryption"
            style={{ flex: 1, marginLeft: spacing.tiny }}
          />
        </View>
        <TextField
          label="Encrypted Message"
          placeholder="Your encrypted message"
          style={{ flex: 5 }}
          inputStyle={{ height: "100%" }}
          multiline={true}
        />
      </View>
    </Screen>
  )
})
