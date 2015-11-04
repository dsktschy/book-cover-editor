import $ from 'jquery';

const
  /** このモジュールに結びつく要素のセレクター */
  SELF_SELECTOR = '#band-text-editor';

var init, $cache, set$cache, onClickInput;

/**
 * jqueryオブジェクトを保持
 */
set$cache = () => {
  $cache = {
    self: $(SELF_SELECTOR),
    window: $(window),
    input: $(SELF_SELECTOR).find('input'),
    textarea: $(SELF_SELECTOR).find('textarea'),
  };
};

/**
 * 追加ボタン押下時のハンドラー
 */
onClickInput = () => {
  $cache.window.trigger('input-value.bandText', $cache.textarea.val());
};

/**
 * module起動
 * @exports
 */
init = () => {
  set$cache();
  $cache.input.on('click', onClickInput);
  $cache.window.on('get-data', onClickInput);
};

export default {
  init,
};
