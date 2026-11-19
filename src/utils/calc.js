/**
 * 剑桥 MSE 成绩换算：Starters / Movers / Flyers / KET / PET / FCE
 * 规则：先按卷面分插值出各项量表分，再按项数等权平均、四舍五入。
 * 官方锚点为分段线性插值，边界分数存在约 ±2 分误差。
 */

export const EXAMS = {
  starters: {
    key: 'starters',
    name: 'Starters',
    full: 'Pre A1 Starters',
    level: '入门',
    scaleMin: 75,
    scaleMax: 100,
    passLine: 85,
    distMin: 75,
    certLevel: 'Pre-A1',
    shieldLine: 90,
    skills: [
      { key: 'listening', label: '听力', max: 20, unit: '题', minValid: null },
      { key: 'reading', label: '读写', max: 25, unit: '题', minValid: null },
      { key: 'speaking', label: '口语', max: 15, unit: '分', minValid: null }
    ],
    speakingCriteria: [
      { key: 'grammar', label: '词汇与语法', weight: 1 },
      { key: 'pronunciation', label: '发音', weight: 1 },
      { key: 'interaction', label: '互动', weight: 1 }
    ],
    anchors: {
      listening: [[20, 100], [18, 95], [15, 90], [11, 85], [8, 80], [5, 75]],
      reading: [[25, 100], [22, 95], [18, 90], [14, 85], [10, 80], [6, 75]],
      speaking: [[15, 100], [13, 95], [11, 90], [8, 85], [6, 80], [4, 75]]
    },
    reference: [
      { label: '5 盾 卓越', listening: 18, reading: 22, speaking: 13, scale: 95 },
      { label: '4 盾 良好', listening: 15, reading: 18, speaking: 11, scale: 90 },
      { label: '3 盾 通过', listening: 11, reading: 14, speaking: 8, scale: 85 },
      { label: '2 盾', listening: 8, reading: 10, speaking: 6, scale: 80 }
    ],
    tiers: [
      { key: 'max', min: 100, text: '满分', cefr: 'Pre-A1' },
      { key: 'a', min: 95, text: '5 盾 卓越', cefr: 'Pre-A1' },
      { key: 'b', min: 90, text: '4 盾 良好', cefr: 'Pre-A1' },
      { key: 'c', min: 85, text: '3 盾 通过', cefr: 'Pre-A1' },
      { key: 'lower', min: 75, text: '2 盾 / 1 盾', cefr: '低于 Pre-A1' },
      { key: 'none', min: 0, text: '未达证书标准', cefr: '—' }
    ],
    certName: 'Starters 盾牌证书',
    unit: '盾'
  },

  movers: {
    key: 'movers',
    name: 'Movers',
    full: 'A1 Movers',
    level: '一级',
    scaleMin: 80,
    scaleMax: 105,
    passLine: 90,
    distMin: 80,
    certLevel: 'A1',
    shieldLine: 95,
    skills: [
      { key: 'listening', label: '听力', max: 20, unit: '题', minValid: null },
      { key: 'reading', label: '读写', max: 25, unit: '题', minValid: null },
      { key: 'speaking', label: '口语', max: 15, unit: '分', minValid: null }
    ],
    speakingCriteria: [
      { key: 'grammar', label: '词汇与语法', weight: 1 },
      { key: 'pronunciation', label: '发音', weight: 1 },
      { key: 'interaction', label: '互动', weight: 1 }
    ],
    anchors: {
      listening: [[20, 105], [18, 100], [15, 95], [12, 90], [9, 85], [6, 80]],
      reading: [[25, 105], [22, 100], [19, 95], [15, 90], [11, 85], [7, 80]],
      speaking: [[15, 105], [13, 100], [11, 95], [8, 90], [6, 85], [4, 80]]
    },
    reference: [
      { label: '5 盾 卓越', listening: 18, reading: 22, speaking: 13, scale: 100 },
      { label: '4 盾 良好', listening: 15, reading: 19, speaking: 11, scale: 95 },
      { label: '3 盾 通过', listening: 12, reading: 15, speaking: 8, scale: 90 },
      { label: '2 盾', listening: 9, reading: 11, speaking: 6, scale: 85 }
    ],
    tiers: [
      { key: 'max', min: 105, text: '满分', cefr: 'A1' },
      { key: 'a', min: 100, text: '5 盾 卓越', cefr: 'A1' },
      { key: 'b', min: 95, text: '4 盾 良好', cefr: 'A1' },
      { key: 'c', min: 90, text: '3 盾 通过', cefr: 'A1' },
      { key: 'lower', min: 80, text: '2 盾 / 1 盾', cefr: '低于 A1' },
      { key: 'none', min: 0, text: '未达证书标准', cefr: '—' }
    ],
    certName: 'Movers 盾牌证书',
    unit: '盾'
  },

  flyers: {
    key: 'flyers',
    name: 'Flyers',
    full: 'A2 Flyers',
    level: '二级',
    scaleMin: 85,
    scaleMax: 110,
    passLine: 95,
    distMin: 85,
    certLevel: 'A2',
    shieldLine: 100,
    skills: [
      { key: 'listening', label: '听力', max: 20, unit: '题', minValid: null },
      { key: 'reading', label: '读写', max: 25, unit: '题', minValid: null },
      { key: 'speaking', label: '口语', max: 15, unit: '分', minValid: null }
    ],
    speakingCriteria: [
      { key: 'grammar', label: '词汇与语法', weight: 1 },
      { key: 'pronunciation', label: '发音', weight: 1 },
      { key: 'interaction', label: '互动', weight: 1 }
    ],
    anchors: {
      listening: [[20, 110], [18, 105], [15, 100], [12, 95], [9, 90], [6, 85]],
      reading: [[25, 110], [22, 105], [19, 100], [15, 95], [11, 90], [7, 85]],
      speaking: [[15, 110], [13, 105], [11, 100], [8, 95], [6, 90], [4, 85]]
    },
    reference: [
      { label: '5 盾 卓越', listening: 18, reading: 22, speaking: 13, scale: 105 },
      { label: '4 盾 良好', listening: 15, reading: 19, speaking: 11, scale: 100 },
      { label: '3 盾 通过', listening: 12, reading: 15, speaking: 8, scale: 95 },
      { label: '2 盾', listening: 9, reading: 11, speaking: 6, scale: 90 }
    ],
    tiers: [
      { key: 'max', min: 110, text: '满分', cefr: 'A2' },
      { key: 'a', min: 105, text: '5 盾 卓越', cefr: 'A2' },
      { key: 'b', min: 100, text: '4 盾 良好', cefr: 'A2' },
      { key: 'c', min: 95, text: '3 盾 通过', cefr: 'A2' },
      { key: 'lower', min: 85, text: '2 盾 / 1 盾', cefr: '低于 A2' },
      { key: 'none', min: 0, text: '未达证书标准', cefr: '—' }
    ],
    certName: 'Flyers 盾牌证书',
    unit: '盾'
  },

  ket: {
    key: 'ket',
    name: 'KET',
    full: 'A2 Key for Schools',
    level: '基础',
    scaleMin: 100,
    scaleMax: 150,
    passLine: 120,
    distMin: 100,
    certLevel: 'A2',
    skills: [
      { key: 'reading', label: '阅读', max: 30, unit: '题', minValid: 7 },
      { key: 'writing', label: '写作', max: 30, unit: '分', minValid: null, detail: true },
      { key: 'listening', label: '听力', max: 25, unit: '题', minValid: 6 },
      { key: 'speaking', label: '口语', max: 45, unit: '分', minValid: null, detail: true }
    ],
    speakingCriteria: [
      { key: 'grammar', label: '语法与词汇', weight: 2 },
      { key: 'pronunciation', label: '语音语调', weight: 2 },
      { key: 'interaction', label: '互动交流', weight: 2 },
      { key: 'global', label: '整体表现', weight: 3 }
    ],
    writingCriteria: [
      { key: 'content', label: '内容要点', weight: 1, max: 5 },
      { key: 'organisation', label: '结构与连贯', weight: 1, max: 5 },
      { key: 'language', label: '语言准确性', weight: 1, max: 5 }
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
    ],
    tiers: () => [
      { key: 'max', min: 150, text: '满分', cefr: 'B1' },
      { key: 'a', min: 140, text: 'Grade A 卓越', cefr: 'B1' },
      { key: 'b', min: 133, text: 'Grade B 优秀', cefr: 'A2+' },
      { key: 'c', min: 120, text: 'Grade C 通过', cefr: 'A2' },
      { key: 'lower', min: 100, text: 'Level A1', cefr: 'A1' },
      { key: 'none', min: 0, text: '未达证书标准', cefr: '—' }
    ],
    certName: 'A2 Key 证书',
    unit: '分'
  },

  pet: {
    key: 'pet',
    name: 'PET',
    full: 'B1 Preliminary for Schools',
    level: '进阶',
    scaleMin: 120,
    scaleMax: 170,
    passLine: 140,
    distMin: 120,
    certLevel: 'B1',
    skills: [
      { key: 'reading', label: '阅读', max: 35, unit: '题', minValid: 11 },
      { key: 'writing', label: '写作', max: 35, unit: '分', minValid: null, detail: true },
      { key: 'listening', label: '听力', max: 25, unit: '题', minValid: 8 },
      { key: 'speaking', label: '口语', max: 30, unit: '分', minValid: null, detail: true }
    ],
    speakingCriteria: [
      { key: 'grammar', label: '语法与词汇', weight: 1 },
      { key: 'pronunciation', label: '语音语调', weight: 1 },
      { key: 'interaction', label: '互动交流', weight: 1 },
      { key: 'global', label: '整体表现', weight: 1 }
    ],
    writingCriteria: [
      { key: 'content', label: '内容要点', weight: 1, max: 5 },
      { key: 'organisation', label: '结构与连贯', weight: 1, max: 5 },
      { key: 'language', label: '语言准确性', weight: 1, max: 5 }
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
    ],
    tiers: () => [
      { key: 'max', min: 170, text: '满分', cefr: 'B1' },
      { key: 'a', min: 160, text: 'Grade A 卓越', cefr: 'B1' },
      { key: 'b', min: 153, text: 'Grade B 优秀', cefr: 'B1' },
      { key: 'c', min: 140, text: 'Grade C 通过', cefr: 'B1' },
      { key: 'lower', min: 120, text: 'Level A2', cefr: 'A2' },
      { key: 'none', min: 0, text: '未达证书标准', cefr: '—' }
    ],
    certName: 'B1 Preliminary 证书',
    unit: '分'
  },

  fce: {
    key: 'fce',
    name: 'FCE',
    full: 'B2 First for Schools',
    level: '高阶',
    scaleMin: 140,
    scaleMax: 190,
    passLine: 160,
    distMin: 140,
    certLevel: 'B2',
    skills: [
      { key: 'reading', label: '阅读', max: 42, unit: '题', minValid: 14 },
      { key: 'useofenglish', label: '语用', max: 30, unit: '题', minValid: null },
      { key: 'writing', label: '写作', max: 40, unit: '分', minValid: null, detail: true },
      { key: 'listening', label: '听力', max: 30, unit: '题', minValid: 10 },
      { key: 'speaking', label: '口语', max: 60, unit: '分', minValid: null, detail: true }
    ],
    speakingCriteria: [
      { key: 'grammar', label: '语法与词汇', weight: 3 },
      { key: 'pronunciation', label: '语音语调', weight: 3 },
      { key: 'interaction', label: '互动交流', weight: 3 },
      { key: 'global', label: '整体表现', weight: 3 }
    ],
    writingCriteria: [
      { key: 'content', label: '内容要点', weight: 1, max: 5 },
      { key: 'organisation', label: '结构与连贯', weight: 1, max: 5 },
      { key: 'language', label: '语言准确性', weight: 1, max: 5 }
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
    ],
    tiers: () => [
      { key: 'max', min: 190, text: '满分', cefr: 'B2' },
      { key: 'a', min: 180, text: 'Grade A 卓越', cefr: 'B2' },
      { key: 'b', min: 173, text: 'Grade B 优秀', cefr: 'B2' },
      { key: 'c', min: 160, text: 'Grade C 通过', cefr: 'B2' },
      { key: 'lower', min: 140, text: 'Level B1', cefr: 'B1' },
      { key: 'none', min: 0, text: '未达证书标准', cefr: '—' }
    ],
    certName: 'B2 First 证书',
    unit: '分'
  }
}

