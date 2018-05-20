import React, { Component }  from 'react';
import styled, { css } from 'styled-components'
import { Flex } from 'grid-styled'
import { Portal } from 'react-portal'
import { Dialog } from './ModalWindow'

export const button = css`
display: block;
font-size: 1.2rem;
font-weight: bold;
letter-spacing: 0.1rem;
text-decoration: none;
text-align: center;
border-radius: 4px;
outline: none;
cursor: pointer;

&:focus {
  outline: none;
}
`

const OpenFormButton = styled.button`
  ${button};
  text-transform: uppercase;
  color: #fff;
  background: green;
  border: none;
  padding: 1.2rem 2rem;
  margin-top: 2rem;
`

export const GreenButton = styled.button`
  ${button};
  background-color: #fff;
  text-transform: lowercase;
  color: gray;
  &:hover {
    color: white;
    background-color: green;
  }
`

const Label = styled.span`
  font-size: 1.4rem;
  margin-bottom: 1.2rem;
  color: gray;
`

const StyledInput = styled.input`
  font-family: inherit;
  border: solid 1px gray;
  border-radius: 4px;
  width: auto;
  height: 3rem;
  padding: 1.6rem 1rem;
  box-sizing: border-box;
`

const login = () => {
  const login = document.iAccInput.iName.value;
  const password = document.iAccInput.iAccID.value;
  const trueName = 'user';
  const truePassword = '123';

  if ((login === trueName) && (password === truePassword)) {
    alert("Successfull. Results were sent");
  }
  else {
    alert("Error! Try again");
  }
} 

export class AutorizeForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFormOpened: false
    }
  }

  handleOpenForm = () => {
    this.setState({
      isFormOpened: true,
    })
  }

  handleCloseForm = e => {
    e.stopPropagation()
    this.setState({ isFormOpened: false })
  }

  render() {
    const { isFormOpened } = this.state

    return (
      <Flex justifyContent="center">
        <OpenFormButton onClick={this.handleOpenForm}>
          I want to send results to my account
        </OpenFormButton>

        <Portal isOpened={isFormOpened}>
          <Dialog header="Input your credentials" onCloseDialog={this.handleCloseForm} 
          display={isFormOpened ? 'flex' : 'none'}>
            <form name="iAccInput">
              <Flex alignItems="center" flexDirection="column">
                <Flex is="label" flexDirection="column" mb="1.2rem">
                  <Label>Name</Label>
                  <StyledInput name="iName" maxlength="15" size="20" />
                </Flex>
                <Flex is="label" flexDirection="column" mb="1.2rem">
                  <Label>Password</Label>
                  <StyledInput name="iAccID" type="password" maxlength="15" size="20" />
                </Flex>
        
                <GreenButton value=" Login " onClick={login} height="40" width="50">submit</GreenButton>
              </Flex>
            </form>
          </Dialog>
        </Portal> 
      </Flex>
    )
  }
}
