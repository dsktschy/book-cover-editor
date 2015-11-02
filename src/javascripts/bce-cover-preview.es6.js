import $ from 'jquery';
import BCECover from './bce-cover';

const
  /** このモジュールに結びつく要素のセレクター */
  SELF_SELECTOR = '#box-edit-cover';

var
  init, $cache, set$cache, cover, onApplyData, bceModel, onInputValue,
  onClickGenerateButton, onGenerate;

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
onApplyData = () => {
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
 * 画像生成ボタンクリック時のコールバック
 */
onClickGenerateButton = () => {
  cover.generate(onGenerate);
};

/**
 * 画像生成完了時のコールバック
 */
onGenerate = (image) => {
  $cache.window.trigger('generate', image);
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
    .on('click-generate-button', onClickGenerateButton)
    .trigger('select-template', apiURL);
};

export default {
  init,
};