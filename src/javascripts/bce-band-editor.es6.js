import $ from 'jquery';

const
  /** このモジュールに結びつく要素のセレクター */
  SELF_SELECTOR = '#band-editor';

var init, $cache, set$cache, onChangeInput;

/**
 * jqueryオブジェクトを保持
 */
set$cache = () => {
  $cache = {
    self: $(SELF_SELECTOR),
    window: $(window),
    input: $(SELF_SELECTOR).find('input'),
  };
};

/**
 * トグル切り替え時のハンドラー
 */
onChangeInput = () => {
  $cache.window.trigger('change-input.band', $cache.input.prop('checked'));
};

/**
 * module起動
 * @exports
 */
init = () => {
  set$cache();
  $cache.input.on('change', onChangeInput);
  $cache.window.on('apply-data', onChangeInput);
};

export default {
  init,
};
