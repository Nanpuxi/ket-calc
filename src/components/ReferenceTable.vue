<template>
  <div>
    <div class="card">
      <div class="card-title">卷面分 → 等级参考（官方锚点）</div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>等级</th>
              <th v-for="s in exam.skills" :key="s.key">{{ s.label }} /{{ s.max }}</th>
              <th>量表分</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in exam.reference" :key="row.label">
              <td><strong>{{ row.label }}</strong></td>
              <td v-for="s in exam.skills" :key="s.key">≥ {{ row[s.key] }}</td>
              <td class="scale">{{ row.scale }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="card">
      <div class="card-title">距离目标还差多少</div>
      <div class="gap-row">
        <div v-for="g in gaps" :key="g.label" class="gap-item">
          <div class="gap-label">{{ g.label }}</div>
          <div class="gap-value" :class="{ ok: g.need <= 0 }">
            {{ g.need <= 0 ? '已达成' : `还差 ${g.need} 分` }}
          </div>
          <div class="gap-tip">{{ g.tip }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReferenceTable',
  props: {
    exam: { type: Object, required: true },
    overall: { type: Number, required: true }
  },
  computed: {
    gaps() {
      const o = this.overall
      const targets = [
        { label: `通过 (${this.exam.passLine})`, score: this.exam.passLine },
        { label: `优秀 (${this.exam.passLine + 13})`, score: this.exam.passLine + 13 },
        { label: `卓越 (${this.exam.passLine + 20})`, score: this.exam.passLine + 20 }
      ]
      const n = this.exam.skills.length
      return targets.map(t => {
        const need = t.score - o
        return {
          label: t.label,
          need,
          tip: need > 0 ? `各项各再提约 ${Math.ceil(need / n)} 分` : ''
        }
      })
    }
  }
}
</script>

<style scoped>
.card { background: #fff; border-radius: 18px; padding: 24px; margin-bottom: 18px; box-shadow: 0 8px 28px rgba(20,40,80,.06); }
.card-title { font-size: 16px; font-weight: 800; margin-bottom: 16px; }
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 13px; }
th, td { padding: 10px 8px; text-align: left; border-bottom: 1px solid #f0f2f5; white-space: nowrap; }
th { color: #9aa3b2; font-weight: 600; font-size: 12px; }
td.scale { color: #1e6fff; font-weight: 800; }
.gap-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.gap-item { background: #f8f9fb; border-radius: 14px; padding: 16px; }
.gap-label { font-size: 13px; color: #6b7280; }
.gap-value { font-size: 19px; font-weight: 800; color: #e65100; margin: 6px 0 4px; }
.gap-value.ok { color: #059669; }
.gap-tip { font-size: 12px; color: #9aa3b2; min-height: 16px; }
@media (max-width: 720px) { .gap-row { grid-template-columns: 1fr; } }
</style>
