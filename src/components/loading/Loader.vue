<template>
    <v-overlay v-if="loading" opacity="1" color="white">
        <v-progress-circular indeterminate color="cyan darken-3" size="100"><b>AMS</b> </v-progress-circular>
    </v-overlay>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  }
}
</script>
