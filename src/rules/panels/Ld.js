import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import './RulesApp.css';


const info = [
  {
    title: '<b>4.1 Личное Дело (ЛД)</b> – карточка, которая вмещает в себя основную информацию о персонаже – его уровень сил, способности и тд.',
  },
  {
    title: '<b>4.2 Каждый персонаж обязан обладать своим ЛД</b>, для создания которого следует обратиться к администратору-квестологу. Для создания, опять же, вам следует заполнить данную заявку: Непосредственно, картинка персонажа.<ul><li>Имя.</li><li>Принадлежность: пират/дозорный/солдат революционной армии, команда/одиночка.</li><li>Местонахождение:</li><li>Наличные: 50.000 (стандартное количество для старта)</li><li>Уровень силы:</li><li>Боевой навык: (Дьявольский Фрукт, Рукопашный бой, Фехтование, Стрельба и тд.)</li><li>Не боевой навык: (Навигатор, Кок, Врач, Плотник, Музыкант и тд.)</li></ul><br>Пример<br><br>Монки Д. Луффи<br>Принадлежность: пират, капитан пиратов Соломенной Шляпы.<br>Местоположение: Ист Блю: Остров Рассвета<br>Наличные: 50.000<br>Уровень силы: 0<br>ДФ: 0<br>Рукопашный бой: 0<br>Не боевой навык: капитан 0<br><img style="margin-top: 10px" src="/rules/ld-img.jpg" />',
  },
  {
    title: '<b>4.3 Убедительная просьба не оставлять в заявках цифры. В ином случае, лишний раз посмотрите на образцы в альбоме с Личными Делами.</b>',
  },
  {
    title: '<b>4.4 Если вы капитан команды и желаете создать Личное Дело команды, то образец таков:</b><ul><li>Флаг команды.</li><li>Название команды.</li><li>Данные всех членов команды: имена, их уровень сил.</li><li>Местонахождение команды.</li><li>Общий уровень силы:</li><li>Общий наличный счет:</li></ul>',
  },
    {
    title: '<b>4.5 Все манипуляции с Личным Делом проводятся исключительно через заведующую администрацию.<b> Для изменения, выставления и чего-либо другого в Личном Деле пишите заведующим администраторам, и они с удовольствием вам помогут. Действующие заведующие администраторы: <a href="https://vk.com/youre_pretty_good" className="link" target="_blank"><b>Максим Репин</b></a>, <a href="https://vk.com/id341014268" className="link" target="_blank"><b>Remina Stirling</b></a>, <a href="https://vk.com/mrtlrtsbeauty" className="link" target="_blank"><b>Миша Красивый</b></a>, <a href="https://vk.com/id216866752" className="link" target="_blank"><b>Лидия Моловствова</b></a>.',
  },
];

export const Ld = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const listInfo = info.map((info) => 
    <Div key={info.title} style={{ margin: 10 }}>
       <div dangerouslySetInnerHTML={{ __html: info.title }}></div>
    </Div>
  );

  return (
    <Panel id={id}>
      <div className="rules-panel">
      <PanelHeader>Игра и игровые события</PanelHeader>
      <Button size="m" onClick={() => routeNavigator.back()} className='back-button'>Назад</Button>
      <Group>
        <Div>
          {listInfo}
        </Div>
      </Group>
      <Button size="m" onClick={() => routeNavigator.back()} className='back-button'>Назад</Button>
    </div>

    </Panel>
  );
};