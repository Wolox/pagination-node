# Pagination-Node [![Build Status](https://travis-ci.com/Wolox/pagination-node.svg?branch=master)](https://travis-ci.com/Wolox/pagination-node)

Pagination Format NPM package for collections/entities.


## Summary
The package allows you to transform a collection of objects into a paginated JSON response format with certain pagination parameters.

The package is able to slice the entire collection sent based on the `limit` and the `page` parameters that can be specified to the `paginate` method of the package, and therefore return just the portion of the collection needed, as a page, along with the related pagination params.

If no `page` or `limit` options are sent to the `paginate` method, the package will set those values to its default ones.

It is also posible to change the default values of the `page` and `limit` options to desired values, in such a way that the package will always paginate with certain behaviour desired defaultly without having to specify `page` and `limit` options everytime you want to paginate something.


## Installing
To install the package, just simply type in terminal:
```bash
$ npm i @wolox/pagination-node
```

## Glossary
* `page` param: The page number that is being requested.
* `limit` param: The amount of objects needed in the page.
* `content` - `collection`: This is the group of objects you want to paginate. It should be an Array of objects.
* `request`: This is the `IncomingMessage` object you'll have to pass along with the other options needed to paginate.
* 'pagination params': These are the params that accompany the page itself (resulting objects), and are strictly related with the mentioned page that was requested. So far, the default pagination params are:
    - `page: Array` (As it was told, the resulting objects paginated)
    - `count: Number` (Describes the total of objects in the current page)
    - `total_pages: Number` (Describes the total of pages calculated, based in the total of objects sent to the paginator, and the limit requested)
    - `total_count: Number` (The total amount of objects that the paginator received)
    - `previous_page: Number` (The number of the previous page. Will be null if there's nothing to show)
    - `current_page: Number` (The number of the current page that is being shown)
    - `next_page: Number` (The number of the next page. Will be null if there's nothing to show)
    - `previous_page_url: String url` (A string url that leads to the previous page. Will be null if there's nothing to show)
    - `next_page_url: String url` (A string url that leads to the next page. Will be null if there's nothing to show)


## Usage
After installing the package, all you have to do is require it inside the file were you want to paginate something:
```js
const nodePagination = require('@wolox/pagination-node');
```
Then, when you have the collection you want to paginate, you can make use of the `paginate` method of the package in any of the following ways

* Without specifying options (default options values will be used):
```js
const paginatedResponse = nodePagination.paginate(collection, request, {});
```

* Specifying the `page` option (as `limit` option is missing, the limit value will be the default one):
```js
const paginatedResponse = nodePagination.paginate(collection, request, { page: 2 });
```

* Specifying the `limit` option (as `page` option is missing, the page value will be the default one):
```js
const paginatedResponse = nodePagination.paginate(collection, request, { limit: 5 });
```

* Specifying both `page` and `limit` values:
```js
const paginatedResponse = nodePagination.paginate(collection, request, { page: 2, limit: 5 });
```

`collection`: This parameter could also be named as `content` and it represents the group of objects you want to paginate. This must be an Array, otherwise the `paginate` method will throw an error.

`request`: Used to concat a string url that leads to the previous and next pages. This should be an `IncomingMessage` object given that it uses the `request.headers.host` and `request.url` attributes to arrange a valid url string, otherwise those urls will return null.

`options`: An object containing options to modify the requested page. So far, only `page` and `limit` options are allowed.


### Default option values
* `page`: 1
* `limit`: 25

### Modifying default params
If you wanted to stablish different option values as defaults all you have to do is set the needed value to the corresponding option like this:
```js
nodePagination.defaultLimit = NEW_LIMIT;
nodePagination.defaultPage = NEW_PAGE;
```
It's recommended to do this on a setup/startup step of the applicacion that requires the tool, for example requiring it and changing its default values in a script that runs before a controller rendering the result using the tool itself.




## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Run the tests (`npm test`)
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin my-new-feature`)
6. Create new Pull Request

## About

This project is maintained by [Wolox](https://github.com/wolox) and it was written by [Wolox](http://www.wolox.com.ar).

![Wolox](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)

## License

**pagination-node** is available under the MIT [license](LICENSE.md).

    Copyright (c) 2020 Wolox

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.