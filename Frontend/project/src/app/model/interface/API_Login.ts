export interface APILoginResponseModel {
  user?: string;  // User ID when login is successful
  token?: string;
  errors?: {
    email?: string;
    password?: string;
  };
}
