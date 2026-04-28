This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.






```
pos-front-end
├─ app
│  ├─ (dashboard)
│  │  ├─ admin
│  │  │  ├─ customers
│  │  │  │  └─ page.tsx
│  │  │  ├─ employees
│  │  │  │  └─ page.tsx
│  │  │  ├─ expenses
│  │  │  │  └─ page.tsx
│  │  │  ├─ inventory
│  │  │  │  └─ page.tsx
│  │  │  ├─ page.tsx
│  │  │  ├─ pos
│  │  │  │  └─ page.tsx
│  │  │  ├─ products
│  │  │  │  └─ page.tsx
│  │  │  ├─ reports
│  │  │  │  └─ page.tsx
│  │  │  ├─ sales-history
│  │  │  │  └─ page.tsx
│  │  │  ├─ settings
│  │  │  │  └─ page.tsx
│  │  │  └─ suppliers
│  │  │     └─ page.tsx
│  │  ├─ layout.tsx
│  │  ├─ staff
│  │  │  ├─ customers
│  │  │  │  └─ page.tsx
│  │  │  ├─ page.tsx
│  │  │  ├─ pos
│  │  │  │  └─ page.tsx
│  │  │  ├─ products
│  │  │  │  └─ page.tsx
│  │  │  ├─ sales-history
│  │  │  │  └─ page.tsx
│  │  │  └─ suppliers
│  │  │     └─ page.tsx
│  │  └─ super-admin
│  │     ├─ branches
│  │     │  ├─ page.tsx
│  │     │  └─ [id]
│  │     │     └─ page.tsx
│  │     ├─ customers
│  │     │  └─ page.tsx
│  │     ├─ employees
│  │     │  └─ page.tsx
│  │     ├─ expenses
│  │     │  └─ page.tsx
│  │     ├─ global-settings
│  │     │  └─ page.tsx
│  │     ├─ inventory
│  │     │  └─ page.tsx
│  │     ├─ page.tsx
│  │     ├─ pos
│  │     │  └─ page.tsx
│  │     ├─ products
│  │     │  └─ page.tsx
│  │     ├─ reports
│  │     │  └─ page.tsx
│  │     ├─ sales-history
│  │     │  └─ page.tsx
│  │     └─ suppliers
│  │        └─ page.tsx
│  ├─ fonts.css
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ page.tsx
│  └─ setup
│     └─ page.tsx
├─ components
│  ├─ admin
│  │  └─ inventory
│  │     ├─ LowStockAlerts.tsx
│  │     ├─ StockMovementsTable.tsx
│  │     ├─ StockTransfer.tsx
│  │     ├─ StockTransferReceive.tsx
│  │     └─ StockTransferRequest.tsx
│  ├─ common
│  │  ├─ auth
│  │  │  └─ LoginPage.tsx
│  │  ├─ layout
│  │  │  ├─ MainLayout.tsx
│  │  │  ├─ Sidebar.tsx
│  │  │  └─ TopBar.tsx
│  │  ├─ shared
│  │  │  ├─ customers
│  │  │  │  ├─ AddCustomerDialog.tsx
│  │  │  │  ├─ CustomerDetails.tsx
│  │  │  │  ├─ CustomerList.tsx
│  │  │  │  └─ CustomerStats.tsx
│  │  │  ├─ dashboard
│  │  │  │  ├─ KPICards.tsx
│  │  │  │  ├─ PaymentPieChart.tsx
│  │  │  │  ├─ RecentTransactions.tsx
│  │  │  │  ├─ SalesChart.tsx
│  │  │  │  └─ TopProductsChart.tsx
│  │  │  ├─ employees
│  │  │  │  ├─ AddEmployeeDialog.tsx
│  │  │  │  ├─ CommissionTable.tsx
│  │  │  │  ├─ EmployeeStats.tsx
│  │  │  │  └─ EmployeeTable.tsx
│  │  │  ├─ expenses
│  │  │  │  ├─ AddExpenseDialog.tsx
│  │  │  │  ├─ ExpenseCharts.tsx
│  │  │  │  ├─ ExpenseStats.tsx
│  │  │  │  └─ RecentExpensesTable.tsx
│  │  │  ├─ inventory
│  │  │  │  └─ StockLevelsTable.tsx
│  │  │  ├─ pos
│  │  │  │  ├─ Cart.tsx
│  │  │  │  ├─ CategoryFilter.tsx
│  │  │  │  ├─ CurrentOrderHeader.tsx
│  │  │  │  ├─ PaymentSection.tsx
│  │  │  │  ├─ ProductGrid.tsx
│  │  │  │  └─ SalesHistory.tsx
│  │  │  ├─ products
│  │  │  │  ├─ AddProductDialog.tsx
│  │  │  │  └─ ProductTable.tsx
│  │  │  ├─ reports
│  │  │  │  └─ ReportsContent.tsx
│  │  │  ├─ sales-history
│  │  │  │  ├─ ReturnExchangeModal.tsx
│  │  │  │  ├─ SalesHistoryTable.tsx
│  │  │  │  └─ SalesSummary.tsx
│  │  │  ├─ settings
│  │  │  │  ├─ AddBranchWizard.tsx
│  │  │  │  ├─ BranchManagement.tsx
│  │  │  │  ├─ BusinessInfo.tsx
│  │  │  │  ├─ FinanceSettings.tsx
│  │  │  │  ├─ HardwareConfig.tsx
│  │  │  │  └─ UserManagement.tsx
│  │  │  └─ suppliers
│  │  │     ├─ AddSupplierDialog.tsx
│  │  │     └─ SupplierTable.tsx
│  │  └─ ui
│  │     ├─ Alert.tsx
│  │     ├─ Avatar.tsx
│  │     ├─ Badge.tsx
│  │     ├─ Button.tsx
│  │     ├─ Card.tsx
│  │     ├─ CheckBox.tsx
│  │     ├─ Dialog.tsx
│  │     ├─ DropdownMenu.tsx
│  │     ├─ DropdownMenuWrapper.tsx
│  │     ├─ Input.tsx
│  │     ├─ Label.tsx
│  │     ├─ Pagination.tsx
│  │     ├─ PrintModel.tsx
│  │     ├─ Progress.tsx
│  │     ├─ Select.tsx
│  │     ├─ Separator.tsx
│  │     ├─ Sheet.tsx
│  │     ├─ Skeleton.tsx
│  │     ├─ Sonner.tsx
│  │     ├─ Switch.tsx
│  │     ├─ Table.tsx
│  │     ├─ Tabs.tsx
│  │     ├─ Textarea.tsx
│  │     └─ Tooltip.tsx
│  └─ super-admin
│     ├─ branches
│     │  └─ BranchManagement.tsx
│     └─ inventory
│        ├─ LowStockAlerts.tsx
│        ├─ StockMovementsTable.tsx
│        ├─ StockTransfer.tsx
│        └─ StockTransferApproval.tsx
├─ eslint.config.mjs
├─ globals.css.d.ts
├─ hooks
│  ├─ use-mobile.ts
│  └─ use-theme.ts
├─ lib
│  ├─ theme-config.ts
│  └─ utils.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ providers
│  └─ theme-provider.tsx
├─ public
│  └─ Images
│     ├─ Dark Mood.png
│     └─ Light Mood.png
├─ README.md
├─ tailwind.config.ts
├─ tsconfig.json
└─ types
   └─ stock-transfer.ts

```