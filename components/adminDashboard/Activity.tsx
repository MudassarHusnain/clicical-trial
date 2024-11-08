import React from 'react';

interface Day {
    dataCollectionCbcRate: {
        rbc: string;
        hb: string;
        pcv: string;
        plt: string;
        wbc: string;
        neutrophil: string;
        lymphocyte: string;
        eosinophil: string;
        basophil: string;
    }[],
    activityRate: {
        comment: string;
    }[],
    dataCollectionEsrRate: {
        results: string;
        refValue: string;
    }[],
    animalAssessmentRate: {
        weight: string;
        lps: string;
        detamine: string;
    }[],
}

interface Rate {
    id: string;
    name: string;
    days: Day[];
}

interface Group {
    id: string;
    name: string;
    rates: Rate[];
}

interface Study {
    id: string;
    name: string;
    groups: Group[];
}

const getMaxDaysForStudy = (study: Study): number => {
    let maxDays = 0;
    study.groups.forEach(group => {
        group.rates.forEach(rate => {
            maxDays = Math.max(maxDays, rate.days.length);
        });
    });
    return maxDays;
};

const Activity: React.FC<{ study: Study }> = ({ study }) => {
    const maxDays = getMaxDaysForStudy(study); // Get max days for the specific study

    return (
        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
            <table className="min-w-full table-auto relative">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700 sticky left-0 bg-gray-200 z-10" rowSpan={2}>Group</th>
                        <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700 sticky left-[150px] bg-gray-200 z-10" rowSpan={2}>Id</th>
                        {/* Render a single comment column for each day */}
                        {[...Array(maxDays)].map((_, index) => (
                            <th key={index} className="px-4 py-3 border-b text-sm font-semibold text-gray-700">
                                {`Day ${index + 1} Comment`}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {study.groups.map(group => (
                        <React.Fragment key={group.id}>
                            {group.rates.map((rate, rateIndex) => (
                                <tr key={rate.id} className="hover:bg-gray-50">
                                    {/* Only render the group name cell once for the first rate row */}
                                    {rateIndex === 0 && (
                                        <td className="border px-6 py-4 sticky left-0 bg-white z-10" rowSpan={group.rates.length}>
                                            <span className="font-medium text-gray-800">{group.name}</span>
                                        </td>
                                    )}
                                    <td className="border px-6 py-4 text-gray-700 sticky left-[150px] bg-white z-10">
                                        {rate.name}
                                    </td>
                                    {/* Render a single comment column for each day */}
                                    {[...Array(maxDays)].map((_, dayIndex) => {
                                        const day = rate.days[dayIndex];
                                        return (
                                            <td key={dayIndex} className="border px-4 py-2 text-center text-sm text-gray-600">
                                                {day ? day.activityRate?.comment ?? '-' : '-'}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Activity;
