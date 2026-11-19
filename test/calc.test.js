import { EXAMS, EXAM_ORDER, interpolate, scaleOf, speakingScore, writingScore, calculate, studyTips, advise } from '../src/utils/calc.js'

let pass = 0
let fail = 0
const errors = []

function assert(name, cond) {
  if (cond) pass++
  else {
    fail++
    errors.push(name)
  }
}

/* 插值边界 */
const simple = [[30, 150], [20, 120], [7, 82]]
assert('插值：满分取上限', interpolate(30, simple) === 150)
assert('插值：超满分仍为上限', interpolate(35, simple) === 150)
assert('插值：低于下限取下限', interpolate(3, simple) === 82)
assert('插值：命中锚点', interpolate(20, simple) === 120)
assert('插值：中点按比例', interpolate(25, [[30, 150], [20, 120]]) === 135)

/* KET 锚点 */
assert('KET 阅读 20 → 120', scaleOf('ket', 'reading', 20) === 120)
assert('KET 阅读 28 → 140', scaleOf('ket', 'reading', 28) === 140)
assert('KET 阅读 30 → 150', scaleOf('ket', 'reading', 30) === 150)
assert('KET 写作 18 → 120', scaleOf('ket', 'writing', 18) === 120)
assert('KET 听力 17 → 120', scaleOf('ket', 'listening', 17) === 120)
assert('KET 口语 27 → 120', scaleOf('ket', 'speaking', 27) === 120)

/* PET / FCE 锚点 */
assert('PET 阅读 26 → 140', scaleOf('pet', 'reading', 26) === 140)
assert('PET 听力 18 → 140', scaleOf('pet', 'listening', 18) === 140)
assert('FCE 语用 22 → 160', scaleOf('fce', 'useofenglish', 22) === 160)
assert('FCE 口语 44 → 160', scaleOf('fce', 'speaking', 44) === 160)

/* 口语权重 */
assert('KET 口语权重 2/2/2/3', speakingScore('ket', { grammar: 3, pronunciation: 3, interaction: 3, global: 3 }) === 27)
assert('PET 口语等权', speakingScore('pet', { grammar: 4, pronunciation: 4, interaction: 4, global: 4 }) === 16)
assert('FCE 口语权重全 3', speakingScore('fce', { grammar: 3, pronunciation: 3, interaction: 3, global: 3 }) === 36)

/* 整体计算：KET 稳过线 */
const ketPass = calculate('ket', { reading: 20, writing: 18, listening: 17, speaking: 27 })
assert('KET 四项踩 A2 锚点 → 120', ketPass.overall === 120)
assert('KET 120 判为 Grade C', ketPass.gradeKey === 'c')
assert('KET 120 不误报边界提醒', !ketPass.warnings.some(w => w.includes('通过线')))

/* 整体计算：KET 卓越 */
const ketA = calculate('ket', { reading: 30, writing: 30, listening: 25, speaking: 45 })
assert('KET 全满分 → 150', ketA.overall === 150)

/* 计分门槛 */
const ketInvalid = calculate('ket', { reading: 4, writing: 18, listening: 17, speaking: 27 })
assert('KET 阅读 4 题触发不计分', ketInvalid.skills[0].invalid === true)
assert('KET 阅读不计分时提示非空', ketInvalid.warnings.length > 0)
const ketLowListen = calculate('ket', { reading: 20, writing: 18, listening: 3, speaking: 27 })
assert('KET 听力 3 题触发不计分', ketLowListen.skills[2].invalid === true)

/* PET 整体 */
const petPass = calculate('pet', { reading: 26, writing: 26, listening: 18, speaking: 22 })
assert('PET 四项踩 B1 锚点 → 140', petPass.overall === 140)
assert('PET 140 判为 Grade C', petPass.gradeKey === 'c')

/* FCE 五项等权 */
const fcePass = calculate('fce', { reading: 32, useofenglish: 22, writing: 30, listening: 22, speaking: 44 })
assert('FCE 五项踩锚点 → 160', fcePass.overall === 160)
assert('FCE 分项为 5 项', fcePass.skills.length === 5)
assert('FCE 160 判为 Grade C', fcePass.gradeKey === 'c')

/* 低分不崩 */
const low = calculate('ket', { reading: 0, writing: 0, listening: 0, speaking: 0 })
assert('全零分不抛异常且有结果', typeof low.overall === 'number')

/* 配置完整性 */
assert('KET 4 项技能', EXAMS.ket.skills.length === 4)
assert('PET 4 项技能', EXAMS.pet.skills.length === 4)
assert('FCE 5 项技能', EXAMS.fce.skills.length === 5)
assert('三套考试量表递增', EXAMS.ket.scaleMax < EXAMS.pet.scaleMax && EXAMS.pet.scaleMax < EXAMS.fce.scaleMax)
assert('三套通过线递增', EXAMS.ket.passLine < EXAMS.pet.passLine && EXAMS.pet.passLine < EXAMS.fce.passLine)

console.log(`\n  通过 ${pass} 项，失败 ${fail} 项`)
if (fail) {
  console.log('  失败用例：')
  errors.forEach(e => console.log('   -', e))
  process.exit(1)
}
console.log('  全部通过\n')

/* 六考试配置完整性 */
assert('考试共六级', EXAM_ORDER.length === 6)
EXAM_ORDER.forEach(k => {
  const e = EXAMS[k]
  assert(k + ' 配置完整', e && e.tiers && e.anchors && e.reference && e.certName && e.scaleMax > e.scaleMin)
  const r = calculate(k, Object.fromEntries(e.skills.map(s => [s.key, s.max])))
  assert(k + ' 满分达到上限', r.overall === e.scaleMax || r.gradeKey === 'max')
  const low = calculate(k, Object.fromEntries(e.skills.map(s => [s.key, 0])))
  assert(k + ' 零分不崩溃', low.overall >= 0 && low.warnings.length > 0)
})
assert('KET 阅读低于门槛不计分', calculate('ket', { reading: 5, writing: 20, listening: 19, speaking: 33 }).skills[0].invalid === true)
assert('写作分项折算', writingScore('ket', { content: 5, organisation: 5, language: 5 }) === 15)
assert('FCE 写作满分', writingScore('fce', { content: 5, organisation: 5, language: 5 }) === 40)
assert('KET 写作细分满分可传 max', writingScore('ket', { content: 5, organisation: 5, language: 5 }, 30) === 30)
assert('提分建议有结果', advise('ket', calculate('ket', { reading: 20, writing: 18, listening: 17, speaking: 27 }), 133).length > 0)
assert('已达标无建议', advise('ket', calculate('ket', { reading: 28, writing: 26, listening: 23, speaking: 41 }), 133).length === 0)
assert('备考建议为字符串数组', studyTips('ket', calculate('ket', { reading: 10, writing: 18, listening: 17, speaking: 27 })).every(t => typeof t === 'string'))
