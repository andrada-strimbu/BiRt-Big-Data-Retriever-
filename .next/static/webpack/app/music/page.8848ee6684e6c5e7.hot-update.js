"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/music/page",{

/***/ "(app-pages-browser)/./src/app/music/page.js":
/*!*******************************!*\
  !*** ./src/app/music/page.js ***!
  \*******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_sparql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/sparql */ \"(app-pages-browser)/./src/lib/sparql.js\");\n/* harmony import */ var _utils_queries__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/queries */ \"(app-pages-browser)/./src/utils/queries.js\");\n/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3 */ \"(app-pages-browser)/./node_modules/d3/src/index.js\");\n/* harmony import */ var _components_DataTable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/DataTable */ \"(app-pages-browser)/./src/components/DataTable.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nconst MusicPage = ()=>{\n    _s();\n    const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"MusicPage.useEffect\": ()=>{\n            const fetchData = {\n                \"MusicPage.useEffect.fetchData\": async ()=>{\n                    setLoading(true);\n                    try {\n                        const results = await (0,_lib_sparql__WEBPACK_IMPORTED_MODULE_2__.fetchSPARQLData)(_utils_queries__WEBPACK_IMPORTED_MODULE_3__.MUSIC_INFLUENCES_QUERY);\n                        setData(results);\n                    } catch (error) {\n                        console.error(error);\n                    }\n                    setLoading(false);\n                }\n            }[\"MusicPage.useEffect.fetchData\"];\n            fetchData();\n        }\n    }[\"MusicPage.useEffect\"], []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"MusicPage.useEffect\": ()=>{\n            if (data) {\n                drawChart(data);\n            }\n        }\n    }[\"MusicPage.useEffect\"], [\n        data\n    ]);\n    const drawChart = (data)=>{\n        // Dimensiunile graficului\n        const width = 1000;\n        const height = 400;\n        const margin = {\n            top: 20,\n            right: 20,\n            bottom: 60,\n            left: 40\n        };\n        // Crează SVG\n        const svg = d3__WEBPACK_IMPORTED_MODULE_4__.select('#music-chart').attr('width', width).attr('height', height);\n        // Extrage datele pentru stiluri muzicale și influențele lor\n        const genres = data.map((d)=>d.genreLabel.value);\n        const influences = data.map((d)=>d.influencedLabel.value.length); // Asigură-te că sunt valori numerice\n        // Crează scalele pentru axele X și Y\n        const xScale = d3__WEBPACK_IMPORTED_MODULE_4__.scaleBand().domain(genres).range([\n            margin.left,\n            width - margin.right\n        ]).padding(0.2); // Ajustează padding pentru a adăuga mai mult spațiu între coloane\n        const yScale = d3__WEBPACK_IMPORTED_MODULE_4__.scaleLinear().domain([\n            0,\n            d3__WEBPACK_IMPORTED_MODULE_4__.max(influences)\n        ]) // Asigură-te că valoarea maximă este corectă\n        .nice().range([\n            height - margin.bottom,\n            margin.top\n        ]);\n        // Adaugă axa X\n        svg.append('g').attr('class', 'x-axis').attr('transform', \"translate(0,\".concat(height - margin.bottom, \")\")).call(d3__WEBPACK_IMPORTED_MODULE_4__.axisBottom(xScale));\n        // Adaugă axa Y\n        svg.append('g').attr('class', 'y-axis').attr('transform', \"translate(\".concat(margin.left, \", 0)\")).call(d3__WEBPACK_IMPORTED_MODULE_4__.axisLeft(yScale));\n        // Creează barele pentru fiecare gen\n        svg.append('g').selectAll('.bar').data(influences).enter().append('rect').attr('class', 'bar').attr('x', (d, i)=>xScale(genres[i])) // Locația fiecărei bare pe axa X\n        .attr('y', (d)=>yScale(d)) // Înălțimea barei în funcție de influențe\n        .attr('width', xScale.bandwidth()) // Lățimea barei\n        .attr('height', (d)=>height - margin.bottom - yScale(d)) // Înălțimea corectă pe axa Y\n        .attr('fill', '#69b3a2');\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"Music Influences\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Andrada\\\\Documents\\\\GitHub\\\\ProiectProgramare\\\\BiRt-Big-Data-Retriever-\\\\src\\\\app\\\\music\\\\page.js\",\n                lineNumber: 93,\n                columnNumber: 7\n            }, undefined),\n            loading ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: \"Loading...\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Andrada\\\\Documents\\\\GitHub\\\\ProiectProgramare\\\\BiRt-Big-Data-Retriever-\\\\src\\\\app\\\\music\\\\page.js\",\n                lineNumber: 94,\n                columnNumber: 18\n            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_DataTable__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                data: data,\n                columns: [\n                    'artistLabel',\n                    'genreLabel',\n                    'influencedLabel'\n                ]\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Andrada\\\\Documents\\\\GitHub\\\\ProiectProgramare\\\\BiRt-Big-Data-Retriever-\\\\src\\\\app\\\\music\\\\page.js\",\n                lineNumber: 94,\n                columnNumber: 38\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"svg\", {\n                id: \"music-chart\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Andrada\\\\Documents\\\\GitHub\\\\ProiectProgramare\\\\BiRt-Big-Data-Retriever-\\\\src\\\\app\\\\music\\\\page.js\",\n                lineNumber: 97,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Andrada\\\\Documents\\\\GitHub\\\\ProiectProgramare\\\\BiRt-Big-Data-Retriever-\\\\src\\\\app\\\\music\\\\page.js\",\n        lineNumber: 92,\n        columnNumber: 5\n    }, undefined);\n};\n_s(MusicPage, \"24e4voY5QjKMKKMZ/dZquGelByo=\");\n_c = MusicPage;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MusicPage);\nvar _c;\n$RefreshReg$(_c, \"MusicPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvbXVzaWMvcGFnZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBRW1EO0FBQ0o7QUFDVTtBQUNoQztBQUNzQjtBQUUvQyxNQUFNTyxZQUFZOztJQUNoQixNQUFNLENBQUNDLE1BQU1DLFFBQVEsR0FBR1AsK0NBQVFBO0lBQ2hDLE1BQU0sQ0FBQ1EsU0FBU0MsV0FBVyxHQUFHVCwrQ0FBUUEsQ0FBQztJQUV2Q0QsZ0RBQVNBOytCQUFDO1lBQ1IsTUFBTVc7aURBQVk7b0JBQ2hCRCxXQUFXO29CQUNYLElBQUk7d0JBQ0YsTUFBTUUsVUFBVSxNQUFNViw0REFBZUEsQ0FBQ0Msa0VBQXNCQTt3QkFDNURLLFFBQVFJO29CQUNWLEVBQUUsT0FBT0MsT0FBTzt3QkFDZEMsUUFBUUQsS0FBSyxDQUFDQTtvQkFDaEI7b0JBQ0FILFdBQVc7Z0JBQ2I7O1lBQ0FDO1FBQ0Y7OEJBQUcsRUFBRTtJQUVMWCxnREFBU0E7K0JBQUM7WUFDUixJQUFJTyxNQUFNO2dCQUNSUSxVQUFVUjtZQUNaO1FBQ0Y7OEJBQUc7UUFBQ0E7S0FBSztJQUVULE1BQU1RLFlBQVksQ0FBQ1I7UUFDakIsMEJBQTBCO1FBQzFCLE1BQU1TLFFBQVE7UUFDZCxNQUFNQyxTQUFTO1FBQ2YsTUFBTUMsU0FBUztZQUFFQyxLQUFLO1lBQUlDLE9BQU87WUFBSUMsUUFBUTtZQUFJQyxNQUFNO1FBQUc7UUFFMUQsYUFBYTtRQUNiLE1BQU1DLE1BQU1uQixzQ0FDSCxDQUFDLGdCQUNQcUIsSUFBSSxDQUFDLFNBQVNULE9BQ2RTLElBQUksQ0FBQyxVQUFVUjtRQUVsQiw0REFBNEQ7UUFDNUQsTUFBTVMsU0FBU25CLEtBQUtvQixHQUFHLENBQUMsQ0FBQ0MsSUFBTUEsRUFBRUMsVUFBVSxDQUFDQyxLQUFLO1FBQ2pELE1BQU1DLGFBQWF4QixLQUFLb0IsR0FBRyxDQUFDLENBQUNDLElBQU1BLEVBQUVJLGVBQWUsQ0FBQ0YsS0FBSyxDQUFDRyxNQUFNLEdBQUkscUNBQXFDO1FBRTFHLHFDQUFxQztRQUNyQyxNQUFNQyxTQUFTOUIseUNBQ0gsR0FDVGdDLE1BQU0sQ0FBQ1YsUUFDUFcsS0FBSyxDQUFDO1lBQUNuQixPQUFPSSxJQUFJO1lBQUVOLFFBQVFFLE9BQU9FLEtBQUs7U0FBQyxFQUN6Q2tCLE9BQU8sQ0FBQyxNQUFPLGtFQUFrRTtRQUVwRixNQUFNQyxTQUFTbkMsMkNBQ0QsR0FDWGdDLE1BQU0sQ0FBQztZQUFDO1lBQUdoQyxtQ0FBTSxDQUFDMkI7U0FBWSxFQUFHLDZDQUE2QztTQUM5RVcsSUFBSSxHQUNKTCxLQUFLLENBQUM7WUFBQ3BCLFNBQVNDLE9BQU9HLE1BQU07WUFBRUgsT0FBT0MsR0FBRztTQUFDO1FBRTdDLGVBQWU7UUFDZkksSUFDR29CLE1BQU0sQ0FBQyxLQUNQbEIsSUFBSSxDQUFDLFNBQVMsVUFDZEEsSUFBSSxDQUFDLGFBQWEsZUFBc0MsT0FBdkJSLFNBQVNDLE9BQU9HLE1BQU0sRUFBQyxNQUN4RHVCLElBQUksQ0FBQ3hDLDBDQUFhLENBQUM4QjtRQUV0QixlQUFlO1FBQ2ZYLElBQ0dvQixNQUFNLENBQUMsS0FDUGxCLElBQUksQ0FBQyxTQUFTLFVBQ2RBLElBQUksQ0FBQyxhQUFhLGFBQXlCLE9BQVpQLE9BQU9JLElBQUksRUFBQyxTQUMzQ3NCLElBQUksQ0FBQ3hDLHdDQUFXLENBQUNtQztRQUVwQixvQ0FBb0M7UUFDcENoQixJQUNHb0IsTUFBTSxDQUFDLEtBQ1BJLFNBQVMsQ0FBQyxRQUNWeEMsSUFBSSxDQUFDd0IsWUFDTGlCLEtBQUssR0FDTEwsTUFBTSxDQUFDLFFBQ1BsQixJQUFJLENBQUMsU0FBUyxPQUNkQSxJQUFJLENBQUMsS0FBSyxDQUFDRyxHQUFHcUIsSUFBTWYsT0FBT1IsTUFBTSxDQUFDdUIsRUFBRSxHQUFJLGlDQUFpQztTQUN6RXhCLElBQUksQ0FBQyxLQUFLLENBQUNHLElBQU1XLE9BQU9YLElBQUssMENBQTBDO1NBQ3ZFSCxJQUFJLENBQUMsU0FBU1MsT0FBT2dCLFNBQVMsSUFBSyxnQkFBZ0I7U0FDbkR6QixJQUFJLENBQUMsVUFBVSxDQUFDRyxJQUFNWCxTQUFTQyxPQUFPRyxNQUFNLEdBQUdrQixPQUFPWCxJQUFLLDZCQUE2QjtTQUN4RkgsSUFBSSxDQUFDLFFBQVE7SUFDbEI7SUFFQSxxQkFDRSw4REFBQzBCOzswQkFDQyw4REFBQ0M7MEJBQUc7Ozs7OztZQUNIM0Msd0JBQVUsOERBQUM0QzswQkFBRTs7Ozs7MENBQWlCLDhEQUFDaEQsNkRBQVNBO2dCQUFDRSxNQUFNQTtnQkFBTStDLFNBQVM7b0JBQUM7b0JBQWU7b0JBQWM7aUJBQWtCOzs7Ozs7MEJBRy9HLDhEQUFDL0I7Z0JBQUlnQyxJQUFHOzs7Ozs7Ozs7Ozs7QUFHZDtHQTNGTWpEO0tBQUFBO0FBNkZOLGlFQUFlQSxTQUFTQSxFQUFDIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXEFuZHJhZGFcXERvY3VtZW50c1xcR2l0SHViXFxQcm9pZWN0UHJvZ3JhbWFyZVxcQmlSdC1CaWctRGF0YS1SZXRyaWV2ZXItXFxzcmNcXGFwcFxcbXVzaWNcXHBhZ2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnO1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGZldGNoU1BBUlFMRGF0YSB9IGZyb20gJ0AvbGliL3NwYXJxbCc7XHJcbmltcG9ydCB7IE1VU0lDX0lORkxVRU5DRVNfUVVFUlkgfSBmcm9tICdAL3V0aWxzL3F1ZXJpZXMnO1xyXG5pbXBvcnQgKiBhcyBkMyBmcm9tICdkMyc7XHJcbmltcG9ydCBEYXRhVGFibGUgZnJvbSAnQC9jb21wb25lbnRzL0RhdGFUYWJsZSc7XHJcblxyXG5jb25zdCBNdXNpY1BhZ2UgPSAoKSA9PiB7XHJcbiAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gdXNlU3RhdGUoKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGZldGNoRGF0YSA9IGFzeW5jICgpID0+IHtcclxuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgZmV0Y2hTUEFSUUxEYXRhKE1VU0lDX0lORkxVRU5DRVNfUVVFUlkpO1xyXG4gICAgICAgIHNldERhdGEocmVzdWx0cyk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgIH1cclxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICB9O1xyXG4gICAgZmV0Y2hEYXRhKCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKGRhdGEpIHtcclxuICAgICAgZHJhd0NoYXJ0KGRhdGEpO1xyXG4gICAgfVxyXG4gIH0sIFtkYXRhXSk7XHJcblxyXG4gIGNvbnN0IGRyYXdDaGFydCA9IChkYXRhKSA9PiB7XHJcbiAgICAvLyBEaW1lbnNpdW5pbGUgZ3JhZmljdWx1aVxyXG4gICAgY29uc3Qgd2lkdGggPSAxMDAwO1xyXG4gICAgY29uc3QgaGVpZ2h0ID0gNDAwO1xyXG4gICAgY29uc3QgbWFyZ2luID0geyB0b3A6IDIwLCByaWdodDogMjAsIGJvdHRvbTogNjAsIGxlZnQ6IDQwIH07XHJcblxyXG4gICAgLy8gQ3JlYXrEgyBTVkdcclxuICAgIGNvbnN0IHN2ZyA9IGQzXHJcbiAgICAgIC5zZWxlY3QoJyNtdXNpYy1jaGFydCcpXHJcbiAgICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoKVxyXG4gICAgICAuYXR0cignaGVpZ2h0JywgaGVpZ2h0KTtcclxuXHJcbiAgICAvLyBFeHRyYWdlIGRhdGVsZSBwZW50cnUgc3RpbHVyaSBtdXppY2FsZSDImWkgaW5mbHVlbsibZWxlIGxvclxyXG4gICAgY29uc3QgZ2VucmVzID0gZGF0YS5tYXAoKGQpID0+IGQuZ2VucmVMYWJlbC52YWx1ZSk7XHJcbiAgICBjb25zdCBpbmZsdWVuY2VzID0gZGF0YS5tYXAoKGQpID0+IGQuaW5mbHVlbmNlZExhYmVsLnZhbHVlLmxlbmd0aCk7ICAvLyBBc2lndXLEgy10ZSBjxIMgc3VudCB2YWxvcmkgbnVtZXJpY2VcclxuXHJcbiAgICAvLyBDcmVhesSDIHNjYWxlbGUgcGVudHJ1IGF4ZWxlIFggyJlpIFlcclxuICAgIGNvbnN0IHhTY2FsZSA9IGQzXHJcbiAgICAgIC5zY2FsZUJhbmQoKVxyXG4gICAgICAuZG9tYWluKGdlbnJlcylcclxuICAgICAgLnJhbmdlKFttYXJnaW4ubGVmdCwgd2lkdGggLSBtYXJnaW4ucmlnaHRdKVxyXG4gICAgICAucGFkZGluZygwLjIpOyAgLy8gQWp1c3RlYXrEgyBwYWRkaW5nIHBlbnRydSBhIGFkxIN1Z2EgbWFpIG11bHQgc3BhyJtpdSDDrm50cmUgY29sb2FuZVxyXG5cclxuICAgIGNvbnN0IHlTY2FsZSA9IGQzXHJcbiAgICAgIC5zY2FsZUxpbmVhcigpXHJcbiAgICAgIC5kb21haW4oWzAsIGQzLm1heChpbmZsdWVuY2VzKV0pICAvLyBBc2lndXLEgy10ZSBjxIMgdmFsb2FyZWEgbWF4aW3EgyBlc3RlIGNvcmVjdMSDXHJcbiAgICAgIC5uaWNlKClcclxuICAgICAgLnJhbmdlKFtoZWlnaHQgLSBtYXJnaW4uYm90dG9tLCBtYXJnaW4udG9wXSk7XHJcblxyXG4gICAgLy8gQWRhdWfEgyBheGEgWFxyXG4gICAgc3ZnXHJcbiAgICAgIC5hcHBlbmQoJ2cnKVxyXG4gICAgICAuYXR0cignY2xhc3MnLCAneC1heGlzJylcclxuICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoMCwke2hlaWdodCAtIG1hcmdpbi5ib3R0b219KWApXHJcbiAgICAgIC5jYWxsKGQzLmF4aXNCb3R0b20oeFNjYWxlKSk7XHJcblxyXG4gICAgLy8gQWRhdWfEgyBheGEgWVxyXG4gICAgc3ZnXHJcbiAgICAgIC5hcHBlbmQoJ2cnKVxyXG4gICAgICAuYXR0cignY2xhc3MnLCAneS1heGlzJylcclxuICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHttYXJnaW4ubGVmdH0sIDApYClcclxuICAgICAgLmNhbGwoZDMuYXhpc0xlZnQoeVNjYWxlKSk7XHJcblxyXG4gICAgLy8gQ3JlZWF6xIMgYmFyZWxlIHBlbnRydSBmaWVjYXJlIGdlblxyXG4gICAgc3ZnXHJcbiAgICAgIC5hcHBlbmQoJ2cnKVxyXG4gICAgICAuc2VsZWN0QWxsKCcuYmFyJylcclxuICAgICAgLmRhdGEoaW5mbHVlbmNlcylcclxuICAgICAgLmVudGVyKClcclxuICAgICAgLmFwcGVuZCgncmVjdCcpXHJcbiAgICAgIC5hdHRyKCdjbGFzcycsICdiYXInKVxyXG4gICAgICAuYXR0cigneCcsIChkLCBpKSA9PiB4U2NhbGUoZ2VucmVzW2ldKSkgIC8vIExvY2HIm2lhIGZpZWPEg3JlaSBiYXJlIHBlIGF4YSBYXHJcbiAgICAgIC5hdHRyKCd5JywgKGQpID0+IHlTY2FsZShkKSkgIC8vIMOObsSDbMibaW1lYSBiYXJlaSDDrm4gZnVuY8ibaWUgZGUgaW5mbHVlbsibZVxyXG4gICAgICAuYXR0cignd2lkdGgnLCB4U2NhbGUuYmFuZHdpZHRoKCkpICAvLyBMxIPIm2ltZWEgYmFyZWlcclxuICAgICAgLmF0dHIoJ2hlaWdodCcsIChkKSA9PiBoZWlnaHQgLSBtYXJnaW4uYm90dG9tIC0geVNjYWxlKGQpKSAgLy8gw45uxINsyJtpbWVhIGNvcmVjdMSDIHBlIGF4YSBZXHJcbiAgICAgIC5hdHRyKCdmaWxsJywgJyM2OWIzYTInKTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPGgxPk11c2ljIEluZmx1ZW5jZXM8L2gxPlxyXG4gICAgICB7bG9hZGluZyA/IDxwPkxvYWRpbmcuLi48L3A+IDogPERhdGFUYWJsZSBkYXRhPXtkYXRhfSBjb2x1bW5zPXtbJ2FydGlzdExhYmVsJywgJ2dlbnJlTGFiZWwnLCAnaW5mbHVlbmNlZExhYmVsJ119IC8+fVxyXG5cclxuICAgICAgey8qIEdyYWZpY3VsIGdlbmVyYXQgZGUgRDMgKi99XHJcbiAgICAgIDxzdmcgaWQ9XCJtdXNpYy1jaGFydFwiPjwvc3ZnPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE11c2ljUGFnZTtcclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJmZXRjaFNQQVJRTERhdGEiLCJNVVNJQ19JTkZMVUVOQ0VTX1FVRVJZIiwiZDMiLCJEYXRhVGFibGUiLCJNdXNpY1BhZ2UiLCJkYXRhIiwic2V0RGF0YSIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiZmV0Y2hEYXRhIiwicmVzdWx0cyIsImVycm9yIiwiY29uc29sZSIsImRyYXdDaGFydCIsIndpZHRoIiwiaGVpZ2h0IiwibWFyZ2luIiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJsZWZ0Iiwic3ZnIiwic2VsZWN0IiwiYXR0ciIsImdlbnJlcyIsIm1hcCIsImQiLCJnZW5yZUxhYmVsIiwidmFsdWUiLCJpbmZsdWVuY2VzIiwiaW5mbHVlbmNlZExhYmVsIiwibGVuZ3RoIiwieFNjYWxlIiwic2NhbGVCYW5kIiwiZG9tYWluIiwicmFuZ2UiLCJwYWRkaW5nIiwieVNjYWxlIiwic2NhbGVMaW5lYXIiLCJtYXgiLCJuaWNlIiwiYXBwZW5kIiwiY2FsbCIsImF4aXNCb3R0b20iLCJheGlzTGVmdCIsInNlbGVjdEFsbCIsImVudGVyIiwiaSIsImJhbmR3aWR0aCIsImRpdiIsImgxIiwicCIsImNvbHVtbnMiLCJpZCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/music/page.js\n"));

/***/ })

});