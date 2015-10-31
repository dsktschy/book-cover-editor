import $ from 'jquery';
import BCECover from './bce-cover';

const
  /** このモジュールに結びつく要素のセレクター */
  SELF_SELECTOR = '#box-edit-cover';

var init, $cache, set$cache, cover, onApplyData, bceModel, onChangeInput;

/**
 * jqueryオブジェクトを保持
 */
set$cache = () => {
  $cache = {
    self: $(SELF_SELECTOR),
    window: $(window),
    boxCoverImg: $(SELF_SELECTOR).find('#box-cover-img'),
    canvas: $(SELF_SELECTOR).find('canvas'),
  };
};

/**
 * データ取得完了時のコールバック
 */
onApplyData = (event) => {
  cover.setTemplate(bceModel.getTemplate());
};

/**
 * トグルが切り替えられた時のコールバック
 */
onChangeInput = (event, value) => {
  cover.setToLayer(event.namespace, value);
};

/**
 * module起動
 * @exports
 */
init = (modelMod) => {
  var apiURL;
  bceModel = modelMod;
  set$cache();
  cover = new BCECover($cache.canvas);
  apiURL = $cache.boxCoverImg.data('cover-json-url');
  $cache.window.on('apply-data', onApplyData);
  $cache.window.on('change-input.band.logo', onChangeInput);
  $cache.window.trigger('select-template', apiURL);
};

export default {
  init,
};
