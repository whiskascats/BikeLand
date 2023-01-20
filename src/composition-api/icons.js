import iconUser from '@/assets/images/here.svg';
import iconGreen from '@/assets/images/bike-position.png'
import iconRed from '@/assets/images/bike-less-position.png'
import iconGray from '@/assets/images/bike-none-position.png'
export default function (type, num) {
  let iconSetting
  if(type === 'users') {
    iconSetting = {
      iconUrl: iconUser,
      iconSize: [29, 38.5],
    }
  }else if (type === 'enough') {
    iconSetting = {
      iconSize: [29, 38.5],
      iconAnchor: [20, 0],
      html: `
      <div>
        <span>${num}</span>
        <img class="w-100" src="${iconGreen}">
      </div>`
    }
  }else if (type === 'no-enough') {
    iconSetting = {
      iconSize: [29, 38.5],
      iconAnchor: [20, 0],
      html: `
      <div>
        <span>${num}</span>
        <img class="w-100" src="${iconRed}">
      </div>`
    }
  } else if (type === 'none') {
    iconSetting = {
      iconSize: [29, 38.5],
      iconAnchor: [20, 0],
      html: `
      <div>
        <span>${num}</span>
        <img class="w-100" src="${iconGray}">
      </div>`
    }
  }
  return iconSetting
}