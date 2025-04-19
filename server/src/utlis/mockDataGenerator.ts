import mongoose from 'mongoose';
import Quote from '../models/Quote';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Define US states
const US_STATES = [
  'AZ', 'CA', 'CO', 'FL', 'GA', 'ID', 'IL', 'IN', 'KS', 'KY', 
  'MA', 'MD', 'MI', 'MN', 'MO', 'NC', 'NJ', 'NM', 'NV', 'NY', 
  'OH', 'OK', 'OR', 'PA', 'SC', 'TN', 'TX', 'UT', 'VA', 'WA'
];

// Define roof types
const ROOF_TYPES = ['Metal', 'TPO', 'Foam', 'Shingle', 'EPDM', 'PVC', 'Modified Bitumen', 'Other'];

// Define company name prefixes and suffixes
const COMPANY_PREFIXES = ['Advanced', 'Elite', 'Premium', 'Professional', 'Quality', 'Reliable', 'Superior', 'United'];
const COMPANY_SUFFIXES = ['Roofing', 'Construction', 'Contractors', 'Services', 'Solutions', 'Builders', 'Systems'];

// Define cities for each state (simplified list)
const CITIES_BY_STATE: Record<string, string[]> = {
  'AZ': ['Phoenix', 'Tucson', 'Scottsdale', 'Mesa', 'Tempe'],
  'CA': ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento', 'San Jose'],
  'CO': ['Denver', 'Boulder', 'Colorado Springs', 'Fort Collins', 'Aspen'],
  'FL': ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'Tallahassee'],
  'GA': ['Atlanta', 'Savannah', 'Augusta', 'Macon', 'Athens'],
  'ID': ['Boise', 'Idaho Falls', 'Coeur d\'Alene', 'Twin Falls', 'Pocatello'],
  'IL': ['Chicago', 'Springfield', 'Peoria', 'Rockford', 'Champaign'],
  'IN': ['Indianapolis', 'Fort Wayne', 'Bloomington', 'South Bend', 'Evansville'],
  'KS': ['Wichita', 'Topeka', 'Kansas City', 'Overland Park', 'Lawrence'],
  'KY': ['Louisville', 'Lexington', 'Bowling Green', 'Owensboro', 'Covington'],
  'MA': ['Boston', 'Cambridge', 'Worcester', 'Springfield', 'Lowell'],
  'MD': ['Baltimore', 'Annapolis', 'Rockville', 'Frederick', 'Gaithersburg'],
  'MI': ['Detroit', 'Grand Rapids', 'Ann Arbor', 'Lansing', 'Kalamazoo'],
  'MN': ['Minneapolis', 'St. Paul', 'Duluth', 'Rochester', 'Bloomington'],
  'MO': ['St. Louis', 'Kansas City', 'Springfield', 'Columbia', 'Jefferson City'],
  'NC': ['Charlotte', 'Raleigh', 'Durham', 'Greensboro', 'Asheville'],
  'NJ': ['Newark', 'Jersey City', 'Trenton', 'Camden', 'Atlantic City'],
  'NM': ['Albuquerque', 'Santa Fe', 'Las Cruces', 'Roswell', 'Taos'],
  'NV': ['Las Vegas', 'Reno', 'Henderson', 'Carson City', 'Sparks'],
  'NY': ['New York', 'Buffalo', 'Rochester', 'Syracuse', 'Albany'],
  'OH': ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron'],
  'OK': ['Oklahoma City', 'Tulsa', 'Norman', 'Broken Arrow', 'Lawton'],
  'OR': ['Portland', 'Eugene', 'Salem', 'Bend', 'Medford'],
  'PA': ['Philadelphia', 'Pittsburgh', 'Allentown', 'Harrisburg', 'Erie'],
  'SC': ['Columbia', 'Charleston', 'Greenville', 'Myrtle Beach', 'Spartanburg'],
  'TN': ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga', 'Clarksville'],
  'TX': ['Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth'],
  'UT': ['Salt Lake City', 'Provo', 'Ogden', 'St. George', 'Moab'],
  'VA': ['Richmond', 'Virginia Beach', 'Norfolk', 'Alexandria', 'Roanoke'],
  'WA': ['Seattle', 'Spokane', 'Tacoma', 'Bellingham', 'Olympia']
};

// Define contractor first names and last names
const FIRST_NAMES = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa', 'William', 'Mary'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson'];

// Utility function to get random element from array
const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Utility function to get random integer between min and max (inclusive)
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Utility function to get random date within range
const getRandomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Generate a mock quote
const generateMockQuote = () => {
  const state = getRandomElement(US_STATES);
  const city = getRandomElement(CITIES_BY_STATE[state]);
  const roofType = getRandomElement(ROOF_TYPES);
  
  // Base roof size range by type (sq ft)
  let minSize = 1000;
  let maxSize = 5000;
  
  // Adjust size based on roof type
  switch (roofType) {
    case 'Metal':
      minSize = 2000;
      maxSize = 10000;
      break;
    case 'TPO':
      minSize = 5000;
      maxSize = 20000;
      break;
    case 'Foam':
      minSize = 3000;
      maxSize = 15000;
      break;
    case 'Shingle':
      minSize = 1500;
      maxSize = 4000;
      break;
    case 'EPDM':
      minSize = 4000;
      maxSize = 18000;
      break;
    case 'PVC':
      minSize = 4500;
      maxSize = 17000;
      break;
    case 'Modified Bitumen':
      minSize = 3500;
      maxSize = 16000;
      break;
    default:
      minSize = 2000;
      maxSize = 10000;
  }
  
  const roofSize = getRandomInt(minSize, maxSize);
  
  // Generate contractor name
  const firstName = getRandomElement(FIRST_NAMES);
  const lastName = getRandomElement(LAST_NAMES);
  const contractorName = `${firstName} ${lastName}`;
  
  // Generate company name
  const companyPrefix = getRandomElement(COMPANY_PREFIXES);
  const companySuffix = getRandomElement(COMPANY_SUFFIXES);
  const company = `${companyPrefix} ${companySuffix}`;
  
  // Generate project date (within last 3 years)
  const today = new Date();
  const threeYearsAgo = new Date();
  threeYearsAgo.setFullYear(today.getFullYear() - 3);
  const projectDate = getRandomDate(threeYearsAgo, today);
  
  return {
    contractorName,
    company,
    roofSize,
    roofType,
    city,
    state,
    projectDate
  };
};

// Generate mock data and insert into database
export const generateMockData = async (count: number = 1000): Promise<void> => {
  try {
    console.log(`Connecting to MongoDB at ${process.env.MONGODB_URI}...`);
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/enkoat-quote-portal');
    console.log('Connected to MongoDB');
    
    console.log(`Generating ${count} mock quotes...`);
    
    // Check if quotes already exist in the database
    const existingCount = await Quote.countDocuments();
    if (existingCount > 0) {
      console.log(`Database already contains ${existingCount} quotes. Skipping mock data generation.`);
      await mongoose.disconnect();
      return;
    }
    
    // Generate quotes
    const quotes = Array.from({ length: count }, () => generateMockQuote());
    
    // Insert quotes into database
    await Quote.insertMany(quotes);
    
    console.log(`Successfully inserted ${count} mock quotes into the database.`);
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error generating mock data:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

// Execute if script is run directly
if (require.main === module) {
  const count = parseInt(process.argv[2]) || 1000;
  generateMockData(count)
    .then(() => console.log('Mock data generation complete.'))
    .catch(err => console.error('Error:', err));
}