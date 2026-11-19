<template>
  <div class="field">
    <div class="field-head">
      <label>{{ label }}</label>
      <span :class="{ invalid }">{{ invalid ? '不计分' : `${value} / ${max} ${unit}` }}</span>
    </div>

    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="value"
      :disabled="disabled"
      @input="$emit('update:value', Number($event.target.value))"
    />

    <div v-if="quickPicks && quickPicks.length" class="chips">
      <button
        v-for="n in quickPicks"
        :key="n"
        :class="{ on: value === n }"
        @click="$emit('update:value', n)"
      >
        {{ n }}
      </button>
    </div>

    <p v-if="hint" class="hint">{{ hint }}</p>
    <p v-if="invalid" class="hint warn">低于计分门槛，该项将不计分</p>
  </div>
</template>

<script>
export default {
  name: 'ScoreSlider',
  props: {
    label: { type: String, required: true },
    value: { type: Number, default: 0 },
    min: { type: Number, default: 0 },
    max: { type: Number, required: true },
    step: { type: [Number, String], default: 1 },
    unit: { type: String, default: '分' },
    hint: { type: String, default: '' },
    quickPicks: { type: Array, default: null },
    invalid: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  emits: ['update:value']
}
</script>

<style scoped>
.field { padding: 2px 0; }
.field-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
}
.field-head label { font-size: 15px; font-weight: 700; }
.field-head span { font-size: 15px; font-weight: 800; color: #1e6fff; }
.field-head span.invalid { color: #c62828; }

input[type='range'] {
  width: 100%;
  height: 4px;
  accent-color: #1e6fff;
  cursor: pointer;
}
input[type='range']:disabled { opacity: .4; cursor: not-allowed; }

.chips { display: flex; gap: 6px; margin-top: 10px; flex-wrap: wrap; }
.chips button {
  border: 1px solid #e4e8ef;
  background: #fff;
  border-radius: 8px;
  padding: 4px 10px;
  font-size: 12px;
  color: #5b6474;
  cursor: pointer;
}
.chips button:hover { border-color: #1e6fff; color: #1e6fff; }
.chips button.on { background: #1e6fff; border-color: #1e6fff; color: #fff; }

.hint { font-size: 12px; color: #9aa3b2; margin: 8px 0 0; line-height: 1.6; }
.hint.warn { color: #c62828; }
</style>
