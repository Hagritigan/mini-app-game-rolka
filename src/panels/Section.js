import { Panel, PanelHeader, PanelHeaderBack, Placeholder } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import PersikImage from '../assets/persik.png';
import { SECTIONS } from '../config/sections';

const SECTION_CONTENT = {
  south: {
    header: 'Сражения и рейтинг',
    text: 'Соревнуйтесь с другими игроками и поднимайтесь в таблице лидеров.',
  },
  west: {
    header: 'Отдых у костра',
    text: 'Уютная база между походами — настройки и друзья.',
    image: PersikImage,
    imageAlt: 'Персик в лагере',
  },
};

export const Section = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const section = SECTIONS.find((s) => s.id === id);
  const content = SECTION_CONTENT[id];

  if (!section || !content) {
    return null;
  }

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
        {section.title}
      </PanelHeader>
      <Placeholder header={content.header} stretched>
        {content.image ? (
          <img width={220} src={content.image} alt={content.imageAlt} style={{ marginBottom: 16 }} />
        ) : null}
        {content.text}
      </Placeholder>
    </Panel>
  );
};

Section.propTypes = {
  id: PropTypes.oneOf(['south', 'west']).isRequired,
};
