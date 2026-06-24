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
      title: 'Кошелёк',
      link: 'requiemwallet',
    },
];

export const RequiemShop = ({ id }) => {
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
        <PanelHeader>Реквием: Лавка Убийц Мрака</PanelHeader>
        <Button size="m" onClick={() => routeNavigator.back()} className='back-button'>Назад</Button>
        <Group>
            <Div>
            {navig}
            <div className='gray-block'>
                <p>Что бы получить что-то из списка вам необходимо быть на острове, где присутствует влияние Преступного Подполья и обратиться к администратору, который заведует Преступным Подпольем.</p>
            </div>
            <br />
            <center>
                <table>
                <tbody>
                <tr>
                <td>1.</td>
                <th>Набор из 5 мет. ножей. На них нанесен яд древесной лягушки. Можно использовать в остальной игре без яда, как атаку средней дальности.</th>
                <td className="desktop-only"><a title="" href="https://vk.com/photo94151278_428931403"><img title="" src="https://sun9-49.userapi.com/impf/c637926/v637926278/65c6/V1Dvsy7kSK0.jpg?size=130x130&amp;quality=96&amp;sign=ab08e21bc529919247b03d4071b4775c&amp;type=album" alt="" width="100" height="100" /></a></td>
                <td><center><strong>1</strong></center><strong>монета</strong></td>
                </tr>
                <tr>
                <td>2.</td>
                <th>Секира Курама. Замечательное орудие убийства, если вы хотите, чтобы оставшиеся в живых слагали о вас легенды. Тяжелая черная секира, чьи контуры очерчены витиеватым серебристым узором, готова резать и рвать, рубить и кромсать - в ваших умелых руках. Для тех, кто владеет древковым оружием.&nbsp;<span>Можно использовать в островных квестах.</span></th>
                <td className="desktop-only"><a   title="" href="https://vk.com/photo94151278_429201749"><img title="" src="https://sun9-6.userapi.com/impf/c630822/v630822278/46d37/kN1M3wwZxFM.jpg?size=130x130&amp;quality=96&amp;sign=12b8e23e2379a5941ddf62121efa2b2d&amp;type=album" alt="" width="100" height="100" /></a></td>
                <td><center><strong>1</strong></center><strong>монета</strong></td>
                </tr>
                <tr>
                <td>3.</td>
                <th>Ятаган "Кол". Ятаган с зацепом, сделанный кем-то очень ленивым. Тем не менее, в руках действительно кровожадного человека это оружие - образец сумасшествия в чистом виде. Руби и кромсай! Можно покрыть ядом.</th>
                <td className="desktop-only"><a   title="" href="https://vk.com/photo94151278_429202255"><img title="" src="https://sun9-26.userapi.com/impf/c630822/v630822278/46d45/5ZdJj5LoPfI.jpg?size=130x130&amp;quality=96&amp;sign=e9389a4d55f413e7794aba3e9f12eb81&amp;type=album" alt="" width="100" height="100" /></a></td>
                <td><center><strong>2</strong></center><strong>монеты</strong></td>
                </tr>
                <tr>
                <td>4.</td>
                <th>Уруми. Уникальный меч, состоящий из нескольких тонких и гибких стальных плетей, заостренных с обеих сторон. Таким мечом, если владеть им в достаточной мере, можно устраивать настоящую резню, особенно если врубаться в пыл битвы. На островах, где царствует песок и карри, такие мечи - признак мастерства, к их обладателям не суются без дела.&nbsp;<span  >Необходим навык фехтования - не менее 8-ми баллов.</span></th>
                <td className="desktop-only"><a   title="" href="https://vk.com/photo94151278_429202783"><img title="" src="https://sun9-20.userapi.com/impf/c630822/v630822278/46d4c/X-asJPagO1I.jpg?size=130x130&amp;quality=96&amp;sign=06e27c5ffe3bce9b326f0e744d01e1a6&amp;type=album" alt="" width="100" height="100" /></a></td>
                <td><center><strong>2</strong></center><strong>монеты</strong></td>
                </tr>
                <tr>
                <td>5.</td>
                <th>Купон на 5 Йорсисов. В процессе выполнения задания Реквиема можно использовать, как боевых. Вне квестов Реквиема - только при оплате способностью&nbsp;<span  >(без оплаты они остаются добрыми прожорливыми компаньонами)</span>.</th>
                <td className="desktop-only"><a   title="" href="https://vk.com/photo94151278_428931554"><img title="" src="https://sun9-23.userapi.com/impf/c637926/v637926278/65cd/EPRto_Bwi3o.jpg?size=130x130&amp;quality=96&amp;sign=c6ef860e1fcecf4710365e1f5f219461&amp;type=album" alt="" width="100" height="100" /></a></td>
                <td><center><strong>2</strong></center><strong>монеты</strong></td>
                </tr>
                <tr>
                <td>6.</td>
                <th>Вакидзаси "Гнев Митал" : короткая прочная катана для ближних быстрых атак. Только для мечников. Для пиратов: дает премию в 5% от награды за хорошо выполненный квест. Для дозорных: уменьшает шанс завалить задание на 10%.</th>
                <td className="desktop-only"><a   title="" href="https://vk.com/photo94151278_428931171"><img title="" src="https://sun9-41.userapi.com/impf/c637926/v637926278/65bf/XJxiApW7Aa0.jpg?size=130x130&amp;quality=96&amp;sign=335ad178af9d2318fd43c49b35b9c734&amp;type=album" alt="" width="100" height="100" /></a></td>
                <td><center><strong>2</strong></center><strong>монеты</strong></td>
                </tr>
                <tr>
                <td>7.</td>
                <th>Наручный арбалет и набор коротких болтов к нему (в наборе до 50-и шт). Скорострельная модель, позволяющая без перезарядки выпускать до трех стрел одна за одной. Стрелы можно смазывать ядом.&nbsp;<span  >Вне квестов Реквиема используются только сухие стрелы.</span></th>
                <td className="desktop-only"><a   title="" href="https://vk.com/photo94151278_428936587"><img title="" src="https://sun9-77.userapi.com/impf/c637926/v637926278/65d8/FEAikAMH_o0.jpg?size=130x130&amp;quality=96&amp;sign=819a4a6c0dc63ed0f77104c33c5d9ac4&amp;type=album" alt="" width="100" height="100" /></a></td>
                <td><center><strong>2</strong></center><strong>монеты</strong></td>
                </tr>
                <tr>
                <td>8.</td>
                <th>Тёмная броня &ndash; классическая. Совершенно обычная броня, выполненная в тёмных цветах и изготовленная из кожи, что делает её легкой для ношения и уязвимой для боя&nbsp;<span  >(в будущем для брони будут отдельные слоты с апгрейдом)</span>. В состав этой брони входят сапоги, делающие вашего персонажа при передвижении&nbsp;<span  >(естественно, когда сапоги на нём)</span>, совершенно беззвучным и бандана, скрывающая звуки вашего дыхания. Благодаря этой броне вас трудно заметить в тёмное время суток или в тени. Броню всячески трудно надеть&nbsp;<span  >(она состоит из множества отделенных деталей)</span>, так что на переодевание может уйти пол часа, если делать это не спеша.</th>
                <td className="desktop-only"><a   title="" href="https://vk.com/photo94151278_456245902"><img title="" src="https://sun9-67.userapi.com/impf/c837625/v837625739/50644/RNAOlc4oqtQ.jpg?size=130x130&amp;quality=96&amp;sign=7de9dcc9354fbf348848a5d998b1ee78&amp;type=album" alt="" width="100" height="100" /></a></td>
                <td><center><strong>2</strong></center><strong>монеты</strong></td>
                </tr>
                <tr>
                <td>9.</td>
                <th>Талисман в виде пера ворона, которое можно удобно зацепить в волосах. Данный талисман позволяет обладателю внушить приближение смерти противника&nbsp;<span  >[на три поста к баллам пользователя прибавляется ровно столько, чтобы сравняться с противном или, если разница в пользу Реквиемца, прибавляется три балла. Действует лишь тогда, когда между реквиемцем и его противником разница в баллов 5]</span>. Также этот талисман даёт прибавку к награде, зависящей от процента, что в свою очередь поднимаются за каждые убийства игроков. Процент сбрасывается при получении награды.</th>
                <td className="desktop-only"><a   title="" href="https://vk.com/photo94151278_429206083"><img title="" src="https://sun9-40.userapi.com/impf/c630822/v630822278/46d67/ldrvRq5NxCg.jpg?size=130x130&amp;quality=96&amp;sign=1ff04c955127a98e3e3fc29cb7f4f89d&amp;type=album" alt="" width="100" height="100" /></a></td>
                <td><center><strong>4</strong></center><strong>монеты</strong></td>
                </tr>
                <tr>
                <td>10.</td>
                <th>Талисман в виде черепка крысы на короткой цепочке, которую можно удобно зацепить за пояс. Данный талисман позволяет пользователю незаметно обокрасть противника на одну (!) вещь, если разница не составляет больше 7&ndash;и баллов в пользу противника. Также этот талисман даёт прибавку к деньгам в виде 10% ко всему.</th>
                <td className="desktop-only"><a   title="" href="https://vk.com/photo94151278_429208133"><img title="" src="https://sun9-54.userapi.com/impf/c630822/v630822278/46d9e/0tboDI-vd4A.jpg?size=130x130&amp;quality=96&amp;sign=d590fa84eae1b0909ee37f3b4c994733&amp;type=album" alt="" width="100" height="100" /></a></td>
                <td><center><strong>5</strong></center><strong>монет</strong></td>
                </tr>
                <tr>
                <td>11.</td>
                <th>Талисман в виде маленькой черной кошачий лапки, которую можно удобно спрятать во внутренний карман. Данный талисман позволяет пользователю двигаться незаметно для противника и наносить таким образом урон в течение трёх постов, если разница не составляет больше 5&ndash;ти баллов в пользу противника. Также этот талисман даёт прибавку к балльной оценке приключения с заданием Реквиема на 0.2 балла.</th>
                <td className="desktop-only"><a   title="" href="https://vk.com/photo94151278_429208548"><img title="" src="https://sun9-63.userapi.com/impf/c630822/v630822278/46da5/1feOCrbB7fw.jpg?size=130x130&amp;quality=96&amp;sign=f52de870a727177f835e0538bc498f87&amp;type=album" alt="" width="100" height="100" /></a></td>
                <td><center><strong>5</strong></center><strong>монет</strong></td>
                </tr>
                </tbody>
                </table>
                </center>
            </Div>
        </Group>
        <Button size="m" onClick={() => routeNavigator.back()} className='back-button'>Назад</Button>
    </div>

    </Panel>
  );
};