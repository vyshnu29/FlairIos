export default {
  payrolls: {
    isLoading: true,
    data: {},
    error: ""
  },
  payrollSettings: {
    isLoading: true,
    data: {},
    error: ""
  },
  actions: {
    updatingPayroll: [],
    errorWhileUpdating: [],
    generatingPayroll: [],
    errorWhileGenerating: []
  },
  listAll: null,
  employeeID: null,
  listener: () => { }
}