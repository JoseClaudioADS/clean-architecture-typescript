import createClientSchemaValidator from "./create-client-schema-validator";

describe("Create client schema validator", () => {
  it("should be validate object with success", async () => {
    expect(
      createClientSchemaValidator.isValidSync({
        name: "John Doe",
        email: "john@doe.com",
        birthday: new Date(1991, 4, 5),
      })
    ).toStrictEqual(true);
  });

  it("should not be validate object with success", async () => {
    expect(createClientSchemaValidator.isValidSync({})).toStrictEqual(false);

    expect(
      createClientSchemaValidator.isValidSync({
        email: "john@doe.com",
        birthday: new Date(1991, 4, 5),
      })
    ).toStrictEqual(false);

    expect(
      createClientSchemaValidator.isValidSync({
        birthday: new Date(1991, 4, 5),
      })
    ).toStrictEqual(false);

    expect(
      createClientSchemaValidator.isValidSync({
        name: "John Doe",
        email: "john",
        birthday: new Date(1991, 4, 5),
      })
    ).toStrictEqual(false);

    expect(
      createClientSchemaValidator.isValidSync({
        name: "John Doe",
        email: "john@email.com",
        birthday: "test date",
      })
    ).toStrictEqual(false);
  });
});
