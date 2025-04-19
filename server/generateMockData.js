// Simple mock data generator script
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Define schema for Quote
const QuoteSchema = new mongoose.Schema(
  {
    contractorName: {
      type: String,
      required: [true, 'Contractor name is required'],
      trim: true,
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    roofSize: {
      type: Number,
      required: [true, 'Roof size is required'],
      min: [1, 'Roof size cannot be less than 1 sq ft'],
    },
    roofType: {
      type: String,
      required: [true, 'Roof type is required'],
      enum: ['Metal', 'TPO', 'Foam', 'Shingle', 'EPDM', 'PVC', 'Modified Bitumen', 'Other'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
      maxlength: [2, 'Please use state abbreviation (2 characters)'],
      minlength: [2, 'Please use state abbreviation (2 characters)'],
    },
    projectDate: {
      type: Date,
      required: [true, 'Project date is required'],
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create model
const Quote = mongoose.model('Quote', QuoteSchema);

// Define constants
const US_STATES = [
  'AZ', 'CA', 'CO', 'FL', 'GA', 'ID', 'IL', 'IN', 'KS', 'KY', 
  'MA', 'MD', 'MI', 'MN', 'MO', 'NC', 'NJ', 'NM', 'NV', 'NY', 
  'OH', 'OK', 'OR', 'PA', 'SC', 'TN', 'TX', 'UT', 'VA', 'WA'
];

const ROOF_TYPES = ['Metal', 'TPO', 'Foam', 'Shingle', 'EPDM', 'PVC', 'Modified Bitumen', 'Other'];

const COMPANY_PREFIXES = ['Advanced', 'Elite', 'Premium', 'Professional', 'Quality', 'Reliable', 'Superior', 'United'];
const COMPANY_SUFFIXES = ['Roofing', 'Construction', 'Contractors', 'Services', 'Solutions', 'Builders', 'Systems'];

const CITIES_BY_STATE = {
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

const FIRST_NAMES = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa', 'William', 'Mary'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson'];

// Helper functions
const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomDate = (start, end) => {
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

// Generate and insert mock data
async function generateMockData(count = 1000) {
  try {
    const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/enkoat-quote-portal';
    console.log(`Connecting to MongoDB at ${connectionString}...`);
    
    await mongoose.connect(connectionString);
    console.log('Connected to MongoDB');
    
    // Check if quotes already exist
    const existingCount = await Quote.countDocuments();
    if (existingCount > 0) {
      console.log(`Database already contains ${existingCount} quotes. Skipping mock data generation.`);
      await mongoose.disconnect();
      return;
    }
    
    console.log(`Generating ${count} mock quotes...`);
    
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
    
    try {
      await mongoose.disconnect();
    } catch (e) {
      console.error('Error disconnecting from MongoDB:', e);
    }
    
    process.exit(1);
  }
}

// Run the function with the count from command line or default to 1000
const count = parseInt(process.argv[2]) || 1000;
generateMockData(count)
  .then(() => console.log('Mock data generation complete.'))
  .catch(err => console.error('Error:', err));