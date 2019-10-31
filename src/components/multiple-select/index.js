import React, {Component, Children, cloneElement, Fragment} from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import Option from './Option'

export default class MultipleSelect extends Component {
  // 默认参数
  static defaultProps = {
      placeholder: '请选择',
      allowClear: true, //允许一次性删除
      defaultValue: '',
      maxTagCount: 8,  //最大tag展示
      tagLabelProp: '', //tag显示的属性名
      search: false, //搜索选项
      addOption: false, // 搜索添加选项,
      onChange: () => {} //点击选项时触发
    }
  static propTypes = {
    onChange: PropTypes.func,
    maxTagCount: PropTypes.number,
    tagLabelProp: PropTypes.string,
    allowClear: PropTypes.bool
  }

  selectRef = null
  tagMaps = {}
  optionsMap = {}
  InputRef = null

  state = {
    showOption : false,
    tagArr: [],
    tagMapsClone: {},
    inputValue: '',
    inputWidth: ''
  }

  componentDidMount() {
    document.addEventListener('click', (e) => {
        const {selectRef} = this
        if (selectRef && selectRef !== e.target && !selectRef.contains(e.target)) {
          this.setState({
            showOption: false,
            inputValue: ''
          })
        }
      }, true);
      this.setOptionsMap()
  }

  handleChangeOption = (tag) => {
    const {onChange} = this.props
    if(onChange){
      onChange(tag)
    }
    this.setState({
      value: tag.value,
      inputValue: ''
      // showOption: false
    })
    this.unitTags(tag)
  }

  deleteTags = (index) => {
    let tags = [...this.state.tagArr]
    if(typeof(index) !== "object") {
      tags.splice(index, 1)
    } else {
      tags = []
    }
    this.setTagArrAndMaps(tags)
  }

  setTagArrAndMaps = (tags) => {
    this.setState({
      tagArr: tags
    }, () => {
      this.InputRef.focus()
      this.setTagMaps()
    })
  }

  unitTags = (tag) => {
    const {tagArr} = this.state
    const field = this.getTagField()
    const item = this.tagMaps[tag[field]]
    let tags = [...tagArr]
    if(item) {
      tags.splice(item.index, 1)
      delete this.tagMaps[tag[field]]
    } else {
      tags.push(tag)
    }
    this.setTagArrAndMaps(tags)
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
    this.InputRef.focus()
  }

  setSelectRef = (el) => {
    this.selectRef = el
  }

  setInputRef = (el) => {
    this.InputRef = el
  }

  dynamicAddOption = () => {
    const {inputValue} = this.state
    const {children} = this.props

    let prop = {...children[0].props}
    for(let k in prop) {
      prop[k] = inputValue
    }
    let clone = {...cloneElement(children[0], prop)}
    clone.key = clone.props.key
    this.setState({
      inputValue: ''
    })
    // 动态添加options
    children.push(clone)
    // 插入tags
    this.unitTags(prop)

  }

  renderOptions() {
    let {children, search, addOption} = this.props
    const {tagMapsClone, inputValue} = this.state
    const field = this.getTagField()
    if(search && inputValue) {
      children = this.searchOptions()
    }
    if(children && !children.length) {
      if(!addOption) {
        return <div className="option">没有选项</div>
      } else {
        return <div className="option" onClick={this.dynamicAddOption}>添加选项“{inputValue}”</div>
      }
    }
    return Children.map(children, (child, index) => {
      const { props } = child
      const active = tagMapsClone[props[field]] ? true : false
      return cloneElement(child, {
        active,
        value: props,
        clickItem: this.handleChangeOption
      })
    })
  }

  searchOptions = () => {
    const {inputValue} = this.state
    const {optionsMap} = this
    let arr = []
    if(inputValue) {
      const reg = new RegExp(inputValue, 'g')
      for(let k in optionsMap) {
        if(reg.test(k)) {
          arr.push(optionsMap[k])
        }
      }
    }
    return arr
  }

  setOptionsMap = () => {
    const {children} = this.props
    let map = {}
    Children.forEach(children, (child, index) => {
      const {props} = child
      if(!map[props.children]) {
        map[props.children] = child
      }
    })
    this.optionsMap = map
  }

  highlightOption = (option) => {
    
  }
  //
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
          <div className="tag-more" key={item.value}>+{len-i}</div>
        )
        tagItems.push(itemJSX)
        break;
      }
      itemJSX = (
        <div key={item.value} className="tag-item">
          <div className="title">{item[field]}</div>
          <div className="clear" onClick={() => {this.deleteTags(i)}}>×</div>
        </div>
      )
      tagItems.push(itemJSX)
    }
    return tagItems
  }

  changeInputValue = (e) => {
    const val = e.target.value
    this.setState({
      inputValue: val
    }, () => {
      this.setInputWidth()
    })
  }

  setInputWidth = () => {
    const {InputRef} = this
    const {inputValue} = this.state
    if(InputRef){
      let len = InputRef.scrollWidth
      if(!inputValue) {
        len = 10
      }
      this.setState({
        inputWidth: len
      })
    }
    
  }

  renderSelect = () => {
    const {placeholder} = this.props
    const {tagArr, inputValue, inputWidth} = this.state
    const input = <input className="input" value={inputValue} style={{width: inputWidth}} ref={this.setInputRef} onChange={this.changeInputValue}/>
    if(tagArr && tagArr.length) {
      return (
        <div className="tags-wrap">
          {this.renderTags()}
          {input}
        </div>
      )
    } else {
      return (
        <Fragment>
          {inputValue ? '' : <div className="title">{placeholder}</div>}
          {input}
        </Fragment>
      ) 
    }

  }

  isShowAllDel = () => {
    const {tagArr} = this.state
    const {allowClear} = this.props
    const flag = tagArr && tagArr.length && allowClear
    return flag
  }

  selectClickStyle = () => {
    let arr = ['select-wrap']
    if(this.isShowAllDel()) {
      arr.push('has-tags')
    }
    if(this.state.showOption) {
      arr.push('click')
    }

    return arr.join(' ')
  }

  render() {
    const {showOption} = this.state
    return (
      <div className="multiple-select" ref={this.setSelectRef}>
        <div className={this.selectClickStyle()} onClick={this.handlePopOptions}>
          {this.renderSelect()}
          <div className="down">▼</div>
          {this.isShowAllDel() ? <div className="del" onClick={this.deleteTags}>×</div> : ''}
        </div>
        <div className={showOption ? 'options-wrap show':'options-wrap'}>
          {this.renderOptions()}
        </div>
      </div>
    )
  }
}



MultipleSelect.Option = Option