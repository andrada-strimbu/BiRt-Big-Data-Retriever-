"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/influences/page",{

/***/ "(app-pages-browser)/./src/app/influences/page.js":
/*!************************************!*\
  !*** ./src/app/influences/page.js ***!
  \************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Influences)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _utils_queries__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/queries */ \"(app-pages-browser)/./src/utils/queries.js\");\n/* harmony import */ var _lib_sparql__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/sparql */ \"(app-pages-browser)/./src/lib/sparql.js\");\n/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3 */ \"(app-pages-browser)/./node_modules/d3/src/index.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nfunction Influences() {\n    _s();\n    const [influences, setInfluences] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)({\n        \"Influences.useLayoutEffect\": ()=>{\n            const fetchData = {\n                \"Influences.useLayoutEffect.fetchData\": async ()=>{\n                    try {\n                        const data = await (0,_lib_sparql__WEBPACK_IMPORTED_MODULE_3__.fetchSPARQLData)(_utils_queries__WEBPACK_IMPORTED_MODULE_2__.GENRE_INFLUENCES_QUERY);\n                        console.log(\"Fetched data:\", data);\n                        setInfluences(data);\n                        // Apelăm funcțiile de desenare a graficelor doar după ce datele sunt încărcate\n                        if (data.length > 0) {\n                            setTimeout({\n                                \"Influences.useLayoutEffect.fetchData\": ()=>{\n                                    drawBarChart(data);\n                                    drawPieChart(data);\n                                }\n                            }[\"Influences.useLayoutEffect.fetchData\"], 100); // 100ms ar trebui să fie suficient pentru a permite DOM-ului să se actualizeze\n                        }\n                    } catch (err) {\n                        setError(err);\n                    } finally{\n                        setLoading(false);\n                    }\n                }\n            }[\"Influences.useLayoutEffect.fetchData\"];\n            fetchData();\n        }\n    }[\"Influences.useLayoutEffect\"], []);\n    // Funcție pentru desenarea unui grafic cu bare pentru 'Influenced By'\n    const drawBarChart = (data)=>{\n        // Verificăm dacă SVG-ul există în DOM\n        const svg = d3__WEBPACK_IMPORTED_MODULE_4__.select('#bar-chart');\n        if (svg.empty()) {\n            console.error('SVG element for bar chart not found');\n            return;\n        }\n        // Crearea unui obiect cu numărul de influențe pentru fiecare gen muzical\n        const influencedCount = d3__WEBPACK_IMPORTED_MODULE_4__.rollup(data, (v)=>v.length, (d)=>d.influencedMusicGenreLabel.value);\n        const influencedGenres = Array.from(influencedCount.keys());\n        const counts = Array.from(influencedCount.values());\n        // Dimensiunile graficului (modificate pentru a fi mai mari)\n        const width = 1000;\n        const height = 500;\n        const margin = {\n            top: 20,\n            right: 30,\n            bottom: 40,\n            left: 40\n        };\n        // Crearea unui SVG\n        svg.attr('width', width).attr('height', height);\n        const xScale = d3__WEBPACK_IMPORTED_MODULE_4__.scaleBand().domain(influencedGenres).range([\n            margin.left,\n            width - margin.right\n        ]).padding(0.1);\n        const yScale = d3__WEBPACK_IMPORTED_MODULE_4__.scaleLinear().domain([\n            0,\n            d3__WEBPACK_IMPORTED_MODULE_4__.max(counts)\n        ]).nice().range([\n            height - margin.bottom,\n            margin.top\n        ]);\n        // Adăugăm axa X\n        svg.append('g').selectAll('.bar').data(counts).enter().append('rect').attr('x', (d, i)=>xScale(influencedGenres[i])).attr('y', (d)=>yScale(d)).attr('width', xScale.bandwidth()).attr('height', (d)=>height - margin.bottom - yScale(d)).attr('fill', '#69b3a2');\n        // Adăugăm axa X\n        svg.append('g').attr('class', 'x-axis').attr('transform', \"translate(0,\".concat(height - margin.bottom, \")\")).call(d3__WEBPACK_IMPORTED_MODULE_4__.axisBottom(xScale));\n        // Adăugăm axa Y\n        svg.append('g').attr('class', 'y-axis').attr('transform', \"translate(\".concat(margin.left, \", 0)\")).call(d3__WEBPACK_IMPORTED_MODULE_4__.axisLeft(yScale));\n    };\n    // Funcție pentru desenarea unui pie chart pentru 'Genre'\n    const drawPieChart = (data)=>{\n        // Verificăm dacă SVG-ul există în DOM\n        const svg = d3__WEBPACK_IMPORTED_MODULE_4__.select('#pie-chart');\n        if (svg.empty()) {\n            console.error('SVG element for pie chart not found');\n            return;\n        }\n        // Crearea unui obiect cu numărul de influențe pentru fiecare gen muzical\n        const genreCount = d3__WEBPACK_IMPORTED_MODULE_4__.rollup(data, (v)=>v.length, (d)=>d.musicGenreLabel.value);\n        const genres = Array.from(genreCount.keys());\n        const counts = Array.from(genreCount.values());\n        // Dimensiunile pie chart-ului (modificate pentru a fi un cerc complet)\n        const width = 500;\n        const height = 500;\n        const radius = Math.min(width, height) / 2;\n        // Crearea unui SVG\n        svg.attr('width', width).attr('height', height).append('g').attr('transform', \"translate(\".concat(width / 2, \",\").concat(height / 2, \")\"));\n        const color = d3__WEBPACK_IMPORTED_MODULE_4__.scaleOrdinal(d3__WEBPACK_IMPORTED_MODULE_4__.schemeCategory10);\n        // Crearea unui arc generator pentru pie chart\n        const arc = d3__WEBPACK_IMPORTED_MODULE_4__.arc().innerRadius(0).outerRadius(radius);\n        const pie = d3__WEBPACK_IMPORTED_MODULE_4__.pie().value((d)=>d[1]);\n        const pieData = pie(Array.from(genreCount));\n        // Adăugăm segmentele pie chart-ului\n        svg.selectAll('path').data(pieData).enter().append('path').attr('d', arc).attr('fill', (d, i)=>color(i));\n        // Etichetele\n        svg.selectAll('text').data(pieData).enter().append('text').attr('transform', (d)=>\"translate(\".concat(arc.centroid(d), \")\")).attr('text-anchor', 'middle').text((d)=>d.data[0]);\n    };\n    if (loading) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n        children: \"Loading...\"\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Andrada\\\\Documents\\\\GitHub\\\\ProiectProgramare\\\\BiRt-Big-Data-Retriever-\\\\src\\\\app\\\\influences\\\\page.js\",\n        lineNumber: 153,\n        columnNumber: 23\n    }, this);\n    if (error) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n        children: [\n            \"Error loading data: \",\n            error.message\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Andrada\\\\Documents\\\\GitHub\\\\ProiectProgramare\\\\BiRt-Big-Data-Retriever-\\\\src\\\\app\\\\influences\\\\page.js\",\n        lineNumber: 154,\n        columnNumber: 21\n    }, this);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        style: {\n            padding: '20px'\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"Music Genres and Their Influences\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Andrada\\\\Documents\\\\GitHub\\\\ProiectProgramare\\\\BiRt-Big-Data-Retriever-\\\\src\\\\app\\\\influences\\\\page.js\",\n                lineNumber: 158,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"table\", {\n                border: \"1\",\n                style: {\n                    width: '100%',\n                    borderCollapse: 'collapse'\n                },\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"thead\", {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tr\", {\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                    children: \"Genre\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Andrada\\\\Documents\\\\GitHub\\\\ProiectProgramare\\\\BiRt-Big-Data-Retriever-\\\\src\\\\app\\\\influences\\\\page.js\",\n                                    lineNumber: 164,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                    children: \"Influenced By\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Andrada\\\\Documents\\\\GitHub\\\\ProiectProgramare\\\\BiRt-Big-Data-Retriever-\\\\src\\\\app\\\\influences\\\\page.js\",\n                                    lineNumber: 165,\n                                    columnNumber: 13\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\Andrada\\\\Documents\\\\GitHub\\\\ProiectProgramare\\\\BiRt-Big-Data-Retriever-\\\\src\\\\app\\\\influences\\\\page.js\",\n                            lineNumber: 163,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Andrada\\\\Documents\\\\GitHub\\\\ProiectProgramare\\\\BiRt-Big-Data-Retriever-\\\\src\\\\app\\\\influences\\\\page.js\",\n                        lineNumber: 162,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tbody\", {\n                        children: influences.map((item, index)=>{\n                            var _item_musicGenreLabel, _item_influencedMusicGenreLabel;\n                            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tr\", {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                        children: ((_item_musicGenreLabel = item.musicGenreLabel) === null || _item_musicGenreLabel === void 0 ? void 0 : _item_musicGenreLabel.value) || 'N/A'\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\Andrada\\\\Documents\\\\GitHub\\\\ProiectProgramare\\\\BiRt-Big-Data-Retriever-\\\\src\\\\app\\\\influences\\\\page.js\",\n                                        lineNumber: 171,\n                                        columnNumber: 15\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                        children: ((_item_influencedMusicGenreLabel = item.influencedMusicGenreLabel) === null || _item_influencedMusicGenreLabel === void 0 ? void 0 : _item_influencedMusicGenreLabel.value) || 'N/A'\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\Andrada\\\\Documents\\\\GitHub\\\\ProiectProgramare\\\\BiRt-Big-Data-Retriever-\\\\src\\\\app\\\\influences\\\\page.js\",\n                                        lineNumber: 172,\n                                        columnNumber: 15\n                                    }, this)\n                                ]\n                            }, index, true, {\n                                fileName: \"C:\\\\Users\\\\Andrada\\\\Documents\\\\GitHub\\\\ProiectProgramare\\\\BiRt-Big-Data-Retriever-\\\\src\\\\app\\\\influences\\\\page.js\",\n                                lineNumber: 170,\n                                columnNumber: 13\n                            }, this);\n                        })\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Andrada\\\\Documents\\\\GitHub\\\\ProiectProgramare\\\\BiRt-Big-Data-Retriever-\\\\src\\\\app\\\\influences\\\\page.js\",\n                        lineNumber: 168,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Andrada\\\\Documents\\\\GitHub\\\\ProiectProgramare\\\\BiRt-Big-Data-Retriever-\\\\src\\\\app\\\\influences\\\\page.js\",\n                lineNumber: 161,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                style: {\n                    marginBottom: '30px'\n                },\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"svg\", {\n                    id: \"bar-chart\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Andrada\\\\Documents\\\\GitHub\\\\ProiectProgramare\\\\BiRt-Big-Data-Retriever-\\\\src\\\\app\\\\influences\\\\page.js\",\n                    lineNumber: 180,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Andrada\\\\Documents\\\\GitHub\\\\ProiectProgramare\\\\BiRt-Big-Data-Retriever-\\\\src\\\\app\\\\influences\\\\page.js\",\n                lineNumber: 179,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"svg\", {\n                    id: \"pie-chart\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Andrada\\\\Documents\\\\GitHub\\\\ProiectProgramare\\\\BiRt-Big-Data-Retriever-\\\\src\\\\app\\\\influences\\\\page.js\",\n                    lineNumber: 185,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Andrada\\\\Documents\\\\GitHub\\\\ProiectProgramare\\\\BiRt-Big-Data-Retriever-\\\\src\\\\app\\\\influences\\\\page.js\",\n                lineNumber: 184,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Andrada\\\\Documents\\\\GitHub\\\\ProiectProgramare\\\\BiRt-Big-Data-Retriever-\\\\src\\\\app\\\\influences\\\\page.js\",\n        lineNumber: 157,\n        columnNumber: 5\n    }, this);\n}\n_s(Influences, \"G0074c7DbNJJe40HZELZfJuMhJw=\");\n_c = Influences;\nvar _c;\n$RefreshReg$(_c, \"Influences\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvaW5mbHVlbmNlcy9wYWdlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVvRTtBQUNYO0FBQ1Y7QUFDdEI7QUFFVixTQUFTTzs7SUFDdEIsTUFBTSxDQUFDQyxZQUFZQyxjQUFjLEdBQUdQLCtDQUFRQSxDQUFDLEVBQUU7SUFDL0MsTUFBTSxDQUFDUSxTQUFTQyxXQUFXLEdBQUdULCtDQUFRQSxDQUFDO0lBQ3ZDLE1BQU0sQ0FBQ1UsT0FBT0MsU0FBUyxHQUFHWCwrQ0FBUUEsQ0FBQztJQUVuQ0Msc0RBQWVBO3NDQUFDO1lBQ2QsTUFBTVc7d0RBQVk7b0JBQ2hCLElBQUk7d0JBQ0YsTUFBTUMsT0FBTyxNQUFNViw0REFBZUEsQ0FBQ0Qsa0VBQXNCQTt3QkFDekRZLFFBQVFDLEdBQUcsQ0FBQyxpQkFBaUJGO3dCQUM3Qk4sY0FBY007d0JBQ2QsK0VBQStFO3dCQUMvRSxJQUFJQSxLQUFLRyxNQUFNLEdBQUcsR0FBRzs0QkFDbkJDO3dFQUFXO29DQUNUQyxhQUFhTDtvQ0FDYk0sYUFBYU47Z0NBQ2Y7dUVBQUcsTUFBTywrRUFBK0U7d0JBQzNGO29CQUNGLEVBQUUsT0FBT08sS0FBSzt3QkFDWlQsU0FBU1M7b0JBQ1gsU0FBVTt3QkFDUlgsV0FBVztvQkFDYjtnQkFDRjs7WUFDQUc7UUFDRjtxQ0FBRyxFQUFFO0lBRUwsc0VBQXNFO0lBQ3RFLE1BQU1NLGVBQWUsQ0FBQ0w7UUFDcEIsc0NBQXNDO1FBQ3RDLE1BQU1RLE1BQU1qQixzQ0FBUyxDQUFDO1FBQ3RCLElBQUlpQixJQUFJRSxLQUFLLElBQUk7WUFDZlQsUUFBUUosS0FBSyxDQUFDO1lBQ2Q7UUFDRjtRQUVBLHlFQUF5RTtRQUN6RSxNQUFNYyxrQkFBa0JwQixzQ0FBUyxDQUMvQlMsTUFDQSxDQUFDYSxJQUFNQSxFQUFFVixNQUFNLEVBQ2YsQ0FBQ1csSUFBTUEsRUFBRUMseUJBQXlCLENBQUNDLEtBQUs7UUFFMUMsTUFBTUMsbUJBQW1CQyxNQUFN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LDhEQUFDQztrQ0FDRWxGLFdBQVdtRixHQUFHLENBQUMsQ0FBQ0MsTUFBTUM7Z0NBRWRELHVCQUNBQTtpREFGUCw4REFBQ0o7O2tEQUNDLDhEQUFDTTtrREFBSUYsRUFBQUEsd0JBQUFBLEtBQUs1QixlQUFlLGNBQXBCNEIsNENBQUFBLHNCQUFzQjdELEtBQUssS0FBSTs7Ozs7O2tEQUNwQyw4REFBQytEO2tEQUFJRixFQUFBQSxrQ0FBQUEsS0FBSzlELHlCQUF5QixjQUE5QjhELHNEQUFBQSxnQ0FBZ0M3RCxLQUFLLEtBQUk7Ozs7Ozs7K0JBRnZDOEQ7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQVNmLDhEQUFDWjtnQkFBSUMsT0FBTztvQkFBRWEsY0FBYztnQkFBTzswQkFDakMsNEVBQUN4RTtvQkFBSXlFLElBQUc7Ozs7Ozs7Ozs7OzBCQUlWLDhEQUFDZjswQkFDQyw0RUFBQzFEO29CQUFJeUUsSUFBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJaEI7R0FyTHdCekY7S0FBQUEiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcQW5kcmFkYVxcRG9jdW1lbnRzXFxHaXRIdWJcXFByb2llY3RQcm9ncmFtYXJlXFxCaVJ0LUJpZy1EYXRhLVJldHJpZXZlci1cXHNyY1xcYXBwXFxpbmZsdWVuY2VzXFxwYWdlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50JztcclxuXHJcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlLCB1c2VMYXlvdXRFZmZlY3QgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEdFTlJFX0lORkxVRU5DRVNfUVVFUlkgfSBmcm9tICdAL3V0aWxzL3F1ZXJpZXMnO1xyXG5pbXBvcnQgeyBmZXRjaFNQQVJRTERhdGEgfSBmcm9tICdAL2xpYi9zcGFycWwnO1xyXG5pbXBvcnQgKiBhcyBkMyBmcm9tICdkMyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBJbmZsdWVuY2VzKCkge1xyXG4gIGNvbnN0IFtpbmZsdWVuY2VzLCBzZXRJbmZsdWVuY2VzXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcclxuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKG51bGwpO1xyXG5cclxuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgZmV0Y2hEYXRhID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaFNQQVJRTERhdGEoR0VOUkVfSU5GTFVFTkNFU19RVUVSWSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJGZXRjaGVkIGRhdGE6XCIsIGRhdGEpO1xyXG4gICAgICAgIHNldEluZmx1ZW5jZXMoZGF0YSk7XHJcbiAgICAgICAgLy8gQXBlbMSDbSBmdW5jyJtpaWxlIGRlIGRlc2VuYXJlIGEgZ3JhZmljZWxvciBkb2FyIGR1cMSDIGNlIGRhdGVsZSBzdW50IMOubmPEg3JjYXRlXHJcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7ICAvLyBBZMSDdWfEg20gdW4gdGltZW91dCBwZW50cnUgYSBuZSBhc2lndXJhIGPEgyBET00tdWwgcy1hIGFjdHVhbGl6YXRcclxuICAgICAgICAgICAgZHJhd0JhckNoYXJ0KGRhdGEpO1xyXG4gICAgICAgICAgICBkcmF3UGllQ2hhcnQoZGF0YSk7XHJcbiAgICAgICAgICB9LCAxMDApOyAgLy8gMTAwbXMgYXIgdHJlYnVpIHPEgyBmaWUgc3VmaWNpZW50IHBlbnRydSBhIHBlcm1pdGUgRE9NLXVsdWkgc8SDIHNlIGFjdHVhbGl6ZXplXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBzZXRFcnJvcihlcnIpO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgZmV0Y2hEYXRhKCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICAvLyBGdW5jyJtpZSBwZW50cnUgZGVzZW5hcmVhIHVudWkgZ3JhZmljIGN1IGJhcmUgcGVudHJ1ICdJbmZsdWVuY2VkIEJ5J1xyXG4gIGNvbnN0IGRyYXdCYXJDaGFydCA9IChkYXRhKSA9PiB7XHJcbiAgICAvLyBWZXJpZmljxINtIGRhY8SDIFNWRy11bCBleGlzdMSDIMOubiBET01cclxuICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdCgnI2Jhci1jaGFydCcpO1xyXG4gICAgaWYgKHN2Zy5lbXB0eSgpKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1NWRyBlbGVtZW50IGZvciBiYXIgY2hhcnQgbm90IGZvdW5kJyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDcmVhcmVhIHVudWkgb2JpZWN0IGN1IG51bcSDcnVsIGRlIGluZmx1ZW7Im2UgcGVudHJ1IGZpZWNhcmUgZ2VuIG11emljYWxcclxuICAgIGNvbnN0IGluZmx1ZW5jZWRDb3VudCA9IGQzLnJvbGx1cChcclxuICAgICAgZGF0YSxcclxuICAgICAgKHYpID0+IHYubGVuZ3RoLFxyXG4gICAgICAoZCkgPT4gZC5pbmZsdWVuY2VkTXVzaWNHZW5yZUxhYmVsLnZhbHVlXHJcbiAgICApO1xyXG4gICAgY29uc3QgaW5mbHVlbmNlZEdlbnJlcyA9IEFycmF5LmZyb20oaW5mbHVlbmNlZENvdW50LmtleXMoKSk7XHJcbiAgICBjb25zdCBjb3VudHMgPSBBcnJheS5mcm9tKGluZmx1ZW5jZWRDb3VudC52YWx1ZXMoKSk7XHJcblxyXG4gICAgLy8gRGltZW5zaXVuaWxlIGdyYWZpY3VsdWkgKG1vZGlmaWNhdGUgcGVudHJ1IGEgZmkgbWFpIG1hcmkpXHJcbiAgICBjb25zdCB3aWR0aCA9IDEwMDA7XHJcbiAgICBjb25zdCBoZWlnaHQgPSA1MDA7XHJcbiAgICBjb25zdCBtYXJnaW4gPSB7IHRvcDogMjAsIHJpZ2h0OiAzMCwgYm90dG9tOiA0MCwgbGVmdDogNDAgfTtcclxuXHJcbiAgICAvLyBDcmVhcmVhIHVudWkgU1ZHXHJcbiAgICBzdmcuYXR0cignd2lkdGgnLCB3aWR0aClcclxuICAgICAgLmF0dHIoJ2hlaWdodCcsIGhlaWdodCk7XHJcblxyXG4gICAgY29uc3QgeFNjYWxlID0gZDMuc2NhbGVCYW5kKClcclxuICAgICAgLmRvbWFpbihpbmZsdWVuY2VkR2VucmVzKVxyXG4gICAgICAucmFuZ2UoW21hcmdpbi5sZWZ0LCB3aWR0aCAtIG1hcmdpbi5yaWdodF0pXHJcbiAgICAgIC5wYWRkaW5nKDAuMSk7XHJcblxyXG4gICAgY29uc3QgeVNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAuZG9tYWluKFswLCBkMy5tYXgoY291bnRzKV0pXHJcbiAgICAgIC5uaWNlKClcclxuICAgICAgLnJhbmdlKFtoZWlnaHQgLSBtYXJnaW4uYm90dG9tLCBtYXJnaW4udG9wXSk7XHJcblxyXG4gICAgLy8gQWTEg3VnxINtIGF4YSBYXHJcbiAgICBzdmcuYXBwZW5kKCdnJylcclxuICAgICAgLnNlbGVjdEFsbCgnLmJhcicpXHJcbiAgICAgIC5kYXRhKGNvdW50cylcclxuICAgICAgLmVudGVyKClcclxuICAgICAgLmFwcGVuZCgncmVjdCcpXHJcbiAgICAgIC5hdHRyKCd4JywgKGQsIGkpID0+IHhTY2FsZShpbmZsdWVuY2VkR2VucmVzW2ldKSlcclxuICAgICAgLmF0dHIoJ3knLCAoZCkgPT4geVNjYWxlKGQpKVxyXG4gICAgICAuYXR0cignd2lkdGgnLCB4U2NhbGUuYmFuZHdpZHRoKCkpXHJcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCAoZCkgPT4gaGVpZ2h0IC0gbWFyZ2luLmJvdHRvbSAtIHlTY2FsZShkKSlcclxuICAgICAgLmF0dHIoJ2ZpbGwnLCAnIzY5YjNhMicpO1xyXG5cclxuICAgIC8vIEFkxIN1Z8SDbSBheGEgWFxyXG4gICAgc3ZnLmFwcGVuZCgnZycpXHJcbiAgICAgIC5hdHRyKCdjbGFzcycsICd4LWF4aXMnKVxyXG4gICAgICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgwLCR7aGVpZ2h0IC0gbWFyZ2luLmJvdHRvbX0pYClcclxuICAgICAgLmNhbGwoZDMuYXhpc0JvdHRvbSh4U2NhbGUpKTtcclxuXHJcbiAgICAvLyBBZMSDdWfEg20gYXhhIFlcclxuICAgIHN2Zy5hcHBlbmQoJ2cnKVxyXG4gICAgICAuYXR0cignY2xhc3MnLCAneS1heGlzJylcclxuICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHttYXJnaW4ubGVmdH0sIDApYClcclxuICAgICAgLmNhbGwoZDMuYXhpc0xlZnQoeVNjYWxlKSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gRnVuY8ibaWUgcGVudHJ1IGRlc2VuYXJlYSB1bnVpIHBpZSBjaGFydCBwZW50cnUgJ0dlbnJlJ1xyXG4gIGNvbnN0IGRyYXdQaWVDaGFydCA9IChkYXRhKSA9PiB7XHJcbiAgICAvLyBWZXJpZmljxINtIGRhY8SDIFNWRy11bCBleGlzdMSDIMOubiBET01cclxuICAgIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdCgnI3BpZS1jaGFydCcpO1xyXG4gICAgaWYgKHN2Zy5lbXB0eSgpKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1NWRyBlbGVtZW50IGZvciBwaWUgY2hhcnQgbm90IGZvdW5kJyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDcmVhcmVhIHVudWkgb2JpZWN0IGN1IG51bcSDcnVsIGRlIGluZmx1ZW7Im2UgcGVudHJ1IGZpZWNhcmUgZ2VuIG11emljYWxcclxuICAgIGNvbnN0IGdlbnJlQ291bnQgPSBkMy5yb2xsdXAoXHJcbiAgICAgIGRhdGEsXHJcbiAgICAgICh2KSA9PiB2Lmxlbmd0aCxcclxuICAgICAgKGQpID0+IGQubXVzaWNHZW5yZUxhYmVsLnZhbHVlXHJcbiAgICApO1xyXG4gICAgY29uc3QgZ2VucmVzID0gQXJyYXkuZnJvbShnZW5yZUNvdW50LmtleXMoKSk7XHJcbiAgICBjb25zdCBjb3VudHMgPSBBcnJheS5mcm9tKGdlbnJlQ291bnQudmFsdWVzKCkpO1xyXG5cclxuICAgIC8vIERpbWVuc2l1bmlsZSBwaWUgY2hhcnQtdWx1aSAobW9kaWZpY2F0ZSBwZW50cnUgYSBmaSB1biBjZXJjIGNvbXBsZXQpXHJcbiAgICBjb25zdCB3aWR0aCA9IDUwMDtcclxuICAgIGNvbnN0IGhlaWdodCA9IDUwMDtcclxuICAgIGNvbnN0IHJhZGl1cyA9IE1hdGgubWluKHdpZHRoLCBoZWlnaHQpIC8gMjtcclxuXHJcbiAgICAvLyBDcmVhcmVhIHVudWkgU1ZHXHJcbiAgICBzdmcuYXR0cignd2lkdGgnLCB3aWR0aClcclxuICAgICAgLmF0dHIoJ2hlaWdodCcsIGhlaWdodClcclxuICAgICAgLmFwcGVuZCgnZycpXHJcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7d2lkdGggLyAyfSwke2hlaWdodCAvIDJ9KWApO1xyXG5cclxuICAgIGNvbnN0IGNvbG9yID0gZDMuc2NhbGVPcmRpbmFsKGQzLnNjaGVtZUNhdGVnb3J5MTApO1xyXG5cclxuICAgIC8vIENyZWFyZWEgdW51aSBhcmMgZ2VuZXJhdG9yIHBlbnRydSBwaWUgY2hhcnRcclxuICAgIGNvbnN0IGFyYyA9IGQzLmFyYygpLmlubmVyUmFkaXVzKDApLm91dGVyUmFkaXVzKHJhZGl1cyk7XHJcblxyXG4gICAgY29uc3QgcGllID0gZDMucGllKCkudmFsdWUoKGQpID0+IGRbMV0pO1xyXG5cclxuICAgIGNvbnN0IHBpZURhdGEgPSBwaWUoQXJyYXkuZnJvbShnZW5yZUNvdW50KSk7XHJcblxyXG4gICAgLy8gQWTEg3VnxINtIHNlZ21lbnRlbGUgcGllIGNoYXJ0LXVsdWlcclxuICAgIHN2Zy5zZWxlY3RBbGwoJ3BhdGgnKVxyXG4gICAgICAuZGF0YShwaWVEYXRhKVxyXG4gICAgICAuZW50ZXIoKVxyXG4gICAgICAuYXBwZW5kKCdwYXRoJylcclxuICAgICAgLmF0dHIoJ2QnLCBhcmMpXHJcbiAgICAgIC5hdHRyKCdmaWxsJywgKGQsIGkpID0+IGNvbG9yKGkpKTtcclxuXHJcbiAgICAvLyBFdGljaGV0ZWxlXHJcbiAgICBzdmcuc2VsZWN0QWxsKCd0ZXh0JylcclxuICAgICAgLmRhdGEocGllRGF0YSlcclxuICAgICAgLmVudGVyKClcclxuICAgICAgLmFwcGVuZCgndGV4dCcpXHJcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAoZCkgPT4gYHRyYW5zbGF0ZSgke2FyYy5jZW50cm9pZChkKX0pYClcclxuICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXHJcbiAgICAgIC50ZXh0KChkKSA9PiBkLmRhdGFbMF0pO1xyXG4gIH07XHJcblxyXG4gIGlmIChsb2FkaW5nKSByZXR1cm4gPHA+TG9hZGluZy4uLjwvcD47XHJcbiAgaWYgKGVycm9yKSByZXR1cm4gPHA+RXJyb3IgbG9hZGluZyBkYXRhOiB7ZXJyb3IubWVzc2FnZX08L3A+O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMjBweCcgfX0+XHJcbiAgICAgIDxoMT5NdXNpYyBHZW5yZXMgYW5kIFRoZWlyIEluZmx1ZW5jZXM8L2gxPlxyXG5cclxuICAgICAgey8qIFRhYmVsIGN1IGdlbnVyaSBtdXppY2FsZSDImWkgaW5mbHVlbsibZWxlIGFjZXN0b3JhICovfVxyXG4gICAgICA8dGFibGUgYm9yZGVyPVwiMVwiIHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGJvcmRlckNvbGxhcHNlOiAnY29sbGFwc2UnIH19PlxyXG4gICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgPHRoPkdlbnJlPC90aD5cclxuICAgICAgICAgICAgPHRoPkluZmx1ZW5jZWQgQnk8L3RoPlxyXG4gICAgICAgICAgPC90cj5cclxuICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgIHtpbmZsdWVuY2VzLm1hcCgoaXRlbSwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgPHRyIGtleT17aW5kZXh9PlxyXG4gICAgICAgICAgICAgIDx0ZD57aXRlbS5tdXNpY0dlbnJlTGFiZWw/LnZhbHVlIHx8ICdOL0EnfTwvdGQ+XHJcbiAgICAgICAgICAgICAgPHRkPntpdGVtLmluZmx1ZW5jZWRNdXNpY0dlbnJlTGFiZWw/LnZhbHVlIHx8ICdOL0EnfTwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICApKX1cclxuICAgICAgICA8L3Rib2R5PlxyXG4gICAgICA8L3RhYmxlPlxyXG5cclxuICAgICAgey8qIEdyYWZpY3VsIGN1IGJhcmUgcGVudHJ1IEluZmx1ZW5jZWQgQnkgKi99XHJcbiAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMzBweCcgfX0+XHJcbiAgICAgICAgPHN2ZyBpZD1cImJhci1jaGFydFwiPjwvc3ZnPlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHsvKiBQaWUgY2hhcnQgcGVudHJ1IEdlbnJlICovfVxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxzdmcgaWQ9XCJwaWUtY2hhcnRcIj48L3N2Zz5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwidXNlTGF5b3V0RWZmZWN0IiwiR0VOUkVfSU5GTFVFTkNFU19RVUVSWSIsImZldGNoU1BBUlFMRGF0YSIsImQzIiwiSW5mbHVlbmNlcyIsImluZmx1ZW5jZXMiLCJzZXRJbmZsdWVuY2VzIiwibG9hZGluZyIsInNldExvYWRpbmciLCJlcnJvciIsInNldEVycm9yIiwiZmV0Y2hEYXRhIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJsZW5ndGgiLCJzZXRUaW1lb3V0IiwiZHJhd0JhckNoYXJ0IiwiZHJhd1BpZUNoYXJ0IiwiZXJyIiwic3ZnIiwic2VsZWN0IiwiZW1wdHkiLCJpbmZsdWVuY2VkQ291bnQiLCJyb2xsdXAiLCJ2IiwiZCIsImluZmx1ZW5jZWRNdXNpY0dlbnJlTGFiZWwiLCJ2YWx1ZSIsImluZmx1ZW5jZWRHZW5yZXMiLCJBcnJheSIsImZyb20iLCJrZXlzIiwiY291bnRzIiwidmFsdWVzIiwid2lkdGgiLCJoZWlnaHQiLCJtYXJnaW4iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJhdHRyIiwieFNjYWxlIiwic2NhbGVCYW5kIiwiZG9tYWluIiwicmFuZ2UiLCJwYWRkaW5nIiwieVNjYWxlIiwic2NhbGVMaW5lYXIiLCJtYXgiLCJuaWNlIiwiYXBwZW5kIiwic2VsZWN0QWxsIiwiZW50ZXIiLCJpIiwiYmFuZHdpZHRoIiwiY2FsbCIsImF4aXNCb3R0b20iLCJheGlzTGVmdCIsImdlbnJlQ291bnQiLCJtdXNpY0dlbnJlTGFiZWwiLCJnZW5yZXMiLCJyYWRpdXMiLCJNYXRoIiwibWluIiwiY29sb3IiLCJzY2FsZU9yZGluYWwiLCJzY2hlbWVDYXRlZ29yeTEwIiwiYXJjIiwiaW5uZXJSYWRpdXMiLCJvdXRlclJhZGl1cyIsInBpZSIsInBpZURhdGEiLCJjZW50cm9pZCIsInRleHQiLCJwIiwibWVzc2FnZSIsImRpdiIsInN0eWxlIiwiaDEiLCJ0YWJsZSIsImJvcmRlciIsImJvcmRlckNvbGxhcHNlIiwidGhlYWQiLCJ0ciIsInRoIiwidGJvZHkiLCJtYXAiLCJpdGVtIiwiaW5kZXgiLCJ0ZCIsIm1hcmdpbkJvdHRvbSIsImlkIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/influences/page.js\n"));

/***/ })

});