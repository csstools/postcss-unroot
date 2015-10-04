var postcss = require('postcss');
var parser  = require('postcss-selector-parser');

module.exports = postcss.plugin('postcss-unroot', function (opts) {
	var method = opts && /^(copy|warn)$/.test(opts.method) ? opts.method : 'replace';

	return function (css, result) {
		css.walkRules(function (rule) {
			if (rule.selector.indexOf(':root') !== -1) {
				var parsedSelector = parser(function (selectors) {
					selectors.each(function (selector) {
						selector.eachPseudo(function (pseudo) {
							if (pseudo.value === ':root') {
								if (method === 'warn') result.warn(':root detected', { node: rule });
								else {
									var nodes = pseudo.parent.nodes;
									var index = -1;
									var node;
									var hasTag;

									while (node = nodes[++index]) {
										if (node.type === 'tag') hasTag = true;

										if (hasTag || node === pseudo || node.type === 'combinator') break;
									}

									if (!hasTag) pseudo.replaceWith(parser.tag({ value: 'html' }));
									else pseudo.removeSelf();
								}
							}
						});
					});
				}).process(rule.selector).result;

				if (parsedSelector !== rule.selector) {
					if (method === 'copy') rule.parent.insertBefore(rule, rule.clone({
						selector: parsedSelector
					}));
					else if (method === 'replace') rule.selector = parsedSelector;
				}
			}
		});
	};
});
