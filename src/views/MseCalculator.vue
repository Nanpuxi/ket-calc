<template>
  <div class="page">
    <section class="hero">
      <div class="hero-inner">
        <div class="hero-top">
          <p class="kicker">CAMBRIDGE · MSE SCORE CALCULATOR</p>
          <button class="theme-btn" @click="toggleTheme" :title="'主题：' + theme">
            {{ theme === 'dark' ? '☀ 浅色' : theme === 'light' ? '☾ 深色' : '◐ 跟随系统' }}
          </button>
        </div>
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
          <span>{{ exam.passLine }} 分{{ exam.unit === '盾' ? '获证书' : '通过' }}</span>
          <span>共 {{ exam.skills.length }} 项</span>
          <span v-if="target && result">目标 {{ target }}：{{ result.overall >= target ? '已达成' : '差 ' + (target - result.overall) + ' 分' }}</span>
        </div>
      </div>
    </section>

    <main class="wrap">
      <div class="card">
        <div class="mode-switch">
          <button :class="{ on: mode === 'quick' }" @click="mode = 'quick'">快速估分</button>
          <button
            v-for="s in detailSkills"
            :key="s.key"
            :class="{ on: mode === s.key }"
            @click="mode = s.key"
          >
            {{ s.label }}细分评分
          </button>
          <button :class="{ on: mode === 'exam' }" @click="mode = 'exam'">考后录分</button>
        </div>

        <!-- 快速估分 / 考后录分 -->
        <div v-if="mode === 'quick' || mode === 'exam'" class="grid">
          <ScoreSlider
            v-for="s in exam.skills"
            :key="s.key"
            :skill="s"
            :presets="presetsOf(s.key)"
            v-model="raws[s.key]"
          />
        </div>

        <!-- 口语 / 写作 细分 -->
        <template v-if="isDetail">
          <div class="grid speaking-grid">
            <div v-for="c in detailCriteria" :key="c.key" class="field">
              <div class="field-head">
                <label>{{ c.label }}</label>
                <span>{{ detailVals[c.key] }} / {{ c.max }}</span>
              </div>
              <div class="stars">
                <button
                  v-for="n in c.max + 1"
                  :key="n"
                  :class="{ on: detailVals[c.key] === n - 1 }"
                  @click="setDetail(c.key, n - 1)"
                >
                  {{ n - 1 }}
                </button>
              </div>
              <div class="hint">权重 ×{{ c.weight }}</div>
            </div>
          </div>
          <div class="speaking-sum">
            {{ detailSkill.label }}合并分 = <strong>{{ detailTotal }}</strong> / {{ detailSkill.max }}
          </div>
        </template>

        <div class="target-row">
          <label>目标分</label>
          <input class="target-input" type="number" :min="exam.scaleMin" :max="exam.scaleMax" v-model.number="targetInput" :placeholder="String(exam.passLine)" />
          <span class="hint">默认通过线 {{ exam.passLine }}</span>
        </div>

        <div class="actions">
          <button class="btn-primary" @click="calculate">计算成绩</button>
          <button class="btn-ghost" @click="saveCurrent">保存记录</button>
          <button class="btn-ghost" @click="exportReport" :disabled="!result">导出报告</button>
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

        <div class="card" v-if="tips.length">
          <div class="card-title">📈 提分建议</div>
          <ul class="tip-list">
            <li v-for="(t, i) in tips" :key="i">{{ t }}</li>
          </ul>
        </div>

        <ReferenceTable :exam="exam" :overall="result.overall" />

        <div class="card">
          <div class="card-title">
            历史记录（{{ records.length }}）
            <button v-if="records.length" class="link-btn" @click="clearAll">清空</button>
          </div>
          <div v-if="!records.length" class="empty">暂无记录，算完后点「保存记录」即可留存。</div>
          <div v-else class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>时间</th><th>考试</th><th>总分</th><th>等级</th><th>分项</th><th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="r in records" :key="r.id">
                  <td>{{ r.at }}</td>
                  <td>{{ r.examName }}</td>
                  <td class="overall">{{ r.overall }}</td>
                  <td>{{ r.gradeText }}</td>
                  <td class="skill-cell">{{ r.skillText }}</td>
                  <td><button class="link-btn" @click="delRecord(r.id)">删除</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>

      <p class="disclaimer">
        本工具依据剑桥官方公布的卷面分—量表分锚点做线性插值估算，用于模考自测参考。
        Starters / Movers / Flyers 的盾牌线为通行对照口径；KET 锚点来自官方明文公布；
        PET / FCE 部分中间锚点取自通行对照表，彼此存在 1–2 分出入。
        正式成绩由剑桥等值处理后换算，边界分数以官方成绩单为准。
      </p>
    </main>
  </div>
