const decodeObjectURI = (queryObject) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in queryObject) {
    // eslint-disable-next-line no-prototype-builtins
    if (queryObject.hasOwnProperty(key)
            && typeof queryObject[key] === 'object') {
      decodeObjectURI(queryObject[key]);
    } else {
      // eslint-disable-next-line no-param-reassign
      queryObject[key] = decodeURIComponent(queryObject[key]);
    }
  }
};

export default function uriDecoder() {
  return (req, res, next) => {
    decodeObjectURI(req.query);
    next();
  };
}
