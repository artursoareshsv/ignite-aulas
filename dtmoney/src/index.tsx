import { createServer } from 'miragejs';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return [
        {
          id: 1,
          tittle: 'Transaction 1',
          amount: 400,
          type: 'deposit',
          category: 'Food',
          createdAt: '2020-01-01'
        },
        {
          id: 2,
          tittle: 'Transaction 2',
          amount: 300,
          type: 'withdraw',
          category: 'Food',
          createdAt: '2020-01-02'
        }
      ];
    })
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

