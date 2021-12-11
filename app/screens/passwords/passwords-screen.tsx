import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  padding: spacing.medium,
}

export const PasswordsScreen = observer(function PasswordsScreen() {
  // Pull in one of our MST stores
  const { passwordItemStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  useEffect(() => {
    passwordItemStore.loadInitialPasswordItems()
    __DEV__ && console.tron.log("loaded!")
  }, [])

  const passwordItemCount = passwordItemStore.passwordItems.length

  const passwordItems = passwordItemStore.passwordItems.map((item) => {
    return <Text key={item.id}>{item.name}</Text>
  })

  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="Passwords" />
      <Text>Browse, copy, and edit your passwords.</Text>

      <View style={{ marginTop: spacing.small }}>
        <Text>{`There are ${passwordItemCount} password item(s).`}</Text>
        {passwordItems}
      </View>
    </Screen>
  )
})
