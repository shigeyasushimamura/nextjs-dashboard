export class CreateInvoiceCommand {
  constructor(
    public readonly customerId: string,
    public readonly amount: number,
    public readonly status: "pending" | "paid"
  ) {}
}

export class UpdateInvoiceCommand {
  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public readonly amount: number,
    public readonly status: "pending" | "paid"
  ) {}
}

export class DeleteInvoiceCommand {
  constructor(public readonly id: string) {}
}
