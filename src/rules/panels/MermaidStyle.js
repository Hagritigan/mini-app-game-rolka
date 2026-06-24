import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, Accordion } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import './RulesApp.css';

export const Mermaidstyle = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <div className="rules-panel">
        <PanelHeader>Особые способности русалок</PanelHeader>
        <Button size="m" onClick={() => routeNavigator.back()} className='back-button'>Назад</Button>
        <Group>
            <Div>
                <strong><center>Русалий боевой стиль</center></strong>
                <div className='text-gray'><em><strong>Доступен с 0 баллов.</strong></em></div>
                <br />
                <br />
                Cтиль борьбы, используемый русалками. Он используется под водой, и включает в себя манипулирование водой своими руками, как если бы это было что-то осязаемое, чтобы использовать для атак дальнего боя. В сущности, является эквивалентом Джиу-джитсу Рыболюдей для русалок.
                <ul className="listing">
                    <li><span className="l"><strong>Ultramarine (ウルトラマリン Уруторамарин?):</strong>&nbsp;Пользователь захватывает воду своими руками, похожими на Mizugokoro, а затем швыряет её вперед в мощном, чрезвычайно большом потоке, который разбрасывает противников с большой силой.</span></li>
                </ul>
                <strong><center>Нингё Гудзюцу</center></strong>
                <br />
                <br />
                Это боевой стиль, используемый Русалками. В этом стиле используется оружие, такие как трезубцы и мечи (и возможно другое похожее оружие) для осуществления быстрых и мощных атак.
                <br />
                <br />
                <strong>Примеры:</strong>
                <ul className="listing">
                <li><span className="l"><strong>Koin Ryusui So (光陰流水槍 Kōin Ryūsui Sō?, англ. дословно означает "Копьё Реки Времени"):</strong>&nbsp;Эту технику использует Фукабоси. В начале атаки он быстро вращает свой трезубец, затем бросается вперёд и быстро режет своего врага с большой силой. Эта атака достаточна сильна чтобы победить некоторых морских зверей прирученных Новыми Пиратами Рыболюдей.</span></li>
                <li><span className="l"><strong>Ryugu Romon (竜宮楼門 Ryūgū Rōmon?, англ. дословно означает "Врата башни Рюгу"):</strong>&nbsp;Эту технику использует Рюбоси. Он быстро движется вперёд, нанося своим врагам многочисленные разрезы двумя саблями. Эта атака достаточна сильна чтобы победить некоторых морских зверей прирученных Новыми Пиратами Рыболюдей.</span></li>
                <li><span className="l"><strong>Shitchin Banpo (七珍万宝 Shitchin Banpō?, англ. дословно означает "Семь Великих Сокровищ"):</strong>&nbsp;Эту технику использует Манбоси. Это мощная рубящая атака, при которой меч держится за эфес двумя руками. Эта атака достаточна сильна, чтобы победить некоторых морских зверей, которые напали на трёх Принцев.</span></li>
                </ul>
            </Div>
        </Group>
        <Button size="m" onClick={() => routeNavigator.back()} className='back-button'>Назад</Button>
    </div>

    </Panel>
  )
}