import fabric from 'fabric';
import BCEImage from './bce-image';
import BCEText from './bce-text';
import BCERect from './bce-rect';

const
  /** 生成される表紙画像の幅 */
  OUTPUT_WIDTH = 1536,
  /** 生成される表紙画像の高さ */
  OUTPUT_HEIGHT = 2048,
  /** レイヤークラスを動的に決定するためのオブジェクト */
  LAYER_CLASS_MAP = {BCEImage, BCEText, BCERect},
  /** 保持するレイヤーの重なり順と情報 */
  LAYER_PARAM_MAPS = [
    {
      name: 'userImage',
      className: 'BCEImage',
      optionMap: {transformable: true},
    },
    {
      name: 'frameImage',
      className: 'BCEImage',
      optionMap: {},
    },
    {
      name: 'title',
      className: 'BCEText',
      optionMap: {},
    },
    {
      name: 'author',
      className: 'BCEText',
      optionMap: {},
    },
    {
      name: 'band',
      className: 'BCERect',
      optionMap: {outputSize: {width: OUTPUT_WIDTH, height: OUTPUT_HEIGHT}},
    },
    {
      name: 'bandText',
      className: 'BCEText',
      optionMap: {},
    },
    {
      name: 'logo',
      className: 'BCEImage',
      optionMap: {isCentering: true},
    },
  ],
  LAYER_INDEX_MAP = {
    userImage: 0,
    frameImage: 1,
    title: 2,
    author: 3,
    band: 4,
    bandText: 5,
    logo: 6,
  };

var BCECover;

/**
 * BCE用に拡張したfabric.Canvasクラス
 * @exports
 */
BCECover = class extends fabric.Canvas {
  /**
   * constructor
   */
  constructor($canvas, ratio) {
    var canvasHeight, defaultRatio;
    super($canvas[0], {perPixelTargetFind: true});
    canvasHeight = $canvas.attr('height');
    defaultRatio = Math.floor(canvasHeight / OUTPUT_HEIGHT * 10000) / 10000;
    this.ratio = ratio || defaultRatio;
    for (let {className, optionMap} of LAYER_PARAM_MAPS) {
      this.add(new LAYER_CLASS_MAP[className](this.ratio, optionMap));
    }
  }
  /**
   * 全レイヤーにテンプレート情報をセットする
   */
  setTemplate(template) {
    for (let i = 0; i < LAYER_PARAM_MAPS.length; i++) {
      this.item(i).setTemplate(template[LAYER_PARAM_MAPS[i].name]);
    }
  }
  /**
   * 指定レイヤーに値を反映する
   */
  setToLayer(name, value) {
    this.item(LAYER_INDEX_MAP[name]).setValue(value);
  }
  /**
   * 帯を表示しているかどうか
   */
  hasBand() {
    return this.item(LAYER_INDEX_MAP.band).get('visible');
  }
  /**
   * 画像化する
   */
  generate(callback) {
    var image;
    image = new Image();
    image.onload = callback.bind(null, image);
    image.src = this.toDataURL({
      multiplier: Math.floor(1 / this.ratio * 10000) / 10000,
    });
  }
};

export default BCECover;
