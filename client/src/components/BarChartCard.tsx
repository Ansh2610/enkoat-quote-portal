import { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface DataItem {
  name: string;
  value: number;
}

interface BarChartCardProps {
  title: string;
  data: DataItem[];
  loading?: boolean;
  color?: string;
  valueLabel?: string;
  height?: number | string;
  maxItems?: number;
  showControls?: boolean;
}

const BarChartCard = ({
  title,
  data,
  loading = false,
  color = '#1976d2',
  valueLabel = 'Value',
  height = 300,
  maxItems = 10,
  showControls = true,
}: BarChartCardProps) => {
  const [displayCount, setDisplayCount] = useState(maxItems > 5 ? 5 : maxItems);
  const chartData = data.slice(0, displayCount);

  const handleDisplayCountChange = (event: SelectChangeEvent<number>) => {
    setDisplayCount(Number(event.target.value));
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        
        {showControls && (
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="display-count-label">Display</InputLabel>
            <Select
              labelId="display-count-label"
              value={displayCount}
              label="Display"
              onChange={handleDisplayCountChange}
            >
              {[5, 10, 15, 20].map((count) => (
                count <= maxItems ? (
                  <MenuItem key={count} value={count}>
                    Top {count}
                  </MenuItem>
                ) : null
              ))}
              <MenuItem value={maxItems}>All</MenuItem>
            </Select>
          </FormControl>
        )}
      </Box>

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
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name={valueLabel} fill={color} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
};

export default BarChartCard;