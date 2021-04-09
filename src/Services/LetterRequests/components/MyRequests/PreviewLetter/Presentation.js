
import { View } from "native-base"
import React, { useContext } from "react"
import { TouchableOpacity } from "react-native-gesture-handler"
import PDF from 'react-native-vector-icons/AntDesign'
import RNPrint from 'react-native-print';

function Presentation(props) {
  let {
    htmlContentS,
    handleClickOpen
  } = props

 // console.log("Ss",htmlContentS.data)

  const printHTML = () => {
   handleClickOpen()

  }
  return (
    <View>
      <TouchableOpacity onPress={printHTML}>
        <View style={{paddingTop:24,paddingRight:8}}>
        <PDF name='pdffile1' color='#62B1F6' size={18} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Presentation