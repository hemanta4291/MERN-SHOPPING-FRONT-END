import styled from "styled-components"

const ModalWrapper = styled.div`
  position: fixed;
  top:0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0,0,0,0.5);
`

const ModalContainer = styled.div`
    position: absolute;
    top: 50%;
    width:100%;
    max-Width:500px;
    padding:20px 0;
    left: 50%;
    right: auto;
    bottom: auto;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 6px;

`

const GlobalModal = ({children,modalIsOpen=true}) => {
  return (
    <ModalWrapper className={`${modalIsOpen ? '' : 'hidden'}`}>
        <ModalContainer>
          {children}
        </ModalContainer>
      </ModalWrapper>
  )
}

export default GlobalModal