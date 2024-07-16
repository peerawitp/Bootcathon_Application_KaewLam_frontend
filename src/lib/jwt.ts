import { jwtDecode } from "jwt-decode";

export const getJwtPayload = (token: string) => {
  return jwtDecode(token);
};

export const isTokenExpired = (token: string) => {
  const payload = getJwtPayload(token) as { exp: number };
  return payload.exp < Date.now() / 1000;
};
