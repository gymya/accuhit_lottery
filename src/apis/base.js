import { mockAPI } from '@/apis/mock'
import { lotteryConfig, lotteryPool, lotteryResult } from '@/data'

export const login = (opts, result, isError) => mockAPI(result, isError)

export const logout = (opts, result, isError) => mockAPI(result, isError)

export const getLotteryConfig = (opts, isError) =>
  mockAPI(lotteryConfig, isError)

export const getLotteryPool = (opts, isError) => mockAPI(lotteryPool, isError)

export const getLotteryResult = (opts, isError) =>
  mockAPI(lotteryResult, isError)

export const drawLottery = (opts, result, isError) => mockAPI(result, isError)
