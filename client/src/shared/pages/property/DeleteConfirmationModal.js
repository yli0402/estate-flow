import React from 'react';
import { Modal } from 'react-bootstrap';
import Button from '@atlaskit/button';

const DeleteConfirmationModal = ({ isOpen, onCancel, onDelete, modalTitle, modalContent }) => {
    return (
        <Modal show={isOpen} onHide={onCancel} centered>
            <Modal.Header className='bg-danger text-white'>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-content panel-warning'>
                {modalContent}
            </Modal.Body>
            <Modal.Footer>
                <Button appearance='subtle' onClick={onCancel}>
                    Cancel
                </Button>
                <Button appearance='danger' onClick={onDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteConfirmationModal;