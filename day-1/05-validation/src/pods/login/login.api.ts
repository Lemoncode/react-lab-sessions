// This is just test code, never hard code user and password in JS this should call a real service
export const validateCredentials = (
  user: string,
  password: string
): Promise<boolean> =>
  new Promise<boolean>(resolve =>
    setTimeout(() => resolve(user === "admin" && password === "test"), 500)
  );
