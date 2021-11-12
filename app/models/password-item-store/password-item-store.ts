import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { PasswordItemModel } from ".."

/**
 * Model description here for TypeScript hints.
 */
export const PasswordItemStoreModel = types
  .model("PasswordItemStore")
  .props({
    passwordItems: types.optional(types.array(PasswordItemModel), []),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type PasswordItemStoreType = Instance<typeof PasswordItemStoreModel>
export interface PasswordItemStore extends PasswordItemStoreType {}
type PasswordItemStoreSnapshotType = SnapshotOut<typeof PasswordItemStoreModel>
export interface PasswordItemStoreSnapshot extends PasswordItemStoreSnapshotType {}
export const createPasswordItemStoreDefaultModel = () => types.optional(PasswordItemStoreModel, {})