</template>

<script>
import { EXAMS, EXAM_ORDER, speakingScore, writingScore, calculate, studyTips } from '../utils/calc'
import { addRecord, getRecords, removeRecord, clearRecords, buildReportText, downloadText, getSettings, saveSettings } from '../utils/storage'
import { useTheme } from '../composables/useTheme'
import ScoreSlider from '../components/ScoreSlider.vue'
import ScorePanel from '../components/ScorePanel.vue'
import SkillBars from '../components/SkillBars.vue'
import ReferenceTable from '../components/ReferenceTable.vue'

function blank() {
  return { raws: {}, criteria: { grammar: 3, pronunciation: 3, interaction: 3, global: 3 }, writing: { content: 3, organisation: 3, language: 3 } }
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
  setup() {
    const { theme, setTheme } = useTheme()
    return { theme, setTheme }
  },
  data() {
    const s = blank()
    return {
      mode: 'quick',
      examKey: EXAMS[this.exam] ? this.exam : 'ket',
      raws: s.raws,
      criteria: s.criteria,
      writing: s.writing,
      targetInput: null,
      result: null,
      records: []
    }
  },
  computed: {
    examList() {
      return EXAM_ORDER.map(k => ({ key: k, name: EXAMS[k].name }))
    },
    exam() {
      return EXAMS[this.examKey]
    },
    target() {
      const v = Number(this.targetInput)
      return v > 0 ? v : 0
    },
    detailSkills() {
      return this.exam.skills.filter(s => s.detail)
    },
    isDetail() {
      return this.mode !== 'quick' && this.mode !== 'exam'
    },
    detailSkill() {
      return this.exam.skills.find(s => s.key === this.mode) || null
    },
    detailCriteria() {
      if (this.mode === 'speaking') return this.exam.speakingCriteria || []
      if (this.mode === 'writing') return this.exam.writingCriteria || []
      return []
    },
    detailVals() {
      return this.mode === 'writing' ? this.writing : this.criteria
    },
    detailTotal() {
      if (!this.detailSkill) return 0
      if (this.mode === 'speaking') return speakingScore(this.examKey, this.criteria)
      if (this.mode === 'writing') return writingScore(this.examKey, this.writing, this.detailSkill.max)
      return 0
    },
    tips() {
      if (!this.result) return []
      return studyTips(this.examKey, this.result, this.target || undefined)
    }
  },
  watch: {
    exam(newVal) {
      if (EXAMS[newVal]) {
        this.examKey = newVal
        this.reset()
      }
    },
    targetInput() {
      saveSettings({ target: Number(this.targetInput) || 0 })
    }
  },
  mounted() {
    this.reset()
    this.records = getRecords()
    const saved = getSettings().target
    if (saved) this.targetInput = saved
  },
  methods: {
    presetsOf(key) {
      return PRESETS[key] || []
    },
    switchExam(key) {
      this.$router.push({ name: key[0].toUpperCase() + key.slice(1) + 'Calc' })
    },
    toggleTheme() {
      const order = ['system', 'light', 'dark']
      const next = order[(order.indexOf(this.theme) + 1) % 3]
      this.setTheme(next)
    },
    setDetail(key, val) {
      if (this.mode === 'writing') this.writing[key] = val
      else this.criteria[key] = val
      this.calculate()
    },
    calculate() {
      const raws = { ...this.raws }
      if (this.exam.skills.some(s => s.key === 'speaking' && s.detail)) raws.speaking = speakingScore(this.examKey, this.criteria)
      if (this.exam.skills.some(s => s.key === 'writing' && s.detail)) raws.writing = writingScore(this.examKey, this.writing)
      this.result = calculate(this.examKey, raws, { target: this.target || undefined })
    },
    reset() {
      const d = blank()
      this.exam.skills.forEach(s => {
        d.raws[s.key] = Math.round(s.max * 0.7)
      })
      this.raws = d.raws
      this.criteria = d.criteria
      this.writing = d.writing
      this.mode = 'quick'
      this.calculate()
    },
    saveCurrent() {
      if (!this.result) return
      this.records = addRecord({
        examKey: this.examKey,
        examName: this.exam.name,
        overall: this.result.overall,
        gradeText: this.result.gradeText,
        skillText: this.result.skills.map(s => `${s.label} ${s.invalid ? '不计分' : s.score}`).join(' / '),
        raws: { ...this.raws },
        target: this.target
      })
    },
    delRecord(id) {
      this.records = removeRecord(id)
    },
    clearAll() {
      if (window.confirm('确定清空全部历史记录？')) {
        clearRecords()
        this.records = []
      }
    },
    exportReport() {
      const name = `${this.exam.name}_预估${this.result.overall}分`
      downloadText(`${name}.txt`, buildReportText(this.exam, this.result, this.raws))
    }
  }
}
</script>

