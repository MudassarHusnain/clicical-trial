// components/Hierarchy.tsx
import Link from 'next/link';
import { useParams } from 'next/navigation';

const Hierarchy: React.FC = () => {
  const { studyId, groupId, rateId, dayId } = useParams();

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-8 flex items-center space-x-2 text-sm text-gray-600">
      <Link href="/study" className="text-blue-500 hover:underline font-semibold">
        Study
      </Link>

      {studyId && (
        <>
          <span className="text-gray-400">/</span>
          <Link
            href={`/study/${studyId}/group`}
            className="text-blue-500 hover:underline font-semibold"
          >
            Group
          </Link>
        </>
      )}

      {groupId && (
        <>
          <span className="text-gray-400">/</span>
          <Link
            href={`/study/${studyId}/group/${groupId}/rate`}
            className="text-blue-500 hover:underline font-semibold"
          >
            Rate
          </Link>
        </>
      )}

      {rateId && (
        <>
          <span className="text-gray-400">/</span>
          <Link
            href={`/study/${studyId}/group/${groupId}/rate/${rateId}/day`}
            className="text-blue-500 hover:underline font-semibold"
          >
            Day
          </Link>
        </>
      )}
    </div>
  );
};

export default Hierarchy;
