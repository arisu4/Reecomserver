const Category = require("../model/category")
const Product = require("../model/product")
const Searching = require("../model/search")
const mongoose = require('mongoose')


/*const categor = (req,res )=>{
   const catdetail =req.body
  
   console.log('category detail',catdetail)

   
   res.status(200).send()
//res.status(200).json({message:`data submitted`})

}*/

const categor = (req, res) => {
    const { name, icon } = req.body;
    const category = new Category({
        name,
        icon
    })
    category.save()
        .then((result) => {
            console.log(result)
            res.status(200).send({ message: "category saved succesfully" })
        })
        .catch((error) => {
            console.log(`an error occured`, error)
            res.status(500).send({ message: "category data not saved" })
        })


}

const addProd = (req, res) => {

    Category.find({}, { id: 1, name: 1 })
        .then(foundItems => {
            console.log(foundItems);
            res.status(200).send(foundItems)
        }).catch(err => {
            console.log(`an error occured`)
            res.status(500).send(err)
        })



}



const showCategor = (req, res) => {
    Category.find()
        .then((data) => {
            res.status(200).json(data)

        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false
            })
        }

        )

}



const saveprod = (req, res) => {

    console.log(req.body.category)

    const { name, image, shortdesc, largedesc, brand, category, rating, price } = req.body
    const product = new Product({
        name,
        image,
        shortdesc,
        largedesc,
        brand,
        category,
        rating,
        price,
    })
    product.save()
        .then(results => {
            console.log(results)
            res.status(200).send({ message: "products save successfully" })
        })
        .catch((error) => {
            res.status(500).send({ message: "products not save successfully" })
        })

}


const prodShow = (req, res) => {

    Product.find().populate('category')
        .then(product => {
            console.log(product)
            res.status(200).json(product)

        })
        .catch((err) => {
            res.status(404).json({
                error: err,
                success: false
            })
        }

        )

}




const showCategors = (req, res) => {
    Category.find({}, { id: 1, name: 1 })
        .then((data) => {
            res.status(200).json(data)

        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false
            })
        }

        )

}


const filterName = (req, res) => {

    console.log(req.body.id)

    Category.find({ _id: req.body.id })
        .then(data => {
            console.log(data)
            if (data) {
                console.log(data)
                const id = data[0]
                const product = Product.find({ "category": id })
                    .then(prod => {
                        console.log(prod)
                        res.status(200).json(prod)    // {prod :prod}
                    })
            }
            else {
                console.log(`an error occured`)
            }
        }).catch(err => {
            console.log(`an error ocuured`, err)
            res.status(400).json({
                error: err,
                success: false
            })
        }
        )
}



const paginateTable = (req, res) => {

    const page = parseInt(req.query.page)
    const pageSize = parseInt(req.query.pageSize)

    const startIndex = (page - 1) * pageSize
    const endIndex = page * pageSize

    const products = Product.find()
        .then(products => {


            const paginatedProducts = products.slice(startIndex, endIndex)
            const totalPages = Math.ceil(products.length / pageSize)
            console.log(`products`, paginatedProducts)
            console.log(`total pages`, totalPages)
            res.status(200).json({ products: paginatedProducts, totalPages })

        })
}



const paginateLib = (req, res) => {
    const products = Product.find()
        .then(products => {
            res.status(200).json(products)
        })

}




const displayTable = (req, res) => {

    const page = parseInt(req.query.page)
    console.log(`page selected`, page)

    const pageSize = parseInt(req.query.pageSize)
    console.log(`products per page`, pageSize)

    const startIndex = (page - 1) * pageSize

    const endIndex = page * pageSize

    const products = Product.find()

        .then(products => {
            const totalProducts = products.length

            const prod = products

            console.log(prod)

            const paginatedProducts = products.slice(startIndex, endIndex)

            console.log(`total products`, totalProducts)
            console.log(`products`, paginatedProducts)

            res.status(200).json({ products: paginatedProducts, totalProducts, prod })

        })



}

