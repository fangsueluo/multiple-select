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
      tagField: '',
      mode:'',
      onSearch: ()=>{},
      onChange: ()=>{}
    }
  selectRef = null
  tagMaps = {}
  state = {
    showOption : false,
    selectedText : '',
    tagArr: []
  }

  componentDidMount() {
    document.addEventListener('click', (e) => {
        const {selectRef} = this
        if (selectRef && selectRef !== e.target && !selectRef.contains(e.target)) {
          this.setState({
            showOption: false
          })
        }
      }, true);
  }

  handleChangeOption = (child) => {
    const {onChange} = this.props
    if(onChange){
      onChange(child)
    }
    this.setState({
      selectedText: child.children,
      value: child.value,
      showOption: false
    })
    this.unitTags(child)
  }

  unitTags = (tag) => {
    const {tagArr} = this.state
    const field = this.getTagField()
    const item = this.tagMaps[tag[field]]
    debugger
    if(item) {
      tagArr.splice(item.index, 1)
      this.setState({
        tagArr: [...tagArr]
      });
      delete this.tagMaps[tag[field]]
    } else {
      this.setState({
        tagArr: [...tagArr, tag]
      })
    }
    this.setTagMaps()
  }

  setTagMaps = () => {
    const {tagArr} = this.state
    const field = this.getTagField()
    let map = {}
    for(let i = 0; i < tagArr.length; i++) {
      const item = tagArr[i]
      if(!map[item[field]]){
        map[item[field]] = {...item}
        map[item[field]].index = i
      }
    }
    this.tagMaps = map
  }

  handlePopOptions = () => {
    this.setState({
      showOption: !this.state.showOption
    })
  }

  setSelectRef = (el) => {
    this.selectRef = el
  }

  renderOptions(props) {
    const {children} = props
    return Children.map(children, (child, index) => {
      console.log('childe', child)
      // tagField
      return (
        <div onClick={()=> this.handleChangeOption(child.props)} className="option"> 
          {child}
        </div>
      )
    })
  }

  getTagField = () => {
    const {tagField} = this.props
    let field = 'children'
    if(tagField) {
      field = tagField
    }

    return field
  }

  renderTags = () => {
    const {tagArr} = this.state
    const field = this.getTagField()
    const {maxTagCount} = this.props
    const len = tagArr.length
    let tagItems = []
    for(let i = 0; i < len; i++) {
      const item = tagArr[i]
      let itemJSX = ''
      if(i >= maxTagCount -1) {
        itemJSX = (
          <div>+{len-i}</div>
        )
        break;
      }
      itemJSX = (
        <div key={item.value} className="tag-item">
          <div className="title">{item[field]}</div>
          <div className="clear">X</div>
        </div>
      )
      tagItems.push(itemJSX)
    }
    return <div className="tags-wrap">{tagItems}</div>
  }

  render() {
    const {placeholder} = this.props
    const {selectedText,showOption, tagArr} = this.state
    return (
      <div className="multiple-select" ref={this.setSelectRef}>
        <div className="select-wrap" onClick={this.handlePopOptions}>
          {tagArr && tagArr.length ? this.renderTags(): <div className="title">{placeholder}</div>}
          <input className="input"/>
        </div>
        <div className={showOption ? 'options-wrap show':'options-wrap'}>
          {this.renderOptions(this.props)}
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