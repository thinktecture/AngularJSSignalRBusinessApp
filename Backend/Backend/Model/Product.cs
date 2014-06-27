using System;
using Newtonsoft.Json;

namespace Backend.Model
{
	public class Product
	{
		[JsonProperty("id")]
		public Guid Id { get; set; }
		[JsonProperty("name")]
		public string Name { get; set; }
		[JsonProperty("price")]
		public decimal Price { get; set; }
		[JsonProperty("stock")]
		public int Stock { get; set; }
	}
}
