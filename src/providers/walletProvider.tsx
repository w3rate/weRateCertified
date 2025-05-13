'use client'
import React, {FC, ReactNode, useMemo} from 'react'
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react'
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  LedgerWalletAdapter,
  TorusWalletAdapter
} from '@solana/wallet-adapter-wallets'
// import {clusterApiUrl} from '@solana/web3.js'

import './wallet-provider.css'

const WalletContextProvider: FC<{children: ReactNode}> = ({children}) => {
  // const network = clusterApiUrl('mainnet-beta')
  const network = 'https://mainnet.helius-rpc.com/?api-key=46351aac-43a6-4e35-a40f-1155816b9658'

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new LedgerWalletAdapter(),
      new TorusWalletAdapter()
    ],
    []
  )

  return (
    <ConnectionProvider endpoint={network}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default WalletContextProvider
