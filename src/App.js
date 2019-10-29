import React from 'react';
import './App.css';
import MultipleSelect from './components/multiple-select';
const {Option} = MultipleSelect

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <MultipleSelect>
          <Option value="111">北京</Option>
          <Option value="121">北京r4</Option>
          <Option value="111=3">北京66</Option>
        </MultipleSelect>
      </header>
    </div>
  );
}

export default App;
