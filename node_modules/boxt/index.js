const chalk = require('chalk');
const arrayOf = require('./lib/arrayOf');
const length = require('./lib/length');
const maxLength = require('./lib/maxLength');
const themes = require('./themes.json');

/**
 * default boxedOptions colour
 * @type {String}
 */
const BOX_COLOR = 'yellow';

/**
 * default boxedOptions padding
 * @type {Number}
 */
const PADDING = 2;

/**
 * default boxedOptions theme
 * @type {String}
 */
const THEME = 'single';

/**
 * default align value
 * @type {String}
 */
const ALIGN = 'center';

/**
 * @typedef boxedOptions
 * @type {Object}
 * @property {string} [color='yellow']
 * @property {number} [padding=2]
 * @property {string} [theme='single']
 * @property {string} [align='center']
 * @property {string} [title]
 */

/**
 * Box a message (visually)
 * @param  {string} message
 * @param  {boxedOptions} options
 * @return {string}
 *
 * @example
 * boxt('Celebrate what you want to see more of');
 *
 * ┌──────────────────────────────────────────┐
 * │                                          │
 * │  Celebrate what you want to see more of  │
 * │                                          │
 * └──────────────────────────────────────────┘
 */
module.exports = function boxed(message, {
	color = BOX_COLOR,
	padding = PADDING,
	theme = THEME,
	align = ALIGN,
	minWidth = 0,
	title,
} = {}) {

	if (typeof chalk[color] !== 'function') {
		throw new Error(`unsupported color "${color}"`);
	}
	if (!Object.prototype.hasOwnProperty.call(themes, theme)) {
		throw new Error(`themes do not include a "${theme}" theme`);
	}

	const lines = message.split('\n');
	const width = minWidth === 'full'
		?	process.stdout.columns - 2 - padding * 2
		: Math.max(
			Number(minWidth) - 2 - padding * 2,
			maxLength(title, ...message.split('\n')),
		)
	;
	const space = width + padding * 2;
	const times = (string = ' ', length = space) => arrayOf(string, length);

	// Themed borders
	const [
		h,
		v,
		tl,
		tr,
		bl,
		br,
		ml,
		mr,
	] = [
		'h',
		'v',
		'tl',
		'tr',
		'bl',
		'br',
		'ml',
		'mr',
	].map(item => chalk[color](themes[theme][item]));

	const lineMap = line => {
		const w = width + line.length - length(line); // white space width including style chars

		const content = (() => {
			switch (align) {
				case 'left':
				case 'start':
					return line.padEnd(w, ' ');
				case 'right':
				case 'end':
					return line.padStart(w, ' ');
				case 'center':
				default:
					return line.padEnd(Math.ceil(w - (w - length(line)) / 2), ' ').padStart(w, ' ');
			}
		})();

		return [
			v,
			times(' ', padding),
			content,
			times(' ', padding),
			v,
		];
	};

	const titleLines = title ? [
		lineMap(title),
		[ v, times(' '), v ],
		[ ml, times(h), mr ],
		[ v, times(' '), v ],
	] : [];

	return [
		[ '' ],
		[ tl, times(h), tr ],
		[ v, times(' '), v ],
		...titleLines,
		...lines.map(lineMap),
		[ v, times(' '), v ],
		[ bl, times(h), br ],
		[ '' ],
	].map(item => item.join('')).join('\n');
};
