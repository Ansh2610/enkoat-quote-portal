import { Request, Response } from 'express';
import Quote, { IQuote } from '../models/Quote';

// Create a new quote
export const createQuote = async (req: Request, res: Response): Promise<void> => {
  try {
    const quoteData = req.body;
    const quote = new Quote(quoteData);
    const savedQuote = await quote.save();
    
    res.status(201).json({
      success: true,
      data: savedQuote,
      message: 'Quote submitted successfully',
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      // Handle validation errors
      const messages = Object.values(error.errors).map((err: any) => err.message);
      res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      // Handle other errors
      res.status(500).json({
        success: false,
        error: 'Server error',
        details: error.message,
      });
    }
  }
};

// Get all quotes with optional filtering
export const getQuotes = async (req: Request, res: Response): Promise<void> => {
  try {
    // Build filter object from query parameters
    const filter: any = {};
    
    // Filter by state if provided
    if (req.query.state) {
      filter.state = req.query.state;
    }
    
    // Filter by roof type if provided
    if (req.query.roofType) {
      filter.roofType = req.query.roofType;
    }
    
    // Apply date range filter if provided
    if (req.query.startDate && req.query.endDate) {
      filter.projectDate = {
        $gte: new Date(req.query.startDate as string),
        $lte: new Date(req.query.endDate as string),
      };
    }
    
    // Get quotes with filter
    const quotes = await Quote.find(filter).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: quotes.length,
      data: quotes,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'Server error',
      details: error.message,
    });
  }
};

// Get a single quote by ID
export const getQuoteById = async (req: Request, res: Response): Promise<void> => {
  try {
    const quote = await Quote.findById(req.params.id);
    
    if (!quote) {
      res.status(404).json({
        success: false,
        error: 'Quote not found',
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: quote,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'Server error',
      details: error.message,
    });
  }
};

// Get summary statistics
export const getQuoteStats = async (req: Request, res: Response): Promise<void> => {
  try {
    // Count quotes by state
    const byState = await Quote.aggregate([
      { $group: { _id: '$state', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Count quotes by roof type
    const byRoofType = await Quote.aggregate([
      { $group: { _id: '$roofType', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Average roof size by roof type
    const avgRoofSizeByType = await Quote.aggregate([
      { $group: { _id: '$roofType', averageSize: { $avg: '$roofSize' } } },
      { $sort: { averageSize: -1 } }
    ]);
    
    // Monthly project count
    const monthlyTrend = await Quote.aggregate([
      {
        $group: {
          _id: {
            month: { $month: '$projectDate' },
            year: { $year: '$projectDate' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        byState,
        byRoofType,
        avgRoofSizeByType,
        monthlyTrend
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'Server error',
      details: error.message,
    });
  }
};