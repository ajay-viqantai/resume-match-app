import { createContext, useContext, useState } from 'react';

const ShortlistContext = createContext();

export function ShortlistProvider({ children }) {
  const [shortlisted, setShortlisted] = useState({}); // { "jdId-candidateId": true }

  const toggleShortlist = (jdId, candidateId) => {
    const key = `${jdId}-${candidateId}`;
    setShortlisted((prev) => {
      const next = { ...prev };
      if (next[key]) {
        delete next[key];
      } else {
        next[key] = true;
      }
      return next;
    });
  };

  const isShortlisted = (jdId, candidateId) =>
    !!shortlisted[`${jdId}-${candidateId}`];

  const getShortlistCount = (jdId) =>
    Object.keys(shortlisted).filter((key) => key.startsWith(`${jdId}-`)).length;

  return (
    <ShortlistContext.Provider
      value={{ toggleShortlist, isShortlisted, getShortlistCount }}
    >
      {children}
    </ShortlistContext.Provider>
  );
}

export function useShortlist() {
  return useContext(ShortlistContext);
}
