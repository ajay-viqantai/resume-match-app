import { createContext, useContext, useState } from 'react';

const CandidateStatusContext = createContext();

export const STATUSES = [
  { key: 'new', label: 'New', color: 'var(--muted)', bg: '#f4f3ec' },
  {
    key: 'in_progress',
    label: 'In Progress',
    color: 'var(--accent)',
    bg: 'var(--accent-soft)',
  },
  {
    key: 'interviewing',
    label: 'Interviewing',
    color: '#a8710a',
    bg: 'rgba(212,160,23,0.12)',
  },
  {
    key: 'selected',
    label: 'Selected',
    color: '#1f7a3d',
    bg: 'rgba(31,122,61,0.1)',
  },
  {
    key: 'rejected',
    label: 'Rejected',
    color: '#b3413a',
    bg: 'rgba(179,65,58,0.08)',
  },
];

export function CandidateStatusProvider({ children }) {
  const [statuses, setStatuses] = useState({}); // { "jdId-candidateId": "in_progress" }

  const setStatus = (jdId, candidateId, status) => {
    setStatuses((prev) => ({ ...prev, [`${jdId}-${candidateId}`]: status }));
  };

  const getStatus = (jdId, candidateId) =>
    statuses[`${jdId}-${candidateId}`] || 'new';

  const getStatusCount = (jdId, statusKey) =>
    Object.entries(statuses).filter(
      ([key, val]) => key.startsWith(`${jdId}-`) && val === statusKey,
    ).length;

  const getReviewedCount = (jdId) =>
    Object.keys(statuses).filter((key) => key.startsWith(`${jdId}-`)).length;

  return (
    <CandidateStatusContext.Provider
      value={{ setStatus, getStatus, getStatusCount, getReviewedCount }}
    >
      {children}
    </CandidateStatusContext.Provider>
  );
}

export function useCandidateStatus() {
  return useContext(CandidateStatusContext);
}
