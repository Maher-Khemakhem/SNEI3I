export interface APILoginResponseModel {
  user?: string;  // User ID when login is successful
  errors?: {
    email?: string;
    password?: string;
  };
}
