export interface LoginEntityVm {
  login: string;
  password: string;
}

export const createEmptyLogin = (): LoginEntityVm => ({
  login: '',
  password: '',
});
