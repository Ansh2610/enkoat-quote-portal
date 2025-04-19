import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  FormControl,
  FormHelperText,
  Grid,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import { Quote, RoofType, US_STATES } from '../types';
import { quoteService } from '../services/api';

type QuoteFormProps = {
  onSuccess?: (quote: Quote) => void;
};

const QuoteForm = ({ onSuccess }: QuoteFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Quote>({
    defaultValues: {
      contractorName: '',
      company: '',
      roofSize: 0,
      roofType: '',
      city: '',
      state: '',
      projectDate: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = async (data: Quote) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await quoteService.createQuote(data);
      
      if (response.success) {
        setSubmitSuccess(true);
        if (onSuccess) {
          onSuccess(response.data);
        }
        reset();
      } else {
        setSubmitError(
          Array.isArray(response.error) 
            ? response.error.join(', ') 
            : response.error || 'Failed to submit quote'
        );
      }
    } catch (error) {
      setSubmitError('An unexpected error occurred. Please try again later.');
      console.error('Error submitting quote:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        {submitSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Quote submitted successfully!
          </Alert>
        )}
        
        {submitError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {submitError}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            {/* Contractor Information Section */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Contractor Information
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Controller
                name="contractorName"
                control={control}
                rules={{ 
                  required: 'Contractor name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Contractor Name"
                    variant="outlined"
                    fullWidth
                    error={!!errors.contractorName}
                    helperText={errors.contractorName?.message}
                  />
                )}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Controller
                name="company"
                control={control}
                rules={{ 
                  required: 'Company name is required',
                  minLength: {
                    value: 2,
                    message: 'Company name must be at least 2 characters'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Company"
                    variant="outlined"
                    fullWidth
                    error={!!errors.company}
                    helperText={errors.company?.message}
                  />
                )}
              />
            </Grid>
            
            {/* Project Details Section */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Project Details
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Controller
                name="roofSize"
                control={control}
                rules={{ 
                  required: 'Roof size is required',
                  min: {
                    value: 1,
                    message: 'Roof size must be at least 1 sq ft'
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Please enter a valid number'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Roof Size"
                    variant="outlined"
                    fullWidth
                    type="number"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">sq ft</InputAdornment>,
                    }}
                    error={!!errors.roofSize}
                    helperText={errors.roofSize?.message}
                  />
                )}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Controller
                name="roofType"
                control={control}
                rules={{ required: 'Roof type is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Roof Type"
                    variant="outlined"
                    fullWidth
                    error={!!errors.roofType}
                    helperText={errors.roofType?.message}
                  >
                    {Object.values(RoofType).map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Controller
                name="city"
                control={control}
                rules={{ 
                  required: 'City is required',
                  minLength: {
                    value: 2,
                    message: 'City must be at least 2 characters'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="City"
                    variant="outlined"
                    fullWidth
                    error={!!errors.city}
                    helperText={errors.city?.message}
                  />
                )}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Controller
                name="state"
                control={control}
                rules={{ required: 'State is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="State"
                    variant="outlined"
                    fullWidth
                    error={!!errors.state}
                    helperText={errors.state?.message}
                  >
                    {US_STATES.map((state) => (
                      <MenuItem key={state.code} value={state.code}>
                        {state.name} ({state.code})
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Controller
                name="projectDate"
                control={control}
                rules={{ required: 'Project date is required' }}
                render={({ field }) => (
                  <DatePicker
                    label="Project Date"
                    value={field.value ? new Date(field.value) : null}
                    onChange={(date) => field.onChange(date ? date.toISOString().split('T')[0] : null)}
                    slotProps={{
                      textField: {
                        variant: 'outlined',
                        fullWidth: true,
                        error: !!errors.projectDate,
                        helperText: errors.projectDate?.message,
                      },
                    }}
                  />
                )}
              />
            </Grid>
            
            {/* Submit Button Section */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => reset()}
                  disabled={isSubmitting}
                >
                  Reset Form
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Quote'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </LocalizationProvider>
  );
};

export default QuoteForm;