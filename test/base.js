
var colors = {
	c1:'#FFF',
	c2:'#AAA',
	c3:'#222',
	c4:'#777'
}

var classes = {
	bordered: {
		'border': '1px solid',
		'border-radius': '12px',
		'padding': '2px 18px'
	},
	filled: {
		'color':colors.c2,
		'border-color':colors.c2,
		'background':colors.c3
	}
}


JTheme.css({
	'h1': JTheme.rules(classes.bordered,classes.filled),
	'nav': {
		'a.item': JTheme.rules({padding: '8px 4px',display: 'block'}, 
				JTheme.theme('vgradient',{top:colors.c2,bottom:colors.c4}),
				JTheme.theme('boxed',{color:colors.c3,radius:0})
		)
	},
	'section': {
		'.red': JTheme.theme('boxed',{color: 'red'}),
		'.blue': JTheme.theme('boxed',{color: 'blue'})
	}
});
