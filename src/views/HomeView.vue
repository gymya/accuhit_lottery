<script setup>
  import { reactive, ref } from 'vue'
  import { sampleSize, isEmpty, forEach, filter, find } from 'lodash'
  import { useQuasar } from 'quasar'
  import confetti from 'canvas-confetti'
  import html2canvas from 'html2canvas'
  import ExcelJs from 'exceljs'
  import {
    getLotteryPool,
    getLotteryResult,
    updateLotteryResult
  } from '@/apis/base'
  import { lotteryConfig, pool, dayOffResult } from '@/data'
  import Drum from '@/assets/drum.mp4'
  import Award from '@/assets/award.mp4'

  if (!localStorage.getItem('lotteryStart')) {
    localStorage.setItem('lotteryPool', JSON.stringify(pool))
  }

  const $q = useQuasar()

  const config = ref(filter(lotteryConfig, ['surprise', false]))

  const clickCount = ref(0)
  const clickHandler = () => {
    clickCount.value++
    if (clickCount.value === 3) {
      config.value = lotteryConfig
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      })
    }
  }

  const result = reactive({})
  const getResult = (rewardId) => {
    const match = find(config.value, ['id', rewardId])
    if (result[rewardId]?.length === match.quantity) return
    const res = getLotteryResult({
      rewardId,
      poolType: match.pool
    })
    result[rewardId] = res
  }

  const drumAudio = new Audio(Drum)
  const AwardAudio = new Audio(Award)

  const dialog = reactive({
    show: false,
    title: null,
    content: []
  })
  const drawLottery = (rewardId) => {
    const match = find(config.value, ['id', rewardId])
    if (result[rewardId]?.length === match.quantity) return
    localStorage.setItem('lotteryStart', true)

    drumAudio.play()
    $q.loading.show({
      spinnerSize: 0,
      customClass: 'draw-loading',
      message: `<img src="https://media1.tenor.com/m/2OA-uQTBCBQAAAAd/detective-conan-case-closed.gif"  class="mx-auto w-[450px]" /><p class="animate-bounce mt-12 text-6xl font-semibold text-white">${match.name} 抽獎中...</p>`,
      html: true
    })

    // drawQty 無法被 quantity 整除的獎項，最後一次抽獎的數量只抽剩餘數量
    const drawQty = Math.min(
      match.drawQty,
      match.quantity - result[rewardId].length
    )

    let winners = []
    try {
      const pool = getLotteryPool({
        poolType: match.pool
      })

      // Gets n random elements at unique keys from collection up to the size of collection.
      // [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
      // https://github.com/lodash/lodash/blob/main/src/sampleSize.ts
      winners = sampleSize(pool, drawQty).map((el) => ({
        ...el,
        rewardId
      }))
    } catch (error) {
      console.log('drawLottery error:', error)
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
        zIndex: 6001 // 蓋過 q-dialog (6000)
      })

      $q.loading.hide()
      dialog.show = true
      dialog.title = match.name
      dialog.content = winners

      updateLotteryResult({
        poolType: match.pool,
        winners
      })
      getResult(rewardId)
    }, 3500)
    // }, 100)
  }

  const downloadRewardImage = async (rewardId) => {
    const match = find(config.value, ['id', rewardId])
    const canvas = await html2canvas(
      document.querySelector(`#result-${rewardId}`)
    )
    const link = document.createElement('a')
    link.download = `2024_愛酷春酒_${match.name}_中獎名單.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const downloadResult = async () => {
    // 因 result[rewardId] 只在展開列表時才取值，避免未展開時還沒有資料，再次取得所有獎項的中獎名單
    forEach(config.value, (reward) => {
      getResult(reward.id)
    })

    const workbook = new ExcelJs.Workbook()
    const sheet = workbook.addWorksheet('中獎名單')
    sheet.columns = [
      { header: '獎項名稱', key: 'rewardName' },
      { header: '獎項金額', key: 'rewardAmount' },
      { header: '員工編號', key: 'empId' },
      { header: '部門', key: 'dept' },
      { header: '姓名', key: 'name' }
    ]
    const rows = []
    forEach(config.value, (reward) => {
      forEach(result[reward.id], (person) => {
        rows.push({
          rewardName: reward.name,
          rewardAmount: reward.amount,
          empId: person.empId,
          dept: person.dept,
          name: person.name
        })
      })
    })

    forEach(dayOffResult, (item) => {
      rows.push({ ...item })
    })

    sheet.addRows(rows)

    const content = await workbook.xlsx.writeBuffer()
    const link = document.createElement('a')
    const blobData = new Blob([content], {
      type: 'application/vnd.ms-excel;charset=utf-8;'
    })
    link.download = '2025_愛酷春酒_中獎名單.xlsx'
    link.href = URL.createObjectURL(blobData)
    link.click()
  }
</script>

<template>
  <main class="bg-primary">
    <div
      class="relative h-full min-h-screen bg-[url(@/assets/bg.png)] bg-[length:120px_120px] bg-repeat py-12"
    >
      <img
        src="@/assets/finger.png"
        alt=""
        class="absolute -left-12 top-24 w-[10%] rotate-45"
      />
      <img
        src="@/assets/finger.png"
        alt=""
        class="absolute -right-2 bottom-24 w-[10%] -rotate-45"
      />
      <h1
        @click="clickHandler"
        class="mx-auto flex w-fit items-end rounded-md px-5 py-3 text-center text-3xl font-bold text-secondary"
      >
        <img src="@/assets/logo.ico" alt="" class="mr-4 inline" />
        2025 愛酷春酒 酷偵探的神秘午宴
      </h1>
      <div class="mx-auto w-4/5 min-w-80 max-w-7xl">
        <div class="mb-4 text-right">
          <q-btn
            label="匯出總中獎名單"
            color="secondary"
            text-color="dark"
            @click="downloadResult"
          />
        </div>
        <q-list v-if="!isEmpty(config)" bordered class="rounded-borders">
          <q-expansion-item
            expand-separator
            v-for="reward in config"
            :key="reward.id"
            :name="reward.id"
            :id="`result-${reward.id}`"
            header-class="bg-secondary"
            @before-show="getResult(reward.id)"
          >
            <template v-slot:header>
              <q-item-section avatar>
                <q-icon color="primary" name="stars" />
              </q-item-section>

              <q-item-section>
                <p class="text-dark text-lg font-medium">
                  {{ reward.name }}
                </p>
              </q-item-section>
            </template>
            <q-card>
              <q-card-section>
                <p class="text-dark text-xl">
                  獎金<span class="text-accent"> ${{ reward.amount }} </span>
                </p>
                <p class="text-dark">
                  一次抽出 {{ reward.drawQty }} 人，共 {{ reward.quantity }} 人
                </p>
                <q-btn
                  v-if="result[reward.id]?.length !== reward.quantity"
                  label="🎉抽獎🎉"
                  color="primary"
                  padding="md"
                  size="lg"
                  @click="drawLottery(reward.id)"
                  class="mt-2 w-full"
                />
                <p class="text-dark mb-2 mt-10 flex items-center">
                  中獎名單 已抽出 {{ result[reward.id]?.length || 0 }} 人
                  <q-btn
                    v-if="result[reward.id]?.length === reward.quantity"
                    outline
                    round
                    color="primary"
                    icon="download"
                    size="sm"
                    @click="downloadRewardImage(reward.id)"
                    class="ml-2"
                    data-html2canvas-ignore
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
    </div>
  </main>
  <q-dialog v-model="dialog.show">
    <q-card class="w-[80vw]">
      <q-card-section class="row q-pb-none items-center">
        <div class="text-h6 text-accent">
          {{ dialog.title }} <span class="text-primary">恭喜中獎！</span>
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
          class="font-medium"
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

  .q-dialog__inner--minimized > div {
    max-width: 80%;
  }
</style>
