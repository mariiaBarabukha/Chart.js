import {merge} from '../helpers/index.js';
import defaults, {overrides} from './core.defaults.js';

/**
 * @typedef {{id: string, defaults: any, overrides?: any, defaultRoutes: any}} IChartComponent
 */

export default class TypedRegistry {
  constructor(type, scope, override) {
    this.type = type;
    this.scope = scope;
    this.override = override;
    this.items = Object.create(null);
  }

  isForType(type) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, type.prototype);
  }

  /**
	 * @param {IChartComponent} item
	 * @returns {string} The scope where items defaults were registered to.
	 */
  register(item) {
    // console.log(item)
    const me = this;
    const proto = Object.getPrototypeOf(item);
    let parentScope;

    if (isIChartComponent(proto)) {
      // Make sure the parent is registered and note the scope where its defaults are.
      parentScope = me.register(proto);
    }

    const items = me.items;
    const id = item.id;
    const scope = me.scope + '.' + id;

    if (!id) {
      throw new Error('class does not have id: ' + item);
    }

    if (id in items) {
      // already registered
      return scope;
    }

    items[id] = item;
    registerDefaults(item, scope, parentScope);
    if (me.override) {
      defaults.override(item.id, item.overrides);
    }

    return scope;
  }

  /**
	 * @param {string} id
	 * @returns {object?}
	 */
  get(id) {
    //console.log(id);
    return this.items[id] || this.items[id+'.js'];
  }

  /**
	 * @param {IChartComponent} item
	 */
  unregister(item) {
    const items = this.items;
    const id = item.id;
    const scope = this.scope;

    if (id in items) {
      delete items[id];
    }

    if (scope && id in defaults[scope]) {
      delete defaults[scope][id];
      if (this.override) {
        delete overrides[id];
      }
    }
  }
}

function registerDefaults(item, scope, parentScope) {
  // Inherit the parent's defaults and keep existing defaults
  const itemDefaults = merge(Object.create(null), [
    parentScope ? defaults.get(parentScope) : {},
    defaults.get(scope),
    item.defaults
  ]);

  defaults.set(scope, item.defaults);

  if (item.defaultRoutes) {
    routeDefaults(scope, item.defaultRoutes);
  }

  if (item.descriptors) {
    defaults.describe(scope, item.descriptors);
  }
}

function routeDefaults(scope, routes) {
  Object.keys(routes).forEach(property => {
    const propertyParts = property.split('.');
    const sourceName = propertyParts.pop();
    const sourceScope = [scope].concat(propertyParts).join('.');
    const parts = routes[property].split('.');
    const targetName = parts.pop();
    const targetScope = parts.join('.');
    defaults.route(sourceScope, sourceName, targetScope, targetName);
  });
}

function isIChartComponent(proto) {
  return 'id' in proto && 'defaults' in proto;
}