export const EXAM_ORDER = ['starters', 'movers', 'flyers', 'ket', 'pet', 'fce']

/** 分段线性插值：points 为 [[卷面分, 量表分], ...]，须按卷面分从高到低排列 */
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
  if (!points) return 0
  return interpolate(raw, points)
}

/** 口语合并分：各标准分 × 权重求和 */
export function speakingScore(examKey, criteria) {
  const exam = EXAMS[examKey]
  return exam.speakingCriteria.reduce((sum, c) => sum + (Number(criteria[c.key]) || 0) * c.weight, 0)
}

/** 写作合并分：三项各 0-5 分，KET 合计 15 分，PET/FCE 按满分三倍折算 */
export function writingScore(examKey, criteria, max) {
  const exam = EXAMS[examKey]
  if (!exam.writingCriteria) return 0
  const got = exam.writingCriteria.reduce((sum, c) => sum + (Number(criteria[c.key]) || 0) * c.weight, 0)
  const full = exam.writingCriteria.reduce((sum, c) => sum + c.max * c.weight, 0)
  if (!full) return 0
  return Math.round((got / full) * (max || 15))
}

function tiersOf(examKey) {
  const exam = EXAMS[examKey]
  return typeof exam.tiers === 'function' ? exam.tiers() : exam.tiers
}

