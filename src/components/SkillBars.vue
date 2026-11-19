<template>
  <div class="card">
    <div class="card-title">{{ title }}</div>
    <div class="skill-list">
      <div v-for="s in skills" :key="s.key" class="skill-row" :class="{ dead: s.invalid }">
        <div class="skill-name">
          {{ s.label }}
          <em>{{ s.rawText }}</em>
        </div>

        <div class="skill-bar">
          <div class="skill-fill" :style="{ width: widthOf(s.score) }"></div>
          <span class="skill-score">{{ s.invalid ? '—' : s.score }}</span>
        </div>

        <div class="skill-grade" :class="`g-${s.gradeKey}`">{{ s.gradeText }}</div>
      </div>
    </div>

    <p v-if="note" class="note">{{ note }}</p>
  </div>
</template>

<script>
import { scalePercent } from '../utils/calc'

export default {
  name: 'SkillBars',
  props: {
    skills: { type: Array, required: true },
    examKey: { type: String, default: 'ket' },
    title: { type: String, default: '各项分项标准分' },
    note: { type: String, default: '' }
  },
  methods: {
    widthOf(score) {
      return `${scalePercent(this.examKey, score)}%`
    }
  }
}
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 18px;
  padding: 24px;
  margin-bottom: 18px;
  box-shadow: 0 8px 28px rgba(20, 40, 80, .06);
}
.card-title { font-size: 16px; font-weight: 800; margin-bottom: 16px; }

.skill-list { display: grid; gap: 14px; }
.skill-row { display: flex; align-items: center; gap: 14px; }
.skill-row.dead { opacity: .55; }

.skill-name { width: 130px; font-size: 14px; font-weight: 700; }
.skill-name em {
  display: block;
  font-style: normal;
  font-size: 12px;
  color: #9aa3b2;
  font-weight: 400;
  margin-top: 2px;
}

.skill-bar {
  flex: 1;
  position: relative;
  height: 22px;
  background: #f1f3f6;
  border-radius: 999px;
  overflow: hidden;
}
.skill-fill {
  height: 100%;
  background: linear-gradient(90deg, #60a5fa, #1e6fff);
  border-radius: 999px;
  transition: width .5s ease;
}
.skill-score {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  font-weight: 800;
  color: #1f2430;
}

.skill-grade { width: 96px; text-align: right; font-size: 12px; font-weight: 700; color: #6b7280; }
.g-a { color: #059669; }
.g-b { color: #1e6fff; }
.g-c { color: #3b82f6; }
.g-a2 { color: #3b82f6; }
.g-b2 { color: #d97706; }
.g-a1 { color: #d97706; }
.g-none { color: #6b7280; }

.note { font-size: 12px; color: #9aa3b2; margin: 14px 0 0; line-height: 1.7; }

@media (max-width: 720px) {
  .skill-name { width: 88px; }
  .skill-grade { width: 74px; }
}
</style>
