import { FormEvent, useContext, useState } from "react";
import ReactModal from "react-modal";
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { TransactionContext } from "../../TransactionContext";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
};

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const { createTransaction } = useContext(TransactionContext);

    const [title, setTitle] = useState('');
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState<'deposit' | 'withdraw'>('deposit');

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({ title, value, category, type });

        setTitle('');
        setValue(0);
        setCategory('');
        setType('deposit');

        onRequestClose();
    }

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

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Create transaction</h2>

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />

                <input
                    type="number"
                    placeholder="Value"
                    value={value}
                    onChange={(event) => setValue(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox type="button" onClick={() => setType('deposit')} isActive={type === 'deposit'} activeColor="green">
                        <img src={incomeImg} alt="Income" />
                        <span>Income</span>
                    </RadioBox>

                    <RadioBox type="button" onClick={() => setType('withdraw')} isActive={type === 'withdraw'} activeColor="red">
                        <img src={outcomeImg} alt="Outcome" />
                        <span>Outcome</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input
                    placeholder="Category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                />

                <button type="submit">Create</button>
            </Container>
        </ReactModal>
    );
}

function TransactionsContext(TransactionsContext: any) {
    throw new Error("Function not implemented.");
}
