📢 Use this project, [contribute](https://github.com/vtex-apps/promotion-cloner) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Promotion Cloner

<!-- DOCS-IGNORE:start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- DOCS-IGNORE:end -->

The Promotion Cloner application allows you to **clone promotions** from one environment to another, in **architecture master + white labels** and **marketplaces**.

![Media Placeholder](https://media.giphy.com/media/vJVAtKTUVcMqTmUzCd/giphy.gif)

___

## Master-data Configuration

1. Create a new Data Entity with the Acronym **RP** in your Master Data with the following data:

![Media Placeholder](https://user-images.githubusercontent.com/74916156/115772324-58291f80-a385-11eb-907f-0da1b915390d.jpg)

**Acronym:** 'RP'

**Fields:** 
- idCalculatorConfigurationDestination
- idCalculatorConfigurationOrigin
- updateDate

:information_source: Notice that the type of the three fields above is the same: `varchar 750` 

2. Create another Data Entity with Acronym `RC` and the following data:

![Media Placeholder](https://user-images.githubusercontent.com/74916156/115776323-5e6dca80-a38a-11eb-948d-6bb7dabcaee5.jpg)

**Acronym:** 'RC'

**Fields:** 
- idCampaignsDestination
- idCampaignsOrigin
- updateDate

:information_source: The type of the three fields above is `varchar 750` too.

___

## Configuration

1. Using your terminal and the [VTEX IO Toolbelt](https://vtex.io/docs/recipes/development/vtex-io-cli-installment-and-command-reference), log into the desired VTEX account.
2. Run `vtex install vtexarg.promotion-cloner` on the account you're working on.
3. Access your VTEX account's admin.
4. Access **Products**, then **Promotions & Taxes** and then **Clone Promotions**.

___

## Modus Operandi

Get the promotions of the environment that you want with **Get Promotions** button.

![Media Placeholder](https://media.giphy.com/media/NWtVULVw8N9UPTdCyJ/giphy.gif)

Select the promotion and then where do you want to clone. Also, you can use the **Select All** button.

![Media Placeholder](https://media.giphy.com/media/GvWXjCQTAbfVXdAYnj/giphy.gif)

Duplicate the promotions selected with **Duplicate Promotions** button.

![Media Placeholder](https://media.giphy.com/media/qQJbOSXX1NzG0KkN0X/giphy.gif)

If you want to duplicate many promotions and do not want to select for each promotion where you will clone, you can use **Duplicate Promotions in Some Stores** button to duplicate the selected promotions to the selected enviroments.

![Media Placeholder](https://media.giphy.com/media/d2qgs1YKZZgb2Tq2FN/giphy.gif)

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- DOCS-IGNORE:start -->
___

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
