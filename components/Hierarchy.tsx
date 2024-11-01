import Link from 'next/link';
import { useParams } from 'next/navigation';

const Hierarchy: React.FC = () => {
    const { studyId, groupId, rateId, dayId } = useParams();
    return (
        <div>
            {studyId ?
                <Link href={'/study'}>Study</Link> : ''}
            {groupId ?
                <Link href={`/study/${studyId}/group`}> {"---->Group"}</Link> : ''}
            {rateId ?
                <Link href={`/study/${studyId}/group/${groupId}/rate`}>{"---->rate"}</Link> : ''}
            {dayId ?
                <Link href={`/study/${studyId}/group/${groupId}/rate/${rateId}/day`}> {"---->day"}</Link> : ''}
        </div >

    );
};

export default Hierarchy;
