import { EXAMS, interpolate, scaleOf, gradeOf, calculate, gapsOf, speakingRawFrom } from '../src/utils/calc.js'

let pass = 0
let fail = 0

function eq(actual, expected, msg) {
  if (actual === expected) {
    pass++
  } else {
    fail++
    console.log(`  ✗ ${msg}：期望 ${expected}，实际 ${actual}`)
  }
}

console.log('\n[1] 锚点必须精确命中')
eq(interpolate(30, EXAMS.ket.anchors.reading), 150, 'KET 阅读满分 30 → 150')
eq(interpolate(28, EXAMS.ket.anchors.reading), 140, 'KET 阅读 28 → 140')
eq(interpolate(20, EXAMS.ket.anchors.reading), 120, 'KET 阅读 20 → 120')
eq(interpolate(13, EXAMS.ket.anchors.reading), 100, 'KET 阅读 13 → 100')
eq(interpolate(30, EXAMS.ket.anchors.writing), 150, 'KET 写作满分 → 150')
eq(interpolate(25, EXAMS.ket.anchors.listening), 150, 'KET 听力满分 → 150')
eq(interpolate(45, EXAMS.ket.anchors.speaking), 150, 'KET 口语满分 → 150')

console.log('\n[2] 低于门槛返回 0（不计分）')
eq(scaleOf('ket', 'reading', 6), 0, 'KET 阅读 6 题 < 7 → 0')
eq(scaleOf('ket', 'reading', 7), 82, 'KET 阅读 7 题 = 门槛 → 82')
eq(scaleOf('ket', 'listening', 5), 0, 'KET 听力 5 题 < 6 → 0')
eq(scaleOf('ket', 'listening', 6), 82, 'KET 听力 6 题 = 门槛 → 82')
eq(scaleOf('pet', 'reading', 10), 0, 'PET 阅读 10 < 11 → 0')
eq(scaleOf('fce', 'listening', 9), 0, 'FCE 听力 9 < 10 → 0')

console.log('\n[3] 边界分数判定')
eq(gradeOf('ket', 150).key, 'a', 'KET 150 → Grade A')
eq(gradeOf('ket', 140).key, 'a', 'KET 140 → Grade A')
eq(gradeOf('ket', 139).key, 'b', 'KET 139 → Grade B')
eq(gradeOf('ket', 133).key, 'b', 'KET 133 → Grade B')
eq(gradeOf('ket', 132).key, 'c', 'KET 132 → Grade C')
eq(gradeOf('ket', 120).key, 'c', 'KET 120 → Grade C')
eq(gradeOf('ket', 119).key, 'a1', 'KET 119 → Level A1')
eq(gradeOf('ket', 100).key, 'a1', 'KET 100 → Level A1')
eq(gradeOf('ket', 99).key, 'none', 'KET 99 → 无证书')
eq(gradeOf('pet', 140).key, 'c', 'PET 140 → Grade C 通过')
eq(gradeOf('pet', 139).key, 'a2', 'PET 139 → Level A2')
eq(gradeOf('fce', 160).key, 'c', 'FCE 160 → Grade C 通过')

console.log('\n[4] 口语细分加权')
eq(
  speakingRawFrom('ket', { grammar: 3, pronunciation: 3, interaction: 3, global: 3 }),
  27,
  'KET 全 3 分：(3+3+3)×2 + 3×3 = 27'
)
eq(
  speakingRawFrom('ket', { grammar: 5, pronunciation: 5, interaction: 5, global: 5 }),
  45,
  'KET 全 5 分 → 45 满分'
)
eq(
  speakingRawFrom('pet', { grammar: 3, pronunciation: 3, interaction: 3, global: 3 }),
  12,
  'PET 四项各 ×1：3×4 = 12'
)
eq(
  speakingRawFrom('fce', { grammar: 3, pronunciation: 3, interaction: 3, global: 3 }),
  36,
  'FCE 四项各 ×3：3×3×4 = 36'
)

console.log('\n[5] 端到端：KET 刚好通过线')
const r1 = calculate('ket', { reading: 20, writing: 18, listening: 17, speaking: 27 })
eq(r1.overall, 120, '四项均踩 A2 锚点 → 总分 120')
eq(r1.gradeKey, 'c', '120 → Grade C')
eq(r1.warnings.length, 0, '精确踩线无警告')

console.log('\n[6] 端到端：KET 满分')
const r2 = calculate('ket', { reading: 30, writing: 30, listening: 25, speaking: 45 })
eq(r2.overall, 150, '四项满分 → 150')
eq(r2.gradeKey, 'a', '150 → Grade A')

console.log('\n[7] 门槛触发警告')
const r3 = calculate('ket', { reading: 5, writing: 20, listening: 19, speaking: 30 })
eq(r3.skills[0].invalid, true, '阅读 5 题应标记不计分')
eq(r3.skills[0].score, 0, '阅读不计分时得分为 0')
eq(r3.warnings.length >= 1, true, '应产生门槛警告')

console.log('\n[8] FCE 五项加权')
const r4 = calculate('fce', { reading: 29, writing: 27, use: 20, listening: 20, speaking: 41 })
eq(r4.skills.length, 5, 'FCE 应有 5 个分项')
eq(r4.overall >= 140 && r4.overall <= 170, true, `FCE 总分应在量表内，实际 ${r4.overall}`)

console.log('\n[9] 提分差距')
const g1 = gapsOf('ket', 118)
eq(g1.length, 3, '应有 3 个目标等级')
eq(g1[0].need, 2, '离 120 差 2 分')
eq(g1[0].perSkill, 1, 'KET 四项，差 2 分 → 每项 1 分')
const g2 = gapsOf('ket', 125)
eq(g2[0].need <= 0, true, '超 120 时通过项标记为已达成')
const g3 = gapsOf('fce', 150)
eq(g3[0].perSkill, 2, 'FCE 五项，离 160 差 10 → 每项 2 分')

console.log('\n[10] 边界提醒')
const r5 = calculate('ket', { reading: 19, writing: 18, listening: 16, speaking: 26 })
eq(
  r5.warnings.some(w => w.includes('通过线')),
  true,
  '119 附近应提示通过线误差'
)

console.log(`\n${'='.repeat(40)}`)
console.log(`通过 ${pass} 项，失败 ${fail} 项`)
console.log('='.repeat(40) + '\n')
process.exit(fail > 0 ? 1 : 0)
