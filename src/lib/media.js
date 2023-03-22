// const mediaUrl = `https://marmelab.com/posters/beard-${parseInt(
//     Math.random() * 10,
//     10
// ) + 1}.jpeg`;

export const mediaPath = ( path ) => {
  if (typeof path !== 'string') return '';
  if (path.substr(0, 4)==='http') return path;
  return "".concat(process.env.REACT_APP_MEDIA_HOST_URL, path.split(',')[0]);
};
