"use client";

import { useState } from "react";
import { Button } from "@/components/common/ui/Button";
import { Printer, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/common/ui/Dialog";

export interface ReceiptData {
  id: string;
  date: string;
  customer: string;
  cashier: string;
  branch?: string;
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    total: number;
  }[];
  subtotal: number;
  discount?: number;
  discountAmount?: number;
  tax: number;
  total: number;
  amountPaid?: number;
  creditAmount?: number;
  paymentMethod: string;
  status?: string;
}

interface ReceiptPrinterProps {
  sale: ReceiptData;
  trigger?: React.ReactNode;
  onPrintComplete?: () => void;
}

export default function ReceiptPrinter({
  sale,
  trigger,
  onPrintComplete,
}: ReceiptPrinterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);

    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0px";
    iframe.style.height = "0px";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const change = (sale.amountPaid ?? 0) - sale.total;

    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Receipt - ${sale.id}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Courier New', monospace; background: white; padding: 20px; }
          .receipt { width: 80mm; max-width: 80mm; background: white; color: black; padding: 10px; font-size: 12px; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 10px; border-bottom: 1px dashed #000; padding-bottom: 8px; }
          .header h2 { margin: 0; font-size: 18px; font-weight: bold; }
          .header p { margin: 2px 0; font-size: 10px; }
          .info-section { border-top: 1px dashed #000; border-bottom: 1px dashed #000; padding: 5px 0; margin-bottom: 10px; font-size: 10px; }
          .info-row { display: flex; justify-content: space-between; margin-bottom: 2px; }
          .customer-row { font-weight: bold; margin-top: 3px; }
          .items-table { width: 100%; font-size: 11px; margin-bottom: 10px; border-collapse: collapse; }
          .items-table td { padding: 2px 0; }
          .items-table td:last-child { text-align: right; }
          .totals { border-top: 1px dashed #000; padding-top: 5px; font-size: 11px; }
          .total-row { display: flex; justify-content: space-between; margin-bottom: 3px; }
          .grand-total { display: flex; justify-content: space-between; font-weight: bold; font-size: 14px; margin-top: 5px; padding-top: 5px; border-top: 1px solid #000; }
          .payment-section { margin-top: 10px; font-size: 10px; padding-top: 5px; border-top: 1px dotted #000; }
          .footer { text-align: center; margin-top: 20px; font-size: 10px; }
          .thankyou { font-weight: bold; margin-top: 10px; }
          @page { size: 80mm auto; margin: 0mm; }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <h2>SMART POS</h2>
            <p>Premium Retail Solutions</p>
            <p>No. 123, Galle Road, Colombo 03</p>
            <p>Tel: +94 11 234 5678</p>
          </div>
          <div class="info-section">
            <div class="info-row"><span>INVOICE:</span><span>${sale.id}</span></div>
            <div class="info-row"><span>DATE:</span><span>${sale.date}</span></div>
            <div class="info-row"><span>CASHIER:</span><span>${sale.cashier}</span></div>
            <div class="info-row customer-row"><span>CUSTOMER:</span><span>${sale.customer}</span></div>
          </div>
          <table class="items-table">
            ${sale.items
              .map(
                (item) => `
              <tr>
                <td>${item.name} x ${item.quantity}</td>
                <td>Rs. ${item.total.toFixed(2)}</td>
              </tr>
            `,
              )
              .join("")}
          </table>
          <div class="totals">
            <div class="total-row"><span>Subtotal</span><span>Rs. ${sale.subtotal.toFixed(2)}</span></div>
            <div class="total-row"><span>VAT (18%)</span><span>Rs. ${(sale.tax * 0.878).toFixed(2)}</span></div>
            <div class="total-row"><span>SSCL (2.5%)</span><span>Rs. ${(sale.tax * 0.122).toFixed(2)}</span></div>
            <div class="grand-total"><span>TOTAL</span><span>Rs. ${sale.total.toFixed(2)}</span></div>
          </div>
          <div class="payment-section">
            <div class="total-row"><span>Paid (${sale.paymentMethod})</span><span>Rs. ${(sale.amountPaid ?? 0).toFixed(2)}</span></div>
            <div class="total-row" style="${sale.creditAmount ? "color: #f59e0b; font-weight: bold;" : ""}">
              <span>${sale.creditAmount ? "BALANCE DUE" : "CHANGE"}</span>
              <span>Rs. ${sale.creditAmount ? sale.creditAmount.toFixed(2) : change > 0 ? change.toFixed(2) : "0.00"}</span>
            </div>
          </div>
          <div class="footer">
            <p class="thankyou">THANK YOU FOR YOUR BUSINESS!</p>
            <p>Webstar POS Solutions v1.0</p>
          </div>
        </div>
      </body>
      </html>
    `;

    iframe.srcdoc = printContent;

    iframe.onload = () => {
      // Small timeout to ensure content is rendered inside iframe
      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();

        // FIX: Remove iframe and reset states after the print dialog closes
        // We use a small timeout because window.print() is blocking
        setTimeout(() => {
          document.body.removeChild(iframe);
          setIsPrinting(false);
          setIsOpen(false); // Automatically close the preview after printing
          if (onPrintComplete) onPrintComplete();
        }, 500);
      }, 200);
    };
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div onClick={handleOpen} className="cursor-pointer">
        {trigger || (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-primary"
            title="Print Receipt"
          >
            <Printer className="w-4 h-4" />
          </Button>
        )}
      </div>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          // Only allow manual close if not currently in the printing process
          if (!isPrinting) setIsOpen(open);
        }}
      >
        <DialogContent className="max-w-[400px] bg-white text-black p-0 overflow-hidden border-none shadow-2xl">
          <DialogHeader className="bg-muted p-4 border-b">
            <DialogTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground text-center">
              Receipt Preview
            </DialogTitle>
          </DialogHeader>

          <div className="p-6 font-mono text-xs space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-black">SMART POS</h2>
              <p className="uppercase font-bold">Premium Retail Store</p>
              <p>No. 123, Galle Road, Colombo 03</p>
              <p>Tel: +94 11 234 5678</p>
            </div>

            <div className="border-y border-dashed border-black py-2 space-y-1 uppercase font-bold text-[10px]">
              <div className="flex justify-between">
                <span>Invoice:</span>
                <span>{sale.id}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{sale.date}</span>
              </div>
              <div className="flex justify-between">
                <span>Cashier:</span>
                <span>{sale.cashier}</span>
              </div>
              <div className="flex justify-between">
                <span>Customer:</span>
                <span>{sale.customer}</span>
              </div>
            </div>

            <div className="space-y-1">
              {sale.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>Rs. {item.total.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed border-black pt-2 space-y-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs. {sale.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>VAT (18%)</span>
                <span>Rs. {(sale.tax * 0.878).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>SSCL (2.5%)</span>
                <span>Rs. {(sale.tax * 0.122).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-black text-lg border-t border-black mt-2 pt-2 uppercase">
                <span>Total</span>
                <span>Rs. {sale.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-dotted border-black space-y-1">
              <div className="flex justify-between italic">
                <span>Paid ({sale.paymentMethod})</span>
                <span>Rs. {(sale.amountPaid ?? 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>{sale.creditAmount ? "Credit Balance" : "Change"}</span>
                <span>
                  Rs.{" "}
                  {sale.creditAmount
                    ? sale.creditAmount.toFixed(2)
                    : (sale.amountPaid ?? 0) - sale.total > 0
                      ? ((sale.amountPaid ?? 0) - sale.total).toFixed(2)
                      : "0.00"}
                </span>
              </div>
            </div>

            <div className="text-center pt-6 space-y-1">
              <p className="font-bold">THANK YOU FOR YOUR BUSINESS!</p>
              <p className="text-[9px]">Webstar POS Solutions v1.0</p>
            </div>
          </div>

          <div className="p-4 bg-muted border-t flex gap-2">
            <Button
              variant="outline"
              className="flex-1 font-bold uppercase"
              onClick={() => setIsOpen(false)}
              disabled={isPrinting}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-primary text-white font-black uppercase"
              onClick={handlePrint}
              disabled={isPrinting}
            >
              <Printer className="w-4 h-4 mr-2" />
              {isPrinting ? "Printing..." : "Print"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
