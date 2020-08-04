# アーキテクチャサンプル。

はじめてのreactアーキテクチャ検討。

## 方針
atomic design + clean architecture

## ディレクトリ構成

```
src/
  ├ core/
  │  ├ domain/
  │  │  └ domain-a/
  │  │    ├ model/
  │  │    │  └ domain-a.ts
  │  │    └ service/
  │  │       └ domain-a.ts
  │  │
  │  ├ action/
  │  │  ├ global.ts
  │  │  └ domain-a.ts
  │  │
  │  ├ slice/
  │  │  └ domain-a.ts/
  │  ├ store/
  │  │  └ store.ts
  │  └ usecase/
  │     └ usecase-a.ts/
  │
  ├ views/
  │  ├ atom/
  │  ├ molecule/
  │  ├ organism/
  │  ├ template/
  │  ├ page/
  │  └ util/
  │
  ├ stories/
  │  ├ atom/
  │  ├ molecule/
  │  ├ organism/
  │  └ template/
  │
  ├ index.tsx
  ├ App.tsx
  └ config.ts
```

### 各ディレクトリの役割
#### トップレベル
- core
  - アプリケーションのロジックを含む
  - JSXを返却しない
  - viewsに依存しない
- views
  - atomic designに則って、コンポーネントを実装する
  - viewのコンポーネントとして実装するべきロジックを実装する(認証有無によるリダイレクト等)
- stories
  - atom ~ template までの `storybook` を作成する

#### core
- domain
  - 依存関係を整理するため、`model` と `service` に分割する
  - model
    - ドメインで利用するデータモデルを定義する
    - ドメインの型や、stateの型を含む
    - `InitialState` もここに記載した方がいいか...？悩み。
  - service
    - modelを操作するロジックを含む
    - reducerも、redux内部でモデルを操作するため、ここに含む
    - 外部接続もここでやってしまう。複雑になりそうであれば、IFだけここに定義する。
- action
  - reduxの `Action` を含む
  - `slice` に含まれる `store` と `action` を分離する目的
  - 複数の `store` に含まれる `action` を `global.ts` に定義して、`slice` で `import` する
- slice
  - ドメイン毎のsliceを含む
- store
  - 全ての `slice` を `import` して `store` を `export` する
- usecase
  - コンポーネントとドメインを繋ぐ層
  - UI自身への操作以外のロジックを含む
    - 基本的に `domain` に処理を移譲する
  - 任意の値や `Promise` を返却してよい

#### views

- atom ~ template
  - pageから渡されてきた `props` のみに依存して画面描写を行う
  - 画面アクションを実装してよい
  - `usecase` 以外の `core` に依存しない
  - `dispatch` は `usecase` に渡して、`usecase` 内で行う
- page
  - `Selector` を実装して、画面描写に必要な値の取得
- util
  - 認証有無によるリダイレクト等、画面描画に関係のないコンポーネントを含む



### 依存ルールの整理
- core
  - domain
    - 他のモジュールに依存しない
    - reduxや外部接続等で必要であれば依存する
  - action
    - `slice` に依存し、`slice` の `action` を `export` する
  - slice
    - `domain` に依存し、`InitialState`, `reducer` から `slice` を作成する
    - 複数ドメインに対する `action` があれば、`action/global` に依存する
  - store
    - `slice` に依存し、`store` を作成する
  - usecase
    - `domain` に依存し、業務処理を行う
    - `action` に依存し、必要であれば `dispatch` を行う
- views
  - atom ~ template
    - 自分より上位のコンポーネントに依存しない
    - `usecase` に依存し、業務処理を呼び出す
      - `dispatch` の実行は `usecase` に移譲する
  - page
    - `store`, `domain/*/model` に依存し、画面表示用の値を取得する