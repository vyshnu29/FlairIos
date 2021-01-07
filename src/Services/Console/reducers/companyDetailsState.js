export const initState = {
  companyName: "",
  web_url: "",
  e_VerifyNumber: "",
  ein_Number: "",
  contactDetails: {
    address: "",
    phoneno: "",
    mailId: "",
    hrMailId: "",
    accountsMailId: "",
  },
  invoiceDetails: {
    invoiceAutoGenerate: false,
    invoiceAutoSend: false,
    payableTo: "",
    invoiceNumberFormat: {
      beginFrom: "",
      invoicePrefix: "",
      seperator: "",
    },
  },
  images: {
    waterMark: "",
    companyLogo: "",
  },
  isLoading: true
}
