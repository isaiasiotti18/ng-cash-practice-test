export interface UserPayload {
  sub: string;
  username: string;
  accountId: string;
  iat?: number;
  exp?: number;
}
