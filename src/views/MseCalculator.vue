<template>
  <div class="mse">
    <section class="hero">
      <div class="hero-inner">
        <p class="kicker">CAMBRIDGE ENGLISH SCALE</p>
        <h1>
          {{ exam.fullName }} 成绩计算器
          <span>按剑桥官方分数量表 {{ exam.scale }} 估算</span>
        </h1>
        <div class="hero-meta">
          <span>2020 改革后题型</span>
          <span>{{ skillSummary }}</span>
          <span>{{ exam.passLine }} 分通过</span>
        </div>
      </div>
    </section>

    <main class="wrap">
      <div class="card">
        <div class="exam-switch">
          <button
            v-for="e in examList"
            :key="e.key"
            :class="{ on: examKey === e.key }"
            @click="switchExam(e.key)"
          >
            {{ e.name }}
          </button>
        </div>

        <div class="mode-switch">
          <button :class="{ on: mode === 'quick' }" @click="mode = 'quick'">快速估分</button>
          <button :class="{ on: mode === 'detail' }" @click="mode = 'detail'">口语细分评分</button>
        </div>

        <div class="grid">
          <template v-for="s in exam.skills" :key="s.key">
            <!-- 口语：细分模式下换成打分区 -->
            <div v-if="s.key === 'speaking' && mode === 'detail'" class="criteria-box">
              <div class="criteria-title">
                口语 Speaking <span>{{ speakingTotal }} / {{ s.max }}</span>
              </div>
              <div class="criteria-grid">
                <div v-for="c in exam.speakingCriteria" :key="c.key" class="criteria-item">
                  <div class="criteria-label">
                    {{ c.label }}
                    <em>×{{ exam.speakingWeight[c.key] }}</em>
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
                  <div class="hint">{{ c.desc }}</div>
                </div>
              </div>
            </div>

            <ScoreSlider
              v-else
              :label="`${s.label} ${s.key === 'reading' ? 'Reading' : s.key === 'writing' ? 'Writing' : s.key === 'listening' ? 'Listening' : 'Speaking'}`"
              :value="raw[s.key]"
              :max="s.max"
              :unit="s.unit"
              :quick-picks="mode === 'quick' ? quickPicks(s.key) : null"
              :invalid="isInvalid(s.key)"
              :hint="sliderHint(s)"
              @update:value="raw[s.key] = $event"
            />
          </template>
        </div>

        <div class="speaking-sum" v-if="mode === 'detail'">
          加权合计 = {{ formulaText }} = <strong>{{ speakingTotal }}</strong> / {{ speakingMax }}
        </div>

        <div class="actions">
          <button class="btn-primary" @click="calculate">计算成绩</button>
          <button class="btn-ghost" @click="reset">重置</button>
        </div>
      </div>

      <template v-if="result">
        <ScorePanel :result="result" :exam-key="examKey" />
        <SkillBars
          :skills="result.skills"
          :exam-key="examKey"
          :note="exam.key === 'fce' ? 'FCE 为阅读 / 写作 / 语用 / 听力 / 口语五项等权（各 20%）合成。' : ''"
        />

        <div class="card" v-if="result.warnings.length">
          <div class="card-title warn-title">⚠ 需要注意</div>
          <ul class="warn-list">
            <li v-for="(w, i) in result.warnings" :key="i">{{ w }}</li>
          </ul>
        </div>

        <ReferenceTable :exam-key="examKey" :overall="result.overall" />
      </template>

      <p class="disclaimer">
        本工具依据剑桥官方公布的卷面分—量表分锚点做线性插值估算，用于模考自测参考。
        正式成绩由剑桥等值处理后换算，边界分数可能存在 ±2 分误差，请以官方成绩单为准。
      </p>
    </main>
  </div>
</template>

<script>
import ScoreSlider from '../components/ScoreSlider.vue'
import ScorePanel from '../components/ScorePanel.vue'
import SkillBars from '../components/SkillBars.vue'
import ReferenceTable from '../components/ReferenceTable.vue'
import { EXAMS, calculate, speakingRawFrom } from '../utils/calc'

