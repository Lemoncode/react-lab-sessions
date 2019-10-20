export const validateCredentials = (
  user: string,
  password: string
): Promise<boolean> =>
  new Promise<boolean>(resolve =>
    setTimeout(() => resolve(user === 'admin' && password === 'test'), 500)
  );
