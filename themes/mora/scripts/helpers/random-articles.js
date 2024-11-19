'use strict'

hexo.extend.generator.register('thePosts', function(locals) {
	const jsonData = locals.posts
		.filter(post => post.random !== false)
		.map(post => {
			const date = new Date(post.date);
			const categories = post.categories.map(category => category.name);
            const formattedDate = date.toISOString().split('T')[0];
			return {
				title: post.title || "暂无标题",
				time: formattedDate,
				categories: categories[0],
				description: post.description || "暂无简介",
                link: post.permalink.replace(/^(?:\/\/|[^/]+)*\//, '/')
			};
		});

	return {
		path: 'articles-random.json',
		data: JSON.stringify(jsonData)
	};
});