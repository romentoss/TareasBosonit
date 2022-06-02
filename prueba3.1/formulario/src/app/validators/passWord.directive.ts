import { ValidatorFn } from "@angular/forms";

export const samePass: ValidatorFn = (control: any) => {
  const password = control.get('password');
  const password2 = control.get('password2');
  if (password.value === password2.value) {
    return null;
  }
  return {
    samePass: true,
  };
};