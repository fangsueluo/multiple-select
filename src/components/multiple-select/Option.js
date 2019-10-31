import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Option extends Component{
  static propTypes = {
    clickItem: PropTypes.func,
    tagMaps: PropTypes.object,
    field: PropTypes.string
  }

  handleChangeOption = (child) => {
    this.props.clickItem(child)
    return false
  }

  render() {
    const {children, value, active} = this.props
    return (
      <div 
      onClick={() => {this.handleChangeOption(value)}}
      className={ active ? 'active option': 'option'}>
      {children}
    </div>
    )
  }
}