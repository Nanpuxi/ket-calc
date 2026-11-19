/**
 * 剑桥通用英语（MSE）成绩换算
 * 依据剑桥官方公布的「卷面分 — 量表分」锚点做分段线性插值。
 * 量表分统一为 100–150（Cambridge English Scale）。
 */

/* ---------------- 考试配置 ---------------- */

export const EXAMS = {
  ket: {
    key: 'ket',
    name: 'KET',
    fullName: 'A2 Key for Schools',
    scale: '100–150',
    passLine: 120,
    bands: [
      { key: 'a', min: 140, label: 'Grade A 卓越', cefr: 'B1', cert: 'A2 Key 卓越证书（标注 B1 水平）' },
      { key: 'b', min: 133, label: 'Grade B 优秀', cefr: 'A2+', cert: 'A2 Key 通过证书' },
      { key: 'c', min: 120, label: 'Grade C 通过', cefr: 'A2', cert: 'A2 Key 通过证书' },
      { key: 'a1', min: 100, label: 'Level A1', cefr: 'A1', cert: 'A1 级别证明书（未达 KET 合格）' },
      { key: 'none', min: 0, label: '未达证书标准', cefr: '—', cert: '无证书' }
    ],
    skills: [
      { key: 'reading', label: '阅读', unit: '题', max: 30 },
      { key: 'writing', label: '写作', unit: '分', max: 30 },
      { key: 'listening', label: '听力', unit: '题', max: 25 },
      { key: 'speaking', label: '口语', unit: '分', max: 45 }
    ],
    /* 低于该卷面分则该项不计分 */
    floor: { reading: 7, listening: 6 },
    anchors: {
      reading: [[30, 150], [28, 140], [20, 120], [13, 100], [7, 82]],
      writing: [[30, 150], [26, 140], [18, 120], [12, 100], [8, 82]],
      listening: [[25, 150], [23, 140], [17, 120], [11, 100], [6, 82]],
      speaking: [[45, 150], [41, 140], [27, 120], [18, 100], [10, 82]]
    },
    /* 口语细分：四项各 0–5，前三项 ×2、整体表现 ×3 */
    speakingCriteria: [
      { key: 'grammar', label: '语法与词汇', desc: '语法准确度、词汇范围与恰当性' },
      { key: 'pronunciation', label: '语音语调', desc: '发音清晰度、重音与语调' },
      { key: 'interaction', label: '互动交流', desc: '与同伴和考官的应答、追问、推进话题' },
      { key: 'global', label: '整体表现', desc: '考官对整体交际效果的综合印象' }
    ],
    speakingWeight: { grammar: 2, pronunciation: 2, interaction: 2, global: 3 },
    writingCriteria: [
      { key: 'content', label: '内容 Content' },
      { key: 'organisation', label: '结构 Organisation' },
      { key: 'language', label: '语言 Language' }
    ],
    quick: {
      reading: [10, 15, 20, 25, 28, 30],
      listening: [8, 12, 17, 21, 23, 25]
    }
  },

  pet: {
    key: 'pet',
    name: 'PET',
    fullName: 'B1 Preliminary for Schools',
    scale: '120–170',
    passLine: 140,
    bands: [
      { key: 'a', min: 160, label: 'Grade A 卓越', cefr: 'B2', cert: 'B1 Preliminary 卓越证书（标注 B2 水平）' },
      { key: 'b', min: 153, label: 'Grade B 优秀', cefr: 'B1+', cert: 'B1 Preliminary 通过证书' },
      { key: 'c', min: 140, label: 'Grade C 通过', cefr: 'B1', cert: 'B1 Preliminary 通过证书' },
      { key: 'a2', min: 120, label: 'Level A2', cefr: 'A2', cert: 'A2 级别证明书（未达 PET 合格）' },
      { key: 'none', min: 0, label: '未达证书标准', cefr: '—', cert: '无证书' }
    ],
    skills: [
      { key: 'reading', label: '阅读', unit: '题', max: 35 },
      { key: 'writing', label: '写作', unit: '分', max: 35 },
      { key: 'listening', label: '听力', unit: '题', max: 25 },
      { key: 'speaking', label: '口语', unit: '分', max: 30 }
    ],
    floor: { reading: 11, listening: 8 },
    anchors: {
      reading: [[35, 170], [32, 160], [28, 153], [23, 140], [19, 132], [11, 120]],
      writing: [[35, 170], [31, 160], [27, 153], [22, 140], [18, 132], [11, 120]],
      listening: [[25, 170], [23, 160], [21, 153], [18, 140], [15, 132], [8, 120]],
      speaking: [[30, 170], [27, 160], [24, 153], [20, 140], [17, 132], [10, 120]]
    },
    speakingCriteria: [
      { key: 'grammar', label: '语法与词汇', desc: '语法准确度、词汇范围与恰当性（0–5）' },
      { key: 'pronunciation', label: '语音语调', desc: '发音清晰度、重音与语调（0–5）' },
      { key: 'interaction', label: '互动交流', desc: '主动提问、回应、协商意义（0–5）' },
      { key: 'global', label: '整体表现', desc: '任务完成情况与综合印象（0–5）' }
    ],
    speakingWeight: { grammar: 1, pronunciation: 1, interaction: 1, global: 1 },
    writingCriteria: [
      { key: 'content', label: '内容 Content' },
      { key: 'organisation', label: '结构 Organisation' },
      { key: 'grammar', label: '语法 Grammar' },
      { key: 'vocabulary', label: '词汇 Vocabulary' },
      { key: 'spelling', label: '拼写 Spelling' }
    ],
    quick: {
      reading: [15, 20, 23, 28, 32, 35],
      listening: [10, 15, 18, 21, 23, 25]
    }
  },

  fce: {
    key: 'fce',
    name: 'FCE',
    fullName: 'C1 Advanced for Schools',
    scale: '122–190',
    passLine: 160,
    bands: [
      { key: 'a', min: 180, label: 'Grade A 卓越', cefr: 'C1', cert: 'C1 Advanced 卓越证书（标注 C1 水平）' },
      { key: 'b', min: 173, label: 'Grade B 优秀', cefr: 'C1', cert: 'C1 Advanced 通过证书' },
      { key: 'c', min: 160, label: 'Grade C 通过', cefr: 'B2', cert: 'C1 Advanced 通过证书' },
      { key: 'b2', min: 140, label: 'Level B2', cefr: 'B2', cert: 'B2 级别证明书（未达 FCE 合格）' },
      { key: 'none', min: 0, label: '未达证书标准', cefr: '—', cert: '无证书' }
    ],
    /* FCE 为五项加权：阅读/写作/语用/听力/口语 */
    skills: [
      { key: 'reading', label: '阅读', unit: '题', max: 42, weight: 0.2 },
      { key: 'writing', label: '写作', unit: '分', max: 40, weight: 0.2 },
      { key: 'use', label: '语用', unit: '题', max: 30, weight: 0.2 },
      { key: 'listening', label: '听力', unit: '题', max: 30, weight: 0.2 },
      { key: 'speaking', label: '口语', unit: '分', max: 60, weight: 0.2 }
    ],
    floor: { reading: 14, listening: 10 },
    anchors: {
      reading: [[42, 190], [38, 180], [34, 173], [29, 160], [25, 154], [14, 140]],
      writing: [[40, 190], [36, 180], [32, 173], [27, 160], [23, 154], [13, 140]],
      use: [[30, 190], [27, 180], [24, 173], [20, 160], [16, 154], [9, 140]],
      listening: [[30, 190], [27, 180], [24, 173], [20, 160], [16, 154], [10, 140]],
      speaking: [[60, 190], [54, 180], [48, 173], [41, 160], [35, 154], [22, 140]]
    },
    speakingCriteria: [
      { key: 'grammar', label: '语法与词汇', desc: '语言资源与准确度（0–5）' },
      { key: 'pronunciation', label: '语音语调', desc: '发音与连贯表达（0–5）' },
      { key: 'interaction', label: '互动交流', desc: '话题展开与协商能力（0–5）' },
      { key: 'global', label: '整体表现', desc: '任务完成度与综合印象（0–5）' }
    ],
    speakingWeight: { grammar: 3, pronunciation: 3, interaction: 3, global: 3 },
    writingCriteria: [
      { key: 'content', label: '内容 Content' },
      { key: 'organisation', label: '结构 Organisation' },
      { key: 'language', label: '语言 Language' }
    ],
    quick: {
      reading: [18, 25, 29, 34, 38, 42],
      listening: [12, 16, 20, 24, 27, 30]
    }
  }
}

