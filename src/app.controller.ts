import { Controller, Get, Param } from "@nestjs/common"

import { AppService } from "./app.service"
import {
  paginatedTransaction,
  Transaction,
} from "./database/transactions.types"
import { queryPageNumberDto } from "./validation-dto/validation-query"

@Controller("v1")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("transactions")
  getTransactions(): Transaction[] {
    return this.appService.getTransactions()
  }

  // !TODO
  @Get("paginated-transactions/:page")
  getPaginatedTransactions(
    @Param() page: queryPageNumberDto
  ): paginatedTransaction {
    const response = this.appService.getPaginatedTransactions(page)

    return response
  }

  @Get("balances")
  getBalanceByUser(): Transaction[] {
    return this.appService.getBalanceByUser()
  }
}
