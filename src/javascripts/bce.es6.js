import $ from 'jquery';
import _bceDataFake from './bce-data-fake';
import bceModel from './bce-model';
import bceCoverPreview from './bce-cover-preview';
import bceTemplateSelector from './bce-template-selector';
import bceTitleEditor from './bce-title-editor';
import bceAuthorEditor from './bce-author-editor';
import bceUserImageEditor from './bce-user-image-editor';
import bceBandEditor from './bce-band-editor';
import bceBandTextEditor from './bce-band-text-editor';
import bceLogoEditor from './bce-logo-editor';
import bceGenerateButton from './bce-generate-button';
import bceModalWindow from './bce-modal-window';

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
  bceTitleEditor.init();
  bceAuthorEditor.init();
  bceUserImageEditor.init();
  bceBandEditor.init();
  bceBandTextEditor.init();
  bceLogoEditor.init();
  bceGenerateButton.init();
  bceModalWindow.init();
};

export default {
  init,
};
