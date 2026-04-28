"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/Card";
import { Button } from "@/components/common/ui/Button";
import { Label } from "@/components/common/ui/Label";
import { Textarea } from "@/components/common/ui/Textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/common/ui/Dialog";
import { Badge } from "@/components/common/ui/Badge";
import { Package, Truck, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/common/ui/Alert";

interface TransferRequest {
  id: string;
  requestedBy: string;
  requestedBranch: string;
  requestedDate: string;
  requiredByDate: string;
  productId: number;
  productName: string;
  productSku: string;
  quantity: number;
  unit: string;
  currentStock: number;
  reason: string;
  status: string;
  assignedToBranch?: string;
  assignedToAdmin?: string;
  history: any[];
}

interface StockTransferReceiveProps {
  branchName: string;
}

// Mock initial requests for demo
const MOCK_INITIAL_REQUESTS = [
  {
    id: "REQ-1713456789000",
    requestedBy: "Kandy Admin",
    requestedBranch: "Kandy Branch",
    requestedDate: "2026-04-18T10:30:00.000Z",
    requiredByDate: "2026-04-25T10:30:00.000Z",
    productId: 3,
    productName: "T-Shirt",
    productSku: "SKU005",
    quantity: 10,
    unit: "Pcs",
    currentStock: 5,
    reason: "High demand, running low on stock",
    status: "assigned",
    assignedToBranch: "Main Branch",
    assignedToAdmin: "Main Branch",
    history: []
  },
  {
    id: "REQ-1713456789001",
    requestedBy: "Galle Admin",
    requestedBranch: "Galle Branch",
    requestedDate: "2026-04-17T14:20:00.000Z",
    requiredByDate: "2026-04-24T14:20:00.000Z",
    productId: 6,
    productName: "Rice 5kg",
    productSku: "SKU008",
    quantity: 15,
    unit: "Bag",
    currentStock: 8,
    reason: "Supplier delay, need for weekend sales",
    status: "assigned",
    assignedToBranch: "Main Branch",
    assignedToAdmin: "Main Branch",
    history: []
  }
];

export default function StockTransferReceive({ branchName }: StockTransferReceiveProps) {
  const [requests, setRequests] = useState<TransferRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<TransferRequest | null>(null);
  const [showAcceptDialog, setShowAcceptDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    loadRequests();
    const existing = localStorage.getItem("stockTransferRequests");
    if (!existing || JSON.parse(existing).length === 0) {
      localStorage.setItem("stockTransferRequests", JSON.stringify(MOCK_INITIAL_REQUESTS));
    }
  }, []);

  const loadRequests = () => {
    const allRequests = JSON.parse(localStorage.getItem("stockTransferRequests") || "[]");
    const assignedToMe = allRequests.filter(
      (r: TransferRequest) => r.assignedToBranch === branchName && r.status === "assigned"
    );
    setRequests(assignedToMe);
  };

  const handleAccept = () => {
    if (!selectedRequest) return;
    
    setIsProcessing(true);
    
    const allRequests = JSON.parse(localStorage.getItem("stockTransferRequests") || "[]");
    const updatedRequests = allRequests.map((r: TransferRequest) => {
      if (r.id === selectedRequest.id) {
        return {
          ...r,
          status: "shipped",
          history: [
            ...r.history,
            {
              id: `hist-${Date.now()}`,
              date: new Date().toISOString(),
              action: "Stock Shipped",
              performedBy: localStorage.getItem("userName") || "Branch Admin",
              role: "admin",
              comment: `Shipped ${selectedRequest.quantity} ${selectedRequest.unit} to ${selectedRequest.requestedBranch}`,
              branch: branchName
            }
          ]
        };
      }
      return r;
    });
    
    localStorage.setItem("stockTransferRequests", JSON.stringify(updatedRequests));
    
    setSuccessMessage(`Stock transfer initiated! ${selectedRequest.quantity} ${selectedRequest.unit} of ${selectedRequest.productName} will be shipped to ${selectedRequest.requestedBranch}`);
    setShowSuccess(true);
    setIsProcessing(false);
    setShowAcceptDialog(false);
    loadRequests();
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancel = () => {
    if (!selectedRequest) return;
    if (!cancelReason.trim()) {
      alert("Please provide a reason for cancellation");
      return;
    }
    
    setIsProcessing(true);
    
    const allRequests = JSON.parse(localStorage.getItem("stockTransferRequests") || "[]");
    const updatedRequests = allRequests.map((r: TransferRequest) => {
      if (r.id === selectedRequest.id) {
        return {
          ...r,
          status: "cancelled",
          cancellationReason: cancelReason,
          history: [
            ...r.history,
            {
              id: `hist-${Date.now()}`,
              date: new Date().toISOString(),
              action: "Request Cancelled",
              performedBy: localStorage.getItem("userName") || "Branch Admin",
              role: "admin",
              comment: cancelReason,
              branch: branchName
            }
          ]
        };
      }
      return r;
    });
    
    localStorage.setItem("stockTransferRequests", JSON.stringify(updatedRequests));
    
    setSuccessMessage(`Request cancelled. Reason: ${cancelReason}`);
    setShowSuccess(true);
    setIsProcessing(false);
    setShowCancelDialog(false);
    setCancelReason("");
    loadRequests();
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "assigned":
        return <Badge className="bg-primary/10 text-primary border-none text-[9px] sm:text-[10px]">Pending Your Action</Badge>;
      case "shipped":
        return <Badge className="bg-success/10 text-success border-none text-[9px] sm:text-[10px]">Shipped</Badge>;
      case "cancelled":
        return <Badge variant="destructive" className="text-[9px] sm:text-[10px]">Cancelled</Badge>;
      default:
        return <Badge variant="outline" className="text-[9px] sm:text-[10px]">{status}</Badge>;
    }
  };

  return (
    <>
      {showSuccess && (
        <Alert className="mb-4 bg-success/10 border-success/20">
          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-success" />
          <AlertDescription className="text-success text-xs sm:text-sm">{successMessage}</AlertDescription>
        </Alert>
      )}

      <Card className="shadow-lg border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-foreground">
            <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            Incoming Transfer Requests
          </CardTitle>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Requests assigned to your branch for fulfillment
          </p>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <div className="text-center py-8 sm:py-12 text-muted-foreground">
              <Package className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No pending transfer requests assigned to your branch</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="p-3 sm:p-4 rounded-xl border border-border bg-muted/5 hover:bg-muted/10 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h4 className="font-bold text-foreground text-sm sm:text-base">{request.productName}</h4>
                        {getStatusBadge(request.status)}
                      </div>
                      <p className="text-[10px] sm:text-xs text-muted-foreground font-mono">SKU: {request.productSku}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-3 text-xs sm:text-sm">
                        <div>
                          <span className="text-muted-foreground">Requested By:</span>
                          <p className="font-medium">{request.requestedBranch}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Quantity Needed:</span>
                          <p className="font-bold text-primary">{request.quantity} {request.unit}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Required By:</span>
                          <p>{new Date(request.requiredByDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Request Date:</span>
                          <p>{new Date(request.requestedDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="mt-3 p-2 bg-muted/20 rounded-lg">
                        <span className="text-[10px] sm:text-xs text-muted-foreground">Reason:</span>
                        <p className="text-xs sm:text-sm mt-1">{request.reason}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-0 sm:ml-4">
                      <Button
                        size="sm"
                        className="bg-success hover:bg-success/90 text-xs sm:text-sm h-8 sm:h-9"
                        onClick={() => {
                          setSelectedRequest(request);
                          setShowAcceptDialog(true);
                        }}
                      >
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        Accept & Ship
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-destructive text-destructive hover:bg-destructive/10 text-xs sm:text-sm h-8 sm:h-9"
                        onClick={() => {
                          setSelectedRequest(request);
                          setShowCancelDialog(true);
                        }}
                      >
                        <XCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Accept Dialog */}
      <Dialog open={showAcceptDialog} onOpenChange={setShowAcceptDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
              Confirm Stock Shipment
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-muted/20 p-3 rounded-lg">
              <p className="text-sm font-bold">Product: {selectedRequest?.productName}</p>
              <p className="text-sm">Quantity: {selectedRequest?.quantity} {selectedRequest?.unit}</p>
              <p className="text-sm">To Branch: {selectedRequest?.requestedBranch}</p>
            </div>
            <Alert>
              <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              <AlertDescription className="text-xs sm:text-sm">
                You are about to confirm shipment of these items. This will deduct from your stock.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAcceptDialog(false)}>Cancel</Button>
            <Button onClick={handleAccept} disabled={isProcessing} className="bg-success text-xs sm:text-sm">
              {isProcessing ? "Processing..." : "Confirm Shipment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
              <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-destructive" />
              Cancel Transfer Request
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-muted/20 p-3 rounded-lg">
              <p className="text-sm font-bold">Product: {selectedRequest?.productName}</p>
              <p className="text-sm">Quantity: {selectedRequest?.quantity} {selectedRequest?.unit}</p>
              <p className="text-sm">Requested by: {selectedRequest?.requestedBranch}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-destructive text-xs sm:text-sm">
                Cancellation Reason <span className="text-destructive">*</span>
              </Label>
              <Textarea
                placeholder="e.g., Insufficient stock, Product discontinued, etc."
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                rows={3}
                className="text-sm"
              />
              <p className="text-[10px] sm:text-xs text-muted-foreground">Reason will be visible to the requesting branch</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>Go Back</Button>
            <Button onClick={handleCancel} disabled={isProcessing} variant="destructive" className="text-xs sm:text-sm">
              {isProcessing ? "Processing..." : "Cancel Request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}