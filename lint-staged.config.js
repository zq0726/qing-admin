export default {
  '*.{js,jsx,ts,tsx,vue}': ['eslint --fix', 'prettier --write'],
  '*.{css,less,scss}': ['stylelint --fix', 'prettier --write'],
  '*.{md,mdx}': ['prettier --write'],
  '*.{json,yml,yaml}': ['prettier --write'],
}
