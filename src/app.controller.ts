import { Controller, Get, Param } from "@nestjs/common"

import { AppService } from "./app.service"
import {
  paginatedTransactions,
  Transaction,
  userAssetBalance,
  userBalances,
} from "./database/transactions.types"
import {
  paramUserIdDto,
  queryPageDto,
} from "./validation-dto/validation-params"

@Controller("v1")
export class AppController {
  constructor(private readonly appService: AppService) {}

  // old transaction endpoint
  @Get("transactions")
  getTransactions(): Transaction[] {
    return this.appService.getTransactions()
  }

  // TODO - DONE
  @Get("transactions/:page")
  getPaginatedTransactions(@Param() page: queryPageDto): paginatedTransactions {
    const paginatedTransactions = this.appService.getPaginatedTransactions(page)
    return paginatedTransactions
  }

  // TODO - DONE
  @Get("balances/:userId")
  getBalanceByUser(@Param() userId: paramUserIdDto): userAssetBalance[] {
    const userBalance = this.appService.getBalanceByUser(userId)
    return userBalance
  }

  // TODO
  @Get("balances")
  getBalances(): userBalances[] {
    const balances = this.appService.getBalances()
    return balances
  }
}
