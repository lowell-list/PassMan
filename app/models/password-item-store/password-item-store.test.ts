import { PasswordItemStoreModel } from "./password-item-store"

test("can be created", () => {
  const instance = PasswordItemStoreModel.create({})

  expect(instance).toBeTruthy()
})
