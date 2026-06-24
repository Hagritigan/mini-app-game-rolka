import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, Accordion } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import './RulesApp.css';

export const Bosses = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <div className="rules-panel">
      <PanelHeader>Боссы</PanelHeader>
      <Button size="m" onClick={() => routeNavigator.back()} className='back-button'>Назад</Button>
      <Group>
        <Div>
          <div className='gray-block'>
              <span><strong>Мировые Боссы&nbsp;</strong></span>
              <span>- это уникальный игровой контент, нацеленный на взаимодействие с миром, раскрытии его сюжетного основания и возможностью боевого столкновения с администрацией в рамках игры</span>
              <span><strong>&nbsp;PvE.</strong></span>
          </div>
          <br />
          <p>Каждый игрок, независимо от уровня сил и способностей своего персонажа, может выбрать для себя того&nbsp;<a class="wk_vk_link link" target='_blank' href="https://vk.com/album-36291248_240523150">Босса</a>, которого 
          желает в последующем победить или заполучить в своё попичение,&nbsp;<em>обходя ограничения на количество слотов доступных к регистрации ботов</em>. При выборе рекомендуется учитывать не только свои 
          возможности, как и возможности игрового персонажа, но и нахождение на острове того или иного героя.</p>
          <center><img style={{maxWidth: '100%', height: 'auto'}} class="wk_photo" title="" src="https://sun9-14.userapi.com/impf/piF6lrzM9cTxvGWe8QSkKoXN13hCcGKA6hdyNw/goU_-JM1cpk.jpg?size=807x10&amp;quality=95&amp;sign=ef703dd5b71c00267c351b68a2a960b1&amp;type=album" alt="" width="610" height="10" /></center>
          <p><center style={{fontSize: '16px'}}><strong><tt>Существует определенный порядок и ряд правил, которые необходимо учитывать в подобной игре.</tt></strong></center></p>
          <ul class="listing">
          <li><span class="l"><span class="l">После выбора желаемой цели, необходимо сообщить квестологу о том, что Вы желаете сразиться или провести игру с Мировым Боссом. После чего Вам необходимо будет написать предквест, который подводит к цели.</span></span>
          <ul class="listing">
          <li><span class="l"><span class="wk_gray">У Вас нет ограничений на количество слов в предквесте, однако, важно учитывать, что оным Вы упрощаете себе дальнейшее столкновение и решение игровых задач, а от того его логичность и качество напрямую связано с дальнейшим развитием событий.</span></span></li>
          </ul>
          </li>
          <li><span class="l"><span class="l">По завершению предквеста, необходимо также сообщить квестологу и озвучить желаемого Game Master [далее&nbsp;<strong>GM</strong>], озвучив при этом желаемый&nbsp;<u>Ранг Сложности</u>.</span></span>
          <ul class="listing">
          <li><span class="l"><span class="wk_gray">Администрация проекта учитывает Ваше желание на конкретного GM-а, но не возводит его к абсолютному значению, а потому несмотря на Ваш выбор, может быть назначен иной отыгрывающий.</span></span></li>
          <li><span class="l"><span class="wk_gray">Данный вид контента реализуется исключительно через и с отыгрывающим -&nbsp;<strong>GM</strong>.</span></span></li>
          </ul>
          </li>
          <li><span class="l">В дальнейшем остается только ждать пост GM-а, а всякая обратная связь и взаимодействие может происходить непосредственно при личном общении с отыгрывающим.</span></li>
          <li><span class="l"><span class="l">После окончания Вашей игры, независимо от расклада, GM обязуется сообщить о том, что именно Вы получили и насколько заработали своей игрой. При этом для получения награды и сдачи Островного Приключения, игрок самостоятельно обращается к любому из квестологов.</span></span>
          <ul class="listing">
          <li><span class="l"><span class="wk_gray">Игрок может запросить награду и её проставление в Личное Дело не заканчивая Островное Приключение, однако подобный нюанс необходимо уточнить. Указывать количество слов в таком случае не надо, ведь они учитываются только при проверке Островного Приключения.</span></span></li>
          <li><span class="l"><span class="wk_gray">Именно GM определяет конечную награду и сие решение не обсуждается.</span></span></li>
          </ul>
          </li>
          </ul>
          {/* <p><br /><br /></p> */}
          <center><img style={{maxWidth: '100%', height: 'auto'}} class="wk_photo" title="" src="https://sun9-14.userapi.com/impf/piF6lrzM9cTxvGWe8QSkKoXN13hCcGKA6hdyNw/goU_-JM1cpk.jpg?size=807x10&amp;quality=95&amp;sign=ef703dd5b71c00267c351b68a2a960b1&amp;type=album" alt="" width="610" height="10" /></center>
          <br />
          <center style={{fontSize: '16px'}}><strong><tt>Ранг сложности определяют конечный результат и бонусные награды. При выборе уровня необходимо это учитывать.</tt></strong></center>
          <blockquote className='desktop-only'><center>Ниже представлены Ранги Сложности и максимальные&nbsp;<span class="wk_gray">(могут быть ниже)</span>&nbsp;награды на каждом из. Все они учитываются дополнительно, поверх Вашего Островного Приключения.</center></blockquote>
          <div className='mobile-only'><center>Ниже представлены Ранги Сложности и максимальные&nbsp;<span class="wk_gray">(могут быть ниже)</span>&nbsp;награды на каждом из. Все они учитываются дополнительно, поверх Вашего Островного Приключения.</center></div>
          <br className='desktop-only' />
          <table class="wk_table wk_table_no_margin desktop-only" cellspacing="0" cellpadding="0">
            <tbody>
            <tr>
            <td><center><strong>Ранг</strong></center></td>
            <td><center><strong>Описание</strong></center></td>
            <td><center><strong>Бонус</strong></center></td>
            <td><center><strong>Баллы</strong></center></td>
            </tr>
            <tr>
            <td><strong>I</strong></td>
            <td><em>Данный уровень рекомендуется брать начинающим или тем, кто не уверен в себе. При игре на этом ранге, Вы, вероятней всего, не встретите трудностей в реализации Ваших идей и задумок, а различные ошибки не станут критичными, ведь отыгрывающий наверняка закроет на них глаза. Умереть на этом этапе будет достаточно сложно.</em></td>
            <td><em>5.000.000 к награде за голову или 200 ОЗ.</em></td>
            <td>1 балл.</td>
            </tr>
            <tr>
            <td><strong>II</strong></td>
            <td><em>Рекомендуется брать уверенным в себе игрокам, которые хорошо чувствуют персонажа и игру, уже имеют некоторый опыт в реализации своих способностей. Умеренная игра, которая, вероятно, предоставит Вам трудности при совершенных ошибках, а при критических - и вовсе может стоить жизни персонажа. Однако, данный ранг подразумевает отсутствие желания у GM-а погубить Вашего героя.</em></td>
            <td><em>10.000.000 к награде за голову или 400 ОЗ.</em></td>
            <td>2 балла.</td>
            </tr>
            <tr>
            <td><strong>III</strong></td>
            <td><em>Только для тех, кто точно знает, что победит и не сомневается в себе. Тот, кто не боится, в случае ошибки, потерять персонажа, ведь на этом ранге отыгрывающий будет реализовывать Мирового Босса так, как если бы это был его персонаж. Данный режим подразумевается непосредственное PvP с администратором, с последующими издержками и рисками. Ошибки, даже незначительные, могут строго наказываться и стоить дорого.</em></td>
            <td><em>25.000.000 к награде за голову или 800 ОЗ.</em></td>
            <td>3 балла.</td>
            </tr>
            </tbody>
          </table>
          <div className='mobile-only'>
            <Accordion open>
                <Accordion.Summary iconPosition="before"><b>Ранг I</b></Accordion.Summary>
                <Accordion.Content>
                    <Div>
                      <em>Данный уровень рекомендуется брать начинающим или тем, кто не уверен в себе. При игре на этом ранге, Вы, вероятней всего, не встретите трудностей в реализации Ваших идей и задумок, а различные ошибки не станут критичными, ведь отыгрывающий наверняка закроет на них глаза. Умереть на этом этапе будет достаточно сложно.</em>
                      <br />
                      <br />
                      <strong>Бонус</strong>:
                      <ul className="listing">
                          <li><span className="l">5.000.000 к награде за голову или 200 ОЗ.</span></li>
                      </ul>
                      <strong>Баллы</strong>:
                      <ul className="listing">
                          <li><span className="l">1 балл.</span></li>
                      </ul>
                    </Div>
                </Accordion.Content>
            </Accordion>
            <Accordion open>
                <Accordion.Summary iconPosition="before"><b>Ранг II</b></Accordion.Summary>
                <Accordion.Content>
                    <Div>
                      <em>Рекомендуется брать уверенным в себе игрокам, которые хорошо чувствуют персонажа и игру, уже имеют некоторый опыт в реализации своих способностей. Умеренная игра, которая, вероятно, предоставит Вам трудности при совершенных ошибках, а при критических - и вовсе может стоить жизни персонажа. Однако, данный ранг подразумевает отсутствие желания у GM-а погубить Вашего героя.</em>
                      <br />
                      <br />
                      <strong>Бонус</strong>:
                      <ul className="listing">
                          <li><span className="l">10.000.000 к награде за голову или 400 ОЗ.</span></li>
                      </ul>
                      <strong>Баллы</strong>:
                      <ul className="listing">
                          <li><span className="l">2 балла.</span></li>
                      </ul>
                    </Div>
                </Accordion.Content>
            </Accordion>
            <Accordion open>
                <Accordion.Summary iconPosition="before"><b>Ранг III</b></Accordion.Summary>
                <Accordion.Content>
                    <Div>
                      <em>Только для тех, кто точно знает, что победит и не сомневается в себе. Тот, кто не боится, в случае ошибки, потерять персонажа, ведь на этом ранге отыгрывающий будет реализовывать Мирового Босса так, как если бы это был его персонаж. Данный режим подразумевается непосредственное PvP с администратором, с последующими издержками и рисками. Ошибки, даже незначительные, могут строго наказываться и стоить дорого.</em>
                      <br />
                      <br />
                      <strong>Бонус</strong>:
                      <ul className="listing">
                          <li><span className="l">25.000.000 к награде за голову или 800 ОЗ.</span></li>
                      </ul>
                      <strong>Баллы</strong>:
                      <ul className="listing">
                          <li><span className="l">3 балла.</span></li>
                      </ul>
                    </Div>
                </Accordion.Content>
            </Accordion>
          </div>
          <p className='desktop-only'>&nbsp;</p>
          <center><img style={{maxWidth: '100%', height: 'auto'}} class="wk_photo" title="" src="https://sun9-14.userapi.com/impf/piF6lrzM9cTxvGWe8QSkKoXN13hCcGKA6hdyNw/goU_-JM1cpk.jpg?size=807x10&amp;quality=95&amp;sign=ef703dd5b71c00267c351b68a2a960b1&amp;type=album" alt="" width="610" height="10" /></center>
          <br />
          <center style={{fontSize: '16px'}}><strong><tt>Дополнительно стоит учитывать и другие особенности этой игры.</tt></strong></center>
          <ul class="listing">
          <li><span class="l">Указанные награды лишь примерные, так как некоторые Мировые Боссы могут таить в себе свои особенности и уникальные предметы, которые возможно выбить на&nbsp;<strong>втором и третьем рангах</strong>.</span></li>
          <li><span class="l">Решение GM в сражениях не есть абсолютным и может быть оспорено&nbsp;<a class="wk_vk_link" href="https://vk.com/id341014268">Арбитром</a>. Для этого Вам достаточно обратиться к ней лично, изложив суть возникшего конфликта.</span></li>
          <li><span class="l">Каждый сам несет ответственность за свои действия и принятые решения. Ролевая же, в свою очередь, предоставляет достаточную информацию для наиболее приятного игрового опыта, в том числе через информацию, предоставленную в альбоме, где изложены все Мировые Босы, в том числе и побежденные.</span></li>
          <li><span class="l">Важно учитывать, что в проекте существуют&nbsp;<strong>уникальные боссы</strong>, что не изложены в альбоме или не привязаны к одному острову. Их особенность может существенно изменить механику взаимодействия и получаемые награды, вплоть до невозможности выбора ранга или озвучивания желания в выборе отыгрывающего. Однако, несмотря на это, они всё также считаются Мировыми Боссами, как часть проекта и его сюжета.</span></li>
          </ul>
        </Div>
      </Group>
      <Button size="m" onClick={() => routeNavigator.back()} className='back-button'>Назад</Button>
    </div>

    </Panel>
  );
};