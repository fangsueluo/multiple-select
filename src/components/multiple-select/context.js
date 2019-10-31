import {createContext} from 'react'
export const SelectContext = createContext({
  tagMaps: {},
  field: '',
  clickItem: () => {}
})