const materialData = (req, res) => {
    Product.find()
        //console.log(products)
        .then(products => {
            console.log(products)
            res.status(200).json(products)
        })

}


// const serverData =async (req,res)=>{

//     // Product.find()
//     // //console.log(products)
//     // .then(products => {
//     //     console.log(products)
//     //     res.status(200).json(products)
//     // })

//     // const page = req.query.page || 1;
//     // console.log (page)

//     // const perPage =req.query.perPage || 5;
//     // console.log(perPage)
//     // try{
//     //     const count = await Product.CountDocuments({})
//     //     const products = await Product.find({}).sort({}).skip((page-1)*parseInt(perPage)).limit(parseInt(perPage))
//     //     res.status(200).json({products,count})
//     // }
//     // catch(error){
//     //     res.status(400).json({
//     //         error:`Error getting data :${error.message}`
//     //     })

//     // }

//     const page = parseInt(req.query.page)
//     console.log(`page selected`,page)

//     // const pageSize = parseInt(req.query.pageSize)
//     // console.log(`products per page`,pageSize)

//     const pageSize =req.query.perPage || 3;

//     const startIndex = (page - 1) * pageSize

//     const endIndex = page * pageSize

//     const products = Product.find()

//         .then(products => {
//             const totalProducts = products.length

//             const prod = products

//             console.log(prod)

//             const paginatedProducts = products.slice(startIndex, endIndex)

//             console.log(`total products`, totalProducts)
//             console.log(`products`, paginatedProducts)

//            res.status(200).json({ products: paginatedProducts,totalProducts,prod })

//         })




// }


// const serverTable =(req,res)=>{
//     const page = parseInt(req.query.page)
//     console.log(page)
//     const pageSize = parseInt(req.query.pageSize)
//     console.log(pageSize)

//     const startIndex = (page - 1) * pageSize
//     const endIndex = page * pageSize

//     const products = Product.find()

//         .then(products => {
//             console.log(products)
//              const totalProducts = products.length
//             // console.log(`total products`,totalproducts)
//             console.log(`total products`, totalProducts)
//             const paginatedProducts = products.slice(startIndex, endIndex)
//             //const totalPages = Math.ceil(products.length / pageSize)
//             console.log(`products`, paginatedProducts)
//             //console.log(`total pages`, totalPages)
//             res.status(200).json( { products: paginatedProducts,totalProducts } )

//         }) 
// }

const gridData = (req, res) => {

    const page = parseInt(req.query.page)
    console.log(page)
    
    const pageSize = parseInt(req.query.pageSize)
    console.log(pageSize)

    const startIndex = (page - 1) * pageSize
    const endIndex = page * pageSize

    Product.find()

        .then(products => {
            console.log(products)
            // console.log(`total products`,totalproducts)
            const paginatedProducts = products.slice(startIndex, endIndex)
            //const totalPages = Math.ceil(products.length / pageSize)
            console.log(`products`, paginatedProducts)
            const totalProducts = products.length
            //console.log(`total pages`, totalPages)
            console.log(`total products`, totalProducts)
            res.status(200).json({ products: paginatedProducts, totalProducts })
        }
        )
}




// const searching=(req,res)=>{
// const search  = req.query;
// console.log(search)
//    let product
//   if (search) { // If search exists, the user typed in the search bar
//     product =  Product.aggregate(
//       [
//         {
//           '$search': {
//             'index': 'title_autocomplete', 
//             'autocomplete': {
//               'query': search, // noticed we assign a dynamic value to "query"
//               'path': 'title',
//             }
//           }
//         }, {
//           '$limit': 5
//         }, {
//           '$project': {
//             '_name': 1, 
//             'image': 1, 
//             'brand': 1, 
//             'rating': 1,
//             'price':1
//           }
//         }
//       ]
//     );
//   } else { // The search is empty so the value of "search" is undefined
//     //posts = await Post.find().sort({ createdAt: 'desc' });
//   }

//    res.status(200).json({
//     statusCode: 200,
//     message: 'Fetched posts',
//     data:  {product },
//   })
// }

