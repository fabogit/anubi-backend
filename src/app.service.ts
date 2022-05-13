import { Injectable, NotImplementedException } from "@nestjs/common";

import { TransactionsRepo } from "./database/transactions.repo";
import {
  userAssetBalance,
  paginatedTransactions,
  Transaction,
  userTransaction,
  userBalances,
  assetBalance,
} from "./database/transactions.types";

import {
  queryPageDto,
  paramUserIdDto,
} from "./validation-dto/validation-params";

const INTEREST_RATES_BY_ASSET = {
  BTC: 5,
  ETH: 6.6,
  DOT: 8,
};

// this or _.groupBy() to group by key
function groupByKey(array, key: string) {
  // Return the end result
  return array.reduce(
    function (result, currentValue) {
      // If an array already present for key, push it to the array.
      // Else create an array and push the object
      ; (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    },
    // empty object is the initial value for result object
    {}
  );
}

@Injectable()
export class AppService {
  constructor(private readonly transactionsRepo: TransactionsRepo) { }

  getTransactions(): Transaction[] {
    return this.transactionsRepo.getAll();
  }

  // TODO - DONE
  getPaginatedTransactions(param: queryPageDto): paginatedTransactions {
    const page: number = param.page;

    // getAll and sort by createdOn
    const transactions: Transaction[] = this.transactionsRepo.getAll();
    const sortedTransactions: Transaction[] = transactions.sort(
      (firstObj, secondObj) =>
        firstObj.createdOn > secondObj.createdOn ? 1 : -1
    );

    // set pagination options
    const itemsPerPage = 5;
    const startIndex: number = (page - 1) * itemsPerPage;
    const endIndex: number = page * itemsPerPage;

    // setting data in paginatedResults and page index logic
    const paginatedResults: paginatedTransactions = {
      paginatedTransactions: sortedTransactions.slice(startIndex, endIndex),
      itemsPerPage: itemsPerPage,
      currentPage: page,
    };
    if (startIndex > 0) {
      paginatedResults.previousPage = page - 1;
    }
    if (endIndex < sortedTransactions.length) {
      paginatedResults.nextPage = page + 1;
    }
    return paginatedResults;
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
    const allTransactions: Transaction[] = this.transactionsRepo.getAll();

    // filter transactions by user.id
    const userTransactions: Transaction[] = [];
    for (const transaction of allTransactions) {
      if (transaction.user.id === userId.userId) {
        userTransactions.push(transaction);
      }
    }

    // Group userTransactions by asset, {ETH:[], DOT:[]...}
    const userTransactionsAsset: object = groupByKey(userTransactions, "asset");

    const userBalance: userAssetBalance[] = [];
    for (const assetType in userTransactionsAsset) {
      // single asset transaction
      const assetTransactions: Transaction[] = userTransactionsAsset[assetType];

      // map transaction amount and sum it
      const assetBalance: number = assetTransactions
        .map((transaction) => transaction.amount)
        .reduce((previousValue, currentValue) => previousValue + currentValue);

      // create user asset balance object
      const userAssetBalance: userAssetBalance = {
        user: { id: userId.userId },
        asset: assetType,
        balance: assetBalance,
      };
      userBalance.push(userAssetBalance);
    }
    return userBalance;
  }

  /**
   * @dev This method is used to get the total balance (sum of amounts)
   *  grouped by user id, and asset
   *
   * @returns
   */
  getBalances(): userBalances[] {
    // TODO - DONE
    // throw new NotImplementedException()
    const allTransactions: Transaction[] = this.transactionsRepo.getAll();

    // get all transaction for user
    const balanceTransactions: userTransaction[] = [];
    for (const transaction of allTransactions) {
      const userTransactions: userTransaction = {
        balance: transaction.amount,
        asset: transaction.asset,
        userId: transaction.user.id,
      };
      balanceTransactions.push(userTransactions);
    }

    // Group userTransactions by user.id, {u1:[transactions], u2:[]...}
    const userTransactionsAsset: object = groupByKey(
      balanceTransactions,
      "userId"
    );

    // assets balances for ALL users
    const userBalances: userBalances[] = [];
    for (const userIdKey in userTransactionsAsset) {
      // all transactions of a user
      const userTransactions: userTransaction[] =
        userTransactionsAsset[userIdKey];

      // balances obj to populate
      const userBalance: userBalances = {
        userId: userIdKey,
        balances: [],
      };

      for (const transaction of userTransactions) {
        let balanceIsCalculated: boolean = false;
        for (const elem of userBalance.balances) {
          if (elem.asset === transaction.asset) {
            // sum the asset amount of every transaction until present
            // userTransaction {balance: number, asset: string, userId?: string}
            elem.amount += transaction.balance;
            balanceIsCalculated = true;
          }
        }
        if (!balanceIsCalculated) {
          // asset balance calculated, push into userBalance
          userBalance.balances.push({
            asset: transaction.asset,
            amount: transaction.balance,
          });
        }
      }
      userBalances.push(userBalance);
    }
    return userBalances;
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
    throw new NotImplementedException();
  }
}
