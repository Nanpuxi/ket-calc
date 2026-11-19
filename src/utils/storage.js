/** 本地记录与设置持久化（localStorage） */

const RECORD_KEY = 'mse-calc:records'
const SETTING_KEY = 'mse-calc:settings'

export const THEMES = ['light', 'dark', 'system']

function safeParse(raw, fallback) {
  try {
    const v = JSON.parse(raw)
    return v == null ? fallback : v
  } catch (e) {
    return fallback
  }
}

export function getRecords() {
  if (typeof localStorage === 'undefined') return []
  const list = safeParse(localStorage.getItem(RECORD_KEY), [])
  return Array.isArray(list) ? list : []
}

export function addRecord(record) {
  if (typeof localStorage === 'undefined') return []
  const list = getRecords()
  list.unshift({ ...record, id: Date.now(), at: new Date().toLocaleString('zh-CN') })
  const trimmed = list.slice(0, 50)
  try {
    localStorage.setItem(RECORD_KEY, JSON.stringify(trimmed))
  } catch (e) {
    /* 隐私模式或超额时静默失败，不影响使用 */
  }
  return trimmed
}

export function removeRecord(id) {
  if (typeof localStorage === 'undefined') return []
  const list = getRecords().filter(r => r.id !== id)
  try {
    localStorage.setItem(RECORD_KEY, JSON.stringify(list))
  } catch (e) {
    /* 静默 */
  }
  return list
}

export function clearRecords() {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.removeItem(RECORD_KEY)
  } catch (e) {
    /* 静默 */
  }
}

export function getSettings() {
  const fallback = { theme: 'system', target: 0 }
  if (typeof localStorage === 'undefined') return fallback
  return { ...fallback, ...safeParse(localStorage.getItem(SETTING_KEY), {}) }
}

export function saveSettings(patch) {
  if (typeof localStorage === 'undefined') return getSettings()
  const next = { ...getSettings(), ...patch }
  try {
    localStorage.setItem(SETTING_KEY, JSON.stringify(next))
  } catch (e) {
    /* 静默 */
  }
  return next
}

/** 生成可下载的报告文本 */
export function buildReportText(exam, result, raws) {
  const lines = []
  lines.push(`【${exam.name} ${exam.full} 成绩估算报告】`)
  lines.push(`生成时间：${new Date().toLocaleString('zh-CN')}`)
  lines.push('')
  lines.push(`预估总分：${result.overall} / ${exam.scaleMax}`)
  lines.push(`预估等级：${result.gradeText}`)
  lines.push(`CEFR 级别：${result.cefr}`)
  lines.push(`证书认定：${result.cert}`)
  lines.push('')
  lines.push('— 分项明细 —')
  result.skills.forEach(s => {
    lines.push(
      `${s.label}：${s.invalid ? '不计分' : s.score}（卷面 ${s.raw}/${s.max} ${s.unit}${s.invalid ? '，低于门槛' : ''}）`
    )
  })
  lines.push('')
  lines.push('— 录入卷面分 —')
  Object.keys(raws || {}).forEach(k => {
    lines.push(`${k}: ${raws[k]}`)
  })
  if (result.warnings.length) {
    lines.push('')
    lines.push('— 需要注意 —')
    result.warnings.forEach(w => lines.push(`· ${w}`))
  }
  lines.push('')
  lines.push('说明：本结果依据官方锚点线性插值估算，仅供参考，以官方成绩单为准。')
  return lines.join('\n')
}

export function downloadText(filename, text) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