<style scoped>
.page { min-height: 100vh; padding-bottom: 60px; }
.hero { background: linear-gradient(135deg, #1e6fff 0%, #0d47a1 55%, #072a63 100%); color: #fff; padding: 56px 0 48px; }
.hero-inner { max-width: 1080px; margin: 0 auto; padding: 0 24px; }
.hero-top { display: flex; justify-content: space-between; align-items: center; }
.kicker { font-size: 12px; letter-spacing: 2px; opacity: .8; margin: 0 0 12px; }
.theme-btn { border: 1px solid rgba(255,255,255,.4); background: rgba(255,255,255,.12); color: #fff; border-radius: 999px; padding: 6px 14px; font-size: 12px; cursor: pointer; }
.hero h1 { font-size: clamp(28px, 3.6vw, 42px); font-weight: 800; margin: 0 0 16px; line-height: 1.25; }
.hero h1 span { display: block; font-size: clamp(15px, 1.7vw, 20px); font-weight: 500; opacity: .9; margin-top: 6px; }
.exam-switch { display: inline-flex; background: rgba(255,255,255,.16); border-radius: 12px; padding: 4px; margin-bottom: 14px; flex-wrap: wrap; }
.exam-switch button { border: none; background: transparent; color: #fff; padding: 8px 18px; border-radius: 9px; font-size: 14px; font-weight: 700; cursor: pointer; opacity: .8; }
.exam-switch button.on { background: #fff; color: #0d47a1; opacity: 1; }
.hero-meta { display: flex; gap: 10px; flex-wrap: wrap; }
.hero-meta span { background: rgba(255,255,255,.16); padding: 6px 12px; border-radius: 999px; font-size: 13px; }
.wrap { max-width: 1080px; margin: -28px auto 0; padding: 0 24px; position: relative; z-index: 2; }
.card { background: var(--bg-card, #fff); border-radius: 18px; padding: 24px; margin-bottom: 18px; box-shadow: 0 8px 28px rgba(20,40,80,.06); }
.card-title { font-size: 16px; font-weight: 800; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; }
.warn-title { color: #e65100; }
.mode-switch { display: inline-flex; background: var(--bg-soft, #f1f3f6); border-radius: 12px; padding: 4px; margin-bottom: 22px; flex-wrap: wrap; }
.mode-switch button { border: none; background: transparent; padding: 9px 16px; border-radius: 9px; font-size: 14px; font-weight: 700; color: var(--text-sub, #6b7280); cursor: pointer; }
.mode-switch button.on { background: var(--bg-card, #fff); color: var(--brand, #1e6fff); box-shadow: 0 2px 10px rgba(30,111,255,.16); }
.grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 22px 28px; }
.field-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; }
.field-head label { font-size: 15px; font-weight: 700; }
.field-head span { font-size: 15px; font-weight: 800; color: var(--brand, #1e6fff); }
.stars { display: flex; gap: 4px; flex-wrap: wrap; }
.stars button { width: 30px; height: 30px; border-radius: 8px; border: 1px solid var(--line, #e4e8ef); background: var(--bg-card, #fff); font-size: 12px; color: var(--text-mute, #8b94a3); cursor: pointer; }
.stars button.on { background: var(--brand, #1e6fff); border-color: var(--brand, #1e6fff); color: #fff; font-weight: 700; }
.hint { font-size: 12px; color: var(--text-mute, #9aa3b2); }
.target-row { display: flex; align-items: center; gap: 10px; margin-top: 18px; flex-wrap: wrap; }
.target-row label { font-size: 14px; font-weight: 700; }
.target-input { width: 100px; border: 1px solid var(--line, #e0e4ea); background: var(--bg-card, #fff); color: var(--text-main, #222); border-radius: 10px; padding: 8px 10px; font-size: 14px; }
.speaking-sum { margin-top: 18px; padding: 12px 16px; background: var(--brand-soft, #f5f8ff); border-radius: 12px; font-size: 14px; color: var(--text-sub, #4b5563); }
.speaking-sum strong { color: var(--brand, #1e6fff); font-size: 17px; }
.actions { display: flex; gap: 10px; margin-top: 24px; flex-wrap: wrap; }
.btn-primary { flex: 1; min-width: 120px; border: none; background: linear-gradient(135deg, #1e6fff, #0d47a1); color: #fff; padding: 14px 0; border-radius: 12px; font-size: 16px; font-weight: 800; cursor: pointer; }
.btn-ghost { padding: 14px 18px; border: 1px solid var(--line, #e0e4ea); background: var(--bg-card, #fff); border-radius: 12px; color: var(--text-sub, #6b7280); font-weight: 700; cursor: pointer; }
.btn-ghost:disabled { opacity: .5; cursor: not-allowed; }
.warn-list { margin: 0; padding-left: 18px; }
.warn-list li { font-size: 13px; color: #e65100; line-height: 1.8; margin-bottom: 6px; }
.tip-list { margin: 0; padding-left: 18px; }
.tip-list li { font-size: 13px; color: var(--text-sub, #4b5563); line-height: 1.8; margin-bottom: 6px; }
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 13px; }
th, td { padding: 10px 8px; text-align: left; border-bottom: 1px solid var(--line, #f0f2f5); white-space: nowrap; color: var(--text-main, #222); }
th { color: var(--text-mute, #9aa3b2); font-weight: 600; font-size: 12px; }
td.overall { color: var(--brand, #1e6fff); font-weight: 800; }
td.skill-cell { white-space: normal; min-width: 200px; }
.link-btn { border: none; background: transparent; color: var(--brand, #1e6fff); cursor: pointer; font-size: 13px; }
.empty { font-size: 13px; color: var(--text-mute, #9aa3b2); }
.disclaimer { font-size: 12px; color: var(--text-mute, #9aa3b2); line-height: 1.8; margin: 20px 0 0; padding: 0 4px; }
@media (max-width: 720px) { .grid { grid-template-columns: 1fr; } }
</style>
