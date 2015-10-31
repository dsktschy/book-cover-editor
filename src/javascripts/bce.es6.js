import $ from 'jquery';
import _bceDataFake from './bce-data-fake';
import bceModel from './bce-model';
import bceCoverPreview from './bce-cover-preview';
import bceTemplateSelector from './bce-template-selector';
import bceBandEditor from './bce-band-editor';
import bceLogoEditor from './bce-logo-editor';

var init, bceData, set$cache, $cache, onSelectTemplate;

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
 * module起動
 * @exports
 */
init = () => {
  set$cache();
  $cache.window.on('select-template', onSelectTemplate);
  bceData = _bceDataFake;
  bceData.init();
  bceModel.init(bceData);
  bceCoverPreview.init(bceModel);
  bceTemplateSelector.init();
  bceBandEditor.init();
  bceLogoEditor.init();
};

export default {
  init,
};
