## back-end creating

1. Create github clean project & clone to your pc
2. Initialize your backend in root folder of your project by default --- npm
   init -y
3. repository, keywords, author, licence, bugs, homepage - we may delete these
   fields in learning rep
4. Add script --- "server": "nodemon server.js" --- for starting backend &
   create server.js
5. Install main dependencies for backend in root of your project folder by ---
   npm i express cors dotenv --- & --- npm i nodemon -D ---
6. Add simplest express backend server by ---

---

const express = require('express'); const cors = require('cors'); const dotenv =
require('dotenv');

const app = express(); dotenv.config();

app.use(cors()); app.use(express.json());

app.get('/', (\_, res) => { res.send('API is running......'); });

const PORT = process.env.PORT || 5000; app.listen(PORT,
console.log(`Server started on port ${PORT}`));

---

7.  (Only for testing without real DB & simplest request from HTML)

    a) Create simplest local proj db by """data/products.js""" consisting

    const products = [ { id: 'khsfdhf', name: 'Iphone 5', price: 1000 }, { id:
    'sdf7sdf', name: 'LG 4ty', price: 500 }, ]; module.exports = products;

    b) in our server.js file. Import this db by

    const products = require('./data/products'); then make simplest root for
    giving that data by app.get('/products', (req, res) => { res.json(products);
    }); After adding our change file server.js will be

---

const express = require('express'); const cors = require('cors'); const dotenv =
require('dotenv'); const products = require('./data/products');

const app = express(); dotenv.config();

app.use(cors()); app.use(express.json());

app.get('/', (\_, res) => { res.send('API is running......'); });
app.get('/products', (req, res) => { res.json(products); });

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

---

    c) in html create script for getting data

---

<script>
      const productsRequest = fetch('http://localhost:5555/products');

      productsRequest
         .then(response => {
          if (!response.ok) {
               throw new Error('Request error');
            }
             return response.json();
         })
         .then(result => console.log(result))
         .catch(error => console.log(error));
</script>

---

8.  Create -- routes -- folder in our proj for separating routes from main
    server.js

                a) Create file routes/products.js for making routes for products endpoint

                b) In routes/products.js create list of products routes by Router() from
                express

                ***

                const express = require('express'); const router = express.Router();

                ***

                and import data/products.js by

                ***

                const products = require('../data/products');

                ***

                c) Move products route from server.js to routes/products.js

                - from server.js

                ***

                const products = require('./data/products');

                app.get('/products', (req, res) => { res.json(products); });

                ***

                - to routes/products.js (look at moving root from server.js to
                  routes/products.js, means we don't need in routes/products.js write the
                  same router.get('/products', ...), will be enough to live router.get('/',
                  ...))

---

const express = require('express'); const router = express.Router(); const
products = require('../data/products');

router.get('/', (req, res) => { res.json(products); });

module.exports = router;

---

                d) In future we will have more routes, so we should group them in some kind
                of routes/index.js where we reexport products f.e.

                ***

                const products = require('./products');

                module.exports = { products, };

                ***

                e) We need to import routes in server.js

                ***

                const routes = require('./routes');

                ***

                and use them in server.js by middleware like

                ***

                app.use('/products', routes.products);

                ***

                f) sometimes we should change api for new clients, but for old clients we
                have to live old api, so write in server.js such changes like
                app.use('/api/v1/products', routes.products);

                g) To sum up out server.js will be

---

const express = require('express'); const cors = require('cors'); const dotenv =
require('dotenv'); const routes = require('./routes');

const app = express(); dotenv.config();

app.use(cors()); app.use(express.json());
app.use('/api/v1/products',routes.products);

app.get('/', (\_, res) => { res.send('API is running......'); });

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

---

                h) Create one more route according a) - g) with empty data f.e.

                - routes/customers.js
                ---
                 const express = require('express'); const router = express.Router();
                 router.get('/', (req, res) => {res.json({status: "success", code: 200, data: {   result: [] }}); }); module.exports = router;
                ---

                - server.js
                ---
                app.use('/api/v1/customers', routes.customers);
                ---

9.  The next step in making convenient web-server is separating
    functions/controllers from routes folder by creating controllers folder in
    main project folder.

    a) Create controllers/products folder, so move importing data & controller
    from routes/products.js

    - controllers/products/getAll.js

    const products = require('../../data/products');

    const getAll = (req, res) => {res.json(products); };

    module.exports = getAll;

    b) Reexport functions from controllers folder by making
    controller/products/index.js file

    - controller/products/index.js

    const getAll = require('./getAll');

    module.exports = { getAll };

    c) Import all products controller from controllers/products folder to
    controllers/index.js

    - controllers/index.js

      const products = require('./products');

      module.exports = { products };

    d) Import products controllers from controller folder & use necessary one

    - routes/products.js

    const express = require('express'); const router = express.Router(); const {
    products } = require('../controllers');

    router.get('/', products.getAll);

    module.exports = router;

