import { useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import { ExitIcon } from '@Common/icons';
import Card from '@Common/card';

const InnerModal = styled(Card)`
  border-radius: 25px;
  width: 500px;
  max-width: 100%;
  height: auto;
  max-height: 600px;
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
  cursor: pointer;
`;

function Modal({ content, toggleModal }) {
  return createPortal(
    <>
      <OuterModal onClick={toggleModal}></OuterModal>
      <InnerModal>
        <ExitIcon onClick={toggleModal} />
        {content}
      </InnerModal>
    </>,
    document.body
  );
}

export default Modal;

export function useModal() {
  const [modalContent, setModalContent] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }
  return {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    modalContent: modalContent,
    setModalContent: setModalContent,
  };
}
