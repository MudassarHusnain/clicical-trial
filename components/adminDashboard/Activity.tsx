// components/DataCollectionCbc.tsx

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
    activityRate:{
        comment: string;
    }[],
    dataCollectionEsrRate:{
        results: string;
        refValue: string;
    }[],
    animalAssessmentRate:{
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

const DataCollectionCbc: React.FC<{ study: Study }> = ({ study }) => {
    const maxDays = getMaxDaysForStudy(study); // Get max days for the specific study
    return (
        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700" rowSpan={2}>Group</th>
                        <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700" rowSpan={2}>Id</th>
                        {/* Render days dynamically based on maxDays for this specific study */}
                        {[...Array(maxDays)].map((_, index) => (
                            <th key={index} className="px-4 py-3 border-b text-sm font-semibold text-gray-700" colSpan={9}>
                                {`Day ${index + 1}`}
                            </th>
                        ))}
                    </tr>
                    <tr className="bg-gray-100">
                        {/* Sub-headers for each attribute under each day */}
                        {[...Array(maxDays)].map((_, index) => (
                            <React.Fragment key={index}>
                                <th className="px-4 py-2 text-xs font-medium text-gray-600">RBC</th>
                                <th className="px-4 py-2 text-xs font-medium text-gray-600">HB</th>
                                <th className="px-4 py-2 text-xs font-medium text-gray-600">PCV</th>
                                <th className="px-4 py-2 text-xs font-medium text-gray-600">PLT</th>
                                <th className="px-4 py-2 text-xs font-medium text-gray-600">WBC</th>
                                <th className="px-4 py-2 text-xs font-medium text-gray-600">Neutrophil</th>
                                <th className="px-4 py-2 text-xs font-medium text-gray-600">Lymphocyte</th>
                                <th className="px-4 py-2 text-xs font-medium text-gray-600">Eosinophil</th>
                                <th className="px-4 py-2 text-xs font-medium text-gray-600">Basophil</th>
                            </React.Fragment>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {study.groups.map(group => (
                        <React.Fragment key={group.id}>
                            <tr className="bg-gray-50 hover:bg-gray-100">
                                <td className="border px-6 py-4" rowSpan={group.rates.length}>
                                    <span className="font-medium text-gray-800">{group.name}</span>
                                </td>
                            </tr>
                            {group.rates.map(rate => (
                                <tr key={rate.id} className="hover:bg-gray-50">
                                    <td className="border px-6 py-4 text-gray-700">
                                        {rate.name}
                                    </td>
                                    {/* Render days dynamically for this study */}
                                    {[...Array(maxDays)].map((_, dayIndex) => {
                                        const day = rate.days[dayIndex];
                                        return (
                                            <React.Fragment key={dayIndex}>
                                                <td className="border px-4 py-2 text-center text-sm text-gray-600">
                                                    {day ? day.dataCollectionCbcRate[0]?.rbc ?? '-' : '-'}
                                                </td>
                                                <td className="border px-4 py-2 text-center text-sm text-gray-600">
                                                    {day ? day.dataCollectionCbcRate[0]?.hb ?? '-' : '-'}
                                                </td>
                                                <td className="border px-4 py-2 text-center text-sm text-gray-600">
                                                    {day ? day.dataCollectionCbcRate[0]?.pcv ?? '-' : '-'}
                                                </td>
                                                <td className="border px-4 py-2 text-center text-sm text-gray-600">
                                                    {day ? day.dataCollectionCbcRate[0]?.plt ?? '-' : '-'}
                                                </td>
                                                <td className="border px-4 py-2 text-center text-sm text-gray-600">
                                                    {day ? day.dataCollectionCbcRate[0]?.wbc ?? '-' : '-'}
                                                </td>
                                                <td className="border px-4 py-2 text-center text-sm text-gray-600">
                                                    {day ? day.dataCollectionCbcRate[0]?.neutrophil ?? '-' : '-'}
                                                </td>
                                                <td className="border px-4 py-2 text-center text-sm text-gray-600">
                                                    {day ? day.dataCollectionCbcRate[0]?.lymphocyte ?? '-' : '-'}
                                                </td>
                                                <td className="border px-4 py-2 text-center text-sm text-gray-600">
                                                    {day ? day.dataCollectionCbcRate[0]?.eosinophil ?? '-' : '-'}
                                                </td>
                                                <td className="border px-4 py-2 text-center text-sm text-gray-600">
                                                    {day ? day.dataCollectionCbcRate[0]?.basophil ?? '-' : '-'}
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
}

export default DataCollectionCbc;
