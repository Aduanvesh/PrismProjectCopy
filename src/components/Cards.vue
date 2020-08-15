<template>

  <q-item
    clickable
    tag="a"
    target="_blank"
    :href="link"
  >
    <q-card dark bordered class="bg-grey-9 my-card">
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
        <div class="text-subtitle2">{{ caption }}</div>
      </q-card-section>
      <q-separator dark inset />
      <q-card-section>
          {{ details }}
      </q-card-section>
    </q-card>
  </q-item>

</template>

<script>
export default {
  name: 'Cards',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      required: true,
      default: ''
    },

    details: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  }
}
</script>
