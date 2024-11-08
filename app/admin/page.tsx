'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataCollectionCbc from '@/components/adminDashboard/DataCollectionCbc';
import Activity from '@/components/adminDashboard/Activity';
import AnimalAssessment from '@/components/adminDashboard/AnimalAssessment';
import DataCollectionEsr from '@/components/adminDashboard/DataCollectionEsr';

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

type DisplayContent = 'AnimalAssessment' | 'Activity' | 'DataCollectionEsr' | 'DataCollectionCbc' | null;

const Admin: React.FC = () => {
    const [studies, setStudies] = useState<Study[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedContent, setSelectedContent] = useState<DisplayContent>(null);

    useEffect(() => {
        const fetchStudies = async () => {
            try {
                const response = await axios.get('/api/admin');
                setStudies(response.data.studies);
            } catch (err) {
                setError('Error fetching studies');
            } finally {
                setLoading(false);
            }
        };
        fetchStudies();
    }, []);

    const handleDisplayContent = (content: DisplayContent) => {
        setSelectedContent(content);
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen text-gray-500">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-10">{error}</div>;
    }

    const DashboardButton: React.FC<{ label: string; content: DisplayContent }> = ({ label, content }) => (
        <button
            onClick={() => handleDisplayContent(content)}
            className="bg-blue-500 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition-all"
        >
            {label}
        </button>
    );

    return (
        <div className="container mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-semibold mb-6 text-gray-800">Admin Dashboard</h1>
            <div className="flex flex-col md:flex-row md:flex-wrap gap-4 p-4 justify-center items-center">
                <DashboardButton label="Animal Assessment Data" content="AnimalAssessment" />
                <DashboardButton label="Activity" content="Activity" />
                <DashboardButton label="Data Collection ESR" content="DataCollectionEsr" />
                <DashboardButton label="Data Collection CBC" content="DataCollectionCbc" />
            </div>

            {studies.map(study => (
                <div key={study.id} className="mb-10">
                    <h2 className="text-2xl font-medium text-gray-700 mb-4">{study.name}</h2>
                    {selectedContent === 'AnimalAssessment' && <AnimalAssessment study={study} />}
                    {selectedContent === 'Activity' && <Activity study={study} />}
                    {selectedContent === 'DataCollectionEsr' && <DataCollectionEsr study={study} />}
                    {selectedContent === 'DataCollectionCbc' && <DataCollectionCbc study={study} />}
                </div>
            ))}
        </div>
    );
};

export default Admin;
