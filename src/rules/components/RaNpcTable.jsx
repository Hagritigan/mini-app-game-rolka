import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Div,
  ModalCard,
  ModalDismissButton,
  ModalPage,
  ModalPageHeader,
  ModalRoot,
  useAdaptivityWithJSMediaQueries,
} from '@vkontakte/vkui';
import './RaNpcTable.css';

const BACKSTORY_MODAL_ID = 'ra-npc-backstory';
const BACKSTORY_BUTTON_LABEL = 'Показать информацию';

function hasNpcBackstory(npc) {
  return Boolean(npc.backstory?.trim());
}

function NpcBackstoryTrigger({ npc, onOpen }) {
  if (!hasNpcBackstory(npc)) {
    return null;
  }

  if (!npc.backstoryTitle) {
    return <span className="ra-npc-table__backstory-plain">{npc.backstory}</span>;
  }

  return (
    <button
      type="button"
      className="ra-npc-table__backstory-trigger"
      onClick={() => onOpen(npc)}
    >
      <span>{BACKSTORY_BUTTON_LABEL}</span>
    </button>
  );
}

NpcBackstoryTrigger.propTypes = {
  npc: PropTypes.shape({
    backstoryTitle: PropTypes.string,
    backstory: PropTypes.string,
  }).isRequired,
  onOpen: PropTypes.func.isRequired,
};

function RaNpcBackstoryModal({ npc, onClose, isDesktop }) {
  if (!npc) {
    return null;
  }

  const body = (
    <Div className="ra-npc-backstory-modal__body">
      <p className="ra-npc-backstory-modal__name">{npc.name}</p>
      {npc.rank ? (
        <p className="ra-npc-backstory-modal__rank">{npc.rank}</p>
      ) : null}
      {hasNpcBackstory(npc) ? (
        <p className="ra-npc-backstory-modal__text">{npc.backstory}</p>
      ) : null}
    </Div>
  );

  if (isDesktop) {
    return (
      <ModalPage
        id={BACKSTORY_MODAL_ID}
        onClose={onClose}
        hideCloseButton
        header={(
          <ModalPageHeader before={<ModalDismissButton onClick={onClose} />} noSeparator>
            {npc.backstoryTitle}
          </ModalPageHeader>
        )}
        settlingHeight={100}
        size="l"
      >
        {body}
      </ModalPage>
    );
  }

  return (
    <ModalCard
      id={BACKSTORY_MODAL_ID}
      className="ra-npc-backstory-modal-card"
      onClose={onClose}
      header={npc.backstoryTitle}
      dismissButtonMode="inside"
      dismissLabel="Закрыть"
      size={520}
    >
      {body}
    </ModalCard>
  );
}

RaNpcBackstoryModal.propTypes = {
  npc: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rank: PropTypes.string,
    backstoryTitle: PropTypes.string,
    backstory: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  isDesktop: PropTypes.bool.isRequired,
};

function NpcImage({ npc }) {
  if (!npc.imageUrl) {
    return <span className="ra-npc-table__no-image">—</span>;
  }

  return (
    <img
      src={npc.imageUrl}
      alt={npc.name}
      className="ra-npc-table__image"
      loading="lazy"
    />
  );
}

NpcImage.propTypes = {
  npc: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    imageLink: PropTypes.string,
  }).isRequired,
};

const npcShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  rank: PropTypes.string,
  backstoryTitle: PropTypes.string,
  backstory: PropTypes.string,
  imageUrl: PropTypes.string,
  imageLink: PropTypes.string,
});

export function RaNpcTable({ npcs }) {
  const [selectedNpc, setSelectedNpc] = useState(null);
  const { isDesktop } = useAdaptivityWithJSMediaQueries();
  const closeModal = useCallback(() => setSelectedNpc(null), []);
  const openModal = useCallback((npc) => setSelectedNpc(npc), []);

  return (
    <>
      <div className="ra-npc-table__grid">
        {npcs.map((npc) => (
          <article key={npc.name} className="ra-npc-card">
            <div className="ra-npc-card__media">
              <NpcImage npc={npc} />
            </div>
            <div className="ra-npc-card__body">
              <h3 className="ra-npc-card__name">{npc.name}</h3>
              <p className="ra-npc-card__rank">{npc.rank || '—'}</p>
              {hasNpcBackstory(npc) ? (
                <div className="ra-npc-card__backstory">
                  <NpcBackstoryTrigger npc={npc} onOpen={openModal} />
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <ModalRoot
        activeModal={selectedNpc ? BACKSTORY_MODAL_ID : null}
        onClose={closeModal}
      >
        <RaNpcBackstoryModal
          npc={selectedNpc}
          onClose={closeModal}
          isDesktop={isDesktop}
        />
      </ModalRoot>
    </>
  );
}

RaNpcTable.propTypes = {
  npcs: PropTypes.arrayOf(npcShape).isRequired,
};
