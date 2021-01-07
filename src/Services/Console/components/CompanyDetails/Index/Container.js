import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import Presentation from "./Presentation"
import { uploadCompanyDetails } from "../../../middleware"

function Container(props) {
  const { companyDetails, setCompanyDetails } = props
  const [companyDetailsInformation, setcompanyDetailsInformation] = useState({})
  const [contactDetailsInformation, setcontactDetailsInformation] = useState({})
  const [invoiceDetailsInformation, setinvoiceDetailsInformation] = useState({})
  const [logo, setLogo] = useState("")
  const [waterMark, setWaterMark] = useState("")

  useEffect(() => {
    if (isLoaded(companyDetails)) {
      Object.entries(companyDetails).forEach(([key, value]) => {
        if (typeof value !== "object") {
          setCompanyDetails(key, value)
        } else {
          if (Object.keys(value).length) {
            setCompanyDetails(key, value)
          }
        }
      })
      setcompanyDetailsInformation({
        "Company Name": companyDetails.hasOwnProperty("companyName")
          ? companyDetails.companyName
          : "",
        "Web-URL": companyDetails.hasOwnProperty("web_url")
          ? companyDetails.web_url
          : "",
        "E-Verify Number": companyDetails.hasOwnProperty("e_VerifyNumber")
          ? companyDetails.e_VerifyNumber
          : "",
        "EIN-Number": companyDetails.hasOwnProperty("ein_Number")
          ? companyDetails.ein_Number
          : "",
      })

      const companyWaterMark = companyDetails.hasOwnProperty("images")
        ? companyDetails.images.hasOwnProperty("waterMark")
          ? companyDetails.images.waterMark
          : ""
        : ""

      setWaterMark(companyWaterMark)

      const companyLogo = companyDetails.hasOwnProperty("images")
        ? companyDetails.images.hasOwnProperty("companyLogo")
          ? companyDetails.images.companyLogo
          : ""
        : ""

      setLogo(companyLogo)

      const contactDetails = {
        Address: "",
        Phone: "",
        "Mail-Id": "",
        "Accounts Mail-Id": "",
        "HR Mail-Id": "",
      }

      const invoiceDetails = {
        "Invoice Prefix": "",
        Seperator: "",
        "Begin From": "",
        "Payable To": "",
        "Invoice Auto Send": false,
        "Invoice Auto Generate": false,
      }

      if (companyDetails.hasOwnProperty("contactDetails")) {
        Object.entries(companyDetails.contactDetails).forEach(
          ([key, value]) => {
            if (key === "accountsMailId")
              contactDetails["Accounts Mail-Id"] = value
            else if (key === "address") contactDetails.Address = value
            else if (key === "phoneno") contactDetails.Phone = value
            else if (key === "mailId") contactDetails["Mail-Id"] = value
            else if (key === "hrMailId") contactDetails["HR Mail-Id"] = value
          }
        )
      }

      setcontactDetailsInformation(contactDetails)

      if (companyDetails.hasOwnProperty("invoiceDetails")) {
        Object.entries(companyDetails.invoiceDetails).forEach(
          ([key, value]) => {
            if (key === "invoiceAutoGenerate")
              invoiceDetails["Invoice Auto Generate"] = value
            else if (key === "invoiceAutoSend")
              invoiceDetails["Invoice Auto Send"] = value
            else if (key === "payableTo") invoiceDetails["Payable To"] = value
            else if (key === "invoiceNumberFormat") {
              const { beginFrom, invoicePrefix, seperator } = value
              invoiceDetails["Begin From"] = beginFrom
              invoiceDetails["Invoice Prefix"] = invoicePrefix
              invoiceDetails.Seperator = seperator
            }
          }
        )
      }

      setinvoiceDetailsInformation(invoiceDetails)
    }
  }, [companyDetails])

  if (isLoaded(companyDetails)) {
    return (
      <div>
        <Presentation
          companyDetailsInformation={companyDetailsInformation}
          contactDetailsInformation={contactDetailsInformation}
          invoiceDetailsInformation={invoiceDetailsInformation}
          logo={logo}
          waterMark={waterMark}
        />
      </div>
    )
  }

  return <p>Loading...</p>
}

const mapStateToProps = (state, ownProps) => {
  const { companyDetails } = state.firestore.data
  return {
    companyDetails,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCompanyDetails: (name, value) => {
      dispatch(uploadCompanyDetails(name, value))
    },
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "COMPANY_CONFIG",
        doc: "details",
        storeAs: "companyDetails",
      },
    ]
  })
)(Container)
