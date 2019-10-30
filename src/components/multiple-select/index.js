import React, {Component, Children, cloneElement, Fragment} from 'react'
// import PropTypes from 'prop-types'
import './style.scss'
import Option from './Option'

export default class MultipleSelect extends Component {
  // 默认参数
  static defaultProps = {
      placeholder: '请选择',
      allowClear: false,
      defaultValue: '',
      maxTagCount: 8,
      tagLabelProp: '',
      mode:'',
      onSearch: ()=>{},
      onChange: ()=>{}
    }
  selectRef = null
  tagMaps = {}
  state = {
    showOption : false,
    selectedText : '',
    tagArr: [],
    tagMapsClone: {}
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
      // showOption: false
    })
    this.unitTags(child)
  }

  unitTags = (tag) => {
    const {tagArr} = this.state
    const field = this.getTagField()
    const item = this.tagMaps[tag[field]]
    if(item) {
      tagArr.splice(item.index, 1)
      this.setState({
        tagArr: [...tagArr]
      }, () => {
        delete this.tagMaps[tag[field]]
        this.setTagMaps()
      });
    } else {
      this.setState({
        tagArr: [...tagArr, tag]
      }, () => {
        this.setTagMaps()
      })
    }
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
    this.setState({
      tagMapsClone: {...this.tagMaps}
    })
  }

  handlePopOptions = () => {
    this.setState({
      showOption: !this.state.showOption
    })
  }

  setSelectRef = (el) => {
    this.selectRef = el
  }

  setInputRef = (el) => {
    this.InputRef = el
  }

  renderOptions(props) {
    const {children} = props
    const {tagMapsClone} = this.state
    const field = this.getTagField()
    return Children.map(children, (child, index) => {
      const { props }=child
      const active = tagMapsClone[props[field]] ? true : false
      return cloneElement(child, {
        active,
        value: props,
        clickItem: this.handleChangeOption
      })
    })
  }

  highlightOption = (option) => {
    
  }

  getTagField = () => {
    const {tagLabelProp} = this.props
    let field = 'children'
    if(tagLabelProp) {
      field = tagLabelProp
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
      if(i > maxTagCount -1) {
        itemJSX = (
          <div key={item.value}>+{len-i}</div>
        )
        tagItems.push(itemJSX)
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
    return tagItems
  }

  renderSelect = () => {
    const {placeholder} = this.props
    const {tagArr} = this.state
    if(tagArr && tagArr.length) {
      return (
        <div className="tags-wrap">
          {this.renderTags()}
          <input className="input" ref={this.setInputRef}/>
        </div>
      )
    } else {
      return (
        <Fragment>
          <div className="title">{placeholder}</div>
          <input className="input" ref={this.setInputRef}/>
        </Fragment>
      ) 
    }

  }

  render() {
    const {showOption} = this.state
    return (
      <div className="multiple-select" ref={this.setSelectRef}>
        <div className="select-wrap" onClick={this.handlePopOptions}>
          {this.renderSelect()}
        </div>
        <div className={showOption ? 'options-wrap show':'options-wrap'}>
          {this.renderOptions(this.props)}
        </div>
      </div>
    )
  }
}



MultipleSelect.Option = Option

MultipleSelect.propTypes = {
  
}