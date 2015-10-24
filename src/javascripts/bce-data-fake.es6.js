import $ from 'jquery';

const
  /** FAKE_DATAを定義するjsファイルのindex.htmlからの相対パス */
  SRC = 'javascripts/fake-data.js',
  /** SRCを読み込むためのscriptタグ */
  HTML = `<script type="text/javascript" src="${SRC}"></script>`,
  /** 本来のデータ取得処理を模倣するための応答遅延時間(msec) */
  DELAY = 1000;

var init, getParsedData;

/**
 * データ取得とパースを模倣する
 * @exports
 */
getParsedData = (url, onSuccess, onError) => {
  var splitedURL, num;
  splitedURL = url.split('/');
  num = splitedURL[splitedURL.length - 2];
  setTimeout(onSuccess.bind(null, FAKE_DATA[num - 1]), DELAY);
};

/**
 * module起動
 *   grobalに変数FAKE_DATAを生成するscriptタグを追加
 *   ブラウザから非推奨の注意文言が出るがデバッグ時限定のためよしとする
 * @exports
 */
init = () => {
  $('head').append(HTML);
};

export default {
  init,
  getParsedData,
};
