export class User {
  constructor(
    public name: string,
    public email: string,
    public password: number,
    public zipcode: number,
    public address: string,
    public telephone: number
  ) {}

  public get name(): string {
    return this.name;
  }

  public set name(name: string) {
    this.name = name;
  }

  public get email(): string {
    return this.email;
  }

  public set email(email: string) {
    this.email = email;
  }

  public get password(): number {
    return this.password;
  }

  public set password(password: number) {
    this.password = password;
  }

  public get zipcode(): number {
    return this.zipcode;
  }

  public set zipcode(zipcode: number) {
    this.zipcode = zipcode;
  }

  public get address(): string {
    return this.address;
  }

  public set address(address: string) {
    this.address = address;
  }

  public get telephone(): number {
    return this.telephone;
  }

  public set telephone(telephone: number) {
    this.telephone = telephone;
  }
}
