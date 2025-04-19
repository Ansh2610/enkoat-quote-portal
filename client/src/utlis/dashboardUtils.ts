import { CountByField, AvgRoofSizeByType, MonthlyTrend, QuoteStats } from '../types';

// Format counts by field (state, roof type) for chart display
export const formatCountsByField = (data: CountByField[], labelField = '_id'): { name: string; value: number }[] => {
  return data.map(item => ({
    name: (item as any)[labelField],
    value: item.count
  }));
};

// Format average roof size data for chart display
export const formatAvgRoofSizeByType = (data: AvgRoofSizeByType[]): { name: string; value: number }[] => {
  return data.map(item => ({
    name: item._id,
    value: Math.round(item.averageSize) // Round to whole number for display
  }));
};

// Month names for formatting
const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// Format monthly trend data for line chart
export const formatMonthlyTrend = (data: MonthlyTrend[]): { name: string; count: number }[] => {
  // Sort by date (year, month)
  const sortedData = [...data].sort((a, b) => {
    if (a._id.year !== b._id.year) {
      return a._id.year - b._id.year;
    }
    return a._id.month - b._id.month;
  });

  return sortedData.map(item => ({
    name: `${MONTH_NAMES[item._id.month - 1]} ${item._id.year}`,
    count: item.count,
    // Add these for tooltip
    year: item._id.year,
    month: item._id.month
  }));
};

// Calculate total projects from stats
export const calculateTotalProjects = (stats: QuoteStats): number => {
  if (!stats.byState.length) return 0;
  
  return stats.byState.reduce((sum, item) => sum + item.count, 0);
};

// Calculate average roof size from stats
export const calculateAverageRoofSize = (stats: QuoteStats): number => {
  if (!stats.avgRoofSizeByType.length) return 0;
  
  const totalSize = stats.avgRoofSizeByType.reduce((sum, item) => {
    return sum + (item.averageSize * getCountForRoofType(stats, item._id));
  }, 0);
  
  const totalCount = calculateTotalProjects(stats);
  
  return totalCount ? Math.round(totalSize / totalCount) : 0;
};

// Get count for a specific roof type
const getCountForRoofType = (stats: QuoteStats, roofType: string): number => {
  const typeData = stats.byRoofType.find(item => item._id === roofType);
  return typeData ? typeData.count : 0;
};

// Calculate top states from stats
export const getTopStates = (stats: QuoteStats, count: number = 3): string => {
  if (!stats.byState.length) return 'N/A';
  
  return stats.byState
    .sort((a, b) => b.count - a.count)
    .slice(0, count)
    .map(item => item._id)
    .join(', ');
};

// Calculate top roof types from stats
export const getTopRoofTypes = (stats: QuoteStats, count: number = 3): string => {
  if (!stats.byRoofType.length) return 'N/A';
  
  return stats.byRoofType
    .sort((a, b) => b.count - a.count)
    .slice(0, count)
    .map(item => item._id)
    .join(', ');
};

// Calculate estimated energy savings based on roof type and size
// This is a mock calculation for the dashboard
export const calculateEstimatedEnergySavings = (
  roofType: string, 
  roofSize: number
): number => {
  // Define savings factors by roof type (kWh per sq ft per year)
  // These are mock values for demonstration
  const savingsFactors: Record<string, number> = {
    'Metal': 3.2,
    'TPO': 2.8,
    'Foam': 3.5,
    'Shingle': 1.2,
    'EPDM': 2.0,
    'PVC': 2.5,
    'Modified Bitumen': 1.8,
    'Other': 1.5
  };

  // Calculate annual energy savings in kWh
  const annualSavingsKWh = roofSize * (savingsFactors[roofType] || 1.5);
  
  // Convert to dollar value (assuming $0.12 per kWh as average electricity cost)
  const annualSavingsDollars = annualSavingsKWh * 0.12;
  
  return Math.round(annualSavingsDollars);
};

// Calculate total estimated annual energy savings from all projects
export const calculateTotalEnergySavings = (stats: QuoteStats): number => {
  if (!stats.avgRoofSizeByType.length || !stats.byRoofType.length) return 0;
  
  let totalSavings = 0;
  
  stats.byRoofType.forEach(typeData => {
    const roofType = typeData._id;
    const count = typeData.count;
    
    // Find average size for this roof type
    const sizeData = stats.avgRoofSizeByType.find(item => item._id === roofType);
    if (sizeData) {
      const avgSize = sizeData.averageSize;
      const savingsPerProject = calculateEstimatedEnergySavings(roofType, avgSize);
      totalSavings += savingsPerProject * count;
    }
  });
  
  return totalSavings;
};