import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Quote, QuoteStats } from '../types';
import { 
  calculateTotalProjects, 
  calculateAverageRoofSize, 
  calculateTotalEnergySavings, 
  getTopStates, 
  getTopRoofTypes 
} from './dashboardUtils';

// Extend jsPDF with autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

/**
 * Generate a PDF report from dashboard data
 */
export const generateDashboardReport = (
  stats: QuoteStats,
  projectsByState: any[],
  roofSizeByType: any[],
  monthlyTrend: any[],
  filters: { state?: string; roofType?: string; startDate?: string; endDate?: string } = {}
): jsPDF => {
  // Create a new PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const textColor = '#333333';
  
  // Add report title
  doc.setFontSize(20);
  doc.setTextColor(textColor);
  doc.text('EnKoat Performance Dashboard Report', pageWidth / 2, 20, { align: 'center' });
  
  // Add report date
  doc.setFontSize(10);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, 30, { align: 'center' });
  
  // Add filter information if any filters are applied
  let yPosition = 40;
  if (Object.values(filters).some(val => val)) {
    doc.setFontSize(12);
    doc.text('Applied Filters:', 14, yPosition);
    yPosition += 7;
    
    doc.setFontSize(10);
    if (filters.state) {
      doc.text(`• State: ${filters.state}`, 20, yPosition);
      yPosition += 6;
    }
    if (filters.roofType) {
      doc.text(`• Roof Type: ${filters.roofType}`, 20, yPosition);
      yPosition += 6;
    }
    if (filters.startDate) {
      doc.text(`• Start Date: ${new Date(filters.startDate).toLocaleDateString()}`, 20, yPosition);
      yPosition += 6;
    }
    if (filters.endDate) {
      doc.text(`• End Date: ${new Date(filters.endDate).toLocaleDateString()}`, 20, yPosition);
      yPosition += 6;
    }
    yPosition += 5;
  }
  
  // Add summary statistics
  doc.setFontSize(14);
  doc.text('Summary Statistics', 14, yPosition);
  yPosition += 10;
  
  const totalProjects = calculateTotalProjects(stats);
  const avgRoofSize = calculateAverageRoofSize(stats);
  const totalSavings = calculateTotalEnergySavings(stats);
  const topLocations = getTopStates(stats);
  const topRoofTypes = getTopRoofTypes(stats);
  
  // Create a summary table
  doc.autoTable({
    startY: yPosition,
    head: [['Metric', 'Value']],
    body: [
      ['Total Projects', totalProjects.toLocaleString()],
      ['Average Roof Size', `${avgRoofSize.toLocaleString()} sq ft`],
      ['Estimated Annual Savings', `$${totalSavings.toLocaleString()}`],
      ['Top Locations', topLocations],
      ['Top Roof Types', topRoofTypes]
    ],
    headStyles: { fillColor: [25, 118, 210] },
    alternateRowStyles: { fillColor: [240, 240, 240] },
    margin: { left: 14, right: 14 }
  });
  
  yPosition = (doc as any).lastAutoTable.finalY + 15;
  
  // Projects by State
  if (projectsByState.length > 0) {
    doc.setFontSize(14);
    doc.text('Projects by State', 14, yPosition);
    yPosition += 10;
    
    const stateData = projectsByState
      .sort((a, b) => b.value - a.value)
      .slice(0, 10) // Top 10 states
      .map(item => [item.name, item.value.toString()]);
    
    doc.autoTable({
      startY: yPosition,
      head: [['State', 'Number of Projects']],
      body: stateData,
      headStyles: { fillColor: [25, 118, 210] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { left: 14, right: 14 }
    });
    
    yPosition = (doc as any).lastAutoTable.finalY + 15;
  }
  
  // Average Roof Size by Type
  if (roofSizeByType.length > 0) {
    // Check if we need to add a new page
    if (yPosition > 200) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(14);
    doc.text('Average Roof Size by Type', 14, yPosition);
    yPosition += 10;
    
    const typeData = roofSizeByType
      .sort((a, b) => b.value - a.value)
      .map(item => [item.name, `${item.value.toLocaleString()} sq ft`]);
    
    doc.autoTable({
      startY: yPosition,
      head: [['Roof Type', 'Average Size']],
      body: typeData,
      headStyles: { fillColor: [25, 118, 210] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { left: 14, right: 14 }
    });
    
    yPosition = (doc as any).lastAutoTable.finalY + 15;
  }
  
  // Monthly Trend
  if (monthlyTrend.length > 0) {
    // Check if we need to add a new page
    if (yPosition > 200) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(14);
    doc.text('Monthly Projects Trend', 14, yPosition);
    yPosition += 10;
    
    const trendData = monthlyTrend
      .map(item => [item.name, item.count.toString()]);
    
    doc.autoTable({
      startY: yPosition,
      head: [['Month', 'Number of Projects']],
      body: trendData,
      headStyles: { fillColor: [25, 118, 210] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { left: 14, right: 14 }
    });
  }
  
  // Add footer with EnKoat branding
  const pageCount = doc.getNumberOfPages();
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(
      'EnKoat Performance Dashboard Report',
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
    doc.text(
      `Page ${i} of ${pageCount}`,
      pageWidth - 20,
      doc.internal.pageSize.getHeight() - 10
    );
  }
  
  return doc;
};

/**
 * Generate a PDF report from quotes data
 */
export const generateQuotesReport = (quotes: Quote[]): jsPDF => {
  // Create a new PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Add report title
  doc.setFontSize(20);
  doc.setTextColor(33, 33, 33);
  doc.text('EnKoat Quotes Report', pageWidth / 2, 20, { align: 'center' });
  
  // Add report date
  doc.setFontSize(10);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, 30, { align: 'center' });
  
  // Create table with quotes data
  const tableData = quotes.map(quote => [
    quote.contractorName,
    quote.company,
    quote.city + ', ' + quote.state,
    `${quote.roofSize.toLocaleString()} sq ft`,
    quote.roofType,
    new Date(quote.projectDate).toLocaleDateString()
  ]);
  
  doc.autoTable({
    startY: 40,
    head: [['Contractor', 'Company', 'Location', 'Roof Size', 'Roof Type', 'Project Date']],
    body: tableData,
    headStyles: { fillColor: [25, 118, 210] },
    alternateRowStyles: { fillColor: [240, 240, 240] },
    margin: { left: 10, right: 10 },
    styles: { fontSize: 8, cellPadding: 3 },
    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 30 },
      2: { cellWidth: 30 },
      3: { cellWidth: 25 },
      4: { cellWidth: 30 },
      5: { cellWidth: 25 }
    }
  });
  
  // Add footer with EnKoat branding
  const pageCount = doc.getNumberOfPages();
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(
      'EnKoat Quotes Report',
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
    doc.text(
      `Page ${i} of ${pageCount}`,
      pageWidth - 20,
      doc.internal.pageSize.getHeight() - 10
    );
  }
  
  return doc;
};

/**
 * Download a generated PDF
 */
export const downloadPdf = (doc: jsPDF, filename: string): void => {
  doc.save(filename);
};