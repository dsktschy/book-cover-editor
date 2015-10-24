import $ from 'jquery';
import fabric from 'fabric';

const
  /** このモジュールに結びつく要素のセレクター */
  SELF_SELECTOR = '#box-edit-cover',
  /** canvas要素のID */
  CANVAS_ID = 'cover';

var init, $cache, set$cache, cover;

/**
 * jqueryオブジェクトを保持
 */
set$cache = () => {
  $cache = {
    self: $(SELF_SELECTOR),
    window: $(window),
    boxCoverImg: $('#box-cover-img'),
  };
};

/**
 * module起動
 * @exports
 */
init = () => {
  var apiURL;
  set$cache();
  cover = new fabric.Canvas(CANVAS_ID);
  apiURL = $cache.boxCoverImg.data('cover-json-url');
  $cache.window.trigger('select-template', apiURL);
};

export default {
  init,
};