10. Explanation how to make controllers in examples.

        I) getItem by id

              a) Case when we get correct id

              - in route means router.get('/:id', controller.getById);

              - in controller that parameters are in req.params object

                 const getById = (req, res) => { console.log(req.params); };

                 So we get like """{ id: 'khsfdhf' }""".

              - or extract id from params const {id} = req.params

              - so in controller f.e. use method find

                 const getById = (req, res) => {

                 const { id } = req.params;

                 const oneProduct = products.find(item => item.id === id);

                 res.json({
                    status: 'success',
                    code: 200,
                    data: { result: oneProduct }, });

                 };

              # Remember about id in databases ofter write \_id, so method find will be

              - const oneProduct = products.find(item => item.\_id === id);

              b) If we get incorrect id

                    const getById = (req, res) => {
                          const { id } = req.params;

                          const oneProduct = products.find(item => item.id === id);

                          if (!oneProduct) {
                            res.status(404).json({
                              status: 'error',
                              code: 404,
                              message: `Item with id "${id}" not found`,
                            });
                             return;
                          }

                          res.json({
                            status: 'success',
                            code: 200,
                            data: { result: oneProduct },
                          });
                    };

        II. POST route

             a) Make route

             - routes/products.js

                router.post('/', products.add);

             b) Create controller

             - controllers/products/add.js

                Firstly for testing what "req.body" we get in console
                *
                const products = require('../../data/products');

                const add = (req, res) => {
                    console.log(req.body);

                   res.json({
                   status: 'success',
                   code: 200,

                   });
                };

                module.exports = add;
                *


             - For converting body req we should use "express.json()" middleware. In our example it used for all requests by setting it in server.js by app.use(express.json());.

             But for optimizing our server we may use it only for body requests, that's mean in routes/products.js

                * router.post('/', express.json(), products.add);

             Before express.json() developers used another middleware building in node.js, called body-parser, in server.js we may use it

                *
                const bodyParser = require('body-parser');
                app.use(bodyParser.json());
                *

             - Guide: How to make request in POSTMAN
                   * make request POST
                   * take the same route like for getAll, in our example http://localhost:5555/api/v1/products
                   * go to "Body" tab & select "raw" option
                   * change from 'text' to "JSON" format
                   * make necessary object
                   {
                      "name": "Samsung",
                      "price": 2700
                   }
                   Make sure that in POSTMAN keys (name, price) made in ""

             - For testing use UUID to generate id-s

                   * npm i uuid

             - First version of add.js controller (in this case we add product in cash, NOT to data/products.js file)

                   *
                   *
                   *
                   const { v4 } = require('uuid');
                   const products = require('../../data/products');

                   const add = (req, res) => {
                         const newProduct = { ...req.body, _id: v4() };

                         products.push(newProduct);

                         res.status(201).json({
                            status: 'success',
                            code: 201,
                            data: {
                               result: newProduct,
                            },
                         });
                   };

                   module.exports = add;
                   *
                   *
                   *

        III. Update route

             a) Create route

                - router.put('/:id', express.json(), products.update);

                P.S. express.json - middleware for body, could be use in server.js, like app.use(express.json()); for all requests, the same explanation was in POST method

             b) Create controller

             ---
                   const products = require('../../data/products');

                   const update = (req, res) => {
                     const { id } = req.params;

                     const index = products.findIndex(item => item.id === id);

                     if (index === -1) {
                       res.status(404).json({
                         status: 'error',
                         code: 404,
                         message: 'Item not fount',
                       });
                     }

                     products[index] = { ...req.body, id: id };

                     res.json({
                       status: 'success',
                       code: 200,
                       data: { result: products[index] },
                     });
                   };

                   module.exports = update;
             ---

        IV. Delete route

        P.S. It isn't possible to create "delete" controller name, b/c it is
        reserved word.

             a) Create route

                   - router.delete('/:id', products.remove);

             b) Create controller

             ---

             const products = require('../../data/products');

             const remove = (req, res) => {

                const { id } = req.params;

                const index = products.findIndex(item => item.id === id);

                if (index === -1) { res.status(404).json({
                   status: 'error',
                   code: 404,
                   message:'Item not fount', });
               }

               products.splice(index, 1);

               res.status(200).json({
                  status: 'success',
                  code: 200,
                  message: 'Item was removed successfully', }
               );
            };

            module.exports = remove;

         ---
