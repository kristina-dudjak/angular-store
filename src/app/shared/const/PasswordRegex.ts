export const PasswordRegex =
  //Password must include upper case letters, lower case letters, have at least 3 numbers, 2 special characters and min. 8 characters
  '^(?=.*[A-Z])(?=.*[a-z])(?=(.*\\d){3,})(?=(.*[^A-Za-z0-9]){2,}).{8,}$';
