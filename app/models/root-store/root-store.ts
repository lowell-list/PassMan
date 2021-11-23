import { Instance, SnapshotOut, types } from "mobx-state-tree"
import {
  PasswordItemStore,
  PasswordItemStoreModel,
} from "../password-item-store/password-item-store"
import { CharacterStoreModel } from "../character-store/character-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStoreModel, {} as any),
  passwordItemStore: types.optional(PasswordItemStoreModel, {} as PasswordItemStore)
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
