export const MENU_LOCATION_NAVIGATION_DEFAULT = 'DEFAULT_NAVIGATION';

/**
 * mapMenuData
 */

export function mapMenuData(menu = {}) {
  const { node } = menu;
  const data = { ...node };

  data.menuItems = data.menuItems.edges.map(({ node }) => {
    return { ...node };
  });

  return data;
}

/**
 * mapPagesToMenuItems
 */

export function mapPagesToMenuItems(pages) {
  return pages.map(({ id, uri, title }) => {
    return {
      label: title,
      path: uri,
      id,
    };
  });
}

/**
 * createMenuFromPages
 */

export function createMenuFromPages({ locations, pages }) {
  return {
    menuItems: mapPagesToMenuItems(pages),
    locations,
  };
}

/**
 * parseHierarchicalMenu
 */
export const parseHierarchicalMenu = (
  data = [],
  { idKey = 'id', parentKey = 'parentId', childrenKey = 'children' } = {}
) => {
  const tree = [];
  const childrenOf = {};

  data.forEach((item) => {
    const newItem = { ...item };
    const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;
    childrenOf[id] = childrenOf[id] || [];
    newItem[childrenKey] = childrenOf[id];
    parentId ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem) : tree.push(newItem);
  });
  return tree;
};

/**
 * findMenuByLocation
 */

export function findMenuByLocation(menus, location) {
  let menu;

  if (!Array.isArray(location)) {
    location = [location];
  }

  const searchLocations = [...location];
  do {
    menu = menus.find(function ({ locations }) {
      return locations.map((loc) => loc.toUpperCase()).includes(searchLocations.shift()?.toUpperCase());
    });
  } while (!menu && location.length > 0);

  if (!menu) {
    return null;
  }

  return parseHierarchicalMenu(menu.menuItems);
}
