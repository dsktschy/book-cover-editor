import fabric from 'fabric';

var BCEImage, fileReader;

fileReader = new FileReader();

/**
 * BCE用に拡張したfabric.Imageクラス
 * @exports
 */
BCEImage = class extends fabric.Image {
  /**
   * constructor
   * @param {number} ratio
   * @param {Object}
   */
  constructor(ratio, {isCentering = false, transformable = false}) {
    var propMap;
    super();
    this.ratio = ratio;
    this.isDefault = true;
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
   * @param {Object} map
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
    var propMap;
    propMap = {
      left: t.positionX * this.ratio,
      top: t.positionY * this.ratio,
      width: t.width * this.ratio,
      height: t.height * this.ratio,
    };
    if (!this.isDefault) {
      this.update(propMap);
      return;
    }
    propMap.image = new Image();
    propMap.image.onload = this.update.bind(this, propMap);
    propMap.image.src = t.src;
  }
  /**
   * 入力された情報をレイヤーに反映する
   * @param {*} value
   */
  setValue(value) {
    var image;
    if (typeof value === 'boolean') {
      this.update({visible: value});
      return;
    }
    fileReader.onload = (event) => {
      image = new Image();
      image.onload = () => {
        this.update({image: image});
        this.isDefault = false;
      };
      image.src = event.target.result;
    };
    fileReader.readAsDataURL(value);
  }
};

export default BCEImage;
