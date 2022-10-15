import { format, formatDistanceToNowStrict, isToday, isYesterday } from "date-fns";
import { ru } from "date-fns/locale";


export const BASEURL= 'https://norma.nomoreparties.space/api';

export const wsUrl = 'wss://norma.nomoreparties.space/orders';

export function checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  } 
  export const burgerBoilerplate = [
    {"_id":"60d3b41abdacab0026a733c6","name":"Краторная булка N-200i","type":"bun","proteins":80,"fat":24,"carbohydrates":53,"calories":420,"price":1255,"image":"https://code.s3.yandex.net/react/code/bun-02.png","image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png","image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png","__v":0},
    {"_id":"60d3b41abdacab0026a733c8","name":"Филе Люминесцентного тетраодонтимформа","type":"main","proteins":44,"fat":26,"carbohydrates":85,"calories":643,"price":988,"image":"https://code.s3.yandex.net/react/code/meat-03.png","image_mobile":"https://code.s3.yandex.net/react/code/meat-03-mobile.png","image_large":"https://code.s3.yandex.net/react/code/meat-03-large.png","__v":0},
    {"_id":"60d3b41abdacab0026a733ce","name":"Соус традиционный галактический","type":"sauce","proteins":42,"fat":24,"carbohydrates":42,"calories":99,"price":15,"image":"https://code.s3.yandex.net/react/code/sauce-03.png","image_mobile":"https://code.s3.yandex.net/react/code/sauce-03-mobile.png","image_large":"https://code.s3.yandex.net/react/code/sauce-03-large.png","__v":0},
  ]

  export function getCookie(name) {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  
  export function setCookie(name, value, props) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
      const d = new Date();
      d.setTime(d.getTime() + exp * 1000);
      exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
      props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
      updatedCookie += '; ' + propName;
      const propValue = props[propName];
      if (propValue !== true) {
        updatedCookie += '=' + propValue;
      }
    }
    document.cookie = updatedCookie;
  }

  
  
  export function deleteCookie(name) {
    setCookie(name, null, { expires: -1 });
  }

  export function getStorageItem(token) {
    return JSON.parse(localStorage.getItem(token));
  }

  export const placeOrderDate = (date) => {

    const dateCreatedAt = new Date(date);
  
    const day = isToday(dateCreatedAt)
      ? 'Сегодня'
      : isYesterday(dateCreatedAt)
      ? 'Вчера'
      : formatDistanceToNowStrict(dateCreatedAt, {
          unit: 'day',      // кол-во дней, если не 'сегодня-вчера'
          addSuffix: true, // 'назад'
          locale: ru,
        });
  
    const hours = format(dateCreatedAt, 'p', {locale: ru}); //24-ч 'русская' система
  
    return `${day}, ${hours} i-GMT+3`;
  };