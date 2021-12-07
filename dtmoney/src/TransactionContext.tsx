import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from './services/api';

interface Transaction {
    id: number,
    title: string,
    value: number,
    type: string,
    category: string,
    createdAt: Date
}

interface TransactionsProviderProps {
    children: ReactNode;
}

export const TransactionContext = createContext<Transaction[]>([]);

export function TransactionProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get("https://localhost:3000/api/transactions")
            .then(({ data }) => setTransactions(data.transactions));
    }, []);

    return (
        <TransactionContext.Provider value={transactions}>
            {children}
        </TransactionContext.Provider>
    );
}