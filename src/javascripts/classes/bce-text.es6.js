import fabric from 'fabric';

const BG_COLOR_HEIGHT_MAX = 1.25;

var BCEText;

/**
 * BCE用に拡張したfabric.Textクラス
 * @exports
 */
BCEText = class extends fabric.Text {
  /**
   * constructor
   * @param {number} ratio
   */
  constructor(ratio) {
    super('');
    this.ratio = ratio;
    this.update({
      selectable: false,
      textBackgroundColorHeightMax: BG_COLOR_HEIGHT_MAX,
    });
  }
  /**
   * set + setCoords + renderAll
   * @param {Object} map
   */
  update(map) {
    if (map.text) {
      this.setText(map.text);
      delete map.text;
    }
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
    var
      lineMax, lineWidth, remainder, lineHeight, writingMode, originX,
      textAlign;
    if (t.vertical) {
      lineMax = Math.floor(t.width / t.fontSize) || 1;
      lineWidth = t.height * this.ratio;
      remainder = t.width % t.fontSize;
      writingMode = 'tb';
      originX = textAlign = 'left';
    } else {
      lineMax = Math.floor(t.height / t.fontSize) || 1;
      lineWidth = t.width * this.ratio;
      remainder = t.height % t.fontSize;
      writingMode = 'lr';
      originX = textAlign = t.align;
    }
    lineHeight = (t.fontSize + remainder / lineMax) / t.fontSize;
    this.update({
      left: t.positionX * this.ratio,
      top: t.positionY * this.ratio,
      fill: t.color,
      textBackgroundColor: t.bgColor,
      fontSize: t.fontSize * this.ratio,
      fontFamily: t.fontFamily,
      lineMax,
      lineWidth,
      lineHeight,
      writingMode,
      originX,
      textAlign,
      // 再現公開用。本番ではweightを限定したwebfontを使用
      fontWeight: t.fontWeight,
    });
  }
  /**
   * 入力された情報をレイヤーに反映する
   * @param {*} value
   */
  setValue(value) {
    var key;
    key = typeof value === 'boolean' ? 'visible' : 'text';
    this.update({[key]: value});
  }
};

export default BCEText;
