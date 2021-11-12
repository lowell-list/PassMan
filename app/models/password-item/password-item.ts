import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const PasswordItemModel = types
  .model("PasswordItem")
  .props({
    id: types.identifier,
    name: types.string,
    description: types.maybe(types.string),
    password: types.string,
    notes: types.maybe(types.string),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type PasswordItemType = Instance<typeof PasswordItemModel>
export interface PasswordItem extends PasswordItemType {}
type PasswordItemSnapshotType = SnapshotOut<typeof PasswordItemModel>
export interface PasswordItemSnapshot extends PasswordItemSnapshotType {}
export const createPasswordItemDefaultModel = () => types.optional(PasswordItemModel, {})
