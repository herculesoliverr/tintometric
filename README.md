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

## Configuration 

In this section, you first must **add the primary instructions** that will allow users to use the app's blocks in their store, such as:

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

### `tintometric` props

| Prop name    | Type            | Description    | Default value                                                                                                                               |
| ------------ | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | 
| `title`      | `string`       | Title used in the modal         | `LET'S FIND YOUR COLOR!`        |
| `subtitle`      | `string`       | Subtitle used in the modal         |         |
| `buttonGrid`      | `string`       | Grid button label used in the modal         | `Matriz`        |
| `buttonList`      | `string`       | List button label used in the modal         |  `Name`       |
| `colorDetailTitle`      | `string`       | Color Detail Title        |      `Selected Colour:`   |
| `confirmButton`      | `string`       | Confirm button label used in the modal         |    `Confirm`     |


This props can be modified in the site editor


3. Access your VTEX account's admin.
4. In the **Products** tab click on **Tintometric**.

![Media Placeholder](https://user-images.githubusercontent.com/36748003/128002681-1a8e1813-0d12-404f-981c-deaf7a61bd7e.png)

| Label    | Description                                                                                                                                 |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------
| `Checkbox Old Prices`      | If checked will take the prices that are marked as oldPrices in the json
| `Bases`      | Price of the bases     
| `Tinters`      | Price of the tinters


## JSON File Structure




## Formula used to update the prices
The formula takes 1 base (the one loaded in the json file).
Then adds the amount of each tinter and multiplies by the price  

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
## Customization

The first thing that should be present in this section is the sentence below, showing users the recipe pertaining to CSS customization in apps:

`In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).`

Thereafter, you should add a single column table with the available CSS handles for the app, like the one below. Note that the Handles must be ordered alphabetically.

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



If there are none, add the following sentence instead:

`No CSS Handles are available yet for the app customization.`

<!-- DOCS-IGNORE:start -->

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
