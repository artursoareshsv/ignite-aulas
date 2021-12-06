import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Container } from "./styles";

type Transaction = {
    id: number,
    title: string,
    value: number,
    type: string,
    category: string,
    createdAt: Date
}

export function TransactionsTable() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get("https://localhost:3000/api/transactions")
            .then(({ data }) => setTransactions(data.transactions));
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
                                    <td>{transaction.title}</td>
                                    <td className={transaction.type}>
                                        {
                                            new Intl.NumberFormat('pt-BR', {
                                                style: 'currency',
                                                currency: 'EUR'
                                            }).format(transaction.value)
                                        }
                                    </td>
                                    <td>{transaction.category}</td>
                                    <td>
                                        {
                                            new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.createdAt))
                                        }
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </Container>
    );
}