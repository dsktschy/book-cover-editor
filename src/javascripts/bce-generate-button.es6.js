import $ from 'jquery';

const
  /** このモジュールに結びつく要素のセレクター */
  SELF_SELECTOR = '#btn-to-edit-books, #box-cover-submit';

var init, $cache, set$cache, onClickInput;

/**
 * jqueryオブジェクトを保持
 */
set$cache = () => {
  $cache = {
    self: $(SELF_SELECTOR),
    window: $(window),
    input: $(SELF_SELECTOR).find('button, input'),
  };
};

/**
 * ボタン押下時のハンドラー
 */
onClickInput = () => {
  $cache.window.trigger('click-generate-button');
};

/**
 * module起動
 * @exports
 */
init = () => {
  set$cache();
  $cache.input.on('click', onClickInput);
};

export default {
  init,
};
