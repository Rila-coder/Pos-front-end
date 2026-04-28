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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/Select";
import { Badge } from "@/components/common/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/common/ui/Tabs";
import { Package, CheckCircle, XCircle, AlertCircle, Building2 } from "lucide-react";
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

// Mock branch stock data
const BRANCH_STOCKS = [
  { branchId: "main", branchName: "Main Branch (Colombo)", products: [
    { productId: 1, name: "Coca Cola", sku: "SKU001", stock: 150, unit: "Bottle" },
    { productId: 2, name: "Bread", sku: "SKU002", stock: 80, unit: "Loaf" },
    { productId: 3, name: "T-Shirt", sku: "SKU005", stock: 45, unit: "Pcs" },
    { productId: 4, name: "Mineral Water", sku: "SKU006", stock: 120, unit: "Bottle" },
    { productId: 5, name: "Headphones", sku: "SKU007", stock: 25, unit: "Pcs" },
    { productId: 6, name: "Rice 5kg", sku: "SKU008", stock: 60, unit: "Bag" },
  ]},
  { branchId: "kandy", branchName: "Kandy Branch", products: [
    { productId: 1, name: "Coca Cola", sku: "SKU001", stock: 80, unit: "Bottle" },
    { productId: 2, name: "Bread", sku: "SKU002", stock: 40, unit: "Loaf" },
    { productId: 3, name: "T-Shirt", sku: "SKU005", stock: 5, unit: "Pcs" },
    { productId: 4, name: "Mineral Water", sku: "SKU006", stock: 0, unit: "Bottle" },
    { productId: 6, name: "Rice 5kg", sku: "SKU008", stock: 8, unit: "Bag" },
  ]},
  { branchId: "galle", branchName: "Galle Branch", products: [
    { productId: 1, name: "Coca Cola", sku: "SKU001", stock: 60, unit: "Bottle" },
    { productId: 2, name: "Bread", sku: "SKU002", stock: 30, unit: "Loaf" },
    { productId: 5, name: "Headphones", sku: "SKU007", stock: 15, unit: "Pcs" },
    { productId: 6, name: "Rice 5kg", sku: "SKU008", stock: 25, unit: "Bag" },
  ]},
];

// Mock pending requests
const MOCK_PENDING_REQUESTS = [
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
    status: "pending_approval",
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
    status: "pending_approval",
    history: []
  },
  {
    id: "REQ-1713456789002",
    requestedBy: "Kandy Admin",
    requestedBranch: "Kandy Branch",
    requestedDate: "2026-04-16T09:15:00.000Z",
    requiredByDate: "2026-04-23T09:15:00.000Z",
    productId: 4,
    productName: "Mineral Water",
    productSku: "SKU006",
    quantity: 20,
    unit: "Bottle",
    currentStock: 0,
    reason: "Out of stock completely, urgent requirement",
    status: "pending_approval",
    history: []
  },
];

interface StockTransferApprovalProps {
  onRequestProcessed?: () => void;
}

