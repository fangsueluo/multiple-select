import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import {Icon} from 'antd';
import './index.less';
 
interface IProps {
 disabled?: boolean;
 onChange?: (value) => void;
 value?: string | number;
 style?: React.CSSProperties;
 className?: string;
}
@observer
export class MobileSelect extends React.Component<IProps> {
 @observable showOption = false;   // 是否弹出下拉框
 @observable value: any = '';    // 当前选中的value值
 @observable text: any = '';     // 选中的value值对应的文本
 @observable cell: any;       // 组件的dom节点
 componentDidMount(): void {
  // 获取选择框的ref，当在组件外点击时的时候收起下拉框
  document.addEventListener('click', (e) => {
   if (this.cell && this.cell !== e.target && !this.cell.contains(e.target)) {
    this.showOption = false;
   }
  }, true);
 }
 componentWillReceiveProps(nextProps: Readonly<IProps>, nextContext: any): void {
  // 根据传入的value值，遍历children，找到对应值的展示文本
  if (nextProps.value !== this.props.value || nextProps.children !== this.props.children) {
   React.Children.map(this.props.children, (child, index) => {
    if (nextProps.value === child.props.value) {
     this.text = child.props.children;
    }
   });
  }
 }
 render(): React.ReactNode {
  const {children, value} = this.props;
  console.log(value);
  return (
   <div
    className={'Mobile-Select ' + this.props.className}
    style={this.props.style}
    ref={(node) => this.cell = node}
   >
    <div
     className={'select-wrap'}
     onClick={() => {
      // 禁用不能弹出下拉框
      if (!this.props.disabled) {
       this.showOption = !this.showOption;
      }
     }}
    >
     <Icon type='down' style={this.showOption ? {transform: 'rotate(180deg)'} : {transform: 'rotate(0deg)'}} className={'select-icon'}/>
     {this.text}
    </div>
    <div className={'option-wrap'} style={this.showOption ? {position: 'absolute'} : {display: 'none'}}>
     {
      React.Children.map(children, (child, index) => {
       // 设置选中option和未选中option的样式
       let optionClassName = '';
       if (this.props.value === child.props.value) {
        optionClassName = child.props.className ? child.props.className + ' option-item selected' : 'option-item selected';
       } else {
        optionClassName = child.props.className + ' option-item';
       }
       return (
        <div
         onClick={() => {     // 为了在父组件给子组件添加onClick事件，包裹了一层div
          // 有无onChange事件都能改变值
          if (this.props.value && this.props.onChange) {
           this.props.onChange(child.props.value);
          } else {
           this.text = child.props.children;
           this.value = child.props.value;
          }
          console.log(this.value);
          this.showOption = !this.showOption;
         }}
         style={this.props.style}
         className={optionClassName}
        >{child}</div>
       );
      })
     }
    </div>
   </div>
  );
 }
}
interface OptionProps {
 value?: string | number;
 className?: string;
 style?: React.CSSProperties;
}
export class MobileOption extends React.Component<OptionProps> {
 render(): React.ReactNode {
  const {children} = this.props;
  return (
   <div style={this.props.style}>
    {children}
   </div>
  );
 }
}