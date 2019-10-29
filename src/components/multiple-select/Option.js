import React, {Component} from 'react'
export default class Option extends Component{
  componentDidMount() {
    console.log('option mounted', this.props)
  }
  render(){
    const {value, children} = this.props
    return (
      <div value={value}>{children}</div>
    )
  }
}