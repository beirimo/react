import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DaumPostcodeEmbed from 'react-daum-postcode';

const ModalAddress = (pros) => {
  const {form, setForm} = pros; //비구조할당
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onComplete = (e) => {
    console.log(e);
    const address=e.buildingName ?`${e.address}(${e.buildingName})`:e.address;
    setForm({
      ...form,
      address1:address
    })
    //빌딩네임이 있으면 왼쪽 없으면 오른쪽 (?기준) 
    handleClose();
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        검색
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>주소검색</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DaumPostcodeEmbed onComplete={onComplete}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddress