import os from 'os';

export const removeFalsy = (obj) => {
  const newObj = {};
  Object.keys(obj).forEach((prop) => {
    if (obj[prop]) {
      newObj[prop] = obj[prop];
    }
  });
  return newObj;
};

export const getLineSeparator = () => JSON.stringify(os.EOL);
