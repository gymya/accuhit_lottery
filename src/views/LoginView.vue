<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useForm } from 'vee-validate'
  import { string as yupString, object as yupObject } from 'yup'
  import { useQuasar } from 'quasar'
  import { useBaseStore } from '@/stores/base'
  import { login } from '@/apis/base'

  const $q = useQuasar()
  const router = useRouter()
  const baseStore = useBaseStore()

  const { handleSubmit, errors, useFieldModel } = useForm({
    initialValues: {
      account: 'abc123',
      password: 'gjwij2i3jti'
    },
    validationSchema: yupObject({
      account: yupString().required('請填寫帳號'),
      password: yupString().required('請填寫密碼')
    })
  })
  const [account, password] = useFieldModel(['account', 'password'])

  const passwordShow = ref(false)

  const submit = handleSubmit(async () => {
    try {
      const user = await login(
        { account: account.value, password: password.value },
        {}
      )
      console.log('user:', user)
      $q.notify({
        type: 'positive',
        message: '登入成功',
        timeout: 100
      })
      baseStore.setUser(user.email)
      router.replace({ name: 'Home' })
    } catch (error) {
      $q.notify({
        type: 'negative',
        message: '登入失敗，請確認帳號與密碼後重新輸入'
      })
    }
  })
</script>

<template>
  <div class="abs-center w-1/2 min-w-56 max-w-72 text-center">
    <h1 class="mb-12 text-xl font-bold text-primary">登入系統</h1>
    <q-input
      bottom-slots
      v-model="account"
      label="帳號"
      :error="!!errors.account"
      maxlength="50"
    >
      <template v-slot:before>
        <q-icon name="person" color="primary" />
      </template>
      <template v-slot:error>
        {{ errors.account }}
      </template>
    </q-input>
    <q-input
      bottom-slots
      v-model="password"
      label="密碼"
      :type="passwordShow ? 'text' : 'password'"
      :error="!!errors.password"
      maxlength="50"
    >
      <template v-slot:before>
        <q-icon name="key" color="primary" />
      </template>
      <template v-slot:append>
        <q-icon
          :name="passwordShow ? 'visibility' : 'visibility_off'"
          size="xs"
          class="cursor-pointer"
          @click="passwordShow = !passwordShow"
        />
      </template>
      <template v-slot:error>
        {{ errors.password }}
      </template>
    </q-input>
    <q-btn
      label="登入"
      color="primary"
      @click="submit"
      class="mt-8"
      :disable="baseStore.loading"
    />
  </div>
</template>

<style></style>
