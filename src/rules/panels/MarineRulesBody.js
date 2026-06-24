/* eslint-disable react/prop-types -- внутренние хелперы; публичный API — MarineRulesBody.propTypes */
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { Accordion, Div } from '@vkontakte/vkui';
import {
  MARINE_BOT_REWARD_ROWS,
  MARINE_OZ_PLAYERS_LINK,
  MARINE_OFFICER_SECTIONS,
  MARINE_RANKS,
  MARINE_RULE_FLOW,
} from './marineRules.data';
import { MARINE_ISLAND_CONTROL_PATH } from './constants';

function renderInlineSegments(segments) {
  if (!segments?.length) return null;
  return segments.map((p, i) => {
    if (p.text != null) return <Fragment key={i}>{p.text}</Fragment>;
    if (p.bold != null) return <strong key={i}><br />{p.bold}</strong>;
    return null;
  });
}

function renderTaskParagraphBody(tasks) {
  if (tasks.paragraphParts?.length) {
    return renderInlineSegments(tasks.paragraphParts);
  }
  if (tasks.paragraph != null) return tasks.paragraph;
  return null;
}

function taskObjectHasParagraph(tasks) {
  return Boolean(tasks?.paragraph || tasks?.paragraphParts?.length);
}

function renderRichParts(parts, routeNavigator) {
  return parts.map((p, i) => {
    if (p.text != null) return <Fragment key={i}>{p.text}</Fragment>;
    if (p.bold != null) return <strong key={i}>{p.bold}</strong>;
    if (p.em != null) return <em key={i}>{p.em}</em>;
    if (p.link != null) {
      return (
        <a key={i} href={p.link.href} className="link" target="_blank" rel="noreferrer">
          {p.link.label}
        </a>
      );
    }
    if (p.route != null) {
      return (
        <span
          key={i}
          className="link"
          onClick={() => routeNavigator.push(p.route)}
          role="link"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              routeNavigator.push(p.route);
            }
          }}
        >
          {p.routeLabel}
        </span>
      );
    }
    return null;
  });
}

