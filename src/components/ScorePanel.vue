<template>
  <div class="score-card" :class="`grade-${result.gradeKey}`">
    <div class="score-left">
      <div class="score-label">预估总分</div>
      <div class="score-num">{{ result.overall }}<small>/{{ exam.scaleMax }}</small></div>
      <div class="grade-badge">{{ result.gradeText }}</div>
    </div>
    <div class="score-right">
      <div class="gauge">
        <div class="gauge-track">
          <div class="gauge-fill" :style="{ width: width }"></div>
          <div class="mark" :style="{ left: distPos + '%' }"><i></i><em>{{ exam.distMin }}</em></div>
          <div class="mark pass" :style="{ left: passPos + '%' }"><i></i><em>{{ exam.passLine }}</em></div>
          <div class="mark" :style="{ left: '100%' }"><i></i><em>{{ exam.scaleMax }}</em></div>
        </div>
      </div>
      <div class="score-meta">
        <span>CEFR：{{ result.cefr }}</span>
        <span>{{ result.cert }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScorePanel',
  props: {
    result: { type: Object, required: true },
    exam: { type: Object, required: true }
  },
  computed: {
    width() {
      const span = this.exam.scaleMax - this.exam.distMin
      const pct = ((this.result.overall - this.exam.distMin) / span) * 100
      return `${Math.max(2, Math.min(100, pct))}%`
    },
    passPos() {
      return ((this.exam.passLine - this.exam.distMin) / (this.exam.scaleMax - this.exam.distMin)) * 100
    },
    distPos() { return 0 }
  }
}
</script>

<style scoped>
.score-card {
  border-radius: 20px; padding: 26px; color: #fff;
  display: flex; justify-content: space-between; align-items: center;
  gap: 28px; margin-bottom: 18px;
  background: linear-gradient(135deg, #4b5563, #374151);
}
.score-card.grade-a { background: linear-gradient(135deg, #10b981, #047857); }
.score-card.grade-b { background: linear-gradient(135deg, #1e6fff, #0d47a1); }
.score-card.grade-c { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
.score-card.grade-lower { background: linear-gradient(135deg, #f59e0b, #b45309); }
.score-card.grade-none { background: linear-gradient(135deg, #6b7280, #4b5563); }
.score-card.grade-max { background: linear-gradient(135deg, #8b5cf6, #5b21b6); }
.score-label { font-size: 13px; opacity: .85; }
.score-num { font-size: 56px; font-weight: 900; line-height: 1.1; margin: 4px 0 8px; }
.score-num small { font-size: 18px; font-weight: 600; opacity: .7; }
.grade-badge {
  display: inline-block; background: rgba(255,255,255,.2);
  padding: 6px 14px; border-radius: 999px; font-size: 14px; font-weight: 700;
}
.score-right { flex: 1; min-width: 240px; }
.gauge-track {
  position: relative; height: 10px;
  background: rgba(255,255,255,.22); border-radius: 999px;
}
.gauge-fill { height: 100%; background: #fff; border-radius: 999px; transition: width .5s ease; }
.mark { position: absolute; top: -3px; transform: translateX(-50%); }
.mark i { display: block; width: 2px; height: 16px; background: rgba(255,255,255,.6); margin: 0 auto; }
.mark em {
  position: absolute; top: 18px; left: 50%; transform: translateX(-50%);
  font-size: 11px; font-style: normal; opacity: .8;
}
.score-meta { display: flex; gap: 14px; margin-top: 26px; font-size: 13px; flex-wrap: wrap; }
@media (max-width: 720px) {
  .score-card { flex-direction: column; align-items: flex-start; }
  .score-num { font-size: 46px; }
}
</style>
