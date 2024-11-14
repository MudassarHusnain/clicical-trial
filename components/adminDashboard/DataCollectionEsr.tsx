import React from 'react';

interface AnimalAssessmentDataRate {
    id: number;
    weight: number;
    lps: number;
    detamine: number;
    createdAt: string;
    updatedAt: string;
    dayId?: number | null;
}

interface DataCollectionCbcRate {
    id: number;
    rbc: number;
    pcv: number;
    plt: number;
    wbc: number;
    neutrophil: number;
    lymphocyte: number;
    eosinophil: number;
    basophil: number;
    monocyte: number;
    mcv: number;
    mch: number;
    mchc: number;
    createdAt: string;
    updatedAt: string;
    dayId?: number | null;
}

interface DataCollectionEsrRate {
    id: number;
    results: number;
    refValue: number;
    createdAt: string;
    updatedAt: string;
    dayId?: number | null;
}

interface ActivityRate {
    id: number;
    comments: string;
    createdAt: string;
    updatedAt: string;
    dayId?: number | null;
}

interface Day {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    rateId?: number | null;
    animalAssessmentData: AnimalAssessmentDataRate[];
    dataCollectionEsrRate: DataCollectionEsrRate[];
    activityRates: ActivityRate[];
    dataCollectionCbcRate: DataCollectionCbcRate[];
}

interface Rate {
    id: number;
    name: string;
    groupId?: number | null;
    days: Day[];
    createdAt: string;
    updatedAt: string;
}

interface Group {
    id: number;
    name: string;
    studyId?: number | null;
    rates: Rate[];
    createdAt: string;
    updatedAt: string;
}

interface Study {
    id: number;
    name: string;
    noOfDays: number;
    noOfRates: number;
    createdAt: string;
    updatedAt: string;
    clerkId: string;
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

const DataCollectionEsr: React.FC<{ study: Study }> = ({ study }) => {
    const maxDays = getMaxDaysForStudy(study);

    return (
        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
            <table className="min-w-full table-auto relative">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700 sticky left-0 bg-gray-200 z-10" rowSpan={2}>Group</th>
                        <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700 sticky left-[150px] bg-gray-200 z-10" rowSpan={2}>Id</th>
                        {[...Array(maxDays)].map((_, index) => (
                            <th key={index} className="px-4 py-3 border-b text-sm font-semibold text-gray-700" colSpan={2}>
                                {`Day ${index + 1}`}
                            </th>
                        ))}
                    </tr>
                    <tr className="bg-gray-100">
                        {[...Array(maxDays)].map((_, index) => (
                            <React.Fragment key={index}>
                                <th className="px-4 py-2 text-xs font-medium text-gray-600">Result</th>
                                <th className="px-4 py-2 text-xs font-medium text-gray-600">Ref Value</th>                            
                            </React.Fragment>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {study.groups.map(group => (
                        <React.Fragment key={group.id}>
                            {group.rates.map((rate, rateIndex) => (
                                <tr key={rate.id} className="hover:bg-gray-50">
                                    {rateIndex === 0 && (
                                        <td className="border px-6 py-4 sticky left-0 bg-white z-10" rowSpan={group.rates.length}>
                                            <span className="font-medium text-gray-800">{group.name}</span>
                                        </td>
                                    )}
                                    <td className="border px-6 py-4 text-gray-700 sticky left-[150px] bg-white z-10">
                                        {rate.name}
                                    </td>
                                    {[...Array(maxDays)].map((_, dayIndex) => {
                                        const day = rate.days[dayIndex];
                                        return (
                                            <React.Fragment key={dayIndex}>
                                                <td className="border px-4 py-2 text-center text-sm text-gray-600">
                                                    {day ? day.dataCollectionEsrRate[0]?.results ?? '-' : '-'}
                                                </td>
                                                <td className="border px-4 py-2 text-center text-sm text-gray-600">
                                                    {day ? day.dataCollectionEsrRate[0]?.refValue ?? '-' : '-'}
                                                </td>                                                                                            
                                            </React.Fragment>
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

export default DataCollectionEsr;
