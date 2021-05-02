import Email from "../../shared/entity/email";

export default class Client {
  name: string;
  email: Email;
  birthday: Date;

  constructor(name: string, email: string, birthday: Date) {
    this.name = name;
    this.email = new Email(email);
    this.birthday = birthday;

    //Use pattern Either left and right instead this -> basically same as functional programming languages does
    if (!this.name || !this.email || !this.birthday)
      throw new Error("Pass all required parameters to create client");
  }

  isBirthdayMonth(): boolean {
    return this.birthday.getMonth() === new Date().getMonth();
  }
}
