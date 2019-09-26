webpackHotUpdate("static/development/pages/index.js",{

/***/ "./src/components/character-card/index.tsx":
/*!*************************************************!*\
  !*** ./src/components/character-card/index.tsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_lazy_load_image_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-lazy-load-image-component */ "./node_modules/react-lazy-load-image-component/build/index.js");
/* harmony import */ var react_lazy_load_image_component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_lazy_load_image_component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _index_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.module.css */ "./src/components/character-card/index.module.css");
/* harmony import */ var _index_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_index_module_css__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/home/mq/Documents/rick-and-morty/src/components/character-card/index.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




var CharacterCard = function CharacterCard(props) {
  var name = props.name,
      image = props.image,
      status = props.status;
  return __jsx("div", {
    className: _index_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.card,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, __jsx(react_lazy_load_image_component__WEBPACK_IMPORTED_MODULE_1__["LazyLoadImage"], {
    className: _index_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.image,
    src: image,
    alt: "",
    delayTime: 400,
    effect: "blur",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }), __jsx("h4", {
    className: _index_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.title,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }, name), status === 'Dead' ? __jsx("span", {
    className: _index_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.dead,
    title: status,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }) : null);
};

/* harmony default export */ __webpack_exports__["default"] = (CharacterCard);

/***/ })

})
//# sourceMappingURL=index.js.6a2fe6fe78359dbe6323.hot-update.js.map