<template>
  <section class="v-video">
    <div
      v-show="room.videoUrl"
      v-video-player:myVideoPlayer="playerOptions"
      :playsinline="playsinline"
      class="video-player-box vjs-big-play-centered"
      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
      @ended="onPlayerEnded($event)"
      @loadeddata="onPlayerLoadeddata($event)"
      @waiting="onPlayerWaiting($event)"
      @playing="onPlayerPlaying($event)"
      @timeupdate="onPlayerTimeupdate($event)"
      @canplay="onPlayerCanplay($event)"
      @canplaythrough="onPlayerCanplaythrough($event)"
      @ready="playerReadied"
      @statechanged="playerStateChanged($event)"
    />
    <div v-show="!room.videoUrl" class="no-video">
      <p>您还没有购买，请购买后观看</p>
    </div>
  </section>
</template>

<script>
import videoSSR from 'vue-video-player/dist/ssr';
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css';
import 'videojs-contrib-hls';

export default {
  name: 'VLogin',
  directives: {
    'video-player': videoSSR.videoPlayer
  },
  props: {
    room: {
      type: Object,
      default: function() {
        return {
          videoUrl: {
            type: String,
            default: ''
          },
          coverUrl: {
            type: String,
            default: ''
          }
        };
      }
    }
  },
  data() {
    return {
      // validator: validateMobile,
      isplay: false,
      playsinline: true,
      curVideoUrl: '',
      playerOptions: {
        autoplay: false,
        loop: false,
        preload: 'auto',
        controls: true,
        muted: false, // 是否静音
        language: 'lang',
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速率
        aspectRatio: '16:9',
        notSupportedMessage: '您还没有购买，请购买后观看', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        sources: [
          {
            // type: 'application/x-mpegURL',
            // src: 'https://player.alicdn.com/video/aliyunmedia.mp4'  //视频流地址
            src: this.room.videoUrl // 视频流地址
            // src: 'http://video.ahaschool.com/b3ec0f46ee7345919a7de8a1b52ef1a9/1e4ce7944fff438ebf8578e2e54cec42-5287d2089db37e62345123a1be272f8b.mp4'  //视频流地址
          }
        ],
        // hls: true,  //启用hls？
        fluid: true, // 设置播放器为流体  宽度为外层盒子大小  ps：想设置width：100%找不到方法？这个就对了
        poster:
          this.room.coverUrl ||
          'http://activity.huijiame.com/5975afb7abcbc3IR79rXbOQ.jpg',
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: true,
          fullscreenToggle: true // 全屏按钮
        }
      }
    };
  },
  watch: {
    room: {
      handler(params) {
        if (params.videoUrl) {
          console.log(params);
          this.curVideoUrl = params.videoUrl;
          this.myVideoPlayer.src(this.curVideoUrl);
          this.myVideoPlayer.play();
        }
        //  else {
        //   this.myVideoPlayer.src('');
        // }
      },
      deep: true
    }
  },
  mounted() {
    let that = this;
    document.onkeydown = function(e) {
      e = e || window.event;
      that.setKeyboard(e);
    };
  },
  methods: {
    setKeyboard(e) {
      let keyNum = window.event ? e.keyCode : e.which;
      // console.log(keyNum);
      if (keyNum === '32') {
        e.preventDefault();
        this.isplay ? this.myVideoPlayer.pause() : this.myVideoPlayer.play();
        this.isplay = !this.isplay;
      }
      // else if (keyNum == '37'){
      //   // 后退
      //   let videotimes = this.myVideoPlayer.duration();
      //   let playnum = this.myVideoPlayer.currentTime();
      //   console.log(videotimes,playnum)
      //   playnum = parseInt(playnum - 15);
      //   if (playnum <= 0) playnum = 0;
      //   console.log(playnum);
      //   this.myVideoPlayer.handleTechSeeked_(playnum);
      // }
      //  else if(keyNum == '39') {
      //   // 快进
      //   let videotimes = this.methods.getDuration();
      //   let playnum = this.methods.getCurrentTime();
      //   playnum = parseInt(playnum + 10);
      //   if(playnum <= (videotimes + 30)){
      //     this.methods.seek(playnum);
      //   }
      // }
      // else if (keyNum == '38') {
      //   // 上调音量
      //   e.preventDefault();
      //   let volume = parseInt(this.myVideoPlayer.volume() * 100);
      //   if (volume < 100) {
      //     volume = (volume + 1) / 100;
      //     this.myVideoPlayer.handleTechVolumechange_(volume);
      //   }
      // } else if (keyNum == '40') {
      //   // 下调音量
      //   e.preventDefault();
      //   let volume = parseInt(this.myVideoPlayer.volume() * 100);
      //   if (volume > 0) {
      //     volume = (volume - 1) / 100;
      //     this.myVideoPlayer.handleTechVolumechange_(volume);
      //   }
      // }
    },
    // fullScreen() {
    //   const player = this.myVideoPlayer;
    //   player.requestFullscreen();//调用全屏api方法
    //   player.isFullscreen(true);
    //   player.play();
    // },
    // 以下为播放器监听事件
    onPlayerPlay(player) {
      // console.log('player play!');
    },
    onPlayerPause(player) {
      // console.log('player pause!', player)
      this.$emit('videoPause');
    },
    onPlayerEnded(player) {
      // console.log('player ended!', player)
    },
    onPlayerLoadeddata(player) {
      // console.log('player Loadeddata!')
    },
    onPlayerWaiting(player) {
      // console.log('player Waiting!', player)
    },
    onPlayerPlaying(player) {
      // console.log('player Playing!', player)
    },
    onPlayerTimeupdate(player) {
      // console.log('player Timeupdate!', player.currentTime())
    },
    onPlayerCanplay(player) {
      // console.log('player Canplay!', player)
    },
    onPlayerCanplaythrough(player) {
      // console.log('player Canplaythrough!', player)
    },
    // or listen state event
    playerStateChanged(playerCurrentState) {
      // console.log(playerCurrentState)
    },
    // player is ready
    playerReadied(player) {
      console.log('video创建完成');
      if (this.curVideoUrl) {
        this.myVideoPlayer.src(this.curVideoUrl);
        this.myVideoPlayer.play();
      }
      this.$emit('createSuccess', player);
    }
  }
};
</script>

<style lang="less">
.v-video {
  height: 100%;
  .video-player-box {
    width: 80%;
    height: 100%;
    .video-js.vjs-fluid {
      height: 100%;
    }
  }
  .no-video {
    height: 100%;
    width: 80%;
    background: #333
      url(http://resource.huijiame.com/59cf57f4ecf24uGUA3K2QFm.png) no-repeat;
    background-size: 404px 168px;
    background-position: center;
    p {
      text-align: center;
      height: 40px;
      font-size: 24px;
      line-height: 40px;
      color: #b1a6a2;
      padding-top: 40px;
      font-weight: 500;
    }
  }
}
</style>
