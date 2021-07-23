import { renderBlock } from './lib.js';
import { formatDate } from './date-helper.js';
import { search } from './search.js';
export function renderSearchFormBlock(inDate, outDate) {
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
    <form id="search-form">
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" name="city"/>
            <input type="hidden" disabled value="59.9386,30.3141" name="coordinates"/>
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
            <div><button type="submit">Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `);
    document.forms['search-form'].addEventListener('submit', (event) => { search(event); });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLWZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUN0QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFDN0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUVwQyxNQUFNLFVBQVUscUJBQXFCLENBQUMsTUFBWSxFQUFFLE9BQWE7SUFFL0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUMzQixNQUFNLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzRSxNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkMsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXZDLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDWCxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDckY7SUFDRCxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ1osT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ25GO0lBRUQsV0FBVyxDQUNULG1CQUFtQixFQUNuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQWtCZ0IsVUFBVSxDQUFDLE1BQU0sQ0FBQztrQkFDcEIsVUFBVSxRQUFRLFVBQVU7Ozs7OztvQkFNMUIsVUFBVSxDQUFDLE9BQU8sQ0FBQztrQkFDckIsVUFBVSxRQUFRLFVBQVU7Ozs7Ozs7Ozs7Ozs7S0FhekMsQ0FDRixDQUFBO0lBQ0QsUUFBUSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXJCbG9jayB9IGZyb20gJy4vbGliLmpzJ1xuaW1wb3J0IHsgZm9ybWF0RGF0ZSB9IGZyb20gJy4vZGF0ZS1oZWxwZXIuanMnXG5pbXBvcnQgeyBzZWFyY2ggfSBmcm9tICcuL3NlYXJjaC5qcydcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclNlYXJjaEZvcm1CbG9jayhpbkRhdGU6IERhdGUsIG91dERhdGU6IERhdGUpOiB2b2lkIHtcblxuICBjb25zdCBub3dEYXRlID0gbmV3IERhdGUoKTtcbiAgY29uc3QgbWF4RGF0ZSA9IG5ldyBEYXRlKG5vd0RhdGUuZ2V0RnVsbFllYXIoKSwgbm93RGF0ZS5nZXRNb250aCgpICsgMiwgMCk7XG4gIGNvbnN0IG5vd0RhdGVTdHIgPSBmb3JtYXREYXRlKG5vd0RhdGUpO1xuICBjb25zdCBtYXhEYXRlU3RyID0gZm9ybWF0RGF0ZShtYXhEYXRlKTtcblxuICBpZiAoIWluRGF0ZSkge1xuICAgIGluRGF0ZSA9IG5ldyBEYXRlKG5vd0RhdGUuZ2V0RnVsbFllYXIoKSwgbm93RGF0ZS5nZXRNb250aCgpLCBub3dEYXRlLmdldERhdGUoKSArIDEpO1xuICB9XG4gIGlmICghb3V0RGF0ZSkge1xuICAgIG91dERhdGUgPSBuZXcgRGF0ZShpbkRhdGUuZ2V0RnVsbFllYXIoKSwgaW5EYXRlLmdldE1vbnRoKCksIGluRGF0ZS5nZXREYXRlKCkgKyAyKTtcbiAgfVxuXG4gIHJlbmRlckJsb2NrKFxuICAgICdzZWFyY2gtZm9ybS1ibG9jaycsXG4gICAgYFxuICAgIDxmb3JtIGlkPVwic2VhcmNoLWZvcm1cIj5cbiAgICAgIDxmaWVsZHNldCBjbGFzcz1cInNlYXJjaC1maWxlZHNldFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjaXR5XCI+0JPQvtGA0L7QtDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJjaXR5XCIgdHlwZT1cInRleHRcIiBkaXNhYmxlZCB2YWx1ZT1cItCh0LDQvdC60YIt0J/QtdGC0LXRgNCx0YPRgNCzXCIgbmFtZT1cImNpdHlcIi8+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIGRpc2FibGVkIHZhbHVlPVwiNTkuOTM4NiwzMC4zMTQxXCIgbmFtZT1cImNvb3JkaW5hdGVzXCIvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwicHJvdmlkZXJzXCI+XG4gICAgICAgICAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJwcm92aWRlclwiIHZhbHVlPVwiaG9teVwiIGNoZWNrZWQgLz4gSG9teTwvbGFiZWw+XG4gICAgICAgICAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJwcm92aWRlclwiIHZhbHVlPVwiZmxhdC1yZW50XCIgY2hlY2tlZCAvPiBGbGF0UmVudDwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+LS0hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiY2hlY2staW4tZGF0ZVwiPtCU0LDRgtCwINC30LDQtdC30LTQsDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJjaGVjay1pbi1kYXRlXCIgdHlwZT1cImRhdGVcIlxuICAgICAgICAgICAgdmFsdWU9JHtmb3JtYXREYXRlKGluRGF0ZSl9XG4gICAgICAgICAgICBtaW49JHtub3dEYXRlU3RyfSBtYXg9JHttYXhEYXRlU3RyfVxuICAgICAgICAgICAgbmFtZT1cImNoZWNraW5cIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiY2hlY2stb3V0LWRhdGVcIj7QlNCw0YLQsCDQstGL0LXQt9C00LA8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGlkPVwiY2hlY2stb3V0LWRhdGVcIiB0eXBlPVwiZGF0ZVwiXG4gICAgICAgICAgICB2YWx1ZT0ke2Zvcm1hdERhdGUob3V0RGF0ZSl9XG4gICAgICAgICAgICBtaW49JHtub3dEYXRlU3RyfSBtYXg9JHttYXhEYXRlU3RyfVxuICAgICAgICAgICAgbmFtZT1cImNoZWNrb3V0XCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIm1heC1wcmljZVwiPtCc0LDQutGBLiDRhtC10L3QsCDRgdGD0YLQvtC6PC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBpZD1cIm1heC1wcmljZVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCJcIiBuYW1lPVwicHJpY2VcIiBjbGFzcz1cIm1heC1wcmljZVwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXY+PGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+0J3QsNC50YLQuDwvYnV0dG9uPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZmllbGRzZXQ+XG4gICAgPC9mb3JtPlxuICAgIGBcbiAgKVxuICBkb2N1bWVudC5mb3Jtc1snc2VhcmNoLWZvcm0nXS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpID0+IHsgc2VhcmNoKGV2ZW50KSB9KTtcbn1cbiJdfQ==