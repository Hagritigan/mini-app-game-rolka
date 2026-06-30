import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, PanelHeaderBack, Group, Div, ModalCard, ModalRoot } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { openExternalLink } from '../utils/openExternalLink';
import { useNavigationMeta } from '../hooks/useNavigationMeta';
import { IslandCard, InfluenceLegend, SearchInfluenceIndicator } from './components';
import { getInfluenceCount, getInfluenceStyle } from './utils/islandInfluence';
import { mainLocations } from './data/mainLocations';
import './NavigationPanel.css';

function getMaxIslandsInWays(ways) {
  return ways.reduce((max, way) => Math.max(max, way.islands.length), 0);
}

function NavigationLink({ href, className, style, children }) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={style}
      onClick={(event) => openExternalLink(href, event)}
    >
      {children}
    </a>
  );
}

NavigationLink.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export const NavigationPanel = ({ id }) => {

  const routeNavigator = useRouteNavigator();
  const { getMetaForLink, legendItems } = useNavigationMeta();
  const [currentSea, setCurrentSea] = useState(null);
  const [currentWay, setCurrentWay] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [currentIsland, setCurrentIsland] = useState(null);
  const [currentOthersWay, setCurrentOthersWay] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const seaDetailsRef = useRef(null);
  const wayDetailsRef = useRef(null);

  const openIslandModal = useCallback((island) => {
    setCurrentIsland(island);
    setActiveModal('island-modal');
  }, []);

  const renderIsland = useCallback((island, className = 'islandCard', style) => (
    <IslandCard
      key={island.title}
      island={island}
      meta={getMetaForLink(island.link)}
      className={className}
      style={style}
      onOpenModal={openIslandModal}
    />
  ), [getMetaForLink, openIslandModal]);

  useEffect(() => {
    if (currentSea && seaDetailsRef.current) {
      seaDetailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentSea]);

  useEffect(() => {
    if (currentWay && wayDetailsRef.current) {
      wayDetailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentWay]);

  const seaTitle = (
    <div className="fourSeasTitles">
      {mainLocations[0].ways.map((sea) => 
        <div className="seaTitle" key={sea.title}>{sea.title}</div>
      )}
    </div>
  );

  const fourSeas = mainLocations[0].ways.map((sea) => 
    <div key={sea.title} className="fourSeasColumn">
      {sea.islands.map((island) => renderIsland(island))}
    </div>
  );

  const fourSeasMobile = mainLocations[0].ways.map((sea) => 
    <div key={sea.title} className={`mobileSea ${currentSea?.title === sea.title ? 'mobileSeaActive' : ''}`}>
      <div className="seaTitle" 
        style={{textAlign: 'center', justifyContent: 'center !important'}}
        onClick={() => {
          if (currentSea?.title === sea.title) {
            setCurrentSea(null);
          } else {
            setCurrentSea(sea);
          }
        }}
      >{sea.title}</div>
    </div>
  );

  const grandLineTitleFirstHalf = (
    <div className="fourSeasTitles">
      {mainLocations[2].ways.slice(0, 4).map((sea) => 
        <div className="seaTitle" key={sea.title}>{sea.title}</div>
      )}
    </div>
  )

  const grandLineTitleSecondHalf = (
    <div className="fourSeasTitles secondHalf">
      {mainLocations[2].ways.slice(4, 7).map((sea) => 
        <div className="seaTitle border-none" key={sea.title}>{sea.title}</div>
      )}
    </div>
  )

  const firstHalf = mainLocations[2].ways.slice(0, 4).map((way) => 
    <div key={way.title} className="fourSeasColumn">
      {way.islands.map((island) => renderIsland(island))}
    </div>
  )

  const secondHalf = mainLocations[2].ways.slice(4, 7).map((way) => 
    <div key={way.title} className="fourSeasColumn">
      {way.islands.map((island) => renderIsland(island))}
    </div>
  )

  const grandLineMobile = mainLocations[2].ways.map((way) => 
    <div key={way.title} className={`mobileSea ${currentWay?.title === way.title ? 'mobileSeaActive' : ''}`}>
      <div className="seaTitle" 
        style={{textAlign: 'center', justifyContent: 'center !important'}}
        onClick={() => {
          if (way.modal) {
            setActiveModal('way-modal');
            setCurrentWay(way);
          } else {
            if (currentWay?.title === way.title) {
              setCurrentWay(null);
            } else {
              setCurrentWay(way);
            }
          }
        }}
      >{way.title}</div>
    </div>
  )

  const othersLocations = mainLocations[2].ways.slice(7).flatMap((way) =>
    way.islands.map((island) => renderIsland(island, 'islandCard othersCard'))
  );

  // Функция поиска по всем островам
  const searchIslands = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const results = [];
    const searchLower = query.toLowerCase();

    // Поиск по четырем морям
    mainLocations[0].ways.forEach((sea) => {
      sea.islands.forEach((island) => {
        if (island.title.toLowerCase().includes(searchLower)) {
          results.push({
            ...island,
            location: sea.title,
            type: 'sea'
          });
        }
      });
    });

    // Поиск по Grand Line
    mainLocations[2].ways.forEach((way) => {
      way.islands.forEach((island) => {
        if (island.title.toLowerCase().includes(searchLower)) {
          results.push({
            ...island,
            location: way.title,
            type: 'grand-line'
          });
        }
      });
    });

    // Поиск по названиям путей (ways)
    mainLocations.forEach((location) => {
      if (location.ways) {
        location.ways.forEach((way) => {
          if (way.title.toLowerCase().includes(searchLower)) {
            results.push({
              title: way.title,
              location: location.title,
              type: 'way',
              way: way
            });
          }
        });
      }
    });

    // Поиск по дочерним элементам (childrens) всех локаций
    mainLocations.forEach((location) => {
      if (location.ways) {
        location.ways.forEach((way) => {
          way.islands.forEach((island) => {
            if (island.childrens) {
              island.childrens.forEach((child) => {
                if (child.title.toLowerCase().includes(searchLower)) {
                  results.push({
                    ...child,
                    parentIsland: island.title,
                    location: way.title,
                    type: 'child'
                  });
                }
              });
            }
          });
        });
      }
    });

    setSearchResults(results);
    setShowSearchResults(true);
  };

  // Обработчик клика по результату поиска
  const handleSearchResultClick = (result) => {
    setCurrentIsland(null);
    setCurrentWay(null);
    setCurrentSea(null);
    setActiveModal(null);

    
    if (result.type === 'way') {
      // Для путей показываем все острова в модальном окне
      setCurrentIsland({
        title: result.title,
        childrens: result.way.islands
      });
      setActiveModal('island-modal');
    } else if (result.type === 'child') {
      // Дочерние элементы всегда открываются по ссылке
      openExternalLink(result.link);
    } else if (result.modal) {
      // Основные острова с модальными окнами
      setCurrentIsland(result);
      setActiveModal('island-modal');
    } else {
      // Обычные острова
      openExternalLink(result.link);
    }
    setShowSearchResults(false);
    setSearchQuery('');
  };

  // Закрытие результатов поиска при клике вне поля
  const handleClickOutside = () => {
    setTimeout(() => {
      setShowSearchResults(false);
    }, 200);
  };
  
  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
        Навигация
      </PanelHeader>
      <div className="navigation-panel">
      <Group>
        <Div>
          {/* Поиск по островам */}
          <div className="navigation-search">
            <input
              type="text"
              className="navigation-search__input"
              placeholder="Поиск по островам..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                searchIslands(e.target.value);
              }}
              onBlur={handleClickOutside}
            />
            {showSearchResults && searchResults.length > 0 && (
              <div className="navigation-search__results">
                {searchResults.map((result, index) => {
                  const resultMeta = result.link ? getMetaForLink(result.link) : null;

                  return (
                  <div
                    key={`${result.title}-${index}`}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleSearchResultClick(result)}
                    style={{
                      padding: '12px',
                      borderBottom: '1px solid #eee',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f5f5f5'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; }}
                  >
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px'}}>
                      <span style={{fontWeight: 'bold', color: 'black'}}>{result.title}</span>
                      {result.type === 'child' && (
                        <span style={{fontSize: '11px', color: '#888', fontStyle: 'italic'}}>
                          {result.parentIsland}
                        </span>
                      )}
                      {result.type === 'way' && (
                        <span style={{fontSize: '11px', color: '#0066cc', fontStyle: 'italic'}}>
                          Путь
                        </span>
                      )}
                      {resultMeta ? (
                        <SearchInfluenceIndicator meta={resultMeta} />
                      ) : null}
                    </div>
                    <span style={{fontSize: '12px', color: '#666'}}>{result.location}</span>
                  </div>
                  );
                })}
              </div>
            )}
          </div>
          <InfluenceLegend items={legendItems} />
        </Div>
      </Group>
      <Group>
        <Div>
          <div className='fourSeasHeader'><div className='fourSeasHeaderText seas'>{mainLocations[0].title}</div></div>
          <div className="desktop-only-navigation">
            {seaTitle}
            <div
              className="fourSeasGrid"
              style={{ '--grid-rows': getMaxIslandsInWays(mainLocations[0].ways) }}
            >
              {fourSeas}
            </div>
          </div>
          <div className="mobile-only-navigation mobileFourSeas">
            {fourSeasMobile}
          </div>
          <div className="mobile-only-navigation navigation-islands-list" ref={seaDetailsRef}>
            {currentSea?.islands.map((island) => renderIsland(island))}
          </div>

          {/* <div className="fourSeasFooter">
            <img src="src/assets/fourSeasFooter.png" alt="fourSeasFooter" />
          </div> */}
          <div className="reverseMountain">
            <NavigationLink className="reverseMountainButton" href="https://vk.com/topic-36291248_32959561" style={{ textDecoration: 'none' }}>
              <div>Реверс Маунтин</div>
            </NavigationLink>
          </div>
          <div className="reverseMountain">
            {(() => {
              const meta = getMetaForLink('https://vk.com/topic-36291248_32959558');
              const influenceCount = getInfluenceCount(meta);

              return (
            <NavigationLink
              className={[
                'reverseMountainButton',
                influenceCount === 1 ? 'reverseMountainButton--single' : '',
                influenceCount >= 2 ? 'reverseMountainButton--multi' : '',
              ].filter(Boolean).join(' ')}
              href="https://vk.com/topic-36291248_32959558"
              style={{
                textDecoration: 'none',
                ...getInfluenceStyle(meta),
              }}
            >
              <div>{mainLocations[1].title}</div>
            </NavigationLink>
              );
            })()}
          </div>
          <img className='blueBorder' src="/navigation/blue-border.jpg" alt="grandLine" />
          <div className="grandLineHeader">
            <div className="fourSeasHeaderText heaven">{mainLocations[2].title}</div>
          </div>
          <div className="desktop-only-navigation"> 
            {grandLineTitleFirstHalf}
          </div>
          
          {/* <div className="fourSeasGrid"> */}
          <div className="desktop-only-navigation">
            <div
              className="fourSeasGrid"
              style={{ '--grid-rows': getMaxIslandsInWays(mainLocations[2].ways.slice(0, 4)) }}
            >
              {firstHalf}
            </div>
            <div className="blue-line"></div>
          </div>
          <div className="mobile-only-navigation mobileFourSeas">
            {grandLineMobile}
          </div>
          <div className="mobile-only-navigation navigation-islands-list" ref={wayDetailsRef}>
            {currentWay?.islands.map((island) => renderIsland(island))}
          </div>
          <div className="desktop-only-navigation">
            {grandLineTitleSecondHalf}
            <div className="blue-line"></div>
            <div
              className="fourSeasGrid secondHalf"
              style={{ '--grid-rows': getMaxIslandsInWays(mainLocations[2].ways.slice(4, 7)) }}
            >
              {secondHalf}
            </div>
          </div>
          {/* <div className="purple-line"></div> */}
          <div className="desktop-only-navigation">
            <div className="othersHeader">
              <div className="fourSeasHeaderText heaven">Остальные</div>
            </div>
            <div className="othersGrid">
              {othersLocations}
            </div>
          </div>
        </Div>
      </Group>
      
      <ModalRoot activeModal={activeModal} onClose={() => setActiveModal(null)}>
        <ModalCard
          id="sea-modal"
          header={currentSea?.title}
          onClose={() => setActiveModal(null)}
        >
          <div style={{display: 'flex', flexDirection: 'column', padding: '8px 0', maxHeight: '70vh', overflowY: 'auto', WebkitOverflowScrolling: 'touch'}}>
            {currentSea?.islands.map((island) => renderIsland(island))}
          </div>
        </ModalCard>
        
        <ModalCard
          id="way-modal"
          header={currentWay?.title}
          onClose={() => setActiveModal(null)}
        >
          <div style={{display: 'flex', flexDirection: 'column', padding: '8px 0', maxHeight: '70vh', overflowY: 'auto', WebkitOverflowScrolling: 'touch'}}>
            {currentWay?.islands.map((island) => renderIsland(island, 'islandCard', { margin: '8px 0' }))}
          </div>
        </ModalCard>
        
        <ModalCard
          id="island-modal"
          header={currentIsland?.title}
          onClose={() => setActiveModal(null)}
        >
          <div style={{display: 'flex', flexDirection: 'column', padding: '8px 0', maxHeight: '70vh', overflowY: 'auto', WebkitOverflowScrolling: 'touch'}}>
            {currentIsland?.childrens && currentIsland.childrens.length > 0 ? (
              currentIsland.childrens.map((child) => renderIsland(child, 'islandCard', { margin: '8px 0' }))
            ) : (
              <div style={{textAlign: 'center', color: '#666', padding: '20px'}}>
                Нет доступных островов
              </div>
            )}
          </div>
        </ModalCard>
      </ModalRoot>
      </div>
    </Panel>
  );
};

NavigationPanel.propTypes = {
  id: PropTypes.string.isRequired,
};