const searching = (req, res) => {
    //  const searchvalue = req.query.search
    //  console.log(`search result`,searchvalue)

    Product.find({
        "$or": [
            { name: { $regex: req.query.search, $options: 'i' } },
            { brand: { $regex: req.query.search, $options: 'i' } }
        ]
    })
        .then(product => {
            console.log(product)
            res.status(200).json(product)
        })
        .catch(error => {
            res.status(500).json(error)
        })

    //  Product.find({name:searchvalue})
    //  .then(product=>{
    //     console.log(product)
    //     res.status(200).json(product)
    //  })
    //  .catch(error=>{
    //     res.status(500).json(error)
    //  })

    //  let product

    //  if (searchvalue) { 
    //         product =  Product.aggregate(
    //           [
    //             {
    //               '$search': {
    //                 'index': 'name', 
    //                 'autocomplete': {
    //                   'query': searchvalue,
    //                 //   'path': 'name',
    //                 }
    //               }
    //             }, {
    //               '$limit': 3
    //             }, {
    //               '$project': {
    //                 'name': 1, 
    //                 'image': 1, 
    //                 'brand': 1, 
    //                 'rating': 1,
    //                 'price':1
    //               }
    //             }
    //           ]
    //         );
    //       }

    //  //const product = Product.find({searchvalue})

    //res.status(200).json(product)

    //  function escapeRegExp(value) {
    //     return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
    //   }
    // const searchregex = new RegExp(escapeRegExp(searchvalue), 'i'); 






    //   console.log(`searchregex`,searchregex)

    // const filtered = Product.filter((item) => {
    //         object.keys(item).some((field) => {
    //        searchregex.test(item[field].tostring());
    //     });
    //   }); 

    //   const filtered =Product.filter(items=>{
    //     console.log(Object.values(items))
    //   })

    //   res.status(200).json(filtered)
}

const sorting = (req, res) => {

    let limit = 5;
    let offset = 0;
    // const sortField = req.query.field
    // console.log(sortField)
    const sortOrder =req.query.sorted
    console.log(`sortingOrder`,sortOrder)

    const page = parseInt(req.query.page) || 1
    console.log(`page`,page)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit
   
    if(sortOrder===`asc`){

        var mysort = { name: -1 }
        Product.find({}).sort(mysort)
        .then(sortDetails=>{
            console.log(`data ascending`,sortDetails)
            const paginatedProducts = sortDetails.slice(startIndex, endIndex)
            //let page = (req.body.page && req.body.page) || 1
            //let pages = Math.ceil(sortDetails.length/ limit);
            //offset = limit * (page - 1);
            
            res.status(200).json({
            status: 1,
            message: "Data has been retrieved",
            result: sortDetails,
            //  count: sortDetails.count,
            //  pages: pages
            })
        })
        
    }
    else{
        var mysort = { name: 1 }
        Product.find().sort(mysort)
        .then(sortDetails=>{
            //let pages = Math.ceil(sortDetails.length/ limit);
            //offset = limit * (page - 1);
            console.log(`data descending`,sortDetails)
            res.status(200).json({
            status: 1,
            message: "Data has been retrieved",
            result: sortDetails,
            // count: sortDetails.count,
            // pages: pages
            })
        })
    }


    //console.log(sortorder)
    //const newObj = {...obj};
   // var allItems = JSON.parse(JSON.stringify(this.state.items));

//     if(sortdata === `asc`)
//     
    
//     const  sortedData = { name: 1 }
//     res.status(200).json(sortedData)
//     }

//   else{
//     const sortedData = { name:-1 }
//     res.status(200).json(sortedData)
//   }

}

module.exports = {
    categor,
    showCategor,
    saveprod,
    addProd,
    prodShow,
    showCategors,
    filterName,
    paginateTable,
    paginateLib,
    displayTable,
    materialData,
    //serverTable
    gridData,
    searching,
    sorting
}


 //   const products = Product.find()
    //     .then(products=>{
    //         console.log(products)
    //         res.status(200).json(products)
    //     })
