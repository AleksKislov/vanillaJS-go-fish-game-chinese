function resize() {

  //resize footer
  const footerWidth = document.querySelector("footer").offsetWidth;
  let coef = footerWidth/1680

  const ship = document.querySelector('#warship')
  const wavesClass = document.querySelector('.waves')
  const wavesID = document.querySelector('#waves')
  const waterID = document.querySelector('#water')

  ship.style.marginBottom = "" + (coef * 3.4) + "rem"
  wavesClass.style.marginBottom = "" + (coef * 3.7) + "rem"
  wavesID.style.marginBottom = "" + (coef * 3.5) + "rem"

  ship.style.height = "" + (coef * 4.7 + 1) + "rem"
  wavesClass.style.height = "" + (coef * 1 +1) + "rem"
  wavesID.style.height = "" + (coef * 1 +1) + "rem"
  waterID.style.height = "" + (coef * 3.5 +1) + "rem"

  const footerP = document.querySelector('footer').querySelector('p')

  footerP.style.margin = "" + (coef * 1) + "rem"

}