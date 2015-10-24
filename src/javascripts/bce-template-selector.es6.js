import $ from 'jquery';

const
  /** このモジュールに結びつく要素のセレクター */
  SELF_SELECTOR = '#box-cover-list';

var init, $cache, set$cache, onClickCoverThumb;

/**
 * jqueryオブジェクトを保持
 */
set$cache = () => {
  $cache = {
    self: $(SELF_SELECTOR),
    window: $(window),
    coverThumb: $(SELF_SELECTOR).find('.cover-thumb'),
  };
};

/**
 * 表紙サムネイルクリック時のハンドラー
 */
onClickCoverThumb = (event) => {
  var apiURL;
  apiURL = $(event.target).data('cover-json-url');
  $cache.window.trigger('select-template', apiURL);
};

/**
 * module起動
 * @exports
 */
init = () => {
  set$cache();
  $cache.coverThumb.on('click', onClickCoverThumb);
};

export default {
  init,
};
