import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { PasswordItem, PasswordItemModel, PasswordItemSnapshot, withEnvironment } from ".."

/**
 * Model description here for TypeScript hints.
 */
export const PasswordItemStoreModel = types
  .model("PasswordItemStore")
  .props({
    passwordItems: types.optional(types.array(PasswordItemModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    savePasswordItems: (passwordItemSnapshots: PasswordItemSnapshot[]) => {
      const passwordItemModels: PasswordItem[] = passwordItemSnapshots.map((c) =>
        PasswordItemModel.create(c),
      ) // create model instances from the plain objects
      self.passwordItems.replace(passwordItemModels) // Replace the existing data with the new data
    },
  }))
  .actions((self) => ({
    loadInitialPasswordItems: flow(function* () {
      const aPasswordItem: PasswordItemSnapshot = {
        id: "1234",
        name: "My Password",
        description: "A very cool PW indeed",
        password: "",
        notes: "",
      }
      self.savePasswordItems([aPasswordItem])
      __DEV__ && console.tron.log("saving it!")
    }),
  }))

type PasswordItemStoreType = Instance<typeof PasswordItemStoreModel>
export interface PasswordItemStore extends PasswordItemStoreType {}
type PasswordItemStoreSnapshotType = SnapshotOut<typeof PasswordItemStoreModel>
export interface PasswordItemStoreSnapshot extends PasswordItemStoreSnapshotType {}
export const createPasswordItemStoreDefaultModel = () => types.optional(PasswordItemStoreModel, {})
