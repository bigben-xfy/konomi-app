import { listData } from "@/types/list"
import { mathRandom } from "../utils"

const baseData: listData = {
  id: 71,
  blockNumber: 12297450,
  transactionIndex: 6,
  sources: [0, 1, 2, 3],
  symbol: 'ETH',
  slug: 'ethereum',
  leaseEnd: 12499050,
  subscriptionId: 7,
  networkId: 0,
  aggregationStrategy: 1,
  reportingStrategy: 0,
  status: 1,
  client: {
    clientType: 0,
    connectionInfo: {
      contractAddress: '0x0F9dfd6043965B02e74D01188c13936fBE71D688',
      networkId: 0
    }
  },
  createdTimestamp: '',
  updatedTimestamp: '',
  display: true,
}

export const getList = (): Promise<listData[]> => {
  const num = mathRandom(10) + 1
  return new Promise(async resolve => {
    await new Promise(resolve => setTimeout(resolve, mathRandom(1000) + 2000))
    const data = [...new Array(num)].map(() => {
      return {
        ...baseData,
        id: mathRandom(100000),
        status: mathRandom(3) as 0 | 1 | 2,
        symbol: mathRandom(2) === 0 ? 'ETH' : 'BLA',
        subscriptionId: mathRandom(10),
      }
    })
    resolve(data)
  })
}

export const getCoinPrice = (ids: number[]): Promise<{ subscriptionId: number, price: number }[]> => {
  return new Promise(async resolve => {
    await new Promise(resolve => setTimeout(resolve, mathRandom(1000) + 2000))
    const _map = new Map()
    const data = [...ids].map(id => {
      if (!_map.get(id)) _map.set(id, mathRandom(10000000))
      return {
        subscriptionId: id,
        price: _map.get(id)
      }
    })
    resolve(data)
  })
}

//getCoinLogo基本一个道理，等待返回的时候毛玻璃做骨架显示处理