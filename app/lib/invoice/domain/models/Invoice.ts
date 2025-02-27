export class Invoice {
  constructor(
    private readonly id: string | null,
    private customerId: string,
    private amount: number,
    private status: "pending" | "paid",
    private date: string
  ) {}

  getId() {
    return this.id;
  }

  getCustomerId() {
    return this.customerId;
  }

  getAmount() {
    return this.amount;
  }

  getStatus() {
    return this.status;
  }

  getDate() {
    return this.date;
  }
}
