export default {
  '*.{js,jsx,ts,tsx,vue}': ['eslint --fix', 'prettier --write'],
  '*.{css,less,scss}': ['prettier --write'],
  '*.{md,mdx}': ['prettier --write'],
  '*.{json,yml,yaml}': ['prettier --write'],
}
