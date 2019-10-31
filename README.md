### 实现功能
+ 自定义宽度
+ 清空所有选项
+ 判断dropdownMenu出现位置（有bug）
+ tag内容可与option名称不一致，可单个删除，大于8个显示+N
+ 支持搜索，支持添加新option
```
placeholder: '请选择',
width: '', //自定义宽度
allowClear: true, //允许一次性删除
maxTagCount: 8,  //最大tag展示
tagLabelProp: '', //tag显示的属性名
search: false, //搜索选项
addOption: false, // 搜索添加选项,
onChange: () => {}, //点击选项时触发
```

### 启动步骤
`npm install`

`npm start`
