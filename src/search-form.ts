import { renderBlock } from './lib.js'

export function renderSearchFormBlock(inDate: Date, outDate: Date): void {
  const nowDate = new Date();
  const maxDate = new Date(nowDate.getFullYear(), nowDate.getMonth() + 2, 0);
  if (!inDate) {
    inDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1);
  }
  if (!outDate) {
    outDate = new Date(inDate.getFullYear(), inDate.getMonth(), inDate.getDate() + 2);
  }
  renderBlock(
    'search-form-block',
    `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date"
            value=${inDate.toISOString().substring(0, 10)}
            min=${nowDate.toISOString().substring(0, 10)}
            max=${maxDate.toISOString().substring(0, 10)}
            name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date"
            value=${outDate.toISOString().substring(0, 10)}
            min=${nowDate.toISOString().substring(0, 10)}
            max=${maxDate.toISOString().substring(0, 10)}
            name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
}
