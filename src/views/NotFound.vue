<template>
  <div class="nf">
    <h1>404</h1>
    <p>页面不存在</p>
    <router-link to="/ket">前往 KET 成绩计算器</router-link>
  </div>
</template>
<style scoped>
.nf { min-height: 70vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; font-family: sans-serif; }
h1 { font-size: 64px; margin: 0; color: #1e6fff; }
a { color: #1e6fff; text-decoration: none; font-weight: 700; }
</style>
