import ReactModal from "react-modal";
import { Container } from "./styles";
import closeImg from '../../assets/close.svg';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
};

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button className="react-modal-close" type="button" onClick={onRequestClose} >
                <img src={closeImg} alt="Close modals" />
            </button>

            <Container>
                <h2>Create transaction</h2>

                <input type="text" placeholder="Title" />
                <input type="number" placeholder="Value" />
                <input placeholder="Category" />

                <button type="submit">Create</button>
            </Container>
        </ReactModal>
    );
}