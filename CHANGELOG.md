# Changelog

## 0.1.5 (18 Sep 2024)

- Smaller fixes

## 0.1.4 (18 Sep 2024)

- Fix variable slider being reset by browser "norm" value for `variation`
- Fixed docs syncing from github repo

## 0.1.3 (17 Sep 2024)

- Fixed bug where same files in different Fontsamplers failed to load properly
- Removed rangeslider dependency from Skin
- Fixed a webkit load issue stemming from lack of FontFace.variationSettings support

## 0.1.2 (8 Mar 2024)

- Implemented way to reuse CSS fontface declarations already on the page

## 0.1.1 (28 Jul 2023)

- Fixed an issue with wght defaults

## 0.1.0 (27 Nov 2022)

- Refactored font instantiation format
- Refactored options instantiation format
- Dropped support for instantiating HTML in the root DOM node
- Dropped support for setting configs on DOM node
- Better configuration and block generation for Variable axes
- Event fired when skin is initialized
- Better API/event documentation (WIP)

## 0.0.15 (22 Nov 2019)

- Fixed issue where switching between two variable fonts with equal axis values would always match the first variable font, no matter what the selection