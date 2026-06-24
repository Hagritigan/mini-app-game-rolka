import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';


const info = [
  {
    title: '1. Регистрация и анкета. Действия после принятия анкеты',
  },
  {
    title: '2. Игра и игровые события',
  },
  {
    title: '3. Баллы, оценка квестов, наградные листовки и их получение',
  },
  {
    title: '4. Личное Дело',
  },
  {
    title: '5. Способности и развитие',
  },
  {
    title: '6. Возможности и ограничения',
  },
  {
    title: '7. Пираты',
  },
  {
    title: '8. Революционная армия',
  },
  {
    title: '9. Морской Дозор',
  },
  {
    title: '10. Сайфер Пол',
  },
  {
    title: '11. Снаряжение',
  },
  {
    title: '12. Расы',
  },
  {
    title: '13. Система восстановления',
  },
  {
    title: '14. Интеграция канонов в ролевую',
  },
];

export const Registration = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const listInfo = rules.map((info) => 
    <Div>
      { rule.title }
    </Div>
  );

  return (
    <Panel id={id}>
      <div className="rules-panel">
      <PanelHeader>Главная</PanelHeader>
      <Group header={<Header mode="secondary">Список разделов</Header>}>
        <Div>
          {listInfo}
        </Div>
      </Group>
    </div>

    </Panel>
  );
};