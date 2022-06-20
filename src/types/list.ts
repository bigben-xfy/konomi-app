export type listData = {
  id: number
  blockNumber: number,
  transactionIndex: number
  sources: number[]
  symbol: string
  slug: string,
  leaseEnd: number,
  subscriptionId: number
  networkId: number
  aggregationStrategy: number
  reportingStrategy: number
  //  1:active, 0: suspended, 2: terminated
  status: 0 | 1 | 2
  client: {
    clientType: number,
    connectionInfo: {
      contractAddress: string,
      networkId: number
    }
  },
  createdTimestamp: string,
  updatedTimestamp: string,
  display: boolean,
  logo?: string,
  price?: number
}