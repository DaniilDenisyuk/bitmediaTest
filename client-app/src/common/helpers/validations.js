export const required = (value) => !!value.toString();

export const number = (value, errMess) =>
  value && isNaN(Number(value)) ? false : true;

export const minValue = (min) => (value) =>
  value && value < min ? false : true;

export const maxValue = (max) => (value) =>
  value && value > max ? false : true;

export const minMaxValue = (min, max) => {
  const isNotLower = minValue(min);
  const isNotHigher = maxValue(max);
  return (value) => isNotLower(value) && isNotHigher(value);
};

export const date = (value) =>
  /^(0?[1-9]|1\d|2\d|3[01])\.(0?[1-9]|1[0-2])\.(19|20)\d{2}$/.test(value)
    ? true
    : "not a valid date";

export const email = (value) =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    value
  )
    ? true
    : "not a valid email";

export const mediumPassword = (value) =>
  /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(
    value
  )
    ? true
    : "1 uppercase, 1 lowercase, 1 num & 1 special char";

export const uniqueNames = (divider) => (names) => {
  for (const name of names.split(divider)) {
    if (names.match(new RegExp(name.trim(), "gi")).length > 1) return false;
  }
  return true;
};

export const limitSpecialChars = (value) =>
  !/[@#!$%^&*()_+|~=`{}\\[\]:";'<>?./]|-{2,}|[\s]-|-[\s]|(,\s*)\1|,$/.test(
    value
  )
    ? true
    : "only letters and hyphens";

export const limitNumbers = (value) =>
  !/[0-9]/.test(value) ? true : "only letters and hyphens";
