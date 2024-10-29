'use client'
import { useEffect, useState } from 'react';
import { useAuth } from "@clerk/nextjs";
import axios from 'axios';

function Page() {
  const [trials, setTrials] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useAuth(); // Clerk auth

  const clerkId = userId; // Replace this with the specific clerkId or retrieve it dynamically if needed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/addTrial?clerkId=${clerkId}`);
        console.log(response)
        if (response.status!=200) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.data.json();
        setTrials(data);
      } catch (error) {
        console.error('Error fetching trials data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(trials)
  return (
    <div className="mt-20">
      <h1>Trials Data Page</h1>
      {trials.length > 0 ? (
        <ul>
          {trials.map((trial) => (
            <li key={trial.id}>
              <p><strong>Rat Age:</strong> {trial.ratAge}</p>
              <p><strong>Rat Weight:</strong> {trial.ratWeight}</p>
              <p><strong>Rat Temperature:</strong> {trial.ratTemp}</p>
              <p><strong>Health:</strong> {trial.health}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No trial data available for this user.</p>
      )}
    </div>
  );
}

export default Page;
