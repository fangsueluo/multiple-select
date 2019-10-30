import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Option extends Component{
  static propTypes = {
    clickItem: PropTypes.func,
    active: PropTypes.bool
  }

  state = {
    _active: false
  }

  shouldComponentUpdate(nextProps, nextState) {
    // if(nextProps.active !== this.state._active){
    //   this.setState({
    //     _active: nextProps.active
    //   },() => {
    //     return true
    //   })
    // }
    return true
  }

  handleChangeOption = (child) => {
    this.props.clickItem(child)
  }

  render() {
    const {children, value, active} = this.props
    const {_active} = this.state
    return (
      <div 
        onClick={() => {this.handleChangeOption(value)}}
        className={ active ? 'active option': 'option'}>
        {children}
      </div>

    )
  }
}