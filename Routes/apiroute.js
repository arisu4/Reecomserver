const express = require("express")

const Router = express.Router()

const apicontrol = require("../controller/apicontroller")

Router.post("/categor", apicontrol.categor)

Router.get("/showCategory", apicontrol.showCategor)

Router.get("/addprod", apicontrol.addProd)

Router.post("/saveprod", apicontrol.saveprod)

Router.get("/showprod", apicontrol.prodShow)

Router.get("/showcategors", apicontrol.showCategors)

Router.post("/namefilter", apicontrol.filterName)

Router.get("/paginatetable", apicontrol.paginateTable)

Router.get("/paginatelib", apicontrol.paginateLib)

Router.get("/displaytable", apicontrol.displayTable)

Router.get('/materialtable',apicontrol.materialData)

Router.get('/datagrid',apicontrol.gridData)

Router.get('/searching',apicontrol.searching)

Router.get('/sorting',apicontrol.sorting)

module.exports = Router