export default function StockTransferApproval({ onRequestProcessed }: StockTransferApprovalProps) {
  const [pendingRequests, setPendingRequests] = useState<TransferRequest[]>([]);
  const [approvedRequests, setApprovedRequests] = useState<TransferRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<TransferRequest | null>(null);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadRequests();
    const existing = localStorage.getItem("stockTransferRequests");
    if (!existing || JSON.parse(existing).length === 0) {
      localStorage.setItem("stockTransferRequests", JSON.stringify(MOCK_PENDING_REQUESTS));
    }
  }, []);

  const loadRequests = () => {
    const allRequests = JSON.parse(localStorage.getItem("stockTransferRequests") || "[]");
    const pending = allRequests.filter((r: TransferRequest) => r.status === "pending_approval");
    const approved = allRequests.filter((r: TransferRequest) => r.status === "assigned" || r.status === "shipped");
    setPendingRequests(pending);
    setApprovedRequests(approved);
  };

  const findBranchWithStock = (productId: number, quantity: number, requestingBranch: string) => {
    const availableBranches = BRANCH_STOCKS.filter(branch => {
      const product = branch.products.find(p => p.productId === productId);
      return product && product.stock >= quantity && branch.branchName !== requestingBranch;
    });
    return availableBranches;
  };

  const handleApprove = () => {
    if (!selectedRequest) return;
    if (!selectedBranch) {
      alert("Please select a source branch");
      return;
    }

    setIsProcessing(true);

    const allRequests = JSON.parse(localStorage.getItem("stockTransferRequests") || "[]");
    const sourceBranch = BRANCH_STOCKS.find(b => b.branchId === selectedBranch);
    
    const updatedRequests = allRequests.map((r: TransferRequest) => {
      if (r.id === selectedRequest.id) {
        return {
          ...r,
          status: "assigned",
          assignedToBranch: sourceBranch?.branchName,
          assignedToAdmin: sourceBranch?.branchName,
          history: [
            ...r.history,
            {
              id: `hist-${Date.now()}`,
              date: new Date().toISOString(),
              action: "Request Approved & Assigned",
              performedBy: "Super Admin",
              role: "super-admin",
              comment: `Assigned to ${sourceBranch?.branchName} for fulfillment`,
              branch: "Super Admin"
            }
          ]
        };
      }
      return r;
    });

    localStorage.setItem("stockTransferRequests", JSON.stringify(updatedRequests));
    
    setShowSuccess(true);
    setIsProcessing(false);
    setShowApproveDialog(false);
    setSelectedBranch("");
    loadRequests();
    
    if (onRequestProcessed) onRequestProcessed();
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleReject = () => {
    if (!selectedRequest) return;
    if (!rejectionReason.trim()) {
      alert("Please provide a rejection reason");
      return;
    }

    setIsProcessing(true);

    const allRequests = JSON.parse(localStorage.getItem("stockTransferRequests") || "[]");
    const updatedRequests = allRequests.map((r: TransferRequest) => {
      if (r.id === selectedRequest.id) {
        return {
          ...r,
          status: "rejected",
          rejectionReason: rejectionReason,
          history: [
            ...r.history,
            {
              id: `hist-${Date.now()}`,
              date: new Date().toISOString(),
              action: "Request Rejected",
              performedBy: "Super Admin",
              role: "super-admin",
              comment: rejectionReason,
              branch: "Super Admin"
            }
          ]
        };
      }
      return r;
    });

    localStorage.setItem("stockTransferRequests", JSON.stringify(updatedRequests));
    
    setShowSuccess(true);
    setIsProcessing(false);
    setShowRejectDialog(false);
    setRejectionReason("");
    loadRequests();
    
    if (onRequestProcessed) onRequestProcessed();
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending_approval":
        return <Badge className="bg-warning/10 text-warning border-none text-[9px] sm:text-[10px]">Pending Approval</Badge>;
      case "assigned":
        return <Badge className="bg-primary/10 text-primary border-none text-[9px] sm:text-[10px]">Assigned to Branch</Badge>;
      case "shipped":
        return <Badge className="bg-success/10 text-success border-none text-[9px] sm:text-[10px]">Shipped</Badge>;
      case "rejected":
        return <Badge variant="destructive" className="text-[9px] sm:text-[10px]">Rejected</Badge>;
      default:
        return <Badge variant="outline" className="text-[9px] sm:text-[10px]">{status}</Badge>;
    }
  };

  const availableBranches = selectedRequest ? findBranchWithStock(selectedRequest.productId, selectedRequest.quantity, selectedRequest.requestedBranch) : [];

  return (
    <>
      {showSuccess && (
        <Alert className="mb-4 bg-success/10 border-success/20">
          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-success" />
          <AlertDescription className="text-success text-xs sm:text-sm">Request processed successfully!</AlertDescription>
        </Alert>
      )}

      <Card className="shadow-lg border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-foreground">
            <Package className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            Stock Transfer Approvals
          </CardTitle>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Review and assign stock transfer requests from branch managers
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" className="space-y-4">
            <TabsList>
              <TabsTrigger value="pending" className="text-[9px] sm:text-[10px]">
                Pending Approval ({pendingRequests.length})
              </TabsTrigger>
              <TabsTrigger value="approved" className="text-[9px] sm:text-[10px]">
                Processed ({approvedRequests.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-3 sm:space-y-4">
              {pendingRequests.length === 0 ? (
                <div className="text-center py-8 sm:py-12 text-muted-foreground">
                  <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No pending transfer requests</p>
                </div>
              ) : (
                pendingRequests.map((request) => (
                  <div
                    key={request.id}
                    className="p-3 sm:p-4 rounded-xl border border-border bg-muted/5 hover:bg-muted/10 transition-all"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h4 className="font-bold text-foreground text-sm sm:text-base">{request.productName}</h4>
                          {getStatusBadge(request.status)}
                        </div>
                        <p className="text-[10px] sm:text-xs text-muted-foreground font-mono">SKU: {request.productSku}</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-3 text-xs sm:text-sm">
                          <div>
                            <span className="text-muted-foreground">Requested By:</span>
                            <p className="font-medium flex items-center gap-1">
                              <Building2 className="w-3 h-3" /> {request.requestedBranch}
                            </p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Quantity:</span>
                            <p className="font-bold text-primary">{request.quantity} {request.unit}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Current Stock:</span>
                            <p className="font-bold text-warning">{request.currentStock} {request.unit}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Required By:</span>
                            <p>{new Date(request.requiredByDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="mt-3 p-2 bg-muted/20 rounded-lg">
                          <span className="text-[10px] sm:text-xs text-muted-foreground">Reason:</span>
                          <p className="text-xs sm:text-sm mt-1">{request.reason}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-0 lg:ml-4">
                        <Button
                          size="sm"
                          className="bg-success hover:bg-success/90 text-xs sm:text-sm h-8 sm:h-9"
                          onClick={() => {
                            setSelectedRequest(request);
                            setShowApproveDialog(true);
                          }}
                        >
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          Approve & Assign
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-destructive text-destructive hover:bg-destructive/10 text-xs sm:text-sm h-8 sm:h-9"
                          onClick={() => {
                            setSelectedRequest(request);
                            setShowRejectDialog(true);
                          }}
                        >
                          <XCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>

            <TabsContent value="approved" className="space-y-3 sm:space-y-4">
              {approvedRequests.length === 0 ? (
                <div className="text-center py-8 sm:py-12 text-muted-foreground">
                  <Package className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No processed requests</p>
                </div>
              ) : (
                approvedRequests.map((request) => (
                  <div
                    key={request.id}
                    className="p-3 sm:p-4 rounded-xl border border-border bg-muted/5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-bold text-foreground text-sm sm:text-base">{request.productName}</h4>
                          {getStatusBadge(request.status)}
                        </div>
                        <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                          From: {request.requestedBranch} → To: {request.assignedToBranch || "N/A"}
                        </p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                          Quantity: {request.quantity} {request.unit}
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-[10px] sm:text-xs text-muted-foreground">Requested: {new Date(request.requestedDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Approve Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
              Approve & Assign Transfer
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-muted/20 p-3 rounded-lg">
              <p className="text-sm font-bold">Request Details</p>
              <p className="text-sm">Product: {selectedRequest?.productName}</p>
              <p className="text-sm">Quantity: {selectedRequest?.quantity} {selectedRequest?.unit}</p>
              <p className="text-sm">Requesting Branch: {selectedRequest?.requestedBranch}</p>
            </div>

            <div className="space-y-2">
              <Label className="text-primary text-xs sm:text-sm">Select Source Branch</Label>
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger className="h-10 sm:h-12 text-sm">
                  <SelectValue placeholder="Choose branch to fulfill request" />
                </SelectTrigger>
                <SelectContent>
                  {availableBranches.map((branch) => (
                    <SelectItem key={branch.branchId} value={branch.branchId}>
                      {branch.branchName} - Stock: {
                        branch.products.find(p => p.productId === selectedRequest?.productId)?.stock
                      } {selectedRequest?.unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {availableBranches.length === 0 && (
                <p className="text-[10px] sm:text-xs text-destructive mt-1">
                  No branch has sufficient stock for this request!
                </p>
              )}
            </div>

            <Alert>
              <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              <AlertDescription className="text-xs sm:text-sm">
                The selected branch will be notified to fulfill this request.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApproveDialog(false)}>Cancel</Button>
            <Button onClick={handleApprove} disabled={isProcessing || availableBranches.length === 0} className="bg-success text-xs sm:text-sm">
              {isProcessing ? "Processing..." : "Approve & Assign"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
              <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-destructive" />
              Reject Transfer Request
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-muted/20 p-3 rounded-lg">
              <p className="text-sm font-bold">Request Details</p>
              <p className="text-sm">Product: {selectedRequest?.productName}</p>
              <p className="text-sm">Quantity: {selectedRequest?.quantity} {selectedRequest?.unit}</p>
              <p className="text-sm">Requesting Branch: {selectedRequest?.requestedBranch}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-destructive text-xs sm:text-sm">
                Rejection Reason <span className="text-destructive">*</span>
              </Label>
              <Textarea
                placeholder="e.g., Insufficient stock across all branches, Invalid request, etc."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={3}
                className="text-sm"
              />
              <p className="text-[10px] sm:text-xs text-muted-foreground">Reason will be visible to the requesting branch</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>Go Back</Button>
            <Button onClick={handleReject} disabled={isProcessing} variant="destructive" className="text-xs sm:text-sm">
              {isProcessing ? "Processing..." : "Reject Request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}