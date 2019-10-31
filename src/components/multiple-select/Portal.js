import {Component} from 'react'
import ReactDOM from 'react-dom'

let _container = null

export default class Portal extends Component{
  static defaultProps = {
    getPopupContainer: () => {}
  }

  setContainerStyle = () => {
    const {targetRef} = this.props
    const { top, left, height, width } = targetRef.getBoundingClientRect()
    const wrap = this.getWrap()
    const style = {
        top: wrap.scrollTop + top + height + 10,
        left:  wrap.scrollLeft + left
    }

    _container.style.top = style.top + 'px';
    _container.style.left = style.left + 'px';
    _container.style.width = width + 'px';

    this.enoughtHeight(wrap, height, top)
  }

  enoughtHeight = (wrap, targetRefHeight, targetTop) => {
    const {children} = this.props
    let _containerHeight = children.length * 32 + 16

    if(_containerHeight > 272) {
      _containerHeight = 272
    }
    let {height: wrapHeight} = wrap.getBoundingClientRect()
    const _containerTop  = parseInt(_container.style.top)
    let _containerTotalHeight = _containerHeight + _containerTop
    if(_containerTotalHeight > wrapHeight) {
      _container.style.top = targetTop - 40  - _containerHeight  + 20 + 'px'
    }
  }

  getPopupContainer = () => {
    const { props } = this;
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    
    const mountNode = this.getWrap()
    mountNode.appendChild(container);

    return container;
 }

 getWrap = () => {
   return this.props.getPopupContainer()
 }

  createContainer = () => {

  }

  render() {
    const {children, className} = this.props
    if(!_container) {
      _container = this.getPopupContainer()
    }
    if(_container) {
      this.setContainerStyle()
      _container.className = 'options-wrap ' + className
      return ReactDOM.createPortal(children, _container)
    }
    return null
  }
}