function formatTasksForTable(tasks) {
  if (tasks === '-' || tasks === '–') return tasks;
  if (typeof tasks === 'string') return tasks;
  return (
    <>
      <p>{renderTaskParagraphBody(tasks)}</p>
      {tasks.bullets?.length ? (
        <ul className="listing">
          {tasks.bullets.map((b) => (
            <li key={b}>
              <span className="l">{b}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

function RankMobileAccordionItems({ rank, ozKey }) {
  const oz = rank[ozKey];
  const tasks = rank.tasks;

  if (rank.admiralFleetMobileLines) {
    return (
      <ul className="mobile-bottom-border">
        {rank.admiralFleetMobileLines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    );
  }

  if (rank.title === 'Адмирал' && typeof tasks === 'object' && taskObjectHasParagraph(tasks)) {
    return (
      <ul className="mobile-bottom-border">
        {renderTaskParagraphBody(tasks)}
        <li>
          <strong>Количество ботов в подкрепление:</strong> {rank.bots}
        </li>
        {rank.mobileAbilityLabel ? (
          <li>
            <strong>{rank.mobileAbilityLabel}</strong>
          </li>
        ) : null}
      </ul>
    );
  }

  const items = [];
  const hasTasks = tasks && tasks !== '-' && tasks !== '–';

  if (hasTasks && typeof tasks === 'string') {
    items.push(
      <li key="z">
        <strong>Задания:</strong> {tasks}
      </li>,
    );
  } else if (hasTasks && typeof tasks === 'object' && taskObjectHasParagraph(tasks)) {
    items.push(
      <li key="z">
        <strong>Задания:</strong> {renderTaskParagraphBody(tasks)}
      </li>,
    );
  }

  if (oz && oz !== '-') {
    items.push(
      <li key="oz">
        <strong>Количество ОЗ:</strong> {oz}
      </li>,
    );
  }

  items.push(
    <li key="bots">
      <strong>Количество ботов в подкрепление:</strong> {rank.bots}
    </li>,
  );

  if (typeof tasks === 'object' && taskObjectHasParagraph(tasks) && rank.mobileAbilityLabel) {
    items.push(
      <li key="ab">
        <strong>{rank.mobileAbilityLabel}</strong>
      </li>,
    );
  }

  return <ul className="mobile-bottom-border">{items}</ul>;
}

/** Вице-адмирал: текст задания вне &lt;li&gt;, как в исходной вёрстке. */
function ViceAdmiralMobileList({ rank }) {
  return (
    <ul className="mobile-bottom-border">
      {rank.tasks}
      <li>
        <strong>Количество ботов в подкрепление:</strong> {rank.bots}
      </li>
    </ul>
  );
}

function RankMobileBlock({ rank, ozKey }) {
  if (rank.title === 'Вице-адмирал') {
    return <ViceAdmiralMobileList rank={rank} />;
  }
  return <RankMobileAccordionItems rank={rank} ozKey={ozKey} />;
}

function MarineRanksSection() {
  const head = MARINE_RANKS.slice(0, 7);
  const tail = MARINE_RANKS.slice(7);

  return (
    <>
      <div className="desktop-only">
        <table>
          <thead>
            <tr>
              <th scope="col">Звание</th>
              <th scope="col">Задания</th>
              <th scope="col">Количество ОЗ</th>
              <th scope="col">Количество ботов в подкрепление</th>
            </tr>
          </thead>
          <tbody>
            {MARINE_RANKS.map((row) => (
              <tr key={row.title}>
                <th scope="row">{row.title}</th>
                <td>{formatTasksForTable(row.tasks)}</td>
                <td>{row.ozCommander}</td>
                <td>{row.bots}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <br />
      </div>
      <div className="mobile-only">
        <Accordion>
          <Accordion.Summary iconPosition="before">
            <b>Звания</b>
          </Accordion.Summary>
          <Accordion.Content>
            {head.map((row) => (
              <Accordion key={row.title}>
                <Accordion.Summary iconPosition="before">
                  <b>{row.title}</b>
                </Accordion.Summary>
                <Accordion.Content>
                  <Div>
                    <RankMobileBlock rank={row} ozKey="ozCommander" />
                  </Div>
                </Accordion.Content>
              </Accordion>
            ))}
            {tail.map((row) => (
              <Accordion key={row.title}>
                <Accordion.Summary iconPosition="before">
                  <b>{row.title}</b>
                </Accordion.Summary>
                <Accordion.Content>
                  <Div>
                    <RankMobileBlock rank={row} ozKey="ozCommander" />
                  </Div>
                </Accordion.Content>
              </Accordion>
            ))}
          </Accordion.Content>
        </Accordion>
        <br />
        <br />
      </div>
    </>
  );
}

function MarineBotRewardsSection() {
  return (
    <>
      <div className="desktop-only">
        <table>
          <thead>
            <tr>
              <th scope="col">Звание</th>
              <th scope="col">Вариант №1</th>
              <th scope="col">Вариант №2</th>
              <th scope="col">Вариант №3</th>
            </tr>
          </thead>
          <tbody>
            {MARINE_BOT_REWARD_ROWS.map((r) => (
              <tr key={r.rank}>
                <th scope="row">{r.rank}</th>
                {r.variants.map((v, j) => (
                  <td key={j}>{v ?? '-'}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mobile-only">
        <Accordion>
          <Accordion.Summary iconPosition="before">
            <b>Звания</b>
          </Accordion.Summary>
          <Accordion.Content>
            {MARINE_BOT_REWARD_ROWS.map((r) => (
              <Accordion key={r.rank}>
                <Accordion.Summary iconPosition="before">
                  <b>{r.rank}</b>
                </Accordion.Summary>
                <Accordion.Content>
                  <Div>
                    <ul className="mobile-bottom-border">
                      {r.variants.filter(Boolean).map((line) => {
                        const isAdmiralOr =
                          r.rank === 'Адмирал' && line.includes('ИЛИ');
                        if (isAdmiralOr) {
                          const [a, b] = line.split(' ИЛИ ');
                          return (
                            <li key={line}>
                              {a} <strong>ИЛИ</strong> {b}
                            </li>
                          );
                        }
                        return <li key={line}>{line}</li>;
                      })}
                    </ul>
                  </Div>
                </Accordion.Content>
              </Accordion>
            ))}
          </Accordion.Content>
        </Accordion>
      </div>
    </>
  );
}

function MarineOfficersSection() {
  return (
    <>
      {MARINE_OFFICER_SECTIONS.map((sec) => (
        <Fragment key={sec.heading}>
          {sec.heading}
          <ul className="listing">
            {sec.items.map((item) => (
              <li key={item}>
                <span className="l">{item}</span>
              </li>
            ))}
          </ul>
        </Fragment>
      ))}
    </>
  );
}

export function MarineRulesBody({ routeNavigator }) {
  return (
    <>
      {MARINE_RULE_FLOW.map((block, idx) => {
        if (block.type === 'gap') {
          return (
            <Fragment key={`gap-${idx}`}>
              <br />
              <br />
            </Fragment>
          );
        }
        if (block.type === 'rich') {
          return <Fragment key={`rich-${idx}`}>{renderRichParts(block.parts, routeNavigator)}</Fragment>;
        }
        if (block.type === 'ul') {
          return (
            <ul key={`ul-${idx}`} className={block.listClass}>
              {block.items.map((item) => (
                <li key={item}>
                  <span className={block.itemClass}>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === 'ranks') {
          return <MarineRanksSection key={`ranks-${idx}`} />;
        }
        if (block.type === 'botRewards') {
          return <MarineBotRewardsSection key={`bots-${idx}`} />;
        }
        if (block.type === 'officers') {
          return <MarineOfficersSection key={`off-${idx}`} />;
        }
        if (block.type === 'section99') {
          return (
            <Fragment key="s99">
              <strong>9.9</strong>
              &nbsp;
              <strong>
                <span
                  className="link"
                  onClick={() => routeNavigator.push({ pathname: MARINE_ISLAND_CONTROL_PATH })}
                  role="link"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      routeNavigator.push({ pathname: MARINE_ISLAND_CONTROL_PATH });
                    }
                  }}
                >
                  Установление влияния Морского Дозора на острове.
                </span>
              </strong>
            </Fragment>
          );
        }
        if (block.type === 'section910') {
          return (
            <Fragment key="s910">
              <strong>
                9.10&nbsp;
                <a href={MARINE_OZ_PLAYERS_LINK.href} className="link" target="_blank" rel="noreferrer">
                  {MARINE_OZ_PLAYERS_LINK.label}
                </a>
                .
              </strong>
              &nbsp;В этой теме вы сможете посмотреть, кто из дозорных на каком звании, а также сколько у них ОЗ.
            </Fragment>
          );
        }
        return null;
      })}
    </>
  );
}

MarineRulesBody.propTypes = {
  routeNavigator: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
