export const ValidationMessages: { [errorCode: string]: string } = {
  required: 'This field is required.',
  email: 'Please provide a valid email.',
  minlength: 'Password should have at least 8 characters.',
  pattern:
    'Password must include upper case letters, lower case letters, have at least 3 numbers, 2 special characters and min. 8 characters',
};
