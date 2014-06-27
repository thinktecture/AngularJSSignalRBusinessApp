using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;

namespace Backend.Model
{
	public class ProductRepository
	{
		private static readonly ConcurrentDictionary<Guid, Product> _products = new ConcurrentDictionary<Guid, Product>();

		static ProductRepository()
		{
			var random = new Random();

			var products = new[]
			{
				new Product() { Id = Guid.NewGuid(), Name= "Holzfällersteaks (je kg)", Price = 3.33m, Stock = random.Next(10, 100) },
				new Product() { Id = Guid.NewGuid(), Name= "Griechenland Aprikosen Tyrinthos (je kg)", Price = 1.99m, Stock = random.Next(10, 100) },
				new Product() { Id = Guid.NewGuid(), Name= "Niederlande Salatgurke", Price = 0.29m, Stock = random.Next(10, 100) },
				new Product() { Id = Guid.NewGuid(), Name= "Président Madrigal (je 100g)", Price = 0.69m, Stock = random.Next(10, 100) },
				new Product() { Id = Guid.NewGuid(), Name= "Rama", Price = 0.99m, Stock = random.Next(10, 100) },
				new Product() { Id = Guid.NewGuid(), Name= "Müllermilch", Price = 0.65m, Stock = random.Next(10, 100) },
				new Product() { Id = Guid.NewGuid(), Name= "Kerrygold Irische Butter", Price = 1.29m, Stock = random.Next(10, 100) },
				new Product() { Id = Guid.NewGuid(), Name= "Dr. Oetker Crème fraîche", Price = 0.59m, Stock = random.Next(10, 100) },
				new Product() { Id = Guid.NewGuid(), Name= "Danone Actimel Drink", Price = 2.22m, Stock = random.Next(10, 100) },
				new Product() { Id = Guid.NewGuid(), Name= "Lavazza Crema E Aroma", Price = 10.99m, Stock = random.Next(10, 100) },
				new Product() { Id = Guid.NewGuid(), Name= "Tassimo Caffè Crema", Price = 3.79m, Stock = random.Next(10, 100) },
				new Product() { Id = Guid.NewGuid(), Name= "iglo Feine Landschnitzel Wiender Art", Price = 3.49m, Stock = random.Next(10, 100) },
				new Product() { Id = Guid.NewGuid(), Name= "Lagnese Cornetto Schokolade", Price = 1.99m, Stock = random.Next(10, 100) },
				new Product() { Id = Guid.NewGuid(), Name= "McCain Chef Frites", Price = 1.11m, Stock = random.Next(10, 100) },
				new Product() { Id = Guid.NewGuid(), Name= "Catsan Hygiene-Streu", Price = 6.99m, Stock = random.Next(10, 100) }
			};

			foreach (var product in products)
			{
				_products[product.Id] = product;
			}
		}

		public Product AddProduct(string name, decimal price, int stock)
		{
			Guid id = Guid.NewGuid();

			Debug.WriteLine(String.Format("New Product: Id = {0}, Name = {1}, Price = {2}, Stock = {3}", id, name, price, stock), "Product Repository");

			return _products[id] = new Product()
			{
				Id = id,
				Name = name,
				Price = price,
				Stock = stock
			};
		}

		public Product ChangeProduct(Guid id, string name, decimal price, int stock)
		{
			Product product;
			if (_products.TryGetValue(id, out product))
			{
				Debug.WriteLine(String.Format("Change Product: Id = {0}, Name = {1}, Price = {2}, Stock = {3}", id, name, price, stock), "Product Repository");

				product.Name = name;
				product.Price = price;
				product.Stock = stock;

				return product;
			}

			Debug.WriteLine(String.Format("Unknown Product: Id = {0}", id), "Product Repository");

			return null;
		}

		public void SellProduct(Guid id, int count)
		{
			Product product;
			if (_products.TryGetValue(id, out product))
			{
				Debug.WriteLine(String.Format("Sell Product: Id = {0}, Count = {1}", id, count), "Product Repository");

				product.Stock -= count;
			}
			else
			{
				Debug.WriteLine(String.Format("Unknown Product: Id = {0}", id), "Product Repository");
			}
		}

		public void ReturnProduct(Guid id, int count)
		{
			Product product;
			if (_products.TryGetValue(id, out product))
			{
				Debug.WriteLine(String.Format("Return Product: Id = {0}, Count = {1}", id, count), "Product Repository");

				product.Stock += count;
			}
			else
			{
				Debug.WriteLine(String.Format("Unknown Product: Id = {0}", id), "Product Repository");
			}
		}

		public IEnumerable<Product> GetProducts()
		{
			return _products.Values;
		}
	}
}
