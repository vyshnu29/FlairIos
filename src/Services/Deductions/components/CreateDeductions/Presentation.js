// import React from "react"
// import { Grid, Button, TextField, MenuItem } from "@material-ui/core"
// import DateFnsUtils from "@date-io/date-fns"
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"
// import SunEditor from "suneditor-react"
// import validate from "../../../../shared/validation"
// import {
//   CurrencyFormatter as CustomCurrencyFormat,
//   MobileNumberFormatter,
// } from "../../../../shared/customNumberFormats"
// import DeductionTable from "../DeductionsList"

// function Presentation(props) {
//   const {
//     advanceType,
//     givendate,
//     chequeNumber,
//     amount,
//     $,
//     deductPer,
//     effectivefrom,
//     notes,
//     update,
//     listAll,
//     onPressEdit,
//     onClickCancel,
//     id,
//     advanceList,
//     deductList,
//     access_modules,
//     loggedInEmployee,
//   } = props

//   const { handleChange, handleDateChange, handleData, handleSave } = props
//   const handleGivenDateChange = (date) => {
//     handleDateChange("givendate", date)
//   }
//   const handleEffectiveFromDateChange = (date) => {
//     handleDateChange("effectivefrom", date)
//   }

//   return (
//     <div>
//       {loggedInEmployee !== id ? (
//         access_modules.includes("accounts-manager") ||
//         access_modules.includes("console-customization") ? (
//           <React.Fragment>
//             <div className="custom-card">
//               <form onSubmit={handleSave}>
//                 <Grid container spacing={1}>
//                   <Grid item xs={4}>
//                     <TextField
//                       select
//                       fullWidth
//                       label="Advance Type"
//                       name="advanceType"
//                       value={advanceType}
//                       onChange={handleChange}
//                       size="small"
//                     >
//                       {advanceList.map((option, index) => (
//                         <MenuItem key={index} value={option}>
//                           {option}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//                   </Grid>
//                   <Grid item xs={4}>
//                     <TextField
//                       fullWidth
//                       label="Cheque Number"
//                       name="chequeNumber"
//                       value={chequeNumber}
//                       onChange={handleChange}
//                       variant="outlined"
//                       size="small"
//                       InputProps={{
//                         inputComponent: MobileNumberFormatter,
//                       }}
//                     />
//                   </Grid>
//                   <Grid item xs={4}>
//                     <TextField
//                       fullWidth
//                       label="Total Amount"
//                       name="amount"
//                       value={amount}
//                       onChange={handleChange}
//                       variant="outlined"
//                       size="small"
//                       InputProps={{
//                         inputComponent: CustomCurrencyFormat,
//                       }}
//                     />
//                   </Grid>
//                   <Grid item xs={4}>
//                     <Grid container spacing={1}>
//                       <Grid item xs={10}>
//                         <TextField
//                           select
//                           fullWidth
//                           label="Deduct per"
//                           name="deductPer"
//                           value={deductPer}
//                           onChange={handleChange}
//                           size="small"
//                         >
//                           {deductList.map((option, index) => (
//                             <MenuItem key={index} value={option}>
//                               {option}
//                             </MenuItem>
//                           ))}
//                         </TextField>
//                       </Grid>
//                       <Grid item xs={2}>
//                         <TextField
//                           fullWidth
//                           label="$"
//                           name="$"
//                           value={$}
//                           onChange={handleChange}
//                           variant="standard"
//                           size="small"
//                           InputProps={{
//                             inputComponent: CustomCurrencyFormat,
//                           }}
//                         />
//                       </Grid>
//                     </Grid>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                       <div className="d-flex">
//                         <KeyboardDatePicker
//                           required
//                           size="small"
//                           label={
//                             advanceType === "Miscellaneous" ? "Given date" : "Advance Given date"
//                           }
//                           format="MM/dd/yyyy"
//                           maxDate={new Date()}
//                           value={givendate ? givendate : null}
//                           onChange={handleGivenDateChange}
//                           name="givendate"
//                           KeyboardButtonProps={{
//                             "aria-label": "change date",
//                           }}
//                         />
//                         <KeyboardDatePicker
//                           required
//                           style={{ marginLeft: "10px" }}
//                           size="small"
//                           label="Deduct Effective from"
//                           format="MM/dd/yyyy"
//                           value={effectivefrom ? effectivefrom : null}
//                           onChange={handleEffectiveFromDateChange}
//                           name="effectivefrom"
//                           KeyboardButtonProps={{
//                             "aria-label": "change date",
//                           }}
//                         />
//                       </div>
//                     </MuiPickersUtilsProvider>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <SunEditor
//                       placeholder="Notes"
//                       setContents={notes}
//                       onChange={(note) => handleData(note)}
//                       setOptions={{
//                         buttonList: [
//                           [
//                             "undo",
//                             "redo",
//                             "font",
//                             "fontSize",
//                             "formatBlock",
//                             "bold",
//                             "underline",
//                             "italic",
//                             "strike",
//                             "subscript",
//                             "superscript",
//                             "fontColor",
//                             "hiliteColor",
//                             "removeFormat",
//                             "outdent",
//                             "indent",
//                             "align",
//                             "horizontalRule",
//                             "list",
//                             "lineHeight",
//                             "table",
//                             "link",
//                             "image",
//                             "video",
//                             "showBlocks",
//                             "codeView",
//                           ],
//                         ],
//                         mode: "Balloon-always",
//                       }}
//                     />
//                   </Grid>
//                 </Grid>
//                 <br />
//                 <div className="text-center">
//                   <span>
//                     <Button
//                       variant="contained"
//                       type="submit"
//                       color={update ? "secondary" : "primary"}
//                       disabled={
//                         validate.checkDateDiff(givendate, effectivefrom) &&
//                         $ &&
//                         deductPer &&
//                         advanceType &&
//                         amount
//                           ? false
//                           : true
//                       }
//                     >
//                       {update ? "Update" : "Add Entry"}
//                     </Button>{" "}
//                     <Button
//                       variant="contained"
//                       color="inherit"
//                       onClick={() => {
//                         onClickCancel()
//                       }}
//                     >
//                       Cancel
//                     </Button>
//                   </span>
//                 </div>
//               </form>
//             </div>
//           </React.Fragment>
//         ) : null
//       ) : null}
//       <div className="mt-3">
//         <DeductionTable listAll={listAll} employeeID={id} onPressEdit={onPressEdit} />
//       </div>
//     </div>
//   )
// }

// export default Presentation
