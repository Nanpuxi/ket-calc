<template>
  <div class="page">
    <section class="hero">
      <div class="hero-inner">
        <p class="kicker">CAMBRIDGE · MSE SCORE CALCULATOR</p>
        <h1>{{ exam.name }} 成绩计算器<span>{{ exam.full }} · 按剑桥量表估算</span></h1>
        <div class="exam-switch">
          <button
            v-for="e in examList"
            :key="e.key"
            :class="{ on: e.key === examKey }"
            @click="switchExam(e.key)"
          >
            {{ e.name }}
          </button>
        </div>
        <div class="hero-meta">
          <span>量表 {{ exam.scaleMin }}–{{ exam.scaleMax }}</span>
          <span>{{ exam.passLine }} 分通过</span>
          <span>共 {{ exam.skills.length }} 项</span>
        </div>
      </div>
    </section>

    <main class="wrap">
      <div class="card">
        <div class="mode-switch">
          <button :class="{ on: mode === 'quick' }" @click="mode = 'quick'">快速估分</button>
          <button :class="{ on: mode === 'detail' }" @click="mode = 'detail'">口语细分评分</button>
        </div>

        <template v-if="mode === 'quick'">
          <div class="grid">
            <ScoreSlider
              v-for="s in exam.skills"
              :key="s.key"
              :skill="s"
              :presets="presetsOf(s.key)"
              v-model="raws[s.key]"
            />
          </div>
        </template>

        <template v-else>
          <div class="grid speaking-grid">
            <div v-for="c in exam.speakingCriteria" :key="c.key" class="field">
              <div class="field-head">
                <label>{{ c.label }}</label>
                <span>{{ criteria[c.key] }} / 5</span>
              </div>
              <div class="stars">
                <button
                  v-for="n in 11"
                  :key="n"
                  :class="{ on: criteria[c.key] === (n - 1) / 2 }"
                  @click="criteria[c.key] = (n - 1) / 2"
                >
                  {{ (n - 1) / 2 }}
                </button>
              </div>
              <div class="hint">权重 ×{{ c.weight }}</div>
            </div>
          </div>
          <div class="speaking-sum">
            口语合并分 = <strong>{{ speakingTotal }}</strong> / {{ speakingMax }}
          </div>
        </template>

        <div class="actions">
          <button class="btn-primary" @click="calculate">计算成绩</button>
          <button class="btn-ghost" @click="reset">重置</button>
        </div>
      </div>

      <template v-if="result">
        <ScorePanel :result="result" :exam="exam" />

        <SkillBars :result="result" :scaleMin="exam.scaleMin" :scaleMax="exam.scaleMax" />

        <div class="card" v-if="result.warnings.length">
          <div class="card-title warn-title">⚠ 需要注意</div>
          <ul class="warn-list">
            <li v-for="(w, i) in result.warnings" :key="i">{{ w }}</li>
          </ul>
        </div>

        <ReferenceTable :exam="exam" :overall="result.overall" />
      </template>

      <p class="disclaimer">
        本工具依据剑桥官方公布的卷面分—量表分锚点做线性插值估算，用于模考自测参考。
        KET 锚点来自官方明文公布；PET / FCE 部分中间锚点取自通行对照表，彼此存在 1–2 分出入。
        正式成绩由剑桥等值处理后换算，边界分数（如 119/120、139/140、159/160）以官方成绩单为准。
      </p>
    </main>
  </div>
</template>

<script>
import { EXAMS, speakingScore, calculate } from '../utils/calc'
import ScoreSlider from '../components/ScoreSlider.vue'
import ScorePanel from '../components/ScorePanel.vue'
import SkillBars from '../components/SkillBars.vue'
import ReferenceTable from '../components/ReferenceTable.vue'

const DEFAULTS = {
  ket: { raws: { reading: 22, writing: 20, listening: 19, speaking: 33 }, criteria: { grammar: 3, pronunciation: 3, interaction: 3, global: 3 } },
  pet: { raws: { reading: 27, writing: 25, listening: 19, speaking: 21 }, criteria: { grammar: 3, pronunciation: 3, interaction: 3, global: 3 } },
  fce: { raws: { reading: 33, useofenglish: 22, writing: 30, listening: 22, speaking: 44 }, criteria: { grammar: 3, pronunciation: 3, interaction: 3, global: 3 } }
}

const PRESETS = {
  reading: [10, 15, 20, 25, 28],
  writing: [8, 12, 18, 22, 26],
  listening: [8, 12, 17, 21, 23],
  speaking: [18, 27, 33, 36, 41],
  useofenglish: [9, 16, 22, 27]
}

