import $ from 'jquery';

var
  init, bceData, getData, onSuccessToGetParsedData, onErrorToGetParsedData,
  set$cache, $cache, template, getTemplate;

/**
 * jqueryオブジェクトを保持
 */
set$cache = () => {
  $cache = {
    window: $(window),
  };
};

/**
 * データ取得成功時のコールバック
 */
onSuccessToGetParsedData = (data) => {
  // 本来はここで受け取ったJSONが不正でないかチェック
  template = data;
  $cache.window.trigger('get-data');
};

/**
 * データ取得失敗時のコールバック
 */
onErrorToGetParsedData = (e) => {
  console.log(e);
};

/**
 * データ取得開始
 * @exports
 */
getData = (apiURL) => {
  bceData.getParsedData(
    apiURL,
    onSuccessToGetParsedData,
    onErrorToGetParsedData
  );
};

/**
 * 表紙テンプレート情報を返す
 *   templateを書き換えられないようコピーを返す
 * @exports
 */
getTemplate = () => $.extend(true, {}, template) || {};

/**
 * module起動
 * @exports
 */
init = (dataMod) => {
  set$cache();
  bceData = dataMod;
};

export default {
  init,
  getData,
  getTemplate,
};