const DEFAULTS = {
  ket: { reading: 22, writing: 20, listening: 19, speaking: 33 },
  pet: { reading: 24, writing: 22, listening: 18, speaking: 21 },
  fce: { reading: 29, writing: 26, listening: 20, use: 20, speaking: 41 }
}

export default {
  name: 'MseCalculator',
  components: { ScoreSlider, ScorePanel, SkillBars, ReferenceTable },
  props: {
    /** 由路由注入，支持 /ket /pet /fce 直达 */
    exam: {
      type: String,
      default: 'ket',
      validator: v => Object.keys(EXAMS).includes(v)
    }
  },
  data() {
    return {
      examKey: EXAMS[this.exam] ? this.exam : 'ket',
      mode: 'quick',
      raw: { ...DEFAULTS.ket },
      criteria: { grammar: 3, pronunciation: 3, interaction: 3, global: 3 },
      result: null
    }
  },
  computed: {
    exam() {
      return EXAMS[this.examKey]
    },
    examList() {
      return Object.values(EXAMS)
    },
    skillSummary() {
      return this.exam.skills.map(s => `${s.label}${s.max}`).join(' · ')
    },
    speakingTotal() {
      if (this.mode === 'quick') return Number(this.raw.speaking) || 0
      return speakingRawFrom(this.examKey, this.criteria)
    },
    speakingMax() {
      const s = this.exam.skills.find(i => i.key === 'speaking')
      return s ? s.max : 45
    },
    formulaText() {
      const w = this.exam.speakingWeight
      const parts = this.exam.speakingCriteria.map(
        c => `${this.criteria[c.key]}×${w[c.key]}`
      )
      return parts.join(' + ')
    }
  },
  watch: {
    /* 细分模式下口语得分回写到 raw，保证计算入口统一 */
    speakingTotal(v) {
      if (this.mode === 'detail') this.raw.speaking = v
    }
  },
  methods: {
    quickPicks(key) {
      return (this.exam.quick && this.exam.quick[key]) || null
    },
    isInvalid(key) {
      const floor = this.exam.floor[key]
      return floor != null && (Number(this.raw[key]) || 0) < floor
    },
    sliderHint(s) {
      if (s.key === 'writing') return '按内容 / 结构 / 语言各 0–5 分估，换算为 30 分制'
      if (s.key === 'speaking') return '不确定具体分数就拖滑块；想精确打分用上方「口语细分评分」'
      return ''
    },
    switchExam(key) {
      this.examKey = key
      this.raw = { ...DEFAULTS[key] }
      this.criteria = { grammar: 3, pronunciation: 3, interaction: 3, global: 3 }
      this.calculate()
    },
    calculate() {
      this.result = calculate(this.examKey, this.raw, this.criteria)
    },
    reset() {
      this.mode = 'quick'
      this.raw = { ...DEFAULTS[this.examKey] }
      this.criteria = { grammar: 3, pronunciation: 3, interaction: 3, global: 3 }
      this.result = null
    }
  },
  mounted() {
    this.calculate()
  }
}
</script>

<style scoped>
.mse {
  min-height: 100vh;
  background: #f6f7f9;
  color: #1f2430;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  padding-bottom: 60px;
}

