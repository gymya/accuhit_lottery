import { values, forEach } from 'lodash'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {
  ref,
  get,
  update,
  query,
  orderByChild,
  equalTo
} from 'firebase/database'
import { auth, database } from '@/plugins/firebase'

export const login = async ({ account, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      account,
      password
    )
    console.log('userCredential.user', userCredential.user)
    return userCredential.user
  } catch (error) {
    return Promise.reject(error)
  }
}

export const logout = async () => {
  console.log('logout')
  try {
    await signOut(auth)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getLotteryConfig = async () => {
  try {
    const snapshot = await get(ref(database, 'config'))
    if (snapshot.exists()) {
      return snapshot.val()
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getLotteryPool = async ({ poolType }) => {
  try {
    const snapshot = await get(
      query(
        ref(database, `pool/${poolType}`),
        orderByChild('rewardId'),
        equalTo(false)
      )
    )
    if (snapshot.exists()) {
      return snapshot.val()
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getLotteryResult = async ({ rewardId, poolType }) => {
  try {
    const snapshot = await get(
      query(
        ref(database, `pool/${poolType}`),
        orderByChild('rewardId'),
        equalTo(rewardId)
      )
    )
    if (snapshot.exists()) {
      return values(snapshot.val())
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

export const updateLotteryResult = async ({ poolType, winners }) => {
  const updates = {}
  forEach(winners, (winner) => {
    updates[`pool/${poolType}/${winner.empId}`] = winner
  })

  console.log('updates:', updates)
  try {
    update(ref(database), updates)
  } catch (error) {
    return Promise.reject(error)
  }
}
