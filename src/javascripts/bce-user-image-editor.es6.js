import $ from 'jquery';

const
  /** このモジュールに結びつく要素のセレクター */
  SELF_SELECTOR = '#user-image-editor';

var init, $cache, set$cache, onClickInput, onChangeInputHidden;

/**
 * jqueryオブジェクトを保持
 */
set$cache = () => {
  $cache = {
    self: $(SELF_SELECTOR),
    window: $(window),
    input: $(SELF_SELECTOR).find('input[type=button]'),
    inputHidden: $(SELF_SELECTOR).find('input[type=file]'),
  };
};

/**
 * 変更ボタン押下時のハンドラー
 */
onClickInput = () => {
  $cache.inputHidden.trigger('click');
};

/**
 * 画像選択完了時のハンドラー
 */
onChangeInputHidden = () => {
  if (!$cache.inputHidden.prop('files').length) {
    return false;
  }
  $cache.window.trigger(
    'input-value.userImage',
    $cache.inputHidden.prop('files')[0]
  );
  return false;
};

/**
 * module起動
 *   on('change')だと検知されないためchangeを使用
 * @exports
 */
init = () => {
  set$cache();
  $cache.input.on('click', onClickInput);
  $cache.inputHidden.change(onChangeInputHidden);
  $cache.window.on('apply-data', onChangeInputHidden);
};

export default {
  init,
};
