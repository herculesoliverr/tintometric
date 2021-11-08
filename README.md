📢 Use this project, [contribute](https://github.com/{OrganizationName}/{AppName}) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# TINTOMETRIC

<!-- DOCS-IGNORE:start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- DOCS-IGNORE:end -->

The Tintometric application **renders a Tintometric** on the Product Page and allows you to **massively update** the prices of skus based on color composition.
It can be used in architecture master + white labels.


![Media Placeholder](https://media.giphy.com/media/MujEk2RiUShcSKtR0L/giphy.gif)

---- 
## Configuration 

1. Using your terminal and the [VTEX IO Toolbelt](https://vtex.io/docs/recipes/development/vtex-io-cli-installment-and-command-reference), log into the desired VTEX account.
2. Run `vtex install vtexarg.tintometric` on the account you're working on.

You are now able to use the Tintometric block: 

```
"flex-layout.col#right-col": {
    "props": {
      "preventVerticalStretch": true,
      "rowGap": 0
    },
    "children": [
      "flex-layout.row#product-name",
      "flex-layout.row#list-price-savings",
      "flex-layout.row#selling-price",
+     "tintometric",
      "sku-selector",
      "product-quantity"
    ]
  },
+ "tintometric": {
    "props": {
      "blockClass": "tintometric-pdp"
    }
  }
}
```
---- 
### `tintometric` props

| Prop name    | Type            | Description    | Default value                                                                                                                               |
| ------------ | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | 
| `title`      | `string`       | Title used in the modal         | `LET'S FIND YOUR COLOR!`        |
| `subtitle`      | `string`       | Subtitle used in the modal         |         |
| `buttonGrid`      | `string`       | Grid button label used in the modal         | `Matriz`        |
| `buttonList`      | `string`       | List button label used in the modal         |  `Name`       |
| `colorDetailTitle`      | `string`       | Color Detail Title        |      `Selected Colour:`   |
| `confirmButton`      | `string`       | Confirm button label used in the modal         |    `Confirm`     |
_This props can be modified in the site editor_

-----

3. Access your VTEX account's admin.
4. In Apps > My apps search for the Tintometric app and click on Settings
<img width="915" alt="Captura de Pantalla 2021-11-05 a la(s) 13 36 19" src="https://user-images.githubusercontent.com/36748003/140546194-7019abbc-8d3e-4f4b-bcf7-37fa60a450d7.png">

5. Enter the seller master account id. (this account will be responsible for uploading the json file with the composition)
<img width="1424" alt="Captura de Pantalla 2021-11-05 a la(s) 13 38 49" src="https://user-images.githubusercontent.com/36748003/140546613-f76986e2-267f-4155-b6bc-f74068b16c55.png">
>

----
# Seller Master
In the **Products** tab click on **Tintometric**.

The seller master is responsable for uploading the json file with the color compositions.
<img width="1432" alt="Captura de Pantalla 2021-11-05 a la(s) 13 53 42" src="https://user-images.githubusercontent.com/36748003/140548447-4717b243-db8d-434a-b211-85134c96c47d.png">

## **IMPORTANT**
* The composition file **must be uploaded to the master workspace** of the account. 



* The product textLink (url) must be: `{{productType.slug}}-{{product.slug}}-{{product.code}}`

  considering the json template (available to download in the admin app) the product page url of the product with skuId '9' would look like this:

  `tinta-familia-protegida-mate-rosa-vibrante-R560`

  product textLink configuration: 
<img width="1269" alt="Captura de Pantalla 2021-11-08 a la(s) 18 24 37" src="https://user-images.githubusercontent.com/36748003/140820592-1789594d-8596-45cf-8756-5922c41253c0.png">
  The Tintometric Modal will show only the products that match with the current active product type (in this example: `tinta-familia-protegida-mate`)
----
## **Composition File (JSON) Structure**

The structure in the JSON file has 3 important keys: 

**"families"**, **"products"** and **"productType"**.

---- 
### **FAMILIES**
| Label    | type       | Description                                                                                                                            |
| ------------ | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------
| `id`   | number   | Family color id (used to filter the products to show)
| `name`  | string     | Family color name  
| `color`    | string  | Family Hexadecimal color
| `productType`  | Array of numbers    | Array of productTypes id's (used to filter only the products that match the productTypes)

----

### **PRODUCTS**
| Label    | type       | Description                                                                                                                            |
| ------------ | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------
| `code`   | string   | Product code
| `name`   | string   | Product name
| `slug`   | string   | Product slug (used to generate the url when "confirm" button is clicked)
| `family` | number     | Family Id (used to filter the products to show)
| `productType`      | number | productType id (used to filter only the products that match with the current productType id)
| `R`      | number | value of the RGB color (used to change the image background)
| `G`      | number | value of the RGB color (used to change the image background)
| `B`      | number | value of the RGB color (used to change the image background)
| `skuId`  | number | skuId of the product (used to update the price)
| `composition`  | object | color composition used to estimate the sku price.

### **COMPOSITION**
```
"composition": {
      "acotone": {
          "base_p_albacryl_900": 1,
          "tinter1": 1,
          "tinter2": 1,
          "tinter3": 1,
          "tinter4": 1,
          "tinter5": 0,
          "tinter6": 0,
          "tinter7": 0,
          "tinter8": 0,
          "tinter9": 0,
          "tinter10": 0,
          "tinter11": ,
          "tinter12": 0,
          "tinter13": 0
      },
      "loc": {
          "base_p_albacryl_900": 1,
          "tinter1": 2,
          "tinter2": 2,
          "tinter3": 2,
          "tinter4": 2,
          "tinter5": 0,
          "tinter6": 0,
          "tinter7": 0,
          "tinter8": 0,
          "tinter9": 0,
          "tinter10": 0,
          "tinter11": 0
      }
}
```

#### The structure of the composition object must have both acotone and loc composition. 

#### **Acotone** must have **13 tinters and 1 base**.
#### **Loc** must have **11 tinters and 1 base**.


----

### **PRODUCT TYPE**
| Label    | type       | Description                                                                                                                            |
| ------------ | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------
| `id`   | number   | ProductType id (used to filter only the products that matchs with this productType)
| `slug`   | string   | ProductType slug (used to generate the url when "confirm" button is clicked)

---- 


| Label    | Description                                                                                                                                 |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------
| `Checkbox Old Prices`      | If checked will take the prices that are marked as oldPrices in the json
| `Bases`      | Price of the bases     
| `Tinters`      | Price of the tinters


## Formula used to update the prices
#### The formula takes 1 base (the one loaded in the json file).
#### Then adds the amount of each tinter and multiplies by the price  

```
base +
quantity tinter 1 * tinter1 +
quantity tinter 2 * tinter2 +
quantity tinter 3 * tinter3 + 
quantity tinter 4 * tinter4 + 
quantity tinter 5 * tinter5 + 
quantity tinter 6 * tinter6 + 
quantity tinter 7 * tinter7 + 
quantity tinter 8 * tinter8 + 
quantity tinter 9 * tinter9 + 
quantity tinter 10 * tinter10 + 
quantity tinter 11 * tinter11
```

---- 

# Seller Franchise
In the **Products** tab click on **Tintometric**.

The seller franchise is responsable for uploading a csv file with the price of all the bases and the price of the tinters.
![tintometrico--tmehdifranchise2 myvtex com_admin_tintometric](https://user-images.githubusercontent.com/36748003/140815298-e3119dd7-8966-4b0a-ba5e-07773bf775d3.png)

## **Bases Prices (CSV) Structure**


| Label    |  Description                                                                                                                            |
| ------------ |---------------------------------------------------------------------------------------------------------------------------------------------
| `base`      | name of the base, should match the one especified in the composition file (JSON)
| `price`      | Price of the base

----



## **Switcher ACOTONE/LOC**
Define which json object to use when updating prices. 

If LOC is selected it will take **loc** prices in the **composition object** from the JSON file.

---- 

## **Tinters prices**
Enter the prices of the tinters in the inputs.


----


## **Customize tinters input labels**
It is possible to customize the labels of the inputs

<img width="1421" alt="Captura de Pantalla 2021-11-08 a la(s) 18 06 54" src="https://user-images.githubusercontent.com/36748003/140818155-7f887ce2-c330-4efd-9b87-73041492bc07.png">

Install the admin-graphql-ide app (if it isn't already installed)

`vtex install vtex.admin-graphql-ide`

As soon as the app is installed the button **GraphQL IDE** will already appear in the section **"Store Setup"** of your admin menu (left side of your screen in the admin page).


### **Example of the mutation that modifies the label of the input Acotone 1**

```
mutation {
  saveData(key: "acotoneTinterLabel1", 
    value: "Acotone Label Example")
}

```
| LOC    | ACOTONE                                                                                                                       |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------
| acotoneTinterLabel1   | locTinterLabel1 
| acotoneTinterLabel2   | locTinterLabel2 
| acotoneTinterLabel3   | locTinterLabel3
| acotoneTinterLabel3   | locTinterLabel3
| acotoneTinterLabel4   | locTinterLabel4
| acotoneTinterLabel5   | locTinterLabel5
| acotoneTinterLabel6   | locTinterLabel6
| acotoneTinterLabel7   | locTinterLabel7
| acotoneTinterLabel8   | locTinterLabel8
| acotoneTinterLabel9   | locTinterLabel9
| acotoneTinterLabel10   | locTinterLabel10
| acotoneTinterLabel11  | locTinterLabel11
| acotoneTinterLabel12   | 
| acotoneTinterLabel13   | 

-----

# Customization

| CSS Handles |
| ----------- | 
| `modal-button--trigger` | 
| `modal-button--trigger-icon` | 
| `header` | 
| `header-title` | 
| `header-subtitle` |
| `buttonGroup-container` |
| `button` |
| `button--active` |
| `button--active` |
| `colorPicker-container` |
| `colorPicker-container` |
| `inputSearch--container`|
| `colorDetail-container`|
| `colorDetail-title`|
| `colorDetail-info--container`|
| `colorDetail-image`|
| `colorDetail-name`|
| `colorDetail-code`|
| `confirm-button`|
| `colorList-container`|
| `colorList-item`|
| `colorList-grid`|
| `colorList-list`|
| `familyActive-label--wrapper`|
| `familyActive-label--text`|
| `familyPicker-container`|
| `familyPicker-item`|
| `familyPicker-span`|
| `familyPicker-item--isActive`|
| `tooltip-name`|
| `tooltip-code`|


## Contributors ✨

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->

---- 

Check out some documentation models that are already live: 
- [Breadcrumb](https://github.com/vtex-apps/breadcrumb)
- [Image](https://vtex.io/docs/components/general/vtex.store-components/image)
- [Condition Layout](https://vtex.io/docs/components/all/vtex.condition-layout@1.1.6/)
- [Add To Cart Button](https://vtex.io/docs/components/content-blocks/vtex.add-to-cart-button@0.9.0/)
- [Store Form](https://vtex.io/docs/components/all/vtex.store-form@0.3.4/)
