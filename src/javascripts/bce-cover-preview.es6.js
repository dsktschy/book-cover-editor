import $ from 'jquery';
import BCECover from './bce-cover';

const
  /** このモジュールに結びつく要素のセレクター */
  SELF_SELECTOR = '#box-edit-cover';

var init, $cache, set$cache, cover, onApplyData, bceModel, onInputValue;

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
 * ユーザー入力へのコールバック
 */
onInputValue = (event, value) => {
  cover.setToLayer(event.namespace, value);
  if (event.namespace === 'band' || event.namespace === 'bandText') {
    cover.setToLayer('bandText', cover.hasBand());
  }
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
  $cache.window
    .on('apply-data', onApplyData)
    .on('input-value.title.author.userImage.band.bandText.logo', onInputValue)
    .trigger('select-template', apiURL);
};

export default {
  init,
};
