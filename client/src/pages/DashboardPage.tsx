import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Alert,
  IconButton,
  Divider,
  Paper
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import SavingsIcon from '@mui/icons-material/Savings';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import SummaryCard from '../components/SummaryCard';
import BarChartCard from '../components/BarChartCard';
import LineChartCard from '../components/LineChartCard';
import { quoteService } from '../services/api';
import { QuoteStats, RoofType, US_STATES } from '../types';
import {
  formatCountsByField,
  formatAvgRoofSizeByType,
  formatMonthlyTrend,
  calculateTotalProjects,
  calculateAverageRoofSize,
  getTopStates,
  getTopRoofTypes,
  calculateTotalEnergySavings
} from '../utils/dashboardUtils';

const DashboardPage = () => {
  const [stats, setStats] = useState<QuoteStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [stateFilter, setStateFilter] = useState<string>('');
  const [roofTypeFilter, setRoofTypeFilter] = useState<string>('');
  const [startDateFilter, setStartDateFilter] = useState<string>('');
  const [endDateFilter, setEndDateFilter] = useState<string>('');
  
  // Chart data states
  const [projectsByState, setProjectsByState] = useState<any[]>([]);
  const [roofSizeByType, setRoofSizeByType] = useState<any[]>([]);
  const [monthlyTrend, setMonthlyTrend] = useState<any[]>([]);

  // Load data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await quoteService.getQuoteStats();
      
      if (response.success && response.data) {
        setStats(response.data);
        
        // Format data for charts
        setProjectsByState(formatCountsByField(response.data.byState));
        setRoofSizeByType(formatAvgRoofSizeByType(response.data.avgRoofSizeByType));
        setMonthlyTrend(formatMonthlyTrend(response.data.monthlyTrend));
      } else {
        setError('Failed to load dashboard data');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('An error occurred while loading the dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = async () => {
    setLoading(true);
    setError(null);

    try {
      // Collect active filters
      const filters: any = {};
      if (stateFilter) filters.state = stateFilter;
      if (roofTypeFilter) filters.roofType = roofTypeFilter;
      if (startDateFilter) filters.startDate = startDateFilter;
      if (endDateFilter) filters.endDate = endDateFilter;

      // First get the filtered quotes
      const quotesResponse = await quoteService.getQuotes(filters);
      
      // Then fetch the stats again (ideally this would be a single API call with filters)
      const statsResponse = await quoteService.getQuoteStats();
      
      if (statsResponse.success && statsResponse.data) {
        setStats(statsResponse.data);
        
        // Format data for charts
        setProjectsByState(formatCountsByField(statsResponse.data.byState));
        setRoofSizeByType(formatAvgRoofSizeByType(statsResponse.data.avgRoofSizeByType));
        setMonthlyTrend(formatMonthlyTrend(statsResponse.data.monthlyTrend));
      } else {
        setError('Failed to load dashboard data with filters');
      }
    } catch (error) {
      console.error('Error applying filters:', error);
      setError('An error occurred while applying filters');
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setStateFilter('');
    setRoofTypeFilter('');
    setStartDateFilter('');
    setEndDateFilter('');
    fetchDashboardData();
  };

  const handleExportData = () => {
    // This would generate a PDF or CSV in a real application
    alert('This feature would generate a report in the full application');
  };

  // Calculate summary values
  const totalProjects = stats ? calculateTotalProjects(stats) : 0;
  const avgRoofSize = stats ? calculateAverageRoofSize(stats) : 0;
  const totalSavings = stats ? calculateTotalEnergySavings(stats) : 0;
  const topLocations = stats ? getTopStates(stats) : 'N/A';

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <div>
            <Typography variant="h4" component="h1" gutterBottom>
              Performance Dashboard
            </Typography>
            <Typography variant="body1">
              View analytics and performance metrics for roofing projects.
            </Typography>
          </div>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<FilterAltIcon />}
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<FileDownloadIcon />}
              onClick={handleExportData}
            >
              Export
            </Button>
          </Box>
        </Box>
        
        {/* Filters Section */}
        {showFilters && (
          <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Filter Dashboard Data
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="state-filter-label">State</InputLabel>
                  <Select
                    labelId="state-filter-label"
                    value={stateFilter}
                    label="State"
                    onChange={(e) => setStateFilter(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>All States</em>
                    </MenuItem>
                    {US_STATES.map((state) => (
                      <MenuItem key={state.code} value={state.code}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              
              <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="roof-type-filter-label">Roof Type</InputLabel>
                  <Select
                    labelId="roof-type-filter-label"
                    value={roofTypeFilter}
                    label="Roof Type"
                    onChange={(e) => setRoofTypeFilter(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>All Types</em>
                    </MenuItem>
                    {Object.values(RoofType).map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              
              <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  size="small"
                  value={startDateFilter}
                  onChange={(e) => setStartDateFilter(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              
              <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                <TextField
                  fullWidth
                  label="End Date"
                  type="date"
                  size="small"
                  value={endDateFilter}
                  onChange={(e) => setEndDateFilter(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
            </Box>
            
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={handleResetFilters}
              >
                Reset
              </Button>
              
              <Button
                variant="contained"
                onClick={handleApplyFilters}
                disabled={loading}
              >
                Apply Filters
              </Button>
            </Box>
          </Paper>
        )}
        
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}
        
        {loading && !stats ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Summary Cards */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
              <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                <SummaryCard
                  title="Total Projects"
                  value={totalProjects.toLocaleString()}
                  icon={<HomeWorkIcon fontSize="large" />}
                  color="primary.main"
                />
              </Box>
              
              <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                <SummaryCard
                  title="Avg. Roof Size"
                  value={`${avgRoofSize.toLocaleString()} sq ft`}
                  icon={<SquareFootIcon fontSize="large" />}
                  color="secondary.main"
                />
              </Box>
              
              <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                <SummaryCard
                  title="Est. Annual Savings"
                  value={`$${totalSavings.toLocaleString()}`}
                  subtitle="Based on energy efficiency calculations"
                  icon={<SavingsIcon fontSize="large" />}
                  color="#4caf50"
                />
              </Box>
              
              <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                <SummaryCard
                  title="Top Locations"
                  value={topLocations}
                  subtitle="States with most projects"
                  icon={<LocationOnIcon fontSize="large" />}
                  color="#ff9800"
                />
              </Box>
            </Box>
            
            {/* Charts */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <Box sx={{ flex: '1 1 450px', minWidth: '300px' }}>
                <BarChartCard
                  title="Projects by State"
                  data={projectsByState}
                  loading={loading}
                  valueLabel="Number of Projects"
                  color="#1976d2"
                />
              </Box>
              
              <Box sx={{ flex: '1 1 450px', minWidth: '300px' }}>
                <BarChartCard
                  title="Average Roof Size by Type"
                  data={roofSizeByType}
                  loading={loading}
                  valueLabel="Square Feet"
                  color="#4caf50"
                />
              </Box>
              
              <Box sx={{ width: '100%', mt: 3 }}>
                <LineChartCard
                  title="Monthly Projects Trend"
                  data={monthlyTrend}
                  loading={loading}
                  xAxisDataKey="name"
                  lineDataKey="count"
                  valueLabel="Number of Projects"
                  color="#ff9800"
                  height={350}
                />
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default DashboardPage;