const url = '/';
const local_url = '/';
const site_name = 'サイト名';
const og_locale = 'jp_JP';
const og_type = 'website';
const twitter_card = 'summary_large_image';
const twitter_site = '@';
const title = {
	'home': 'TOPページのタイトル',
	'about': 'aboutページのタイトル',
	'sitepolicy': 'sitepolicyページのタイトル',
	'privacy': 'privacyページのタイトル'
};
const description = {
	'home': 'TOPページの説明文',
	'about': 'aboutページの説明文',
	'sitepolicy': 'sitepolicyページの説明文',
	'privacy': 'privacyページの説明文'
};
const ogimg = url+'img/ogp.png';
const favicon = '/img/favicon.ico';

module.exports = {
	"data": [
		{
			"name": 'pagelist',
			"url": url + 'pagelist.html',
			"local_url": local_url + 'pagelist.html',
			"title": '画面一覧',
			"page_title": '画面一覧',
			"level": 0,
			"description": '',
			"keywords": '',
			"favicon": favicon,
			"og": {
				"title": '',
				"description": '',
				"image": '',
				"type": og_type,
				"locale": '',
				"siteName": '',
				"url": ''
			},
			"twitter": {
				"title": '',
				"description": '',
				"image": '',
				"card": '',
				"site": '',
				"url": '',
				"text": ''
			},
			"dev_state": ''
		},{
			"name": 'home',
			"url": url,
			"local_url": local_url,
			"title": title['home'],
			"page_title": 'トップページ',
			"level": 1,
			"description": description['home'],
			"keywords": '',
			"favicon": favicon,
			"og": {
				"title": title['home'],
				"description": description['home'],
				"image": ogimg,
				"type": og_type,
				"locale": og_locale,
				"siteName": site_name,
				"url": url
			},
			"twitter": {
				"title": title['home'],
				"description": description['home'],
				"image": ogimg,
				"card": twitter_card,
				"site": twitter_site,
				"url": url,
				"text": ''
			},
			"dev_state": 'テストアップ'
		},{
			"name": 'about',
			"url": url + 'about/index.html',
			"local_url": local_url + 'about/index.html',
			"title": title['about'],
			"page_title": 'アバウト',
			"level": 1,
			"description": description['about'],
			"keywords": '',
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
		},{
			"name": 'sitepolicy',
			"url": url + 'sitepolicy/index.html',
			"local_url": local_url + 'sitepolicy/index.html',
			"title": title['sitepolicy'],
			"page_title": 'サイトポリシー',
			"level": 1,
			"description": description['sitepolicy'],
			"keywords": '',
			"favicon": favicon,
			"og": {
				"title": title['sitepolicy'],
				"description": description['sitepolicy'],
				"image": ogimg,
				"type": og_type,
				"locale": og_locale,
				"siteName": site_name,
				"url": url
			},
			"twitter": {
				"title": title['sitepolicy'],
				"description": description['sitepolicy'],
				"image": ogimg,
				"card": twitter_card,
				"site": twitter_site,
				"url": url,
				"text": ''
			},
			"dev_state": 'テストアップ'
		},{
			"name": 'privacy',
			"url": url + 'privacy/index.html',
			"local_url": local_url + 'privacy/index.html',
			"title": title['privacy'],
			"page_title": 'プライバシーポリシー',
			"level": 1,
			"description": description['privacy'],
			"keywords": '',
			"favicon": favicon,
			"og": {
				"title": title['privacy'],
				"description": description['privacy'],
				"image": ogimg,
				"type": og_type,
				"locale": og_locale,
				"siteName": site_name,
				"url": url
			},
			"twitter": {
				"title": title['privacy'],
				"description": description['privacy'],
				"image": ogimg,
				"card": twitter_card,
				"site": twitter_site,
				"url": url,
				"text": ''
			},
			"dev_state": 'テストアップ'
		}
	]
}