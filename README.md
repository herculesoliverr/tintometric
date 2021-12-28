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

---

## Configuration

1. Using your terminal and the [VTEX IO Toolbelt](https://vtex.io/docs/recipes/development/vtex-io-cli-installment-and-command-reference), log into the desired VTEX account.
2. Run `vtex install vtexarg.tintometric` on the account you're working on.

3. Create role with product Catalog with resource 'Product management'. Then create new application credentials. Assign the appkey to the created role. Set these credentials in the app settings of the Tintometric application.

> Know that these credentials should belong to the 'Master account id' that you have established in the app settings. If this step is not configured, you will not be able to perform the updates

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

---

### `tintometric` props

| Prop name          | Type     | Description                            | Default value            |
| ------------------ | -------- | -------------------------------------- | ------------------------ |
| `title`            | `string` | Title used in the modal                | `LET'S FIND YOUR COLOR!` |
| `subtitle`         | `string` | Subtitle used in the modal             |                          |
| `buttonGrid`       | `string` | Grid button label used in the modal    | `Matriz`                 |
| `buttonList`       | `string` | List button label used in the modal    | `Name`                   |
| `colorDetailTitle` | `string` | Color Detail Title                     | `Selected Colour:`       |
| `confirmButton`    | `string` | Confirm button label used in the modal | `Confirm`                |

_This props can be modified in the site editor_

3. Access your VTEX account's admin.
4. In the **Products** tab click on **Tintometric**.

![Media Placeholder](https://user-images.githubusercontent.com/36748003/128002681-1a8e1813-0d12-404f-981c-deaf7a61bd7e.png)

| Label                 | Description                                                              |
| --------------------- | ------------------------------------------------------------------------ |
| `Checkbox Old Prices` | If checked will take the prices that are marked as oldPrices in the json |
| `Bases`               | Price of the bases                                                       |
| `Tinters`             | Price of the tinters                                                     |

---

## JSON File Structure

The structure in the JSON file has 3 important keys:

"families", "products" and "productType".

### FAMILIES

| Label          | type              | Description                                                                               |
| -------------- | ----------------- | ----------------------------------------------------------------------------------------- |
| `id`           | number            | Family color id (used to filter the products to show)                                     |
| `name`         |  string           | Family color name                                                                         |
| `color`        | string            | Family Hexadecimal color                                                                  |
| `productTypes` |  Array of numbers | Array of productTypes id's (used to filter only the products that match the productTypes) |

### PRODUCTS

| Label         | type    | Description                                                              |
| ------------- | ------- | ------------------------------------------------------------------------ |
| `code`        | string  | Product code                                                             |
| `name`        |  string | Product name                                                             |
| `slug`        | string  | Product slug (used to generate the url when "confirm" button is clicked) |
| `family`      | number  | Family Id (used to filter the products to show)                          |
| `R`           | number  | value of the RGB color (used to change the image background)             |
| `G`           | number  | value of the RGB color (used to change the image background)             |
| `B`           | number  | value of the RGB color (used to change the image background)             |
| `skuId`       | number  | skuId of the product (used to update the price)                          |
| `composition` | object  | color composition used to estimate the sku price.                        |

### COMPOSITION

```
"composition": {
      "newPrices": {
          "base1": 1,
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
          "tinter11": 0
      },
      "oldPrices": {
          "base1": 1,
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

#### The structure of the composition object must have only one base and all the 11 tinters.

---

### PRODUCT TYPE

| Label  | type   | Description                                                                  |
| ------ | ------ | ---------------------------------------------------------------------------- |
| `id`   | number | ProductType id (used to filter only the products that matchs with it)        |
| `slug` | string | ProductType slug (used to generate the url when "confirm" button is clicked) |

---

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

---

## Customization

| CSS Handles                   |
| ----------------------------- |
| `modal-button--trigger`       |
| `modal-button--trigger-icon`  |
| `header`                      |
| `header-title`                |
| `header-subtitle`             |
| `buttonGroup-container`       |
| `button`                      |
| `button--active`              |
| `button--active`              |
| `colorPicker-container`       |
| `colorPicker-container`       |
| `inputSearch--container`      |
| `colorDetail-container`       |
| `colorDetail-title`           |
| `colorDetail-info--container` |
| `colorDetail-image`           |
| `colorDetail-name`            |
| `colorDetail-code`            |
| `confirm-button`              |
| `colorList-container`         |
| `colorList-item`              |
| `colorList-grid`              |
| `colorList-list`              |
| `familyActive-label--wrapper` |
| `familyActive-label--text`    |
| `familyPicker-container`      |
| `familyPicker-item`           |
| `familyPicker-span`           |
| `familyPicker-item--isActive` |
| `tooltip-name`                |
| `tooltip-code`                |

## Contributors

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/arielabaruffaldi"><img src="https://avatars.githubusercontent.com/u/36748003?v=4" width="100px;" alt=""/><br /><sub><b>Ariela Baruffaldi</b></sub></a><br /><a href="https://github.com/vtex-apps/tintometric" title="Code">💻</a></td>
        <td align="center"><a href="https://github.com/tomymehdi"><img src="https://avatars.githubusercontent.com/u/774112?v=4" width="100px;" alt=""/><br /><sub><b>Tomas Mehdi</b></sub></a><br /><a href="https://github.com/vtex-apps/tintometric" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/GuidoSdo"><img src="https://avatars.githubusercontent.com/u/33711188?v=4" width="100px;" alt=""/><br /><sub><b>Guido Salcedo</b></sub></a><br /><a href="https://github.com/vtex-apps/tintometric" title="Code">💻</a></td>
 
  </tr>
    
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

---

Check out some documentation models that are already live:

- [Breadcrumb](https://github.com/vtex-apps/breadcrumb)
- [Image](https://vtex.io/docs/components/general/vtex.store-components/image)
- [Condition Layout](https://vtex.io/docs/components/all/vtex.condition-layout@1.1.6/)
- [Add To Cart Button](https://vtex.io/docs/components/content-blocks/vtex.add-to-cart-button@0.9.0/)
- [Store Form](https://vtex.io/docs/components/all/vtex.store-form@0.3.4/)
