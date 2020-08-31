<template>
  <div>
    <template>
      <iframe
        :src="viewUrl + pdfUrl"
        style="width:90%;height:auto;min-height:560px"
      ></iframe>
    </template>
  </div>
</template>

<script>
export default {
  name: "Media",
  props: {
    pdfUrl: {
      type: String,
      default: () => ""
    }
  },
  data() {
    return {
      viewUrl: "https://view.officeapps.live.com/op/view.aspx?src="
    };
  },

  methods: {}
};
</script>