export function gradeOf(examKey, score) {
  const tiers = tiersOf(examKey)
  const hit = tiers.find(t => score >= t.min) || tiers[tiers.length - 1]
  const exam = EXAMS[examKey]
  const cert =
    hit.key === 'none'
      ? '无证书'
      : hit.key === 'lower'
        ? `${hit.cefr} 级别证明书（未达 ${exam.name} 合格线）`
        : `${exam.certName || exam.name + ' 证书'}${hit.key === 'a' ? '（卓越）' : ''}`
  return { key: hit.key, text: hit.text, cefr: hit.cefr, cert }
}

/** 卷面分 → 量表分（单项） */
export function rawToScale(examKey, skillKey, raw) {
  return scaleOf(examKey, skillKey, raw)
}

/** 量表分 → 卷面分（反查，用于「目标分要答对几题」） */
export function scaleToRaw(examKey, skillKey, target) {
  const points = EXAMS[examKey].anchors[skillKey]
  if (!points || !points.length) return 0
  const sorted = [...points].sort((a, b) => a[1] - b[1])
  if (target <= sorted[0][1]) return sorted[0][0]
  if (target >= sorted[sorted.length - 1][1]) return sorted[sorted.length - 1][0]
  for (let i = 0; i < sorted.length - 1; i++) {
    const lo = sorted[i]
    const hi = sorted[i + 1]
    if (target < lo[1] || target > hi[1]) continue
    const ratio = (target - lo[1]) / (hi[1] - lo[1])
    return Math.round(lo[0] + ratio * (hi[0] - lo[0]))
  }
  return sorted[sorted.length - 1][0]
}

