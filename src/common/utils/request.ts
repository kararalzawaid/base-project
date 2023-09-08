export const createQueryString = object => {
  const queryValues = Object.keys(object).map(key => {
    if (Array.isArray(object[key])) {
      return object[key].map(item => `${key}[]=${(item)}`).join('&');
    }

    return `${key}=${object[key]}`;
  });
  const query = queryValues.join('&');

  return query ? `?${query}` : '';
};
