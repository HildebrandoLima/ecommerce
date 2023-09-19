# E-commerce

Projeto desenvolvido com Vue3. Trata-se de um e-commerce, onde é possível, realizar a compra de items online.

## IDE

[VSCode](https://code.visualstudio.com/).

## Configurar Ambiente

É usado o framework bootstrap para estilização CSS.

```sh
npm install
```

```sh
npm install axios
```

```sh
npm install vue
```

```sh
npm install vue-router
```

### Compilar para Desenvolvimento

```sh
npm run dev
```

### Compilar para Producão

```sh
npm run build
```

### Execute testes de componentes direcionados com [Cypress Component Testing](https://on.cypress.io/component) (AINDA A DESENVOLVER)

```sh
npm run test:unit:dev # or `npm run test:unit` for headless testing
```

### Execute Testes End-to-End com [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

Isso executa os testes end-to-end no servidor de desenvolvimento Vite. É muito mais rápido que a construção de produção.

Mas ainda é recomendado testar a construção de produção test:e2eantes da implantação (por exemplo, em ambientes de CI):

```sh
npm run build
npm run test:e2e
```
