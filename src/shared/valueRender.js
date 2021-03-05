import React from "react"
import validate from "../shared/validation"
import { Text,View,Linking,TouchableOpacity } from "react-native"
import MetaInfo from "../shared/getMetaInfo"

export const DateType = ({ value }) => {
  return (
    <Text style={{fontWeight:'100',color:'black',fontSize:15}}>
      {value ? validate.dateFormatter(value) : '-----'}
    </Text>
  )
 
}

export const TextType = ({ value = "" }) => {
  const metainfo = new MetaInfo()
  return (
    <Text style={{fontWeight:'100',color:'black',fontSize:15}}>
      {value ? value.length >= 9 ? metainfo.emailToName(value) : value : '-----'}
    </Text>
  )
 
}

export const FileType = ({ value = "" }) => {
  if (value.length)
    return (
      <TouchableOpacity  onPress={() => Linking.openURL(value)} >
       <Text style={{fontWeight:'100',color:'	#007aff',fontSize:15}}>Link</Text> 
      </TouchableOpacity>
    )
  return <Text style={{fontWeight:'100',color:'	#007aff',fontSize:15}}>--</Text>
}

export default function CustomField(details) {
  switch (details.type) {
    case "text":
      return <TextType {...details} />

    case "name":
      return <TextType {...details} />

    case "phone":
      return <TextType {...details} />

    case "email":
      return <TextType {...details} />

    case "number":
      return <TextType {...details} />

    case "select":
      return <TextType {...details} />

    // case "checkbox":
    //   return typeof details.value === "boolean" ? (details.value ? "Yes" : "No") : ""

    case "date":
      return <DateType {...details} />

    case "address":
      return <TextType {...details} />

    case "alphanum":
      return <TextType {...details} />

    case "file":
      return <FileType {...details} />

    case "fromdate":
      return <DateType {...details} />

    case "todate":
      return <DateType {...details} />

    case "country":
      return <TextType {...details} />

    case "state":
      return <TextType {...details} />

    default:
      return <TextType {...details} />
  }
}