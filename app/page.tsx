'use client';
import { useState, useEffect } from 'react';
import sdk from '@farcaster/frame-sdk';
import { WagmiProvider, createConfig, http, useSendTransaction } from 'wagmi';
import { base } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './globals.css';

const config = createConfig({ chains: [base], transports: { [base.id]: http() } });
const queryClient = new QueryClient();
// СЮДА ПОТОМ ВСТАВИШЬ АДРЕС КОНТРАКТА
const CONTRACT = "0x79BE7A98cc7e0b60fd7378CEd46565F5BeC727cb";

function Mint() {
  const { sendTransaction } = useSendTransaction();
  useEffect(() => { sdk.actions.ready(); }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">BearBrick Mint</h1>
      <img src="/api/image?fid=999" className="w-64 h-64 mb-6 rounded shadow-lg"/>
     <button 
          onClick={mint}
          disabled={isPending}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all transform active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.5)] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
        >
          {isPending ? 'Processing...' : 'Get my BearBrick'}
        </button>
    </div>
  );
}
export default function Page() {
  return (
    <WagmiProvider config={config}>
       <QueryClientProvider client={queryClient}><Mint /></QueryClientProvider>
    </WagmiProvider>
  );
}
