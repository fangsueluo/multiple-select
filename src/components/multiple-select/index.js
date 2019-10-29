import React, {Component, Children} from 'react'
// import PropTypes from 'prop-types'
import './style.scss'

export default class MultipleSelect extends Component {
  // 默认参数
  static defaultProps = {
      placeholder: '请选择',
      allowClear: false,
      defaultValue: '',
      maxTagCount: 8,
      mode:'',
      onSearch: ()=>{},
      onChange: ()=>{}
    }
  cell = ''
  showOption = false
  selectedText = ''

  componentDidMount() {
    document.addEventListener('click', (e) => {
      if (this.cell && this.cell !== e.target && !this.cell.contains(e.target)) {
        this.showOption = false;
      }
      }, true);
  }

  componentWillReceiveProps(nextProps) {
    console.log('nexgs',nextProps)
    if (nextProps.value !== this.props.value || nextProps.children !== this.props.children) {
      // React.Children.map(this.props.children, (child, index) => {
      //  if (nextProps.value === child.props.value) {
      //   this.selectedText = child.props.children;
      //  }
      // });
     }
  }

  render() {
    const {placeholder, children,onChange} = this.props
    return (
      <div className="multiple-select">
        <div className="select-wrap">
          <div className="title">{placeholder}</div>
          <input className="input"/>
        </div>
        <div className="options-wrap">
          {
            Children.map(children, (child, index) => {
              return (
                <div onClick={onChange}> 
                  {child}
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

class Option extends Component{
  render() {
    const {children} = this.props
    return (
      <div>
        {children}
      </div>
    )
  }
}

MultipleSelect.Option = Option

MultipleSelect.propTypes = {
  
}