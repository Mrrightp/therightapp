export const removeHtml = (string: string) => {
  const regex = /(<([^>]+)>)/gi;
  const newString = string
    .replace(/<\/?p[^>]*>/g, '')
    .replace(regex, '')
    .replace(/^\xa0*([^\xa0])\xa0$/g, '')
    .replace(/\xA0/g, ' ')
    .replace(/&nbsp;/g, ' ');

  return newString;
};
