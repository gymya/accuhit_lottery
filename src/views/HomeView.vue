<script setup>
  import { ref, onBeforeMount } from 'vue'
  import { getLotteryConfig, getLotteryPool } from '@/apis/base'

  const config = ref([])
  const getConfig = async () => {
    try {
      const result = await getLotteryConfig()
      config.value = result
    } catch (error) {}
  }

  const pool = ref([])
  const getPool = async () => {
    try {
      const result = await getLotteryPool()
      pool.value = result
    } catch (error) {}
  }

  onBeforeMount(async () => {
    await getConfig()
    await getPool()
  })

  const showLottery = (rewardId) => {
    console.log('showLottery', rewardId)
  }

  const drawLottery = (rewardId) => {}
</script>

<template>
  <main class="mt-12">
    <!-- <q-inner-loading :showing="visible">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading> -->
    <!-- <img src="" alt=""> -->
    <h1 class="text-xl text-primary font-bold text-center">春酒抽獎名單</h1>
    <div class="min-w-80 max-w-7xl w-4/5 mt-12 mx-auto">
      <q-list bordered class="rounded-borders">
        <q-expansion-item
          expand-separator
          v-for="reward in lotteryConfig"
          :key="reward.id"
          :name="reward.id"
          @before-show="showLottery(reward.id)"
        >
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon color="primary" name="stars" />
            </q-item-section>

            <q-item-section>
              <p class="text-lg font-medium">
                {{ reward.name }}
              </p>
            </q-item-section>
          </template>
          <q-card>
            <q-card-section>
              <!-- <div class="text-base">{{ reward.name }}</div>
              <p>{{ reward.quantity }}</p> -->
              <p class="text-base">獎金 ${{ reward.amount }}</p>
              <p class="text-base mt-4 mb-2 flex items-center">
                中獎名單
                <q-btn
                  label="抽獎"
                  color="primary"
                  padding="xs md"
                  size="md"
                  @click="drawLottery(reward.id)"
                  class="ml-4"
                />
              </p>
              <div>
                <q-chip outline color="primary" text-color="white" square>
                  財務部 鄭淑芳 Lily
                </q-chip>
                <q-chip outline color="primary" text-color="white" square>
                  AccuCDP營運部 張皓博 Jeff
                </q-chip>
                <q-chip outline color="primary" text-color="white" square>
                  專案研發科技部 曾詩婷 Jean Tseng
                </q-chip>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
  </main>
</template>
