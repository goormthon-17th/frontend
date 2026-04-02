import { useState } from 'react';

export const useRandomProfile = <T>(items: T[]): T => {
  const [item] = useState(() => items[Math.floor(Math.random() * items.length)]);
  return item;
};
