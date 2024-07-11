import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal as BootstrapModal } from 'react-bootstrap';

const Modal = ({
	title,
	bodyContent,
	footerContent,
	isModalOpen,
	styles,
	closeModal
}) => {
	return <BootstrapModal show={isModalOpen} className={styles}>
		<BootstrapModal.Header closeButton>
			<BootstrapModal.Title>{title}</BootstrapModal.Title>
		</BootstrapModal.Header>

		<BootstrapModal.Body>
			{bodyContent}
		</BootstrapModal.Body>

		<BootstrapModal.Footer>
			{footerContent || (
				<Button variant="primary" onClick={closeModal}>Okay</Button>
			)}
		</BootstrapModal.Footer>
	</BootstrapModal>;
};

Modal.propTypes = {
	title: PropTypes.any,
	bodyContent: PropTypes.any,
	footerContent: PropTypes.any,
	isModalOpen: PropTypes.bool,
	styles: PropTypes.any,
	closeModal: PropTypes.func
};

export default Modal;