// import React, { Component } from 'react'
// import Presentation from "./Presentation"
// export class Container extends Component {
//     render() {
//         return (
//             <div>
//                 <Presentation
//                     {...this.props}
//                 />
//             </div>
//         )
//     }
// }

// export default Container

import React from "react"
import Presentation from "./Presentation"

function Container(props) {
  return (

      <Presentation {...props} />
  )
}

export default Container
