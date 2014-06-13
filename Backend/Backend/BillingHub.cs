using System;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;

namespace Backend
{
	public class BillingHub : Hub
	{
		private const string _ACCOUNTANT_GROUP_NAME = "Accountant";

		public Task RegisterAccountant()
		{
			return Groups.Add(Context.ConnectionId, _ACCOUNTANT_GROUP_NAME);
		}

		public async Task<Guid> AddBillEntry(int productId, int count, decimal price)
		{
			Guid id = Guid.NewGuid();
			await Clients.Group(_ACCOUNTANT_GROUP_NAME).addBillEntry(id, productId, count, price);
			return id;
		}

		public void ChangeBillEntryCount(Guid id, int count)
		{
			Clients.Group(_ACCOUNTANT_GROUP_NAME).changeBillEntryCount(id, count);
		}

		public void ChangeBillEntryPrice(Guid id, decimal price)
		{
			Clients.Group(_ACCOUNTANT_GROUP_NAME).changeBillEntryPrice(id, price);
		}

		public void RemoveBillEntry(Guid id)
		{
			Clients.Group(_ACCOUNTANT_GROUP_NAME).removeBillEntry(id);
		}
	}
}
