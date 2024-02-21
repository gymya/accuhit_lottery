<script setup>
  import { reactive } from 'vue'
  import { sampleSize, isEmpty } from 'lodash'
  import { useQuasar } from 'quasar'
  import confetti from 'canvas-confetti'
  import {
    getLotteryPool,
    getLotteryResult,
    updateLotteryResult
  } from '@/apis/base'
  import { config, pool } from '@/data'
  import Drum from '@/assets/drum.mp4'
  import Award from '@/assets/award.mp4'

  if (!localStorage.getItem('lotteryStart')) {
    localStorage.setItem('lotteryPool', JSON.stringify(pool))
  }

  const $q = useQuasar()

  const result = reactive({})
  const getResult = (rewardId) => {
    if (result[rewardId]?.length === config[rewardId].quantity) return
    try {
      const res = getLotteryResult({
        rewardId,
        poolType: config[rewardId].pool
      })
      result[rewardId] = res
    } catch (error) {}
  }

  const drumAudio = new Audio(Drum)
  const AwardAudio = new Audio(Award)

  const dialog = reactive({
    show: false,
    title: null,
    content: []
  })
  const drawLottery = (rewardId) => {
    localStorage.setItem('lotteryStart', true)
    if (result[rewardId]?.length === config[rewardId].quantity) return

    drumAudio.play()
    $q.loading.show({
      spinnerSize: 0,
      customClass: 'draw-loading',
      message: `<img src="https://media.tenor.com/kmHEH_VM-y4AAAAM/spy-x-family-spy-family.gif" alt="" style="margin: auto; width: 450px" /><p style="font-size: 3.75rem; font-weight: 600; color: #fff; margin-top: 20px;">${config[rewardId].name} 抽獎中...</p>`,
      html: true
    })

    let winners = []
    try {
      const result = getLotteryPool({
        poolType: config[rewardId].pool
      })
      // Gets n random elements at unique keys from collection up to the size of collection.
      // [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
      // https://github.com/lodash/lodash/blob/main/src/sampleSize.ts
      winners = sampleSize(result, config[rewardId].drawQty).map((el) => ({
        ...el,
        rewardId
      }))
    } catch (error) {
      $q.notify({
        type: 'negative',
        message: '抽獎失敗，請重新抽獎'
      })
    }

    setTimeout(() => {
      AwardAudio.play()

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        zIndex: 6001
      })

      $q.loading.hide()
      dialog.show = true
      dialog.title = config[rewardId].name
      dialog.content = winners

      updateLotteryResult({
        poolType: config[rewardId].pool,
        winners
      })
      getResult(rewardId)
    }, 3500)
  }
</script>

<template>
  <main class="mt-12">
    <h1
      class="mx-auto flex w-fit items-end rounded-md bg-white px-5 py-3 text-center text-xl font-bold text-primary"
    >
      <img src="@/assets/logo.ico" alt="" class="mr-4 inline" />
      春酒抽獎名單
      <!-- <q-btn
        label="匯出"
        color="secondary"
        @click="logoutHandler"
        class="fixed bottom-1 left-1"
      /> -->
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
                {{ reward.name }}
              </p>
            </q-item-section>
          </template>
          <q-card>
            <q-card-section>
              <!-- <div class="text-base">{{ reward.name }}</div> -->
              <p class="text-base">獎金 ${{ reward.amount }}</p>
              <p class="text-base">
                一次抽出 {{ reward.drawQty }} 人，共 {{ reward.quantity }} 人
              </p>
              <q-btn
                v-if="result[reward.id]?.length !== reward.quantity"
                label="抽獎"
                color="primary"
                padding="xs md"
                size="md"
                @click="drawLottery(reward.id)"
                class="mt-2"
              />
              <p class="mb-2 mt-10 flex items-center text-base">
                中獎名單 已抽出 {{ result[reward.id]?.length || 0 }} 人
              </p>
              <div>
                <q-chip
                  v-for="person in result[reward.id]"
                  :key="person.empId"
                  outline
                  color="primary"
                  text-color="white"
                  square
                  size="lg"
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
        <div class="text-h6">
          {{ dialog.title }} <span class="text-secondary">恭喜中獎！</span>
        </div>
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
          size="xl"
        >
          {{ person.dept }} {{ person.name }}
        </q-chip>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="scss">
  .draw-loading {
    .q-loading__backdrop {
      @apply bg-[#07285d] opacity-100;
    }

    .q-loading__box {
      @apply max-w-none;
    }
  }
</style>
