import { renderBlock } from './lib';
import { dateToLocaleString } from './utils/date-helper';
import { search } from './search';

export function putSearchForm(inDate?: Date, outDate?: Date): void {
  const nowDate = new Date();
  const maxDate = new Date(nowDate.getFullYear(), nowDate.getMonth() + 2, 0);
  if (!inDate) {
    inDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1);
  }
  if (!outDate) {
    outDate = new Date(inDate.getFullYear(), inDate.getMonth(), inDate.getDate() + 2);
  }
  renderSearchFormBlock(inDate, outDate, nowDate, maxDate);
  document.querySelector('search-form')?.addEventListener('submit', search);
}

function renderSearchFormBlock(inDate: Date, outDate: Date, minDate: Date, maxDate: Date): void {
  const minDateStr = dateToLocaleString(minDate);
  const maxDateStr = dateToLocaleString(maxDate);
  renderBlock(
    'search-form-block',
    `
    <form id="search-form"
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" name="city"/>
            <input type="hidden" disabled value="59.9386,30.3141" name="coordinates"/>
          </div>
          <div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date"
            value=${dateToLocaleString(inDate)}
            min=${minDateStr} max=${maxDateStr}
            name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date"
            value=${dateToLocaleString(outDate)}
            min=${minDateStr} max=${maxDateStr}
            name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button type="submit">Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  );
}
