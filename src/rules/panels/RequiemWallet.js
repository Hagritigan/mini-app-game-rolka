import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, Accordion } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import './RulesApp.css';

const navigation = [
  {
    title: 'Основы',
    link: 'requiem',
  },
  {
    title: 'Задания',
    link: 'requiemquests',
  },
  {
    title: 'Лавка',
    link: 'requiemshop',
  },
]


export const RequiemWallet = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const open = true;

  const navig = navigation.map((rule) => 
    <Button className='button' stretched size="l" mode="secondary" onClick={() => routeNavigator.push({pathname: `/rules/${rule.link}`})} key={rule.link}>
      { rule.title }
    </Button>
  );

  return (
    <Panel id={id}>
      <div className="rules-panel">
        <PanelHeader>Реквием: Кошелек</PanelHeader>
        <Button size="m" onClick={() => routeNavigator.back()} className='back-button'>Назад</Button>
        <Group>
            <Div>
              {navig}
              <div className='gray-block'>
                <center>Что бы приобрести ту или иную вещь, обращайтесь за ней к заведующему администратору, который впишет вам её в Личное Дело и Особую Карточку.</center>
              </div>
              <br />
              <center>Особая Карточка &ndash; прототип Личного Дела, однако &ndash; лишь для реквиемцев. Там записываются выполненные задания персонажа, а так же записываются полученные им вещи в всей красе, чего нельзя вписать в Личное Дело.</center>
              <p>&nbsp;</p>
              <table>
              <tbody>
              <tr>
              <th><center>Карточка создается персонально для каждого реквиемца, не важно, из какого он отряда. В критерии её заполнения входят:</center></th>
              </tr>
              <tr>
              <td>Имя</td>
              </tr>
              <tr>
              <td>Ранг<strong>:</strong></td>
              </tr>
              <tr>
              <td>Принадлежность<strong>:</strong></td>
              </tr>
              <tr>
              <td>Личное Дело данной персоны</td>
              </tr>
              </tbody>
              </table>
              <p>&nbsp;</p>
              <center>В карточку вписывается все имущество игрока, приобретенное с помощью Реквиема.<br /><br />Начальное имущество игрока составляет черная ден ден муши организации.</center>
              <br />
              <div className='gray-block'>
                <center><em>Особые Карточки</em>&nbsp;ведуться в отдельной&nbsp;<a href="https://vk.com/this_requiem">группе</a>, вступление в которую может вам обеспечить любой заведующий администратор. Это сделано для того, что бы сохранить анонимность поклонников тьмы.</center>
              </div>
            </Div>
        </Group>
        <Button size="m" onClick={() => routeNavigator.back()} className='back-button'>Назад</Button>
    </div>

    </Panel>
  );
};