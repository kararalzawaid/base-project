export class SSOLoginOutput  {
  id: number;
  token: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  refreshToken: string;
  twoFA: number;
  twoFACount: number;
  permissions: string[];
};