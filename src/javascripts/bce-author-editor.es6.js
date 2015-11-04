import $ from 'jquery';

const
  /** このモジュールに結びつく要素のセレクター */
  SELF_SELECTOR = '#author-editor';

var init, $cache, set$cache, onClickInput;

/**
 * jqueryオブジェクトを保持
 */
set$cache = () => {
  $cache = {
    self: $(SELF_SELECTOR),
    window: $(window),
    input: $(SELF_SELECTOR).find('#inputAuthorButton'),
    lastNameInput: $(SELF_SELECTOR).find('#inputLastNameArea'),
    firstNameInput: $(SELF_SELECTOR).find('#inputFirstNameArea'),
  };
};

/**
 * 追加ボタン押下時のハンドラー
 */
onClickInput = () => {
  var lastName, firstName, value;
  lastName = $cache.lastNameInput.val();
  firstName = $cache.firstNameInput.val();
  value = lastName
    ? (firstName ? `${lastName} ${firstName}` : lastName)
    : (firstName ? firstName : '');
  $cache.window.trigger('input-value.author', value);
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
