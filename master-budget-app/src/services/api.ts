
import { Expense } from '../types';

// This function fetches data from our Vercel serverless backend.
export const fetchExpenses = async (): Promise<Expense[]> => {
  try {
    // Vercel dev runs the API at /api/expenses
    const response = await fetch('/api/expenses'); 
    
    if (!response.ok) {
      // If the server response is not ok, throw an error
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // The backend already transforms the data, so we should be able to use it directly.
    return data;

  } catch (error) {
    console.error("Failed to fetch expenses:", error);
    // In case of an error, we can return an empty array or re-throw the error
    // depending on how we want the UI to behave.
    return []; 
  }
};
