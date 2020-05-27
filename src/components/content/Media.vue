<template>
  <div>
    <template v-if="type == 'ppt'">
      <iframe :src='source' width='1150px' height='600px' frameborder='1' marginwidth="10px">
      </iframe>
    </template>
    <template v-else-if="type == 'pdf'">
      <embed :src="source" type="application/pdf" style="overflow: auto; top: 0; right: 0; bottom: 0; left: 0; width: 1150px; height: 560px;">
    </template>
    <template v-else-if="type == 'video'">
      <video width="1050" height="560" controls>
        <source :src="source"  type="video/mp4">
        您的浏览器不支持 HTML5 video 标签。
      </video>
    </template>
    <br />
<!--    <el-link :href="sourceLink" type="success" target="_blank" style="right: 0;">点击下载</el-link>-->
  </div>
</template>

<script>
  export default {
    name: 'Media',
    prop: {
      id: {
        type: Number,
        default: () => 1
      }
    },
    data() {
      return {
        type: 'ppt',
        link: '',
        pdfData: '', // PDF的base64
        mediaList: [
        'https://onedrive.live.com/embed?cid=E45DA2765E9E813B&resid=E45DA2765E9E813B%21329&authkey=AGa9PDxDd8QviIY&em=2',
        'https://onedrive.live.com/embed?cid=E45DA2765E9E813B&resid=E45DA2765E9E813B%21337&authkey=AG9OvGwf6Zu4SPI&em=2',
        'https://onedrive.live.com/embed?cid=E45DA2765E9E813B&resid=E45DA2765E9E813B%21336&authkey=ANUvSS-Q7hgeNMY&em=2',
        'https://onedrive.live.com/embed?cid=E45DA2765E9E813B&resid=E45DA2765E9E813B%21352&authkey=AGf7vDUxQJYs1xs&em=2',

        'https://onedrive.live.com/embed?cid=E45DA2765E9E813B&resid=E45DA2765E9E813B%21342&authkey=AA3W_5udZpD82Oo&em=2',
        'https://onedrive.live.com/embed?cid=E45DA2765E9E813B&resid=E45DA2765E9E813B%21344&authkey=AL5ZS8F-cldwZ9E&em=2',
        'https://onedrive.live.com/embed?cid=E45DA2765E9E813B&resid=E45DA2765E9E813B%21340&authkey=ACbAU5I4B4I7nmg&em=2',
        'https://onedrive.live.com/embed?cid=E45DA2765E9E813B&resid=E45DA2765E9E813B%21341&authkey=AGUUJTnJyOduneA&em=2',

        'https://onedrive.live.com/embed?cid=E45DA2765E9E813B&resid=E45DA2765E9E813B%21346&authkey=AP9UbbKKTbuK5Fk&em=2',
        'https://onedrive.live.com/embed?cid=E45DA2765E9E813B&resid=E45DA2765E9E813B%21345&authkey=ALhF3MH5VOBbi4Y&em=2',
        'https://onedrive.live.com/embed?cid=E45DA2765E9E813B&resid=E45DA2765E9E813B%21339&authkey=AGEaBEP2gSi1bdw&em=2',

        'https://onedrive.live.com/embed?cid=E45DA2765E9E813B&resid=E45DA2765E9E813B%21347&authkey=AMz4rhV_g-d5Fvw&em=2',
        'https://onedrive.live.com/embed?cid=E45DA2765E9E813B&resid=E45DA2765E9E813B%21348&authkey=AC1UVpMjz37w9mk&em=2',
        'https://onedrive.live.com/embed?cid=E45DA2765E9E813B&resid=E45DA2765E9E813B%21349&authkey=AHLmwpK2CpNgaHc&em=2',
        'https://onedrive.live.com/embed?cid=E45DA2765E9E813B&resid=E45DA2765E9E813B%21350&authkey=AG3ranbQpICRLko&em=2',

        ],
      }
    },
    computed: {
      source() {
        if (this.$route.params.id  == 2) {
          // 第二章ppt
          this.type = 'ppt'
          this.link = 0
          return this.mediaList[0]
        } else if (this.$route.params.id  == 3) {
          // 第三章ppt
          this.type = 'ppt'
          this.link = 1
          return this.mediaList[1]
        }else if (this.$route.params.id  == 41) {
          // 第四章ppt1
          this.type = 'ppt'
          this.link = 2
          return this.mediaList[2]
        } else if (this.$route.params.id  == 42) {
          // 第四章ppt2
          this.type = 'ppt'
          this.link = 3
          return this.mediaList[3]
        }else if (this.$route.params.id  == 51) {
          // 第五章ppt1
          this.type = 'ppt'
          this.link = 4
          return this.mediaList[4]
        }else if (this.$route.params.id  == 52) {
          // 第五章ppt2
          this.type = 'ppt'
          this.link = 5
          return this.mediaList[5]
        }else if (this.$route.params.id  == 53) {
          // 第五章ppt3
          this.type = 'ppt'
          this.link = 6
          return this.mediaList[6]
        }else if (this.$route.params.id  == 54) {
          // 第五章ppt4
          this.type = 'ppt'
          this.link = 7
          return this.mediaList[7]
        }else if (this.$route.params.id  == 6) {
          // 第六章ppt
          this.type = 'ppt'
          this.link = 8
          return this.mediaList[8]
        }else if (this.$route.params.id  == 7) {
          // 第七章ppt
          this.type = 'ppt'
          this.link = 9
          return this.mediaList[9]
        }else if (this.$route.params.id  == 10) {
          // 第十章ppt
          this.type = 'ppt'
          this.link = 10
          return this.mediaList[10]
        }else if (this.$route.params.id  == 111) {
          // 实验一ppt
          this.type = 'ppt'
          this.link = 11
          return this.mediaList[11]
        }else if (this.$route.params.id  == 222) {
          // 实验二ppt
          this.type = 'ppt'
          this.link = 12
          return this.mediaList[12]
        }else if (this.$route.params.id  == 333) {
          // 实验三ppt
          this.type = 'ppt'
          this.link = 13
          return this.mediaList[13]
        }else if (this.$route.params.id  == 444) {
          // 实验四ppt
          this.type = 'ppt'
          this.link = 14
          return this.mediaList[14]
        } else {
          this.type = 'video'
          this.link = 2
          return this.mediaList[2]
        }
      },
      sourceLink() {
        return this.mediaList[this.link]
      }
    },
    methods: {
    }
  }
</script>
