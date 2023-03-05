export class Validators {
  static isFormFilled = (...fields) => {
    return [...fields].every((x) => Boolean(x));
  };
}
