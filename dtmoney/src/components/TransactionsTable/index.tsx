import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Container } from "./styles";

type Transactions = {
    id: number,
    tittle: string,
    amount: number,
    type: string,
    category: string,
    createdAt: Date
}

export function TransactionsTable() {
    const [transactions, setTransactions] = useState<Transactions[]>([]);

    useEffect(() => {
        api.get("https://localhost:3000/api/transactions")
            .then(({ data }) => setTransactions(data));
    }, [])


    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Value</th>
                        <th>Category</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        transactions.map((transaction) => {
                            return (
                                <tr key={transaction.id}>
                                    <td>{transaction.tittle}</td>
                                    <td className={transaction.type}>{transaction.amount}</td>
                                    <td>{transaction.category}</td>
                                    <td>{transaction.createdAt}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </Container>
    );
}