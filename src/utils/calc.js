/**
 * 剑桥 MSE 成绩换算：KET / PET / FCE
 * 规则：先按卷面分插值出各项量表分，再按等权（FCE 五项）求平均、四舍五入。
 * 官方锚点为分段线性插值，边界分数存在约 ±2 分误差。
 */

export const EXAMS = {
  ket: {
    key: 'ket',
    name: 'KET',
    full: 'A2 Key for Schools',
    scaleMin: 100,
    scaleMax: 150,
    passLine: 120,
    distMin: 100,
    certLevel: 'A2',
    skills: [
      { key: 'reading', label: '阅读', max: 30, unit: '题', minValid: 7 },
      { key: 'writing', label: '写作', max: 30, unit: '分', minValid: null },
      { key: 'listening', label: '听力', max: 25, unit: '题', minValid: 6 },
      { key: 'speaking', label: '口语', max: 45, unit: '分', minValid: null }
    ],
    /* 口语：前三项各 0-5 分 ×2，整体表现 0-5 分 ×3 */
    speakingCriteria: [
      { key: 'grammar', label: '语法与词汇', weight: 2 },
      { key: 'pronunciation', label: '语音语调', weight: 2 },
      { key: 'interaction', label: '互动交流', weight: 2 },
      { key: 'global', label: '整体表现', weight: 3 }
    ],
    anchors: {
      reading: [[30, 150], [28, 140], [20, 120], [13, 100], [7, 82]],
      writing: [[30, 150], [26, 140], [18, 120], [12, 100], [8, 82]],
      listening: [[25, 150], [23, 140], [17, 120], [11, 100], [6, 82]],
      speaking: [[45, 150], [41, 140], [27, 120], [18, 100], [10, 82]]
    },
    reference: [
      { label: 'Grade A 卓越', reading: 28, writing: 26, listening: 23, speaking: 41, scale: 140 },
      { label: 'Grade B 优秀', reading: 25, writing: 23, listening: 21, speaking: 36, scale: 133 },
      { label: 'Grade C 通过', reading: 20, writing: 18, listening: 17, speaking: 27, scale: 120 },
      { label: 'Level A1', reading: 13, writing: 12, listening: 11, speaking: 18, scale: 100 }
    ]
  },

  pet: {
    key: 'pet',
    name: 'PET',
    full: 'B1 Preliminary for Schools',
    scaleMin: 120,
    scaleMax: 170,
    passLine: 140,
    distMin: 120,
    certLevel: 'B1',
    skills: [
      { key: 'reading', label: '阅读', max: 35, unit: '题', minValid: 11 },
      { key: 'writing', label: '写作', max: 35, unit: '分', minValid: null },
      { key: 'listening', label: '听力', max: 25, unit: '题', minValid: 8 },
      { key: 'speaking', label: '口语', max: 30, unit: '分', minValid: null }
    ],
    speakingCriteria: [
      { key: 'grammar', label: '语法与词汇', weight: 1 },
      { key: 'pronunciation', label: '语音语调', weight: 1 },
      { key: 'interaction', label: '互动交流', weight: 1 },
      { key: 'global', label: '整体表现', weight: 1 }
    ],
    anchors: {
      reading: [[35, 170], [32, 160], [26, 140], [19, 120], [11, 102]],
      writing: [[35, 170], [32, 160], [26, 140], [19, 120], [12, 102]],
      listening: [[25, 170], [23, 160], [18, 140], [13, 120], [8, 102]],
      speaking: [[30, 170], [27, 160], [22, 140], [15, 120], [9, 102]]
    },
    reference: [
      { label: 'Grade A 卓越', reading: 32, writing: 32, listening: 23, speaking: 27, scale: 160 },
      { label: 'Grade B 优秀', reading: 29, writing: 29, listening: 20, speaking: 24, scale: 153 },
      { label: 'Grade C 通过', reading: 26, writing: 26, listening: 18, speaking: 22, scale: 140 },
      { label: 'Level A2', reading: 19, writing: 19, listening: 13, speaking: 15, scale: 120 }
    ]
  },

  fce: {
    key: 'fce',
    name: 'FCE',
    full: 'B2 First for Schools',
    scaleMin: 140,
    scaleMax: 190,
    passLine: 160,
    distMin: 140,
    certLevel: 'B2',
    skills: [
      { key: 'reading', label: '阅读', max: 42, unit: '题', minValid: 14 },
      { key: 'useofenglish', label: '语用', max: 30, unit: '题', minValid: null },
      { key: 'writing', label: '写作', max: 40, unit: '分', minValid: null },
      { key: 'listening', label: '听力', max: 30, unit: '题', minValid: 10 },
      { key: 'speaking', label: '口语', max: 60, unit: '分', minValid: null }
    ],
    speakingCriteria: [
      { key: 'grammar', label: '语法与词汇', weight: 3 },
      { key: 'pronunciation', label: '语音语调', weight: 3 },
      { key: 'interaction', label: '互动交流', weight: 3 },
      { key: 'global', label: '整体表现', weight: 3 }
    ],
    anchors: {
      reading: [[42, 190], [38, 180], [32, 160], [24, 140], [14, 122]],
      useofenglish: [[30, 190], [27, 180], [22, 160], [16, 140], [9, 122]],
      writing: [[40, 190], [36, 180], [30, 160], [22, 140], [12, 122]],
      listening: [[30, 190], [27, 180], [22, 160], [16, 140], [10, 122]],
      speaking: [[60, 190], [54, 180], [44, 160], [32, 140], [18, 122]]
    },
    reference: [
      { label: 'Grade A 卓越', reading: 38, useofenglish: 27, writing: 36, listening: 27, speaking: 54, scale: 180 },
      { label: 'Grade B 优秀', reading: 35, useofenglish: 24, writing: 33, listening: 24, speaking: 49, scale: 173 },
      { label: 'Grade C 通过', reading: 32, useofenglish: 22, writing: 30, listening: 22, speaking: 44, scale: 160 },
      { label: 'Level B1', reading: 24, useofenglish: 16, writing: 22, listening: 16, speaking: 32, scale: 140 }
    ]
  }
}

