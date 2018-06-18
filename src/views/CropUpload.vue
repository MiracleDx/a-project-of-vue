<template>
    <div>
      <vue-crop @crop-upload-success="uploadSuccess"
                v-model="show"
                :width="width"
                :height="height"
                :url="uploadUrl"
                :field="fileName"
                img-format="png"></vue-crop>
  </div>
</template>

<script>
  import VueCrop from 'vue-image-crop-upload'

  export default {
    props: {
      value: {
        type: Boolean
      },
      width: {
        type: Number,
        default: 200
      },
      height: {
        type: Number,
        default: 200
      },
      uploadUrl: {
        type: String
      },
      fileName: {
        type: String
      },
    },
    data () {
      return {
        show: false,
      }
    },
    mounted () {
      this.show = this.value
    },
    components: {
      VueCrop
    },
    methods: {
      uploadSuccess (res, field) {
        this.$emit('uploadSuccess', res)
      },
    },
    watch: {
      value (newv) {
        this.show = newv
      },
      show (newv) {
        if (!this.show){
          this.$emit('input', false)
        }
      }
    }
  }
</script>

<style scoped>

</style>
