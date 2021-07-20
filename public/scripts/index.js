import { renderSearchFormBlock } from './search-form.js';
import { renderSearchStubBlock } from './search-results.js';
import { renderUserBlock } from './user.js';
import { renderToast } from './lib.js';
window.addEventListener('DOMContentLoaded', () => {
    renderUserBlock('Wade Warren', '/img/avatar.png', 0);
    renderSearchFormBlock(undefined, undefined);
    renderSearchStubBlock();
    renderToast({ text: 'Это пример уведомления. Используйте его при необходимости', type: 'success' }, { name: 'Понял', handler: () => { console.log('Уведомление закрыто'); } });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFDeEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUJBQXFCLENBQUE7QUFDM0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFdBQVcsQ0FBQTtBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRXRDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUU7SUFDL0MsZUFBZSxDQUFDLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNyRCxxQkFBcUIsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDNUMscUJBQXFCLEVBQUUsQ0FBQztJQUN4QixXQUFXLENBQ1QsRUFBRSxJQUFJLEVBQUUsMkRBQTJELEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUN0RixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQSxDQUFDLENBQUMsRUFBRSxDQUN6RSxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXJTZWFyY2hGb3JtQmxvY2sgfSBmcm9tICcuL3NlYXJjaC1mb3JtLmpzJ1xuaW1wb3J0IHsgcmVuZGVyU2VhcmNoU3R1YkJsb2NrIH0gZnJvbSAnLi9zZWFyY2gtcmVzdWx0cy5qcydcbmltcG9ydCB7IHJlbmRlclVzZXJCbG9jayB9IGZyb20gJy4vdXNlci5qcydcbmltcG9ydCB7IHJlbmRlclRvYXN0IH0gZnJvbSAnLi9saWIuanMnXG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICByZW5kZXJVc2VyQmxvY2soJ1dhZGUgV2FycmVuJywgJy9pbWcvYXZhdGFyLnBuZycsIDApO1xuICByZW5kZXJTZWFyY2hGb3JtQmxvY2sodW5kZWZpbmVkLCB1bmRlZmluZWQpO1xuICByZW5kZXJTZWFyY2hTdHViQmxvY2soKTtcbiAgcmVuZGVyVG9hc3QoXG4gICAgeyB0ZXh0OiAn0K3RgtC+INC/0YDQuNC80LXRgCDRg9Cy0LXQtNC+0LzQu9C10L3QuNGPLiDQmNGB0L/QvtC70YzQt9GD0LnRgtC1INC10LPQviDQv9GA0Lgg0L3QtdC+0LHRhdC+0LTQuNC80L7RgdGC0LgnLCB0eXBlOiAnc3VjY2VzcycgfSxcbiAgICB7IG5hbWU6ICfQn9C+0L3Rj9C7JywgaGFuZGxlcjogKCkgPT4geyBjb25zb2xlLmxvZygn0KPQstC10LTQvtC80LvQtdC90LjQtSDQt9Cw0LrRgNGL0YLQvicpIH0gfVxuICApO1xufSk7XG4iXX0=