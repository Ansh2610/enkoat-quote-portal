import express from 'express';
import { 
  createQuote, 
  getQuotes, 
  getQuoteById, 
  getQuoteStats 
} from '../controllers/quoteController';

const router = express.Router();

// POST a new quote
router.post('/', createQuote);

// GET all quotes with optional filtering
router.get('/', getQuotes);

// GET quote statistics
router.get('/stats', getQuoteStats);

// GET a single quote by ID
router.get('/:id', getQuoteById);

export default router;