'use client';
import { useState, useEffect } from 'react';
import sdk from '@farcaster/frame-sdk';
import { WagmiProvider, createConfig, http, useSendTransaction } from 'wagmi';
import { base } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const config = createConfig({
  chains: [base],
  transports: { [base.id]: http() },
});
const queryClient = new QueryClient();

// !!! ВСТАВЬ СЮДА СВОЙ АДРЕС КОНТРАКТА ВМЕСТО НУЛЕЙ !!!
const CONTRACT_ADDRESS = "0x79BE7A98cc7e0b60fd7378CEd46565F5BeC727cb"; 

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { sendTransaction, isPending } = useSendTransaction();

  useEffect(() => {
    const load = async () => {
      try { await sdk.actions.ready(); } catch(e) {}
      setIsLoaded(true);
    };
    load();
  }, []);

  // Вот она, функция mint, которую не мог найти Vercel
  const mint = () => {
    sendTransaction({
      to: CONTRACT_ADDRESS,
      value: BigInt(100000000000000), // 0.0001 ETH
      data: "0x1249c58b" // Функция mint()
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-zinc-900 font-sans text-white">
      <div className="w-full max-w-md bg-zinc-800 rounded-3xl p-6 shadow-2xl border border-zinc-700 flex flex-col items-center">
        
        <h1 className="text-3xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          BearBrick Gen
        </h1>
        <p className="text-zinc-400 mb-6 text-sm">Based on Farcaster ID</p>
        
        <div className="relative w-64 h-64 bg-white rounded-xl overflow-hidden shadow-inner mb-8 border-4 border-zinc-600">
             {/* Используем fid=1 для превью, в реальном аппе можно подставлять ID юзера */}
             <img 
               src="/api/image?fid=1" 
               className="w-full h-full object-cover"
               alt="Preview"
             />
        </div>

        <button 
          onClick={mint}
          disabled={isPending}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all transform active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.5)] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
        >
          {isPending ? 'Processing...' : 'Get my BearBrick'}
        </button>
        
        <div className="mt-4 text-xs text-zinc-500">
          0.0001 ETH • Base Mainnet
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
