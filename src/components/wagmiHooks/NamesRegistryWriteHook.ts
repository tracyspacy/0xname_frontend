import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { namesRegistryConfig } from './contracts';

interface NamesRegistryWriteHookInterface {
  functionName: string,
  functionArgs: (string | string[])[],
  txValue: bigint,
}

export function NamesRegistryWriteHook(fn: NamesRegistryWriteHookInterface) {
  const { write, data, error: writeError, isLoading, isError: isWriteError } = useContractWrite({
    ...namesRegistryConfig,
    address: '0xe4599af01a9079392900A688E85F0d5E406B3106',
    functionName: fn.functionName,
    args: fn.functionArgs,
    value: fn.txValue,
  });

  const { data: receipt, isLoading: isPending, isSuccess, isError: isTxError, error: txError, refetch: txRefetch } = useWaitForTransaction({
    confirmations: 1,
    hash: data?.hash,
  });

  return {
    write,
    receipt,
    isPending,
    isSuccess,
    isWriteError,
    isTxError,
    txError,
    writeError,
    isLoading,
    txRefetch,
  };
}
