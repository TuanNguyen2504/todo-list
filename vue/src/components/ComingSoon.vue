<script setup lang="ts">
import { withAssets } from '~/utils/helper'
</script>

<template>
  <div class="mx-auto my-4 max-w-72">
    <img :src="withAssets('coming-soon.svg')" />
    <h1 class="mt-4 text-lg text-center">Coming soon</h1>
  </div>
</template>
