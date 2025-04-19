import { Paper, Typography, Box, SxProps, Theme } from '@mui/material';

interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  color?: string;
  sx?: SxProps<Theme>;
}

const SummaryCard = ({ title, value, subtitle, icon, color = 'primary.main', sx = {} }: SummaryCardProps) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        {icon && <Box sx={{ color }}>{icon}</Box>}
      </Box>
      
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color }}>
        {value}
      </Typography>
      
      {subtitle && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {subtitle}
        </Typography>
      )}
    </Paper>
  );
};

export default SummaryCard;