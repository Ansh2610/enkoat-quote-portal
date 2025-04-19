import axios from 'axios';
import { Quote, ApiResponse, QuoteStats } from '../types';

// Create axios instance with base URL from environment variable
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Quote API services
export const quoteService = {
  // Create a new quote
  createQuote: async (quote: Quote): Promise<ApiResponse<Quote>> => {
    try {
      const response = await api.post<ApiResponse<Quote>>('/quotes', quote);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
      throw error;
    }
  },

  // Get all quotes with optional filtering
  getQuotes: async (filters?: {
    state?: string;
    roofType?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<ApiResponse<Quote[]>> => {
    try {
      const response = await api.get<ApiResponse<Quote[]>>('/quotes', {
        params: filters,
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
      throw error;
    }
  },

  // Get quote statistics for dashboard
  getQuoteStats: async (): Promise<ApiResponse<QuoteStats>> => {
    try {
      const response = await api.get<ApiResponse<QuoteStats>>('/quotes/stats');
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
      throw error;
    }
  },

  // Get a single quote by ID
  getQuoteById: async (id: string): Promise<ApiResponse<Quote>> => {
    try {
      const response = await api.get<ApiResponse<Quote>>(`/quotes/${id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
      throw error;
    }
  },
};

export default api;