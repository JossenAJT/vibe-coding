
import { Expense } from '../types';

export const expenses: Expense[] = [
  { id: '1', name: 'Facebook Ads', bu: 'Marketing', pic: 'John Doe', budget: 5000, actual: 4500 },
  { id: '2', name: 'Google Ads', bu: 'Marketing', pic: 'John Doe', budget: 7000, actual: 7200 },
  { id: '3', name: 'AWS Server Costs', bu: 'Products', pic: 'Jane Smith', budget: 10000, actual: 9500 },
  { id: '4', name: 'HubSpot Subscription', bu: 'Marketing', pic: 'John Doe', budget: 2000, actual: 2100 },
  { id: '5', name: 'Figma Subscription', bu: 'Products', pic: 'Jane Smith', budget: 500, actual: 500 },
  { id: '6', name: 'New Relic', bu: 'Products', pic: 'Jane Smith', budget: 1500, actual: 1800 },
  { id: '7', name: 'Content Creation', bu: 'Marketing', pic: 'Sam Wilson', budget: 3000, actual: 2500 },
  { id: '8', name: 'SEO Tools', bu: 'Marketing', pic: 'Sam Wilson', budget: 1000, actual: 800 },
];

export const businessUnits = ['Products', 'Marketing'];
export const personsInCharge = ['John Doe', 'Jane Smith', 'Sam Wilson'];