export default {
  name: 'MseCalculator',
  components: { ScoreSlider, ScorePanel, SkillBars, ReferenceTable },
  props: {
    exam: { type: String, default: 'ket' }
  },
  data() {
    const d = DEFAULTS[this.exam] || DEFAULTS.ket
    return {
      mode: 'quick',
      examKey: this.exam,
      raws: { ...d.raws },
      criteria: { ...d.criteria },
      result: null
    }
  },
  computed: {
    examList() {
      return Object.values(EXAMS).map(e => ({ key: e.key, name: e.name }))
    },
    exam() {
      return EXAMS[this.examKey]
    },
    speakingTotal() {
      return speakingScore(this.examKey, this.criteria)
    },
    speakingMax() {
      return this.exam.skills.find(s => s.key === 'speaking').max
    }
  },
  watch: {
    exam(newVal) {
      this.examKey = newVal
      this.reset()
    }
  },
  mounted() {
    this.calculate()
  },
  methods: {
    presetsOf(key) {
      return PRESETS[key] || []
    },
    switchExam(key) {
      this.$router.push({ name: key.toUpperCase() + 'Calc' })
    },
    calculate() {
      const raws = { ...this.raws }
      if (this.mode === 'detail') {
        raws.speaking = this.speakingTotal
      }
      this.result = calculate(this.examKey, raws)
    },
    reset() {
      const d = DEFAULTS[this.examKey]
      this.raws = { ...d.raws }
      this.criteria = { ...d.criteria }
      this.calculate()
    }
  }
}
</script>

<style scoped>
.page { min-height: 100vh; padding-bottom: 60px; }
.hero { background: linear-gradient(135deg, #1e6fff 0%, #0d47a1 55%, #072a63 100%); color: #fff; padding: 56px 0 48px; }
.hero-inner { max-width: 1080px; margin: 0 auto; padding: 0 24px; }
.kicker { font-size: 12px; letter-spacing: 2px; opacity: .8; margin: 0 0 12px; }
.hero h1 { font-size: clamp(28px, 3.6vw, 42px); font-weight: 800; margin: 0 0 16px; line-height: 1.25; }
.hero h1 span { display: block; font-size: clamp(15px, 1.7vw, 20px); font-weight: 500; opacity: .9; margin-top: 6px; }
.exam-switch { display: inline-flex; background: rgba(255,255,255,.16); border-radius: 12px; padding: 4px; margin-bottom: 14px; }
.exam-switch button { border: none; background: transparent; color: #fff; padding: 8px 18px; border-radius: 9px; font-size: 14px; font-weight: 700; cursor: pointer; opacity: .8; }
.exam-switch button.on { background: #fff; color: #0d47a1; opacity: 1; }
.hero-meta { display: flex; gap: 10px; flex-wrap: wrap; }
.hero-meta span { background: rgba(255,255,255,.16); padding: 6px 12px; border-radius: 999px; font-size: 13px; }
.wrap { max-width: 1080px; margin: -28px auto 0; padding: 0 24px; position: relative; z-index: 2; }
.card { background: #fff; border-radius: 18px; padding: 24px; margin-bottom: 18px; box-shadow: 0 8px 28px rgba(20,40,80,.06); }
.card-title { font-size: 16px; font-weight: 800; margin-bottom: 16px; }
.warn-title { color: #e65100; }
.mode-switch { display: inline-flex; background: #f1f3f6; border-radius: 12px; padding: 4px; margin-bottom: 22px; }
.mode-switch button { border: none; background: transparent; padding: 9px 20px; border-radius: 9px; font-size: 14px; font-weight: 700; color: #6b7280; cursor: pointer; }
.mode-switch button.on { background: #fff; color: #1e6fff; box-shadow: 0 2px 10px rgba(30,111,255,.16); }
.grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 22px 28px; }
.field-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; }
.field-head label { font-size: 15px; font-weight: 700; }
.field-head span { font-size: 15px; font-weight: 800; color: #1e6fff; }
.stars { display: flex; gap: 4px; flex-wrap: wrap; }
.stars button { width: 30px; height: 30px; border-radius: 8px; border: 1px solid #e4e8ef; background: #fff; font-size: 12px; color: #8b94a3; cursor: pointer; }
.stars button.on { background: #1e6fff; border-color: #1e6fff; color: #fff; font-weight: 700; }
.hint { font-size: 12px; color: #9aa3b2; margin-top: 8px; }
.speaking-sum { margin-top: 18px; padding: 12px 16px; background: #f5f8ff; border-radius: 12px; font-size: 14px; color: #4b5563; }
.speaking-sum strong { color: #1e6fff; font-size: 17px; }
.actions { display: flex; gap: 10px; margin-top: 24px; }
.btn-primary { flex: 1; border: none; background: linear-gradient(135deg, #1e6fff, #0d47a1); color: #fff; padding: 14px 0; border-radius: 12px; font-size: 16px; font-weight: 800; cursor: pointer; }
.btn-ghost { padding: 14px 22px; border: 1px solid #e0e4ea; background: #fff; border-radius: 12px; color: #6b7280; font-weight: 700; cursor: pointer; }
.warn-list { margin: 0; padding-left: 18px; }
.warn-list li { font-size: 13px; color: #7c3f00; line-height: 1.8; margin-bottom: 6px; }
.disclaimer { font-size: 12px; color: #9aa3b2; line-height: 1.8; margin: 20px 0 0; padding: 0 4px; }
@media (max-width: 720px) { .grid { grid-template-columns: 1fr; } }
</style>
