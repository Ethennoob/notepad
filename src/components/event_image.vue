<template>
  <section class="event-all" :class="{'event-all-show':isShow}">
        <div class="table-box">
            <vue-preview :slides="list" @close="handleClose"></vue-preview>  
        </div>
    </section>
</template>
 
<script>
export default {
  data() {
    return {
      list: [
        // {
        //   //src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
        //   //msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
        //   src: 'http://baseshop.oss-cn-shenzhen.aliyuncs.com/images/headpic/admin/63c8de73aeed289506357a1cd2193230.jpeg?x-oss-process=image/resize,m_lfit,h_600',
        //   msrc: 'http://baseshop.oss-cn-shenzhen.aliyuncs.com/images/headpic/admin/63c8de73aeed289506357a1cd2193230.jpeg?x-oss-process=image/resize,w_334/crop,w_334,h_231,g_center',
        //   title: 'Image Caption 1',
        //   w: 321,
        //   h: 570
        // },
        // {
        //   src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
        //   msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
        //   title: 'Image Caption 2',
        //   w: 600,
        //   h: 400
        // }
      ]
    };
  },
  props: ["isShow"],
  methods: {
    handleClose() {
      console.log("close event");
    },
    show(index) {
      console.log(this.$preview);
      this.$preview.open(index, this.list);
    },
    getData() {
      var that = this;
      that.$ajax
        .get("/api/notepads/image")
        .then(function(res) {
          var imglist;
          imglist = JSON.parse(res.data.data);
          for (let i = 0; i < imglist.length; i++) {
            // 获取图片实际大小
            let newImage = {};
            let img = new Image();
            
            img.src = imglist[i].src;
            img.onload = function() {
              newImage.src = imglist[i].src + '?x-oss-process=image/resize,m_lfit,h_600';
              newImage.msrc = imglist[i].src + '?x-oss-process=image/resize,w_334/crop,w_334,h_231,g_center';
              newImage.title = imglist[i].title;
              newImage.w = img.width;
              newImage.h = img.height;
              that.list.push(newImage);
            };
          }

          console.log(666,this.list)
        })
        .catch(function(err) {});
    }
  },
  mounted() {
    console.log(this.list)
    this.getData();
  }
};
</script> 
<style lang="scss" rel="stylesheet/scss">
.event-all {
  position: absolute;
  left: 0px;
  top: 50px;
  right: 0;
  bottom: 0;
  transform: translateX(-100%);
  transition: transform 0.5s;
  overflow-y: scroll;
  background: #fff;
  z-index: 999;
  &.event-all-show {
    transform: translateX(0);
  }
  &::-webkit-scrollbar {
    width: 0;
  }
  .table-box {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
  }
}
</style>