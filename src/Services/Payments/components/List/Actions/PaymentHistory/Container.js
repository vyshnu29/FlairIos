import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getPaymentsHistory } from "../../../../middleware"
import Presentation from "./Presentation"

function Container(props) {
  const { history, isEmpty, isLoaded, onClickHistory, totalAmount } = props

  useEffect(() => {}, [props.id])

  return (
    <div>
      <Presentation
        history={history}
        isLoaded={isLoaded}
        isEmpty={isEmpty}
        onClickHistory={onClickHistory}
        totalAmount={totalAmount}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    history: state.payments.history.payments_history,
    isLoaded: state.payments.history.isLoaded,
    isEmpty: state.payments.history.isEmpty,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickHistory: () => {
      dispatch(getPaymentsHistory(ownProps.id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
