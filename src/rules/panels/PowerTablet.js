import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, Accordion } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import './RulesApp.css';


export const Powertablet = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const open = true;

  return (
    <Panel id={id}>
      <div className="rules-panel">
        <PanelHeader>Развитие способностей</PanelHeader>
        <Button size="m" onClick={() => routeNavigator.back()} className='back-button'>Назад</Button>
        <Group>
            <Div>
                <div className="desktop-only">
                    <center>Примеры стадий развития способностей&nbsp;<sup>1</sup></center>
                    <br />
                    <br />
                    <table>
                        <thead>
                            <tr>
                            <th scope="col">Баллы</th>
                            <th scope="col">Фехтование&nbsp;<sup>2</sup></th>
                            <th scope="col">Рукопашный бой&nbsp;<sup>3</sup></th>
                            <th scope="col">Стрельба</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">5</th>
                            <td>Зоро против братьев из команды Куро</td>
                            <td>Санджи против Гина</td>
                            <td>С пистолета попадаете в стоящую цель в радиусе 20 метров. С ружья – 15 метров. Если цель движущаяся, 
                                прицеливаетесь долго, велик шанс промаха. Не очень хорошая реакция. Владеете только пистолетом, или 
                                ружьем. Руки быстро устают</td>
                            </tr>
                            <tr>
                            <th scope="row">10</th>
                            <td>Зоро во время битвы с Арлонгом</td>
                            <td>Санджи во время битвы с Арлонгом</td>
                            <td>Радиус попадания увеличивается на 10 метров. Попадания в движущуюся цель более вероятны. Реакция 
                                улучшается, руки не так быстро и сильно устают</td>
                            </tr>
                            <tr>
                            <th scope="row">15</th>
                            <td>Зоро на Виски Пик</td>
                            <td>Санджи на Виски Пик</td>
                            <td>Открыт доступ к владению автоматическими винтовками. Радиус автомата равен радиусу ружья. Попадания 
                                с пистолета стали достигать радиуса 50 метров</td>
                            </tr>
                            <tr>
                            <th scope="row">18</th>
                            <td>Уровень Зоро на Арабасте</td>
                            <td>Уровень Санджи на Арабасте</td>
                            <td>Радиус ружья достигает 70-и метров. Времени на прицел тратится очень мало. Улучшенная реакция. 
                                Скоростная перезарядка. Оружие лежит в руке легко, руки практически не устают</td>
                            </tr>
                            <tr>
                            <th scope="row">22</th>
                            <td>Уровень Зоро в Скайпии</td>
                            <td>Уровень Санджи в Скайпии</td>
                            <td>Открыт доступ к снайперскому оружию</td>
                            </tr>
                            <tr>
                            <th scope="row">25</th>
                            <td>Уровень Зоро в Эниес Лобби</td>
                            <td>Уровень Санджи в Эниес Лобби</td>
                            <td>Радиус доступных оружие увеличивается до 100 метров, снайперского оружия - до 200. Короткое 
                                время на прицел (не считая снайперов). Высокая реакция</td>
                            </tr>
                            <tr>
                            <th scope="row">30</th>
                            <td>Уровень Зоро на Триллер Барке</td>
                            <td>Уровень Санджи на Триллер Барке</td>
                            <td>Стрельба от бедра с пистолета имеет превосходную точность, можете подстрелить противников 
                                в сору. Около ста метров - стабильные попадания с небольшим шансом промаха</td>
                            </tr>
                            <tr>
                            <th scope="row">35</th>
                            <td>Начало тренировки с Бабуинами на острове Михоука</td>
                            <td>Начало тренировки на острове Окам</td>
                            <td>Молниеносная скорость вытягивания оружия, на прицел отводится минимальное количество времени, 
                                как и на перезарядку</td>
                            </tr>
                            <tr>
                            <th scope="row">55</th>
                            <td>Уровень Зоро из Нового Мира</td>
                            <td>Уровень Санджи из Нового Мира</td>
                            <td>Обладаете молниеносной реакцией (чуть хуже ВН<sup>4</sup>), можете подстрелить муху с пистолета с 100 метров. 
                                Вам доступны все виды огнестрельного оружия, которое вы можете использовать на достаточном уровне</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='mobile-only'>
                    <Accordion open>
                        <Accordion.Summary iconPosition="before"><b>Примеры&nbsp;<sup>1</sup></b></Accordion.Summary>
                        <Accordion.Content>
                            <Accordion>
                                <Accordion.Summary iconPosition="before"><b>5 баллов</b></Accordion.Summary>
                                <Accordion.Content>
                                    <Div>
                                        <ul className='mobile-bottom-border'>
                                            <li><strong>Фехтование&nbsp;<sup>2</sup>:</strong>Зоро против братьев из команды Куро</li>
                                            <li><strong>Рукопашный бой&nbsp;<sup>3</sup>:</strong>Санджи против Гина</li>
                                            <li><strong>Стрельба:</strong>С пистолета попадаете в стоящую цель в радиусе 20 метров. 
                                            С ружья – 15 метров. Если цель движущаяся, прицеливаетесь долго, велик шанс промаха. 
                                            Не очень хорошая реакция. Владеете только пистолетом, или ружьем. Руки быстро устают</li>
                                        </ul>
                                    </Div>
                                </Accordion.Content>
                            </Accordion>
                            <Accordion>
                                <Accordion.Summary iconPosition="before"><b>10 баллов</b></Accordion.Summary>
                                <Accordion.Content>
                                    <Div>
                                        <ul className='mobile-bottom-border'>
                                            <li><strong>Фехтование:</strong>Зоро во время битвы с Арлонгом</li>
                                            <li><strong>Рукопашный бой:</strong>Санджи во время битвы с Арлонгом</li>
                                            <li><strong>Стрельба:</strong>Радиус попадания увеличивается на 10 метров. Попадания в 
                                            движущуюся цель более вероятны. Реакция улучшается, руки не так быстро и сильно устают</li>
                                        </ul>
                                    </Div>
                                </Accordion.Content>
                            </Accordion>
                            <Accordion>
                                <Accordion.Summary iconPosition="before"><b>15 баллов</b></Accordion.Summary>
                                <Accordion.Content>
                                    <Div>
                                        <ul className='mobile-bottom-border'>
                                            <li><strong>Фехтование:</strong>Зоро на Виски Пик</li>
                                            <li><strong>Рукопашный бой:</strong>Санджи на Виски Пик</li>
                                            <li><strong>Стрельба:</strong>Открыт доступ к владению автоматическими винтовками. Радиус 
                                            автомата равен радиусу ружья. Попадания с пистолета стали достигать радиуса 50 метров</li>
                                        </ul>
                                    </Div>
                                </Accordion.Content>
                            </Accordion>
                            <Accordion>
                                <Accordion.Summary iconPosition="before"><b>18 баллов</b></Accordion.Summary>
                                <Accordion.Content>
                                    <Div>
                                        <ul className='mobile-bottom-border'>
                                            <li><strong>Фехтование:</strong>Уровень Зоро на Арабасте</li>
                                            <li><strong>Рукопашный бой:</strong>Уровень Санджи на Арабасте</li>
                                            <li><strong>Стрельба:</strong>Радиус ружья достигает 70-и метров. Времени на прицел 
                                            тратится очень мало. Улучшенная реакция. Скоростная перезарядка. Оружие лежит в руке легко, 
                                            руки практически не устают</li>
                                        </ul>
                                    </Div>
                                </Accordion.Content>
                            </Accordion>
                            <Accordion>
                                <Accordion.Summary iconPosition="before"><b>22 баллов</b></Accordion.Summary>
                                <Accordion.Content>
                                    <Div>
                                        <ul className='mobile-bottom-border'>
                                            <li><strong>Фехтование:</strong>Уровень Зоро в Скайпии</li>
                                            <li><strong>Рукопашный бой:</strong>Уровень Санджи в Скайпии</li>
                                            <li><strong>Стрельба:</strong>Открыт доступ к снайперскому оружию</li>
                                        </ul>
                                    </Div>
                                </Accordion.Content>
                            </Accordion>
                            <Accordion>
                                <Accordion.Summary iconPosition="before"><b>25 баллов</b></Accordion.Summary>
                                <Accordion.Content>
                                    <Div>
                                        <ul className='mobile-bottom-border'>
                                            <li><strong>Фехтование:</strong>Уровень Зоро в Эниес Лобби</li>
                                            <li><strong>Рукопашный бой:</strong>Уровень Санджи в Эниес Лобби</li>
                                            <li><strong>Стрельба:</strong>Радиус доступных оружие увеличивается до 
                                            100 метров, снайперского оружия - до 200. Короткое время на прицел 
                                            (не считая снайперов). Высокая реакция</li>
                                        </ul>
                                    </Div>
                                </Accordion.Content>
                            </Accordion>
                            <Accordion>
                                <Accordion.Summary iconPosition="before"><b>30 баллов</b></Accordion.Summary>
                                <Accordion.Content>
                                    <Div>
                                        <ul className='mobile-bottom-border'>
                                            <li><strong>Фехтование:</strong>Уровень Зоро на Триллер Барке</li>
                                            <li><strong>Рукопашный бой:</strong>Уровень Санджи на Триллер Барке</li>
                                            <li><strong>Стрельба:</strong>Стрельба от бедра с пистолета имеет 
                                            превосходную точность, можете подстрелить противников в сору. Около ста 
                                            метров - стабильные попадания с небольшим шансом промаха</li>
                                        </ul>
                                    </Div>
                                </Accordion.Content>
                            </Accordion>
                            <Accordion>
                                <Accordion.Summary iconPosition="before"><b>35 баллов</b></Accordion.Summary>
                                <Accordion.Content>
                                    <Div>
                                        <ul className='mobile-bottom-border'>
                                            <li><strong>Фехтование:</strong>Начало тренировки с Бабуинами на острове Михоука</li>
                                            <li><strong>Рукопашный бой:</strong>Начало тренировки на острове Окам</li>
                                            <li><strong>Стрельба:</strong>Молниеносная скорость вытягивания оружия, на прицел 
                                            отводится минимальное количество времени, как и на перезарядку</li>
                                        </ul>
                                    </Div>
                                </Accordion.Content>
                            </Accordion>
                            <Accordion>
                                <Accordion.Summary iconPosition="before"><b>50 баллов</b></Accordion.Summary>
                                <Accordion.Content>
                                    <Div>
                                        <ul className='mobile-bottom-border'>
                                            <li><strong>Фехтование:</strong>Уровень Зоро из Нового Мира</li>
                                            <li><strong>Рукопашный бой:</strong>Уровень Зоро из Нового Мира</li>
                                            <li><strong>Стрельба:</strong>Обладаете молниеносной реакцией (чуть 
                                            хуже ВН<sup>4</sup>), можете подстрелить муху с пистолета с 100 метров. Вам 
                                            доступны все виды огнестрельного оружия, которое вы можете использовать 
                                            на достаточном уровне</li>
                                        </ul>
                                    </Div>
                                </Accordion.Content>
                            </Accordion>
                        </Accordion.Content>
                    </Accordion>
                </div>
                <p>Сноски:</p>
                <ol className="numbered">
                    <li><span>Приведены не самые точные, но близкие к реалиям нашей ролевой, примеры, к которым должен придерживаться каждый игрок.</span></li>
                    <li><span>Взят, как пример, Зоро</span></li>
                    <li><span>Взят, как пример, Санджи</span></li>
                    <li><span>Воля Наблюдения (ВН).</span></li>
                </ol>
            </Div>
        </Group>
        <Button size="m" onClick={() => routeNavigator.back()} className='back-button'>Назад</Button>
    </div>

    </Panel>
  );
};