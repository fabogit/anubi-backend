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
  createdOn: string
  amount: number
  asset: string
  user: {
    id: string
  }
}

export interface paginatedTransactions {
  paginatedTransactions: Transaction[]
  itemsPerPage: number
  currentPage: number
  previousPage?: number
  nextPage?: number
}

export interface userAssetBalance {
  user: {
    id: string
  }
  balance: number
  asset: string
}
