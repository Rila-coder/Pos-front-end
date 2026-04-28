"use client";

import { useState } from "react";
import {
  Users,
  Banknote,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/Card";
import { Badge } from "@/components/common/ui/Badge";
import { Button } from "@/components/common/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/common/ui/Table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/common/ui/Dialog";

export default function CommissionTable({
  commissionData,
  totalCommission,
  onMarkPaid,
}: any) {
  const [confirmPaid, setConfirmPaid] = useState<any>(null);

  return (
    <>
      <Card className="shadow-lg border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-black uppercase text-base sm:text-lg text-foreground">
            <Banknote className="w-4 h-4 sm:w-5 sm:h-5 text-primary" /> Monthly Payroll
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="font-bold text-[9px] sm:text-[10px] uppercase text-foreground">Employee</TableHead>
                  <TableHead className="font-bold text-[9px] sm:text-[10px] uppercase text-foreground">Base Salary</TableHead>
                  <TableHead className="font-bold text-[9px] sm:text-[10px] uppercase text-foreground">Commission</TableHead>
                  <TableHead className="font-bold text-[9px] sm:text-[10px] uppercase text-foreground">Total Payable</TableHead>
                  <TableHead className="font-bold text-[9px] sm:text-[10px] uppercase text-foreground">Status</TableHead>
                  <TableHead className="text-right font-bold text-[9px] sm:text-[10px] uppercase text-foreground">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commissionData.map((item: any) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-muted/20 border-border"
                  >
                    <TableCell className="font-bold text-xs sm:text-sm text-foreground">
                      {item.name}
                    </TableCell>
                    <TableCell className="text-[10px] sm:text-xs font-medium text-muted-foreground">
                      Rs. {item.baseSalary.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-success font-black text-[10px] sm:text-xs">
                      + Rs. {item.commission.toLocaleString()}
                    </TableCell>
                    <TableCell className="font-black text-primary text-xs sm:text-sm">
                      Rs. {(item.baseSalary + item.commission).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          item.paymentStatus === "Paid"
                            ? "bg-success/10 text-success border-none text-[8px] sm:text-[9px]"
                            : "bg-warning/10 text-warning border-none text-[8px] sm:text-[9px] animate-pulse"
                        }
                      >
                        {item.paymentStatus === "Paid" ? (
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Paid
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Pending
                          </span>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {item.paymentStatus === "Pending" ? (
                        <Button
                          size="sm"
                          className="h-7 sm:h-8 bg-primary text-[8px] sm:text-[9px] uppercase font-black"
                          onClick={() => setConfirmPaid(item)}
                        >
                          Mark Paid
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 sm:h-8 text-[8px] sm:text-[9px] uppercase font-bold"
                          disabled
                        >
                          Done
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 bg-muted/30 rounded-xl border border-dashed flex justify-between items-center">
              <span className="text-[10px] sm:text-xs font-bold uppercase text-muted-foreground">
                Total Commissions
              </span>
              <span className="text-base sm:text-lg font-black text-success">
                Rs. {totalCommission.toLocaleString()}
              </span>
            </div>
            <div className="p-3 sm:p-4 bg-primary/10 rounded-xl border border-primary/20 flex justify-between items-center">
              <span className="text-[10px] sm:text-xs font-black text-primary uppercase">
                Total Payout
              </span>
              <span className="text-lg sm:text-xl font-black text-primary">
                Rs.{" "}
                {commissionData
                  .reduce(
                    (acc: any, curr: any) =>
                      acc + curr.baseSalary + curr.commission,
                    0,
                  )
                  .toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PAYMENT CONFIRMATION DIALOG */}
      <Dialog open={!!confirmPaid} onOpenChange={() => setConfirmPaid(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 uppercase font-black text-base sm:text-lg text-foreground">
              <AlertTriangle className="text-warning w-4 h-4 sm:w-5 sm:h-5" /> Confirm Payment
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Are you sure you want to mark salary as paid for:
            </p>
            <p className="text-base sm:text-lg font-black mt-2 uppercase text-foreground">
              {confirmPaid?.name}
            </p>
            <p className="text-xl sm:text-2xl font-black text-primary mt-1">
              Rs.{" "}
              {(
                confirmPaid?.baseSalary + confirmPaid?.commission
              ).toLocaleString()}
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setConfirmPaid(null)}
              className="font-bold uppercase text-[10px] sm:text-xs"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onMarkPaid(confirmPaid.id);
                setConfirmPaid(null);
              }}
              className="bg-success text-white font-black uppercase text-[10px] sm:text-xs px-4 sm:px-6"
            >
              Confirm & Pay
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}