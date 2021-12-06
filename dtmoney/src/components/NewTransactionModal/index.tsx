import ReactModal from "react-modal";
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { Container, TransactionTypeContainer } from "./styles";

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

                <TransactionTypeContainer>
                    <button type="button">
                        <img src={incomeImg} alt="Income" />
                        <span>Income</span>
                    </button>

                    <button type="button">
                        <img src={outcomeImg} alt="Outcome" />
                        <span>Outcome</span>
                    </button>
                </TransactionTypeContainer>

                <input placeholder="Category" />

                <button type="submit">Create</button>
            </Container>
        </ReactModal>
    );
}