// page.tsx
'use client';

import { useAuth } from "@clerk/nextjs";
import axios from 'axios'; // Import Axios

function Page() {
  const { userId } = useAuth();  // Client-side hook to get the user ID

  const sendRateData = async () => {
    try {
      const response = await axios.post('/api/addTrial', {
        clerkId: userId, // Use actual Clerk ID
        ratAge: 2,       // Ensure this is a number
        ratWeight: 100,  // Ensure this is a number
        ratTemp: 100,    // Ensure this is a number
      });
      
      // Log the response data
      console.log(response.data);
    } catch (error) {
      // Handle error response
      console.error('Error:', error);
    }
  };

  return (
    <div className="mt-20">
      <button onClick={sendRateData}>New Trial</button>
    </div>
  );
}

export default Page;
