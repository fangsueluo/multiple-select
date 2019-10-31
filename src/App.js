import React, {Component} from 'react';
import './App.css';
import MultipleSelect from './components/multiple-select';
const {Option} = MultipleSelect

export default class App extends Component {
  changeSelect(val){
    console.log(val)
  }
  options = [
    {
      label: '选项1',
      tagName: 'tag选项1',
      value: 1
    },
    {
      label: '选项2',
      tagName: 'tag选项2',
      value: 2
    },
    {
      label: '选项3',
      tagName: 'tag选项3',
      value: 3
    },
    {
      label: '选项4',
      tagName: 'tag选项4',
      value: 4
    },
    {
      label: '选项5',
      tagName: 'tag选项5',
      value: 5
    },
    {
      label: '选项6',
      tagName: 'tag选项6',
      value: 6
    },{
      label: '选项7',
      tagName: 'tag选项7',
      value: 7
    },
    {
      label: '选项8',
      tagName: 'tag选项8',
      value: 8
    },
    {
      label: '选项9',
      tagName: 'tag选项9',
      value: 9
    },
    {
      label: '选项10',
      tagName: 'tag选项10',
      value: 10
    },
    {
      label: '选项11',
      tagName: 'tag选项11',
      value: 11
    }
  ]
  render() {
    return (
      <div className="App">
        <MultipleSelect onChange={this.changeSelect}>
          <Option value="111">北京</Option>
          <Option value="121">北京r4</Option>
          <Option value="111=3">北京66</Option>
        </MultipleSelect>
        <MultipleSelect 
        className="top"
        tagLabelProp="tagName"
        onChange={this.changeSelect}
        >
          {
            this.options.map(item => {
              return <Option value={item.value} tagName={item.tagName} key={item.value}>{item.label}</Option>
            })
          }
        </MultipleSelect>
      </div>
    );
  }
  
}
