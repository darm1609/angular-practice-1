export interface IUserLogin {
  success: boolean,
  token: string,
  user: IUser
}

export interface IUser {
  _id: string,
  nick: string,
  email: string,
  fullUserName: string
}
