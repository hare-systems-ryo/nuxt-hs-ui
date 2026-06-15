import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  failOnWarn: false,
  entries: [
    // 型必要なエントリ
    { input: 'src/module', declaration: true },
    // 純アセット（型不要）
    { input: 'src/runtime/assets/', outDir: 'dist/runtime/assets', declaration: false }
  ],
})