<template>
  <div class="score-card" :class="`grade-${result.gradeKey}`">
    <div class="score-left">
      <div class="score-label">预估总分</div>
      <div class="score-num">{{ result.overall }}<small>/{{ scaleMax }}</small></div>
      <div class="grade-badge">{{ result.gradeText }}</div>
    </div>

    <div class="score-right">
      <div class="gauge">
        <div class="gauge-track">
          <div class="gauge-fill" :style="{ width: gaugeWidth }"></div>
          <div
            v-for="m in marks"
            :key="m.value"
            class="mark"
            :style="{ left: `${m.percent}%` }"
          >
            <i></i><em>{{ m.value }}</em>
          </div>
          <div class="mark pass" :style="{ left: passPercent }"></div>
        </div>
      </div>
      <div class="score-meta">
        <span>CEFR：{{ result.cefr }}</span>
        <span>证书：{{ result.cert }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { scalePercent, EXAMS } from '../utils/calc'

export default {
  name: 'ScorePanel',
  props: {
    result: { type: Object, required: true },
    examKey: { type: String, default: 'ket' }
  },
  computed: {
    exam() {
      return EXAMS[this.examKey]
    },
    scaleMax() {
      return { ket: 150, pet: 170, fce: 190 }[this.examKey]
    },
    gaugeWidth() {
      return `${scalePercent(this.examKey, this.result.overall)}%`
    },
    passPercent() {
      return `${scalePercent(this.examKey, this.exam.passLine)}%`
    },
    marks() {
      const step = 10
      const min = { ket: 100, pet: 120, fce: 140 }[this.examKey]
      const max = this.scaleMax
      const out = []
      for (let v = min; v <= max; v += step) {
        out.push({ value: v, percent: scalePercent(this.examKey, v) })
      }
      return out
    }
  }
}
</script>

<style scoped>
.score-card {
  border-radius: 20px;
  padding: 26px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 28px;
  margin-bottom: 18px;
  background: linear-gradient(135deg, #4b5563, #374151);
}
.score-card.grade-a { background: linear-gradient(135deg, #10b981, #047857); }
.score-card.grade-b { background: linear-gradient(135deg, #1e6fff, #0d47a1); }
.score-card.grade-c { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
.score-card.grade-a2 { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
.score-card.grade-b2 { background: linear-gradient(135deg, #f59e0b, #b45309); }
.score-card.grade-a1 { background: linear-gradient(135deg, #f59e0b, #b45309); }
.score-card.grade-none { background: linear-gradient(135deg, #6b7280, #4b5563); }

.score-label { font-size: 13px; opacity: .85; }
.score-num { font-size: 56px; font-weight: 900; line-height: 1.1; margin: 4px 0 8px; }
.score-num small { font-size: 18px; font-weight: 600; opacity: .7; }
.grade-badge {
  display: inline-block;
  background: rgba(255, 255, 255, .2);
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
}

.score-right { flex: 1; min-width: 240px; }
.gauge-track {
  position: relative;
  height: 10px;
  background: rgba(255, 255, 255, .22);
  border-radius: 999px;
}
.gauge-fill {
  height: 100%;
  background: #fff;
  border-radius: 999px;
  transition: width .5s ease;
}
.mark { position: absolute; top: -3px; transform: translateX(-50%); }
.mark i { display: block; width: 2px; height: 16px; background: rgba(255,255,255,.55); margin: 0 auto; }
.mark em {
  position: absolute;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  font-style: normal;
  opacity: .75;
}
.mark.pass i { background: #ffd54f; height: 22px; top: -6px; position: relative; }

.score-meta { display: flex; gap: 14px; margin-top: 28px; font-size: 13px; flex-wrap: wrap; }

@media (max-width: 720px) {
  .score-card { flex-direction: column; align-items: flex-start; }
  .score-num { font-size: 46px; }
  .score-right { width: 100%; }
}
</style>
