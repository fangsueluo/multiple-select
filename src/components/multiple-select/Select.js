import React from 'react'
import {
  Header,
  Title,
  Input
} from './style'
export default function(props) {
  const {placeholder} = props
  return (
    <Header>
      <Title>{placeholder}</Title>
      <Input/>
    </Header>
  )
}