<script setup>
  import { ref, onBeforeMount, reactive } from 'vue'
  import { sampleSize, isEmpty } from 'lodash'
  import { useQuasar } from 'quasar'
  import { useBaseStore } from '@/stores/base'
  import {
    getLotteryConfig,
    getLotteryPool,
    getLotteryResult,
    updateLotteryResult
  } from '@/apis/base'

  const $q = useQuasar()
  const baseStore = useBaseStore()
  console.log('baseStore.isAdmin:', baseStore.isAdmin)

  const config = ref({})
  const getConfig = async () => {
    try {
      const result = await getLotteryConfig()
      console.log('getConfig:', result)
      config.value = result
    } catch (error) {}
  }

  onBeforeMount(async () => {
    $q.loading.show({
      backgroundColor: 'primary',
      spinnerSize: 60
    })
    await getConfig()
    $q.loading.hide()
  })

  const result = reactive({})
  const getResult = async (rewardId) => {
    // console.log('getResult', rewardId)
    if (result[rewardId]?.length === config.value[rewardId].quantity) return
    try {
      const res = await getLotteryResult({
        rewardId,
        poolType: config.value[rewardId].pool
      })
      result[rewardId] = res
    } catch (error) {}
  }

  const dialog = reactive({
    show: false,
    title: null,
    content: []
  })
  const drawStartTime = ref(null)
  const showDrawLoading = () => {
    drawStartTime.value = Date.now()
    $q.loading.show({
      backgroundColor: 'primary',
      spinnerSize: 60,
      customClass: 'draw-loading'
    })
  }
  const finishDrawLoading = (callback) => {
    const elapsedTime = Date.now() - drawStartTime.value
    const minDuration = 5000
    if (elapsedTime < minDuration) {
      setTimeout(() => {
        callback()
      }, minDuration - elapsedTime)
    } else {
      callback()
    }
  }

  const drawLottery = async (rewardId) => {
    if (result[rewardId]?.length === config.value[rewardId].quantity) return

    showDrawLoading()
    let winners = []
    try {
      const result = await getLotteryPool({
        poolType: config.value[rewardId].pool
      })
      console.log('poolType', config.value[rewardId].pool)
      console.log('getLotteryPool result:', result)
      // Gets n random elements at unique keys from collection up to the size of collection.
      // [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
      // https://github.com/lodash/lodash/blob/main/src/sampleSize.ts
      console.log(
        'rewardId:',
        rewardId,
        ', drawQty:',
        config.value[rewardId].drawQty
      )
      winners = sampleSize(result, config.value[rewardId].drawQty).map(
        (el) => ({ ...el, rewardId })
      )
      console.log('winners:', winners)
      await updateLotteryResult({
        poolType: config.value[rewardId].pool,
        winners
      })
    } catch (error) {
      console.log('error:', error)
      $q.notify({
        type: 'negative',
        message: '抽獎失敗，請重新抽獎'
      })
    }

    await getResult(rewardId)
    finishDrawLoading(() => {
      $q.loading.hide()
      dialog.show = true
      dialog.title = config.value[rewardId].name
      dialog.content = winners
    })
  }
</script>

<template>
  <main class="mt-12">
    <!-- <q-inner-loading :showing="isEmpty(config)">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading> -->
    <h1
      class="mx-auto flex w-fit items-end rounded-md bg-white px-5 py-3 text-center text-xl font-bold text-primary"
    >
      <img src="@/assets/logo.ico" alt="" class="mr-4 inline" />
      春酒抽獎名單
    </h1>
    <div class="mx-auto my-12 w-4/5 min-w-80 max-w-7xl">
      <q-list v-if="!isEmpty(config)" bordered class="rounded-borders">
        <q-expansion-item
          expand-separator
          v-for="reward in config"
          :key="reward.id"
          :name="reward.id"
          @before-show="getResult(reward.id)"
        >
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon color="primary" name="stars" />
            </q-item-section>

            <q-item-section>
              <p class="text-lg font-medium text-secondary">
                <!-- {{ reward.name }} -->
              </p>
            </q-item-section>
          </template>
          <q-card>
            <q-card-section>
              <!-- <div class="text-base">{{ reward.name }}</div>
              <p>{{ reward.quantity }}</p> -->
              <p class="text-base">獎金 ${{ reward.amount }}</p>
              <p class="text-base">
                一次抽出 {{ reward.drawQty }} 人，共 {{ reward.quantity }} 人
              </p>
              <q-btn
                v-if="
                  baseStore.isAdmin &&
                  result[reward.id]?.length !== reward.quantity
                "
                label="抽獎"
                color="primary"
                padding="xs md"
                size="md"
                @click="drawLottery(reward.id)"
                class="mt-2"
              />
              <p class="mb-2 mt-10 flex items-center text-base">
                中獎名單
                <q-btn
                  v-if="result[reward.id]?.length !== reward.quantity"
                  outline
                  round
                  color="primary"
                  icon="sync"
                  size="xs"
                  @click="getResult(reward.id)"
                  class="ml-2"
                />
              </p>
              <div>
                <q-chip
                  v-for="person in result[reward.id]"
                  :key="person.empId"
                  outline
                  color="primary"
                  text-color="white"
                  square
                >
                  {{ person.dept }} {{ person.name }}
                </q-chip>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
  </main>
  <q-dialog v-model="dialog.show">
    <q-card class="w-[80vw]">
      <q-card-section class="row q-pb-none items-center">
        <div class="text-h6">{{ dialog.title }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="text-center">
        <q-chip
          v-for="person in dialog.content"
          :key="person.empId"
          outline
          color="primary"
          text-color="white"
          square
        >
          {{ person.dept }} {{ person.name }}
        </q-chip>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="scss">
  body {
    // @apply bg-primary;
  }

  .draw-loading {
    .q-loading__backdrop {
      opacity: 1;
    }
  }

  .q-dialog__backdrop {
    background: rgba(0, 0, 0, 0.85);
  }
</style>
