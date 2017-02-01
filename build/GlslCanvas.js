(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.GlslCanvas = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":12}],2:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":13}],3:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":14}],4:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":15}],5:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":16}],6:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":17}],7:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/set"), __esModule: true };
},{"core-js/library/fn/set":18}],8:[function(_dereq_,module,exports){
"use strict";

exports["default"] = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

exports.__esModule = true;
},{}],9:[function(_dereq_,module,exports){
"use strict";

var _Object$defineProperty = _dereq_("babel-runtime/core-js/object/define-property")["default"];

exports["default"] = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;

      _Object$defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

exports.__esModule = true;
},{"babel-runtime/core-js/object/define-property":4}],10:[function(_dereq_,module,exports){
"use strict";

exports["default"] = function (obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
};

exports.__esModule = true;
},{}],11:[function(_dereq_,module,exports){
"use strict";

var _Array$from = _dereq_("babel-runtime/core-js/array/from")["default"];

exports["default"] = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return _Array$from(arr);
  }
};

exports.__esModule = true;
},{"babel-runtime/core-js/array/from":1}],12:[function(_dereq_,module,exports){
_dereq_('../../modules/es6.string.iterator');
_dereq_('../../modules/es6.array.from');
module.exports = _dereq_('../../modules/$.core').Array.from;
},{"../../modules/$.core":27,"../../modules/es6.array.from":74,"../../modules/es6.string.iterator":81}],13:[function(_dereq_,module,exports){
_dereq_('../modules/web.dom.iterable');
_dereq_('../modules/es6.string.iterator');
module.exports = _dereq_('../modules/core.get-iterator');
},{"../modules/core.get-iterator":73,"../modules/es6.string.iterator":81,"../modules/web.dom.iterable":83}],14:[function(_dereq_,module,exports){
_dereq_('../../modules/es6.object.assign');
module.exports = _dereq_('../../modules/$.core').Object.assign;
},{"../../modules/$.core":27,"../../modules/es6.object.assign":76}],15:[function(_dereq_,module,exports){
var $ = _dereq_('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":49}],16:[function(_dereq_,module,exports){
_dereq_('../../modules/es6.object.keys');
module.exports = _dereq_('../../modules/$.core').Object.keys;
},{"../../modules/$.core":27,"../../modules/es6.object.keys":77}],17:[function(_dereq_,module,exports){
_dereq_('../modules/es6.object.to-string');
_dereq_('../modules/es6.string.iterator');
_dereq_('../modules/web.dom.iterable');
_dereq_('../modules/es6.promise');
module.exports = _dereq_('../modules/$.core').Promise;
},{"../modules/$.core":27,"../modules/es6.object.to-string":78,"../modules/es6.promise":79,"../modules/es6.string.iterator":81,"../modules/web.dom.iterable":83}],18:[function(_dereq_,module,exports){
_dereq_('../modules/es6.object.to-string');
_dereq_('../modules/es6.string.iterator');
_dereq_('../modules/web.dom.iterable');
_dereq_('../modules/es6.set');
_dereq_('../modules/es7.set.to-json');
module.exports = _dereq_('../modules/$.core').Set;
},{"../modules/$.core":27,"../modules/es6.object.to-string":78,"../modules/es6.set":80,"../modules/es6.string.iterator":81,"../modules/es7.set.to-json":82,"../modules/web.dom.iterable":83}],19:[function(_dereq_,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],20:[function(_dereq_,module,exports){
module.exports = function(){ /* empty */ };
},{}],21:[function(_dereq_,module,exports){
var isObject = _dereq_('./$.is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./$.is-object":42}],22:[function(_dereq_,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = _dereq_('./$.cof')
  , TAG = _dereq_('./$.wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./$.cof":23,"./$.wks":71}],23:[function(_dereq_,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],24:[function(_dereq_,module,exports){
'use strict';
var $            = _dereq_('./$')
  , hide         = _dereq_('./$.hide')
  , redefineAll  = _dereq_('./$.redefine-all')
  , ctx          = _dereq_('./$.ctx')
  , strictNew    = _dereq_('./$.strict-new')
  , defined      = _dereq_('./$.defined')
  , forOf        = _dereq_('./$.for-of')
  , $iterDefine  = _dereq_('./$.iter-define')
  , step         = _dereq_('./$.iter-step')
  , ID           = _dereq_('./$.uid')('id')
  , $has         = _dereq_('./$.has')
  , isObject     = _dereq_('./$.is-object')
  , setSpecies   = _dereq_('./$.set-species')
  , DESCRIPTORS  = _dereq_('./$.descriptors')
  , isExtensible = Object.isExtensible || isObject
  , SIZE         = DESCRIPTORS ? '_s' : 'size'
  , id           = 0;

var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!$has(it, ID)){
    // can't set id to frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add id
    if(!create)return 'E';
    // add missing object id
    hide(it, ID, ++id);
  // return object id with prefix
  } return 'O' + it[ID];
};

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      strictNew(that, C, NAME);
      that._i = $.create(null); // index
      that._f = undefined;      // first entry
      that._l = undefined;      // last entry
      that[SIZE] = 0;           // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)$.setDesc(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};
},{"./$":49,"./$.ctx":28,"./$.defined":29,"./$.descriptors":30,"./$.for-of":34,"./$.has":36,"./$.hide":37,"./$.is-object":42,"./$.iter-define":45,"./$.iter-step":47,"./$.redefine-all":55,"./$.set-species":59,"./$.strict-new":63,"./$.uid":70}],25:[function(_dereq_,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var forOf   = _dereq_('./$.for-of')
  , classof = _dereq_('./$.classof');
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    var arr = [];
    forOf(this, false, arr.push, arr);
    return arr;
  };
};
},{"./$.classof":22,"./$.for-of":34}],26:[function(_dereq_,module,exports){
'use strict';
var $              = _dereq_('./$')
  , global         = _dereq_('./$.global')
  , $export        = _dereq_('./$.export')
  , fails          = _dereq_('./$.fails')
  , hide           = _dereq_('./$.hide')
  , redefineAll    = _dereq_('./$.redefine-all')
  , forOf          = _dereq_('./$.for-of')
  , strictNew      = _dereq_('./$.strict-new')
  , isObject       = _dereq_('./$.is-object')
  , setToStringTag = _dereq_('./$.set-to-string-tag')
  , DESCRIPTORS    = _dereq_('./$.descriptors');

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
  } else {
    C = wrapper(function(target, iterable){
      strictNew(target, C, NAME);
      target._c = new Base;
      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
    });
    $.each.call('add,clear,delete,forEach,get,has,set,keys,values,entries'.split(','),function(KEY){
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    if('size' in proto)$.setDesc(C.prototype, 'size', {
      get: function(){
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};
},{"./$":49,"./$.descriptors":30,"./$.export":32,"./$.fails":33,"./$.for-of":34,"./$.global":35,"./$.hide":37,"./$.is-object":42,"./$.redefine-all":55,"./$.set-to-string-tag":60,"./$.strict-new":63}],27:[function(_dereq_,module,exports){
var core = module.exports = {version: '1.2.6'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],28:[function(_dereq_,module,exports){
// optional / simple context binding
var aFunction = _dereq_('./$.a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./$.a-function":19}],29:[function(_dereq_,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],30:[function(_dereq_,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !_dereq_('./$.fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./$.fails":33}],31:[function(_dereq_,module,exports){
var isObject = _dereq_('./$.is-object')
  , document = _dereq_('./$.global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./$.global":35,"./$.is-object":42}],32:[function(_dereq_,module,exports){
var global    = _dereq_('./$.global')
  , core      = _dereq_('./$.core')
  , ctx       = _dereq_('./$.ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
};
// type bitmap
$export.F = 1;  // forced
$export.G = 2;  // global
$export.S = 4;  // static
$export.P = 8;  // proto
$export.B = 16; // bind
$export.W = 32; // wrap
module.exports = $export;
},{"./$.core":27,"./$.ctx":28,"./$.global":35}],33:[function(_dereq_,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],34:[function(_dereq_,module,exports){
var ctx         = _dereq_('./$.ctx')
  , call        = _dereq_('./$.iter-call')
  , isArrayIter = _dereq_('./$.is-array-iter')
  , anObject    = _dereq_('./$.an-object')
  , toLength    = _dereq_('./$.to-length')
  , getIterFn   = _dereq_('./core.get-iterator-method');
module.exports = function(iterable, entries, fn, that){
  var iterFn = getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    call(iterator, f, step.value, entries);
  }
};
},{"./$.an-object":21,"./$.ctx":28,"./$.is-array-iter":41,"./$.iter-call":43,"./$.to-length":68,"./core.get-iterator-method":72}],35:[function(_dereq_,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],36:[function(_dereq_,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],37:[function(_dereq_,module,exports){
var $          = _dereq_('./$')
  , createDesc = _dereq_('./$.property-desc');
module.exports = _dereq_('./$.descriptors') ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./$":49,"./$.descriptors":30,"./$.property-desc":54}],38:[function(_dereq_,module,exports){
module.exports = _dereq_('./$.global').document && document.documentElement;
},{"./$.global":35}],39:[function(_dereq_,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],40:[function(_dereq_,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = _dereq_('./$.cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./$.cof":23}],41:[function(_dereq_,module,exports){
// check on default Array iterator
var Iterators  = _dereq_('./$.iterators')
  , ITERATOR   = _dereq_('./$.wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./$.iterators":48,"./$.wks":71}],42:[function(_dereq_,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],43:[function(_dereq_,module,exports){
// call something on iterator step with safe closing on error
var anObject = _dereq_('./$.an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./$.an-object":21}],44:[function(_dereq_,module,exports){
'use strict';
var $              = _dereq_('./$')
  , descriptor     = _dereq_('./$.property-desc')
  , setToStringTag = _dereq_('./$.set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_dereq_('./$.hide')(IteratorPrototype, _dereq_('./$.wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./$":49,"./$.hide":37,"./$.property-desc":54,"./$.set-to-string-tag":60,"./$.wks":71}],45:[function(_dereq_,module,exports){
'use strict';
var LIBRARY        = _dereq_('./$.library')
  , $export        = _dereq_('./$.export')
  , redefine       = _dereq_('./$.redefine')
  , hide           = _dereq_('./$.hide')
  , has            = _dereq_('./$.has')
  , Iterators      = _dereq_('./$.iterators')
  , $iterCreate    = _dereq_('./$.iter-create')
  , setToStringTag = _dereq_('./$.set-to-string-tag')
  , getProto       = _dereq_('./$').getProto
  , ITERATOR       = _dereq_('./$.wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , methods, key;
  // Fix native
  if($native){
    var IteratorPrototype = getProto($default.call(new Base));
    // Set @@toStringTag to native iterators
    setToStringTag(IteratorPrototype, TAG, true);
    // FF fix
    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    // fix Array#{values, @@iterator}.name in V8 / FF
    if(DEF_VALUES && $native.name !== VALUES){
      VALUES_BUG = true;
      $default = function values(){ return $native.call(this); };
    }
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES  ? $default : getMethod(VALUES),
      keys:    IS_SET      ? $default : getMethod(KEYS),
      entries: !DEF_VALUES ? $default : getMethod('entries')
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./$":49,"./$.export":32,"./$.has":36,"./$.hide":37,"./$.iter-create":44,"./$.iterators":48,"./$.library":50,"./$.redefine":56,"./$.set-to-string-tag":60,"./$.wks":71}],46:[function(_dereq_,module,exports){
var ITERATOR     = _dereq_('./$.wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./$.wks":71}],47:[function(_dereq_,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],48:[function(_dereq_,module,exports){
module.exports = {};
},{}],49:[function(_dereq_,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],50:[function(_dereq_,module,exports){
module.exports = true;
},{}],51:[function(_dereq_,module,exports){
var global    = _dereq_('./$.global')
  , macrotask = _dereq_('./$.task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = _dereq_('./$.cof')(process) == 'process'
  , head, last, notify;

var flush = function(){
  var parent, domain, fn;
  if(isNode && (parent = process.domain)){
    process.domain = null;
    parent.exit();
  }
  while(head){
    domain = head.domain;
    fn     = head.fn;
    if(domain)domain.enter();
    fn(); // <- currently we use it only for Promise - try / catch not required
    if(domain)domain.exit();
    head = head.next;
  } last = undefined;
  if(parent)parent.enter();
};

// Node.js
if(isNode){
  notify = function(){
    process.nextTick(flush);
  };
// browsers with MutationObserver
} else if(Observer){
  var toggle = 1
    , node   = document.createTextNode('');
  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
  notify = function(){
    node.data = toggle = -toggle;
  };
// environments with maybe non-completely correct, but existent Promise
} else if(Promise && Promise.resolve){
  notify = function(){
    Promise.resolve().then(flush);
  };
// for other environments - macrotask based on:
// - setImmediate
// - MessageChannel
// - window.postMessag
// - onreadystatechange
// - setTimeout
} else {
  notify = function(){
    // strange IE + webpack dev server bug - use .call(global)
    macrotask.call(global, flush);
  };
}

module.exports = function asap(fn){
  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
  if(last)last.next = task;
  if(!head){
    head = task;
    notify();
  } last = task;
};
},{"./$.cof":23,"./$.global":35,"./$.task":65}],52:[function(_dereq_,module,exports){
// 19.1.2.1 Object.assign(target, source, ...)
var $        = _dereq_('./$')
  , toObject = _dereq_('./$.to-object')
  , IObject  = _dereq_('./$.iobject');

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = _dereq_('./$.fails')(function(){
  var a = Object.assign
    , A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , $$    = arguments
    , $$len = $$.length
    , index = 1
    , getKeys    = $.getKeys
    , getSymbols = $.getSymbols
    , isEnum     = $.isEnum;
  while($$len > index){
    var S      = IObject($$[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  }
  return T;
} : Object.assign;
},{"./$":49,"./$.fails":33,"./$.iobject":40,"./$.to-object":69}],53:[function(_dereq_,module,exports){
// most Object methods by ES6 should accept primitives
var $export = _dereq_('./$.export')
  , core    = _dereq_('./$.core')
  , fails   = _dereq_('./$.fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./$.core":27,"./$.export":32,"./$.fails":33}],54:[function(_dereq_,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],55:[function(_dereq_,module,exports){
var redefine = _dereq_('./$.redefine');
module.exports = function(target, src){
  for(var key in src)redefine(target, key, src[key]);
  return target;
};
},{"./$.redefine":56}],56:[function(_dereq_,module,exports){
module.exports = _dereq_('./$.hide');
},{"./$.hide":37}],57:[function(_dereq_,module,exports){
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
},{}],58:[function(_dereq_,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var getDesc  = _dereq_('./$').getDesc
  , isObject = _dereq_('./$.is-object')
  , anObject = _dereq_('./$.an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = _dereq_('./$.ctx')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./$":49,"./$.an-object":21,"./$.ctx":28,"./$.is-object":42}],59:[function(_dereq_,module,exports){
'use strict';
var core        = _dereq_('./$.core')
  , $           = _dereq_('./$')
  , DESCRIPTORS = _dereq_('./$.descriptors')
  , SPECIES     = _dereq_('./$.wks')('species');

module.exports = function(KEY){
  var C = core[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./$":49,"./$.core":27,"./$.descriptors":30,"./$.wks":71}],60:[function(_dereq_,module,exports){
var def = _dereq_('./$').setDesc
  , has = _dereq_('./$.has')
  , TAG = _dereq_('./$.wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./$":49,"./$.has":36,"./$.wks":71}],61:[function(_dereq_,module,exports){
var global = _dereq_('./$.global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$.global":35}],62:[function(_dereq_,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = _dereq_('./$.an-object')
  , aFunction = _dereq_('./$.a-function')
  , SPECIES   = _dereq_('./$.wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./$.a-function":19,"./$.an-object":21,"./$.wks":71}],63:[function(_dereq_,module,exports){
module.exports = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
},{}],64:[function(_dereq_,module,exports){
var toInteger = _dereq_('./$.to-integer')
  , defined   = _dereq_('./$.defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./$.defined":29,"./$.to-integer":66}],65:[function(_dereq_,module,exports){
var ctx                = _dereq_('./$.ctx')
  , invoke             = _dereq_('./$.invoke')
  , html               = _dereq_('./$.html')
  , cel                = _dereq_('./$.dom-create')
  , global             = _dereq_('./$.global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listner = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(_dereq_('./$.cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listner;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listner, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./$.cof":23,"./$.ctx":28,"./$.dom-create":31,"./$.global":35,"./$.html":38,"./$.invoke":39}],66:[function(_dereq_,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],67:[function(_dereq_,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = _dereq_('./$.iobject')
  , defined = _dereq_('./$.defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./$.defined":29,"./$.iobject":40}],68:[function(_dereq_,module,exports){
// 7.1.15 ToLength
var toInteger = _dereq_('./$.to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./$.to-integer":66}],69:[function(_dereq_,module,exports){
// 7.1.13 ToObject(argument)
var defined = _dereq_('./$.defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./$.defined":29}],70:[function(_dereq_,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],71:[function(_dereq_,module,exports){
var store  = _dereq_('./$.shared')('wks')
  , uid    = _dereq_('./$.uid')
  , Symbol = _dereq_('./$.global').Symbol;
module.exports = function(name){
  return store[name] || (store[name] =
    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
};
},{"./$.global":35,"./$.shared":61,"./$.uid":70}],72:[function(_dereq_,module,exports){
var classof   = _dereq_('./$.classof')
  , ITERATOR  = _dereq_('./$.wks')('iterator')
  , Iterators = _dereq_('./$.iterators');
module.exports = _dereq_('./$.core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./$.classof":22,"./$.core":27,"./$.iterators":48,"./$.wks":71}],73:[function(_dereq_,module,exports){
var anObject = _dereq_('./$.an-object')
  , get      = _dereq_('./core.get-iterator-method');
module.exports = _dereq_('./$.core').getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};
},{"./$.an-object":21,"./$.core":27,"./core.get-iterator-method":72}],74:[function(_dereq_,module,exports){
'use strict';
var ctx         = _dereq_('./$.ctx')
  , $export     = _dereq_('./$.export')
  , toObject    = _dereq_('./$.to-object')
  , call        = _dereq_('./$.iter-call')
  , isArrayIter = _dereq_('./$.is-array-iter')
  , toLength    = _dereq_('./$.to-length')
  , getIterFn   = _dereq_('./core.get-iterator-method');
$export($export.S + $export.F * !_dereq_('./$.iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , $$      = arguments
      , $$len   = $$.length
      , mapfn   = $$len > 1 ? $$[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        result[index] = mapping ? mapfn(O[index], index) : O[index];
      }
    }
    result.length = index;
    return result;
  }
});

},{"./$.ctx":28,"./$.export":32,"./$.is-array-iter":41,"./$.iter-call":43,"./$.iter-detect":46,"./$.to-length":68,"./$.to-object":69,"./core.get-iterator-method":72}],75:[function(_dereq_,module,exports){
'use strict';
var addToUnscopables = _dereq_('./$.add-to-unscopables')
  , step             = _dereq_('./$.iter-step')
  , Iterators        = _dereq_('./$.iterators')
  , toIObject        = _dereq_('./$.to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = _dereq_('./$.iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./$.add-to-unscopables":20,"./$.iter-define":45,"./$.iter-step":47,"./$.iterators":48,"./$.to-iobject":67}],76:[function(_dereq_,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = _dereq_('./$.export');

$export($export.S + $export.F, 'Object', {assign: _dereq_('./$.object-assign')});
},{"./$.export":32,"./$.object-assign":52}],77:[function(_dereq_,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = _dereq_('./$.to-object');

_dereq_('./$.object-sap')('keys', function($keys){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./$.object-sap":53,"./$.to-object":69}],78:[function(_dereq_,module,exports){

},{}],79:[function(_dereq_,module,exports){
'use strict';
var $          = _dereq_('./$')
  , LIBRARY    = _dereq_('./$.library')
  , global     = _dereq_('./$.global')
  , ctx        = _dereq_('./$.ctx')
  , classof    = _dereq_('./$.classof')
  , $export    = _dereq_('./$.export')
  , isObject   = _dereq_('./$.is-object')
  , anObject   = _dereq_('./$.an-object')
  , aFunction  = _dereq_('./$.a-function')
  , strictNew  = _dereq_('./$.strict-new')
  , forOf      = _dereq_('./$.for-of')
  , setProto   = _dereq_('./$.set-proto').set
  , same       = _dereq_('./$.same-value')
  , SPECIES    = _dereq_('./$.wks')('species')
  , speciesConstructor = _dereq_('./$.species-constructor')
  , asap       = _dereq_('./$.microtask')
  , PROMISE    = 'Promise'
  , process    = global.process
  , isNode     = classof(process) == 'process'
  , P          = global[PROMISE]
  , empty      = function(){ /* empty */ }
  , Wrapper;

var testResolve = function(sub){
  var test = new P(empty), promise;
  if(sub)test.constructor = function(exec){
    exec(empty, empty);
  };
  (promise = P.resolve(test))['catch'](empty);
  return promise === test;
};

var USE_NATIVE = function(){
  var works = false;
  function P2(x){
    var self = new P(x);
    setProto(self, P2.prototype);
    return self;
  }
  try {
    works = P && P.resolve && testResolve();
    setProto(P2, P);
    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
    // actual Firefox has broken subclass support, test that
    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
      works = false;
    }
    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
    if(works && _dereq_('./$.descriptors')){
      var thenableThenGotten = false;
      P.resolve($.setDesc({}, 'then', {
        get: function(){ thenableThenGotten = true; }
      }));
      works = thenableThenGotten;
    }
  } catch(e){ works = false; }
  return works;
}();

// helpers
var sameConstructor = function(a, b){
  // library wrapper special case
  if(LIBRARY && a === P && b === Wrapper)return true;
  return same(a, b);
};
var getConstructor = function(C){
  var S = anObject(C)[SPECIES];
  return S != undefined ? S : C;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var PromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve),
  this.reject  = aFunction(reject)
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(record, isReject){
  if(record.n)return;
  record.n = true;
  var chain = record.c;
  asap(function(){
    var value = record.v
      , ok    = record.s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , result, then;
      try {
        if(handler){
          if(!ok)record.h = true;
          result = handler === true ? value : handler(value);
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    chain.length = 0;
    record.n = false;
    if(isReject)setTimeout(function(){
      var promise = record.p
        , handler, console;
      if(isUnhandled(promise)){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      } record.a = undefined;
    }, 1);
  });
};
var isUnhandled = function(promise){
  var record = promise._d
    , chain  = record.a || record.c
    , i      = 0
    , reaction;
  if(record.h)return false;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var $reject = function(value){
  var record = this;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  record.v = value;
  record.s = 2;
  record.a = record.c.slice();
  notify(record, true);
};
var $resolve = function(value){
  var record = this
    , then;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  try {
    if(record.p === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      asap(function(){
        var wrapper = {r: record, d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      record.v = value;
      record.s = 1;
      notify(record, false);
    }
  } catch(e){
    $reject.call({r: record, d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  P = function Promise(executor){
    aFunction(executor);
    var record = this._d = {
      p: strictNew(this, P, PROMISE),         // <- promise
      c: [],                                  // <- awaiting reactions
      a: undefined,                           // <- checked in isUnhandled reactions
      s: 0,                                   // <- state
      d: false,                               // <- done
      v: undefined,                           // <- value
      h: false,                               // <- handled rejection
      n: false                                // <- notify
    };
    try {
      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
    } catch(err){
      $reject.call(record, err);
    }
  };
  _dereq_('./$.redefine-all')(P.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction = new PromiseCapability(speciesConstructor(this, P))
        , promise  = reaction.promise
        , record   = this._d;
      reaction.ok   = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      record.c.push(reaction);
      if(record.a)record.a.push(reaction);
      if(record.s)notify(record, false);
      return promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: P});
_dereq_('./$.set-to-string-tag')(P, PROMISE);
_dereq_('./$.set-species')(PROMISE);
Wrapper = _dereq_('./$.core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = new PromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof P && sameConstructor(x.constructor, this))return x;
    var capability = new PromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && _dereq_('./$.iter-detect')(function(iter){
  P.all(iter)['catch'](function(){});
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = getConstructor(this)
      , capability = new PromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject
      , values     = [];
    var abrupt = perform(function(){
      forOf(iterable, false, values.push, values);
      var remaining = values.length
        , results   = Array(remaining);
      if(remaining)$.each.call(values, function(promise, index){
        var alreadyCalled = false;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled = true;
          results[index] = value;
          --remaining || resolve(results);
        }, reject);
      });
      else resolve(results);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = getConstructor(this)
      , capability = new PromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"./$":49,"./$.a-function":19,"./$.an-object":21,"./$.classof":22,"./$.core":27,"./$.ctx":28,"./$.descriptors":30,"./$.export":32,"./$.for-of":34,"./$.global":35,"./$.is-object":42,"./$.iter-detect":46,"./$.library":50,"./$.microtask":51,"./$.redefine-all":55,"./$.same-value":57,"./$.set-proto":58,"./$.set-species":59,"./$.set-to-string-tag":60,"./$.species-constructor":62,"./$.strict-new":63,"./$.wks":71}],80:[function(_dereq_,module,exports){
'use strict';
var strong = _dereq_('./$.collection-strong');

// 23.2 Set Objects
_dereq_('./$.collection')('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);
},{"./$.collection":26,"./$.collection-strong":24}],81:[function(_dereq_,module,exports){
'use strict';
var $at  = _dereq_('./$.string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
_dereq_('./$.iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./$.iter-define":45,"./$.string-at":64}],82:[function(_dereq_,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = _dereq_('./$.export');

$export($export.P, 'Set', {toJSON: _dereq_('./$.collection-to-json')('Set')});
},{"./$.collection-to-json":25,"./$.export":32}],83:[function(_dereq_,module,exports){
_dereq_('./es6.array.iterator');
var Iterators = _dereq_('./$.iterators');
Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
},{"./$.iterators":48,"./es6.array.iterator":75}],84:[function(_dereq_,module,exports){
var isFunction = _dereq_('is-function')

module.exports = forEach

var toString = Object.prototype.toString
var hasOwnProperty = Object.prototype.hasOwnProperty

function forEach(list, iterator, context) {
    if (!isFunction(iterator)) {
        throw new TypeError('iterator must be a function')
    }

    if (arguments.length < 3) {
        context = this
    }
    
    if (toString.call(list) === '[object Array]')
        forEachArray(list, iterator, context)
    else if (typeof list === 'string')
        forEachString(list, iterator, context)
    else
        forEachObject(list, iterator, context)
}

function forEachArray(array, iterator, context) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            iterator.call(context, array[i], i, array)
        }
    }
}

function forEachString(string, iterator, context) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        iterator.call(context, string.charAt(i), i, string)
    }
}

function forEachObject(object, iterator, context) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            iterator.call(context, object[k], k, object)
        }
    }
}

},{"is-function":86}],85:[function(_dereq_,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],86:[function(_dereq_,module,exports){
module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};

},{}],87:[function(_dereq_,module,exports){
var trim = _dereq_('trim')
  , forEach = _dereq_('for-each')
  , isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    }

module.exports = function (headers) {
  if (!headers)
    return {}

  var result = {}

  forEach(
      trim(headers).split('\n')
    , function (row) {
        var index = row.indexOf(':')
          , key = trim(row.slice(0, index)).toLowerCase()
          , value = trim(row.slice(index + 1))

        if (typeof(result[key]) === 'undefined') {
          result[key] = value
        } else if (isArray(result[key])) {
          result[key].push(value)
        } else {
          result[key] = [ result[key], value ]
        }
      }
  )

  return result
}
},{"for-each":84,"trim":88}],88:[function(_dereq_,module,exports){

exports = module.exports = trim;

function trim(str){
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function(str){
  return str.replace(/^\s*/, '');
};

exports.right = function(str){
  return str.replace(/\s*$/, '');
};

},{}],89:[function(_dereq_,module,exports){
"use strict";
var window = _dereq_("global/window")
var isFunction = _dereq_("is-function")
var parseHeaders = _dereq_("parse-headers")
var xtend = _dereq_("xtend")

module.exports = createXHR
createXHR.XMLHttpRequest = window.XMLHttpRequest || noop
createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window.XDomainRequest

forEachArray(["get", "put", "post", "patch", "head", "delete"], function(method) {
    createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
        options = initParams(uri, options, callback)
        options.method = method.toUpperCase()
        return _createXHR(options)
    }
})

function forEachArray(array, iterator) {
    for (var i = 0; i < array.length; i++) {
        iterator(array[i])
    }
}

function isEmpty(obj){
    for(var i in obj){
        if(obj.hasOwnProperty(i)) return false
    }
    return true
}

function initParams(uri, options, callback) {
    var params = uri

    if (isFunction(options)) {
        callback = options
        if (typeof uri === "string") {
            params = {uri:uri}
        }
    } else {
        params = xtend(options, {uri: uri})
    }

    params.callback = callback
    return params
}

function createXHR(uri, options, callback) {
    options = initParams(uri, options, callback)
    return _createXHR(options)
}

function _createXHR(options) {
    if(typeof options.callback === "undefined"){
        throw new Error("callback argument missing")
    }

    var called = false
    var callback = function cbOnce(err, response, body){
        if(!called){
            called = true
            options.callback(err, response, body)
        }
    }

    function readystatechange() {
        if (xhr.readyState === 4) {
            loadFunc()
        }
    }

    function getBody() {
        // Chrome with requestType=blob throws errors arround when even testing access to responseText
        var body = undefined

        if (xhr.response) {
            body = xhr.response
        } else {
            body = xhr.responseText || getXml(xhr)
        }

        if (isJson) {
            try {
                body = JSON.parse(body)
            } catch (e) {}
        }

        return body
    }

    function errorFunc(evt) {
        clearTimeout(timeoutTimer)
        if(!(evt instanceof Error)){
            evt = new Error("" + (evt || "Unknown XMLHttpRequest Error") )
        }
        evt.statusCode = 0
        return callback(evt, failureResponse)
    }

    // will load the data & process the response in a special response object
    function loadFunc() {
        if (aborted) return
        var status
        clearTimeout(timeoutTimer)
        if(options.useXDR && xhr.status===undefined) {
            //IE8 CORS GET successful response doesn't have a status field, but body is fine
            status = 200
        } else {
            status = (xhr.status === 1223 ? 204 : xhr.status)
        }
        var response = failureResponse
        var err = null

        if (status !== 0){
            response = {
                body: getBody(),
                statusCode: status,
                method: method,
                headers: {},
                url: uri,
                rawRequest: xhr
            }
            if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
                response.headers = parseHeaders(xhr.getAllResponseHeaders())
            }
        } else {
            err = new Error("Internal XMLHttpRequest Error")
        }
        return callback(err, response, response.body)
    }

    var xhr = options.xhr || null

    if (!xhr) {
        if (options.cors || options.useXDR) {
            xhr = new createXHR.XDomainRequest()
        }else{
            xhr = new createXHR.XMLHttpRequest()
        }
    }

    var key
    var aborted
    var uri = xhr.url = options.uri || options.url
    var method = xhr.method = options.method || "GET"
    var body = options.body || options.data
    var headers = xhr.headers = options.headers || {}
    var sync = !!options.sync
    var isJson = false
    var timeoutTimer
    var failureResponse = {
        body: undefined,
        headers: {},
        statusCode: 0,
        method: method,
        url: uri,
        rawRequest: xhr
    }

    if ("json" in options && options.json !== false) {
        isJson = true
        headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json") //Don't override existing accept header declared by user
        if (method !== "GET" && method !== "HEAD") {
            headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json") //Don't override existing accept header declared by user
            body = JSON.stringify(options.json === true ? body : options.json)
        }
    }

    xhr.onreadystatechange = readystatechange
    xhr.onload = loadFunc
    xhr.onerror = errorFunc
    // IE9 must have onprogress be set to a unique function.
    xhr.onprogress = function () {
        // IE must die
    }
    xhr.onabort = function(){
        aborted = true;
    }
    xhr.ontimeout = errorFunc
    xhr.open(method, uri, !sync, options.username, options.password)
    //has to be after open
    if(!sync) {
        xhr.withCredentials = !!options.withCredentials
    }
    // Cannot set timeout with sync request
    // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
    // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
    if (!sync && options.timeout > 0 ) {
        timeoutTimer = setTimeout(function(){
            if (aborted) return
            aborted = true//IE9 may still call readystatechange
            xhr.abort("timeout")
            var e = new Error("XMLHttpRequest timeout")
            e.code = "ETIMEDOUT"
            errorFunc(e)
        }, options.timeout )
    }

    if (xhr.setRequestHeader) {
        for(key in headers){
            if(headers.hasOwnProperty(key)){
                xhr.setRequestHeader(key, headers[key])
            }
        }
    } else if (options.headers && !isEmpty(options.headers)) {
        throw new Error("Headers cannot be set on an XDomainRequest object")
    }

    if ("responseType" in options) {
        xhr.responseType = options.responseType
    }

    if ("beforeSend" in options &&
        typeof options.beforeSend === "function"
    ) {
        options.beforeSend(xhr)
    }

    // Microsoft Edge browser sends "undefined" when send is called with undefined value.
    // XMLHttpRequest spec says to pass null as body to indicate no body
    // See https://github.com/naugtur/xhr/issues/100.
    xhr.send(body || null)

    return xhr


}

function getXml(xhr) {
    if (xhr.responseType === "document") {
        return xhr.responseXML
    }
    var firefoxBugTakenEffect = xhr.status === 204 && xhr.responseXML && xhr.responseXML.documentElement.nodeName === "parsererror"
    if (xhr.responseType === "" && !firefoxBugTakenEffect) {
        return xhr.responseXML
    }

    return null
}

function noop() {}

},{"global/window":85,"is-function":86,"parse-headers":87,"xtend":90}],90:[function(_dereq_,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],91:[function(_dereq_,module,exports){
/*
The MIT License (MIT)

Copyright (c) 2015 Patricio Gonzalez Vivo ( http://www.patriciogonzalezvivo.com )

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the 'Software'), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

'use strict';

var _createClass = _dereq_('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = _dereq_('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _xhr = _dereq_('xhr');

var _xhr2 = _interopRequireDefault(_xhr);

var _glGl = _dereq_('./gl/gl');

var _glTexture = _dereq_('./gl/Texture');

var _glTexture2 = _interopRequireDefault(_glTexture);

var _toolsCommon = _dereq_('./tools/common');

var _toolsMixin = _dereq_('./tools/mixin');

var GlslCanvas = (function () {
    function GlslCanvas(canvas, options) {
        var _this = this;

        _classCallCheck(this, GlslCanvas);

        (0, _toolsMixin.subscribeMixin)(this);

        options = options || {};

        this.width = canvas.clientWidth;
        this.height = canvas.clientHeight;

        this.canvas = canvas;
        this.gl = undefined;
        this.program = undefined;
        this.textures = {};
        this.uniforms = {};
        this.vbo = {};
        this.isValid = false;

        this.vertexString = options.vertexString || '\n#ifdef GL_ES\nprecision mediump float;\n#endif\n\nattribute vec2 a_position;\nattribute vec2 a_texcoord;\n\nvarying vec2 v_texcoord;\n\nvoid main() {\n    gl_Position = vec4(a_position, 0.0, 1.0);\n    v_texcoord = a_texcoord;\n}\n';
        this.fragmentString = options.fragmentString || '\n#ifdef GL_ES\nprecision mediump float;\n#endif\n\nvarying vec2 v_texcoord;\n\nvoid main(){\n    gl_FragColor = vec4(0.0);\n}\n';

        // GL Context
        var gl = (0, _glGl.setupWebGL)(canvas, options);
        if (!gl) {
            return;
        }
        this.gl = gl;
        this.timeLoad = this.timePrev = Date.now();
        this.timeDelta = 0.;
        this.forceRender = true;
        this.paused = false;

        // Allow alpha
        canvas.style.backgroundColor = options.backgroundColor || 'rgba(1,1,1,0)';

        // Load shader
        if (canvas.hasAttribute('data-fragment')) {
            this.fragmentString = canvas.getAttribute('data-fragment');
        } else if (canvas.hasAttribute('data-fragment-url')) {
            var source = canvas.getAttribute('data-fragment-url');
            _xhr2['default'].get(source, function (error, response, body) {
                _this.load(body, _this.vertexString);
            });
        }

        // Load shader
        if (canvas.hasAttribute('data-vertex')) {
            this.vertexString = canvas.getAttribute('data-vertex');
        } else if (canvas.hasAttribute('data-vertex-url')) {
            var source = canvas.getAttribute('data-vertex-url');
            _xhr2['default'].get(source, function (error, response, body) {
                _this.load(_this.fragmentString, body);
            });
        }

        this.load();

        if (!this.program) {
            return;
        }

        // Define Vertex buffer
        var texCoordsLoc = gl.getAttribLocation(this.program, 'a_texcoord');
        this.vbo.texCoords = gl.createBuffer();
        this.gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo.texCoords);
        this.gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0]), gl.STATIC_DRAW);
        this.gl.enableVertexAttribArray(texCoordsLoc);
        this.gl.vertexAttribPointer(texCoordsLoc, 2, gl.FLOAT, false, 0, 0);

        var verticesLoc = gl.getAttribLocation(this.program, 'a_position');
        this.vbo.vertices = gl.createBuffer();
        this.gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo.vertices);
        this.gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0]), gl.STATIC_DRAW);
        this.gl.enableVertexAttribArray(verticesLoc);
        this.gl.vertexAttribPointer(verticesLoc, 2, gl.FLOAT, false, 0, 0);

        // load TEXTURES
        if (canvas.hasAttribute('data-textures')) {
            var imgList = canvas.getAttribute('data-textures').split(',');
            for (var nImg in imgList) {
                this.setUniform('u_tex' + nImg, imgList[nImg]);
            }
        }

        // ========================== EVENTS
        var mouse = {
            x: 0,
            y: 0
        };
        document.addEventListener('mousemove', function (e) {
            mouse.x = e.clientX || e.pageX;
            mouse.y = e.clientY || e.pageY;
        }, false);

        var sandbox = this;
        function RenderLoop() {
            if (sandbox.nMouse > 1) {
                sandbox.setMouse(mouse);
            }
            sandbox.render();
            sandbox.forceRender = sandbox.resize();
            window.requestAnimationFrame(RenderLoop);
        }

        // Start
        this.setMouse({ x: 0, y: 0 });
        RenderLoop();
        return this;
    }

    _createClass(GlslCanvas, [{
        key: 'destroy',
        value: function destroy() {
            this.animated = false;
            this.isValid = false;
            for (var tex in this.textures) {
                this.gl.deleteTexture(tex);
            }
            this.textures = {};
            for (var att in this.attribs) {
                this.gl.deleteBuffer(this.attribs[att]);
            }
            this.gl.useProgram(null);
            this.gl.deleteProgram(this.program);
            this.program = null;
            this.gl = null;
        }
    }, {
        key: 'load',
        value: function load(fragString, vertString) {
            // Load vertex shader if there is one
            if (vertString) {
                this.vertexString = vertString;
            }

            // Load fragment shader if there is one
            if (fragString) {
                this.fragmentString = fragString;
            }

            this.animated = false;
            this.nDelta = (this.fragmentString.match(/u_delta/g) || []).length;
            this.nTime = (this.fragmentString.match(/u_time/g) || []).length;
            this.nDate = (this.fragmentString.match(/u_date/g) || []).length;
            this.nMouse = (this.fragmentString.match(/u_mouse/g) || []).length;
            this.animated = this.nDate > 1 || this.nTime > 1 || this.nMouse > 1;

            var nTextures = this.fragmentString.search(/sampler2D/g);
            if (nTextures) {
                var lines = this.fragmentString.split('\n');
                for (var i = 0; i < lines.length; i++) {
                    var match = lines[i].match(/uniform\s*sampler2D\s*([\w]*);\s*\/\/\s*([\w|\:\/\/|\.|\-|\_]*)/i);
                    if (match) {
                        var ext = match[2].split('.').pop();
                        if (match[1] && match[2] && (ext === 'jpg' || ext === 'JPG' || ext === 'jpeg' || ext === 'JPEG' || ext === 'png' || ext === 'PNG')) {
                            this.setUniform(match[1], match[2]);
                        }
                    }
                    var main = lines[i].match(/\s*void\s*main\s*/g);
                    if (main) {
                        break;
                    }
                }
            }

            var vertexShader = (0, _glGl.createShader)(this, this.vertexString, this.gl.VERTEX_SHADER);
            var fragmentShader = (0, _glGl.createShader)(this, this.fragmentString, this.gl.FRAGMENT_SHADER);

            // If Fragment shader fails load a empty one to sign the error
            if (!fragmentShader) {
                fragmentShader = (0, _glGl.createShader)(this, 'void main(){\n\tgl_FragColor = vec4(1.0);\n}', this.gl.FRAGMENT_SHADER);
                this.isValid = false;
            } else {
                this.isValid = true;
            }

            // Create and use program
            var program = (0, _glGl.createProgram)(this, [vertexShader, fragmentShader]); //, [0,1],['a_texcoord','a_position']);
            this.gl.useProgram(program);

            // Delete shaders
            // this.gl.detachShader(program, vertexShader);
            // this.gl.detachShader(program, fragmentShader);
            this.gl.deleteShader(vertexShader);
            this.gl.deleteShader(fragmentShader);

            this.program = program;
            this.change = true;

            // Trigger event
            this.trigger('load', {});

            this.forceRender = true;
        }
    }, {
        key: 'loadTexture',
        value: function loadTexture(name, urlElementOrData, options) {
            var _this2 = this;

            if (!options) {
                options = {};
            }

            if (typeof urlElementOrData === 'string') {
                options.url = urlElementOrData;
            } else if (typeof urlElementOrData === 'object' && urlElementOrData.data && urlElementOrData.width && urlElementOrData.height) {
                options.data = urlElementOrData.data;
                options.width = urlElementOrData.width;
                options.height = urlElementOrData.height;
            } else if (typeof urlElementOrData === 'object') {
                options.element = urlElementOrData;
            }

            if (this.textures[name]) {
                if (this.textures[name]) {
                    this.textures[name].load(options);
                    this.textures[name].on('loaded', function (args) {
                        _this2.forceRender = true;
                    });
                }
            } else {
                this.textures[name] = new _glTexture2['default'](this.gl, name, options);
                this.textures[name].on('loaded', function (args) {
                    _this2.forceRender = true;
                });
            }
        }
    }, {
        key: 'refreshUniforms',
        value: function refreshUniforms() {
            this.uniforms = {};
        }
    }, {
        key: 'setUniform',
        value: function setUniform(name) {
            var u = {};

            for (var _len = arguments.length, value = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                value[_key - 1] = arguments[_key];
            }

            u[name] = value;
            this.setUniforms(u);
        }
    }, {
        key: 'setUniforms',
        value: function setUniforms(uniforms) {
            var parsed = (0, _glGl.parseUniforms)(uniforms);
            // Set each uniform
            for (var u in parsed) {
                if (parsed[u].type === 'sampler2D') {
                    // For textures, we need to track texture units, so we have a special setter
                    // this.uniformTexture(parsed[u].name, parsed[u].value[0]);
                    this.loadTexture(parsed[u].name, parsed[u].value[0]);
                } else {
                    this.uniform(parsed[u].method, parsed[u].type, parsed[u].name, parsed[u].value);
                    this.forceRender = true;
                }
            }
        }
    }, {
        key: 'setMouse',
        value: function setMouse(mouse) {
            // set the mouse uniform
            var rect = this.canvas.getBoundingClientRect();
            if (mouse && mouse.x && mouse.x >= rect.left && mouse.x <= rect.right && mouse.y && mouse.y >= rect.top && mouse.y <= rect.bottom) {
                this.uniform('2f', 'vec2', 'u_mouse', mouse.x - rect.left, this.canvas.height - (mouse.y - rect.top));
            }
        }

        // ex: program.uniform('3f', 'position', x, y, z);
    }, {
        key: 'uniform',
        value: function uniform(method, type, name) {
            // 'value' is a method-appropriate arguments list
            this.uniforms[name] = this.uniforms[name] || {};
            var uniform = this.uniforms[name];

            for (var _len2 = arguments.length, value = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
                value[_key2 - 3] = arguments[_key2];
            }

            var change = (0, _toolsCommon.isDiff)(uniform.value, value);
            if (change || this.change || uniform.location === undefined || uniform.value === undefined) {
                uniform.name = name;
                uniform.value = value;
                uniform.type = type;
                uniform.method = 'uniform' + method;
                uniform.location = this.gl.getUniformLocation(this.program, name);

                this.gl[uniform.method].apply(this.gl, [uniform.location].concat(uniform.value));
            }
        }
    }, {
        key: 'uniformTexture',
        value: function uniformTexture(name, texture, options) {
            if (this.textures[name] === undefined) {
                this.loadTexture(name, texture, options);
            } else {
                this.uniform('1i', 'sampler2D', name, this.texureIndex);
                this.textures[name].bind(this.texureIndex);
                this.uniform('2f', 'vec2', name + 'Resolution', this.textures[name].width, this.textures[name].height);
                this.texureIndex++;
            }
        }
    }, {
        key: 'resize',
        value: function resize() {
            if (this.width !== this.canvas.clientWidth || this.height !== this.canvas.clientHeight) {
                var realToCSSPixels = window.devicePixelRatio || 1;

                // Lookup the size the browser is displaying the canvas in CSS pixels
                // and compute a size needed to make our drawingbuffer match it in
                // device pixels.
                var displayWidth = Math.floor(this.gl.canvas.clientWidth * realToCSSPixels);
                var displayHeight = Math.floor(this.gl.canvas.clientHeight * realToCSSPixels);

                // Check if the canvas is not the same size.
                if (this.gl.canvas.width !== displayWidth || this.gl.canvas.height !== displayHeight) {
                    // Make the canvas the same size
                    this.gl.canvas.width = displayWidth;
                    this.gl.canvas.height = displayHeight;
                    // Set the viewport to match
                    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
                    // this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
                }
                this.width = this.canvas.clientWidth;
                this.height = this.canvas.clientHeight;
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            this.visible = (0, _toolsCommon.isCanvasVisible)(this.canvas);
            if (this.forceRender || this.animated && this.visible && !this.paused) {

                var date = new Date();
                var now = date.getTime();
                this.timeDelta = (now - this.timePrev) / 1000.0;
                this.timePrev = now;
                if (this.nDelta > 1) {
                    // set the delta time uniform
                    this.uniform('1f', 'float', 'u_delta', this.timeDelta);
                }

                if (this.nTime > 1) {
                    // set the elapsed time uniform
                    this.uniform('1f', 'float', 'u_time', (now - this.timeLoad) / 1000.0);
                }

                if (this.nDate) {
                    // Set date uniform: year/month/day/time_in_sec
                    this.uniform('4f', 'float', 'u_date', date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds() + date.getMilliseconds() * 0.001);
                }

                // set the resolution uniform
                this.uniform('2f', 'vec2', 'u_resolution', this.canvas.width, this.canvas.height);

                this.texureIndex = 0;
                for (var tex in this.textures) {
                    this.uniformTexture(tex);
                }

                // Draw the rectangle.
                this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);

                // Trigger event
                this.trigger('render', {});

                this.change = false;
                this.forceRender = false;
            }
        }
    }, {
        key: 'pause',
        value: function pause() {
            this.paused = true;
        }
    }, {
        key: 'play',
        value: function play() {
            this.paused = false;
        }
    }, {
        key: 'version',
        value: function version() {
            return '0.0.18';
        }
    }]);

    return GlslCanvas;
})();

exports['default'] = GlslCanvas;

window.GlslCanvas = GlslCanvas;

function loadAllGlslCanvas() {
    var list = document.getElementsByClassName('glslCanvas');
    if (list.length > 0) {
        window.glslCanvases = [];
        for (var i = 0; i < list.length; i++) {
            var sandbox = new GlslCanvas(list[i]);
            if (sandbox.isValid) {
                window.glslCanvases.push(sandbox);
            }
        }
    }
}

window.addEventListener('load', function () {
    loadAllGlslCanvas();
});
module.exports = exports['default'];

},{"./gl/Texture":92,"./gl/gl":93,"./tools/common":94,"./tools/mixin":95,"babel-runtime/helpers/class-call-check":8,"babel-runtime/helpers/create-class":9,"babel-runtime/helpers/interop-require-default":10,"xhr":89}],92:[function(_dereq_,module,exports){
// Texture management
'use strict';

var _createClass = _dereq_('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = _dereq_('babel-runtime/helpers/class-call-check')['default'];

var _Promise = _dereq_('babel-runtime/core-js/promise')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _toolsCommon = _dereq_('../tools/common');

var _toolsMixin = _dereq_('../tools/mixin');

// GL texture wrapper object for keeping track of a global set of textures, keyed by a unique user-defined name

var Texture = (function () {
    function Texture(gl, name) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, Texture);

        (0, _toolsMixin.subscribeMixin)(this);

        this.gl = gl;
        this.texture = gl.createTexture();
        if (this.texture) {
            this.valid = true;
        }
        this.bind();

        this.name = name;
        this.source = null;
        this.sourceType = null;
        this.loading = null; // a Promise object to track the loading state of this texture

        // Default to a 1-pixel black texture so we can safely render while we wait for an image to load
        // See: http://stackoverflow.com/questions/19722247/webgl-wait-for-texture-to-load
        this.setData(1, 1, new Uint8Array([0, 0, 0, 255]), { filtering: 'linear' });
        this.setFiltering(options.filtering);

        this.load(options);
    }

    // Report max texture size for a GL context

    // Destroy a single texture instance

    _createClass(Texture, [{
        key: 'destroy',
        value: function destroy() {
            if (!this.valid) {
                return;
            }
            this.gl.deleteTexture(this.texture);
            this.texture = null;
            delete this.data;
            this.data = null;
            this.valid = false;
        }
    }, {
        key: 'bind',
        value: function bind(unit) {
            if (!this.valid) {
                return;
            }
            if (typeof unit === 'number') {
                if (Texture.activeUnit !== unit) {
                    this.gl.activeTexture(this.gl.TEXTURE0 + unit);
                    Texture.activeUnit = unit;
                }
            }
            if (Texture.activeTexture !== this.texture) {
                this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
                Texture.activeTexture = this.texture;
            }
        }
    }, {
        key: 'load',
        value: function load() {
            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            this.loading = null;

            if (typeof options.url === 'string') {
                if (this.url === undefined || options.url !== this.url) {
                    this.setUrl(options.url, options);
                }
            } else if (options.element) {
                this.setElement(options.element, options);
            } else if (options.data && options.width && options.height) {
                this.setData(options.width, options.height, options.data, options);
            }
        }

        // Sets texture from an url
    }, {
        key: 'setUrl',
        value: function setUrl(url) {
            var _this = this;

            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            if (!this.valid) {
                return;
            }

            this.url = url; // save URL reference (will be overwritten when element is loaded below)
            this.source = this.url;
            this.sourceType = 'url';

            this.loading = new _Promise(function (resolve, reject) {
                var image = new Image();
                image.onload = function () {
                    try {
                        _this.setElement(image, options);
                    } catch (e) {
                        console.log('Texture \'' + _this.name + '\': failed to load url: \'' + _this.source + '\'', e, options);
                    }

                    resolve(_this);
                };
                image.onerror = function (e) {
                    // Warn and resolve on error
                    console.log('Texture \'' + _this.name + '\': failed to load url: \'' + _this.source + '\'', e, options);
                    resolve(_this);
                };

                // Safari has a bug loading data-URL images with CORS enabled, so it must be disabled in that case
                // https://bugs.webkit.org/show_bug.cgi?id=123978
                if (!((0, _toolsCommon.isSafari)() && _this.source.slice(0, 5) === 'data:')) {
                    image.crossOrigin = 'anonymous';
                }

                image.src = _this.source;
            });
            return this.loading;
        }

        // Sets texture to a raw image buffer
    }, {
        key: 'setData',
        value: function setData(width, height, data) {
            var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

            this.width = width;
            this.height = height;

            this.source = data;
            this.sourceType = 'data';

            this.update(options);
            this.setFiltering(options);

            this.loading = _Promise.resolve(this);
            return this.loading;
        }

        // Sets the texture to track a element (canvas/image)
    }, {
        key: 'setElement',
        value: function setElement(element, options) {
            var el = element;

            // a string element is interpeted as a CSS selector
            if (typeof element === 'string') {
                element = document.querySelector(element);
            }

            if (element instanceof HTMLCanvasElement || element instanceof HTMLImageElement || element instanceof HTMLVideoElement) {
                this.source = element;
                this.sourceType = 'element';

                this.update(options);
                this.setFiltering(options);
            } else {
                var msg = 'the \'element\' parameter (`element: ' + JSON.stringify(el) + '`) must be a CSS ';
                msg += 'selector string, or a <canvas>, <image> or <video> object';
                console.log('Texture \'' + this.name + '\': ' + msg, options);
            }

            this.loading = _Promise.resolve(this);
            return this.loading;
        }

        // Uploads current image or buffer to the GPU (can be used to update animated textures on the fly)
    }, {
        key: 'update',
        value: function update() {
            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            if (!this.valid) {
                return;
            }

            this.bind();
            this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, options.UNPACK_FLIP_Y_WEBGL === false ? false : true);
            this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, options.UNPACK_PREMULTIPLY_ALPHA_WEBGL || false);

            // Image or Canvas element
            if (this.sourceType === 'element' && (this.source instanceof HTMLCanvasElement || this.source instanceof HTMLVideoElement || this.source instanceof HTMLImageElement && this.source.complete)) {
                this.width = this.source.width;
                this.height = this.source.height;
                this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.source);
            }
            // Raw image buffer
            else if (this.sourceType === 'data') {
                    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.width, this.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.source);
                }
            this.trigger('loaded', this);
        }

        // Determines appropriate filtering mode
    }, {
        key: 'setFiltering',
        value: function setFiltering() {
            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            if (!this.valid) {
                return;
            }

            this.powerOf2 = (0, _toolsCommon.isPowerOf2)(this.width) && (0, _toolsCommon.isPowerOf2)(this.height);
            var defualtFilter = this.powerOf2 ? 'mipmap' : 'linear';
            this.filtering = options.filtering || defualtFilter;

            var gl = this.gl;
            this.bind();

            // For power-of-2 textures, the following presets are available:
            // mipmap: linear blend from nearest mip
            // linear: linear blend from original image (no mips)
            // nearest: nearest pixel from original image (no mips, 'blocky' look)
            if (this.powerOf2) {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, options.TEXTURE_WRAP_S || options.repeat && gl.REPEAT || gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, options.TEXTURE_WRAP_T || options.repeat && gl.REPEAT || gl.CLAMP_TO_EDGE);

                if (this.filtering === 'mipmap') {
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR); // TODO: use trilinear filtering by defualt instead?
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                    gl.generateMipmap(gl.TEXTURE_2D);
                } else if (this.filtering === 'linear') {
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                } else if (this.filtering === 'nearest') {
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                }
            } else {
                // WebGL has strict requirements on non-power-of-2 textures:
                // No mipmaps and must clamp to edge
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                if (this.filtering === 'mipmap') {
                    this.filtering = 'linear';
                }

                if (this.filtering === 'nearest') {
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                } else {
                    // default to linear for non-power-of-2 textures
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                }
            }
        }
    }]);

    return Texture;
})();

exports['default'] = Texture;
Texture.getMaxTextureSize = function (gl) {
    return gl.getParameter(gl.MAX_TEXTURE_SIZE);
};

// Global set of textures, by name
Texture.activeUnit = -1;
module.exports = exports['default'];

},{"../tools/common":94,"../tools/mixin":95,"babel-runtime/core-js/promise":6,"babel-runtime/helpers/class-call-check":8,"babel-runtime/helpers/create-class":9}],93:[function(_dereq_,module,exports){
'use strict';

var _toConsumableArray = _dereq_('babel-runtime/helpers/to-consumable-array')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.setupWebGL = setupWebGL;
exports.create3DContext = create3DContext;
exports.createShader = createShader;
exports.createProgram = createProgram;
exports.parseUniforms = parseUniforms;
var lastError = '';

/**
 * Creates the HTLM for a failure message
 * @param {string} canvasContainerId id of container of th
 *        canvas.
 * @return {string} The html.
 */
function makeFailHTML(msg) {
    return '\n<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>\n<td align="center">\n<div style="display: table-cell; vertical-align: middle;">\n<div style="">' + msg + '</div>\n</div>\n</td></tr></table>\n';
}

/**
 * Mesasge for getting a webgl browser
 * @type {string}
 */
var GET_A_WEBGL_BROWSER = '\n\tThis page requires a browser that supports WebGL.<br/>\n\t<a href="http://get.webgl.org">Click here to upgrade your browser.</a>\n';

/**
 * Mesasge for need better hardware
 * @type {string}
 */
var OTHER_PROBLEM = '\n\tIt does not appear your computer can support WebGL.<br/>\n\t<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>\n';

/**
 * Creates a webgl context. If creation fails it will
 * change the contents of the container of the <canvas>
 * tag to an error message with the correct links for WebGL.
 * @param {Element} canvas. The canvas element to create a
 *     context from.
 * @param {WebGLContextCreationAttirbutes} optAttribs Any
 *     creation attributes you want to pass in.
 * @return {WebGLRenderingContext} The created context.
 */

function setupWebGL(canvas, optAttribs) {
    function showLink(str) {
        var container = canvas.parentNode;
        if (container) {
            container.innerHTML = makeFailHTML(str);
        }
    }

    if (!window.WebGLRenderingContext) {
        showLink(GET_A_WEBGL_BROWSER);
        return null;
    }

    var context = create3DContext(canvas, optAttribs);
    if (!context) {
        showLink(OTHER_PROBLEM);
    }
    context.getExtension('OES_standard_derivatives');
    return context;
}

/**
 * Creates a webgl context.
 * @param {!Canvas} canvas The canvas tag to get context
 *     from. If one is not passed in one will be created.
 * @return {!WebGLContext} The created context.
 */

function create3DContext(canvas, optAttribs) {
    var names = ['webgl', 'experimental-webgl'];
    var context = null;
    for (var ii = 0; ii < names.length; ++ii) {
        try {
            context = canvas.getContext(names[ii], optAttribs);
        } catch (e) {
            if (context) {
                break;
            }
        }
    }
    return context;
}

/*
 *	Create a Vertex of a specific type (gl.VERTEX_SHADER/)
 */

function createShader(main, source, type) {
    var gl = main.gl;

    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    if (!compiled) {
        // Something went wrong during compilation; get the error
        lastError = gl.getShaderInfoLog(shader);
        console.error('*** Error compiling shader ' + shader + ':' + lastError);
        main.trigger('error', { shader: shader, source: source, type: type, error: lastError });
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

/**
 * Loads a shader.
 * @param {!WebGLContext} gl The WebGLContext to use.
 * @param {string} shaderSource The shader source.
 * @param {number} shaderType The type of shader.
 * @param {function(string): void) opt_errorCallback callback for errors.
 * @return {!WebGLShader} The created shader.
 */

function createProgram(main, shaders, optAttribs, optLocations) {
    var gl = main.gl;

    var program = gl.createProgram();
    for (var ii = 0; ii < shaders.length; ++ii) {
        gl.attachShader(program, shaders[ii]);
    }
    if (optAttribs) {
        for (var ii = 0; ii < optAttribs.length; ++ii) {
            gl.bindAttribLocation(program, optLocations ? optLocations[ii] : ii, optAttribs[ii]);
        }
    }
    gl.linkProgram(program);

    // Check the link status
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        // something went wrong with the link
        lastError = gl.getProgramInfoLog(program);
        console.log('Error in program linking:' + lastError);
        gl.deleteProgram(program);
        return null;
    }
    return program;
}

// By Brett Camber on
// https://github.com/tangrams/tangram/blob/master/src/gl/glsl.js

function parseUniforms(uniforms) {
    var prefix = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    var parsed = [];

    for (var _name in uniforms) {
        var uniform = uniforms[_name];
        var u = undefined;

        if (prefix) {
            _name = prefix + '.' + _name;
        }

        // Single float
        if (typeof uniform === 'number') {
            parsed.push({
                type: 'float',
                method: '1f',
                name: _name,
                value: uniform
            });
        }
        // Array: vector, array of floats, array of textures, or array of structs
        else if (Array.isArray(uniform)) {
                // Numeric values
                if (typeof uniform[0] === 'number') {
                    // float vectors (vec2, vec3, vec4)
                    if (uniform.length === 1) {
                        parsed.push({
                            type: 'float',
                            method: '1f',
                            name: _name,
                            value: uniform
                        });
                    }
                    // float vectors (vec2, vec3, vec4)
                    else if (uniform.length >= 2 && uniform.length <= 4) {
                            parsed.push({
                                type: 'vec' + uniform.length,
                                method: uniform.length + 'fv',
                                name: _name,
                                value: uniform
                            });
                        }
                        // float array
                        else if (uniform.length > 4) {
                                parsed.push({
                                    type: 'float[]',
                                    method: '1fv',
                                    name: _name + '[0]',
                                    value: uniform
                                });
                            }
                    // TODO: assume matrix for (typeof == Float32Array && length == 16)?
                }
                // Array of textures
                else if (typeof uniform[0] === 'string') {
                        parsed.push({
                            type: 'sampler2D',
                            method: '1i',
                            name: _name,
                            value: uniform
                        });
                    }
                    // Array of arrays - but only arrays of vectors are allowed in this case
                    else if (Array.isArray(uniform[0]) && typeof uniform[0][0] === 'number') {
                            // float vectors (vec2, vec3, vec4)
                            if (uniform[0].length >= 2 && uniform[0].length <= 4) {
                                // Set each vector in the array
                                for (u = 0; u < uniform.length; u++) {
                                    parsed.push({
                                        type: 'vec' + uniform[0].length,
                                        method: uniform[u].length + 'fv',
                                        name: _name + '[' + u + ']',
                                        value: uniform[u]
                                    });
                                }
                            }
                            // else error?
                        }
                        // Array of structures
                        else if (typeof uniform[0] === 'object') {
                                for (u = 0; u < uniform.length; u++) {
                                    // Set each struct in the array
                                    parsed.push.apply(parsed, _toConsumableArray(parseUniforms(uniform[u], _name + '[' + u + ']')));
                                }
                            }
            }
            // Boolean
            else if (typeof uniform === 'boolean') {
                    parsed.push({
                        type: 'bool',
                        method: '1i',
                        name: _name,
                        value: uniform
                    });
                }
                // Texture
                else if (typeof uniform === 'string') {
                        parsed.push({
                            type: 'sampler2D',
                            method: '1i',
                            name: _name,
                            value: uniform
                        });
                    }
                    // Structure
                    else if (typeof uniform === 'object') {
                            // Set each field in the struct
                            parsed.push.apply(parsed, _toConsumableArray(parseUniforms(uniform, _name)));
                        }
        // TODO: support other non-float types? (int, etc.)
    }
    return parsed;
}

},{"babel-runtime/helpers/to-consumable-array":11}],94:[function(_dereq_,module,exports){
'use strict';

var _Set = _dereq_('babel-runtime/core-js/set')['default'];

var _Object$assign = _dereq_('babel-runtime/core-js/object/assign')['default'];

var _getIterator = _dereq_('babel-runtime/core-js/get-iterator')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.isCanvasVisible = isCanvasVisible;
exports.isPowerOf2 = isPowerOf2;
exports.isSafari = isSafari;
exports.nextHighestPowerOfTwo = nextHighestPowerOfTwo;
exports.FormatNumberLength = FormatNumberLength;
exports.getMousePos = getMousePos;
exports.isDiff = isDiff;
exports.subscribeMixin = subscribeMixin;

function isCanvasVisible(canvas) {
    return canvas.getBoundingClientRect().top + canvas.height > 0 && canvas.getBoundingClientRect().top < (window.innerHeight || document.documentElement.clientHeight);
}

function isPowerOf2(value) {
    return (value & value - 1) === 0;
}

function isSafari() {
    return (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    );
}

;

function nextHighestPowerOfTwo(x) {
    --x;
    for (var i = 1; i < 32; i <<= 1) {
        x = x | x >> i;
    }
    return x + 1;
}

function FormatNumberLength(num, length) {
    var r = num.toString();
    while (r.length < length) {
        r = '0' + r;
    }
    return r;
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function isDiff(a, b) {
    if (a && b) {
        return a.toString() !== b.toString();
    }
    return false;
}

function subscribeMixin(target) {
    var listeners = new _Set();

    return _Object$assign(target, {

        subscribe: function subscribe(listener) {
            listeners.add(listener);
        },

        on: function on(type, f) {
            var listener = {};
            listener[type] = f;
            listeners.add(listener);
        },

        unsubscribe: function unsubscribe(listener) {
            listeners['delete'](listener);
        },

        unsubscribeAll: function unsubscribeAll() {
            listeners.clear();
        },

        trigger: function trigger(event) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    data[_key - 1] = arguments[_key];
                }

                for (var _iterator = _getIterator(listeners), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var listener = _step.value;

                    if (typeof listener[event] === 'function') {
                        listener[event].apply(listener, data);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    });
}

},{"babel-runtime/core-js/get-iterator":2,"babel-runtime/core-js/object/assign":3,"babel-runtime/core-js/set":7}],95:[function(_dereq_,module,exports){
'use strict';

var _Set = _dereq_('babel-runtime/core-js/set')['default'];

var _Object$assign = _dereq_('babel-runtime/core-js/object/assign')['default'];

var _getIterator = _dereq_('babel-runtime/core-js/get-iterator')['default'];

var _Object$keys = _dereq_('babel-runtime/core-js/object/keys')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.subscribeMixin = subscribeMixin;

function subscribeMixin(target) {
    var listeners = new _Set();

    return _Object$assign(target, {

        on: function on(type, f) {
            var listener = {};
            listener[type] = f;
            listeners.add(listener);
        },

        off: function off(type, f) {
            if (f) {
                var listener = {};
                listener[type] = f;
                listeners['delete'](listener);
            } else {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _getIterator(listeners), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var item = _step.value;
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = _getIterator(_Object$keys(item)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var key = _step2.value;

                                if (key === type) {
                                    listeners['delete'](item);
                                    return;
                                }
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                                    _iterator2['return']();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator['return']) {
                            _iterator['return']();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        },

        listSubscriptions: function listSubscriptions() {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = _getIterator(listeners), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var item = _step3.value;

                    console.log(item);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                        _iterator3['return']();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        },

        subscribe: function subscribe(listener) {
            listeners.add(listener);
        },

        unsubscribe: function unsubscribe(listener) {
            listeners['delete'](listener);
        },

        unsubscribeAll: function unsubscribeAll() {
            listeners.clear();
        },

        trigger: function trigger(event) {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    data[_key - 1] = arguments[_key];
                }

                for (var _iterator4 = _getIterator(listeners), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var listener = _step4.value;

                    if (typeof listener[event] === 'function') {
                        listener[event].apply(listener, data);
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4['return']) {
                        _iterator4['return']();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }
    });
}

},{"babel-runtime/core-js/get-iterator":2,"babel-runtime/core-js/object/assign":3,"babel-runtime/core-js/object/keys":5,"babel-runtime/core-js/set":7}]},{},[91])(91)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2FycmF5L2Zyb20uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2tleXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2UuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3NldC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3MtY2FsbC1jaGVjay5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlLWNsYXNzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvdG8tY29uc3VtYWJsZS1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc2V0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuYS1mdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmFkZC10by11bnNjb3BhYmxlcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmFuLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmNsYXNzb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jb2xsZWN0aW9uLXN0cm9uZy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmNvbGxlY3Rpb24tdG8tanNvbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmNvbGxlY3Rpb24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jb3JlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY3R4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZGVmaW5lZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmRlc2NyaXB0b3JzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZG9tLWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmV4cG9ydC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmZhaWxzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZm9yLW9mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZ2xvYmFsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaGFzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaGlkZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmh0bWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pbnZva2UuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXMtYXJyYXktaXRlci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmlzLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItY2FsbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1kZWZpbmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWRldGVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItc3RlcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXJhdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQubGlicmFyeS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLm1pY3JvdGFzay5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLm9iamVjdC1hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5vYmplY3Qtc2FwLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQucHJvcGVydHktZGVzYy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnJlZGVmaW5lLWFsbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnJlZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc2FtZS12YWx1ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnNldC1wcm90by5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnNldC1zcGVjaWVzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc2V0LXRvLXN0cmluZy10YWcuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zaGFyZWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zcGVjaWVzLWNvbnN0cnVjdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3RyaWN0LW5ldy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnN0cmluZy1hdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRhc2suanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50by1pbnRlZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudG8taW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLWxlbmd0aC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnVpZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLndrcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5LmZyb20uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYucHJvbWlzZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc2V0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnNldC50by1qc29uLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiLCJub2RlX21vZHVsZXMvZm9yLWVhY2gvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZ2xvYmFsL3dpbmRvdy5qcyIsIm5vZGVfbW9kdWxlcy9pcy1mdW5jdGlvbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wYXJzZS1oZWFkZXJzL3BhcnNlLWhlYWRlcnMuanMiLCJub2RlX21vZHVsZXMvdHJpbS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy94aHIvaW5kZXguanMiLCJub2RlX21vZHVsZXMveHRlbmQvaW1tdXRhYmxlLmpzIiwiL1VzZXJzL3BhdHJpY2lvL0Rlc2t0b3AvZ2xzbENhbnZhcy9zcmMvR2xzbENhbnZhcy5qcyIsIi9Vc2Vycy9wYXRyaWNpby9EZXNrdG9wL2dsc2xDYW52YXMvc3JjL2dsL1RleHR1cmUuanMiLCIvVXNlcnMvcGF0cmljaW8vRGVza3RvcC9nbHNsQ2FudmFzL3NyYy9nbC9nbC5qcyIsIi9Vc2Vycy9wYXRyaWNpby9EZXNrdG9wL2dsc2xDYW52YXMvc3JjL3Rvb2xzL2NvbW1vbi5qcyIsIi9Vc2Vycy9wYXRyaWNpby9EZXNrdG9wL2dsc2xDYW52YXMvc3JjL3Rvb2xzL21peGluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7O0FDRkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcFNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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R0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3BJLFlBQUksQ0FBQyxFQUFFLENBQUMsdUJBQXVCLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDOUMsWUFBSSxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7QUFFcEUsWUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDbkUsWUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO0FBQ3RDLFlBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN2RCxZQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMxSSxZQUFJLENBQUMsRUFBRSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzdDLFlBQUksQ0FBQyxFQUFFLENBQUMsbUJBQW1CLENBQUMsV0FBVyxF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aWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb21cIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ25cIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5c1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9wcm9taXNlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3NldFwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX09iamVjdCRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKVtcImRlZmF1bHRcIl07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG5cbiAgICAgIF9PYmplY3QkZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn07XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfQXJyYXkkZnJvbSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvYXJyYXkvZnJvbVwiKVtcImRlZmF1bHRcIl07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZnVuY3Rpb24gKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgYXJyMltpXSA9IGFycltpXTtcblxuICAgIHJldHVybiBhcnIyO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBfQXJyYXkkZnJvbShhcnIpO1xuICB9XG59O1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuYXJyYXkuZnJvbScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQuY29yZScpLkFycmF5LmZyb207IiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvcicpOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kLmNvcmUnKS5PYmplY3QuYXNzaWduOyIsInZhciAkID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2Mpe1xuICByZXR1cm4gJC5zZXREZXNjKGl0LCBrZXksIGRlc2MpO1xufTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQuY29yZScpLk9iamVjdC5rZXlzOyIsInJlcXVpcmUoJy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5wcm9taXNlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvJC5jb3JlJykuUHJvbWlzZTsiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc2V0Jyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5zZXQudG8tanNvbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzLyQuY29yZScpLlNldDsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH07IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKCFpc09iamVjdChpdCkpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59OyIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi8kLmNvZicpXG4gICwgVEFHID0gcmVxdWlyZSgnLi8kLndrcycpKCd0b1N0cmluZ1RhZycpXG4gIC8vIEVTMyB3cm9uZyBoZXJlXG4gICwgQVJHID0gY29mKGZ1bmN0aW9uKCl7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgTywgVCwgQjtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKFQgPSAoTyA9IE9iamVjdChpdCkpW1RBR10pID09ICdzdHJpbmcnID8gVFxuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQVJHID8gY29mKE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKEIgPSBjb2YoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiBCO1xufTsiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciAkICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGhpZGUgICAgICAgICA9IHJlcXVpcmUoJy4vJC5oaWRlJylcbiAgLCByZWRlZmluZUFsbCAgPSByZXF1aXJlKCcuLyQucmVkZWZpbmUtYWxsJylcbiAgLCBjdHggICAgICAgICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCBzdHJpY3ROZXcgICAgPSByZXF1aXJlKCcuLyQuc3RyaWN0LW5ldycpXG4gICwgZGVmaW5lZCAgICAgID0gcmVxdWlyZSgnLi8kLmRlZmluZWQnKVxuICAsIGZvck9mICAgICAgICA9IHJlcXVpcmUoJy4vJC5mb3Itb2YnKVxuICAsICRpdGVyRGVmaW5lICA9IHJlcXVpcmUoJy4vJC5pdGVyLWRlZmluZScpXG4gICwgc3RlcCAgICAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXItc3RlcCcpXG4gICwgSUQgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLnVpZCcpKCdpZCcpXG4gICwgJGhhcyAgICAgICAgID0gcmVxdWlyZSgnLi8kLmhhcycpXG4gICwgaXNPYmplY3QgICAgID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpXG4gICwgc2V0U3BlY2llcyAgID0gcmVxdWlyZSgnLi8kLnNldC1zcGVjaWVzJylcbiAgLCBERVNDUklQVE9SUyAgPSByZXF1aXJlKCcuLyQuZGVzY3JpcHRvcnMnKVxuICAsIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgaXNPYmplY3RcbiAgLCBTSVpFICAgICAgICAgPSBERVNDUklQVE9SUyA/ICdfcycgOiAnc2l6ZSdcbiAgLCBpZCAgICAgICAgICAgPSAwO1xuXG52YXIgZmFzdEtleSA9IGZ1bmN0aW9uKGl0LCBjcmVhdGUpe1xuICAvLyByZXR1cm4gcHJpbWl0aXZlIHdpdGggcHJlZml4XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJyA/IGl0IDogKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyA/ICdTJyA6ICdQJykgKyBpdDtcbiAgaWYoISRoYXMoaXQsIElEKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IGlkIHRvIGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIGlkXG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG9iamVjdCBpZFxuICAgIGhpZGUoaXQsIElELCArK2lkKTtcbiAgLy8gcmV0dXJuIG9iamVjdCBpZCB3aXRoIHByZWZpeFxuICB9IHJldHVybiAnTycgKyBpdFtJRF07XG59O1xuXG52YXIgZ2V0RW50cnkgPSBmdW5jdGlvbih0aGF0LCBrZXkpe1xuICAvLyBmYXN0IGNhc2VcbiAgdmFyIGluZGV4ID0gZmFzdEtleShrZXkpLCBlbnRyeTtcbiAgaWYoaW5kZXggIT09ICdGJylyZXR1cm4gdGhhdC5faVtpbmRleF07XG4gIC8vIGZyb3plbiBvYmplY3QgY2FzZVxuICBmb3IoZW50cnkgPSB0aGF0Ll9mOyBlbnRyeTsgZW50cnkgPSBlbnRyeS5uKXtcbiAgICBpZihlbnRyeS5rID09IGtleSlyZXR1cm4gZW50cnk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDb25zdHJ1Y3RvcjogZnVuY3Rpb24od3JhcHBlciwgTkFNRSwgSVNfTUFQLCBBRERFUil7XG4gICAgdmFyIEMgPSB3cmFwcGVyKGZ1bmN0aW9uKHRoYXQsIGl0ZXJhYmxlKXtcbiAgICAgIHN0cmljdE5ldyh0aGF0LCBDLCBOQU1FKTtcbiAgICAgIHRoYXQuX2kgPSAkLmNyZWF0ZShudWxsKTsgLy8gaW5kZXhcbiAgICAgIHRoYXQuX2YgPSB1bmRlZmluZWQ7ICAgICAgLy8gZmlyc3QgZW50cnlcbiAgICAgIHRoYXQuX2wgPSB1bmRlZmluZWQ7ICAgICAgLy8gbGFzdCBlbnRyeVxuICAgICAgdGhhdFtTSVpFXSA9IDA7ICAgICAgICAgICAvLyBzaXplXG4gICAgICBpZihpdGVyYWJsZSAhPSB1bmRlZmluZWQpZm9yT2YoaXRlcmFibGUsIElTX01BUCwgdGhhdFtBRERFUl0sIHRoYXQpO1xuICAgIH0pO1xuICAgIHJlZGVmaW5lQWxsKEMucHJvdG90eXBlLCB7XG4gICAgICAvLyAyMy4xLjMuMSBNYXAucHJvdG90eXBlLmNsZWFyKClcbiAgICAgIC8vIDIzLjIuMy4yIFNldC5wcm90b3R5cGUuY2xlYXIoKVxuICAgICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCl7XG4gICAgICAgIGZvcih2YXIgdGhhdCA9IHRoaXMsIGRhdGEgPSB0aGF0Ll9pLCBlbnRyeSA9IHRoYXQuX2Y7IGVudHJ5OyBlbnRyeSA9IGVudHJ5Lm4pe1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmKGVudHJ5LnApZW50cnkucCA9IGVudHJ5LnAubiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBkZWxldGUgZGF0YVtlbnRyeS5pXTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0Ll9mID0gdGhhdC5fbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhhdFtTSVpFXSA9IDA7XG4gICAgICB9LFxuICAgICAgLy8gMjMuMS4zLjMgTWFwLnByb3RvdHlwZS5kZWxldGUoa2V5KVxuICAgICAgLy8gMjMuMi4zLjQgU2V0LnByb3RvdHlwZS5kZWxldGUodmFsdWUpXG4gICAgICAnZGVsZXRlJzogZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgdmFyIHRoYXQgID0gdGhpc1xuICAgICAgICAgICwgZW50cnkgPSBnZXRFbnRyeSh0aGF0LCBrZXkpO1xuICAgICAgICBpZihlbnRyeSl7XG4gICAgICAgICAgdmFyIG5leHQgPSBlbnRyeS5uXG4gICAgICAgICAgICAsIHByZXYgPSBlbnRyeS5wO1xuICAgICAgICAgIGRlbGV0ZSB0aGF0Ll9pW2VudHJ5LmldO1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmKHByZXYpcHJldi5uID0gbmV4dDtcbiAgICAgICAgICBpZihuZXh0KW5leHQucCA9IHByZXY7XG4gICAgICAgICAgaWYodGhhdC5fZiA9PSBlbnRyeSl0aGF0Ll9mID0gbmV4dDtcbiAgICAgICAgICBpZih0aGF0Ll9sID09IGVudHJ5KXRoYXQuX2wgPSBwcmV2O1xuICAgICAgICAgIHRoYXRbU0laRV0tLTtcbiAgICAgICAgfSByZXR1cm4gISFlbnRyeTtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4yLjMuNiBTZXQucHJvdG90eXBlLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgICAgIC8vIDIzLjEuMy41IE1hcC5wcm90b3R5cGUuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICAgICAgZm9yRWFjaDogZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuIC8qLCB0aGF0ID0gdW5kZWZpbmVkICovKXtcbiAgICAgICAgdmFyIGYgPSBjdHgoY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQsIDMpXG4gICAgICAgICAgLCBlbnRyeTtcbiAgICAgICAgd2hpbGUoZW50cnkgPSBlbnRyeSA/IGVudHJ5Lm4gOiB0aGlzLl9mKXtcbiAgICAgICAgICBmKGVudHJ5LnYsIGVudHJ5LmssIHRoaXMpO1xuICAgICAgICAgIC8vIHJldmVydCB0byB0aGUgbGFzdCBleGlzdGluZyBlbnRyeVxuICAgICAgICAgIHdoaWxlKGVudHJ5ICYmIGVudHJ5LnIpZW50cnkgPSBlbnRyeS5wO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLy8gMjMuMS4zLjcgTWFwLnByb3RvdHlwZS5oYXMoa2V5KVxuICAgICAgLy8gMjMuMi4zLjcgU2V0LnByb3RvdHlwZS5oYXModmFsdWUpXG4gICAgICBoYXM6IGZ1bmN0aW9uIGhhcyhrZXkpe1xuICAgICAgICByZXR1cm4gISFnZXRFbnRyeSh0aGlzLCBrZXkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmKERFU0NSSVBUT1JTKSQuc2V0RGVzYyhDLnByb3RvdHlwZSwgJ3NpemUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBkZWZpbmVkKHRoaXNbU0laRV0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBDO1xuICB9LFxuICBkZWY6IGZ1bmN0aW9uKHRoYXQsIGtleSwgdmFsdWUpe1xuICAgIHZhciBlbnRyeSA9IGdldEVudHJ5KHRoYXQsIGtleSlcbiAgICAgICwgcHJldiwgaW5kZXg7XG4gICAgLy8gY2hhbmdlIGV4aXN0aW5nIGVudHJ5XG4gICAgaWYoZW50cnkpe1xuICAgICAgZW50cnkudiA9IHZhbHVlO1xuICAgIC8vIGNyZWF0ZSBuZXcgZW50cnlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhhdC5fbCA9IGVudHJ5ID0ge1xuICAgICAgICBpOiBpbmRleCA9IGZhc3RLZXkoa2V5LCB0cnVlKSwgLy8gPC0gaW5kZXhcbiAgICAgICAgazoga2V5LCAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGtleVxuICAgICAgICB2OiB2YWx1ZSwgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gdmFsdWVcbiAgICAgICAgcDogcHJldiA9IHRoYXQuX2wsICAgICAgICAgICAgIC8vIDwtIHByZXZpb3VzIGVudHJ5XG4gICAgICAgIG46IHVuZGVmaW5lZCwgICAgICAgICAgICAgICAgICAvLyA8LSBuZXh0IGVudHJ5XG4gICAgICAgIHI6IGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSByZW1vdmVkXG4gICAgICB9O1xuICAgICAgaWYoIXRoYXQuX2YpdGhhdC5fZiA9IGVudHJ5O1xuICAgICAgaWYocHJldilwcmV2Lm4gPSBlbnRyeTtcbiAgICAgIHRoYXRbU0laRV0rKztcbiAgICAgIC8vIGFkZCB0byBpbmRleFxuICAgICAgaWYoaW5kZXggIT09ICdGJyl0aGF0Ll9pW2luZGV4XSA9IGVudHJ5O1xuICAgIH0gcmV0dXJuIHRoYXQ7XG4gIH0sXG4gIGdldEVudHJ5OiBnZXRFbnRyeSxcbiAgc2V0U3Ryb25nOiBmdW5jdGlvbihDLCBOQU1FLCBJU19NQVApe1xuICAgIC8vIGFkZCAua2V5cywgLnZhbHVlcywgLmVudHJpZXMsIFtAQGl0ZXJhdG9yXVxuICAgIC8vIDIzLjEuMy40LCAyMy4xLjMuOCwgMjMuMS4zLjExLCAyMy4xLjMuMTIsIDIzLjIuMy41LCAyMy4yLjMuOCwgMjMuMi4zLjEwLCAyMy4yLjMuMTFcbiAgICAkaXRlckRlZmluZShDLCBOQU1FLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gICAgICB0aGlzLl90ID0gaXRlcmF0ZWQ7ICAvLyB0YXJnZXRcbiAgICAgIHRoaXMuX2sgPSBraW5kOyAgICAgIC8vIGtpbmRcbiAgICAgIHRoaXMuX2wgPSB1bmRlZmluZWQ7IC8vIHByZXZpb3VzXG4gICAgfSwgZnVuY3Rpb24oKXtcbiAgICAgIHZhciB0aGF0ICA9IHRoaXNcbiAgICAgICAgLCBraW5kICA9IHRoYXQuX2tcbiAgICAgICAgLCBlbnRyeSA9IHRoYXQuX2w7XG4gICAgICAvLyByZXZlcnQgdG8gdGhlIGxhc3QgZXhpc3RpbmcgZW50cnlcbiAgICAgIHdoaWxlKGVudHJ5ICYmIGVudHJ5LnIpZW50cnkgPSBlbnRyeS5wO1xuICAgICAgLy8gZ2V0IG5leHQgZW50cnlcbiAgICAgIGlmKCF0aGF0Ll90IHx8ICEodGhhdC5fbCA9IGVudHJ5ID0gZW50cnkgPyBlbnRyeS5uIDogdGhhdC5fdC5fZikpe1xuICAgICAgICAvLyBvciBmaW5pc2ggdGhlIGl0ZXJhdGlvblxuICAgICAgICB0aGF0Ll90ID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gc3RlcCgxKTtcbiAgICAgIH1cbiAgICAgIC8vIHJldHVybiBzdGVwIGJ5IGtpbmRcbiAgICAgIGlmKGtpbmQgPT0gJ2tleXMnICApcmV0dXJuIHN0ZXAoMCwgZW50cnkuayk7XG4gICAgICBpZihraW5kID09ICd2YWx1ZXMnKXJldHVybiBzdGVwKDAsIGVudHJ5LnYpO1xuICAgICAgcmV0dXJuIHN0ZXAoMCwgW2VudHJ5LmssIGVudHJ5LnZdKTtcbiAgICB9LCBJU19NQVAgPyAnZW50cmllcycgOiAndmFsdWVzJyAsICFJU19NQVAsIHRydWUpO1xuXG4gICAgLy8gYWRkIFtAQHNwZWNpZXNdLCAyMy4xLjIuMiwgMjMuMi4yLjJcbiAgICBzZXRTcGVjaWVzKE5BTUUpO1xuICB9XG59OyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXZpZEJydWFudC9NYXAtU2V0LnByb3RvdHlwZS50b0pTT05cbnZhciBmb3JPZiAgID0gcmVxdWlyZSgnLi8kLmZvci1vZicpXG4gICwgY2xhc3NvZiA9IHJlcXVpcmUoJy4vJC5jbGFzc29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE5BTUUpe1xuICByZXR1cm4gZnVuY3Rpb24gdG9KU09OKCl7XG4gICAgaWYoY2xhc3NvZih0aGlzKSAhPSBOQU1FKXRocm93IFR5cGVFcnJvcihOQU1FICsgXCIjdG9KU09OIGlzbid0IGdlbmVyaWNcIik7XG4gICAgdmFyIGFyciA9IFtdO1xuICAgIGZvck9mKHRoaXMsIGZhbHNlLCBhcnIucHVzaCwgYXJyKTtcbiAgICByZXR1cm4gYXJyO1xuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGdsb2JhbCAgICAgICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCBmYWlscyAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5mYWlscycpXG4gICwgaGlkZSAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaGlkZScpXG4gICwgcmVkZWZpbmVBbGwgICAgPSByZXF1aXJlKCcuLyQucmVkZWZpbmUtYWxsJylcbiAgLCBmb3JPZiAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5mb3Itb2YnKVxuICAsIHN0cmljdE5ldyAgICAgID0gcmVxdWlyZSgnLi8kLnN0cmljdC1uZXcnKVxuICAsIGlzT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLyQuc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIERFU0NSSVBUT1JTICAgID0gcmVxdWlyZSgnLi8kLmRlc2NyaXB0b3JzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTkFNRSwgd3JhcHBlciwgbWV0aG9kcywgY29tbW9uLCBJU19NQVAsIElTX1dFQUspe1xuICB2YXIgQmFzZSAgPSBnbG9iYWxbTkFNRV1cbiAgICAsIEMgICAgID0gQmFzZVxuICAgICwgQURERVIgPSBJU19NQVAgPyAnc2V0JyA6ICdhZGQnXG4gICAgLCBwcm90byA9IEMgJiYgQy5wcm90b3R5cGVcbiAgICAsIE8gICAgID0ge307XG4gIGlmKCFERVNDUklQVE9SUyB8fCB0eXBlb2YgQyAhPSAnZnVuY3Rpb24nIHx8ICEoSVNfV0VBSyB8fCBwcm90by5mb3JFYWNoICYmICFmYWlscyhmdW5jdGlvbigpe1xuICAgIG5ldyBDKCkuZW50cmllcygpLm5leHQoKTtcbiAgfSkpKXtcbiAgICAvLyBjcmVhdGUgY29sbGVjdGlvbiBjb25zdHJ1Y3RvclxuICAgIEMgPSBjb21tb24uZ2V0Q29uc3RydWN0b3Iod3JhcHBlciwgTkFNRSwgSVNfTUFQLCBBRERFUik7XG4gICAgcmVkZWZpbmVBbGwoQy5wcm90b3R5cGUsIG1ldGhvZHMpO1xuICB9IGVsc2Uge1xuICAgIEMgPSB3cmFwcGVyKGZ1bmN0aW9uKHRhcmdldCwgaXRlcmFibGUpe1xuICAgICAgc3RyaWN0TmV3KHRhcmdldCwgQywgTkFNRSk7XG4gICAgICB0YXJnZXQuX2MgPSBuZXcgQmFzZTtcbiAgICAgIGlmKGl0ZXJhYmxlICE9IHVuZGVmaW5lZClmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0YXJnZXRbQURERVJdLCB0YXJnZXQpO1xuICAgIH0pO1xuICAgICQuZWFjaC5jYWxsKCdhZGQsY2xlYXIsZGVsZXRlLGZvckVhY2gsZ2V0LGhhcyxzZXQsa2V5cyx2YWx1ZXMsZW50cmllcycuc3BsaXQoJywnKSxmdW5jdGlvbihLRVkpe1xuICAgICAgdmFyIElTX0FEREVSID0gS0VZID09ICdhZGQnIHx8IEtFWSA9PSAnc2V0JztcbiAgICAgIGlmKEtFWSBpbiBwcm90byAmJiAhKElTX1dFQUsgJiYgS0VZID09ICdjbGVhcicpKWhpZGUoQy5wcm90b3R5cGUsIEtFWSwgZnVuY3Rpb24oYSwgYil7XG4gICAgICAgIGlmKCFJU19BRERFUiAmJiBJU19XRUFLICYmICFpc09iamVjdChhKSlyZXR1cm4gS0VZID09ICdnZXQnID8gdW5kZWZpbmVkIDogZmFsc2U7XG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9jW0tFWV0oYSA9PT0gMCA/IDAgOiBhLCBiKTtcbiAgICAgICAgcmV0dXJuIElTX0FEREVSID8gdGhpcyA6IHJlc3VsdDtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmKCdzaXplJyBpbiBwcm90bykkLnNldERlc2MoQy5wcm90b3R5cGUsICdzaXplJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5fYy5zaXplO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2V0VG9TdHJpbmdUYWcoQywgTkFNRSk7XG5cbiAgT1tOQU1FXSA9IEM7XG4gICRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GLCBPKTtcblxuICBpZighSVNfV0VBSyljb21tb24uc2V0U3Ryb25nKEMsIE5BTUUsIElTX01BUCk7XG5cbiAgcmV0dXJuIEM7XG59OyIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7dmVyc2lvbjogJzEuMi42J307XG5pZih0eXBlb2YgX19lID09ICdudW1iZXInKV9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLyQuYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYodGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTsiLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07IiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi8kLmZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pOyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKVxuICAsIGRvY3VtZW50ID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpLmRvY3VtZW50XG4gIC8vIGluIG9sZCBJRSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0J1xuICAsIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59OyIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgPSByZXF1aXJlKCcuLyQuY29yZScpXG4gICwgY3R4ICAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24odHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkZcbiAgICAsIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0LkdcbiAgICAsIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlNcbiAgICAsIElTX1BST1RPICA9IHR5cGUgJiAkZXhwb3J0LlBcbiAgICAsIElTX0JJTkQgICA9IHR5cGUgJiAkZXhwb3J0LkJcbiAgICAsIElTX1dSQVAgICA9IHR5cGUgJiAkZXhwb3J0LldcbiAgICAsIGV4cG9ydHMgICA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pXG4gICAgLCB0YXJnZXQgICAgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBrZXksIG93biwgb3V0O1xuICBpZihJU19HTE9CQUwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIGtleSBpbiB0YXJnZXQ7XG4gICAgaWYob3duICYmIGtleSBpbiBleHBvcnRzKWNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24oQyl7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uKHBhcmFtKXtcbiAgICAgICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBDID8gbmV3IEMocGFyYW0pIDogQyhwYXJhbSk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIGlmKElTX1BST1RPKShleHBvcnRzW1BST1RPVFlQRV0gfHwgKGV4cG9ydHNbUFJPVE9UWVBFXSA9IHt9KSlba2V5XSA9IG91dDtcbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgLy8gd3JhcFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59OyIsInZhciBjdHggICAgICAgICA9IHJlcXVpcmUoJy4vJC5jdHgnKVxuICAsIGNhbGwgICAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXItY2FsbCcpXG4gICwgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuLyQuaXMtYXJyYXktaXRlcicpXG4gICwgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuLyQuYW4tb2JqZWN0JylcbiAgLCB0b0xlbmd0aCAgICA9IHJlcXVpcmUoJy4vJC50by1sZW5ndGgnKVxuICAsIGdldEl0ZXJGbiAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlcmFibGUsIGVudHJpZXMsIGZuLCB0aGF0KXtcbiAgdmFyIGl0ZXJGbiA9IGdldEl0ZXJGbihpdGVyYWJsZSlcbiAgICAsIGYgICAgICA9IGN0eChmbiwgdGhhdCwgZW50cmllcyA/IDIgOiAxKVxuICAgICwgaW5kZXggID0gMFxuICAgICwgbGVuZ3RoLCBzdGVwLCBpdGVyYXRvcjtcbiAgaWYodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdGVyYWJsZSArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICAvLyBmYXN0IGNhc2UgZm9yIGFycmF5cyB3aXRoIGRlZmF1bHQgaXRlcmF0b3JcbiAgaWYoaXNBcnJheUl0ZXIoaXRlckZuKSlmb3IobGVuZ3RoID0gdG9MZW5ndGgoaXRlcmFibGUubGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4Kyspe1xuICAgIGVudHJpZXMgPyBmKGFuT2JqZWN0KHN0ZXAgPSBpdGVyYWJsZVtpbmRleF0pWzBdLCBzdGVwWzFdKSA6IGYoaXRlcmFibGVbaW5kZXhdKTtcbiAgfSBlbHNlIGZvcihpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKGl0ZXJhYmxlKTsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyApe1xuICAgIGNhbGwoaXRlcmF0b3IsIGYsIHN0ZXAudmFsdWUsIGVudHJpZXMpO1xuICB9XG59OyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTsiLCJ2YXIgJCAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vJC5wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgcmV0dXJuICQuc2V0RGVzYyhvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpLmRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDsiLCIvLyBmYXN0IGFwcGx5LCBodHRwOi8vanNwZXJmLmxua2l0LmNvbS9mYXN0LWFwcGx5LzVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIGFyZ3MsIHRoYXQpe1xuICB2YXIgdW4gPSB0aGF0ID09PSB1bmRlZmluZWQ7XG4gIHN3aXRjaChhcmdzLmxlbmd0aCl7XG4gICAgY2FzZSAwOiByZXR1cm4gdW4gPyBmbigpXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQpO1xuICAgIGNhc2UgMTogcmV0dXJuIHVuID8gZm4oYXJnc1swXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgIGNhc2UgNDogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XG4gIH0gcmV0dXJuICAgICAgICAgICAgICBmbi5hcHBseSh0aGF0LCBhcmdzKTtcbn07IiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuLyQuY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59OyIsIi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgID0gcmVxdWlyZSgnLi8kLml0ZXJhdG9ycycpXG4gICwgSVRFUkFUT1IgICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgIT09IHVuZGVmaW5lZCAmJiAoSXRlcmF0b3JzLkFycmF5ID09PSBpdCB8fCBBcnJheVByb3RvW0lURVJBVE9SXSA9PT0gaXQpO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07IiwiLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYXRvciwgZm4sIHZhbHVlLCBlbnRyaWVzKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW50cmllcyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICB9IGNhdGNoKGUpe1xuICAgIHZhciByZXQgPSBpdGVyYXRvclsncmV0dXJuJ107XG4gICAgaWYocmV0ICE9PSB1bmRlZmluZWQpYW5PYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciAkICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgZGVzY3JpcHRvciAgICAgPSByZXF1aXJlKCcuLyQucHJvcGVydHktZGVzYycpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLyQuc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuLyQuaGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCl7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9ICQuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7bmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KX0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgICAgICAgID0gcmVxdWlyZSgnLi8kLmxpYnJhcnknKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpXG4gICwgcmVkZWZpbmUgICAgICAgPSByZXF1aXJlKCcuLyQucmVkZWZpbmUnKVxuICAsIGhpZGUgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmhpZGUnKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmhhcycpXG4gICwgSXRlcmF0b3JzICAgICAgPSByZXF1aXJlKCcuLyQuaXRlcmF0b3JzJylcbiAgLCAkaXRlckNyZWF0ZSAgICA9IHJlcXVpcmUoJy4vJC5pdGVyLWNyZWF0ZScpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLyQuc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIGdldFByb3RvICAgICAgID0gcmVxdWlyZSgnLi8kJykuZ2V0UHJvdG9cbiAgLCBJVEVSQVRPUiAgICAgICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIEJVR0dZICAgICAgICAgID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpIC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbiAgLCBGRl9JVEVSQVRPUiAgICA9ICdAQGl0ZXJhdG9yJ1xuICAsIEtFWVMgICAgICAgICAgID0gJ2tleXMnXG4gICwgVkFMVUVTICAgICAgICAgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpe1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbihraW5kKXtcbiAgICBpZighQlVHR1kgJiYga2luZCBpbiBwcm90bylyZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoKGtpbmQpe1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgICAgICAgID0gTkFNRSArICcgSXRlcmF0b3InXG4gICAgLCBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVNcbiAgICAsIFZBTFVFU19CVUcgPSBmYWxzZVxuICAgICwgcHJvdG8gICAgICA9IEJhc2UucHJvdG90eXBlXG4gICAgLCAkbmF0aXZlICAgID0gcHJvdG9bSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdXG4gICAgLCAkZGVmYXVsdCAgID0gJG5hdGl2ZSB8fCBnZXRNZXRob2QoREVGQVVMVClcbiAgICAsIG1ldGhvZHMsIGtleTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZigkbmF0aXZlKXtcbiAgICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90bygkZGVmYXVsdC5jYWxsKG5ldyBCYXNlKSk7XG4gICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgIC8vIEZGIGZpeFxuICAgIGlmKCFMSUJSQVJZICYmIGhhcyhwcm90bywgRkZfSVRFUkFUT1IpKWhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gICAgaWYoREVGX1ZBTFVFUyAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUyl7XG4gICAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiAkbmF0aXZlLmNhbGwodGhpcyk7IH07XG4gICAgfVxuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZigoIUxJQlJBUlkgfHwgRk9SQ0VEKSAmJiAoQlVHR1kgfHwgVkFMVUVTX0JVRyB8fCAhcHJvdG9bSVRFUkFUT1JdKSl7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSAgPSByZXR1cm5UaGlzO1xuICBpZihERUZBVUxUKXtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiAgREVGX1ZBTFVFUyAgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogICAgSVNfU0VUICAgICAgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICFERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoJ2VudHJpZXMnKVxuICAgIH07XG4gICAgaWYoRk9SQ0VEKWZvcihrZXkgaW4gbWV0aG9kcyl7XG4gICAgICBpZighKGtleSBpbiBwcm90bykpcmVkZWZpbmUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoQlVHR1kgfHwgVkFMVUVTX0JVRyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTsiLCJ2YXIgSVRFUkFUT1IgICAgID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXG4gICwgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciByaXRlciA9IFs3XVtJVEVSQVRPUl0oKTtcbiAgcml0ZXJbJ3JldHVybiddID0gZnVuY3Rpb24oKXsgU0FGRV9DTE9TSU5HID0gdHJ1ZTsgfTtcbiAgQXJyYXkuZnJvbShyaXRlciwgZnVuY3Rpb24oKXsgdGhyb3cgMjsgfSk7XG59IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYywgc2tpcENsb3Npbmcpe1xuICBpZighc2tpcENsb3NpbmcgJiYgIVNBRkVfQ0xPU0lORylyZXR1cm4gZmFsc2U7XG4gIHZhciBzYWZlID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgdmFyIGFyciAgPSBbN11cbiAgICAgICwgaXRlciA9IGFycltJVEVSQVRPUl0oKTtcbiAgICBpdGVyLm5leHQgPSBmdW5jdGlvbigpeyByZXR1cm4ge2RvbmU6IHNhZmUgPSB0cnVlfTsgfTtcbiAgICBhcnJbSVRFUkFUT1JdID0gZnVuY3Rpb24oKXsgcmV0dXJuIGl0ZXI7IH07XG4gICAgZXhlYyhhcnIpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBzYWZlO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvbmUsIHZhbHVlKXtcbiAgcmV0dXJuIHt2YWx1ZTogdmFsdWUsIGRvbmU6ICEhZG9uZX07XG59OyIsIm1vZHVsZS5leHBvcnRzID0ge307IiwidmFyICRPYmplY3QgPSBPYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlOiAgICAgJE9iamVjdC5jcmVhdGUsXG4gIGdldFByb3RvOiAgICRPYmplY3QuZ2V0UHJvdG90eXBlT2YsXG4gIGlzRW51bTogICAgIHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlLFxuICBnZXREZXNjOiAgICAkT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgc2V0RGVzYzogICAgJE9iamVjdC5kZWZpbmVQcm9wZXJ0eSxcbiAgc2V0RGVzY3M6ICAgJE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzLFxuICBnZXRLZXlzOiAgICAkT2JqZWN0LmtleXMsXG4gIGdldE5hbWVzOiAgICRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgZ2V0U3ltYm9sczogJE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMsXG4gIGVhY2g6ICAgICAgIFtdLmZvckVhY2hcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlOyIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcbiAgLCBtYWNyb3Rhc2sgPSByZXF1aXJlKCcuLyQudGFzaycpLnNldFxuICAsIE9ic2VydmVyICA9IGdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyXG4gICwgcHJvY2VzcyAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCBQcm9taXNlICAgPSBnbG9iYWwuUHJvbWlzZVxuICAsIGlzTm9kZSAgICA9IHJlcXVpcmUoJy4vJC5jb2YnKShwcm9jZXNzKSA9PSAncHJvY2VzcydcbiAgLCBoZWFkLCBsYXN0LCBub3RpZnk7XG5cbnZhciBmbHVzaCA9IGZ1bmN0aW9uKCl7XG4gIHZhciBwYXJlbnQsIGRvbWFpbiwgZm47XG4gIGlmKGlzTm9kZSAmJiAocGFyZW50ID0gcHJvY2Vzcy5kb21haW4pKXtcbiAgICBwcm9jZXNzLmRvbWFpbiA9IG51bGw7XG4gICAgcGFyZW50LmV4aXQoKTtcbiAgfVxuICB3aGlsZShoZWFkKXtcbiAgICBkb21haW4gPSBoZWFkLmRvbWFpbjtcbiAgICBmbiAgICAgPSBoZWFkLmZuO1xuICAgIGlmKGRvbWFpbilkb21haW4uZW50ZXIoKTtcbiAgICBmbigpOyAvLyA8LSBjdXJyZW50bHkgd2UgdXNlIGl0IG9ubHkgZm9yIFByb21pc2UgLSB0cnkgLyBjYXRjaCBub3QgcmVxdWlyZWRcbiAgICBpZihkb21haW4pZG9tYWluLmV4aXQoKTtcbiAgICBoZWFkID0gaGVhZC5uZXh0O1xuICB9IGxhc3QgPSB1bmRlZmluZWQ7XG4gIGlmKHBhcmVudClwYXJlbnQuZW50ZXIoKTtcbn07XG5cbi8vIE5vZGUuanNcbmlmKGlzTm9kZSl7XG4gIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XG4gICAgcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gIH07XG4vLyBicm93c2VycyB3aXRoIE11dGF0aW9uT2JzZXJ2ZXJcbn0gZWxzZSBpZihPYnNlcnZlcil7XG4gIHZhciB0b2dnbGUgPSAxXG4gICAgLCBub2RlICAgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gIG5ldyBPYnNlcnZlcihmbHVzaCkub2JzZXJ2ZShub2RlLCB7Y2hhcmFjdGVyRGF0YTogdHJ1ZX0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICBub3RpZnkgPSBmdW5jdGlvbigpe1xuICAgIG5vZGUuZGF0YSA9IHRvZ2dsZSA9IC10b2dnbGU7XG4gIH07XG4vLyBlbnZpcm9ubWVudHMgd2l0aCBtYXliZSBub24tY29tcGxldGVseSBjb3JyZWN0LCBidXQgZXhpc3RlbnQgUHJvbWlzZVxufSBlbHNlIGlmKFByb21pc2UgJiYgUHJvbWlzZS5yZXNvbHZlKXtcbiAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcbiAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZsdXNoKTtcbiAgfTtcbi8vIGZvciBvdGhlciBlbnZpcm9ubWVudHMgLSBtYWNyb3Rhc2sgYmFzZWQgb246XG4vLyAtIHNldEltbWVkaWF0ZVxuLy8gLSBNZXNzYWdlQ2hhbm5lbFxuLy8gLSB3aW5kb3cucG9zdE1lc3NhZ1xuLy8gLSBvbnJlYWR5c3RhdGVjaGFuZ2Vcbi8vIC0gc2V0VGltZW91dFxufSBlbHNlIHtcbiAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcbiAgICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuY2FsbChnbG9iYWwpXG4gICAgbWFjcm90YXNrLmNhbGwoZ2xvYmFsLCBmbHVzaCk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXNhcChmbil7XG4gIHZhciB0YXNrID0ge2ZuOiBmbiwgbmV4dDogdW5kZWZpbmVkLCBkb21haW46IGlzTm9kZSAmJiBwcm9jZXNzLmRvbWFpbn07XG4gIGlmKGxhc3QpbGFzdC5uZXh0ID0gdGFzaztcbiAgaWYoIWhlYWQpe1xuICAgIGhlYWQgPSB0YXNrO1xuICAgIG5vdGlmeSgpO1xuICB9IGxhc3QgPSB0YXNrO1xufTsiLCIvLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXG52YXIgJCAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi8kLnRvLW9iamVjdCcpXG4gICwgSU9iamVjdCAgPSByZXF1aXJlKCcuLyQuaW9iamVjdCcpO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmZhaWxzJykoZnVuY3Rpb24oKXtcbiAgdmFyIGEgPSBPYmplY3QuYXNzaWduXG4gICAgLCBBID0ge31cbiAgICAsIEIgPSB7fVxuICAgICwgUyA9IFN5bWJvbCgpXG4gICAgLCBLID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtTXSA9IDc7XG4gIEsuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24oayl7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuIGEoe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoYSh7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSl7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgICAgID0gdG9PYmplY3QodGFyZ2V0KVxuICAgICwgJCQgICAgPSBhcmd1bWVudHNcbiAgICAsICQkbGVuID0gJCQubGVuZ3RoXG4gICAgLCBpbmRleCA9IDFcbiAgICAsIGdldEtleXMgICAgPSAkLmdldEtleXNcbiAgICAsIGdldFN5bWJvbHMgPSAkLmdldFN5bWJvbHNcbiAgICAsIGlzRW51bSAgICAgPSAkLmlzRW51bTtcbiAgd2hpbGUoJCRsZW4gPiBpbmRleCl7XG4gICAgdmFyIFMgICAgICA9IElPYmplY3QoJCRbaW5kZXgrK10pXG4gICAgICAsIGtleXMgICA9IGdldFN5bWJvbHMgPyBnZXRLZXlzKFMpLmNvbmNhdChnZXRTeW1ib2xzKFMpKSA6IGdldEtleXMoUylcbiAgICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAgICwgaiAgICAgID0gMFxuICAgICAgLCBrZXk7XG4gICAgd2hpbGUobGVuZ3RoID4gailpZihpc0VudW0uY2FsbChTLCBrZXkgPSBrZXlzW2orK10pKVRba2V5XSA9IFNba2V5XTtcbiAgfVxuICByZXR1cm4gVDtcbn0gOiBPYmplY3QuYXNzaWduOyIsIi8vIG1vc3QgT2JqZWN0IG1ldGhvZHMgYnkgRVM2IHNob3VsZCBhY2NlcHQgcHJpbWl0aXZlc1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCBjb3JlICAgID0gcmVxdWlyZSgnLi8kLmNvcmUnKVxuICAsIGZhaWxzICAgPSByZXF1aXJlKCcuLyQuZmFpbHMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oS0VZLCBleGVjKXtcbiAgdmFyIGZuICA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXVxuICAgICwgZXhwID0ge307XG4gIGV4cFtLRVldID0gZXhlYyhmbik7XG4gICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogZmFpbHMoZnVuY3Rpb24oKXsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59OyIsInZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vJC5yZWRlZmluZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0YXJnZXQsIHNyYyl7XG4gIGZvcih2YXIga2V5IGluIHNyYylyZWRlZmluZSh0YXJnZXQsIGtleSwgc3JjW2tleV0pO1xuICByZXR1cm4gdGFyZ2V0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5oaWRlJyk7IiwiLy8gNy4yLjkgU2FtZVZhbHVlKHgsIHkpXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5pcyB8fCBmdW5jdGlvbiBpcyh4LCB5KXtcbiAgcmV0dXJuIHggPT09IHkgPyB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geSA6IHggIT0geCAmJiB5ICE9IHk7XG59OyIsIi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbnZhciBnZXREZXNjICA9IHJlcXVpcmUoJy4vJCcpLmdldERlc2NcbiAgLCBpc09iamVjdCA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24oTywgcHJvdG8pe1xuICBhbk9iamVjdChPKTtcbiAgaWYoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCl0aHJvdyBUeXBlRXJyb3IocHJvdG8gKyBcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIik7XG59O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSA/IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBmdW5jdGlvbih0ZXN0LCBidWdneSwgc2V0KXtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldCA9IHJlcXVpcmUoJy4vJC5jdHgnKShGdW5jdGlvbi5jYWxsLCBnZXREZXNjKE9iamVjdC5wcm90b3R5cGUsICdfX3Byb3RvX18nKS5zZXQsIDIpO1xuICAgICAgICBzZXQodGVzdCwgW10pO1xuICAgICAgICBidWdneSA9ICEodGVzdCBpbnN0YW5jZW9mIEFycmF5KTtcbiAgICAgIH0gY2F0Y2goZSl7IGJ1Z2d5ID0gdHJ1ZTsgfVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKXtcbiAgICAgICAgY2hlY2soTywgcHJvdG8pO1xuICAgICAgICBpZihidWdneSlPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgICAgICBlbHNlIHNldChPLCBwcm90byk7XG4gICAgICAgIHJldHVybiBPO1xuICAgICAgfTtcbiAgICB9KHt9LCBmYWxzZSkgOiB1bmRlZmluZWQpLFxuICBjaGVjazogY2hlY2tcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNvcmUgICAgICAgID0gcmVxdWlyZSgnLi8kLmNvcmUnKVxuICAsICQgICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vJC5kZXNjcmlwdG9ycycpXG4gICwgU1BFQ0lFUyAgICAgPSByZXF1aXJlKCcuLyQud2tzJykoJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVkpe1xuICB2YXIgQyA9IGNvcmVbS0VZXTtcbiAgaWYoREVTQ1JJUFRPUlMgJiYgQyAmJiAhQ1tTUEVDSUVTXSkkLnNldERlc2MoQywgU1BFQ0lFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9XG4gIH0pO1xufTsiLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi8kJykuc2V0RGVzY1xuICAsIGhhcyA9IHJlcXVpcmUoJy4vJC5oYXMnKVxuICAsIFRBRyA9IHJlcXVpcmUoJy4vJC53a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgdGFnLCBzdGF0KXtcbiAgaWYoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSlkZWYoaXQsIFRBRywge2NvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZ30pO1xufTsiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXydcbiAgLCBzdG9yZSAgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTsiLCIvLyA3LjMuMjAgU3BlY2llc0NvbnN0cnVjdG9yKE8sIGRlZmF1bHRDb25zdHJ1Y3RvcilcbnZhciBhbk9iamVjdCAgPSByZXF1aXJlKCcuLyQuYW4tb2JqZWN0JylcbiAgLCBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLyQuYS1mdW5jdGlvbicpXG4gICwgU1BFQ0lFUyAgID0gcmVxdWlyZSgnLi8kLndrcycpKCdzcGVjaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE8sIEQpe1xuICB2YXIgQyA9IGFuT2JqZWN0KE8pLmNvbnN0cnVjdG9yLCBTO1xuICByZXR1cm4gQyA9PT0gdW5kZWZpbmVkIHx8IChTID0gYW5PYmplY3QoQylbU1BFQ0lFU10pID09IHVuZGVmaW5lZCA/IEQgOiBhRnVuY3Rpb24oUyk7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIENvbnN0cnVjdG9yLCBuYW1lKXtcbiAgaWYoIShpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSl0aHJvdyBUeXBlRXJyb3IobmFtZSArIFwiOiB1c2UgdGhlICduZXcnIG9wZXJhdG9yIVwiKTtcbiAgcmV0dXJuIGl0O1xufTsiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi8kLnRvLWludGVnZXInKVxuICAsIGRlZmluZWQgICA9IHJlcXVpcmUoJy4vJC5kZWZpbmVkJyk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihUT19TVFJJTkcpe1xuICByZXR1cm4gZnVuY3Rpb24odGhhdCwgcG9zKXtcbiAgICB2YXIgcyA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKVxuICAgICAgLCBpID0gdG9JbnRlZ2VyKHBvcylcbiAgICAgICwgbCA9IHMubGVuZ3RoXG4gICAgICAsIGEsIGI7XG4gICAgaWYoaSA8IDAgfHwgaSA+PSBsKXJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59OyIsInZhciBjdHggICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCBpbnZva2UgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaW52b2tlJylcbiAgLCBodG1sICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaHRtbCcpXG4gICwgY2VsICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmRvbS1jcmVhdGUnKVxuICAsIGdsb2JhbCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIHByb2Nlc3MgICAgICAgICAgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgc2V0VGFzayAgICAgICAgICAgID0gZ2xvYmFsLnNldEltbWVkaWF0ZVxuICAsIGNsZWFyVGFzayAgICAgICAgICA9IGdsb2JhbC5jbGVhckltbWVkaWF0ZVxuICAsIE1lc3NhZ2VDaGFubmVsICAgICA9IGdsb2JhbC5NZXNzYWdlQ2hhbm5lbFxuICAsIGNvdW50ZXIgICAgICAgICAgICA9IDBcbiAgLCBxdWV1ZSAgICAgICAgICAgICAgPSB7fVxuICAsIE9OUkVBRFlTVEFURUNIQU5HRSA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnXG4gICwgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG52YXIgcnVuID0gZnVuY3Rpb24oKXtcbiAgdmFyIGlkID0gK3RoaXM7XG4gIGlmKHF1ZXVlLmhhc093blByb3BlcnR5KGlkKSl7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufTtcbnZhciBsaXN0bmVyID0gZnVuY3Rpb24oZXZlbnQpe1xuICBydW4uY2FsbChldmVudC5kYXRhKTtcbn07XG4vLyBOb2RlLmpzIDAuOSsgJiBJRTEwKyBoYXMgc2V0SW1tZWRpYXRlLCBvdGhlcndpc2U6XG5pZighc2V0VGFzayB8fCAhY2xlYXJUYXNrKXtcbiAgc2V0VGFzayA9IGZ1bmN0aW9uIHNldEltbWVkaWF0ZShmbil7XG4gICAgdmFyIGFyZ3MgPSBbXSwgaSA9IDE7XG4gICAgd2hpbGUoYXJndW1lbnRzLmxlbmd0aCA+IGkpYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24oKXtcbiAgICAgIGludm9rZSh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyA/IGZuIDogRnVuY3Rpb24oZm4pLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhclRhc2sgPSBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShpZCl7XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgfTtcbiAgLy8gTm9kZS5qcyAwLjgtXG4gIGlmKHJlcXVpcmUoJy4vJC5jb2YnKShwcm9jZXNzKSA9PSAncHJvY2Vzcycpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIEJyb3dzZXJzIHdpdGggTWVzc2FnZUNoYW5uZWwsIGluY2x1ZGVzIFdlYldvcmtlcnNcbiAgfSBlbHNlIGlmKE1lc3NhZ2VDaGFubmVsKXtcbiAgICBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsO1xuICAgIHBvcnQgICAgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdG5lcjtcbiAgICBkZWZlciA9IGN0eChwb3J0LnBvc3RNZXNzYWdlLCBwb3J0LCAxKTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBwb3N0TWVzc2FnZSwgc2tpcCBXZWJXb3JrZXJzXG4gIC8vIElFOCBoYXMgcG9zdE1lc3NhZ2UsIGJ1dCBpdCdzIHN5bmMgJiB0eXBlb2YgaXRzIHBvc3RNZXNzYWdlIGlzICdvYmplY3QnXG4gIH0gZWxzZSBpZihnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lciAmJiB0eXBlb2YgcG9zdE1lc3NhZ2UgPT0gJ2Z1bmN0aW9uJyAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKGlkICsgJycsICcqJyk7XG4gICAgfTtcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGxpc3RuZXIsIGZhbHNlKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYoT05SRUFEWVNUQVRFQ0hBTkdFIGluIGNlbCgnc2NyaXB0Jykpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgaHRtbC5hcHBlbmRDaGlsZChjZWwoJ3NjcmlwdCcpKVtPTlJFQURZU1RBVEVDSEFOR0VdID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgcnVuLmNhbGwoaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgc2V0VGltZW91dChjdHgocnVuLCBpZCwgMSksIDApO1xuICAgIH07XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6ICAgc2V0VGFzayxcbiAgY2xlYXI6IGNsZWFyVGFza1xufTsiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07IiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vJC5pb2JqZWN0JylcbiAgLCBkZWZpbmVkID0gcmVxdWlyZSgnLi8kLmRlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59OyIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vJC50by1pbnRlZ2VyJylcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTsiLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vJC5kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59OyIsInZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59OyIsInZhciBzdG9yZSAgPSByZXF1aXJlKCcuLyQuc2hhcmVkJykoJ3drcycpXG4gICwgdWlkICAgID0gcmVxdWlyZSgnLi8kLnVpZCcpXG4gICwgU3ltYm9sID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpLlN5bWJvbDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFN5bWJvbCAmJiBTeW1ib2xbbmFtZV0gfHwgKFN5bWJvbCB8fCB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07IiwidmFyIGNsYXNzb2YgICA9IHJlcXVpcmUoJy4vJC5jbGFzc29mJylcbiAgLCBJVEVSQVRPUiAgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLyQuaXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5jb3JlJykuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ICE9IHVuZGVmaW5lZClyZXR1cm4gaXRbSVRFUkFUT1JdXG4gICAgfHwgaXRbJ0BAaXRlcmF0b3InXVxuICAgIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59OyIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKVxuICAsIGdldCAgICAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmNvcmUnKS5nZXRJdGVyYXRvciA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIGl0ZXJGbiA9IGdldChpdCk7XG4gIGlmKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgcmV0dXJuIGFuT2JqZWN0KGl0ZXJGbi5jYWxsKGl0KSk7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBjdHggICAgICAgICA9IHJlcXVpcmUoJy4vJC5jdHgnKVxuICAsICRleHBvcnQgICAgID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpXG4gICwgdG9PYmplY3QgICAgPSByZXF1aXJlKCcuLyQudG8tb2JqZWN0JylcbiAgLCBjYWxsICAgICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyLWNhbGwnKVxuICAsIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi8kLmlzLWFycmF5LWl0ZXInKVxuICAsIHRvTGVuZ3RoICAgID0gcmVxdWlyZSgnLi8kLnRvLWxlbmd0aCcpXG4gICwgZ2V0SXRlckZuICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi8kLml0ZXItZGV0ZWN0JykoZnVuY3Rpb24oaXRlcil7IEFycmF5LmZyb20oaXRlcik7IH0pLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMi4xIEFycmF5LmZyb20oYXJyYXlMaWtlLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgZnJvbTogZnVuY3Rpb24gZnJvbShhcnJheUxpa2UvKiwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQqLyl7XG4gICAgdmFyIE8gICAgICAgPSB0b09iamVjdChhcnJheUxpa2UpXG4gICAgICAsIEMgICAgICAgPSB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5XG4gICAgICAsICQkICAgICAgPSBhcmd1bWVudHNcbiAgICAgICwgJCRsZW4gICA9ICQkLmxlbmd0aFxuICAgICAgLCBtYXBmbiAgID0gJCRsZW4gPiAxID8gJCRbMV0gOiB1bmRlZmluZWRcbiAgICAgICwgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWRcbiAgICAgICwgaW5kZXggICA9IDBcbiAgICAgICwgaXRlckZuICA9IGdldEl0ZXJGbihPKVxuICAgICAgLCBsZW5ndGgsIHJlc3VsdCwgc3RlcCwgaXRlcmF0b3I7XG4gICAgaWYobWFwcGluZyltYXBmbiA9IGN0eChtYXBmbiwgJCRsZW4gPiAyID8gJCRbMl0gOiB1bmRlZmluZWQsIDIpO1xuICAgIC8vIGlmIG9iamVjdCBpc24ndCBpdGVyYWJsZSBvciBpdCdzIGFycmF5IHdpdGggZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBzaW1wbGUgY2FzZVxuICAgIGlmKGl0ZXJGbiAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyKGl0ZXJGbikpKXtcbiAgICAgIGZvcihpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKE8pLCByZXN1bHQgPSBuZXcgQzsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyBpbmRleCsrKXtcbiAgICAgICAgcmVzdWx0W2luZGV4XSA9IG1hcHBpbmcgPyBjYWxsKGl0ZXJhdG9yLCBtYXBmbiwgW3N0ZXAudmFsdWUsIGluZGV4XSwgdHJ1ZSkgOiBzdGVwLnZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgICBmb3IocmVzdWx0ID0gbmV3IEMobGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4Kyspe1xuICAgICAgICByZXN1bHRbaW5kZXhdID0gbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0Lmxlbmd0aCA9IGluZGV4O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuLyQuYWRkLXRvLXVuc2NvcGFibGVzJylcbiAgLCBzdGVwICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXItc3RlcCcpXG4gICwgSXRlcmF0b3JzICAgICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKVxuICAsIHRvSU9iamVjdCAgICAgICAgPSByZXF1aXJlKCcuLyQudG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwga2luZCAgPSB0aGlzLl9rXG4gICAgLCBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpe1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYoa2luZCA9PSAna2V5cycgIClyZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmKGtpbmQgPT0gJ3ZhbHVlcycpcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpOyIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7YXNzaWduOiByZXF1aXJlKCcuLyQub2JqZWN0LWFzc2lnbicpfSk7IiwiLy8gMTkuMS4yLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLyQudG8tb2JqZWN0Jyk7XG5cbnJlcXVpcmUoJy4vJC5vYmplY3Qtc2FwJykoJ2tleXMnLCBmdW5jdGlvbigka2V5cyl7XG4gIHJldHVybiBmdW5jdGlvbiBrZXlzKGl0KXtcbiAgICByZXR1cm4gJGtleXModG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pOyIsbnVsbCwiJ3VzZSBzdHJpY3QnO1xudmFyICQgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIExJQlJBUlkgICAgPSByZXF1aXJlKCcuLyQubGlicmFyeScpXG4gICwgZ2xvYmFsICAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIGN0eCAgICAgICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCBjbGFzc29mICAgID0gcmVxdWlyZSgnLi8kLmNsYXNzb2YnKVxuICAsICRleHBvcnQgICAgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCBpc09iamVjdCAgID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpXG4gICwgYW5PYmplY3QgICA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKVxuICAsIGFGdW5jdGlvbiAgPSByZXF1aXJlKCcuLyQuYS1mdW5jdGlvbicpXG4gICwgc3RyaWN0TmV3ICA9IHJlcXVpcmUoJy4vJC5zdHJpY3QtbmV3JylcbiAgLCBmb3JPZiAgICAgID0gcmVxdWlyZSgnLi8kLmZvci1vZicpXG4gICwgc2V0UHJvdG8gICA9IHJlcXVpcmUoJy4vJC5zZXQtcHJvdG8nKS5zZXRcbiAgLCBzYW1lICAgICAgID0gcmVxdWlyZSgnLi8kLnNhbWUtdmFsdWUnKVxuICAsIFNQRUNJRVMgICAgPSByZXF1aXJlKCcuLyQud2tzJykoJ3NwZWNpZXMnKVxuICAsIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vJC5zcGVjaWVzLWNvbnN0cnVjdG9yJylcbiAgLCBhc2FwICAgICAgID0gcmVxdWlyZSgnLi8kLm1pY3JvdGFzaycpXG4gICwgUFJPTUlTRSAgICA9ICdQcm9taXNlJ1xuICAsIHByb2Nlc3MgICAgPSBnbG9iYWwucHJvY2Vzc1xuICAsIGlzTm9kZSAgICAgPSBjbGFzc29mKHByb2Nlc3MpID09ICdwcm9jZXNzJ1xuICAsIFAgICAgICAgICAgPSBnbG9iYWxbUFJPTUlTRV1cbiAgLCBlbXB0eSAgICAgID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfVxuICAsIFdyYXBwZXI7XG5cbnZhciB0ZXN0UmVzb2x2ZSA9IGZ1bmN0aW9uKHN1Yil7XG4gIHZhciB0ZXN0ID0gbmV3IFAoZW1wdHkpLCBwcm9taXNlO1xuICBpZihzdWIpdGVzdC5jb25zdHJ1Y3RvciA9IGZ1bmN0aW9uKGV4ZWMpe1xuICAgIGV4ZWMoZW1wdHksIGVtcHR5KTtcbiAgfTtcbiAgKHByb21pc2UgPSBQLnJlc29sdmUodGVzdCkpWydjYXRjaCddKGVtcHR5KTtcbiAgcmV0dXJuIHByb21pc2UgPT09IHRlc3Q7XG59O1xuXG52YXIgVVNFX05BVElWRSA9IGZ1bmN0aW9uKCl7XG4gIHZhciB3b3JrcyA9IGZhbHNlO1xuICBmdW5jdGlvbiBQMih4KXtcbiAgICB2YXIgc2VsZiA9IG5ldyBQKHgpO1xuICAgIHNldFByb3RvKHNlbGYsIFAyLnByb3RvdHlwZSk7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH1cbiAgdHJ5IHtcbiAgICB3b3JrcyA9IFAgJiYgUC5yZXNvbHZlICYmIHRlc3RSZXNvbHZlKCk7XG4gICAgc2V0UHJvdG8oUDIsIFApO1xuICAgIFAyLnByb3RvdHlwZSA9ICQuY3JlYXRlKFAucHJvdG90eXBlLCB7Y29uc3RydWN0b3I6IHt2YWx1ZTogUDJ9fSk7XG4gICAgLy8gYWN0dWFsIEZpcmVmb3ggaGFzIGJyb2tlbiBzdWJjbGFzcyBzdXBwb3J0LCB0ZXN0IHRoYXRcbiAgICBpZighKFAyLnJlc29sdmUoNSkudGhlbihmdW5jdGlvbigpe30pIGluc3RhbmNlb2YgUDIpKXtcbiAgICAgIHdvcmtzID0gZmFsc2U7XG4gICAgfVxuICAgIC8vIGFjdHVhbCBWOCBidWcsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTYyXG4gICAgaWYod29ya3MgJiYgcmVxdWlyZSgnLi8kLmRlc2NyaXB0b3JzJykpe1xuICAgICAgdmFyIHRoZW5hYmxlVGhlbkdvdHRlbiA9IGZhbHNlO1xuICAgICAgUC5yZXNvbHZlKCQuc2V0RGVzYyh7fSwgJ3RoZW4nLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKXsgdGhlbmFibGVUaGVuR290dGVuID0gdHJ1ZTsgfVxuICAgICAgfSkpO1xuICAgICAgd29ya3MgPSB0aGVuYWJsZVRoZW5Hb3R0ZW47XG4gICAgfVxuICB9IGNhdGNoKGUpeyB3b3JrcyA9IGZhbHNlOyB9XG4gIHJldHVybiB3b3Jrcztcbn0oKTtcblxuLy8gaGVscGVyc1xudmFyIHNhbWVDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uKGEsIGIpe1xuICAvLyBsaWJyYXJ5IHdyYXBwZXIgc3BlY2lhbCBjYXNlXG4gIGlmKExJQlJBUlkgJiYgYSA9PT0gUCAmJiBiID09PSBXcmFwcGVyKXJldHVybiB0cnVlO1xuICByZXR1cm4gc2FtZShhLCBiKTtcbn07XG52YXIgZ2V0Q29uc3RydWN0b3IgPSBmdW5jdGlvbihDKXtcbiAgdmFyIFMgPSBhbk9iamVjdChDKVtTUEVDSUVTXTtcbiAgcmV0dXJuIFMgIT0gdW5kZWZpbmVkID8gUyA6IEM7XG59O1xudmFyIGlzVGhlbmFibGUgPSBmdW5jdGlvbihpdCl7XG4gIHZhciB0aGVuO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmIHR5cGVvZiAodGhlbiA9IGl0LnRoZW4pID09ICdmdW5jdGlvbicgPyB0aGVuIDogZmFsc2U7XG59O1xudmFyIFByb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24oQyl7XG4gIHZhciByZXNvbHZlLCByZWplY3Q7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBDKGZ1bmN0aW9uKCQkcmVzb2x2ZSwgJCRyZWplY3Qpe1xuICAgIGlmKHJlc29sdmUgIT09IHVuZGVmaW5lZCB8fCByZWplY3QgIT09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoJ0JhZCBQcm9taXNlIGNvbnN0cnVjdG9yJyk7XG4gICAgcmVzb2x2ZSA9ICQkcmVzb2x2ZTtcbiAgICByZWplY3QgID0gJCRyZWplY3Q7XG4gIH0pO1xuICB0aGlzLnJlc29sdmUgPSBhRnVuY3Rpb24ocmVzb2x2ZSksXG4gIHRoaXMucmVqZWN0ICA9IGFGdW5jdGlvbihyZWplY3QpXG59O1xudmFyIHBlcmZvcm0gPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICBleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHtlcnJvcjogZX07XG4gIH1cbn07XG52YXIgbm90aWZ5ID0gZnVuY3Rpb24ocmVjb3JkLCBpc1JlamVjdCl7XG4gIGlmKHJlY29yZC5uKXJldHVybjtcbiAgcmVjb3JkLm4gPSB0cnVlO1xuICB2YXIgY2hhaW4gPSByZWNvcmQuYztcbiAgYXNhcChmdW5jdGlvbigpe1xuICAgIHZhciB2YWx1ZSA9IHJlY29yZC52XG4gICAgICAsIG9rICAgID0gcmVjb3JkLnMgPT0gMVxuICAgICAgLCBpICAgICA9IDA7XG4gICAgdmFyIHJ1biA9IGZ1bmN0aW9uKHJlYWN0aW9uKXtcbiAgICAgIHZhciBoYW5kbGVyID0gb2sgPyByZWFjdGlvbi5vayA6IHJlYWN0aW9uLmZhaWxcbiAgICAgICAgLCByZXNvbHZlID0gcmVhY3Rpb24ucmVzb2x2ZVxuICAgICAgICAsIHJlamVjdCAgPSByZWFjdGlvbi5yZWplY3RcbiAgICAgICAgLCByZXN1bHQsIHRoZW47XG4gICAgICB0cnkge1xuICAgICAgICBpZihoYW5kbGVyKXtcbiAgICAgICAgICBpZighb2spcmVjb3JkLmggPSB0cnVlO1xuICAgICAgICAgIHJlc3VsdCA9IGhhbmRsZXIgPT09IHRydWUgPyB2YWx1ZSA6IGhhbmRsZXIodmFsdWUpO1xuICAgICAgICAgIGlmKHJlc3VsdCA9PT0gcmVhY3Rpb24ucHJvbWlzZSl7XG4gICAgICAgICAgICByZWplY3QoVHlwZUVycm9yKCdQcm9taXNlLWNoYWluIGN5Y2xlJykpO1xuICAgICAgICAgIH0gZWxzZSBpZih0aGVuID0gaXNUaGVuYWJsZShyZXN1bHQpKXtcbiAgICAgICAgICAgIHRoZW4uY2FsbChyZXN1bHQsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSBlbHNlIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHJlamVjdCh2YWx1ZSk7XG4gICAgICB9IGNhdGNoKGUpe1xuICAgICAgICByZWplY3QoZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB3aGlsZShjaGFpbi5sZW5ndGggPiBpKXJ1bihjaGFpbltpKytdKTsgLy8gdmFyaWFibGUgbGVuZ3RoIC0gY2FuJ3QgdXNlIGZvckVhY2hcbiAgICBjaGFpbi5sZW5ndGggPSAwO1xuICAgIHJlY29yZC5uID0gZmFsc2U7XG4gICAgaWYoaXNSZWplY3Qpc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgdmFyIHByb21pc2UgPSByZWNvcmQucFxuICAgICAgICAsIGhhbmRsZXIsIGNvbnNvbGU7XG4gICAgICBpZihpc1VuaGFuZGxlZChwcm9taXNlKSl7XG4gICAgICAgIGlmKGlzTm9kZSl7XG4gICAgICAgICAgcHJvY2Vzcy5lbWl0KCd1bmhhbmRsZWRSZWplY3Rpb24nLCB2YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgIH0gZWxzZSBpZihoYW5kbGVyID0gZ2xvYmFsLm9udW5oYW5kbGVkcmVqZWN0aW9uKXtcbiAgICAgICAgICBoYW5kbGVyKHtwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHZhbHVlfSk7XG4gICAgICAgIH0gZWxzZSBpZigoY29uc29sZSA9IGdsb2JhbC5jb25zb2xlKSAmJiBjb25zb2xlLmVycm9yKXtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb24nLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gcmVjb3JkLmEgPSB1bmRlZmluZWQ7XG4gICAgfSwgMSk7XG4gIH0pO1xufTtcbnZhciBpc1VuaGFuZGxlZCA9IGZ1bmN0aW9uKHByb21pc2Upe1xuICB2YXIgcmVjb3JkID0gcHJvbWlzZS5fZFxuICAgICwgY2hhaW4gID0gcmVjb3JkLmEgfHwgcmVjb3JkLmNcbiAgICAsIGkgICAgICA9IDBcbiAgICAsIHJlYWN0aW9uO1xuICBpZihyZWNvcmQuaClyZXR1cm4gZmFsc2U7XG4gIHdoaWxlKGNoYWluLmxlbmd0aCA+IGkpe1xuICAgIHJlYWN0aW9uID0gY2hhaW5baSsrXTtcbiAgICBpZihyZWFjdGlvbi5mYWlsIHx8ICFpc1VuaGFuZGxlZChyZWFjdGlvbi5wcm9taXNlKSlyZXR1cm4gZmFsc2U7XG4gIH0gcmV0dXJuIHRydWU7XG59O1xudmFyICRyZWplY3QgPSBmdW5jdGlvbih2YWx1ZSl7XG4gIHZhciByZWNvcmQgPSB0aGlzO1xuICBpZihyZWNvcmQuZClyZXR1cm47XG4gIHJlY29yZC5kID0gdHJ1ZTtcbiAgcmVjb3JkID0gcmVjb3JkLnIgfHwgcmVjb3JkOyAvLyB1bndyYXBcbiAgcmVjb3JkLnYgPSB2YWx1ZTtcbiAgcmVjb3JkLnMgPSAyO1xuICByZWNvcmQuYSA9IHJlY29yZC5jLnNsaWNlKCk7XG4gIG5vdGlmeShyZWNvcmQsIHRydWUpO1xufTtcbnZhciAkcmVzb2x2ZSA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgdmFyIHJlY29yZCA9IHRoaXNcbiAgICAsIHRoZW47XG4gIGlmKHJlY29yZC5kKXJldHVybjtcbiAgcmVjb3JkLmQgPSB0cnVlO1xuICByZWNvcmQgPSByZWNvcmQuciB8fCByZWNvcmQ7IC8vIHVud3JhcFxuICB0cnkge1xuICAgIGlmKHJlY29yZC5wID09PSB2YWx1ZSl0aHJvdyBUeXBlRXJyb3IoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIGl0c2VsZlwiKTtcbiAgICBpZih0aGVuID0gaXNUaGVuYWJsZSh2YWx1ZSkpe1xuICAgICAgYXNhcChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgd3JhcHBlciA9IHtyOiByZWNvcmQsIGQ6IGZhbHNlfTsgLy8gd3JhcFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoZW4uY2FsbCh2YWx1ZSwgY3R4KCRyZXNvbHZlLCB3cmFwcGVyLCAxKSwgY3R4KCRyZWplY3QsIHdyYXBwZXIsIDEpKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAkcmVqZWN0LmNhbGwod3JhcHBlciwgZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWNvcmQudiA9IHZhbHVlO1xuICAgICAgcmVjb3JkLnMgPSAxO1xuICAgICAgbm90aWZ5KHJlY29yZCwgZmFsc2UpO1xuICAgIH1cbiAgfSBjYXRjaChlKXtcbiAgICAkcmVqZWN0LmNhbGwoe3I6IHJlY29yZCwgZDogZmFsc2V9LCBlKTsgLy8gd3JhcFxuICB9XG59O1xuXG4vLyBjb25zdHJ1Y3RvciBwb2x5ZmlsbFxuaWYoIVVTRV9OQVRJVkUpe1xuICAvLyAyNS40LjMuMSBQcm9taXNlKGV4ZWN1dG9yKVxuICBQID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcil7XG4gICAgYUZ1bmN0aW9uKGV4ZWN1dG9yKTtcbiAgICB2YXIgcmVjb3JkID0gdGhpcy5fZCA9IHtcbiAgICAgIHA6IHN0cmljdE5ldyh0aGlzLCBQLCBQUk9NSVNFKSwgICAgICAgICAvLyA8LSBwcm9taXNlXG4gICAgICBjOiBbXSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gYXdhaXRpbmcgcmVhY3Rpb25zXG4gICAgICBhOiB1bmRlZmluZWQsICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gY2hlY2tlZCBpbiBpc1VuaGFuZGxlZCByZWFjdGlvbnNcbiAgICAgIHM6IDAsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBzdGF0ZVxuICAgICAgZDogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGRvbmVcbiAgICAgIHY6IHVuZGVmaW5lZCwgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSB2YWx1ZVxuICAgICAgaDogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGhhbmRsZWQgcmVqZWN0aW9uXG4gICAgICBuOiBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gbm90aWZ5XG4gICAgfTtcbiAgICB0cnkge1xuICAgICAgZXhlY3V0b3IoY3R4KCRyZXNvbHZlLCByZWNvcmQsIDEpLCBjdHgoJHJlamVjdCwgcmVjb3JkLCAxKSk7XG4gICAgfSBjYXRjaChlcnIpe1xuICAgICAgJHJlamVjdC5jYWxsKHJlY29yZCwgZXJyKTtcbiAgICB9XG4gIH07XG4gIHJlcXVpcmUoJy4vJC5yZWRlZmluZS1hbGwnKShQLnByb3RvdHlwZSwge1xuICAgIC8vIDI1LjQuNS4zIFByb21pc2UucHJvdG90eXBlLnRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpXG4gICAgdGhlbjogZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCl7XG4gICAgICB2YXIgcmVhY3Rpb24gPSBuZXcgUHJvbWlzZUNhcGFiaWxpdHkoc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsIFApKVxuICAgICAgICAsIHByb21pc2UgID0gcmVhY3Rpb24ucHJvbWlzZVxuICAgICAgICAsIHJlY29yZCAgID0gdGhpcy5fZDtcbiAgICAgIHJlYWN0aW9uLm9rICAgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogdHJ1ZTtcbiAgICAgIHJlYWN0aW9uLmZhaWwgPSB0eXBlb2Ygb25SZWplY3RlZCA9PSAnZnVuY3Rpb24nICYmIG9uUmVqZWN0ZWQ7XG4gICAgICByZWNvcmQuYy5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmKHJlY29yZC5hKXJlY29yZC5hLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYocmVjb3JkLnMpbm90aWZ5KHJlY29yZCwgZmFsc2UpO1xuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfSxcbiAgICAvLyAyNS40LjUuMSBQcm9taXNlLnByb3RvdHlwZS5jYXRjaChvblJlamVjdGVkKVxuICAgICdjYXRjaCc6IGZ1bmN0aW9uKG9uUmVqZWN0ZWQpe1xuICAgICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uUmVqZWN0ZWQpO1xuICAgIH1cbiAgfSk7XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHtQcm9taXNlOiBQfSk7XG5yZXF1aXJlKCcuLyQuc2V0LXRvLXN0cmluZy10YWcnKShQLCBQUk9NSVNFKTtcbnJlcXVpcmUoJy4vJC5zZXQtc3BlY2llcycpKFBST01JU0UpO1xuV3JhcHBlciA9IHJlcXVpcmUoJy4vJC5jb3JlJylbUFJPTUlTRV07XG5cbi8vIHN0YXRpY3NcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjUgUHJvbWlzZS5yZWplY3QocilcbiAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3Qocil7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXcgUHJvbWlzZUNhcGFiaWxpdHkodGhpcylcbiAgICAgICwgJCRyZWplY3QgICA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgICQkcmVqZWN0KHIpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoIVVTRV9OQVRJVkUgfHwgdGVzdFJlc29sdmUodHJ1ZSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC42IFByb21pc2UucmVzb2x2ZSh4KVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHgpe1xuICAgIC8vIGluc3RhbmNlb2YgaW5zdGVhZCBvZiBpbnRlcm5hbCBzbG90IGNoZWNrIGJlY2F1c2Ugd2Ugc2hvdWxkIGZpeCBpdCB3aXRob3V0IHJlcGxhY2VtZW50IG5hdGl2ZSBQcm9taXNlIGNvcmVcbiAgICBpZih4IGluc3RhbmNlb2YgUCAmJiBzYW1lQ29uc3RydWN0b3IoeC5jb25zdHJ1Y3RvciwgdGhpcykpcmV0dXJuIHg7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXcgUHJvbWlzZUNhcGFiaWxpdHkodGhpcylcbiAgICAgICwgJCRyZXNvbHZlICA9IGNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgICAkJHJlc29sdmUoeCk7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICEoVVNFX05BVElWRSAmJiByZXF1aXJlKCcuLyQuaXRlci1kZXRlY3QnKShmdW5jdGlvbihpdGVyKXtcbiAgUC5hbGwoaXRlcilbJ2NhdGNoJ10oZnVuY3Rpb24oKXt9KTtcbn0pKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuMSBQcm9taXNlLmFsbChpdGVyYWJsZSlcbiAgYWxsOiBmdW5jdGlvbiBhbGwoaXRlcmFibGUpe1xuICAgIHZhciBDICAgICAgICAgID0gZ2V0Q29uc3RydWN0b3IodGhpcylcbiAgICAgICwgY2FwYWJpbGl0eSA9IG5ldyBQcm9taXNlQ2FwYWJpbGl0eShDKVxuICAgICAgLCByZXNvbHZlICAgID0gY2FwYWJpbGl0eS5yZXNvbHZlXG4gICAgICAsIHJlamVjdCAgICAgPSBjYXBhYmlsaXR5LnJlamVjdFxuICAgICAgLCB2YWx1ZXMgICAgID0gW107XG4gICAgdmFyIGFicnVwdCA9IHBlcmZvcm0oZnVuY3Rpb24oKXtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgdmFsdWVzLnB1c2gsIHZhbHVlcyk7XG4gICAgICB2YXIgcmVtYWluaW5nID0gdmFsdWVzLmxlbmd0aFxuICAgICAgICAsIHJlc3VsdHMgICA9IEFycmF5KHJlbWFpbmluZyk7XG4gICAgICBpZihyZW1haW5pbmcpJC5lYWNoLmNhbGwodmFsdWVzLCBmdW5jdGlvbihwcm9taXNlLCBpbmRleCl7XG4gICAgICAgIHZhciBhbHJlYWR5Q2FsbGVkID0gZmFsc2U7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICBpZihhbHJlYWR5Q2FsbGVkKXJldHVybjtcbiAgICAgICAgICBhbHJlYWR5Q2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICByZXN1bHRzW2luZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUocmVzdWx0cyk7XG4gICAgICAgIH0sIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICAgIGVsc2UgcmVzb2x2ZShyZXN1bHRzKTtcbiAgICB9KTtcbiAgICBpZihhYnJ1cHQpcmVqZWN0KGFicnVwdC5lcnJvcik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfSxcbiAgLy8gMjUuNC40LjQgUHJvbWlzZS5yYWNlKGl0ZXJhYmxlKVxuICByYWNlOiBmdW5jdGlvbiByYWNlKGl0ZXJhYmxlKXtcbiAgICB2YXIgQyAgICAgICAgICA9IGdldENvbnN0cnVjdG9yKHRoaXMpXG4gICAgICAsIGNhcGFiaWxpdHkgPSBuZXcgUHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICAgICwgcmVqZWN0ICAgICA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciBhYnJ1cHQgPSBwZXJmb3JtKGZ1bmN0aW9uKCl7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uKHByb21pc2Upe1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihjYXBhYmlsaXR5LnJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZihhYnJ1cHQpcmVqZWN0KGFicnVwdC5lcnJvcik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyIHN0cm9uZyA9IHJlcXVpcmUoJy4vJC5jb2xsZWN0aW9uLXN0cm9uZycpO1xuXG4vLyAyMy4yIFNldCBPYmplY3RzXG5yZXF1aXJlKCcuLyQuY29sbGVjdGlvbicpKCdTZXQnLCBmdW5jdGlvbihnZXQpe1xuICByZXR1cm4gZnVuY3Rpb24gU2V0KCl7IHJldHVybiBnZXQodGhpcywgYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpOyB9O1xufSwge1xuICAvLyAyMy4yLjMuMSBTZXQucHJvdG90eXBlLmFkZCh2YWx1ZSlcbiAgYWRkOiBmdW5jdGlvbiBhZGQodmFsdWUpe1xuICAgIHJldHVybiBzdHJvbmcuZGVmKHRoaXMsIHZhbHVlID0gdmFsdWUgPT09IDAgPyAwIDogdmFsdWUsIHZhbHVlKTtcbiAgfVxufSwgc3Ryb25nKTsiLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ICA9IHJlcXVpcmUoJy4vJC5zdHJpbmctYXQnKSh0cnVlKTtcblxuLy8gMjEuMS4zLjI3IFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi8kLml0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24oaXRlcmF0ZWQpe1xuICB0aGlzLl90ID0gU3RyaW5nKGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBpbmRleCA9IHRoaXMuX2lcbiAgICAsIHBvaW50O1xuICBpZihpbmRleCA+PSBPLmxlbmd0aClyZXR1cm4ge3ZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWV9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4ge3ZhbHVlOiBwb2ludCwgZG9uZTogZmFsc2V9O1xufSk7IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL0RhdmlkQnJ1YW50L01hcC1TZXQucHJvdG90eXBlLnRvSlNPTlxudmFyICRleHBvcnQgID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCwgJ1NldCcsIHt0b0pTT046IHJlcXVpcmUoJy4vJC5jb2xsZWN0aW9uLXRvLWpzb24nKSgnU2V0Jyl9KTsiLCJyZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKTtcbkl0ZXJhdG9ycy5Ob2RlTGlzdCA9IEl0ZXJhdG9ycy5IVE1MQ29sbGVjdGlvbiA9IEl0ZXJhdG9ycy5BcnJheTsiLCJ2YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJ2lzLWZ1bmN0aW9uJylcblxubW9kdWxlLmV4cG9ydHMgPSBmb3JFYWNoXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHlcblxuZnVuY3Rpb24gZm9yRWFjaChsaXN0LCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIGlmICghaXNGdW5jdGlvbihpdGVyYXRvcikpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaXRlcmF0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uJylcbiAgICB9XG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgY29udGV4dCA9IHRoaXNcbiAgICB9XG4gICAgXG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobGlzdCkgPT09ICdbb2JqZWN0IEFycmF5XScpXG4gICAgICAgIGZvckVhY2hBcnJheShsaXN0LCBpdGVyYXRvciwgY29udGV4dClcbiAgICBlbHNlIGlmICh0eXBlb2YgbGlzdCA9PT0gJ3N0cmluZycpXG4gICAgICAgIGZvckVhY2hTdHJpbmcobGlzdCwgaXRlcmF0b3IsIGNvbnRleHQpXG4gICAgZWxzZVxuICAgICAgICBmb3JFYWNoT2JqZWN0KGxpc3QsIGl0ZXJhdG9yLCBjb250ZXh0KVxufVxuXG5mdW5jdGlvbiBmb3JFYWNoQXJyYXkoYXJyYXksIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGFycmF5LCBpKSkge1xuICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBhcnJheVtpXSwgaSwgYXJyYXkpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZvckVhY2hTdHJpbmcoc3RyaW5nLCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzdHJpbmcubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgLy8gbm8gc3VjaCB0aGluZyBhcyBhIHNwYXJzZSBzdHJpbmcuXG4gICAgICAgIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgc3RyaW5nLmNoYXJBdChpKSwgaSwgc3RyaW5nKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZm9yRWFjaE9iamVjdChvYmplY3QsIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgZm9yICh2YXIgayBpbiBvYmplY3QpIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrKSkge1xuICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmplY3Rba10sIGssIG9iamVjdClcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbDtcbn0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpe1xuICAgIG1vZHVsZS5leHBvcnRzID0gc2VsZjtcbn0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7fTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvblxuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24gKGZuKSB7XG4gIHZhciBzdHJpbmcgPSB0b1N0cmluZy5jYWxsKGZuKVxuICByZXR1cm4gc3RyaW5nID09PSAnW29iamVjdCBGdW5jdGlvbl0nIHx8XG4gICAgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyAmJiBzdHJpbmcgIT09ICdbb2JqZWN0IFJlZ0V4cF0nKSB8fFxuICAgICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAvLyBJRTggYW5kIGJlbG93XG4gICAgIChmbiA9PT0gd2luZG93LnNldFRpbWVvdXQgfHxcbiAgICAgIGZuID09PSB3aW5kb3cuYWxlcnQgfHxcbiAgICAgIGZuID09PSB3aW5kb3cuY29uZmlybSB8fFxuICAgICAgZm4gPT09IHdpbmRvdy5wcm9tcHQpKVxufTtcbiIsInZhciB0cmltID0gcmVxdWlyZSgndHJpbScpXG4gICwgZm9yRWFjaCA9IHJlcXVpcmUoJ2Zvci1lYWNoJylcbiAgLCBpc0FycmF5ID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChoZWFkZXJzKSB7XG4gIGlmICghaGVhZGVycylcbiAgICByZXR1cm4ge31cblxuICB2YXIgcmVzdWx0ID0ge31cblxuICBmb3JFYWNoKFxuICAgICAgdHJpbShoZWFkZXJzKS5zcGxpdCgnXFxuJylcbiAgICAsIGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gcm93LmluZGV4T2YoJzonKVxuICAgICAgICAgICwga2V5ID0gdHJpbShyb3cuc2xpY2UoMCwgaW5kZXgpKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgLCB2YWx1ZSA9IHRyaW0ocm93LnNsaWNlKGluZGV4ICsgMSkpXG5cbiAgICAgICAgaWYgKHR5cGVvZihyZXN1bHRba2V5XSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgcmVzdWx0W2tleV0gPSB2YWx1ZVxuICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkocmVzdWx0W2tleV0pKSB7XG4gICAgICAgICAgcmVzdWx0W2tleV0ucHVzaCh2YWx1ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IFsgcmVzdWx0W2tleV0sIHZhbHVlIF1cbiAgICAgICAgfVxuICAgICAgfVxuICApXG5cbiAgcmV0dXJuIHJlc3VsdFxufSIsIlxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gdHJpbTtcblxuZnVuY3Rpb24gdHJpbShzdHIpe1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqfFxccyokL2csICcnKTtcbn1cblxuZXhwb3J0cy5sZWZ0ID0gZnVuY3Rpb24oc3RyKXtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKTtcbn07XG5cbmV4cG9ydHMucmlnaHQgPSBmdW5jdGlvbihzdHIpe1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL1xccyokLywgJycpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIHdpbmRvdyA9IHJlcXVpcmUoXCJnbG9iYWwvd2luZG93XCIpXG52YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoXCJpcy1mdW5jdGlvblwiKVxudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoXCJwYXJzZS1oZWFkZXJzXCIpXG52YXIgeHRlbmQgPSByZXF1aXJlKFwieHRlbmRcIilcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVYSFJcbmNyZWF0ZVhIUi5YTUxIdHRwUmVxdWVzdCA9IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCB8fCBub29wXG5jcmVhdGVYSFIuWERvbWFpblJlcXVlc3QgPSBcIndpdGhDcmVkZW50aWFsc1wiIGluIChuZXcgY3JlYXRlWEhSLlhNTEh0dHBSZXF1ZXN0KCkpID8gY3JlYXRlWEhSLlhNTEh0dHBSZXF1ZXN0IDogd2luZG93LlhEb21haW5SZXF1ZXN0XG5cbmZvckVhY2hBcnJheShbXCJnZXRcIiwgXCJwdXRcIiwgXCJwb3N0XCIsIFwicGF0Y2hcIiwgXCJoZWFkXCIsIFwiZGVsZXRlXCJdLCBmdW5jdGlvbihtZXRob2QpIHtcbiAgICBjcmVhdGVYSFJbbWV0aG9kID09PSBcImRlbGV0ZVwiID8gXCJkZWxcIiA6IG1ldGhvZF0gPSBmdW5jdGlvbih1cmksIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgICAgIG9wdGlvbnMgPSBpbml0UGFyYW1zKHVyaSwgb3B0aW9ucywgY2FsbGJhY2spXG4gICAgICAgIG9wdGlvbnMubWV0aG9kID0gbWV0aG9kLnRvVXBwZXJDYXNlKClcbiAgICAgICAgcmV0dXJuIF9jcmVhdGVYSFIob3B0aW9ucylcbiAgICB9XG59KVxuXG5mdW5jdGlvbiBmb3JFYWNoQXJyYXkoYXJyYXksIGl0ZXJhdG9yKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVyYXRvcihhcnJheVtpXSlcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzRW1wdHkob2JqKXtcbiAgICBmb3IodmFyIGkgaW4gb2JqKXtcbiAgICAgICAgaWYob2JqLmhhc093blByb3BlcnR5KGkpKSByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbn1cblxuZnVuY3Rpb24gaW5pdFBhcmFtcyh1cmksIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHBhcmFtcyA9IHVyaVxuXG4gICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9ucykpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBvcHRpb25zXG4gICAgICAgIGlmICh0eXBlb2YgdXJpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBwYXJhbXMgPSB7dXJpOnVyaX1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmFtcyA9IHh0ZW5kKG9wdGlvbnMsIHt1cmk6IHVyaX0pXG4gICAgfVxuXG4gICAgcGFyYW1zLmNhbGxiYWNrID0gY2FsbGJhY2tcbiAgICByZXR1cm4gcGFyYW1zXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVhIUih1cmksIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgb3B0aW9ucyA9IGluaXRQYXJhbXModXJpLCBvcHRpb25zLCBjYWxsYmFjaylcbiAgICByZXR1cm4gX2NyZWF0ZVhIUihvcHRpb25zKVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlWEhSKG9wdGlvbnMpIHtcbiAgICBpZih0eXBlb2Ygb3B0aW9ucy5jYWxsYmFjayA9PT0gXCJ1bmRlZmluZWRcIil7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbGxiYWNrIGFyZ3VtZW50IG1pc3NpbmdcIilcbiAgICB9XG5cbiAgICB2YXIgY2FsbGVkID0gZmFsc2VcbiAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiBjYk9uY2UoZXJyLCByZXNwb25zZSwgYm9keSl7XG4gICAgICAgIGlmKCFjYWxsZWQpe1xuICAgICAgICAgICAgY2FsbGVkID0gdHJ1ZVxuICAgICAgICAgICAgb3B0aW9ucy5jYWxsYmFjayhlcnIsIHJlc3BvbnNlLCBib2R5KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVhZHlzdGF0ZWNoYW5nZSgpIHtcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICBsb2FkRnVuYygpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRCb2R5KCkge1xuICAgICAgICAvLyBDaHJvbWUgd2l0aCByZXF1ZXN0VHlwZT1ibG9iIHRocm93cyBlcnJvcnMgYXJyb3VuZCB3aGVuIGV2ZW4gdGVzdGluZyBhY2Nlc3MgdG8gcmVzcG9uc2VUZXh0XG4gICAgICAgIHZhciBib2R5ID0gdW5kZWZpbmVkXG5cbiAgICAgICAgaWYgKHhoci5yZXNwb25zZSkge1xuICAgICAgICAgICAgYm9keSA9IHhoci5yZXNwb25zZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYm9keSA9IHhoci5yZXNwb25zZVRleHQgfHwgZ2V0WG1sKHhocilcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0pzb24pIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYm9keSA9IEpTT04ucGFyc2UoYm9keSlcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYm9keVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVycm9yRnVuYyhldnQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRUaW1lcilcbiAgICAgICAgaWYoIShldnQgaW5zdGFuY2VvZiBFcnJvcikpe1xuICAgICAgICAgICAgZXZ0ID0gbmV3IEVycm9yKFwiXCIgKyAoZXZ0IHx8IFwiVW5rbm93biBYTUxIdHRwUmVxdWVzdCBFcnJvclwiKSApXG4gICAgICAgIH1cbiAgICAgICAgZXZ0LnN0YXR1c0NvZGUgPSAwXG4gICAgICAgIHJldHVybiBjYWxsYmFjayhldnQsIGZhaWx1cmVSZXNwb25zZSlcbiAgICB9XG5cbiAgICAvLyB3aWxsIGxvYWQgdGhlIGRhdGEgJiBwcm9jZXNzIHRoZSByZXNwb25zZSBpbiBhIHNwZWNpYWwgcmVzcG9uc2Ugb2JqZWN0XG4gICAgZnVuY3Rpb24gbG9hZEZ1bmMoKSB7XG4gICAgICAgIGlmIChhYm9ydGVkKSByZXR1cm5cbiAgICAgICAgdmFyIHN0YXR1c1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dFRpbWVyKVxuICAgICAgICBpZihvcHRpb25zLnVzZVhEUiAmJiB4aHIuc3RhdHVzPT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvL0lFOCBDT1JTIEdFVCBzdWNjZXNzZnVsIHJlc3BvbnNlIGRvZXNuJ3QgaGF2ZSBhIHN0YXR1cyBmaWVsZCwgYnV0IGJvZHkgaXMgZmluZVxuICAgICAgICAgICAgc3RhdHVzID0gMjAwXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGF0dXMgPSAoeGhyLnN0YXR1cyA9PT0gMTIyMyA/IDIwNCA6IHhoci5zdGF0dXMpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3BvbnNlID0gZmFpbHVyZVJlc3BvbnNlXG4gICAgICAgIHZhciBlcnIgPSBudWxsXG5cbiAgICAgICAgaWYgKHN0YXR1cyAhPT0gMCl7XG4gICAgICAgICAgICByZXNwb25zZSA9IHtcbiAgICAgICAgICAgICAgICBib2R5OiBnZXRCb2R5KCksXG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogc3RhdHVzLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgICAgICAgICAgIHVybDogdXJpLFxuICAgICAgICAgICAgICAgIHJhd1JlcXVlc3Q6IHhoclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycyl7IC8vcmVtZW1iZXIgeGhyIGNhbiBpbiBmYWN0IGJlIFhEUiBmb3IgQ09SUyBpbiBJRVxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmhlYWRlcnMgPSBwYXJzZUhlYWRlcnMoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXJyID0gbmV3IEVycm9yKFwiSW50ZXJuYWwgWE1MSHR0cFJlcXVlc3QgRXJyb3JcIilcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyLCByZXNwb25zZSwgcmVzcG9uc2UuYm9keSlcbiAgICB9XG5cbiAgICB2YXIgeGhyID0gb3B0aW9ucy54aHIgfHwgbnVsbFxuXG4gICAgaWYgKCF4aHIpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuY29ycyB8fCBvcHRpb25zLnVzZVhEUikge1xuICAgICAgICAgICAgeGhyID0gbmV3IGNyZWF0ZVhIUi5YRG9tYWluUmVxdWVzdCgpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgeGhyID0gbmV3IGNyZWF0ZVhIUi5YTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIga2V5XG4gICAgdmFyIGFib3J0ZWRcbiAgICB2YXIgdXJpID0geGhyLnVybCA9IG9wdGlvbnMudXJpIHx8IG9wdGlvbnMudXJsXG4gICAgdmFyIG1ldGhvZCA9IHhoci5tZXRob2QgPSBvcHRpb25zLm1ldGhvZCB8fCBcIkdFVFwiXG4gICAgdmFyIGJvZHkgPSBvcHRpb25zLmJvZHkgfHwgb3B0aW9ucy5kYXRhXG4gICAgdmFyIGhlYWRlcnMgPSB4aHIuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyB8fCB7fVxuICAgIHZhciBzeW5jID0gISFvcHRpb25zLnN5bmNcbiAgICB2YXIgaXNKc29uID0gZmFsc2VcbiAgICB2YXIgdGltZW91dFRpbWVyXG4gICAgdmFyIGZhaWx1cmVSZXNwb25zZSA9IHtcbiAgICAgICAgYm9keTogdW5kZWZpbmVkLFxuICAgICAgICBoZWFkZXJzOiB7fSxcbiAgICAgICAgc3RhdHVzQ29kZTogMCxcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgIHVybDogdXJpLFxuICAgICAgICByYXdSZXF1ZXN0OiB4aHJcbiAgICB9XG5cbiAgICBpZiAoXCJqc29uXCIgaW4gb3B0aW9ucyAmJiBvcHRpb25zLmpzb24gIT09IGZhbHNlKSB7XG4gICAgICAgIGlzSnNvbiA9IHRydWVcbiAgICAgICAgaGVhZGVyc1tcImFjY2VwdFwiXSB8fCBoZWFkZXJzW1wiQWNjZXB0XCJdIHx8IChoZWFkZXJzW1wiQWNjZXB0XCJdID0gXCJhcHBsaWNhdGlvbi9qc29uXCIpIC8vRG9uJ3Qgb3ZlcnJpZGUgZXhpc3RpbmcgYWNjZXB0IGhlYWRlciBkZWNsYXJlZCBieSB1c2VyXG4gICAgICAgIGlmIChtZXRob2QgIT09IFwiR0VUXCIgJiYgbWV0aG9kICE9PSBcIkhFQURcIikge1xuICAgICAgICAgICAgaGVhZGVyc1tcImNvbnRlbnQtdHlwZVwiXSB8fCBoZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdIHx8IChoZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdID0gXCJhcHBsaWNhdGlvbi9qc29uXCIpIC8vRG9uJ3Qgb3ZlcnJpZGUgZXhpc3RpbmcgYWNjZXB0IGhlYWRlciBkZWNsYXJlZCBieSB1c2VyXG4gICAgICAgICAgICBib2R5ID0gSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5qc29uID09PSB0cnVlID8gYm9keSA6IG9wdGlvbnMuanNvbilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSByZWFkeXN0YXRlY2hhbmdlXG4gICAgeGhyLm9ubG9hZCA9IGxvYWRGdW5jXG4gICAgeGhyLm9uZXJyb3IgPSBlcnJvckZ1bmNcbiAgICAvLyBJRTkgbXVzdCBoYXZlIG9ucHJvZ3Jlc3MgYmUgc2V0IHRvIGEgdW5pcXVlIGZ1bmN0aW9uLlxuICAgIHhoci5vbnByb2dyZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBJRSBtdXN0IGRpZVxuICAgIH1cbiAgICB4aHIub25hYm9ydCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGFib3J0ZWQgPSB0cnVlO1xuICAgIH1cbiAgICB4aHIub250aW1lb3V0ID0gZXJyb3JGdW5jXG4gICAgeGhyLm9wZW4obWV0aG9kLCB1cmksICFzeW5jLCBvcHRpb25zLnVzZXJuYW1lLCBvcHRpb25zLnBhc3N3b3JkKVxuICAgIC8vaGFzIHRvIGJlIGFmdGVyIG9wZW5cbiAgICBpZighc3luYykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gISFvcHRpb25zLndpdGhDcmVkZW50aWFsc1xuICAgIH1cbiAgICAvLyBDYW5ub3Qgc2V0IHRpbWVvdXQgd2l0aCBzeW5jIHJlcXVlc3RcbiAgICAvLyBub3Qgc2V0dGluZyB0aW1lb3V0IG9uIHRoZSB4aHIgb2JqZWN0LCBiZWNhdXNlIG9mIG9sZCB3ZWJraXRzIGV0Yy4gbm90IGhhbmRsaW5nIHRoYXQgY29ycmVjdGx5XG4gICAgLy8gYm90aCBucG0ncyByZXF1ZXN0IGFuZCBqcXVlcnkgMS54IHVzZSB0aGlzIGtpbmQgb2YgdGltZW91dCwgc28gdGhpcyBpcyBiZWluZyBjb25zaXN0ZW50XG4gICAgaWYgKCFzeW5jICYmIG9wdGlvbnMudGltZW91dCA+IDAgKSB7XG4gICAgICAgIHRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmIChhYm9ydGVkKSByZXR1cm5cbiAgICAgICAgICAgIGFib3J0ZWQgPSB0cnVlLy9JRTkgbWF5IHN0aWxsIGNhbGwgcmVhZHlzdGF0ZWNoYW5nZVxuICAgICAgICAgICAgeGhyLmFib3J0KFwidGltZW91dFwiKVxuICAgICAgICAgICAgdmFyIGUgPSBuZXcgRXJyb3IoXCJYTUxIdHRwUmVxdWVzdCB0aW1lb3V0XCIpXG4gICAgICAgICAgICBlLmNvZGUgPSBcIkVUSU1FRE9VVFwiXG4gICAgICAgICAgICBlcnJvckZ1bmMoZSlcbiAgICAgICAgfSwgb3B0aW9ucy50aW1lb3V0IClcbiAgICB9XG5cbiAgICBpZiAoeGhyLnNldFJlcXVlc3RIZWFkZXIpIHtcbiAgICAgICAgZm9yKGtleSBpbiBoZWFkZXJzKXtcbiAgICAgICAgICAgIGlmKGhlYWRlcnMuaGFzT3duUHJvcGVydHkoa2V5KSl7XG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoa2V5LCBoZWFkZXJzW2tleV0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuaGVhZGVycyAmJiAhaXNFbXB0eShvcHRpb25zLmhlYWRlcnMpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkhlYWRlcnMgY2Fubm90IGJlIHNldCBvbiBhbiBYRG9tYWluUmVxdWVzdCBvYmplY3RcIilcbiAgICB9XG5cbiAgICBpZiAoXCJyZXNwb25zZVR5cGVcIiBpbiBvcHRpb25zKSB7XG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSBvcHRpb25zLnJlc3BvbnNlVHlwZVxuICAgIH1cblxuICAgIGlmIChcImJlZm9yZVNlbmRcIiBpbiBvcHRpb25zICYmXG4gICAgICAgIHR5cGVvZiBvcHRpb25zLmJlZm9yZVNlbmQgPT09IFwiZnVuY3Rpb25cIlxuICAgICkge1xuICAgICAgICBvcHRpb25zLmJlZm9yZVNlbmQoeGhyKVxuICAgIH1cblxuICAgIC8vIE1pY3Jvc29mdCBFZGdlIGJyb3dzZXIgc2VuZHMgXCJ1bmRlZmluZWRcIiB3aGVuIHNlbmQgaXMgY2FsbGVkIHdpdGggdW5kZWZpbmVkIHZhbHVlLlxuICAgIC8vIFhNTEh0dHBSZXF1ZXN0IHNwZWMgc2F5cyB0byBwYXNzIG51bGwgYXMgYm9keSB0byBpbmRpY2F0ZSBubyBib2R5XG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9uYXVndHVyL3hoci9pc3N1ZXMvMTAwLlxuICAgIHhoci5zZW5kKGJvZHkgfHwgbnVsbClcblxuICAgIHJldHVybiB4aHJcblxuXG59XG5cbmZ1bmN0aW9uIGdldFhtbCh4aHIpIHtcbiAgICBpZiAoeGhyLnJlc3BvbnNlVHlwZSA9PT0gXCJkb2N1bWVudFwiKSB7XG4gICAgICAgIHJldHVybiB4aHIucmVzcG9uc2VYTUxcbiAgICB9XG4gICAgdmFyIGZpcmVmb3hCdWdUYWtlbkVmZmVjdCA9IHhoci5zdGF0dXMgPT09IDIwNCAmJiB4aHIucmVzcG9uc2VYTUwgJiYgeGhyLnJlc3BvbnNlWE1MLmRvY3VtZW50RWxlbWVudC5ub2RlTmFtZSA9PT0gXCJwYXJzZXJlcnJvclwiXG4gICAgaWYgKHhoci5yZXNwb25zZVR5cGUgPT09IFwiXCIgJiYgIWZpcmVmb3hCdWdUYWtlbkVmZmVjdCkge1xuICAgICAgICByZXR1cm4geGhyLnJlc3BvbnNlWE1MXG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGxcbn1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGV4dGVuZFxuXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5mdW5jdGlvbiBleHRlbmQoKSB7XG4gICAgdmFyIHRhcmdldCA9IHt9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldXG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldFxufVxuIiwiLypcblRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG5Db3B5cmlnaHQgKGMpIDIwMTUgUGF0cmljaW8gR29uemFsZXogVml2byAoIGh0dHA6Ly93d3cucGF0cmljaW9nb256YWxlenZpdm8uY29tIClcblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxudGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgJ1NvZnR3YXJlJyksIHRvIGRlYWwgaW5cbnRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbnVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG50aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG5zdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgJ0FTIElTJywgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1NcbkZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG5JTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cbiovXG5cbmltcG9ydCB4aHIgZnJvbSAneGhyJztcblxuaW1wb3J0IHsgc2V0dXBXZWJHTCwgY3JlYXRlU2hhZGVyLCBjcmVhdGVQcm9ncmFtLCBwYXJzZVVuaWZvcm1zLCBsb2FkVGV4dHVyZSB9IGZyb20gJy4vZ2wvZ2wnO1xuaW1wb3J0IFRleHR1cmUgZnJvbSAnLi9nbC9UZXh0dXJlJztcblxuaW1wb3J0IHsgaXNDYW52YXNWaXNpYmxlLCBpc0RpZmYgfSBmcm9tICcuL3Rvb2xzL2NvbW1vbic7XG5pbXBvcnQgeyBzdWJzY3JpYmVNaXhpbiB9IGZyb20gJy4vdG9vbHMvbWl4aW4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHbHNsQ2FudmFzIHtcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMsIG9wdGlvbnMpIHtcbiAgICAgICAgc3Vic2NyaWJlTWl4aW4odGhpcyk7XG5cbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgICAgdGhpcy53aWR0aCA9IGNhbnZhcy5jbGllbnRXaWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBjYW52YXMuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLmdsID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnByb2dyYW0gPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMudGV4dHVyZXMgPSB7fTtcbiAgICAgICAgdGhpcy51bmlmb3JtcyA9IHt9O1xuICAgICAgICB0aGlzLnZibyA9IHt9O1xuICAgICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnZlcnRleFN0cmluZyA9IG9wdGlvbnMudmVydGV4U3RyaW5nIHx8IGBcbiNpZmRlZiBHTF9FU1xucHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XG4jZW5kaWZcblxuYXR0cmlidXRlIHZlYzIgYV9wb3NpdGlvbjtcbmF0dHJpYnV0ZSB2ZWMyIGFfdGV4Y29vcmQ7XG5cbnZhcnlpbmcgdmVjMiB2X3RleGNvb3JkO1xuXG52b2lkIG1haW4oKSB7XG4gICAgZ2xfUG9zaXRpb24gPSB2ZWM0KGFfcG9zaXRpb24sIDAuMCwgMS4wKTtcbiAgICB2X3RleGNvb3JkID0gYV90ZXhjb29yZDtcbn1cbmA7XG4gICAgICAgIHRoaXMuZnJhZ21lbnRTdHJpbmcgPSBvcHRpb25zLmZyYWdtZW50U3RyaW5nIHx8IGBcbiNpZmRlZiBHTF9FU1xucHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XG4jZW5kaWZcblxudmFyeWluZyB2ZWMyIHZfdGV4Y29vcmQ7XG5cbnZvaWQgbWFpbigpe1xuICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoMC4wKTtcbn1cbmA7XG5cbiAgICAgICAgLy8gR0wgQ29udGV4dFxuICAgICAgICBsZXQgZ2wgPSBzZXR1cFdlYkdMKGNhbnZhcywgb3B0aW9ucyk7XG4gICAgICAgIGlmICghZ2wpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdsID0gZ2w7XG4gICAgICAgIHRoaXMudGltZUxvYWQgPSB0aGlzLnRpbWVQcmV2ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy50aW1lRGVsdGEgPSAwLjtcbiAgICAgICAgdGhpcy5mb3JjZVJlbmRlciA9IHRydWU7XG4gICAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XG5cbiAgICAgICAgLy8gQWxsb3cgYWxwaGFcbiAgICAgICAgY2FudmFzLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IG9wdGlvbnMuYmFja2dyb3VuZENvbG9yIHx8ICdyZ2JhKDEsMSwxLDApJztcblxuICAgICAgICAvLyBMb2FkIHNoYWRlclxuICAgICAgICBpZiAoY2FudmFzLmhhc0F0dHJpYnV0ZSgnZGF0YS1mcmFnbWVudCcpKSB7XG4gICAgICAgICAgICB0aGlzLmZyYWdtZW50U3RyaW5nID0gY2FudmFzLmdldEF0dHJpYnV0ZSgnZGF0YS1mcmFnbWVudCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNhbnZhcy5oYXNBdHRyaWJ1dGUoJ2RhdGEtZnJhZ21lbnQtdXJsJykpIHtcbiAgICAgICAgICAgIGxldCBzb3VyY2UgPSBjYW52YXMuZ2V0QXR0cmlidXRlKCdkYXRhLWZyYWdtZW50LXVybCcpO1xuICAgICAgICAgICAgeGhyLmdldChzb3VyY2UsIChlcnJvciwgcmVzcG9uc2UsIGJvZHkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWQoYm9keSwgdGhpcy52ZXJ0ZXhTdHJpbmcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBMb2FkIHNoYWRlclxuICAgICAgICBpZiAoY2FudmFzLmhhc0F0dHJpYnV0ZSgnZGF0YS12ZXJ0ZXgnKSkge1xuICAgICAgICAgICAgdGhpcy52ZXJ0ZXhTdHJpbmcgPSBjYW52YXMuZ2V0QXR0cmlidXRlKCdkYXRhLXZlcnRleCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNhbnZhcy5oYXNBdHRyaWJ1dGUoJ2RhdGEtdmVydGV4LXVybCcpKSB7XG4gICAgICAgICAgICBsZXQgc291cmNlID0gY2FudmFzLmdldEF0dHJpYnV0ZSgnZGF0YS12ZXJ0ZXgtdXJsJyk7XG4gICAgICAgICAgICB4aHIuZ2V0KHNvdXJjZSwgKGVycm9yLCByZXNwb25zZSwgYm9keSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZCh0aGlzLmZyYWdtZW50U3RyaW5nLCBib2R5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2FkKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnByb2dyYW0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERlZmluZSBWZXJ0ZXggYnVmZmVyXG4gICAgICAgIGxldCB0ZXhDb29yZHNMb2MgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnByb2dyYW0sICdhX3RleGNvb3JkJyk7XG4gICAgICAgIHRoaXMudmJvLnRleENvb3JkcyA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgICAgICB0aGlzLmdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnZiby50ZXhDb29yZHMpO1xuICAgICAgICB0aGlzLmdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KFswLjAsIDAuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDEuMCwgMS4wXSksIGdsLlNUQVRJQ19EUkFXKTtcbiAgICAgICAgdGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0ZXhDb29yZHNMb2MpO1xuICAgICAgICB0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGV4Q29vcmRzTG9jLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuXG4gICAgICAgIGxldCB2ZXJ0aWNlc0xvYyA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMucHJvZ3JhbSwgJ2FfcG9zaXRpb24nKTtcbiAgICAgICAgdGhpcy52Ym8udmVydGljZXMgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICAgICAgdGhpcy5nbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy52Ym8udmVydGljZXMpO1xuICAgICAgICB0aGlzLmdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KFstMS4wLCAtMS4wLCAxLjAsIC0xLjAsIC0xLjAsIDEuMCwgLTEuMCwgMS4wLCAxLjAsIC0xLjAsIDEuMCwgMS4wXSksIGdsLlNUQVRJQ19EUkFXKTtcbiAgICAgICAgdGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh2ZXJ0aWNlc0xvYyk7XG4gICAgICAgIHRoaXMuZ2wudmVydGV4QXR0cmliUG9pbnRlcih2ZXJ0aWNlc0xvYywgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcblxuICAgICAgICAvLyBsb2FkIFRFWFRVUkVTXG4gICAgICAgIGlmIChjYW52YXMuaGFzQXR0cmlidXRlKCdkYXRhLXRleHR1cmVzJykpIHtcbiAgICAgICAgICAgIGxldCBpbWdMaXN0ID0gY2FudmFzLmdldEF0dHJpYnV0ZSgnZGF0YS10ZXh0dXJlcycpLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICBmb3IgKGxldCBuSW1nIGluIGltZ0xpc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFVuaWZvcm0oJ3VfdGV4JyArIG5JbWcsIGltZ0xpc3RbbkltZ10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT0gRVZFTlRTXG4gICAgICAgIGxldCBtb3VzZSA9IHtcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwXG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiB7XG4gICAgICAgICAgICBtb3VzZS54ID0gZS5jbGllbnRYIHx8IGUucGFnZVg7XG4gICAgICAgICAgICBtb3VzZS55ID0gZS5jbGllbnRZIHx8IGUucGFnZVk7XG4gICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgICBsZXQgc2FuZGJveCA9IHRoaXM7XG4gICAgICAgIGZ1bmN0aW9uIFJlbmRlckxvb3AoKSB7XG4gICAgICAgICAgICBpZiAoc2FuZGJveC5uTW91c2UgPiAxKSB7XG4gICAgICAgICAgICAgICAgc2FuZGJveC5zZXRNb3VzZShtb3VzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzYW5kYm94LnJlbmRlcigpO1xuICAgICAgICAgICAgc2FuZGJveC5mb3JjZVJlbmRlciA9IHNhbmRib3gucmVzaXplKCk7XG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKFJlbmRlckxvb3ApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3RhcnRcbiAgICAgICAgdGhpcy5zZXRNb3VzZSh7IHg6IDAsIHk6IDAgfSk7XG4gICAgICAgIFJlbmRlckxvb3AoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgdGV4IGluIHRoaXMudGV4dHVyZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZ2wuZGVsZXRlVGV4dHVyZSh0ZXgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGV4dHVyZXMgPSB7fTtcbiAgICAgICAgZm9yIChsZXQgYXR0IGluIHRoaXMuYXR0cmlicykge1xuICAgICAgICAgICAgdGhpcy5nbC5kZWxldGVCdWZmZXIodGhpcy5hdHRyaWJzW2F0dF0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2wudXNlUHJvZ3JhbShudWxsKTtcbiAgICAgICAgdGhpcy5nbC5kZWxldGVQcm9ncmFtKHRoaXMucHJvZ3JhbSk7XG4gICAgICAgIHRoaXMucHJvZ3JhbSA9IG51bGw7XG4gICAgICAgIHRoaXMuZ2wgPSBudWxsO1xuICAgIH1cblxuICAgIGxvYWQoZnJhZ1N0cmluZywgdmVydFN0cmluZykge1xuICAgICAgICAvLyBMb2FkIHZlcnRleCBzaGFkZXIgaWYgdGhlcmUgaXMgb25lXG4gICAgICAgIGlmICh2ZXJ0U3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnZlcnRleFN0cmluZyA9IHZlcnRTdHJpbmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBMb2FkIGZyYWdtZW50IHNoYWRlciBpZiB0aGVyZSBpcyBvbmVcbiAgICAgICAgaWYgKGZyYWdTdHJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuZnJhZ21lbnRTdHJpbmcgPSBmcmFnU3RyaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hbmltYXRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5EZWx0YSA9ICh0aGlzLmZyYWdtZW50U3RyaW5nLm1hdGNoKC91X2RlbHRhL2cpIHx8IFtdKS5sZW5ndGg7XG4gICAgICAgIHRoaXMublRpbWUgPSAodGhpcy5mcmFnbWVudFN0cmluZy5tYXRjaCgvdV90aW1lL2cpIHx8IFtdKS5sZW5ndGg7XG4gICAgICAgIHRoaXMubkRhdGUgPSAodGhpcy5mcmFnbWVudFN0cmluZy5tYXRjaCgvdV9kYXRlL2cpIHx8IFtdKS5sZW5ndGg7XG4gICAgICAgIHRoaXMubk1vdXNlID0gKHRoaXMuZnJhZ21lbnRTdHJpbmcubWF0Y2goL3VfbW91c2UvZykgfHwgW10pLmxlbmd0aDtcbiAgICAgICAgdGhpcy5hbmltYXRlZCA9IHRoaXMubkRhdGUgPiAxIHx8IHRoaXMublRpbWUgPiAxIHx8IHRoaXMubk1vdXNlID4gMTtcblxuICAgICAgICBsZXQgblRleHR1cmVzID0gdGhpcy5mcmFnbWVudFN0cmluZy5zZWFyY2goL3NhbXBsZXIyRC9nKTtcbiAgICAgICAgaWYgKG5UZXh0dXJlcykge1xuICAgICAgICAgICAgbGV0IGxpbmVzID0gdGhpcy5mcmFnbWVudFN0cmluZy5zcGxpdCgnXFxuJyk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoID0gbGluZXNbaV0ubWF0Y2goL3VuaWZvcm1cXHMqc2FtcGxlcjJEXFxzKihbXFx3XSopO1xccypcXC9cXC9cXHMqKFtcXHd8XFw6XFwvXFwvfFxcLnxcXC18XFxfXSopL2kpO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXh0ID0gbWF0Y2hbMl0uc3BsaXQoJy4nKS5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoWzFdICYmICBtYXRjaFsyXSAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgIChleHQgPT09ICdqcGcnIHx8IGV4dCA9PT0gJ0pQRycgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICBleHQgPT09ICdqcGVnJyB8fCBleHQgPT09ICdKUEVHJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgIGV4dCA9PT0gJ3BuZycgfHwgZXh0ID09PSAnUE5HJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VW5pZm9ybShtYXRjaFsxXSwgbWF0Y2hbMl0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBtYWluID0gbGluZXNbaV0ubWF0Y2goL1xccyp2b2lkXFxzKm1haW5cXHMqL2cpO1xuICAgICAgICAgICAgICAgIGlmIChtYWluKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB2ZXJ0ZXhTaGFkZXIgPSBjcmVhdGVTaGFkZXIodGhpcywgdGhpcy52ZXJ0ZXhTdHJpbmcsIHRoaXMuZ2wuVkVSVEVYX1NIQURFUik7XG4gICAgICAgIGxldCBmcmFnbWVudFNoYWRlciA9IGNyZWF0ZVNoYWRlcih0aGlzLCB0aGlzLmZyYWdtZW50U3RyaW5nLCB0aGlzLmdsLkZSQUdNRU5UX1NIQURFUik7XG5cbiAgICAgICAgLy8gSWYgRnJhZ21lbnQgc2hhZGVyIGZhaWxzIGxvYWQgYSBlbXB0eSBvbmUgdG8gc2lnbiB0aGUgZXJyb3JcbiAgICAgICAgaWYgKCFmcmFnbWVudFNoYWRlcikge1xuICAgICAgICAgICAgZnJhZ21lbnRTaGFkZXIgPSBjcmVhdGVTaGFkZXIodGhpcywgJ3ZvaWQgbWFpbigpe1xcblxcdGdsX0ZyYWdDb2xvciA9IHZlYzQoMS4wKTtcXG59JywgdGhpcy5nbC5GUkFHTUVOVF9TSEFERVIpO1xuICAgICAgICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlzVmFsaWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIGFuZCB1c2UgcHJvZ3JhbVxuICAgICAgICBsZXQgcHJvZ3JhbSA9IGNyZWF0ZVByb2dyYW0odGhpcywgW3ZlcnRleFNoYWRlciwgZnJhZ21lbnRTaGFkZXJdKTsvLywgWzAsMV0sWydhX3RleGNvb3JkJywnYV9wb3NpdGlvbiddKTtcbiAgICAgICAgdGhpcy5nbC51c2VQcm9ncmFtKHByb2dyYW0pO1xuXG4gICAgICAgIC8vIERlbGV0ZSBzaGFkZXJzXG4gICAgICAgIC8vIHRoaXMuZ2wuZGV0YWNoU2hhZGVyKHByb2dyYW0sIHZlcnRleFNoYWRlcik7XG4gICAgICAgIC8vIHRoaXMuZ2wuZGV0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcbiAgICAgICAgdGhpcy5nbC5kZWxldGVTaGFkZXIodmVydGV4U2hhZGVyKTtcbiAgICAgICAgdGhpcy5nbC5kZWxldGVTaGFkZXIoZnJhZ21lbnRTaGFkZXIpO1xuXG4gICAgICAgIHRoaXMucHJvZ3JhbSA9IHByb2dyYW07XG4gICAgICAgIHRoaXMuY2hhbmdlID0gdHJ1ZTtcblxuICAgICAgICAvLyBUcmlnZ2VyIGV2ZW50XG4gICAgICAgIHRoaXMudHJpZ2dlcignbG9hZCcsIHt9KTtcblxuICAgICAgICB0aGlzLmZvcmNlUmVuZGVyID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBsb2FkVGV4dHVyZSAobmFtZSwgdXJsRWxlbWVudE9yRGF0YSwgb3B0aW9ucykge1xuICAgICAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdXJsRWxlbWVudE9yRGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIG9wdGlvbnMudXJsID0gdXJsRWxlbWVudE9yRGF0YTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdXJsRWxlbWVudE9yRGF0YSA9PT0gJ29iamVjdCcgJiYgdXJsRWxlbWVudE9yRGF0YS5kYXRhICYmIHVybEVsZW1lbnRPckRhdGEud2lkdGggJiYgdXJsRWxlbWVudE9yRGF0YS5oZWlnaHQpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuZGF0YSA9IHVybEVsZW1lbnRPckRhdGEuZGF0YTtcbiAgICAgICAgICAgIG9wdGlvbnMud2lkdGggPSB1cmxFbGVtZW50T3JEYXRhLndpZHRoO1xuICAgICAgICAgICAgb3B0aW9ucy5oZWlnaHQgPSB1cmxFbGVtZW50T3JEYXRhLmhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdXJsRWxlbWVudE9yRGF0YSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuZWxlbWVudCA9IHVybEVsZW1lbnRPckRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50ZXh0dXJlc1tuYW1lXSkge1xuICAgICAgICAgICAgaWYgKHRoaXMudGV4dHVyZXNbbmFtZV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmVzW25hbWVdLmxvYWQob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlc1tuYW1lXS5vbignbG9hZGVkJywgKGFyZ3MpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JjZVJlbmRlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRleHR1cmVzW25hbWVdID0gbmV3IFRleHR1cmUodGhpcy5nbCwgbmFtZSwgb3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLnRleHR1cmVzW25hbWVdLm9uKCdsb2FkZWQnLCAoYXJncykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9yY2VSZW5kZXIgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgcmVmcmVzaFVuaWZvcm1zKCkge1xuICAgICAgICB0aGlzLnVuaWZvcm1zID0ge307XG4gICAgfVxuXG4gICAgc2V0VW5pZm9ybShuYW1lLCAuLi52YWx1ZSkge1xuICAgICAgICBsZXQgdSA9IHt9O1xuICAgICAgICB1W25hbWVdID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc2V0VW5pZm9ybXModSk7XG4gICAgfVxuXG4gICAgc2V0VW5pZm9ybXModW5pZm9ybXMpIHtcbiAgICAgICAgbGV0IHBhcnNlZCA9IHBhcnNlVW5pZm9ybXModW5pZm9ybXMpO1xuICAgICAgICAvLyBTZXQgZWFjaCB1bmlmb3JtXG4gICAgICAgIGZvciAobGV0IHUgaW4gcGFyc2VkKSB7XG4gICAgICAgICAgICBpZiAocGFyc2VkW3VdLnR5cGUgPT09ICdzYW1wbGVyMkQnKSB7XG4gICAgICAgICAgICAgICAgLy8gRm9yIHRleHR1cmVzLCB3ZSBuZWVkIHRvIHRyYWNrIHRleHR1cmUgdW5pdHMsIHNvIHdlIGhhdmUgYSBzcGVjaWFsIHNldHRlclxuICAgICAgICAgICAgICAgIC8vIHRoaXMudW5pZm9ybVRleHR1cmUocGFyc2VkW3VdLm5hbWUsIHBhcnNlZFt1XS52YWx1ZVswXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkVGV4dHVyZShwYXJzZWRbdV0ubmFtZSwgcGFyc2VkW3VdLnZhbHVlWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudW5pZm9ybShwYXJzZWRbdV0ubWV0aG9kLCBwYXJzZWRbdV0udHlwZSwgcGFyc2VkW3VdLm5hbWUsIHBhcnNlZFt1XS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JjZVJlbmRlciA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRNb3VzZShtb3VzZSkge1xuICAgICAgICAvLyBzZXQgdGhlIG1vdXNlIHVuaWZvcm1cbiAgICAgICAgbGV0IHJlY3QgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgaWYgKG1vdXNlICYmXG4gICAgICAgICAgICBtb3VzZS54ICYmIG1vdXNlLnggPj0gcmVjdC5sZWZ0ICYmIG1vdXNlLnggPD0gcmVjdC5yaWdodCAmJlxuICAgICAgICAgICAgbW91c2UueSAmJiBtb3VzZS55ID49IHJlY3QudG9wICYmIG1vdXNlLnkgPD0gcmVjdC5ib3R0b20pIHtcbiAgICAgICAgICAgIHRoaXMudW5pZm9ybSgnMmYnLCAndmVjMicsICd1X21vdXNlJywgbW91c2UueCAtIHJlY3QubGVmdCwgdGhpcy5jYW52YXMuaGVpZ2h0IC0gKG1vdXNlLnkgLSByZWN0LnRvcCkpO1xuICAgICAgICB9XG4gICAgfVxuXG5cdC8vIGV4OiBwcm9ncmFtLnVuaWZvcm0oJzNmJywgJ3Bvc2l0aW9uJywgeCwgeSwgeik7XG4gICAgdW5pZm9ybSAobWV0aG9kLCB0eXBlLCBuYW1lLCAuLi52YWx1ZSkgeyAvLyAndmFsdWUnIGlzIGEgbWV0aG9kLWFwcHJvcHJpYXRlIGFyZ3VtZW50cyBsaXN0XG4gICAgICAgIHRoaXMudW5pZm9ybXNbbmFtZV0gPSB0aGlzLnVuaWZvcm1zW25hbWVdIHx8IHt9O1xuICAgICAgICBsZXQgdW5pZm9ybSA9IHRoaXMudW5pZm9ybXNbbmFtZV07XG4gICAgICAgIGxldCBjaGFuZ2UgPSBpc0RpZmYodW5pZm9ybS52YWx1ZSwgdmFsdWUpO1xuICAgICAgICBpZiAoY2hhbmdlIHx8IHRoaXMuY2hhbmdlIHx8IHVuaWZvcm0ubG9jYXRpb24gPT09IHVuZGVmaW5lZCB8fCB1bmlmb3JtLnZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHVuaWZvcm0ubmFtZSA9IG5hbWU7XG4gICAgICAgICAgICB1bmlmb3JtLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB1bmlmb3JtLnR5cGUgPSB0eXBlO1xuICAgICAgICAgICAgdW5pZm9ybS5tZXRob2QgPSAndW5pZm9ybScgKyBtZXRob2Q7XG4gICAgICAgICAgICB1bmlmb3JtLmxvY2F0aW9uID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5wcm9ncmFtLCBuYW1lKTtcblxuICAgICAgICAgICAgdGhpcy5nbFt1bmlmb3JtLm1ldGhvZF0uYXBwbHkodGhpcy5nbCwgW3VuaWZvcm0ubG9jYXRpb25dLmNvbmNhdCh1bmlmb3JtLnZhbHVlKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmlmb3JtVGV4dHVyZShuYW1lLCB0ZXh0dXJlLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICh0aGlzLnRleHR1cmVzW25hbWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZFRleHR1cmUobmFtZSwgdGV4dHVyZSwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVuaWZvcm0oJzFpJywgJ3NhbXBsZXIyRCcsIG5hbWUsIHRoaXMudGV4dXJlSW5kZXgpO1xuICAgICAgICAgICAgdGhpcy50ZXh0dXJlc1tuYW1lXS5iaW5kKHRoaXMudGV4dXJlSW5kZXgpO1xuICAgICAgICAgICAgdGhpcy51bmlmb3JtKCcyZicsICd2ZWMyJywgbmFtZSArICdSZXNvbHV0aW9uJywgdGhpcy50ZXh0dXJlc1tuYW1lXS53aWR0aCwgdGhpcy50ZXh0dXJlc1tuYW1lXS5oZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy50ZXh1cmVJbmRleCsrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzaXplKCkge1xuICAgICAgICBpZiAodGhpcy53aWR0aCAhPT0gdGhpcy5jYW52YXMuY2xpZW50V2lkdGggfHxcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ICE9PSB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQpIHtcbiAgICAgICAgICAgIGxldCByZWFsVG9DU1NQaXhlbHMgPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuXG4gICAgICAgICAgICAvLyBMb29rdXAgdGhlIHNpemUgdGhlIGJyb3dzZXIgaXMgZGlzcGxheWluZyB0aGUgY2FudmFzIGluIENTUyBwaXhlbHNcbiAgICAgICAgICAgIC8vIGFuZCBjb21wdXRlIGEgc2l6ZSBuZWVkZWQgdG8gbWFrZSBvdXIgZHJhd2luZ2J1ZmZlciBtYXRjaCBpdCBpblxuICAgICAgICAgICAgLy8gZGV2aWNlIHBpeGVscy5cbiAgICAgICAgICAgIGxldCBkaXNwbGF5V2lkdGggPSBNYXRoLmZsb29yKHRoaXMuZ2wuY2FudmFzLmNsaWVudFdpZHRoICogcmVhbFRvQ1NTUGl4ZWxzKTtcbiAgICAgICAgICAgIGxldCBkaXNwbGF5SGVpZ2h0ID0gTWF0aC5mbG9vcih0aGlzLmdsLmNhbnZhcy5jbGllbnRIZWlnaHQgKiByZWFsVG9DU1NQaXhlbHMpO1xuXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgY2FudmFzIGlzIG5vdCB0aGUgc2FtZSBzaXplLlxuICAgICAgICAgICAgaWYgKHRoaXMuZ2wuY2FudmFzLndpZHRoICE9PSBkaXNwbGF5V2lkdGggfHxcbiAgICAgICAgICAgICAgICB0aGlzLmdsLmNhbnZhcy5oZWlnaHQgIT09IGRpc3BsYXlIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAvLyBNYWtlIHRoZSBjYW52YXMgdGhlIHNhbWUgc2l6ZVxuICAgICAgICAgICAgICAgIHRoaXMuZ2wuY2FudmFzLndpZHRoID0gZGlzcGxheVdpZHRoO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2wuY2FudmFzLmhlaWdodCA9IGRpc3BsYXlIZWlnaHQ7XG4gICAgICAgICAgICAgICAgLy8gU2V0IHRoZSB2aWV3cG9ydCB0byBtYXRjaFxuICAgICAgICAgICAgICAgIHRoaXMuZ2wudmlld3BvcnQoMCwgMCwgdGhpcy5nbC5jYW52YXMud2lkdGgsIHRoaXMuZ2wuY2FudmFzLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5nbC52aWV3cG9ydCgwLCAwLCB0aGlzLmdsLmRyYXdpbmdCdWZmZXJXaWR0aCwgdGhpcy5nbC5kcmF3aW5nQnVmZmVySGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIgKCkge1xuICAgICAgICB0aGlzLnZpc2libGUgPSBpc0NhbnZhc1Zpc2libGUodGhpcy5jYW52YXMpO1xuICAgICAgICBpZiAodGhpcy5mb3JjZVJlbmRlciB8fFxuICAgICAgICAgICAgKHRoaXMuYW5pbWF0ZWQgJiYgdGhpcy52aXNpYmxlICYmICEgdGhpcy5wYXVzZWQpKSB7XG5cbiAgICAgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIGxldCBub3cgPSBkYXRlLmdldFRpbWUoKTtcbiAgICAgICAgICAgIHRoaXMudGltZURlbHRhID0gIChub3cgLSB0aGlzLnRpbWVQcmV2KSAvIDEwMDAuMDtcbiAgICAgICAgICAgIHRoaXMudGltZVByZXYgPSBub3c7XG4gICAgICAgICAgICBpZiAodGhpcy5uRGVsdGEgPiAxKSB7XG4gICAgICAgICAgICAgICAgLy8gc2V0IHRoZSBkZWx0YSB0aW1lIHVuaWZvcm1cbiAgICAgICAgICAgICAgICB0aGlzLnVuaWZvcm0oJzFmJywgJ2Zsb2F0JywgJ3VfZGVsdGEnLCB0aGlzLnRpbWVEZWx0YSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm5UaW1lID4gMSApIHtcbiAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIGVsYXBzZWQgdGltZSB1bmlmb3JtXG4gICAgICAgICAgICAgICAgdGhpcy51bmlmb3JtKCcxZicsICdmbG9hdCcsICd1X3RpbWUnLCAobm93IC0gdGhpcy50aW1lTG9hZCkgLyAxMDAwLjApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5uRGF0ZSkge1xuICAgICAgICAgICAgICAgIC8vIFNldCBkYXRlIHVuaWZvcm06IHllYXIvbW9udGgvZGF5L3RpbWVfaW5fc2VjXG4gICAgICAgICAgICAgICAgdGhpcy51bmlmb3JtKCc0ZicsICdmbG9hdCcsICd1X2RhdGUnLCBkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCksIGRhdGUuZ2V0SG91cnMoKSozNjAwICsgZGF0ZS5nZXRNaW51dGVzKCkqNjAgKyBkYXRlLmdldFNlY29uZHMoKSArIGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgKiAwLjAwMSApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzZXQgdGhlIHJlc29sdXRpb24gdW5pZm9ybVxuICAgICAgICAgICAgdGhpcy51bmlmb3JtKCcyZicsICd2ZWMyJywgJ3VfcmVzb2x1dGlvbicsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICAgICAgICB0aGlzLnRleHVyZUluZGV4ID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IHRleCBpbiB0aGlzLnRleHR1cmVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bmlmb3JtVGV4dHVyZSh0ZXgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBEcmF3IHRoZSByZWN0YW5nbGUuXG4gICAgICAgICAgICB0aGlzLmdsLmRyYXdBcnJheXModGhpcy5nbC5UUklBTkdMRVMsIDAsIDYpO1xuXG4gICAgICAgICAgICAvLyBUcmlnZ2VyIGV2ZW50XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ3JlbmRlcicsIHt9KTtcblxuICAgICAgICAgICAgdGhpcy5jaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZm9yY2VSZW5kZXIgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBhdXNlICgpIHtcbiAgICAgICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHBsYXkgKCkge1xuICAgICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZlcnNpb24oKSB7XG4gICAgICAgIHJldHVybiAnMC4wLjE4JztcbiAgICB9XG59XG5cbndpbmRvdy5HbHNsQ2FudmFzID0gR2xzbENhbnZhcztcblxuZnVuY3Rpb24gbG9hZEFsbEdsc2xDYW52YXMoKSB7XG4gICAgdmFyIGxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdnbHNsQ2FudmFzJyk7XG4gICAgaWYgKGxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICB3aW5kb3cuZ2xzbENhbnZhc2VzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHNhbmRib3ggPSBuZXcgR2xzbENhbnZhcyhsaXN0W2ldKTtcbiAgICAgICAgICAgIGlmIChzYW5kYm94LmlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuZ2xzbENhbnZhc2VzLnB1c2goc2FuZGJveCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgIGxvYWRBbGxHbHNsQ2FudmFzKCk7XG59KTtcbiIsIi8vIFRleHR1cmUgbWFuYWdlbWVudFxuaW1wb3J0IHsgaXNQb3dlck9mMiwgaXNTYWZhcmkgfSBmcm9tICcuLi90b29scy9jb21tb24nO1xuaW1wb3J0IHsgc3Vic2NyaWJlTWl4aW4gfSBmcm9tICcuLi90b29scy9taXhpbic7XG5cbi8vIEdMIHRleHR1cmUgd3JhcHBlciBvYmplY3QgZm9yIGtlZXBpbmcgdHJhY2sgb2YgYSBnbG9iYWwgc2V0IG9mIHRleHR1cmVzLCBrZXllZCBieSBhIHVuaXF1ZSB1c2VyLWRlZmluZWQgbmFtZVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dHVyZSB7XG4gICAgY29uc3RydWN0b3IoZ2wsIG5hbWUsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdWJzY3JpYmVNaXhpbih0aGlzKTtcblxuICAgICAgICB0aGlzLmdsID0gZ2w7XG4gICAgICAgIHRoaXMudGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcbiAgICAgICAgaWYgKHRoaXMudGV4dHVyZSkge1xuICAgICAgICAgICAgdGhpcy52YWxpZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5iaW5kKCk7XG5cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5zb3VyY2UgPSBudWxsO1xuICAgICAgICB0aGlzLnNvdXJjZVR5cGUgPSBudWxsO1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBudWxsOyAvLyBhIFByb21pc2Ugb2JqZWN0IHRvIHRyYWNrIHRoZSBsb2FkaW5nIHN0YXRlIG9mIHRoaXMgdGV4dHVyZVxuXG4gICAgICAgIC8vIERlZmF1bHQgdG8gYSAxLXBpeGVsIGJsYWNrIHRleHR1cmUgc28gd2UgY2FuIHNhZmVseSByZW5kZXIgd2hpbGUgd2Ugd2FpdCBmb3IgYW4gaW1hZ2UgdG8gbG9hZFxuICAgICAgICAvLyBTZWU6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTk3MjIyNDcvd2ViZ2wtd2FpdC1mb3ItdGV4dHVyZS10by1sb2FkXG4gICAgICAgIHRoaXMuc2V0RGF0YSgxLCAxLCBuZXcgVWludDhBcnJheShbMCwgMCwgMCwgMjU1XSksIHsgZmlsdGVyaW5nOiAnbGluZWFyJyB9KTtcbiAgICAgICAgdGhpcy5zZXRGaWx0ZXJpbmcob3B0aW9ucy5maWx0ZXJpbmcpO1xuXG4gICAgICAgIHRoaXMubG9hZChvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvLyBEZXN0cm95IGEgc2luZ2xlIHRleHR1cmUgaW5zdGFuY2VcbiAgICBkZXN0cm95KCkge1xuICAgICAgICBpZiAoIXRoaXMudmFsaWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdsLmRlbGV0ZVRleHR1cmUodGhpcy50ZXh0dXJlKTtcbiAgICAgICAgdGhpcy50ZXh0dXJlID0gbnVsbDtcbiAgICAgICAgZGVsZXRlIHRoaXMuZGF0YTtcbiAgICAgICAgdGhpcy5kYXRhID0gbnVsbDtcbiAgICAgICAgdGhpcy52YWxpZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGJpbmQodW5pdCkge1xuICAgICAgICBpZiAoIXRoaXMudmFsaWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHVuaXQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBpZiAoVGV4dHVyZS5hY3RpdmVVbml0ICE9PSB1bml0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nbC5hY3RpdmVUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRTAgKyB1bml0KTtcbiAgICAgICAgICAgICAgICBUZXh0dXJlLmFjdGl2ZVVuaXQgPSB1bml0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChUZXh0dXJlLmFjdGl2ZVRleHR1cmUgIT09IHRoaXMudGV4dHVyZSkge1xuICAgICAgICAgICAgdGhpcy5nbC5iaW5kVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMudGV4dHVyZSk7XG4gICAgICAgICAgICBUZXh0dXJlLmFjdGl2ZVRleHR1cmUgPSB0aGlzLnRleHR1cmU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsb2FkKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBudWxsO1xuXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy51cmwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAodGhpcy51cmwgPT09IHVuZGVmaW5lZCB8fCBvcHRpb25zLnVybCAhPT0gdGhpcy51cmwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFVybChvcHRpb25zLnVybCwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5lbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnNldEVsZW1lbnQob3B0aW9ucy5lbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy53aWR0aCAmJiBvcHRpb25zLmhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKG9wdGlvbnMud2lkdGgsIG9wdGlvbnMuaGVpZ2h0LCBvcHRpb25zLmRhdGEsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2V0cyB0ZXh0dXJlIGZyb20gYW4gdXJsXG4gICAgc2V0VXJsKHVybCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGlmICghdGhpcy52YWxpZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cmwgPSB1cmw7IC8vIHNhdmUgVVJMIHJlZmVyZW5jZSAod2lsbCBiZSBvdmVyd3JpdHRlbiB3aGVuIGVsZW1lbnQgaXMgbG9hZGVkIGJlbG93KVxuICAgICAgICB0aGlzLnNvdXJjZSA9IHRoaXMudXJsO1xuICAgICAgICB0aGlzLnNvdXJjZVR5cGUgPSAndXJsJztcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBsZXQgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEVsZW1lbnQoaW1hZ2UsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVGV4dHVyZSAnJHt0aGlzLm5hbWV9JzogZmFpbGVkIHRvIGxvYWQgdXJsOiAnJHt0aGlzLnNvdXJjZX0nYCwgZSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpbWFnZS5vbmVycm9yID0gZSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gV2FybiBhbmQgcmVzb2x2ZSBvbiBlcnJvclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBUZXh0dXJlICcke3RoaXMubmFtZX0nOiBmYWlsZWQgdG8gbG9hZCB1cmw6ICcke3RoaXMuc291cmNlfSdgLCBlLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gU2FmYXJpIGhhcyBhIGJ1ZyBsb2FkaW5nIGRhdGEtVVJMIGltYWdlcyB3aXRoIENPUlMgZW5hYmxlZCwgc28gaXQgbXVzdCBiZSBkaXNhYmxlZCBpbiB0aGF0IGNhc2VcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xMjM5NzhcbiAgICAgICAgICAgIGlmICghKGlzU2FmYXJpKCkgJiYgdGhpcy5zb3VyY2Uuc2xpY2UoMCwgNSkgPT09ICdkYXRhOicpKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2UuY3Jvc3NPcmlnaW4gPSAnYW5vbnltb3VzJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gdGhpcy5zb3VyY2U7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5sb2FkaW5nO1xuICAgIH1cblxuICAgIC8vIFNldHMgdGV4dHVyZSB0byBhIHJhdyBpbWFnZSBidWZmZXJcbiAgICBzZXREYXRhKHdpZHRoLCBoZWlnaHQsIGRhdGEsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuc291cmNlID0gZGF0YTtcbiAgICAgICAgdGhpcy5zb3VyY2VUeXBlID0gJ2RhdGEnO1xuXG4gICAgICAgIHRoaXMudXBkYXRlKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnNldEZpbHRlcmluZyhvcHRpb25zKTtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSBQcm9taXNlLnJlc29sdmUodGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRpbmc7XG4gICAgfVxuXG4gICAgLy8gU2V0cyB0aGUgdGV4dHVyZSB0byB0cmFjayBhIGVsZW1lbnQgKGNhbnZhcy9pbWFnZSlcbiAgICBzZXRFbGVtZW50KGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IGVsID0gZWxlbWVudDtcblxuICAgICAgICAvLyBhIHN0cmluZyBlbGVtZW50IGlzIGludGVycGV0ZWQgYXMgYSBDU1Mgc2VsZWN0b3JcbiAgICAgICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxDYW52YXNFbGVtZW50IHx8XG4gICAgICAgICAgICBlbGVtZW50IGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCB8fFxuICAgICAgICAgICAgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxWaWRlb0VsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc291cmNlID0gZWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMuc291cmNlVHlwZSA9ICdlbGVtZW50JztcblxuICAgICAgICAgICAgdGhpcy51cGRhdGUob3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLnNldEZpbHRlcmluZyhvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBtc2cgPSBgdGhlICdlbGVtZW50JyBwYXJhbWV0ZXIgKFxcYGVsZW1lbnQ6ICR7SlNPTi5zdHJpbmdpZnkoZWwpfVxcYCkgbXVzdCBiZSBhIENTUyBgO1xuICAgICAgICAgICAgbXNnICs9IGBzZWxlY3RvciBzdHJpbmcsIG9yIGEgPGNhbnZhcz4sIDxpbWFnZT4gb3IgPHZpZGVvPiBvYmplY3RgO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFRleHR1cmUgJyR7dGhpcy5uYW1lfSc6ICR7bXNnfWAsIG9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nID0gUHJvbWlzZS5yZXNvbHZlKHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcy5sb2FkaW5nO1xuICAgIH1cblxuICAgIC8vIFVwbG9hZHMgY3VycmVudCBpbWFnZSBvciBidWZmZXIgdG8gdGhlIEdQVSAoY2FuIGJlIHVzZWQgdG8gdXBkYXRlIGFuaW1hdGVkIHRleHR1cmVzIG9uIHRoZSBmbHkpXG4gICAgdXBkYXRlKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBpZiAoIXRoaXMudmFsaWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYmluZCgpO1xuICAgICAgICB0aGlzLmdsLnBpeGVsU3RvcmVpKHRoaXMuZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgKG9wdGlvbnMuVU5QQUNLX0ZMSVBfWV9XRUJHTCA9PT0gZmFsc2UgPyBmYWxzZSA6IHRydWUpKTtcbiAgICAgICAgdGhpcy5nbC5waXhlbFN0b3JlaSh0aGlzLmdsLlVOUEFDS19QUkVNVUxUSVBMWV9BTFBIQV9XRUJHTCwgb3B0aW9ucy5VTlBBQ0tfUFJFTVVMVElQTFlfQUxQSEFfV0VCR0wgfHwgZmFsc2UpO1xuXG4gICAgICAgIC8vIEltYWdlIG9yIENhbnZhcyBlbGVtZW50XG4gICAgICAgIGlmICh0aGlzLnNvdXJjZVR5cGUgPT09ICdlbGVtZW50JyAmJlxuICAgICAgICAgICAgKHRoaXMuc291cmNlIGluc3RhbmNlb2YgSFRNTENhbnZhc0VsZW1lbnQgfHwgdGhpcy5zb3VyY2UgaW5zdGFuY2VvZiBIVE1MVmlkZW9FbGVtZW50IHx8XG4gICAgICAgICAgICAgICAgKHRoaXMuc291cmNlIGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCAmJiB0aGlzLnNvdXJjZS5jb21wbGV0ZSkpKSB7XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5zb3VyY2Uud2lkdGg7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuc291cmNlLmhlaWdodDtcbiAgICAgICAgICAgIHRoaXMuZ2wudGV4SW1hZ2UyRCh0aGlzLmdsLlRFWFRVUkVfMkQsIDAsIHRoaXMuZ2wuUkdCQSwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlVOU0lHTkVEX0JZVEUsIHRoaXMuc291cmNlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBSYXcgaW1hZ2UgYnVmZmVyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc291cmNlVHlwZSA9PT0gJ2RhdGEnKSB7XG4gICAgICAgICAgICB0aGlzLmdsLnRleEltYWdlMkQodGhpcy5nbC5URVhUVVJFXzJELCAwLCB0aGlzLmdsLlJHQkEsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAwLCB0aGlzLmdsLlJHQkEsIHRoaXMuZ2wuVU5TSUdORURfQllURSwgdGhpcy5zb3VyY2UpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHJpZ2dlcignbG9hZGVkJywgdGhpcyk7XG4gICAgfVxuXG4gICAgLy8gRGV0ZXJtaW5lcyBhcHByb3ByaWF0ZSBmaWx0ZXJpbmcgbW9kZVxuICAgIHNldEZpbHRlcmluZyAob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGlmICghdGhpcy52YWxpZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wb3dlck9mMiA9IGlzUG93ZXJPZjIodGhpcy53aWR0aCkgJiYgaXNQb3dlck9mMih0aGlzLmhlaWdodCk7XG4gICAgICAgIGxldCBkZWZ1YWx0RmlsdGVyID0gKHRoaXMucG93ZXJPZjIgPyAnbWlwbWFwJyA6ICdsaW5lYXInKTtcbiAgICAgICAgdGhpcy5maWx0ZXJpbmcgPSBvcHRpb25zLmZpbHRlcmluZyB8fCBkZWZ1YWx0RmlsdGVyO1xuXG4gICAgICAgIHZhciBnbCA9IHRoaXMuZ2w7XG4gICAgICAgIHRoaXMuYmluZCgpO1xuXG4gICAgICAgIC8vIEZvciBwb3dlci1vZi0yIHRleHR1cmVzLCB0aGUgZm9sbG93aW5nIHByZXNldHMgYXJlIGF2YWlsYWJsZTpcbiAgICAgICAgLy8gbWlwbWFwOiBsaW5lYXIgYmxlbmQgZnJvbSBuZWFyZXN0IG1pcFxuICAgICAgICAvLyBsaW5lYXI6IGxpbmVhciBibGVuZCBmcm9tIG9yaWdpbmFsIGltYWdlIChubyBtaXBzKVxuICAgICAgICAvLyBuZWFyZXN0OiBuZWFyZXN0IHBpeGVsIGZyb20gb3JpZ2luYWwgaW1hZ2UgKG5vIG1pcHMsICdibG9ja3knIGxvb2spXG4gICAgICAgIGlmICh0aGlzLnBvd2VyT2YyKSB7XG4gICAgICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBvcHRpb25zLlRFWFRVUkVfV1JBUF9TIHx8IChvcHRpb25zLnJlcGVhdCAmJiBnbC5SRVBFQVQpIHx8IGdsLkNMQU1QX1RPX0VER0UpO1xuICAgICAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgb3B0aW9ucy5URVhUVVJFX1dSQVBfVCB8fCAob3B0aW9ucy5yZXBlYXQgJiYgZ2wuUkVQRUFUKSB8fCBnbC5DTEFNUF9UT19FREdFKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyaW5nID09PSAnbWlwbWFwJykge1xuICAgICAgICAgICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5MSU5FQVJfTUlQTUFQX0xJTkVBUik7IC8vIFRPRE86IHVzZSB0cmlsaW5lYXIgZmlsdGVyaW5nIGJ5IGRlZnVhbHQgaW5zdGVhZD9cbiAgICAgICAgICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTElORUFSKTtcbiAgICAgICAgICAgICAgICBnbC5nZW5lcmF0ZU1pcG1hcChnbC5URVhUVVJFXzJEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZmlsdGVyaW5nID09PSAnbGluZWFyJykge1xuICAgICAgICAgICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5MSU5FQVIpO1xuICAgICAgICAgICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5MSU5FQVIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5maWx0ZXJpbmcgPT09ICduZWFyZXN0Jykge1xuICAgICAgICAgICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICAgICAgICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBXZWJHTCBoYXMgc3RyaWN0IHJlcXVpcmVtZW50cyBvbiBub24tcG93ZXItb2YtMiB0ZXh0dXJlczpcbiAgICAgICAgICAgIC8vIE5vIG1pcG1hcHMgYW5kIG11c3QgY2xhbXAgdG8gZWRnZVxuICAgICAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyaW5nID09PSAnbWlwbWFwJykge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyaW5nID0gJ2xpbmVhcic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlcmluZyA9PT0gJ25lYXJlc3QnKSB7XG4gICAgICAgICAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgICAgICAgICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgeyAvLyBkZWZhdWx0IHRvIGxpbmVhciBmb3Igbm9uLXBvd2VyLW9mLTIgdGV4dHVyZXNcbiAgICAgICAgICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTElORUFSKTtcbiAgICAgICAgICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTElORUFSKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gUmVwb3J0IG1heCB0ZXh0dXJlIHNpemUgZm9yIGEgR0wgY29udGV4dFxuVGV4dHVyZS5nZXRNYXhUZXh0dXJlU2l6ZSA9IGZ1bmN0aW9uIChnbCkge1xuICAgIHJldHVybiBnbC5nZXRQYXJhbWV0ZXIoZ2wuTUFYX1RFWFRVUkVfU0laRSk7XG59O1xuXG4vLyBHbG9iYWwgc2V0IG9mIHRleHR1cmVzLCBieSBuYW1lXG5UZXh0dXJlLmFjdGl2ZVVuaXQgPSAtMTtcbiIsImxldCBsYXN0RXJyb3IgPSAnJztcblxuLyoqXG4gKiBDcmVhdGVzIHRoZSBIVExNIGZvciBhIGZhaWx1cmUgbWVzc2FnZVxuICogQHBhcmFtIHtzdHJpbmd9IGNhbnZhc0NvbnRhaW5lcklkIGlkIG9mIGNvbnRhaW5lciBvZiB0aFxuICogICAgICAgIGNhbnZhcy5cbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGh0bWwuXG4gKi9cbmZ1bmN0aW9uIG1ha2VGYWlsSFRNTChtc2cpIHtcbiAgICByZXR1cm4gYFxuPHRhYmxlIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogIzhDRTsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTtcIj48dHI+XG48dGQgYWxpZ249XCJjZW50ZXJcIj5cbjxkaXYgc3R5bGU9XCJkaXNwbGF5OiB0YWJsZS1jZWxsOyB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1wiPlxuPGRpdiBzdHlsZT1cIlwiPmAgKyBtc2cgKyBgPC9kaXY+XG48L2Rpdj5cbjwvdGQ+PC90cj48L3RhYmxlPlxuYDtcbn1cblxuLyoqXG4gKiBNZXNhc2dlIGZvciBnZXR0aW5nIGEgd2ViZ2wgYnJvd3NlclxuICogQHR5cGUge3N0cmluZ31cbiAqL1xubGV0IEdFVF9BX1dFQkdMX0JST1dTRVIgPSBgXG5cdFRoaXMgcGFnZSByZXF1aXJlcyBhIGJyb3dzZXIgdGhhdCBzdXBwb3J0cyBXZWJHTC48YnIvPlxuXHQ8YSBocmVmPVwiaHR0cDovL2dldC53ZWJnbC5vcmdcIj5DbGljayBoZXJlIHRvIHVwZ3JhZGUgeW91ciBicm93c2VyLjwvYT5cbmA7XG5cbi8qKlxuICogTWVzYXNnZSBmb3IgbmVlZCBiZXR0ZXIgaGFyZHdhcmVcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbmxldCBPVEhFUl9QUk9CTEVNID0gYFxuXHRJdCBkb2VzIG5vdCBhcHBlYXIgeW91ciBjb21wdXRlciBjYW4gc3VwcG9ydCBXZWJHTC48YnIvPlxuXHQ8YSBocmVmPVwiaHR0cDovL2dldC53ZWJnbC5vcmcvdHJvdWJsZXNob290aW5nL1wiPkNsaWNrIGhlcmUgZm9yIG1vcmUgaW5mb3JtYXRpb24uPC9hPlxuYDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgd2ViZ2wgY29udGV4dC4gSWYgY3JlYXRpb24gZmFpbHMgaXQgd2lsbFxuICogY2hhbmdlIHRoZSBjb250ZW50cyBvZiB0aGUgY29udGFpbmVyIG9mIHRoZSA8Y2FudmFzPlxuICogdGFnIHRvIGFuIGVycm9yIG1lc3NhZ2Ugd2l0aCB0aGUgY29ycmVjdCBsaW5rcyBmb3IgV2ViR0wuXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGNhbnZhcy4gVGhlIGNhbnZhcyBlbGVtZW50IHRvIGNyZWF0ZSBhXG4gKiAgICAgY29udGV4dCBmcm9tLlxuICogQHBhcmFtIHtXZWJHTENvbnRleHRDcmVhdGlvbkF0dGlyYnV0ZXN9IG9wdEF0dHJpYnMgQW55XG4gKiAgICAgY3JlYXRpb24gYXR0cmlidXRlcyB5b3Ugd2FudCB0byBwYXNzIGluLlxuICogQHJldHVybiB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBUaGUgY3JlYXRlZCBjb250ZXh0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBXZWJHTCAoY2FudmFzLCBvcHRBdHRyaWJzKSB7XG4gICAgZnVuY3Rpb24gc2hvd0xpbmsoc3RyKSB7XG4gICAgICAgIGxldCBjb250YWluZXIgPSBjYW52YXMucGFyZW50Tm9kZTtcbiAgICAgICAgaWYgKGNvbnRhaW5lcikge1xuICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IG1ha2VGYWlsSFRNTChzdHIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF3aW5kb3cuV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XG4gICAgICAgIHNob3dMaW5rKEdFVF9BX1dFQkdMX0JST1dTRVIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgY29udGV4dCA9IGNyZWF0ZTNEQ29udGV4dChjYW52YXMsIG9wdEF0dHJpYnMpO1xuICAgIGlmICghY29udGV4dCkge1xuICAgICAgICBzaG93TGluayhPVEhFUl9QUk9CTEVNKTtcbiAgICB9XG4gICAgY29udGV4dC5nZXRFeHRlbnNpb24oJ09FU19zdGFuZGFyZF9kZXJpdmF0aXZlcycpO1xuICAgIHJldHVybiBjb250ZXh0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSB3ZWJnbCBjb250ZXh0LlxuICogQHBhcmFtIHshQ2FudmFzfSBjYW52YXMgVGhlIGNhbnZhcyB0YWcgdG8gZ2V0IGNvbnRleHRcbiAqICAgICBmcm9tLiBJZiBvbmUgaXMgbm90IHBhc3NlZCBpbiBvbmUgd2lsbCBiZSBjcmVhdGVkLlxuICogQHJldHVybiB7IVdlYkdMQ29udGV4dH0gVGhlIGNyZWF0ZWQgY29udGV4dC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZTNEQ29udGV4dChjYW52YXMsIG9wdEF0dHJpYnMpIHtcbiAgICBsZXQgbmFtZXMgPSBbJ3dlYmdsJywgJ2V4cGVyaW1lbnRhbC13ZWJnbCddO1xuICAgIGxldCBjb250ZXh0ID0gbnVsbDtcbiAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgbmFtZXMubGVuZ3RoOyArK2lpKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQobmFtZXNbaWldLCBvcHRBdHRyaWJzKTtcbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICBpZiAoY29udGV4dCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb250ZXh0O1xufVxuXG4vKlxuICpcdENyZWF0ZSBhIFZlcnRleCBvZiBhIHNwZWNpZmljIHR5cGUgKGdsLlZFUlRFWF9TSEFERVIvKVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2hhZGVyKG1haW4sIHNvdXJjZSwgdHlwZSkge1xuICAgIGxldCBnbCA9IG1haW4uZ2w7XG5cbiAgICBsZXQgc2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKHR5cGUpO1xuICAgIGdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHNvdXJjZSk7XG4gICAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xuXG4gICAgbGV0IGNvbXBpbGVkID0gZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpO1xuXG4gICAgaWYgKCFjb21waWxlZCkge1xuICAgICAgICAvLyBTb21ldGhpbmcgd2VudCB3cm9uZyBkdXJpbmcgY29tcGlsYXRpb247IGdldCB0aGUgZXJyb3JcbiAgICAgICAgbGFzdEVycm9yID0gZ2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpO1xuICAgICAgICBjb25zb2xlLmVycm9yKCcqKiogRXJyb3IgY29tcGlsaW5nIHNoYWRlciAnICsgc2hhZGVyICsgJzonICsgbGFzdEVycm9yKTtcbiAgICAgICAgbWFpbi50cmlnZ2VyKCdlcnJvcicsIHsgc2hhZGVyOiBzaGFkZXIsIHNvdXJjZTogc291cmNlLCB0eXBlOiB0eXBlLCBlcnJvcjogbGFzdEVycm9yIH0pO1xuICAgICAgICBnbC5kZWxldGVTaGFkZXIoc2hhZGVyKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNoYWRlcjtcbn1cblxuLyoqXG4gKiBMb2FkcyBhIHNoYWRlci5cbiAqIEBwYXJhbSB7IVdlYkdMQ29udGV4dH0gZ2wgVGhlIFdlYkdMQ29udGV4dCB0byB1c2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gc2hhZGVyU291cmNlIFRoZSBzaGFkZXIgc291cmNlLlxuICogQHBhcmFtIHtudW1iZXJ9IHNoYWRlclR5cGUgVGhlIHR5cGUgb2Ygc2hhZGVyLlxuICogQHBhcmFtIHtmdW5jdGlvbihzdHJpbmcpOiB2b2lkKSBvcHRfZXJyb3JDYWxsYmFjayBjYWxsYmFjayBmb3IgZXJyb3JzLlxuICogQHJldHVybiB7IVdlYkdMU2hhZGVyfSBUaGUgY3JlYXRlZCBzaGFkZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm9ncmFtKG1haW4sIHNoYWRlcnMsIG9wdEF0dHJpYnMsIG9wdExvY2F0aW9ucykge1xuICAgIGxldCBnbCA9IG1haW4uZ2w7XG5cbiAgICBsZXQgcHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcbiAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgc2hhZGVycy5sZW5ndGg7ICsraWkpIHtcbiAgICAgICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHNoYWRlcnNbaWldKTtcbiAgICB9XG4gICAgaWYgKG9wdEF0dHJpYnMpIHtcbiAgICAgICAgZm9yIChsZXQgaWkgPSAwOyBpaSA8IG9wdEF0dHJpYnMubGVuZ3RoOyArK2lpKSB7XG4gICAgICAgICAgICBnbC5iaW5kQXR0cmliTG9jYXRpb24oXG4gICAgICAgICAgICBwcm9ncmFtLFxuICAgICAgICAgICAgb3B0TG9jYXRpb25zID8gb3B0TG9jYXRpb25zW2lpXSA6IGlpLFxuICAgICAgICAgICAgb3B0QXR0cmlic1tpaV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdsLmxpbmtQcm9ncmFtKHByb2dyYW0pO1xuXG4gICAgLy8gQ2hlY2sgdGhlIGxpbmsgc3RhdHVzXG4gICAgbGV0IGxpbmtlZCA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpO1xuICAgIGlmICghbGlua2VkKSB7XG4gICAgICAgIC8vIHNvbWV0aGluZyB3ZW50IHdyb25nIHdpdGggdGhlIGxpbmtcbiAgICAgICAgbGFzdEVycm9yID0gZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cocHJvZ3JhbSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBpbiBwcm9ncmFtIGxpbmtpbmc6JyArIGxhc3RFcnJvcik7XG4gICAgICAgIGdsLmRlbGV0ZVByb2dyYW0ocHJvZ3JhbSk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gcHJvZ3JhbTtcbn1cblxuLy8gQnkgQnJldHQgQ2FtYmVyIG9uXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGFuZ3JhbXMvdGFuZ3JhbS9ibG9iL21hc3Rlci9zcmMvZ2wvZ2xzbC5qc1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVW5pZm9ybXModW5pZm9ybXMsIHByZWZpeCA9IG51bGwpIHtcbiAgICBsZXQgcGFyc2VkID0gW107XG5cbiAgICBmb3IgKGxldCBuYW1lIGluIHVuaWZvcm1zKSB7XG4gICAgICAgIGxldCB1bmlmb3JtID0gdW5pZm9ybXNbbmFtZV07XG4gICAgICAgIGxldCB1O1xuXG4gICAgICAgIGlmIChwcmVmaXgpIHtcbiAgICAgICAgICAgIG5hbWUgPSBwcmVmaXggKyAnLicgKyBuYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2luZ2xlIGZsb2F0XG4gICAgICAgIGlmICh0eXBlb2YgdW5pZm9ybSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHBhcnNlZC5wdXNoKHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnZmxvYXQnLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogJzFmJyxcbiAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB1bmlmb3JtXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBcnJheTogdmVjdG9yLCBhcnJheSBvZiBmbG9hdHMsIGFycmF5IG9mIHRleHR1cmVzLCBvciBhcnJheSBvZiBzdHJ1Y3RzXG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodW5pZm9ybSkpIHtcbiAgICAgICAgICAgIC8vIE51bWVyaWMgdmFsdWVzXG4gICAgICAgICAgICBpZiAodHlwZW9mIHVuaWZvcm1bMF0gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgLy8gZmxvYXQgdmVjdG9ycyAodmVjMiwgdmVjMywgdmVjNClcbiAgICAgICAgICAgICAgICBpZiAodW5pZm9ybS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2Zsb2F0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJzFmJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdW5pZm9ybVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZmxvYXQgdmVjdG9ycyAodmVjMiwgdmVjMywgdmVjNClcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh1bmlmb3JtLmxlbmd0aCA+PSAyICYmIHVuaWZvcm0ubGVuZ3RoIDw9IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3ZlYycgKyB1bmlmb3JtLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogdW5pZm9ybS5sZW5ndGggKyAnZnYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB1bmlmb3JtXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBmbG9hdCBhcnJheVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVuaWZvcm0ubGVuZ3RoID4gNCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJzZWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZmxvYXRbXScsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICcxZnYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZSArICdbMF0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHVuaWZvcm1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFRPRE86IGFzc3VtZSBtYXRyaXggZm9yICh0eXBlb2YgPT0gRmxvYXQzMkFycmF5ICYmIGxlbmd0aCA9PSAxNik/XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBcnJheSBvZiB0ZXh0dXJlc1xuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHVuaWZvcm1bMF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcGFyc2VkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc2FtcGxlcjJEJyxcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnMWknLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdW5pZm9ybVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQXJyYXkgb2YgYXJyYXlzIC0gYnV0IG9ubHkgYXJyYXlzIG9mIHZlY3RvcnMgYXJlIGFsbG93ZWQgaW4gdGhpcyBjYXNlXG4gICAgICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHVuaWZvcm1bMF0pICYmIHR5cGVvZiB1bmlmb3JtWzBdWzBdID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIC8vIGZsb2F0IHZlY3RvcnMgKHZlYzIsIHZlYzMsIHZlYzQpXG4gICAgICAgICAgICAgICAgaWYgKHVuaWZvcm1bMF0ubGVuZ3RoID49IDIgJiYgdW5pZm9ybVswXS5sZW5ndGggPD0gNCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgZWFjaCB2ZWN0b3IgaW4gdGhlIGFycmF5XG4gICAgICAgICAgICAgICAgICAgIGZvciAodSA9IDA7IHUgPCB1bmlmb3JtLmxlbmd0aDsgdSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3ZlYycgKyB1bmlmb3JtWzBdLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IHVuaWZvcm1bdV0ubGVuZ3RoICsgJ2Z2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lICsgJ1snICsgdSArICddJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdW5pZm9ybVt1XVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZWxzZSBlcnJvcj9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEFycmF5IG9mIHN0cnVjdHVyZXNcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB1bmlmb3JtWzBdID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGZvciAodSA9IDA7IHUgPCB1bmlmb3JtLmxlbmd0aDsgdSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCBlYWNoIHN0cnVjdCBpbiB0aGUgYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkLnB1c2goLi4ucGFyc2VVbmlmb3Jtcyh1bmlmb3JtW3VdLCBuYW1lICsgJ1snICsgdSArICddJykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBCb29sZWFuXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB1bmlmb3JtID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIHBhcnNlZC5wdXNoKHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYm9vbCcsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnMWknLFxuICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHVuaWZvcm1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRleHR1cmVcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHVuaWZvcm0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBwYXJzZWQucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3NhbXBsZXIyRCcsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnMWknLFxuICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHVuaWZvcm1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIFN0cnVjdHVyZVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdW5pZm9ybSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIC8vIFNldCBlYWNoIGZpZWxkIGluIHRoZSBzdHJ1Y3RcbiAgICAgICAgICAgIHBhcnNlZC5wdXNoKC4uLnBhcnNlVW5pZm9ybXModW5pZm9ybSwgbmFtZSkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRPRE86IHN1cHBvcnQgb3RoZXIgbm9uLWZsb2F0IHR5cGVzPyAoaW50LCBldGMuKVxuICAgIH1cbiAgICByZXR1cm4gcGFyc2VkO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGlzQ2FudmFzVmlzaWJsZShjYW52YXMpIHtcbiAgICByZXR1cm5cdCgoY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIGNhbnZhcy5oZWlnaHQpID4gMCkgJiZcbiAgICAgICAgKGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPCAod2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUG93ZXJPZjIodmFsdWUpIHtcbiAgICByZXR1cm4gKHZhbHVlICYgKHZhbHVlIC0gMSkpID09PSAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTYWZhcmkgKCkge1xuICAgIHJldHVybiAvXigoPyFjaHJvbWV8YW5kcm9pZCkuKSpzYWZhcmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5leHRIaWdoZXN0UG93ZXJPZlR3byh4KSB7XG4gICAgLS14O1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMzI7IGkgPDw9IDEpIHtcbiAgICAgICAgeCA9IHggfCB4ID4+IGk7XG4gICAgfVxuICAgIHJldHVybiB4ICsgMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZvcm1hdE51bWJlckxlbmd0aChudW0sIGxlbmd0aCkge1xuICAgIGxldCByID0gbnVtLnRvU3RyaW5nKCk7XG4gICAgd2hpbGUgKHIubGVuZ3RoIDwgbGVuZ3RoKSB7XG4gICAgICAgIHIgPSAnMCcgKyByO1xuICAgIH1cbiAgICByZXR1cm4gcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1vdXNlUG9zKGNhbnZhcywgZXZ0KSB7XG4gICAgbGV0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogZXZ0LmNsaWVudFggLSByZWN0LmxlZnQsXG4gICAgICAgIHk6IGV2dC5jbGllbnRZIC0gcmVjdC50b3BcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEaWZmKGEsIGIpIHtcbiAgICBpZiAoYSAmJiBiKSB7XG4gICAgICAgIHJldHVybiBhLnRvU3RyaW5nKCkgIT09IGIudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3Vic2NyaWJlTWl4aW4gKHRhcmdldCkge1xuICAgIHZhciBsaXN0ZW5lcnMgPSBuZXcgU2V0KCk7XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih0YXJnZXQsIHtcblxuICAgICAgICBzdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGxpc3RlbmVycy5hZGQobGlzdGVuZXIpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uKHR5cGUsIGYpIHtcbiAgICAgICAgICAgIGxldCBsaXN0ZW5lciA9IHt9O1xuICAgICAgICAgICAgbGlzdGVuZXJbdHlwZV0gPSBmO1xuICAgICAgICAgICAgbGlzdGVuZXJzLmFkZChsaXN0ZW5lcik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdW5zdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGxpc3RlbmVycy5kZWxldGUobGlzdGVuZXIpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVuc3Vic2NyaWJlQWxsKCkge1xuICAgICAgICAgICAgbGlzdGVuZXJzLmNsZWFyKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdHJpZ2dlcihldmVudCwgLi4uZGF0YSkge1xuICAgICAgICAgICAgZm9yICh2YXIgbGlzdGVuZXIgb2YgbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcltldmVudF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJbZXZlbnRdKC4uLmRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHN1YnNjcmliZU1peGluICh0YXJnZXQpIHtcbiAgICB2YXIgbGlzdGVuZXJzID0gbmV3IFNldCgpO1xuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24odGFyZ2V0LCB7XG5cbiAgICAgICAgb24odHlwZSwgZikge1xuICAgICAgICAgICAgbGV0IGxpc3RlbmVyID0ge307XG4gICAgICAgICAgICBsaXN0ZW5lclt0eXBlXSA9IGY7XG4gICAgICAgICAgICBsaXN0ZW5lcnMuYWRkKGxpc3RlbmVyKTtcbiAgICAgICAgfSxcblxuICAgICAgICBvZmYodHlwZSwgZikge1xuICAgICAgICAgICAgaWYgKGYpIHtcbiAgICAgICAgICAgICAgICBsZXQgbGlzdGVuZXIgPSB7fTtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lclt0eXBlXSA9IGY7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzLmRlbGV0ZShsaXN0ZW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGxpc3RlbmVycykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IHR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuZGVsZXRlKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBsaXN0U3Vic2NyaXB0aW9ucygpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBsaXN0ZW5lcnMuYWRkKGxpc3RlbmVyKTtcbiAgICAgICAgfSxcblxuICAgICAgICB1bnN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgICAgICAgICAgbGlzdGVuZXJzLmRlbGV0ZShsaXN0ZW5lcik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdW5zdWJzY3JpYmVBbGwoKSB7XG4gICAgICAgICAgICBsaXN0ZW5lcnMuY2xlYXIoKTtcbiAgICAgICAgfSxcblxuICAgICAgICB0cmlnZ2VyKGV2ZW50LCAuLi5kYXRhKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBsaXN0ZW5lciBvZiBsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGxpc3RlbmVyW2V2ZW50XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcltldmVudF0oLi4uZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG4iXX0=