/* ---------------- 换算核心 ---------------- */

/**
 * 分段线性插值：anchors 为 [卷面分, 量表分] 降序数组
 * 高于最高锚点直接给满分，低于最低锚点给最低分
 */
export function interpolate(raw, anchors) {
  if (!anchors || !anchors.length) return 0
  if (raw >= anchors[0][0]) return anchors[0][1]
  const last = anchors[anchors.length - 1]
  if (raw <= last[0]) return last[1]
  for (let i = 0; i < anchors.length - 1; i++) {
    const hi = anchors[i]
    const lo = anchors[i + 1]
    if (raw < lo[0] || raw > hi[0]) continue
    const ratio = (raw - lo[0]) / (hi[0] - lo[0])
    return Math.round(lo[1] + ratio * (hi[1] - lo[1]))
  }
  return last[1]
}

/** 单项卷面分 → 量表分（低于门槛返回 0，表示不计分） */
export function scaleOf(examKey, skillKey, raw) {
  const exam = EXAMS[examKey]
  const floor = exam.floor[skillKey]
  if (floor != null && raw < floor) return 0
  return interpolate(raw, exam.anchors[skillKey])
}

/** 口语细分四项 → 口语卷面分 */
export function speakingRawFrom(examKey, criteria) {
  const exam = EXAMS[examKey]
  const w = exam.speakingWeight
  return Object.keys(w).reduce((sum, k) => sum + (Number(criteria[k]) || 0) * w[k], 0)
}

