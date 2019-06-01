module.exports = {
  vue: {
    tpl: compoenntName =>
      `<template>
          <div class="${compoenntName}">
              ${compoenntName}组件
          </div>
      </template>
      <script>
          export default {
              name: '${compoenntName}',
              asyncData(app) {
                return {};
              },
              methods:{},
              mounted(){}
          }
      </script>
      <style lang="less">
          .${compoenntName} {
                                  
          }
      </style>`
  }
};
