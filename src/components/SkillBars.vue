<template>
  <div class="card">
    <div class="card-title">各项分项标准分</div>
    <div class="skill-list">
      <div v-for="s in result.skills" :key="s.key" class="skill-row">
        <div class="skill-name">
          {{ s.label }}
          <em :class="{ bad: s.invalid }">{{ s.invalid ? '不计分' : s.rawText }}</em>
        </div>
        <div class="skill-bar">
          <div class="skill-fill" :style="{ width: barWidth(s.score) }"></div>
          <span class="skill-score">{{ s.invalid ? '—' : s.score }}</span>
        </div>
        <div class="skill-grade" :class="`g-${s.gradeKey}`">{{ s.invalid ? '无效' : s.gradeText }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkillBars',
  props: {
    result: { type: Object, required: true },
    scaleMin: { type: Number, default: 100 },
    scaleMax: { type: Number, default: 150 }
  },
  methods: {
    barWidth(score) {
      const pct = ((score - this.scaleMin) / (this.scaleMax - this.scaleMin)) * 100
      return `${Math.max(4, Math.min(100, pct))}%`
    }
  }
}
</script>

<style scoped>
.card { background: #fff; border-radius: 18px; padding: 24px; margin-bottom: 18px; box-shadow: 0 8px 28px rgba(20,40,80,.06); }
.card-title { font-size: 16px; font-weight: 800; margin-bottom: 16px; }
.skill-list { display: grid; gap: 14px; }
.skill-row { display: flex; align-items: center; gap: 14px; }
.skill-name { width: 120px; font-size: 14px; font-weight: 700; }
.skill-name em { display: block; font-style: normal; font-size: 12px; color: #9aa3b2; font-weight: 400; margin-top: 2px; }
.skill-name em.bad { color: #c62828; }
.skill-bar { flex: 1; position: relative; height: 22px; background: #f1f3f6; border-radius: 999px; overflow: hidden; }
.skill-fill { height: 100%; background: linear-gradient(90deg, #60a5fa, #1e6fff); border-radius: 999px; transition: width .5s ease; }
.skill-score { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 12px; font-weight: 800; }
.skill-grade { width: 96px; text-align: right; font-size: 12px; font-weight: 700; color: #6b7280; }
.g-a { color: #059669; } .g-b { color: #1e6fff; } .g-c { color: #3b82f6; }
.g-lower { color: #d97706; } .g-none { color: #6b7280; } .g-max { color: #7c3aed; }
@media (max-width: 720px) { .skill-name { width: 84px; } .skill-grade { width: 72px; } }
</style>
