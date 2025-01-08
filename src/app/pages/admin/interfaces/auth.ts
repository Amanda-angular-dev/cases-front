export interface AuthResponse {
    operation: {
        login: boolean;
      };
      message: string;
      data: {
        token: string;
        user: {
          email: string;
          name: string;
          rol: string;
        };
      };
}
