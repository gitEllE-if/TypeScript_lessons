import { renderBlock } from './lib.js';
export function renderSearchFormBlock(inDate, outDate) {
    function formatDate(dateToFormat) {
        return dateToFormat.toLocaleDateString('ru').split('.').reverse().join('-');
    }
    const nowDate = new Date();
    const maxDate = new Date(nowDate.getFullYear(), nowDate.getMonth() + 2, 0);
    const nowDateStr = formatDate(nowDate);
    const maxDateStr = formatDate(maxDate);
    if (!inDate) {
        inDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1);
    }
    if (!outDate) {
        outDate = new Date(inDate.getFullYear(), inDate.getMonth(), inDate.getDate() + 2);
    }
    renderBlock('search-form-block', `
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
            value=${formatDate(inDate)}
            min=${nowDateStr} max=${maxDateStr}
            name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date"
            value=${formatDate(outDate)}
            min=${nowDateStr} max=${maxDateStr}
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
    `);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLWZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUV0QyxNQUFNLFVBQVUscUJBQXFCLENBQUMsTUFBWSxFQUFFLE9BQWE7SUFFL0QsU0FBUyxVQUFVLENBQUMsWUFBa0I7UUFDcEMsT0FBTyxZQUFZLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUMzQixNQUFNLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzRSxNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkMsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXZDLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDWCxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDckY7SUFDRCxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ1osT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ25GO0lBRUQsV0FBVyxDQUNULG1CQUFtQixFQUNuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQWtCZ0IsVUFBVSxDQUFDLE1BQU0sQ0FBQztrQkFDcEIsVUFBVSxRQUFRLFVBQVU7Ozs7OztvQkFNMUIsVUFBVSxDQUFDLE9BQU8sQ0FBQztrQkFDckIsVUFBVSxRQUFRLFVBQVU7Ozs7Ozs7Ozs7Ozs7S0FhekMsQ0FDRixDQUFBO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlckJsb2NrIH0gZnJvbSAnLi9saWIuanMnXG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTZWFyY2hGb3JtQmxvY2soaW5EYXRlOiBEYXRlLCBvdXREYXRlOiBEYXRlKTogdm9pZCB7XG5cbiAgZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlVG9Gb3JtYXQ6IERhdGUpOiBzdHJpbmcge1xuICAgIHJldHVybiBkYXRlVG9Gb3JtYXQudG9Mb2NhbGVEYXRlU3RyaW5nKCdydScpLnNwbGl0KCcuJykucmV2ZXJzZSgpLmpvaW4oJy0nKTtcbiAgfVxuXG4gIGNvbnN0IG5vd0RhdGUgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCBtYXhEYXRlID0gbmV3IERhdGUobm93RGF0ZS5nZXRGdWxsWWVhcigpLCBub3dEYXRlLmdldE1vbnRoKCkgKyAyLCAwKTtcbiAgY29uc3Qgbm93RGF0ZVN0ciA9IGZvcm1hdERhdGUobm93RGF0ZSk7XG4gIGNvbnN0IG1heERhdGVTdHIgPSBmb3JtYXREYXRlKG1heERhdGUpO1xuXG4gIGlmICghaW5EYXRlKSB7XG4gICAgaW5EYXRlID0gbmV3IERhdGUobm93RGF0ZS5nZXRGdWxsWWVhcigpLCBub3dEYXRlLmdldE1vbnRoKCksIG5vd0RhdGUuZ2V0RGF0ZSgpICsgMSk7XG4gIH1cbiAgaWYgKCFvdXREYXRlKSB7XG4gICAgb3V0RGF0ZSA9IG5ldyBEYXRlKGluRGF0ZS5nZXRGdWxsWWVhcigpLCBpbkRhdGUuZ2V0TW9udGgoKSwgaW5EYXRlLmdldERhdGUoKSArIDIpO1xuICB9XG5cbiAgcmVuZGVyQmxvY2soXG4gICAgJ3NlYXJjaC1mb3JtLWJsb2NrJyxcbiAgICBgXG4gICAgPGZvcm0+XG4gICAgICA8ZmllbGRzZXQgY2xhc3M9XCJzZWFyY2gtZmlsZWRzZXRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiY2l0eVwiPtCT0L7RgNC+0LQ8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGlkPVwiY2l0eVwiIHR5cGU9XCJ0ZXh0XCIgZGlzYWJsZWQgdmFsdWU9XCLQodCw0L3QutGCLdCf0LXRgtC10YDQsdGD0YDQs1wiIC8+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIGRpc2FibGVkIHZhbHVlPVwiNTkuOTM4NiwzMC4zMTQxXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8IS0tPGRpdiBjbGFzcz1cInByb3ZpZGVyc1wiPlxuICAgICAgICAgICAgPGxhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwicHJvdmlkZXJcIiB2YWx1ZT1cImhvbXlcIiBjaGVja2VkIC8+IEhvbXk8L2xhYmVsPlxuICAgICAgICAgICAgPGxhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwicHJvdmlkZXJcIiB2YWx1ZT1cImZsYXQtcmVudFwiIGNoZWNrZWQgLz4gRmxhdFJlbnQ8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2Pi0tIT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNoZWNrLWluLWRhdGVcIj7QlNCw0YLQsCDQt9Cw0LXQt9C00LA8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGlkPVwiY2hlY2staW4tZGF0ZVwiIHR5cGU9XCJkYXRlXCJcbiAgICAgICAgICAgIHZhbHVlPSR7Zm9ybWF0RGF0ZShpbkRhdGUpfVxuICAgICAgICAgICAgbWluPSR7bm93RGF0ZVN0cn0gbWF4PSR7bWF4RGF0ZVN0cn1cbiAgICAgICAgICAgIG5hbWU9XCJjaGVja2luXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNoZWNrLW91dC1kYXRlXCI+0JTQsNGC0LAg0LLRi9C10LfQtNCwPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBpZD1cImNoZWNrLW91dC1kYXRlXCIgdHlwZT1cImRhdGVcIlxuICAgICAgICAgICAgdmFsdWU9JHtmb3JtYXREYXRlKG91dERhdGUpfVxuICAgICAgICAgICAgbWluPSR7bm93RGF0ZVN0cn0gbWF4PSR7bWF4RGF0ZVN0cn1cbiAgICAgICAgICAgIG5hbWU9XCJjaGVja291dFwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJtYXgtcHJpY2VcIj7QnNCw0LrRgS4g0YbQtdC90LAg0YHRg9GC0L7QujwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJtYXgtcHJpY2VcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiXCIgbmFtZT1cInByaWNlXCIgY2xhc3M9XCJtYXgtcHJpY2VcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2PjxidXR0b24+0J3QsNC50YLQuDwvYnV0dG9uPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZmllbGRzZXQ+XG4gICAgPC9mb3JtPlxuICAgIGBcbiAgKVxufVxuIl19