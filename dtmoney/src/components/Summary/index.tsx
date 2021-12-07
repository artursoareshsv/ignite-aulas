import { useContext } from "react";
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { TransactionContext } from "../../TransactionContext";
import { Container } from "./styles";

export function Summary() {
    const { transactions } = useContext(TransactionContext);

    const summary = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'deposit') {
            acc.deposits += transaction.value;
            acc.total += transaction.value;
        } else {
            acc.withdraws += transaction.value;
            acc.total -= transaction.value;
        }

        return acc;
    }, {
        deposits: 0,
        withdraws: 0,
        total: 0
    });

    return (
        <Container>
            <div>
                <header>
                    <p>Income</p>
                    <img src={incomeImg} alt="Income" />
                </header>
                <strong>
                    {
                        new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'EUR'
                        }).format(summary.deposits)
                    }
                </strong>
            </div>

            <div>
                <header>
                    <p>Outcome</p>
                    <img src={outcomeImg} alt="Outcome" />
                </header>
                <strong>-
                    {
                        new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'EUR'
                        }).format(summary.withdraws)
                    }
                </strong>
            </div>

            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>
                    {
                        new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'EUR'
                        }).format(summary.total)
                    }
                </strong>
            </div>
        </Container>
    )
}
