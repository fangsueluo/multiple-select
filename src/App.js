import React, {Component} from 'react';
import './App.css';
import MultipleSelect from './components/multiple-select';
const {Option} = MultipleSelect

export default class App extends Component {
  changeSelect(val){
    console.log(val)
  }
  render() {
    return (
      <div className="App">
        <MultipleSelect onChange={this.changeSelect}>
          <Option value="111">北京</Option>
          <Option value="121">北京r4</Option>
          <Option value="111=3">北京66</Option>
        </MultipleSelect>
      </div>
    );
  }
  
}
