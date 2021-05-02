export class EmailAlreadyUsedError extends Error {
  constructor() {
    super("Email already used.");
  }
}
