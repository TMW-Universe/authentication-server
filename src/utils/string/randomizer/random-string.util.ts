export const generateRandomString = (length: number) => {
  let result = '';
  const characters =
    'ABCÇDEFGHIJKLMNOPQRSTUVWXYZÑabcçdefghijklmnopqrstuvwxyzñ0123456789!()[]{}<>:.-_,;';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};
