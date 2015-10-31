import fabric from 'fabric';

var BCEImage;

/**
 *
 */
BCEImage = class extends fabric.Image {
  /**
   * constructor
   */
  constructor(ratio, {isCentering = false, transformable = false}) {
    var propMap;
    super();
    this.ratio = ratio;
    propMap = transformable ? {
      hasBorders: false,
      hasRotatingPoint: false,
      transparentCorners: false,
      cornerColor: '#a0a0a0',
    } : {
      selectable: false,
    };
    if (isCentering) {
      propMap.originX = propMap.originY = 'center';
    }
    this.update(propMap);
  }
  /**
   * setElement + set + setCoords + renderAll
   */
  update(map) {
    if (map.image) {
      this.setElement(map.image);
      delete map.image;
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
    var image;
    image = new Image();
    image.onload = this.update.bind(this, {
      image: image,
      left: t.positionX * this.ratio,
      top: t.positionY * this.ratio,
      width: t.width * this.ratio,
      height: t.height * this.ratio,
    });
    image.src = t.src;
  }
  /**
   * 入力された情報をレイヤーに反映する
   */
  setValue(value) {
    if (typeof value === 'boolean') {
      this.update({visible: value});
    }
  }
};

export default BCEImage;
