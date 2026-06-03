import { Panel, PanelHeader } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import { TileMenu } from '../components/TileMenu';

export const Home = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      <TileMenu onNavigate={(panel) => routeNavigator.push(panel)} />
    </Panel>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
};
