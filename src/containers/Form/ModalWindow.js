import React, { Component }  from 'react';
import styled from 'styled-components'
import { Flex } from 'grid-styled'

const ModalWrapper = styled.div`
background-color: rgba(0, 0, 0, 0.5);
position: fixed;
z-index: 1;
height: 100%;
width: 100%;
top: 0;
display: ${(props) => props.display};
align-items: center;
justify-content: center;
`

const DialogContainer = styled.div`
width: 50rem;
height: ${(props) => props.height || 'auto'};
max-height: 80vh;
overflow-y: auto;
padding: 2.4rem;
border-radius: 4px;
background-color: #fff;
`

const DialogHeader = styled.h1`
letter-spacing: 0.4px;
line-height: 1.2;
`

const CloseButton = styled.button`
height: min-content;
background-color: white;
border: none;
cursor: pointer;
outline: none;
padding: 0;
`

export class Dialog extends Component {
  componentDidMount() {
    document.body.addEventListener('click', this.handleDocumentClick, true)

    const main = document.querySelector('main')

    if (main) {
      main.classList.add('blurMe')
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleDocumentClick, true)

    const main = document.querySelector('main')

    if (main) {
      main.classList.remove('blurMe')
    }
  }

  handleDocumentClick = e => {
    if (e.target.getAttribute('id') === 'mainContainer') {
      this.props.onCloseDialog(e)
    }
  }

  render() {
    const { header, height, onCloseDialog, children, display } = this.props

    return (
      <ModalWrapper id="mainContainer" display={display}>
        <DialogContainer height={height}>
          <Flex justifyContent="space-between">
            <DialogHeader>{header}</DialogHeader>
            <CloseButton onClick={onCloseDialog}>✖</CloseButton>
          </Flex>
          {children}
        </DialogContainer>
      </ModalWrapper>
    )
  }
}