/**
 * 分段线性插值：raw 落在锚点之间时按比例折算量表分
 * points 为 [[卷面分, 量表分], ...]，须按卷面分从高到低排列
 */
export function interpolate(raw, points) {
  const pts = (points || []).filter(p => Array.isArray(p) && p.length >= 2)
  if (!pts.length) return 0
  const hi = pts[0]
  const lo = pts[pts.length - 1]
  if (raw >= hi[0]) return hi[1]
  if (raw <= lo[0]) return lo[1]
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i]
    const b = pts[i + 1]
    if (raw < b[0] || raw > a[0]) continue
    const ratio = (raw - b[0]) / (a[0] - b[0])
    return Math.round(b[1] + ratio * (a[1] - b[1]))
  }
  return lo[1]
}

export function scaleOf(examKey, skillKey, raw) {
  const exam = EXAMS[examKey]
  const points = exam.anchors[skillKey]
  return interpolate(raw, points)
}

/** 口语合并分：各标准分 × 权重求和 */
export function speakingScore(examKey, criteria) {
  const exam = EXAMS[examKey]
  return exam.speakingCriteria.reduce((sum, c) => sum + (Number(criteria[c.key]) || 0) * c.weight, 0)
}

export function gradeOf(examKey, score) {
  const exam = EXAMS[examKey]
  if (score >= exam.scaleMax) return { key: 'max', text: '满分', cefr: exam.certLevel, cert: `${exam.name} 满分证书` }
  if (score >= exam.passLine + 20) {
    return { key: 'a', text: 'Grade A 卓越', cefr: exam.key === 'ket' ? 'B1' : exam.certLevel, cert: `${exam.name} 卓越证书` }
  }
  if (score >= exam.passLine + 13) {
    return { key: 'b', text: 'Grade B 优秀', cefr: exam.certLevel, cert: `${exam.name} 通过证书` }
  }
  if (score >= exam.passLine) {
    return { key: 'c', text: 'Grade C 通过', cefr: exam.certLevel, cert: `${exam.name} 通过证书` }
  }
  if (score >= exam.distMin) {
    const lower = exam.key === 'ket' ? 'A1' : exam.key === 'pet' ? 'A2' : 'B1'
    return { key: 'lower', text: `Level ${lower}`, cefr: lower, cert: `${lower} 级别证明书（未达 ${exam.name} 合格）` }
  }
  return { key: 'none', text: '未达证书标准', cefr: '—', cert: '无证书' }
}

/**
 * 主计算入口
 * @param {string} examKey ket | pet | fce
 * @param {object} raws 各项卷面分，口语传合并后的分数
 * @returns {object} 总分、等级、分项明细、警告
 */
export function calculate(examKey, raws) {
  const exam = EXAMS[examKey]
  const warnings = []

  const skills = exam.skills.map(skill => {
    const raw = Number(raws[skill.key]) || 0
    const invalid = skill.minValid !== null && raw < skill.minValid
    const score = invalid ? 0 : scaleOf(examKey, skill.key, raw)
    const g = gradeOf(examKey, score)
    return {
      key: skill.key,
      label: skill.label,
      raw,
      max: skill.max,
      unit: skill.unit,
      rawText: `${raw} / ${skill.max} ${skill.unit}`,
      invalid,
      score,
      gradeKey: g.key,
      gradeText: g.text
    }
  })

  const validSkills = skills.filter(s => !s.invalid)
  const sum = validSkills.reduce((acc, s) => acc + s.score, 0)
  const overall = validSkills.length
    ? Math.round(sum / validSkills.length)
    : 0

  skills.forEach(s => {
    if (s.invalid) {
      warnings.push(`${s.label}仅得 ${s.raw}（门槛 ${EXAMS[examKey].skills.find(x => x.key === s.key).minValid}），按官方规则该项不计分。`)
    }
  })

  const g = gradeOf(examKey, overall)
  const near = [exam.passLine - 2, exam.passLine + 2]
  if (overall >= near[0] && overall <= near[1] && overall !== exam.passLine) {
    warnings.push(`分数落在通过线（${exam.passLine}）附近，换算误差可能让结果在“通过 / 未通过”之间浮动。`)
  }

  return {
    overall,
    gradeKey: g.key,
    gradeText: g.text,
    cefr: g.cefr,
    cert: g.cert,
    skills,
    warnings
  }
}
