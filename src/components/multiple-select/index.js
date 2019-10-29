import React, {Component, Fragment} from 'react'
// import PropTypes from 'prop-types'
import Option from './Option'
import Select from './Select'

export default class MultipleSelect extends Component {
  // 默认参数
  static defaultProps = {
      placeholder: '请选择',
      allowClear: false,
      defaultValue: '',
      maxTagCount: 8,
      mode:'',
      onSearch: ()=>{}
    }

  render() {
    const {placeholder, children} = this.props
    return (
      <Fragment>
        <Select placeholder={placeholder}></Select>
        {children}
      </Fragment>
    )
  }
}

MultipleSelect.Option = Option

MultipleSelect.propTypes = {
  
}