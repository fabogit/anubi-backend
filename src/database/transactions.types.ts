export enum TransactionNature {
  Deposit = "Deposit",
  Withdraw = "Withdraw",
  Rewards = "Rewards",
  Interest = "Interest",
}

export interface Transaction {
  id: string
  nature: {
    code: TransactionNature
  }
  // why there was no date?
  createdOn?: string
  amount: number
  asset: string
  user: {
    id: string
  }
}

export interface userAssetBalance {
  user: { id: string }
  asset: string
  balance: number
}

export interface paginatedTransactions {
  paginatedTransactions: Transaction[]
  itemsPerPage: number
  currentPage: number
  previousPage?: number
  nextPage?: number
}

export interface userTransaction {
  balance: number
  asset: string
  userId?: string
}
export interface assetBalance {
  asset: string
  amount: number
}

export interface userBalances {
  userId: string
  balances: assetBalance[]
}


