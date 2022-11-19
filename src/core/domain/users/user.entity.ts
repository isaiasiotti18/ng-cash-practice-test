import * as bcrypt from 'bcryptjs';

export type UserProps = {
  username: string;
  password: string;
};

export class User {
  public readonly id: string;
  public username: string;
  public password: string;
  public accountId: string;

  constructor({ username, password }: UserProps) {
    this.username = username;
    this.password = password;
  }

  static create(userProps: UserProps): User {
    try {
      const { username, password } = userProps;

      if (username.length < 3)
        throw new Error('Username must be at least 3 characters');

      if (password.length < 8)
        throw new Error('Password must be at least 8 characters');

      const regexPassword =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;

      if (!regexPassword.test(password))
        throw new Error(
          'The password must contain a number, an uppercase letter and a special character.',
        );

      const salt = bcrypt?.genSaltSync(10);
      const password_hash = bcrypt?.hashSync(password, salt);

      return new User({
        username,
        password: password_hash,
      });
    } catch (error: any) {
      throw new Error(error?.message);
    }
  }
}
