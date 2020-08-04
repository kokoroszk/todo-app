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
  │  │    ├ model.ts
  │  │    └ service.ts
  │  │
  │  ├ action/
  │  │  ├ global.ts
  │  │  └ domain-a.ts
  │  │
  │  ├ slice/
  │  │  └ domain-a.ts
  │  ├ store/
  │  │  └ store.ts
  │  └ usecase/
  │     └ usecase-a.ts
  │
  ├ views/
  │  ├ atom/
  │  │  └ xxx.tsx
  │  ├ molecule/
  │  ├ organism/
  │  ├ template/
  │  ├ page/
  │  └ util/
  │
  ├ stories/
  │  ├ atom/
  │  │  └ xxx.mdx
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

## 実装ガイドライン

残念ながら纏まってない。つらつらと適当に。

### 共通
- データの流れを理解する
  - データの依存関係を理解する
    - コンポーネント(atom~template)は `props` に依存して `state` に依存しない
    - page は `state` を監視して、変更があった場合に子を再描画する(`props`を変更する)
    - コンポーネント(atom~template)は `usecase` を呼び出すことで、`state` を更新する
    - 「更新」と「描画」に直接的な結びつきがないことを理解する
    - pageは `selector` に定義された通りに `state` に設定された値を取得して描画し続ける
    - `usecase` は、`usecase` 及び `domain` に定義された通りに `state` を更新する
    - `usecase` の戻り値は基本的にUIに影響を与えず、`page` は `state` を更新しない
    - `usecase` が `state` を変更した場合、結果的にUIは更新されるが、別のフローとして捉えるのが良い

```
更新ルール: UI -> [更新内容の定義(usecase,domain)] -> state
描画ルール: state -> [取得内容の定義(selector)] -> UI

更新に対して、UIは宣言的な描画ルールを維持するように変更される
```

### core
- `domain` から実装すること
  - モデルを中心に、そのモデルに関するルールを記述すること
    - モデルと操作を言葉で説明して、違和感がないこと
    - 無理な操作は行わない
    - とはいえ、backendに移譲する量が多いので難しいかもしれない
- `usecase` で `dispatch` を行うこと
  - コンポーネントがロジックを知らなくてよいので、UIだけで開発を進められる
  - `usecase` を `async` にして実装することで、非同期のcallback地獄を避けられる
    - callbackでもいいけど
- `usecase` は可能な限り、値をコンポーネントに返却しない
  - データの方向を一定に保ちたい(state -> page -> component)
    - componentが `props` だけを意識する場合、UIだけを考慮して開発を進められる
  - とはいえエラーハンドリング等で必要なケースはありそう。追って検討する。

### views
- `atom` -> `molecule` -> `organism` -> `template` の順に実装する
  - 矢印の逆向きにしか依存しないこと
- 小さい部品ではサイズに固定値を指定せず、用途に向けてまとめる際に外側で制御すると再利用性が高い
- `atom`, `molecule`, `organism`, `template` は `props` に依存し、 `state` に依存しない
- `atom`, `molecule`, `organism`, `template` は `usecase`, `domain/*/model` のみに依存する
- `template` の `props` は `organism` ごとの `key` で定義することで、`props` が単純になって良い
- `page` は `selector` を定義して `state` を取得し、`template` に `props` として渡す

### storybook
- `preview` と `props` を描画する
- `props` の定義に jsdoc を記述することで、`props` の Description に出力される
- 変更可能な値は `knobs` を使って、storybook上で変更可能にする
- 特定の条件で表示が変わる場合、`preview` を複数描画すると良い

## 実装サンプル抜粋
- 認証有無によるリダイレクト
  - [auth.tsx](src/views/util/auth.tsx) .. `selector` で取得した認証情報が見認証の場合にリダイレクト
  - [App.tsx](src/App.tsx) .. 認証が必要なページ(`Route`) を `<Auth>` でマークアップする
- `<input>` の `molecule` を組み立てて、`Form` を作成する場合の値の操作
  - [title-input.tsx](src/views/molecule/title-form.tsx) .. `props` で `ref` を受け取って設定する
  - [task-form.tsx](src/views/organism/todo/task-form.tsx)
    - `ref` を取得して `title-input` に渡す
    - Addボタンの `onClick` にて
      - `ref` から `value` を取得して `usecase` に渡す
      - `ref` から `value` を `''` に設定する
- `props` に応じて表示内容を切り替える
  - [task-list.tsx](src/views/organism/todo/task-list.tsx)
    - 値が存在する場合(`empty`を含む)、値の分だけ `<Task>` を出力する
    - `undefined` の場合、`<CircleProgress />` を出力する
  - [task-list.stories.mdx](src/stories/organism/task-list.stories.mdx)
    - 値が存在する場合と `undefined` の場合に分けた story を作成している