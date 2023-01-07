import React from 'react';

function getSavedValue(key, initialValue) {
  const lsValue = JSON.parse(localStorage.getItem(key));

  if (lsValue) return lsValue;
  if (initialValue instanceof Function) return initialValue();

  return initialValue;
}

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = React.useState(() => {
    return getSavedValue(key, defaultValue);
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}