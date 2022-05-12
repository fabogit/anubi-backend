import { Injectable, NotImplementedException } from "@nestjs/common"
import { TransactionsRepo } from "./database/transactions.repo"
import {
  userAssetBalance,
  paginatedTransactions,
  Transaction,
} from "./database/transactions.types"
import { queryPageDto, paramUserIdDto } from "./validation-dto/validation-query"

const INTEREST_RATES_BY_ASSET = {
  BTC: 5,
  ETH: 6.6,
  DOT: 8,
}

@Injectable()
export class AppService {
  constructor(private readonly transactionsRepo: TransactionsRepo) {}

  getTransactions(): Transaction[] {
    return this.transactionsRepo.getAll()
  }

  // TODO - DONE
  getPaginatedTransactions(param: queryPageDto): paginatedTransactions {
    const page: number = +param.page // + js trick to get a number. <3 TS

    // getAll and sort by createdOn
    const transactions: Transaction[] = this.transactionsRepo.getAll()
    const sortedTransactions: Transaction[] = transactions.sort(
      (firstObj, secondObj) =>
        firstObj.createdOn > secondObj.createdOn ? 1 : -1
    )
    // console.log(sortedTransactions)

    // set pagination options
    const itemsPerPage = 5
    const startIndex: number = (page - 1) * itemsPerPage
    const endIndex: number = page * itemsPerPage
    // console.log(`start ${startIndex}, end ${endIndex}`)

    // setting data in paginatedResults and page index logic 
    const paginatedResults: paginatedTransactions = {
      paginatedTransactions: sortedTransactions.slice(startIndex, endIndex),
      itemsPerPage: itemsPerPage,
      currentPage: page,
    }
    if (startIndex > 0) {
      paginatedResults.previousPage = page - 1
    }
    if (endIndex < sortedTransactions.length) {
      paginatedResults.nextPage = page + 1
    }
    // console.log(paginatedResults)
    return paginatedResults
  }

  /**
   * @dev This method is used to get the total balance (sum of amounts)
   *  grouped by user id, and asset
   *
   * @returns
   */
  getBalanceByUser(userId: paramUserIdDto): userAssetBalance[] {
    // TODO - DONE
    // throw new NotImplementedException()
    const allTransactions: Transaction[] = this.transactionsRepo.getAll()

    // filter transactions by user.id
    const userTransactions: object[] = []
    for (const transaction of allTransactions) {
      if (transaction.user.id === userId.userId) {
        userTransactions.push(transaction)
      }
    }
    // console.log(userIdTransactions)

    // this or _.groupBy() to group by key
    // Accepts the array and key
    const groupBy = (array, key) => {
      // Return the end result
      return array.reduce(
        function (result, currentValue) {
          // If an array already present for key, push it to the array.
          // Else create an array and push the object
          ;(result[currentValue[key]] = result[currentValue[key]] || []).push(
            currentValue
          )
          // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
          return result
        },
        // empty object is the initial value for result object
        {}
      )
    }

    // Group userTransactions by asset, {ETH:[], DOT:[]...}
    const userTransactionsAsset: object = groupBy(userTransactions, "asset")
    // console.log(userTransactionsAsset)

    const userBalance: userAssetBalance[] = []
    for (const assetType in userTransactionsAsset) {
      // single asset transaction
      const assetTransactions: Transaction[] = userTransactionsAsset[assetType]
      // console.log(assetTransactions);
      // console.log(assetTransactions.map((transaction) => transaction.amount))

      // map transaction amount and sum it
      const assetBalance: number = assetTransactions
        .map((transaction) => transaction.amount)
        .reduce((previousValue, currentValue) => previousValue + currentValue)
      // console.log(assetBalance);

      // create user asset balance object
      const userAssetBalance: userAssetBalance = {
        user: { id: userId.userId },
        asset: assetType,
        balance: assetBalance,
      }
      userBalance.push(userAssetBalance)
    }
    return userBalance
  }

  /**
   * @dev This method is used to calculate the interests due to a customer based on the assets he deposited
   *  The interests calculation must be per-asset within a month timeframe.
   *  For example this method should calculate for user u1 the interests matured by his ETH assets and the interest rate
   *  This is the formula:
   *     total_interest = (total balance of the asset type owned by the user) * (rate found inside INTEREST_RATES_BY_ASSET variable depending on the asset id)
   *
   *  After the calculation of the interest due, it should be created a TransactionNature=Interest and the amount calculated by the previous step
   *
   * @returns
   */
  processUserInterests(): any {
    // TODO: applicant should implement this method
    throw new NotImplementedException()
  }
}
