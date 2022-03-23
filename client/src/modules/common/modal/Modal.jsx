import { useState } from 'react';

import styled from 'styled-components';

const InnerModal = styled.div`
  background: ${(props) => props.theme.white};
  border: 4px solid ${(props) => props.theme.green};
  border-radius: 5px;
  width: 600px;
  max-width: 100%;
  height: 400px;
  max-height: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
`;

const OuterModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.grey_opaque};
  z-index: 1000;
`;

function Modal({ children, toggleModal }) {
  return (
    <>
      <OuterModal onClick={toggleModal}></OuterModal>
      <InnerModal>{children}</InnerModal>
    </>
  );
}

export default Modal;

export function useModal() {
  const [modalChildren, setModalChildren] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }
  return {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    modalChildren: modalChildren,
    setModalChildren: setModalChildren,
  };
}
