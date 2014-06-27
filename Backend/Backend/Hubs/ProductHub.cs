using System;
using System.Collections.Generic;
using Backend.Model;
using Microsoft.AspNet.SignalR;

namespace Backend.Hubs
{
	public class ProductHub : Hub
	{
		private readonly ProductRepository _repository = new ProductRepository();

		public IEnumerable<Product> GetProducts()
		{
			return _repository.GetProducts();
		}

		public void AddProduct(string name, decimal price, int stock)
		{
			var product = _repository.AddProduct(name, price, stock);
			if (product != null)
			{
				Clients.All.productAdded(product);
			}
		}

		public void ChangeProduct(Guid id, string name, decimal price, int stock)
		{
			var product = _repository.ChangeProduct(id, name, price, stock);
			if (product != null)
			{
				Clients.All.productChanged(product);
			}
		}
	}
}
