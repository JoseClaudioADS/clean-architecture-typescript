export default class Email {
  constructor(public value: string) {
    //Don't do this :D, again, use the Either pattern ;D
    if (value && !value.includes("@")) throw new Error("Wrong e-mail");
  }
}
