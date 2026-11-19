<template>
  <div class="writing">
    <div class="wp-head">
      <div class="wp-title">写作分项评分</div>
      <div class="wp-sum">
        合计 <strong>{{ total }}</strong> / {{ max }}
      </div>
    </div>

    <div class="wp-grid">
      <div v-for="c in criteria" :key="c.key" class="wp-row">
        <div class="wp-label">
          {{ c.label }}
          <em>权重 ×{{ c.weight }}</em>
        </div>
        <div class="stars">
          <button
            v-for="n in steps"
            :key="n"
            :class="{ on: local[c.key] === n - 1 }"
            @click="setVal(c.key, n - 1)"
          >
            {{ n - 1 }}
          </button>
        </div>
      </div>
    </div>

    <div class="wp-hint">
      KET 写作 Part 6（邮件）+ Part 7（看图故事）各按内容、结构、语言三项 0–5 分评定，合计 0–15 分后换算；
      PET / FCE 写作同理，最终按两篇总分占比折算到卷面。
    </div>
  </div>
</template>

<script>
export default {
  name: 'WritingPanel',
  props: {
    modelValue: { type: Object, required: true },
    criteria: { type: Array, required: true },
    max: { type: Number, default: 15 }
  },
  emits: ['update:modelValue'],
  data() {
    return { local: { ...this.modelValue } }
  },
  computed: {
    steps() {
      const m = Math.max(...this.criteria.map(c => c.max), 5)
      return m + 1
    },
    total() {
      return this.criteria.reduce((s, c) => s + (Number(this.local[c.key]) || 0) * c.weight, 0)
    }
  },
  watch: {
    modelValue: {
      deep: true,
      handler(v) {
        this.local = { ...v }
      }
    }
  },
  methods: {
    setVal(key, val) {
      this.local[key] = val
      this.$emit('update:modelValue', { ...this.local })
    }
  }
}
</script>

<style scoped>
.writing {
  margin-top: 18px;
  padding: 18px;
  background: var(--bg-soft, #f8f9fb);
  border-radius: 14px;
}
.wp-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 14px;
}
.wp-title {
  font-size: 14px;
  font-weight: 800;
}
.wp-sum {
  font-size: 13px;
  color: var(--text-sub, #6b7280);
}
.wp-sum strong {
  color: var(--brand, #1e6fff);
  font-size: 16px;
}
.wp-grid {
  display: grid;
  gap: 12px;
}
.wp-row {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}
.wp-label {
  width: 116px;
  font-size: 13px;
  font-weight: 700;
}
.wp-label em {
  display: block;
  font-style: normal;
  font-size: 11px;
  color: var(--text-mute, #9aa3b2);
  font-weight: 400;
  margin-top: 2px;
}
.stars {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}
.stars button {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 1px solid var(--line, #e4e8ef);
  background: var(--bg-card, #fff);
  font-size: 12px;
  color: var(--text-sub, #6b7280);
  cursor: pointer;
}
.stars button.on {
  background: var(--brand, #1e6fff);
  border-color: var(--brand, #1e6fff);
  color: #fff;
  font-weight: 700;
}
.wp-hint {
  margin-top: 14px;
  font-size: 12px;
  color: var(--text-mute, #9aa3b2);
  line-height: 1.7;
}
@media (max-width: 720px) {
  .wp-label {
    width: 100%;
  }
}
</style>
