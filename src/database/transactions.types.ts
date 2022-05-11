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

export interface paginatedTransaction {
  currentPage: number
  nextPage?: number
  previousPage?: number
  itemsPerPage: number
  paginatedTransactions: Transaction[]
}
