export default function val(password) {
  let result = 0;

  if (password.length < 8) {
    return 0;
  }

  let hasDigit = false;
  let hasUpperCase = false;
  let hasLowerCase = false;
  let hasSpecialChar = false;

  if (/\d/.test(password)) hasDigit = true;
  if (/[A-ZА-Я]/.test(password)) hasUpperCase = true;
  if (/[a-zа-я]/.test(password)) hasLowerCase = true;
  if (/[!@#$%^&*()_+=[\]{};':"\\|,.<>\/?]/.test(password))
    hasSpecialChar = true;

  if (hasDigit) result += 1;
  if (hasUpperCase) result += 1;
  if (hasLowerCase) result += 1;
  if (hasSpecialChar) result += 1;

  return result;
}
