// Quote interface matching the backend model
export interface Quote {
    _id?: string;
    contractorName: string;
    company: string;
    roofSize: number;
    roofType: string;
    city: string;
    state: string;
    projectDate: string; // Use string for date in frontend
    createdAt?: string;
    updatedAt?: string;
  }
  
  // API response interfaces
  export interface ApiResponse<T> {
    success: boolean;
    data: T;
    count?: number;
    message?: string;
    error?: string | string[];
  }
  
  // Statistics interfaces for dashboard
  export interface CountByField {
    _id: string;
    count: number;
  }
  
  export interface AvgRoofSizeByType {
    _id: string;
    averageSize: number;
  }
  
  export interface MonthlyTrend {
    _id: {
      month: number;
      year: number;
    };
    count: number;
  }
  
  export interface QuoteStats {
    byState: CountByField[];
    byRoofType: CountByField[];
    avgRoofSizeByType: AvgRoofSizeByType[];
    monthlyTrend: MonthlyTrend[];
  }
  
  // Form enums
  export enum RoofType {
    METAL = 'Metal',
    TPO = 'TPO',
    FOAM = 'Foam',
    SHINGLE = 'Shingle',
    EPDM = 'EPDM',
    PVC = 'PVC',
    MODIFIED_BITUMEN = 'Modified Bitumen',
    OTHER = 'Other'
  }
  
  // US states list
  export const US_STATES = [
    { code: 'AL', name: 'Alabama' },
    { code: 'AK', name: 'Alaska' },
    { code: 'AZ', name: 'Arizona' },
    { code: 'AR', name: 'Arkansas' },
    { code: 'CA', name: 'California' },
    { code: 'CO', name: 'Colorado' },
    { code: 'CT', name: 'Connecticut' },
    { code: 'DE', name: 'Delaware' },
    { code: 'DC', name: 'District Of Columbia' },
    { code: 'FL', name: 'Florida' },
    { code: 'GA', name: 'Georgia' },
    { code: 'HI', name: 'Hawaii' },
    { code: 'ID', name: 'Idaho' },
    { code: 'IL', name: 'Illinois' },
    { code: 'IN', name: 'Indiana' },
    { code: 'IA', name: 'Iowa' },
    { code: 'KS', name: 'Kansas' },
    { code: 'KY', name: 'Kentucky' },
    { code: 'LA', name: 'Louisiana' },
    { code: 'ME', name: 'Maine' },
    { code: 'MD', name: 'Maryland' },
    { code: 'MA', name: 'Massachusetts' },
    { code: 'MI', name: 'Michigan' },
    { code: 'MN', name: 'Minnesota' },
    { code: 'MS', name: 'Mississippi' },
    { code: 'MO', name: 'Missouri' },
    { code: 'MT', name: 'Montana' },
    { code: 'NE', name: 'Nebraska' },
    { code: 'NV', name: 'Nevada' },
    { code: 'NH', name: 'New Hampshire' },
    { code: 'NJ', name: 'New Jersey' },
    { code: 'NM', name: 'New Mexico' },
    { code: 'NY', name: 'New York' },
    { code: 'NC', name: 'North Carolina' },
    { code: 'ND', name: 'North Dakota' },
    { code: 'OH', name: 'Ohio' },
    { code: 'OK', name: 'Oklahoma' },
    { code: 'OR', name: 'Oregon' },
    { code: 'PA', name: 'Pennsylvania' },
    { code: 'RI', name: 'Rhode Island' },
    { code: 'SC', name: 'South Carolina' },
    { code: 'SD', name: 'South Dakota' },
    { code: 'TN', name: 'Tennessee' },
    { code: 'TX', name: 'Texas' },
    { code: 'UT', name: 'Utah' },
    { code: 'VT', name: 'Vermont' },
    { code: 'VA', name: 'Virginia' },
    { code: 'WA', name: 'Washington' },
    { code: 'WV', name: 'West Virginia' },
    { code: 'WI', name: 'Wisconsin' },
    { code: 'WY', name: 'Wyoming' }
  ];