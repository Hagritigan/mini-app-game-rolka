import PropTypes from 'prop-types';
import { openExternalLink } from '../../utils/openExternalLink';
import './OzPlayersRankTable.css';

const RANK_HEADER = 'Звание';
const DEFAULT_SCORE_COLUMN_LABEL = 'Кол-во ОЗ';

function CharacterName({ player }) {
  if (player.ownerLink) {
    return (
      <a
        href={player.ownerLink}
        className="link wk_vk_link"
        target="_blank"
        rel="noreferrer"
        onClick={(event) => openExternalLink(player.ownerLink, event)}
      >
        {player.characterName}
      </a>
    );
  }

  return player.characterName;
}

CharacterName.propTypes = {
  player: PropTypes.shape({
    characterName: PropTypes.string.isRequired,
    ownerLink: PropTypes.string,
  }).isRequired,
};

function PersonalFileLink({ link }) {
  if (!link) {
    return '—';
  }

  return (
    <a
      href={link}
      className="link wk_vk_link"
      target="_blank"
      rel="noreferrer"
      onClick={(event) => openExternalLink(link, event)}
    >
      ЛД
    </a>
  );
}

PersonalFileLink.propTypes = {
  link: PropTypes.string,
};

function getTableHeaders(showRank, scoreColumnLabel) {
  const baseHeaders = [
    '№',
    'Имя персонажа',
    scoreColumnLabel,
    'Кол-во Баллов',
    'ЛД',
  ];

  if (!showRank) {
    return baseHeaders;
  }

  return [
    baseHeaders[0],
    baseHeaders[1],
    RANK_HEADER,
    ...baseHeaders.slice(2),
  ];
}

function OzPlayersRankDesktopTable({ players, showRank, scoreColumnLabel }) {
  const headers = getTableHeaders(showRank, scoreColumnLabel);

  return (
    <div className="oz-players-rank-table__desktop desktop-only">
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={`${player.number}-${player.characterName}`}>
              <td>{player.number}</td>
              <td>
                <CharacterName player={player} />
              </td>
              {showRank && <td>{player.rank || '—'}</td>}
              <td>{player.ozCount || '—'}</td>
              <td>{player.points || '—'}</td>
              <td>
                <PersonalFileLink link={player.personalFileLink} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

OzPlayersRankDesktopTable.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    number: PropTypes.string,
    characterName: PropTypes.string.isRequired,
    ownerLink: PropTypes.string,
    rank: PropTypes.string,
    ozCount: PropTypes.string,
    points: PropTypes.string,
    personalFileLink: PropTypes.string,
  })).isRequired,
  showRank: PropTypes.bool.isRequired,
  scoreColumnLabel: PropTypes.string.isRequired,
};

function OzPlayersRankMobileList({ players, showRank, scoreColumnLabel }) {
  return (
    <div className="oz-players-rank-table__mobile mobile-only">
      {players.map((player) => (
        <article
          key={`${player.number}-${player.characterName}`}
          className="oz-player-card"
        >
          <header className="oz-player-card__header">
            <span className="oz-player-card__number">{player.number}</span>
            <h3 className="oz-player-card__name">
              <CharacterName player={player} />
            </h3>
          </header>
          <dl className="oz-player-card__stats">
            {showRank && (
              <div className="oz-player-card__stat oz-player-card__stat--full">
                <dt>Звание</dt>
                <dd>{player.rank || '—'}</dd>
              </div>
            )}
            <div className="oz-player-card__stat">
              <dt>{scoreColumnLabel}</dt>
              <dd>{player.ozCount || '—'}</dd>
            </div>
            <div className="oz-player-card__stat">
              <dt>Кол-во Баллов</dt>
              <dd>{player.points || '—'}</dd>
            </div>
            <div className="oz-player-card__stat oz-player-card__stat--full">
              <dt>ЛД</dt>
              <dd>
                <PersonalFileLink link={player.personalFileLink} />
              </dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}

OzPlayersRankMobileList.propTypes = OzPlayersRankDesktopTable.propTypes;

export function OzPlayersRankTable({
  players,
  showRank = true,
  scoreColumnLabel = DEFAULT_SCORE_COLUMN_LABEL,
}) {
  return (
    <div className="oz-players-rank-table">
      <OzPlayersRankDesktopTable
        players={players}
        showRank={showRank}
        scoreColumnLabel={scoreColumnLabel}
      />
      <OzPlayersRankMobileList
        players={players}
        showRank={showRank}
        scoreColumnLabel={scoreColumnLabel}
      />
    </div>
  );
}

OzPlayersRankTable.propTypes = {
  ...OzPlayersRankDesktopTable.propTypes,
  showRank: PropTypes.bool,
  scoreColumnLabel: PropTypes.string,
};
