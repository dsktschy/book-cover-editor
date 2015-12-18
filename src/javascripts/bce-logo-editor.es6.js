import $ from 'jquery';

const
  /** このモジュールに結びつく要素のセレクタ */
  SELF_SELECTOR = '#logo-editor';

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
 * トグル切り替え時のハンドラ
 */
onChangeInput = () => {
  $cache.window.trigger('input-value.logo', $cache.input.prop('checked'));
};

/**
 * module起動
 * @exports
 */
init = () => {
  set$cache();
  $cache.input.on('change', onChangeInput);
  $cache.window.on('get-data', onChangeInput);
};

export default {
  init,
};