.hero {
  background: linear-gradient(135deg, #1e6fff 0%, #0d47a1 55%, #072a63 100%);
  color: #fff;
  padding: 56px 0 48px;
}
.hero-inner { max-width: 1080px; margin: 0 auto; padding: 0 24px; }
.kicker { font-size: 12px; letter-spacing: 2px; opacity: .8; margin: 0 0 12px; }
.hero h1 { font-size: clamp(26px, 3.4vw, 40px); font-weight: 800; margin: 0 0 16px; line-height: 1.25; }
.hero h1 span { display: block; font-size: clamp(15px, 1.7vw, 20px); font-weight: 500; opacity: .9; margin-top: 6px; }
.hero-meta { display: flex; gap: 10px; flex-wrap: wrap; }
.hero-meta span { background: rgba(255,255,255,.16); padding: 6px 12px; border-radius: 999px; font-size: 13px; }

.wrap { max-width: 1080px; margin: -28px auto 0; padding: 0 24px; position: relative; z-index: 2; }

.card {
  background: #fff;
  border-radius: 18px;
  padding: 24px;
  margin-bottom: 18px;
  box-shadow: 0 8px 28px rgba(20, 40, 80, .06);
}
.card-title { font-size: 16px; font-weight: 800; margin-bottom: 16px; }
.warn-title { color: #e65100; }

.exam-switch { display: inline-flex; background: #eef1f6; border-radius: 12px; padding: 4px; margin-bottom: 12px; }
.exam-switch button {
  border: none; background: transparent; padding: 8px 18px;
  border-radius: 9px; font-size: 14px; font-weight: 800;
  color: #6b7280; cursor: pointer;
}
.exam-switch button.on { background: #0d47a1; color: #fff; }

.mode-switch { display: inline-flex; background: #f1f3f6; border-radius: 12px; padding: 4px; margin-bottom: 22px; }
.mode-switch button {
  border: none; background: transparent; padding: 9px 20px;
  border-radius: 9px; font-size: 14px; font-weight: 700;
  color: #6b7280; cursor: pointer;
}
.mode-switch button.on { background: #fff; color: #1e6fff; box-shadow: 0 2px 10px rgba(30,111,255,.16); }

.grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 22px 28px; }

.criteria-box { grid-column: span 2; }
.criteria-title { display: flex; justify-content: space-between; font-size: 15px; font-weight: 700; margin-bottom: 12px; }
.criteria-title span { color: #1e6fff; font-weight: 800; }
.criteria-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px 24px; }
.criteria-label { font-size: 13px; font-weight: 700; margin-bottom: 8px; }
.criteria-label em { font-style: normal; color: #9aa3b2; font-weight: 400; margin-left: 4px; }
.stars { display: flex; gap: 4px; flex-wrap: wrap; }
.stars button {
  width: 30px; height: 30px; border-radius: 8px;
  border: 1px solid #e4e8ef; background: #fff;
  font-size: 12px; color: #8b94a3; cursor: pointer;
}
.stars button.on { background: #1e6fff; border-color: #1e6fff; color: #fff; font-weight: 700; }
.hint { font-size: 12px; color: #9aa3b2; margin: 8px 0 0; line-height: 1.6; }

.speaking-sum {
  margin-top: 18px; padding: 12px 16px;
  background: #f5f8ff; border-radius: 12px;
  font-size: 14px; color: #4b5563;
}
.speaking-sum strong { color: #1e6fff; font-size: 17px; }

.actions { display: flex; gap: 10px; margin-top: 24px; }
.btn-primary {
  flex: 1; border: none; background: linear-gradient(135deg, #1e6fff, #0d47a1);
  color: #fff; padding: 14px 0; border-radius: 12px;
  font-size: 16px; font-weight: 800; cursor: pointer;
}
.btn-ghost {
  padding: 14px 22px; border: 1px solid #e0e4ea; background: #fff;
  border-radius: 12px; color: #6b7280; font-weight: 700; cursor: pointer;
}

.warn-list { margin: 0; padding-left: 18px; }
.warn-list li { font-size: 13px; color: #7c3f00; line-height: 1.8; margin-bottom: 6px; }

.disclaimer { font-size: 12px; color: #9aa3b2; line-height: 1.8; margin: 20px 0 0; padding: 0 4px; }

@media (max-width: 720px) {
  .grid { grid-template-columns: 1fr; }
  .criteria-box { grid-column: span 1; }
  .criteria-grid { grid-template-columns: 1fr; }
}
</style>
