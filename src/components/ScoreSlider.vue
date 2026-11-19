<template>
  <div class="field">
    <div class="field-head">
      <label>{{ skill.label }}</label>
      <span>{{ local }}{{ skill.unit }} <em>/ {{ skill.max }}</em></span>
    </div>
    <input
      type="range"
      :min="0"
      :max="skill.max"
      :step="step"
      v-model.number="local"
    />
    <div class="chips" v-if="presets.length">
      <button
        v-for="n in presets"
        :key="n"
        :class="{ on: local === n }"
        @click="local = n"
      >
        {{ n }}
      </button>
    </div>
    <div class="hint" v-if="skill.minValid !== null">
      低于 {{ skill.minValid }} {{ skill.unit }}按官方规则该项不计分
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScoreSlider',
  props: {
    skill: { type: Object, required: true },
    modelValue: { type: Number, default: 0 },
    presets: { type: Array, default: () => [] },
    step: { type: Number, default: 1 }
  },
  emits: ['update:modelValue'],
  computed: {
    local: {
      get() { return this.modelValue },
      set(v) { this.$emit('update:modelValue', Number(v) || 0) }
    }
  }
}
</script>

<style scoped>
.field { margin-bottom: 4px; }
.field-head {
  display: flex; justify-content: space-between; align-items: baseline;
  margin-bottom: 10px;
}
.field-head label { font-size: 15px; font-weight: 700; }
.field-head span { font-size: 15px; font-weight: 800; color: #1e6fff; }
.field-head em { font-style: normal; color: #9aa3b2; font-weight: 400; font-size: 13px; }
input[type='range'] { width: 100%; accent-color: #1e6fff; height: 4px; }
.chips { display: flex; gap: 6px; margin-top: 10px; flex-wrap: wrap; }
.chips button {
  border: 1px solid #e4e8ef; background: #fff; border-radius: 8px;
  padding: 4px 10px; font-size: 12px; color: #5b6474; cursor: pointer;
}
.chips button:hover, .chips button.on { border-color: #1e6fff; color: #1e6fff; }
.hint { font-size: 12px; color: #b45309; margin-top: 8px; line-height: 1.6; }
</style>
