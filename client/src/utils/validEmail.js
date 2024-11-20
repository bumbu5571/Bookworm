import validator from "email-validator";

export function validEmail(email) {
  return validator.validate(email);
};