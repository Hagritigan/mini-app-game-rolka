import { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  ModalRoot,
  ModalPage,
  ModalPageHeader,
  ModalDismissButton,
  ModalCard,
  Div,
  Spacing,
  useAdaptivityWithJSMediaQueries,
} from '@vkontakte/vkui';
import { MarineBaseImageModalContext } from './context/MarineBaseImageModalContext';

const MARINE_BASE_IMAGE_MODAL_ID = 'marine-base-image';

function MarineBaseImageModalRoot({ activeModal, preview, onClose }) {
  const { isDesktop } = useAdaptivityWithJSMediaQueries();

  if (isDesktop) {
    return (
      <ModalRoot activeModal={activeModal} onClose={onClose}>
        <ModalPage
          id={MARINE_BASE_IMAGE_MODAL_ID}
          onClose={onClose}
          hideCloseButton
          header={
            <ModalPageHeader before={<ModalDismissButton onClick={onClose} />} noSeparator>
              {preview?.title ?? ''}
            </ModalPageHeader>
          }
          settlingHeight={100}
          size="l"
        >
          {preview ? (
            <Div style={{ padding: '12px 16px 24px', boxSizing: 'border-box' }}>
              <img
                src={preview.src}
                alt={preview.title}
                style={{
                  display: 'block',
                  width: '100%',
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: 10,
                }}
              />
            </Div>
          ) : null}
        </ModalPage>
      </ModalRoot>
    );
  }

  return (
    <ModalRoot activeModal={activeModal} onClose={onClose}>
      <ModalCard
        id={MARINE_BASE_IMAGE_MODAL_ID}
        className="marine-base-image-modal-card"
        onClose={onClose}
        header={preview?.title ?? ''}
        dismissButtonMode="inside"
        dismissLabel="Закрыть"
        size={520}
      >
        {preview ? (
          <>
            <Spacing size={8} />
            <Div className="marine-base-image-modal-card__body">
              <img src={preview.src} alt={preview.title} className="marine-base-image-modal-card__img" />
            </Div>
            <Spacing size={12} />
          </>
        ) : null}
      </ModalCard>
    </ModalRoot>
  );
}

MarineBaseImageModalRoot.propTypes = {
  activeModal: PropTypes.string,
  preview: PropTypes.shape({
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export function RulesShell({ children }) {
  const [marineBaseImagePreview, setMarineBaseImagePreview] = useState(null);

  const closeMarineBaseImageModal = useCallback(() => {
    setMarineBaseImagePreview(null);
  }, []);

  const openMarineBaseImage = useCallback((src, title) => {
    setMarineBaseImagePreview({ src, title });
  }, []);

  const marineBaseImageModalValue = useMemo(() => ({ openMarineBaseImage }), [openMarineBaseImage]);

  const activeModal = marineBaseImagePreview ? MARINE_BASE_IMAGE_MODAL_ID : null;

  const modal = (
    <MarineBaseImageModalRoot
      activeModal={activeModal}
      preview={marineBaseImagePreview}
      onClose={closeMarineBaseImageModal}
    />
  );

  return (
    <MarineBaseImageModalContext.Provider value={marineBaseImageModalValue}>
      {typeof children === 'function' ? children(modal) : children}
    </MarineBaseImageModalContext.Provider>
  );
}

RulesShell.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};
