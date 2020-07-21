# Vega-actions

В репозитории хранятся специфичные github-экшены для деплоя проектов VEGA.

### Список экшенов

1. [block-pr-without-label](block-pr-without-label/action.yml) - блокирует мердж вашего pr, если у него не найдено необходимого лейбла
2. [generate-changelog](generate-changelog/action.yml) - отвечает за генерацию CHANGELOG
3. [generate-gh-release](generate-gh-release/action.yml) - отвечает за генерацию релизов на Github
4. [release-lerna-packages](release-lerna-packages/action.yml) - релизит пакеты через lerna
5. [update-changelog](update-changelog/action.yml) - обновляет CHANGELOG.md в вашем репозитории

### Деплой

После мержа вашего пр в `master` вам нужно:

1. Сделать `yarn build`
2. Закоммитить и запушить сбилженные файла в `master`
