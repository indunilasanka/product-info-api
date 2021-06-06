# product-info-api

### How to Start

1. Connect with you database and execute the schema.sql 
2. Update src/config/config.js files with your database connection credentials
3. Open terminal and run "npm install"
4. Run "npm start"
5. Then server will be up and run in port specified by you
6. Import the postman collection in "product-info.postman_collection.json". Use the postman calls in "rest" folder. First create some brand names using "brand create" postman call

## Assumptions/Decisions
1. 2 mysql tables. product and brand connected through a foreign key.
2. product slug is considered as a unique parameter(2 products cant share the same slug name).
3. product sku can be empty or null, but none of the other fields can be null.
4. db connection pooling was used using sequelize.
5. authentication was not considered under this service, since I think authentication should handle from separate micro-service
6. due to time permits, unit test cases were only added to the product-service, product-api classes

# API Specification
****
### 1. Get All Brands

**URL:** ` [base-url]:[port]/v1/product-info/brands --> http://localhost:8060/v1/product-info/brands`

**HTTP Method:** ` GET`

**request headers:** `correlation-id: randomId(de3c9303-7d89-4e63-b02c-1ae9fa18ba39)`

**sample response:** `{ "status": "success", "message": "Successfully fetched all the brands",
"data": [{"brandId": 1,"brandName": "Maggie"}, {"brandId": 2,"brandName": "Nestle"}]
}`

****
### 2. Create Brand
**URL:** ` [base-url]:[port]/v1/product-info/brand --> http://localhost:8060/v1/product-info/brands`

**HTTP Method:** ` POST`

**sample request body:** `{"brandName": "Astra"}`

**request headers:** `correlation-id: randomId(de3c9303-7d89-4e63-b02c-1ae9fa18ba39), Content-Type = application/json`

**sample response:** ` { "status": "success", "message": "Successfully created the brand",
"data": { "brandId": 3, "brandName": "Astra" }}`
****


### 3. Get All Products
**URL:** ` [base-url]:[port]/v1/product-info/products --> http://localhost:8060/v1/product-info/products`

**HTTP Method:** ` GET`

**request headers:** `correlation-id: randomId(de3c9303-7d89-4e63-b02c-1ae9fa18ba39)`

**sample response:** ` {
"status": "success",
"message": "Successfully fetched all the products",
"data": [
{
"productId": 1,
"productName": "Anchor",
"productSlug": "slug1",
"sku": "918390dlsad",
"brandId": 2
},
{
"productId": 2,
"productName": "Horlicks",
"productSlug": "slug2",
"sku": "918390dlsad",
"brandId": 2
}
]
}`
****

### 4. Create Product
**URL:** ` [base-url]:[port]/v1/product-info/products --> http://localhost:8060/v1/product-info/products`

**HTTP Method:** ` POST`

**sample request body:** `{
"productName": "Horlicks",
"productSlug": "slug2",
"sku": "918390dlsad",
"brandId": 2
}`

**request headers:** `correlation-id: randomId(de3c9303-7d89-4e63-b02c-1ae9fa18ba39), Content-Type = application/json`

**sample response:** ` {
"status": "success",
"message": "Successfully created the product",
"data": {
"productId": 2,
"productName": "Horlicks",
"productSlug": "slug2",
"sku": "918390dlsad",
"brandId": 2
}
}`

**Validation 1 (when slug already exist):** ` 400 BAD_REQUEST {
"status": "error",
"message": "Product with same slug name already exist",
"code": 1004
}` 

**Validation 2 (when brand id not available):** ` 400 BAD_REQUEST {
"status": "error",
"message": "No brand name available for the given id",
"code": 1001
}`
****

### 5. Get All Product by Id/Slug
**URL:** ` [base-url]:[port]/v1/product-info/products/:product_id --> http://localhost:8060/v1/product-info/products/3`

**HTTP Method:** ` GET`

**request headers:** `correlation-id: randomId(de3c9303-7d89-4e63-b02c-1ae9fa18ba39)`

**sample response:** ` {
"status": "success",
"message": "Successfully fetched given product",
"data": {
"productId": 3,
"productName": "Noodles",
"productSlug": "slug3",
"sku": "918390dlsad",
"brandId": 3
}
}`

**Validation 1 (when no product available for giver id/slug):** `400 BAD_REQUEST {
"status": "error",
"message": "No product available for the given id",
"code": 1002
}`
****

### 6. Update Product
**URL:** ` [base-url]:[port]/v1/product-info/products/:product_id --> http://localhost:8060/v1/product-info/products/3`

**HTTP Method:** ` PATCH`

**sample request body:** `{
"productName": "Chicken Falvours",
"productSlug": "slug4",
"sku": "918390ccccc",
"brandId": 3
}`

**request headers:** `correlation-id: randomId(de3c9303-7d89-4e63-b02c-1ae9fa18ba39), Content-Type = application/json`

**sample response:** ` {
"status": "success",
"message": "Successfully updated the product",
"data": {}
}`

**Validation 1 (when slug already exist):** ` 400 BAD_REQUEST {
"status": "error",
"message": "Product with same slug name already exist",
"code": 1004
}`

**Validation 2 (when brand id not available):** ` 400 BAD_REQUEST {
"status": "error",
"message": "No brand name available for the given id",
"code": 1001
}`
****

### 7. Delete Product by Id

**URL:** ` [base-url]:[port]/v1/product-info/products/:product_id --> http://localhost:8060/v1/product-info/products/3`

**HTTP Method:** ` DELETE`

**request headers:** `correlation-id: randomId(de3c9303-7d89-4e63-b02c-1ae9fa18ba39)`

**sample response:** `{
"status": "success",
"message": "Successfully deleted the product",
"data": {}
}`

**Validation 1 (when no product available for giver id/slug):** `400 BAD_REQUEST {
"status": "error",
"message": "No product available for the given id",
"code": 1002
}`

****
### 8. Create multiple products by uploading CSV

**URL:** ` [base-url]:[port]/v1/product-info/products/bulk-create --> http://localhost:8060/v1/product-info/products/bulk-create`

**HTTP Method:** ` POST`

**sample request body:** `{
"filePath": "data.csv"
}`

**request headers:** `correlation-id: randomId(de3c9303-7d89-4e63-b02c-1ae9fa18ba39)`

This endpoint is not working. I was trying to implement this endpoint using MySql Load local infile command. But that effort failed. 

****

**Validation (When URL not found):**

`404 NOT_FOUND {
"status": "error",
"message": "Not Found"
}`

**Validation (When server side errors):**

`500 INTERNAL_SERVER_ERROR {
"status": "error",
"message": "Customer error message or Internal Server Error"
}`



