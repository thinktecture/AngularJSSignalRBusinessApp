using System;
using System.Threading.Tasks;
using Backend.Model;
using Microsoft.AspNet.SignalR;

namespace Backend.Hubs
{
	public class BillingHub : Hub
	{
		private const string _ACCOUNTANT_GROUP_NAME = "Accountant";

		private readonly ProductRepository _repository = new ProductRepository();

		public Task RegisterAccountant()
		{
			return Groups.Add(Context.ConnectionId, _ACCOUNTANT_GROUP_NAME);
		}

		public Guid AddEntry(Guid productId, int count, decimal price)
		{
			Guid id = Guid.NewGuid();
			Clients.Group(_ACCOUNTANT_GROUP_NAME).entryAdded(id, productId, count, price);
			_repository.SellProduct(productId, count);
			return id;
		}

		public void ChangeEntry(Guid id, Guid productId, int count, decimal price, int previousCount)
		{
			Clients.Group(_ACCOUNTANT_GROUP_NAME).entryChanged(id, productId, count, price);
			if (previousCount != count)
			{
				_repository.ReturnProduct(productId, previousCount);
				_repository.SellProduct(productId, count);
			}
		}

		public void RemoveEntry(Guid id, Guid productId, int count)
		{
			Clients.Group(_ACCOUNTANT_GROUP_NAME).entryRemoved(id);
			_repository.ReturnProduct(productId, count);
		}
	}
}
