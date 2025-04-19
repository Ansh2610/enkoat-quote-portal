import {
    Paper,
    Typography,
    Box,
    CircularProgress,
  } from '@mui/material';
  import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from 'recharts';
  
  interface LineChartCardProps {
    title: string;
    data: any[];
    loading?: boolean;
    color?: string;
    xAxisDataKey: string;
    lineDataKey: string;
    valueLabel?: string;
    height?: number | string;
  }
  
  const LineChartCard = ({
    title,
    data,
    loading = false,
    color = '#1976d2',
    xAxisDataKey,
    lineDataKey,
    valueLabel = 'Value',
    height = 300,
  }: LineChartCardProps) => {
    return (
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
  
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height }}>
            <CircularProgress />
          </Box>
        ) : data.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height }}>
            <Typography variant="body1" color="text.secondary">
              No data available
            </Typography>
          </Box>
        ) : (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey={xAxisDataKey} 
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={lineDataKey}
                name={valueLabel}
                stroke={color}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Paper>
    );
  };
  
  export default LineChartCard;