(function(){
	var buildCss = function(selector, css) {
		var sheet = '';
		for(sel in css) {
			if(typeof css[sel] == 'function') {
				sheet += css[sel](selector + ' ' + sel);
			} else {
				sheet += buildCss(selector + ' ' + sel, css[sel]);
			}
			
		}
		return sheet;
	}
	var buildRules = function(selector, rules) {
		var sheet = selector + '{';
		for(prop in rules) {
			if(rules[prop] instanceof Array) {
				for(var i in rules[prop]) {
					sheet += prop + ':' + rules[prop][i] + ';';
				}
			} else {
				sheet += prop + ':' + rules[prop] + ';';
			}
		}
		return sheet + '}\n';
	}
	
	var merge = function(o1,o2) {
		for (var k in o2) {
			if(!(k in o1)) {
				o1[k] = o2[k];
			}
		}
	}
	
	var themes = {};
	
	JTheme = {
		css:function(css,hash) {
			// var document = doc || window.document;
			var sheet = document.createElement('style');

			if(hash && window.localstorage) {
				sheet.innerHTML = window.localstorage.getItem('jtheme_' + hash);
			}
			
			sheet.innerHTML = buildCss('', css);
			
			if(hash && window.localstorage) {
				window.localstorage.setItem('jtheme_' + hash, sheet.innerHTML);
			}
			document.head.appendChild(sheet);
		},

		registerTheme:function(id,func) {
			themes[id] = func;
		},
		theme:function(id,opts) {
			return themes[id](opts);
		},
		rules:function() {
			args = Array.prototype.slice.call(arguments,0);
			var rules = args.shift();
			var bound = function(selector) {
				return buildRules(selector, rules);
			}
			while(args.length) {
				(function() {
					var a = args.shift();
					if(typeof a === 'function') {
						var old = bound;
							console.log(a)
						bound = function(selector) {
							return old(selector) + a(selector);
						}
					} else {
						merge(rules, a);
					}
				}());
			}
			return bound;
		}
	}
}())

JTheme.registerTheme('boxed', function(opts) {
	return JTheme.rules(
		JTheme.theme('rounded', {radius: opts.radius}),
		{
			'border': '1px solid ' + opts.color
		}
	);
});

JTheme.registerTheme('vgradient', function(opts) {
	var effect = [];
	effect.push('linear-gradient(top, ' + opts.top + ', ' + opts.bottom + ')');
	effect.push('-webkit-linear-gradient(top, ' + opts.top + ', ' + opts.bottom + ')');
	effect.push('-moz-linear-gradient(top, ' + opts.top + ', ' + opts.bottom + ')');
	effect.push('-ms-linear-gradient(top, ' + opts.top + ', ' + opts.bottom + ')');
	effect.push('-op-linear-gradient(top, ' + opts.top + ', ' + opts.bottom + ')');
	return JTheme.rules({
		'background-image': effect
	});
});

JTheme.registerTheme('rounded', function(opts) {
	return JTheme.rules({
		'border-radius': opts.radius + 'px'
	});
});

