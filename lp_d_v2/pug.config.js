const url = '/';
const local_url = '/';
const site_name = 'サイト名';
const og_locale = 'jp_JP';
const og_type = 'website';
const twitter_card = 'summary_large_image';
const twitter_site = '@';
const title = {
	'top': 'TOPページのタイトル',
	'about': 'aboutページのタイトル',
};
const description = {
	'top': 'TOPページの説明文',
	'about': 'aboutページの説明文',
};
const ogimg = url + 'img/ogp.png';
const favicon = '/img/favicon.ico';

module.exports = {
	"data": [{
			"id": 'top',
			"name": 'top',
			"url": url,
			"local_url": local_url,
			"title": title['top'],
			"page_title": 'トップページ',
			"level": 1,
			"description": description['top'],
			"keywords": 'test',
			"favicon": favicon,
			"og": {
				"title": title['top'],
				"description": description['top'],
				"image": ogimg,
				"type": og_type,
				"locale": og_locale,
				"siteName": site_name,
				"url": url
			},
			"twitter": {
				"title": title['top'],
				"description": description['top'],
				"image": ogimg,
				"card": twitter_card,
				"site": twitter_site,
				"url": url,
				"text": ''
			},
			"dev_state": 'テストアップ'
		},
		{
			"id": 'about',
			"name": 'about',
			"url": url,
			"local_url": local_url,
			"title": title['about'],
			"page_title": 'アバウトページ',
			"level": 1,
			"description": description['about'],
			"keywords": 'test',
			"favicon": favicon,
			"og": {
				"title": title['about'],
				"description": description['about'],
				"image": ogimg,
				"type": og_type,
				"locale": og_locale,
				"siteName": site_name,
				"url": url
			},
			"twitter": {
				"title": title['about'],
				"description": description['about'],
				"image": ogimg,
				"card": twitter_card,
				"site": twitter_site,
				"url": url,
				"text": ''
			},
			"dev_state": 'テストアップ'
		},
	]
}