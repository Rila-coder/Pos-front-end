export interface TransferRequest {
  id: string;
  requestedBy: string;      // Branch name or admin name
  requestedBranch: string;   // Branch that needs stock
  requestedDate: string;
  requiredByDate: string;
  productId: number;
  productName: string;
  productSku: string;
  quantity: number;
  unit: string;
  currentStock: number;
  reason: string;
  status: 'pending_approval' | 'approved' | 'rejected' | 'assigned' | 'shipped' | 'completed' | 'cancelled';
  assignedToBranch?: string;  // Branch that will send stock
  assignedToAdmin?: string;
  approvalComment?: string;
  rejectionReason?: string;
  cancellationReason?: string;
  transferNoteId?: string;
  history: TransferHistoryItem[];
}

export interface TransferHistoryItem {
  id: string;
  date: string;
  action: string;
  performedBy: string;
  role: string;
  comment: string;
  branch: string;
}

export interface BranchStock {
  branchId: string;
  branchName: string;
  products: BranchProduct[];
}

export interface BranchProduct {
  productId: number;
  productName: string;
  sku: string;
  stock: number;
  unit: string;
}