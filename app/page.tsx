'use client';
import { useState, useEffect } from 'react';
import sdk from '@farcaster/frame-sdk';
import { 
  WagmiProvider, 
  createConfig, 
  http, 
  useSendTransaction, 
  useWaitForTransactionReceipt,
  useAccount,
  useConnect 
} from 'wagmi';
import { base } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Конфигурация с явным указанием injected (кошелька браузера/фаркастера)
const config = createConfig({
  chains: [base],
  connectors: [injected()],
  transports: { [base.id]: http() },
});

const queryClient = new QueryClient();

// !!! ПРОВЕРЬ, ЧТО ТУТ НЕ НУЛИ !!!
const CONTRACT_ADDRESS = "0xf092813dbB399595cda130f6808839210BB216BA"; // <-- ВСТАВЬ СВОЙ АДРЕС ИЗ REMIX

function App() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  
  // Хуки Wagmi
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { sendTransaction, error: sendError, isPending: isSending, data: hash } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  // 1. Инициализация SDK и Авто-подключение кошелька
  useEffect(() => {
    const load = async () => {
      try {
        await sdk.actions.ready();
        setIsSDKLoaded(true);
        
        // Пытаемся подключиться к кошельку Фаркастера сразу при загрузке
        if (!isConnected) {
          connect({ connector: injected() });
        }
      } catch(e) {
        console.error(e);
      }
    };
    load();
  }, [isConnected, connect]);

  const mint = () => {
    // Если кошелек не подключен — подключаем
    if (!isConnected) {
      connect({ connector: injected() });
      return;
    }

    console.log("Minting to:", CONTRACT_ADDRESS);
    
    sendTransaction({
      to: CONTRACT_ADDRESS,
      value: BigInt(10000000000000), // 0.00001 ETH
      data: "0x1249c58b"
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-zinc-900 font-sans text-white">
      <div className="w-full max-w-md bg-zinc-800 rounded-3xl p-6 shadow-2xl border border-zinc-700 flex flex-col items-center">
        
        <h1 className="text-3xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          BearBrick Gen
        </h1>
        
        {/* Показываем статус кошелька для отладки */}
        <div className="text-xs text-zinc-500 mb-4">
           {isConnected ? `Wallet: ${address?.slice(0,6)}...${address?.slice(-4)}` : "Connecting wallet..."}
        </div>
        
        <div className="relative w-64 h-64 bg-white rounded-xl overflow-hidden shadow-inner mb-8 border-4 border-zinc-600">
             <img src="/api/image?fid=1" className="w-full h-full object-cover" alt="Preview" />
        </div>

        {/* Блок вывода ошибок (ЧТОБЫ ПОНЯТЬ В ЧЕМ ДЕЛО) */}
        {sendError && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg text-xs text-red-200 w-full break-words">
            Error: {sendError.message.slice(0, 100)}...
          </div>
        )}

        {isSuccess ? (
          <div className="w-full bg-green-600 text-white font-bold py-4 rounded-xl text-center shadow-[0_0_20px_rgba(34,197,94,0.5)]">
            SUCCESS! MINTED!
          </div>
        ) : (
          <button 
            onClick={mint}
            disabled={isSending || isConfirming}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all transform active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.5)] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
          >
            {isSending ? 'Check Wallet...' : isConfirming ? 'Confirming...' : 'Get my BearBrick'}
          </button>
        )}
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
