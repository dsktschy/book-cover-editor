import $ from 'jquery';
import _bceDataFake from './bce-data-fake';
import bceModel from './bce-model';
import bceCoverPreview from './bce-cover-preview';
import bceTemplateSelector from './bce-template-selector';

var init, bceData, set$cache, $cache, onApplyData, onSelectTemplate;

/**
 * jqueryオブジェクトを保持
 */
set$cache = () => {
  $cache = {
    window: $(window),
    coverThumb: $('.cover-thumb'),
  };
};

/**
 * 表紙テンプレートが選択された時のコールバック
 */
onSelectTemplate = (event, apiURL) => {
  bceModel.applyData(apiURL);
};

/**
 * データ取得完了時のコールバック
 */
onApplyData = (event) => {

};

/**
 * module起動
 * @exports
 */
init = () => {
  set$cache();
  $cache.window.on('select-template', onSelectTemplate);
  $cache.window.on('apply-data', onApplyData);
  bceData = _bceDataFake;
  bceData.init();
  bceModel.init(bceData);
  bceCoverPreview.init();
  bceTemplateSelector.init();
};

export default {
  init,
};
