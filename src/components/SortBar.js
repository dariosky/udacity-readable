import React from 'react'
import {Button, Paper, Typography} from 'material-ui'
import {connect} from 'react-redux'
import {sortBy, sortDirection} from '../flows/actions'
// import {ArrowDropDown, ArrowDropUp} from 'material-ui-icons'

class SortBar extends React.Component {
  render() {
    const {currentSort, currentSortDirection} = this.props,
      nextSortMethod = currentSort === 'date' ? 'vote' : 'date',
      nextSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc'
    return <Paper>
      <Typography align="right">
        <Button onClick={() => {
          this.props.sortBy(nextSortMethod)
        }}>
          Sort by {nextSortMethod}
        </Button>
        <Button onClick={() => {
          this.props.sortDirection(nextSortDirection)
        }}>
          {nextSortDirection === 'desc' ? 'desc' : 'asc'}
        </Button>
      </Typography>
    </Paper>
  }
}

function mapStateToProps(state) {
  return {
    currentSort: state.options.sort,
    currentSortDirection: state.options.sortDirection,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sortBy: (method) => {
      dispatch(sortBy(method))
    },
    sortDirection: (direction) => {
      dispatch(sortDirection(direction))
    },
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SortBar)
