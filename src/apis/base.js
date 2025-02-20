import { filter, values, forEach } from 'lodash'

export const getLotteryPool = ({ poolType }) => {
  const data = JSON.parse(localStorage.getItem('lotteryPool'))
  return filter(data[poolType], (item) => item.rewardId === null)
}

export const getLotteryResult = ({ rewardId, poolType }) => {
  const data = JSON.parse(localStorage.getItem('lotteryPool'))
  return filter(values(data[poolType]), ['rewardId', rewardId])
}

export const updateLotteryResult = ({ poolType, winners }) => {
  const data = JSON.parse(localStorage.getItem('lotteryPool'))
  forEach(winners, (winner) => {
    data[poolType][winner.empId] = winner
  })
  localStorage.setItem('lotteryPool', JSON.stringify(data))
}
