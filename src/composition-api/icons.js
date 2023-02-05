import iconUser from '@/assets/images/here.svg';
import iconGreen from '@/assets/images/bike-position.png';
import iconRed from '@/assets/images/bike-less-position.png';
import iconGray from '@/assets/images/bike-none-position.png';
import iconRoute from '@/assets/images/route-icon.png';
export default function (type, num) {
  let iconSetting
  if(type === 'users') {
    iconSetting = {
      iconUrl: iconUser,
      iconSize: [38.5, 38.5],
      iconAnchor: [18, 12],
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
  } else if (type === 'route') {
    iconSetting = {
      iconUrl: iconRoute,
      iconSize: [29, 38.5],
      iconAnchor: [15, 40],
      popupAnchor: [-1, -35],
    }
  }
  return iconSetting
}