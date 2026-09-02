import CandidateCard from './CandidateCard';

export default function CandidateList({ candidates, jdId }) {
  return (
    <div className="flex flex-col gap-3">
      {candidates.map((candidate) => (
        <CandidateCard key={candidate.id} candidate={candidate} jdId={jdId} />
      ))}
    </div>
  );
}
