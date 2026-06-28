'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

/**
 * Prints the invoice/payment-history card to PDF via the browser.
 * Targets `.invoice-print` so only the card prints (sidebar/chrome hidden
 * via the global print rules + this scope).
 * ponytail: no server-side PDF generation yet. Add a real invoice template
 * + pdf-lib when tax-formal invoices are required.
 */
export function InvoiceDownloadButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Button variant="ghost" size="sm" onClick={handlePrint} className="hover:bg-primary/10 hover:text-primary transition-colors">
      <Download className="h-4 w-4 mr-1" />
      Download
    </Button>
  );
}
