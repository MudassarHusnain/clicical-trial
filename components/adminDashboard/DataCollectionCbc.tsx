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
        monocyte: string;
        mcv: string;
        mch: string;
        mchc: string;
    }[];
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
    const maxDays = getMaxDaysForStudy(study);

    return (
        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
            <table className="min-w-full table-auto relative">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700 sticky left-0 bg-gray-200 z-10" rowSpan={2}>Group</th>
                        <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-700 sticky left-[150px] bg-gray-200 z-10" rowSpan={2}>Id</th>
                        {[...Array(maxDays)].map((_, index) => (
                            <th key={index} className="px-4 py-3 border-b text-sm font-semibold text-gray-700" colSpan={13}>
                                {`Day ${index + 1}`}
                            </th>
                        ))}
                    </tr>
                    <tr className="bg-gray-100">
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
                                <th className="px-4 py-2 text-xs font-medium text-gray-600">Monocyte</th>
                                <th className="px-4 py-2 text-xs font-medium text-gray-600">MCV</th>
                                <th className="px-4 py-2 text-xs font-medium text-gray-600">MCH</th>
                                <th className="px-4 py-2 text-xs font-medium text-gray-600">MCHC</th>
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
                                                <td className="border px-4 py-2 text-center text-sm text-gray-600">
                                                    {day ? day.dataCollectionCbcRate[0]?.monocyte ?? '-' : '-'}
                                                </td>
                                                <td className="border px-4 py-2 text-center text-sm text-gray-600">
                                                    {day ? day.dataCollectionCbcRate[0]?.mcv ?? '-' : '-'}
                                                </td>
                                                <td className="border px-4 py-2 text-center text-sm text-gray-600">
                                                    {day ? day.dataCollectionCbcRate[0]?.mch ?? '-' : '-'}
                                                </td>
                                                <td className="border px-4 py-2 text-center text-sm text-gray-600">
                                                    {day ? day.dataCollectionCbcRate[0]?.mchc ?? '-' : '-'}
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

export default DataCollectionCbc;
