import React from "react"
function Wrapper(Wrapped1, Wrapped2) {
  return class extends React.Component {
    render() {
      return <Wrapped1>
        <Wrapped2 {...this.props} />
      </Wrapped1>
    }
  }
}

export default Wrapper