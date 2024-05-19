export const ValidationMessages: { [errorCode: string]: string } = {
  required: 'This field is required.',
  email: 'Please provide a valid email.',
  minlength: 'Password should have at least 8 characters.',
  pattern: `Password must include at least:
1 upper case letter,
1 lower case letter,
3 numbers,
2 special characters`,
  name: 'Name cannot be longer than 32 characters.',
  maxlength: ' is too long.',
  min: 'Price must be greater than 0.',
  price: 'Price should be in this format: [1, 1.00]',
};
