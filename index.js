import { createRequire } from 'node:module'
import { findUpSync, skipArrayMergeDeep } from '@hyperupcall/config-utils'
const require = createRequire(import.meta.url)

let config = {
	plugins: [require.resolve('prettier-plugin-pkg')],
	printWidth: 90,
	useTabs: true,
	semi: false,
	singleQuote: true,
	jsxSingleQuote: true,
	trailingComma: 'all', // Default changed from "es5" to "all" in v3.0.0.
	arrowParens: 'always', // Default changed from "avoid" to "always" in v2.0.0.
	endOfLine: 'lf', // Default changed from "auto" to "lf" in v2.0.0.
}

const hyperupcallFile = findUpSync('.hyperupcall.js')
if (hyperupcallFile) {
	const module = require(hyperupcallFile)
	config = module.prettierOverride?.(config, skipArrayMergeDeep) ?? config
}

export default config