/** 量表分 → 等级信息 */
export function gradeOf(examKey, score) {
  const bands = EXAMS[examKey].bands
  return bands.find(b => score >= b.min) || bands[bands.length - 1]
}

/**
 * 总分类：KET/PET 四项等权平均，FCE 五项按 weight 加权
 * 任一项因低于门槛记 0 时，仍参与平均（符合官方「该项无效」的惩罚效果）
 */
export function overallOf(examKey, skillScores) {
  const exam = EXAMS[examKey]
  const list = exam.skills.map(s => ({
    ...s,
    score: skillScores[s.key] || 0
  }))
  const totalWeight = list.reduce((a, b) => a + (b.weight || 1), 0)
  const sum = list.reduce((a, b) => a + b.score * (b.weight || 1), 0)
  return {
    overall: Math.round(sum / totalWeight),
    list
  }
}

/** 分数量表上的百分比位置，用于进度条 / 刻度条 */
export function scalePercent(examKey, score) {
  const min = { ket: 100, pet: 120, fce: 140 }[examKey]
  const max = { ket: 150, pet: 170, fce: 190 }[examKey]
  const pct = ((score - min) / (max - min)) * 100
  return Math.max(2, Math.min(100, pct))
}

/* ---------------- 主计算入口 ---------------- */

export function calculate(examKey, rawScores, criteria) {
  const exam = EXAMS[examKey]
  const skillScores = {}

  exam.skills.forEach(s => {
    skillScores[s.key] = scaleOf(examKey, s.key, Number(rawScores[s.key]) || 0)
  })

  const { overall, list } = overallOf(examKey, skillScores)
  const grade = gradeOf(examKey, overall)

  const skills = list.map(s => {
    const raw = Number(rawScores[s.key]) || 0
    const invalid = exam.floor[s.key] != null && raw < exam.floor[s.key]
    const g = gradeOf(examKey, s.score)
    return {
      key: s.key,
      label: s.label,
      unit: s.unit,
      max: s.max,
      raw,
      rawText: invalid ? `${raw} / ${s.max} ${s.unit}（不计分）` : `${raw} / ${s.max} ${s.unit}`,
      invalid,
      score: s.score,
      gradeKey: g.key,
      gradeText: g.label
    }
  })

  const warnings = buildWarnings(examKey, overall, skills)

  return {
    overall,
    gradeKey: grade.key,
    gradeText: grade.label,
    cefr: grade.cefr,
    cert: grade.cert,
    skills,
    warnings
  }
}

/** 门槛拦截 + 边界分数误差提醒 */
function buildWarnings(examKey, overall, skills) {
  const exam = EXAMS[examKey]
  const out = []

  skills.filter(s => s.invalid).forEach(s => {
    out.push(
      `${s.label}仅 ${s.raw} ${s.unit}，低于 ${exam.floor[s.key]} 的计分门槛，该项按官方规则不计分（记为 0），会严重拉低总分。`
    )
  })

  const lowCount = skills.filter(s => s.score > 0 && s.score <= exam.bands[exam.bands.length - 2].min).length
  if (lowCount >= 2 && !skills.some(s => s.invalid)) {
    out.push('有两项以上低于本级量表下限，基础较薄弱，建议先从词汇和长难句入手，而非刷题技巧。')
  }

  const edges = examKey === 'ket' ? [118, 122, 131, 135]
    : examKey === 'pet' ? [138, 142, 151, 155]
    : [158, 162, 171, 175]

  /* 恰好踩线（四项均达锚点）不算误差区间，不提醒 */
  if (overall === exam.passLine) return out

  if (overall >= edges[0] && overall <= edges[1]) {
    out.push(`你的分数落在通过线（${exam.passLine}）附近，换算误差可能让结果在「通过 / 未通过」之间浮动，请以官方成绩单为准。`)
  } else if (overall >= edges[2] && overall <= edges[3]) {
    out.push('你的分数落在优秀线附近，同样存在 ±2 分误差可能。')
  }

  return out
}

/** 距离各等级的提分差距，折算为「每项需提几分」 */
export function gapsOf(examKey, overall) {
  const exam = EXAMS[examKey]
  const count = exam.skills.length
  return exam.bands
    .filter(b => b.key !== 'none')
    .slice(0, 3)
    .reverse()
    .map(b => ({
      key: b.key,
      label: `${b.label} (${b.min})`,
      need: b.min - overall,
      perSkill: Math.ceil(Math.max(0, b.min - overall) / count)
    }))
}
