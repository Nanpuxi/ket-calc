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
              <th>标准分</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in referenceRows" :key="row.key">
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
        <div v-for="g in gaps" :key="g.key" class="gap-item">
          <div class="gap-label">{{ g.label }}</div>
          <div class="gap-value" :class="{ ok: g.need <= 0 }">
            {{ g.need <= 0 ? '已达成' : `还差 ${g.need} 分` }}
          </div>
          <div class="gap-tip">{{ g.need <= 0 ? '' : `各项平均需再提约 ${g.perSkill} 分` }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EXAMS, gapsOf, interpolate } from '../utils/calc'

export default {
  name: 'ReferenceTable',
  props: {
    examKey: { type: String, default: 'ket' },
    overall: { type: Number, default: 0 }
  },
  computed: {
    exam() {
      return EXAMS[this.examKey]
    },
    referenceRows() {
      const minScale = { ket: 100, pet: 120, fce: 140 }[this.examKey]
      return this.exam.bands
        .filter(b => b.min >= minScale)
        .slice(0, 4)
        .map(b => {
          const row = { key: b.key, label: b.label, scale: b.min }
          this.exam.skills.forEach(s => {
            const anchors = this.exam.anchors[s.key]
            const hit = anchors.find(a => a[1] === b.min)
            row[s.key] = hit ? hit[0] : Math.round(interpolate(b.min, anchors.map(a => [a[1], a[0]])))
          })
          return row
        })
    },
    gaps() {
      return gapsOf(this.examKey, this.overall)
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

@media (max-width: 720px) {
  .gap-row { grid-template-columns: 1fr; }
}
</style>
