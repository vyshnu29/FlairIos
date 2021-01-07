export default {
  isUpdateInvoice: false,
  invoiceDetails: {
    isLoading: true,
    data: {},
    loadError: "",
    isUpdating: false,
    updateError: ""
  },
  employeeID: "",
  clientID: "",
  placementID: "",
  invoiceBy: "",
  byExternalDetails: {
    name: "",
    address: "",
    reasonForAmount: ""
  },
  clients: {
    data: {},
    isLoading: true,
    error: ""
  },
  placements: {
    data: {},
    isLoading: true,
    error: ""
  },
  netTerms: "",
  POnumber: "",
  invoiceDate: new Date().setHours(0, 0, 0, 0),
  invoiceDueDate: "",
  discountDetails: [{
    name: "",
    value: 0,
    type: "",
  }],
  timesheetAttachment: {
    attachmentDetails: {
      publicURL: "",
      sourcePath: ""
    },
    isDocumentUploading: false,
  },
  expenseAttachment: {
    attachmentDetails: {
      publicURL: "",
      sourcePath: ""
    },
    isDocumentUploading: false,
  },
  invoiceSettings: {
    isLoading: true,
    data: {},
    error: ""
  },
  paymentSettings: {
    isLoading: true,
    data: {},
    error: ""
  },
  includeInvoicePDF: false,
  payableTo: "",
  notes: "",
  additionalInfo: "",
  selectedTimesheets: [],
  invoiceCategory: "",
  statementMemo: "",
  selectedExpenses: [],
  timesheets: {
    isLoading: true,
    data: {},
    error: ""
  },
  expenses: {
    isLoading: true,
    data: {},
    error: ""
  },
  expensesAmount: 0,
  timesheetsAmount: 0,
  discountAmount: 0,
  placeTimesheetRanges: [],
  subTotal: 0,
  grandTotal: 0,
  invoiceCreation: {
    isCreating: false,
    error: ""
  },
  show_PO_number: false,
  mailReceivers: {
    isLoading: true,
    data: {
      to: [],
      cc: [],
      bcc: []
    },
    error: ""
  },
  to: [],
  cc: [],
  bcc: [],
  helperText: {
    to: '',
    cc: '',
    bcc: '',
  },
}