/**
 * 主计算入口
 * @param {string} examKey starters|movers|flyers|ket|pet|fce
 * @param {object} raws 各项卷面分（口语/写作传合并后的分数）
 */
export function calculate(examKey, raws, options) {
  const exam = EXAMS[examKey]
  const warnings = []

  const skills = exam.skills.map(skill => {
    const raw = Math.max(0, Number(raws[skill.key]) || 0)
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
  const overall = validSkills.length ? Math.round(sum / validSkills.length) : 0

  skills.forEach(s => {
    if (s.invalid) {
      const min = exam.skills.find(x => x.key === s.key).minValid
      warnings.push(`${s.label}仅得 ${s.raw}（门槛 ${min}），按官方规则该项不计分，会明显拉低总分。`)
    }
  })

  const g = gradeOf(examKey, overall)
  if (overall !== exam.passLine && overall >= exam.passLine - 2 && overall <= exam.passLine + 2) {
    warnings.push(`分数落在通过线（${exam.passLine}）附近，换算误差可能让结果在“通过 / 未通过”之间浮动，以官方成绩单为准。`)
  }

  const nearTop = [exam.passLine + 20 - 2, exam.passLine + 20 + 2]
  if (overall >= nearTop[0] && overall <= nearTop[1] && overall !== exam.passLine + 20) {
    warnings.push(`分数落在卓越线（${exam.passLine + 20}）附近，存在约 ±2 分换算误差。`)
  }

  return {
    examKey,
    overall,
    gradeKey: g.key,
    gradeText: g.text,
    cefr: g.cefr,
    cert: g.cert,
    skills,
    warnings,
    validCount: validSkills.length,
    totalCount: skills.length
  }
}

/** 提分建议：找出离目标最划算的一项 */
export function advise(examKey, result, targetScore) {
  const exam = EXAMS[examKey]
  if (!result || !targetScore) return []
  const need = targetScore - result.overall
  if (need <= 0) return []

  const list = result.skills
    .filter(s => !s.invalid)
    .map(s => {
      const curRaw = s.raw
      const needScale = Math.min(exam.scaleMax, s.score + need)
      const needRaw = scaleToRaw(examKey, s.key, needScale)
      const gap = Math.max(0, needRaw - curRaw)
      return {
        key: s.key,
        label: s.label,
        unit: s.unit,
        gap,
        ratio: s.max ? gap / s.max : 0
      }
    })
    .sort((a, b) => a.ratio - b.ratio)

  return list.slice(0, 3)
}

/** 备考建议文案：按最弱项给方向 */
export function studyTips(examKey, result, targetScore) {
  if (!result) return []
  const adv = advise(examKey, result, targetScore)
  if (adv.length) return adv.map(a => `${a.skill}：再提约 ${a.gap} ${a.unit}即可接近目标（性价比最高）`)
  const sorted = [...result.skills]
    .filter(s => !s.invalid)
    .sort((a, b) => a.score - b.score)
  const weakest = sorted[0]
  if (!weakest) return []

  const bank = {
    reading: ['每天 1 篇短文精读，划出生词与指代关系', '重点练 Part 3 匹配题的定位词找法', '限时训练：5 题一组，控制在 5 分钟内'],
    writing: ['背熟邮件三句式：开头交代背景、正文答要点、收尾给期待', '看图故事用「五要素」框架：谁、在哪、做了什么、结果、感受', '写完必须自查主谓一致与过去式'],
    listening: ['精听错题：逐句暂停复述，再对照原文', '抓信号词：but / however / actually 后常是答案', '数字、拼写、时间三类题单独专项练'],
    speaking: ['每天 2 分钟录音自述，回听纠发音', '准备高频话题词块：爱好、旅行、学校、食物', '练追问：Can you tell me more about…?'],
    useofenglish: ['固定搭配与介词清单每天过 20 条', '转换题练词性派生：名词—动词—形容词互换', '完形填空先通读再填，别逐空硬猜']
  }
  const base = bank[weakest.key] || bank.reading
  return base.map(b => `${weakest.label}：${b}`)
}
