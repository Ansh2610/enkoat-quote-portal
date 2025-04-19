import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for Quote document
export interface IQuote extends Document {
  contractorName: string;
  company: string;
  roofSize: number;
  roofType: string;
  city: string;
  state: string;
  projectDate: Date;
  createdAt: Date;
}

// Create the schema for Quote
const QuoteSchema: Schema = new Schema(
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

// Add an index for faster querying by state and roofType
QuoteSchema.index({ state: 1 });
QuoteSchema.index({ roofType: 1 });

// Create and export the Quote model
export default mongoose.model<IQuote>('Quote', QuoteSchema);