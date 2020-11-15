export const getCurrentDataById = (data, id) => {
  const object = data.find((item) => item.id === id);
  if (!object) {
    return '';
  } else {
    return object.name;
  }
};
