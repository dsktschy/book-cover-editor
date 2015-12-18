import $ from 'jquery';

const
  /** このモジュールに結びつく要素のセレクタ */
  SELF_SELECTOR = '#modal',
  /** 親要素のheightに対するcontent要素のheightの割合(小数) */
  HEIGHT_RATIO = 0.8,
  /** 親要素のheightに対するcontent要素のwidthの割合(小数) */
  WIDTH_RATIO = HEIGHT_RATIO * 0.75,
  /** onResizeの遅延時間(ms) */
  RESIZE_DELAY = 50;

var init, $cache, set$cache, onGenerate, onClick, onResize, timeoutID;

/**
 * jqueryオブジェクトを保持
 */
set$cache = () => {
  $cache = {
    self: $(SELF_SELECTOR),
    window: $(window),
    shade: $(SELF_SELECTOR).find('.shade'),
    content: $(SELF_SELECTOR).find('.content'),
  };
};

/**
 * クリック時のハンドラ
 */
onClick = () => {
  $cache.window.off('resize');
  $cache.shade.css('display', 'none');
  $cache.content
    .css('display', 'none')
    .empty();
};

/**
 * 画像生成完了時のコールバック
 * @param {Object} event
 * @param {Object} image
 */
onGenerate = (event, image) => {
  $cache.shade.css('display', 'block');
  $cache.content
    .css({
      display: 'block',
      width: `${$cache.window.height() * WIDTH_RATIO}px`,
    })
    .append(image);
  $cache.window.on('resize', onResize);
};

/**
 * ウインドウリサイズ時のハンドラ
 */
onResize = () => {
  clearTimeout(timeoutID);
  timeoutID = setTimeout(() => {
    $cache.content.css('width', `${$cache.window.height() * WIDTH_RATIO}px`);
  }, RESIZE_DELAY);
};

/**
 * module起動
 * @exports
 */
init = () => {
  set$cache();
  $cache.self.on('click', onClick);
  $cache.window.on('generate', onGenerate);
  $cache.content.css('height', `${100 * HEIGHT_RATIO}%`);
};

export default {
  init,
};
