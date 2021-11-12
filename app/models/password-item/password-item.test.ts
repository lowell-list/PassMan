import { PasswordItemModel } from "./password-item"

test("can be created", () => {
  const instance = PasswordItemModel.create({})

  expect(instance).toBeTruthy()
})
