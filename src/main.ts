import './scss/styles.scss';

import { Api } from './components/base/Api';
import { WebLarekAPI } from './components/models/WebLarekAPI';
import { Products } from './components/models/Products';
import { Basket } from './components/models/Basket';
import { Buyer } from './components/models/Buyer';

import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';
import { IOrder } from './types';

const api = new Api(API_URL);
const webLarekAPI = new WebLarekAPI(api);
const productsModelResult = new Products();
const basketModelResult = new Basket();
const buyerModelResult = new Buyer();

console.log('--- ПРОВЕРКА КАТАЛОГА ТОВАРОВ ---');

productsModelResult.setItems(apiProducts.items);

console.log(
  'Перечень товаров из каталога:', 
  productsModelResult.getItems()
);

console.log(
	'Товар по id:',
	productsModelResult.getItem(apiProducts.items[0].id)
);

productsModelResult.setPreview(apiProducts.items[0].id);

console.log(
	'Предварительный просмотр карточки товара:',
	productsModelResult.getPreview()
);


console.log('--- ПРОВЕРКА КОРЗИНЫ ---');

console.log('Первоначально корзина пустая:',
  basketModelResult.getItems()
);

console.log(`Добавили 1-й товар (${apiProducts.items[0].title})`);
basketModelResult.addItem(apiProducts.items[0]);
console.log(`Добавили 2-й товар (${apiProducts.items[1].title})`);
basketModelResult.addItem(apiProducts.items[1]);
console.log(`Добавили 3-й товар (${apiProducts.items[2].title})`);
basketModelResult.addItem(apiProducts.items[2]);

console.log('Товары в корзине:',
  basketModelResult.getItems()
);

console.log(
	'Всего товаров:',
	basketModelResult.getCount()
);

console.log(
	'Итого стоимость:',
	basketModelResult.getTotal()
);

console.log(
	'Первый товар добавлен в корзину:',
	basketModelResult.hasItem(apiProducts.items[0].id)
);

console.log(`Удалили 1-й товар (${apiProducts.items[0].title})`);
basketModelResult.removeItem(apiProducts.items[0].id);

console.log(
	'Корзина после удаления товара:',
	basketModelResult.getItems()
);

console.log(
	'Количество товаров после удаления:',
	basketModelResult.getCount()
);

console.log(
	'Новая стоимость:',
	basketModelResult.getTotal()
);

console.log('Очистка корзины');
basketModelResult.clear();

console.log(
	'Корзина после очистки:',
	basketModelResult.getItems()
);

console.log('--- ПРОВЕРКА ПОКУПАТЕЛЯ ---');

console.log(
	'Данные покупателя:',
	buyerModelResult.getBuyer()
);

console.log('Добавляем тип оплаты: cash');
buyerModelResult.setBuyer({
	payment: 'cash',
});

console.log('Добавляем адрес: Санкт-Петербург, пр-т Героев');
buyerModelResult.setBuyer({
	address: 'Санкт-Петербург, пр-т Героев',
});

console.log('Добавляем тип email: buyer@buy.com');
buyerModelResult.setBuyer({
	email: 'buyer@buy.com',
});

console.log('Добавляем номер телефона: +71234567890');
buyerModelResult.setBuyer({
	phone: '+71234567890',
});

console.log(
	'Обновленные данные покупателя:',
	buyerModelResult.getBuyer()
);

console.log(
	'Ошибки валидации (валидные данные):',
	buyerModelResult.validate()
);

console.log(
	'Ошибки валидации (невалидные данные):',
	buyerModelResult.validate()
);

console.log('Очистка данных покупателя');
buyerModelResult.clear();

console.log(
	'Покупатель после очистки:',
	buyerModelResult.getBuyer()
);

console.log('--- ПРОВЕРКА API ---');

webLarekAPI
	.getProducts()
	.then((data) => {
		productsModelResult.setItems(data.items);

		console.log(
			'Каталог, полученный с сервера:',
			productsModelResult.getItems()
		);

		const order: IOrder = {
			...buyerModelResult.getBuyer(),
			items: [],
			total: 0,
		};

		console.log(
			'Объект заказа для отправки:',
			order
		);
	})
	.catch((error) => {
		console.error(
			'Ошибка при работе с API:',
			error
		);
	});