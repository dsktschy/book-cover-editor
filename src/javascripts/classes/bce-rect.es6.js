import fabric from 'fabric';

var BCERect;

/**
 * BCE用に拡張したfabric.Rectクラス
 * @exports
 */
BCERect = class extends fabric.Rect {
  /**
   * constructor
   * @param {number} ratio
   * @param {Object}
   */
  constructor(ratio, {outputSize: {width, height}}) {
    super();
    this.ratio = ratio;
    this.outputWidth = width;
    this.outputHeight = height;
    this.update({selectable: false});
  }
  /**
   * set + setCoords + renderAll
   * @param {Object} map
   */
  update(map) {
    this
      .set(map)
      .setCoords();
    if (this.canvas) {
      this.canvas.renderAll();
    }
  }
  /**
   * レイヤーにテンプレート情報をセットする
   * @param {Object} t 表紙テンプレートオブジェクトの該当レイヤー属性
   */
  setTemplate(t) {
    this.update({
      left: 0,
      top: t.height * this.ratio,
      width: this.outputWidth * this.ratio,
      height: this.outputHeight * this.ratio - t.height * this.ratio,
      fill: t.color,
    });
  }
  /**
   * 入力された情報をレイヤーに反映する
   * @param {boolean} value
   */
  setValue(value) {
    this.update({visible: value});
  }
};

export default BCERect;
