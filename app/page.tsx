import React from 'react';
import Navbar from './components/Navbar';
import Deposit from './components/deposit';

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center my-8">MoneyStorage dApp</h1>
        <Deposit />
      </div>
    </div>
  );
}