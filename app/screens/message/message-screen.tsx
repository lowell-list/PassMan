import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const MessageScreen = observer(function MessageScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="default" text="Hello" />
      <TextField label="Message" placeholder="Type or paste your message here" />
      <TextField label="Password" placeholder="Password" />
      <TextField label="Encryption" placeholder="Encryption" />
      <TextField label="Encrypted Message" placeholder="Your encrypted message" />
    </Screen>
  )
})
